import { describe, expect, it } from 'vitest';
import { parseInquiry } from '$lib/inquiry';

function validForm() {
	const form = new FormData();
	form.set('name', 'Ada Lovelace');
	form.set('email', 'ada@example.com');
	form.set('organization', 'Analytical Engines');
	form.set('topic', 'Software or product work');
	form.set('message', 'I would like to discuss a practical software project with you.');
	return form;
}

describe('inquiry validation', () => {
	it('accepts and normalizes a complete inquiry', () => {
		const result = parseInquiry(validForm());
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.inquiry.email).toBe('ada@example.com');
	});

	it('rejects malformed email addresses', () => {
		const form = validForm();
		form.set('email', 'not-an-address');
		expect(parseInquiry(form)).toEqual({ ok: false, message: 'Enter a valid email address.' });
	});

	it('rejects unsupported topics and oversized messages', () => {
		const form = validForm();
		form.set('topic', 'Surprise');
		expect(parseInquiry(form).ok).toBe(false);

		form.set('topic', 'Other');
		form.set('message', 'x'.repeat(4001));
		expect(parseInquiry(form).ok).toBe(false);
	});
});
