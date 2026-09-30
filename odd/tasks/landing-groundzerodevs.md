# Feature: groundzerodevs landing

## Objective
Bilingual (ES default, EN at `/en/`) marketing landing for the groundzerodevs software agency (Chile base, LATAM reach), targeting SMBs and startups. Deployed as a static site on HostGator shared hosting at groundzerodevs.com.

## Why
Give the agency a distinctive ("Ground Zero" identity, not generic LATAM look) public presence with honest, verifiable metrics.

## Scope
- Sections: hero · pillars · cases · sustain · process (4 steps) · contact · footer.
- Pillars: Build / Presence / Sustain. AI is a cross-cutting layer, not a pillar.
- Approved design: C "Editorial cálido" + blueprint details from A. Hero visual review approved 2026-09-30. Design sources: `_design/project/` (C ES, D EN). Canvas: https://claude.ai/artifact/1GM1Xi3y9exZaUUU1QvgxG
- Out of scope: testimonials (deferred), client-specific data.

## Constraints
- Palette: charcoal #0B0E11, bone #EDEBE4, amber #FFB020 (green only for functional states).
- Fonts (Google Fonts): Bricolage Grotesque 700/800, Instrument Sans 400/500/600, JetBrains Mono 400/500.
- Contact: WhatsApp +56 9 5603 9666 (wa.me/56956039666), form, contacto@groundzerodevs.com. Do NOT publish jmartinez@groundzerodevs.com.
- Cases: Umbral (umbral.groundzerodevs.com, early access), Morgado (morgadoyasociados.cl), Journaling En Red (journalingenred.vercel.app), Elizabeth Maureira Attorney (elizabeth-landing.vercel.app). MAGI (github.com/jackhorrordevscl/magi) as mention only, no NERV/Evangelion imagery.
- Sustain counters (cutoff 2026-09-29): 204 issues, median ~3 h Umbral, ~19 h Morgado, 4 projects in maintenance, +2 in development. Never mix global averages; never expose Umbral issue detail.
- Never publish client user data (health and legal sectors). Screenshots: 1440x900 WebP, public pages only; Umbral landing only, never app interior.
- Artifacts (code, UI copy, comments) in English except ES site copy, which is neutral Spanish (tuteo).

## Stack
Astro (static output, native i18n) + PHP script for the contact form (honeypot, SMTP or `mail()` with SPF/DKIM) + cookieless analytics (Plausible or Cloudflare Web Analytics). Deploy: upload `dist/` to `public_html` via cPanel/FTP; `.htaccess` HTTPS redirect.

## Workflow settings
- TDD: not enabled (no source configured). Functional checks per task: `astro build`, link check, manual browser check; Lighthouse at T7.
- Delivery strategy: `ask-on-risk`. Forecast ~1500 authored changed lines; slice into chained PRs if a remote repo is created.
- Route per task is recorded under Progress once executed.

## Tasks
- [x] T0 Initialize git repo in the project root and create feature branch (user authorized 2026-09-30). Evidence: branch `feat/landing`, remote `origin` = github.com/jackhorrordevscl/groundzerodevs (empty repo, nothing pushed); commits 015863d, 0150c8d.
- [x] T1 Scaffold Astro project, i18n routing (`/` ES, `/en/` EN), design tokens (colors, fonts), base layout. Check: `astro build` passes.
- [x] T2 Hero (ES) with blueprint details: grid, axes, origin 0,0, pillars, Santiago coordinate (33.4489° S · 70.6693° W). Check: visual match with approved C.
- [x] T3 Remaining ES sections: pillars, cases (placeholder images), sustain counters, process, contact block, footer. Check: build + copy matches `landing-decisions`.
- [ ] T4 EN version at `/en/` from approved D copy (Build/Presence/Sustain, issues, Discovery/Plan/Build/Operate, Attorney). Check: parity with ES, no overflow.
- [ ] T5 Contact form: PHP handler, honeypot, validation, delivery to contacto@groundzerodevs.com; SPF/DKIM checklist. Check: test submission received, not spam-foldered.
- [ ] T6 SEO and analytics: meta, hreflang, sitemap, OG image, cookieless analytics. Check: hreflang valid, analytics event seen.
- [ ] T7 Responsive, accessibility, performance pass. Check: Lighthouse and mobile viewport review.
- [ ] T8 Deploy to HostGator: `.htaccess` (HTTPS, caching), upload `dist/`, verify live. Check: both languages and form work on the real domain.
- [ ] T9 Replace placeholder case images with real screenshots (blocked: user delivers the 4 captures).

