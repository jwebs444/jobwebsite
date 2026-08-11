export const inquiryTopics = [
	'Technology & operations',
	'Software or product work',
	'Consulting or collaboration',
	'Other'
] as const;

export type InquiryTopic = (typeof inquiryTopics)[number];

export type Inquiry = {
	name: string;
	email: string;
	organization: string;
	topic: InquiryTopic;
	message: string;
};

export type InquiryResult = { ok: true; inquiry: Inquiry } | { ok: false; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// eslint-disable-next-line no-control-regex -- Header control characters are intentionally rejected.
const unsafeHeaderPattern = /[\r\n\u0000-\u001f\u007f]/;

function field(form: FormData, name: string): string {
	const value = form.get(name);
	return typeof value === 'string' ? value.trim() : '';
}

export function parseInquiry(form: FormData): InquiryResult {
	const name = field(form, 'name');
	const email = field(form, 'email').toLowerCase();
	const organization = field(form, 'organization');
	const topic = field(form, 'topic');
	const message = field(form, 'message');

	if (!name || name.length > 100 || unsafeHeaderPattern.test(name)) {
		return { ok: false, message: 'Enter your name using 100 characters or fewer.' };
	}

	if (
		!email ||
		email.length > 254 ||
		unsafeHeaderPattern.test(email) ||
		!emailPattern.test(email)
	) {
		return { ok: false, message: 'Enter a valid email address.' };
	}

	if (organization.length > 120 || unsafeHeaderPattern.test(organization)) {
		return { ok: false, message: 'Keep the organization name under 120 characters.' };
	}

	if (!inquiryTopics.includes(topic as InquiryTopic)) {
		return { ok: false, message: 'Choose an inquiry topic.' };
	}

	if (message.length < 20 || message.length > 4000) {
		return { ok: false, message: 'Write a message between 20 and 4,000 characters.' };
	}

	return {
		ok: true,
		inquiry: { name, email, organization, topic: topic as InquiryTopic, message }
	};
}
