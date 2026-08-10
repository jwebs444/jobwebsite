# Jason Weber — Professional Portfolio

The source for Jason Weber's professional site: an editorial SvelteKit portfolio
focused on technology leadership, operational problem-solving, and practical
software delivery.

The site presents:

- Selected Python work with implementation details and test evidence
- Professional experience spanning technology, operations, virtualization, and hospitality
- A concise account of Jason's working style, capabilities, and education
- A server-submitted inquiry form with Cloudflare Turnstile protection

## Local development

```bash
npm ci
npm run dev
```

## Quality checks

```bash
npm run check
npm run test -- --run
npm run build
```

The production build uses SvelteKit's Cloudflare adapter.

## Inquiry service

The contact form posts to a SvelteKit server route. It validates the inquiry and
the Turnstile token before using Cloudflare Email Service to send from
`inquiries@thejasonandjasonshow.com` to the binding's fixed recipient. The
submitter's address is used only as `Reply-To`.

Before deploying:

1. In Cloudflare Email Service, onboard `thejasonandjasonshow.com` for Email Sending.
2. Create a Turnstile widget for the production and preview hostnames.
3. Add `PUBLIC_TURNSTILE_SITE_KEY` as a Pages variable.
4. Add `TURNSTILE_SECRET_KEY` as an encrypted Pages secret.
5. Deploy with `wrangler pages deploy .svelte-kit/cloudflare --project-name=jobwebsite --branch=main`.

The `EMAIL` binding is declared in `wrangler.jsonc` and restricted to the sender
and recipient used by this form. Never commit the Turnstile secret.