## Open items (user)
- Written OK from clients for the portfolio cases.
- 4 case screenshots per spec above.

## Progress
Plan created 2026-09-30.
- T0 done inline (git init, branch, remote, docs commits).
- T1 done via delegated writer (trigger: 2+ non-trivial files). Commit 717ab1c. Checks observed: `npm run build` OK, 2 pages; `dist/index.html` lang="es", `dist/en/index.html` lang="en"; parent re-ran the build. Astro ^7.3.5. Design values reused from C-Editorial; green #2ea36b is a writer choice (design has none). Bricolage 500 is not loaded (spec says 700/800).
- Untracked `.atl/` (tooling output) left out of commits.

- T2 done via delegated writer (trigger: 2+ non-trivial files). Commit 7fbd3a3. Added Header.astro (C artboard includes nav) and Hero.astro; fluid layout (2 columns from 1100px). Checks observed: `npm run build` OK (parent re-ran); one h1; WhatsApp link x2; coordinate text present. Visual check by writer via headless Chromium screenshots at 1440/1100/800/360px, no overflow seen; NOT verified: numeric overflow measurement, last two small CSS edits re-shot, 1600px+, real device. Bricolage 500 not needed. Nav links wrap on <1024px (no mobile menu yet: revisit in T7).
- T2 verification by parent with Playwright (playwright-core, Brave 154, headless, script kept in scratchpad, not in repo) against `astro preview`: widths 360/390/640/768/1024/1100/1280/1440/1600/1920 have no horizontal overflow and no off-screen elements; one h1 at every width; fonts loaded (Bricolage 800, Instrument Sans 400/500/600, JetBrains Mono 400/500); Tab focus ring visible on all 8 stops; 0 running animations with prefers-reduced-motion; WCAG AA contrast: no failures; `/en/` returns 200 with lang="en". Findings: (1) at 360px the `y ↓` tick touches the `03 SOSTENER` chip in the diagram (seen in screenshot) — open, fix in T7 or sooner; (2) no favicon (404 on /favicon.ico) — add in T6; (3) nav anchors (#servicios, #casos, #sostener, #proceso, #contacto) have no targets until T3.
- `.atl/` added to .gitignore (be741d9).
- Finding (1) fixed: `.pillar-3` moved to top 68% below 40rem (1dff63f). Verified by measuring bounding boxes of 6 diagram elements at 16 widths (320–1920): 0 overlaps, 0 overflow; screenshot of the diagram at 360px checked by eye.
- T3 done via delegated writer (trigger: 2+ non-trivial files). Commits 325c89f, a7268e4, 0f5733b, 04b783d (each builds). New components Pillars, Cases, CaseThumb, Sustain, Process, Contact, Footer; `src/data/cases.ts` centralizes case URLs and image paths (T9 swaps images there). Contact form markup posts to `/contact.php` (handler is T5), honeypot field `website`. Well over the 400-line heuristic: six sections plus a data module.
- T3 parent verification (Playwright + Brave, full page): build OK; no horizontal overflow at 320/360/390/640/768/1024/1100/1440/1600/1920; only off-screen element is the intentional honeypot; 1 h1 and 5 h2; no `jmartinez@` in `dist/index.html`; counters present (204, ~3 h, ~19 h); only 404 is the missing favicon (T6); 1440 full-page screenshot inspected, all sections present and consistent with C. NOT verified: other browsers/devices, contrast beyond 1440, hover states, form submit, external links loading, Lighthouse.
- Open for T7: (a) `EN` nav link is 19–21px tall, under the 24px WCAG 2.2 target size (enlarge hit area); inline email and MAGI links are 21px (inline text links are exempt, optional); (b) mobile nav wraps to a second row, no menu; (c) decide max content width for very wide screens (full-bleed at 1920); (d) contrast only tested at 1440.
- Open for T6: favicon.

## Next step
T4: EN version at `/en/` from the approved D copy.
