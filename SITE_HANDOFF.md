# JasonWeber.me Product Record

## Status and purpose

- Product state: accepted complete, 2026-08-12; stable maintenance.
- Repository/live branch: `jwebs444/JasonWeber.me`, `main`.
- Live domain: `jasonweber.me`.
- Job: present Jason as a technology, operations, and software leader and make a
  serious inquiry easy.
- Maintenance is the normal post-acceptance manager and owns content,
  dependencies, form delivery, Pages configuration, and bounded established-
  pattern defects. Significant changes to hierarchy, portrait treatment,
  typography, navigation behavior, or multiple responsive compositions require
  a newly briefed Site Steward; full-site regeneration returns to the Generator.

## Product grammar

Professional editorial charcoal/paper/rust composition with a documentary
portrait. The page earns trust through concrete work and experience, not fantasy
lore. Desktop identity header and Contact remain sticky. Work, Experience, and
Approach are ordinary navigation/anchors, not a persistent mobile tab system.

## Responsive promises

- Reproduce the owner's browser canvas, not only a “2K” label. At 2048 x 1052,
  sticky header + hero + complete How I work fit in one opening screen.
- Mobile hides How I work, places Education before Outcomes, and keeps a normal
  selected-work item within one phone screen.
- Protect `DungeonCrawler` and other long names from single-letter orphans.
- Mobile inquiry is concise; ready/error/success and Turnstile expand naturally.
- No document-level horizontal overflow.

The detailed measurement and owner replay history is in
`docs/SPACING_BRIEF.md`.

## Architecture and delivery

- SvelteKit + Cloudflare adapter; npm/package-lock.
- Build: `npm run build`; checks: `npm run check`, `npm run test -- --run`,
  `npm run lint`.
- Cloudflare Pages output: `.svelte-kit/cloudflare`.
- Inquiry uses Turnstile and Cloudflare Email Service. Public routes require no
  visitor authentication. Never commit secrets or weaken server validation.
- `main` is production source. Treat PR preview, merged commit, production Pages
  deployment, and custom-domain verification as separate states; a failed PR
  preview does not prove the production workflow failed.
- Approved website/social card: `static/og.png`, 1536 x 1024, canyon portrait
  treatment; canonical portfolio copy is in the universal Image Assets library.
- Social metadata appends the approved asset fingerprint
  `?v=02c74beb9e6a`; update it whenever the approved card bytes change so link
  preview caches receive a new image URL.

## Low-input defaults

Future roles may resolve implementation, spacing, cache, and breakpoint details
from rendered evidence without asking the owner. Ask only for changed career
facts, a materially different professional narrative, new private content, or
ungranted publication authority.
