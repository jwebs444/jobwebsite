# JasonWeber.me Responsive Spacing Brief

Date: 2026-08-11

## Review record

- Repository: `jwebs444/JasonWeber.me`
- Base revision: `0c96afd87a02b0821ece1eb693daa3e5041944ed`
- Live source branch: `main`
- Route reviewed: `/`
- Framework: SvelteKit with the Cloudflare adapter
- Publication path: GitHub checks followed by Cloudflare Pages deployment from `main`

## Composition intent

The route is a long professional editorial journey rather than a forced stack of
identical full-screen panels. Its major chapters are:

1. professional claim and portrait;
2. working approach;
3. selected work;
4. experience;
5. outcomes and education;
6. inquiry and footer.

On phones, sections expand naturally to protect type, project evidence, form
states, and reading order. Short landscape receives its own compact hero so the
claim, supporting copy, primary action, and portrait all remain present in the
first viewport. QHD and 4K use a wider but still bounded editorial shell.

## Baseline findings

- At 360-430 pixel widths, the decorative hero grid expanded to the CSS
  viewport rather than the document client width. The body clipped the result,
  concealing 8-31 pixels of document-level overflow.
- At 844 x 390, the 760-pixel tablet hero placed the lower headline, supporting
  copy, and both actions below the first viewport.
- At QHD and 4K, the fixed 1240-pixel shell and 820-pixel hero produced a small
  central island while the full-bleed backgrounds continued across the display.
- The project-card header retained automatic intrinsic minimum sizing around
  large unbroken project names.
- The mobile Contact control lacked an explicit 44-pixel minimum target.

## Corrections

- Constrained the decorative hero grid to its owning hero rather than using
  hidden viewport overflow.
- Added explicit intrinsic-size ownership to project-card grid descendants and
  safe wrapping for exceptional phone-width titles.
- Added a height-aware landscape hero from 640 pixels wide through 760 pixels
  high. At 761 pixels high, the existing 760-pixel tablet hero resumes without
  an abrupt height jump.
- Kept the landscape portrait, claim, explanation, and actions in a single
  first-screen composition.
- Added a 44-pixel minimum Contact target and retained 44-pixel landscape hero
  actions.
- Added a restrained wide-screen shell, hero, portrait, heading, and section
  scale above 2000 pixels.

## Validation matrix

- 360 x 800
- 375 x 667
- 390 x 844
- 430 x 932
- 640/641, 780/781, and 1050/1051 breakpoint seams
- 720 x 500, 844 x 390, 900 x 501, and 1024 x 600 landscape
- 768 x 1024 and 1024 x 768 tablets
- 1366 x 768 and 1440 x 900 laptops
- 1920 x 1080 desktop
- 2560 x 1440 QHD
- 3840 x 2160 wide/4K

The ready form, visible security states, form errors, and success replacement
must be measured separately because their natural heights differ. Exact route
height is intentionally relaxed for those states and for browser zoom.

## Adversarial targets

- One-pixel transitions at 760/761 height and the existing 780/781 and
  1050/1051 width breakpoints.
- `DungeonCrawler` and other unbroken project labels at 320-390 pixel widths.
- Portrait subject and caption survival in short landscape and wide crops.
- Inquiry ready, blocked, error, and success states with the footer visible.
- Section-top reveals at laptop, QHD, and 4K widths.

## Validation

- Svelte diagnostics: 0 errors and 0 warnings.
- Vitest: 2 files and 5 tests passed.
- Production Vite/Cloudflare build: passed.
- Prettier and ESLint: passed.
- Final rendered matrix: no document-level horizontal overflow at any recorded
  viewport.
- Short-landscape seams at 780/781 and 1050/1051 pixels produced matching
  one-viewport heroes and complete actions at the tested 700-pixel height.
- Adversarial source/measurement review: Ready with notes. The independent
  reviewer could not obtain its own browser backend, so root-rendered crop,
  section-reveal, and state evidence remains the visual record.
