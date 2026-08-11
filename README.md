# JasonWeber.me — Professional Portfolio

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
the Turnstile token before using the Cloudflare Email Service REST API to send from
`inquiries@jasonweber.me` to the server route's fixed recipient. The
submitter's address is used only as `Reply-To`.

Before deploying:

1. In Cloudflare Email Service, onboard `jasonweber.me` for Email Sending.
2. Create a Turnstile widget for the production and preview hostnames.
3. Add `PUBLIC_TURNSTILE_SITE_KEY` as a Pages variable.
4. Add `TURNSTILE_SECRET_KEY` as an encrypted Pages secret.
5. Create an API token scoped to `Email Sending: Edit` for this account.
6. Add `CLOUDFLARE_EMAIL_API_TOKEN` as an encrypted Pages secret.
7. Add `CLOUDFLARE_ACCOUNT_ID` as a Pages variable.
8. Deploy with `wrangler pages deploy .svelte-kit/cloudflare --project-name=jasonweber-me --branch=main`.

The sender and recipient are fixed in the server route. Never commit the
Turnstile secret or Email Sending API token.
