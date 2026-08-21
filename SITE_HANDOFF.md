# JasonWeber.me Product Record

## Status and purpose

- Product state: live product accepted complete, 2026-08-12; five-project local
  candidate frozen 2026-08-20 for independent Traditional review.
- Toolset: Traditional.
- Repository/live branch: `jwebs444/JasonWeber.me`, `main`.
- Live domain: `jasonweber.me`.
- Job: present Jason as a technology, operations, and software leader and make a
  serious inquiry easy.
- Bounded post-acceptance content, dependency, form-delivery, Pages-
  configuration, and established-pattern repair may be delegated directly to
  the property's Traditional Site Steward or the Personal Web Builder Brain.
  Significant changes to hierarchy, portrait treatment, typography, navigation
  behavior, or multiple responsive compositions require a newly briefed
  Traditional Site Steward; full-site regeneration returns to the Traditional
  Generator.

## Product grammar

Professional editorial charcoal/paper/rust composition with a documentary
portrait. The page earns trust through concrete work and experience, not fantasy
lore. Desktop identity header and Contact remain sticky. Work, Experience, and
Approach are ordinary navigation/anchors, not a persistent mobile tab system.

Selected work remains a text-led editorial system rather than an image-card
gallery. The current local candidate presents, in order, Roost Atlas,
PerchPoints, Mr. Crowmeister, Canyon Rain, and DungeonCrawler. The first three
sit under `Connected public systems` as three independent public properties
shaped by a shared field practice; the language must not make one property the
owner of another. Canyon Rain and DungeonCrawler remain distinct focused
software builds.

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

## Search discovery record

- Discovery posture: broadly indexable single-route professional profile at
  `https://jasonweber.me/`; no keyword-variant or thin supporting routes.
- Route ownership: `/` owns Jason Weber branded searches and the combined
  technology, operations, software, work-evidence, experience, and serious-
  inquiry job. Anchors remain sections of that one canonical page.
- Crawl/index contract: public crawling allowed; explicit `index, follow` with
  large image previews; `robots.txt` advertises the canonical XML sitemap.
- Canonical contract: the root URL is self-canonical and is the only URL in the
  sitemap. Social URL and structured data use the same HTTPS host and trailing
  slash.
- Structured data: a `ProfilePage` connects the visible Jason Weber `Person`
  and the canonical `WebSite`; the local candidate also connects a five-entry
  `ItemList` whose order, names, descriptions, and URLs derive from the visible
  project data. Public LinkedIn/GitHub profiles and the visible portrait remain
  the only identity references.
- Social metadata remains a separate public surface and continues to use the
  approved versioned `static/og.png` card.

## 2026-08-20 frozen local candidate — selected work

- Starting revision: `c49334ae6ab6232a9bb6b704425c5989e3846ada` on clean
  `main`; no staged or inherited product work.
- Candidate paths: `README.md`, `SITE_HANDOFF.md`, `src/app.css`,
  `src/components/Main.svelte`, `src/components/ProjectCard.svelte`,
  `src/index.test.ts`, `src/lib/projects.ts`, `src/routes/+page.svelte`, and
  `src/seo.test.ts`.
- Product change: added the canonical `https://perchpoints.com` project,
  reordered all five records, separated the three related public systems from
  the two focused repositories, kept every property distinct, and added
  project-specific external-link accessible names.
- Asset decision: project cards remain intentionally text-only. No project
  logo, screenshot, owner photo, or new alternative-text claim was introduced;
  the accepted portrait and social-card assets are unchanged.
- Discovery change: the single canonical `/` route and sitemap posture are
  unchanged. Its rendered JSON-LD now includes a five-item selected-work
  `ItemList` derived from the same source as the cards.
- Automated evidence: Svelte sync/check passed with 0 errors and 0 warnings;
  Vitest passed 3 files / 10 tests; ESLint passed; targeted Prettier checks for
  the non-CSS candidate files passed; production Cloudflare-adapter build
  passed; `git diff --check` passed.
- Rendered evidence: 360x800, 375x667, 390x844, 430x932, 640/641, 780/781,
  844x390, 1024x600, 1050/1051, 1440x900, and 2048x1052 were measured after
  hydration. Every viewport had document `scrollWidth === clientWidth`; mobile
  cards measured 314–419px tall, all five titles stayed on one line at phone
  widths, and the 3/2/1-column collection transitions matched their intended
  seams. Visual inspection covered 390x844, 844x390, 1024x600, 1280x720, and
  2048x1052.
- Rendered content evidence: the public card and JSON-LD order is Roost Atlas,
  PerchPoints, Mr. Crowmeister, Canyon Rain, DungeonCrawler; all five accessible
  external-link names and canonical destinations resolve from one data source.
  No excluded-property name appears in rendered HTML.
- Local-only limitations: Turnstile reports its expected unsupported-local-
  hostname warning; inquiry behavior was not changed. The repository-wide
  `prettier --check .` portion of the aggregate lint script still encounters
  the pre-existing unformatted `docs/SPACING_BRIEF.md` and unsupported
  `static/sitemap.xml`. `src/app.css` also retains its accepted compact legacy
  blocks, so the whole-file Prettier check remains intentionally outside the
  targeted formatting pass; the added CSS follows the surrounding expanded
  section style and `git diff --check` passes.
- Builder-created disposable tooling residue: `.pnpm-store/`, `.wrangler/`,
  `pnpm-lock.yaml`, and `pnpm-workspace.yaml` appeared during local tool setup.
  They are not product work, are excluded from the candidate identity, must not
  be staged, and remain unremoved because cleanup was not authorized.
- Release state: local candidate only. No commit, staging, push, remote Git,
  deployment, DNS/account action, custom-domain verification, publication, or
  owner acceptance occurred.
- Next action: independent Traditional Reviewer audits the frozen candidate and
  its canonical path/hash manifest before any correction or release decision.
