import { env } from '$env/dynamic/private';
import { parseInquiry } from '$lib/inquiry';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const sender = 'inquiries@jasonweber.me';
const recipient = 'jwebs444@gmail.com';
const maxRequestBytes = 20_000;

type TurnstileResult = {
	success: boolean;
	action?: string;
	'error-codes'?: string[];
};

type EmailServiceResult = {
	success: boolean;
	errors?: Array<{ code?: number; message?: string }>;
};

async function verifyTurnstile(token: string, remoteIp: string | undefined): Promise<boolean> {
	if (!env.TURNSTILE_SECRET_KEY) {
		console.error('Inquiry configuration error', { missing: 'TURNSTILE_SECRET_KEY' });
		return false;
	}

	const body = new FormData();
	body.set('secret', env.TURNSTILE_SECRET_KEY);
	body.set('response', token);
	if (remoteIp) body.set('remoteip', remoteIp);

	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body
		});
		if (!response.ok) return false;

		const result = (await response.json()) as TurnstileResult;
		return result.success && result.action === 'portfolio-inquiry';
	} catch (error) {
		console.error('Turnstile verification failed', {
			message: error instanceof Error ? error.message : 'Unknown error'
		});
		return false;
	}
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const requestLength = Number(request.headers.get('content-length') ?? 0);
	if (requestLength > maxRequestBytes) {
		return json({ ok: false, message: 'That inquiry is too large to submit.' }, { status: 413 });
	}

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return json({ ok: false, message: 'The inquiry could not be read.' }, { status: 400 });
	}

	// A completed honeypot is treated as success so automated submitters receive no useful signal.
	if (String(form.get('website') ?? '').trim()) {
		return json({ ok: true, message: 'Thanks. Your inquiry has been sent.' });
	}

	const parsed = parseInquiry(form);
	if (!parsed.ok) return json(parsed, { status: 400 });

	const turnstileToken = String(form.get('cf-turnstile-response') ?? '');
	if (!turnstileToken || turnstileToken.length > 2048) {
		return json(
			{ ok: false, message: 'Complete the security check and try again.' },
			{ status: 400 }
		);
	}

	let remoteIp: string | undefined;
	try {
		remoteIp = getClientAddress();
	} catch {
		remoteIp = request.headers.get('CF-Connecting-IP') ?? undefined;
	}

	if (!(await verifyTurnstile(turnstileToken, remoteIp))) {
		return json(
			{
				ok: false,
				message: 'The security check expired or could not be verified. Please try again.'
			},
			{ status: 400 }
		);
	}

	if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_EMAIL_API_TOKEN) {
		console.error('Inquiry configuration error', {
			missing: !env.CLOUDFLARE_ACCOUNT_ID ? 'CLOUDFLARE_ACCOUNT_ID' : 'CLOUDFLARE_EMAIL_API_TOKEN'
		});
		return json(
			{
				ok: false,
				message: 'The inquiry service is temporarily unavailable. Please try again later.'
			},
			{ status: 503 }
		);
	}

	const { inquiry } = parsed;
	const text = [
		`Portfolio inquiry from ${inquiry.name}`,
		'',
		`Email: ${inquiry.email}`,
		`Organization: ${inquiry.organization || 'Not provided'}`,
		`Topic: ${inquiry.topic}`,
		'',
		inquiry.message
	].join('\n');

	try {
		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					to: recipient,
					from: { address: sender, name: 'Jason Weber — Portfolio' },
					reply_to: { address: inquiry.email, name: inquiry.name },
					subject: `Portfolio inquiry — ${inquiry.topic}`,
					text
				})
			}
		);
		const result = (await response.json()) as EmailServiceResult;

		if (!response.ok || !result.success) {
			console.error('Inquiry email failed', {
				status: response.status,
				code: result.errors?.[0]?.code ?? 'unknown'
			});
			const status = response.status === 429 ? 429 : 502;
			return json(
				{
					ok: false,
					message: 'The message could not be sent right now. Please try again shortly.'
				},
				{ status }
			);
		}

		return json({ ok: true, message: 'Thanks. Your inquiry has been sent.' });
	} catch (error) {
		console.error('Inquiry email failed', {
			message: error instanceof Error ? error.message : 'Unknown error'
		});

		return json(
			{ ok: false, message: 'The message could not be sent right now. Please try again shortly.' },
			{ status: 502 }
		);
	}
};
