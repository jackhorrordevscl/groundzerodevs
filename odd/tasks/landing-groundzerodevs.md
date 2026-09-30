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
- Cases: Umbral (umbral.groundzerodevs.com, early access), Morgado (morgadoyasociados.cl), Journaling En Red (journalingenred.vercel.app), Elizabeth Maureira Attorney (abogadaelizabeth.vercel.app). MAGI (github.com/jackhorrordevscl/magi) as mention only, no NERV/Evangelion imagery.
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
- [x] T4 EN version at `/en/` from approved D copy (Build/Presence/Sustain, issues, Discovery/Plan/Build/Operate, Attorney). Check: parity with ES, no overflow.
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

- T4 done via delegated writer (trigger: 2+ non-trivial files). Commits a42d5cc (typed i18n dictionaries `src/i18n/{types,index,es,en}.ts`, ES output kept equivalent) and 2664ed2 (EN page + language switch). Refactor was 570 insertions / 157 deletions, over the 400-line heuristic. EN section ids: services, work, sustain, process, contact (ES ids unchanged). Hidden `lang` input added to the form on both languages so the T5 handler can answer in the right language (the only ES output change). D had no title/meta description: translated from ES (note for user review). Screen-reader strings and honeypot label are translations, not from D.
- T4 parent verification (Playwright + Brave): build OK (2 pages); `/` and `/en/` at 320/390/768/1440/1920 have no horizontal overflow, all nav anchors resolve, correct `lang`, correct `aria-current` language, 5 h2 each, no `jmartinez@`; no failing requests besides known favicon; `/en/` 1440 full-page screenshot inspected, sections and copy consistent with D. Writer also reported: ES/EN parity (6 sections, 11 h3, 20 links, 4 counters, same 5 form fields), contrast AA no failures on 111 text nodes at 1440 and 390, Spanish-word scan hits all legitimate. NOT verified: hover states on EN, form submit (T5), external links loading, other browsers, Lighthouse, pixel comparison against D.
- Open for T6: hreflang alternates (links currently carry `hreflang` attributes only in the language switch), sitemap, OG, favicon.
- Open for T7: language-switch link (`ES`/`EN`) height under 24px, mobile nav, max width at 1920.

- Full re-verification 2026-09-30 (Playwright + Brave 154, fresh build, `astro preview`), commit 08f84a7: `/` and `/en/` at 320/360/390/640/768/1024/1100/1280/1440/1600/1920: no overflow, no off-screen elements (except honeypot), no missing anchors or duplicate ids, all form fields labeled, no heading skips, 1 h1 and 5 h2, contrast AA on 111 text nodes at every width (0 failures), no console/network errors besides favicon. Keyboard: 24 tab stops per page at 1440 and 390, all with visible focus, honeypot never focused. Hover contrast on 14 links per page: no failures. Form: 3 required fields, empty and bad-email rejected, valid accepted, honeypot tabindex -1 and aria-hidden, hidden `lang` correct on both pages. Language switch works both ways. No animations with reduced motion. EN text has no Spanish stopwords. External links: Umbral, Morgado, Journaling, MAGI return 200 with target/rel set.
- RESOLVED: `https://elizabeth-landing.vercel.app/` returned 404 `DEPLOYMENT_NOT_FOUND`. User supplied `https://abogadaelizabeth.vercel.app/` (GET 200, title "Elizabeth Maureira — Abogada en Providencia, Santiago"); `src/data/cases.ts` updated and the built ES and EN pages contain only the new URL.
- Note: the WhatsApp links open in the same tab (no `target="_blank"`); left as is, decision for user (optional).
- Still NOT verified: form submit (T5), other browsers/devices, Lighthouse. Known and open: ES|EN switch link under 24px height (T7), favicon (T6).

## Next step
T5: PHP contact form handler (`/contact.php`) with honeypot, validation and delivery to contacto@groundzerodevs.com; SPF/DKIM checklist. Needs a user decision on mail delivery (see below).
