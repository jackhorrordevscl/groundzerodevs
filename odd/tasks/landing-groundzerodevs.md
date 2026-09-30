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
- [x] T5 Contact form: PHP handler, honeypot, validation, delivery to contacto@groundzerodevs.com; SPF/DKIM checklist. Check: test submission received, not spam-foldered.
- [x] T6 SEO and analytics: meta, hreflang, sitemap, OG image, favicon, cookieless analytics. Check: hreflang valid; analytics event NOT seen (no token yet). Evidence: commits 92e96c8, 39765f9, ec8ff2b.
- [x] T7 Responsive, accessibility, performance pass. Check: Lighthouse and mobile viewport review. Evidence: commits 0219cf4, cc4a4b8, e4b5f9f, 66df8d9, 0771b92.
- [ ] T8 Deploy to HostGator: `.htaccess` (HTTPS, caching), upload `dist/`, verify live. Check: both languages and form work on the real domain.
- [ ] T9 Replace placeholder case images with real screenshots (blocked: user delivers the 4 captures).

## Open items (user)
- Cloudflare Web Analytics token (deferred by user 2026-09-30): set `PUBLIC_CF_BEACON_TOKEN` at build time before T8 deploy, then confirm the event (see `docs/analytics.md`). Until then the site builds without analytics.
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

- T5 done via delegated writer (trigger: 2+ non-trivial files). User confirmed contacto@groundzerodevs.com is a working cPanel mailbox. Decision: PHP `mail()` (From/To contacto@, `-f` envelope, Reply-To visitor), no SMTP credentials in the repo; SMTP is the fallback if messages land in spam. Commits 19f2842 (handler, config, .htaccess, docs/email-setup.md, tests/contact.test.mjs) and 0bb9317 (front-end status + fetch enhancement); parent hardening: the Reply-To display name is always RFC 2047 encoded (found in code review: names like `Doe, John <x@y>` were emitted as address syntax) with a new test. Handler: POST only, same-origin check, honeypot `website`, validation (name 2–100, email ≤254, message 10–5000), CR/LF neutralized, per-IP throttle (1/30 s, 10/hour) in `sys_get_temp_dir()/groundzerodevs-contact`, PRG redirects (`/?sent=1#contacto`, `/en/?error=<code>#contact`) or JSON.
- T5 parent verification: portable PHP 7.4.33 and 8.4.26 in scratchpad (not installed system-wide, not in repo). `php -l` OK on both; `npm run test:contact` 14/14 on both (transport `file`, no real mail). End-to-end in Brave/Playwright against `php -S` serving `dist/` with `contact.local.php` transport `file`: ES and EN JS submit → 200, success message localized and focused, form cleared, no navigation; server-side invalid input → localized error, form kept; both valid messages in outbox, invalid one not delivered. Agent also ran redirect flow and JS-disabled post, and layout/contrast recheck at 390/1440.
- T5 NOT verified (needs T8): real `mail()` delivery on HostGator and inbox vs spam, SPF/DKIM/DMARC, `.htaccess` deny rules (`/contact.config.php` and `/contact.local.php` must return 403), PHP version on the host. Known limitation: with JavaScript disabled the redirect works but no message is shown.
- Open for T8: decide `allowed_hosts` for `www.groundzerodevs.com` (empty by default; prefer redirecting www to the apex in `.htaccess`); after deploy send a real test from the form both languages and follow `docs/email-setup.md`. Stale comment in Contact.astro fixed.

- T6 done via delegated writer (trigger: 2+ non-trivial files). Commits 92e96c8 (hreflang es/en/x-default, canonical, `@astrojs/sitemap`, robots.txt, OG/Twitter, `og.png` 1200x630, no tagline so one image serves both languages), 39765f9 (favicon svg + ico), ec8ff2b (Cloudflare Web Analytics beacon rendered only when `PUBLIC_CF_BEACON_TOKEN` is set at build; `docs/analytics.md`). Parent verification: `npm run build` OK (2 pages); hreflang and canonical reciprocal and absolute on both pages; sitemap-index, sitemap-0 and robots.txt in dist; favicon files in dist; no beacon without the token (writer also verified the dummy-token build).
- T6 NOT verified: analytics event (needs the real Cloudflare token), favicon in a browser tab, social-card validators, Google hreflang tooling, `test:contact` (no PHP in this run). `.env.example` could not be written (path denied by permission settings); `docs/analytics.md` tells the user to create `.env` directly. hreflang uses plain `es`/`en`, `og:locale` uses es_CL/en_US.

- T7 done via delegated writer (trigger: 2+ non-trivial files). Commits 0219cf4 and cc4a4b8 (ES|EN switch, footer switch and footer email link at 24px minimum target), e4b5f9f (mobile menu below 1024px: button with aria-expanded/aria-controls, Enter/Space, Escape, closes on link; nav stays visible without JS), 66df8d9 (content capped at 1440px via `--pad-x`, backgrounds full-bleed), 0771b92 (non-blocking font CSS with noscript fallback, inlined stylesheets, brand link aria-label removed and unused `homeLabel` key dropped). Parent verification: `npm run build` OK (2 pages), tree clean, `aria-expanded` present on both pages, no `jmartinez@`. Writer verification (Playwright + Brave, 11 widths 320-1920, both languages): 0 overflow, target sizes >=24px, contrast AA with menu open and closed, menu keyboard/mouse behavior, JS-off and reduced-motion, screenshots viewed. Lighthouse (Brave headless on preview) 100/100/100/100 on `/` and `/en/`, mobile and desktop; before, only `/en/` mobile Performance was 92. One run after; numbers vary.
- T7 NOT verified: real devices, non-Chromium browsers, screen readers, menu-button hover contrast, `/en/` 1920 screenshot, widths between 640 and 1024 beyond 640/768, Lighthouse on the real host (T8). Decisions taken by the writer: at 320px the menu button wraps under the brand; on mobile the ES|EN switch and WhatsApp CTA live inside the menu panel.

- T8 local prep done via delegated writer: commits a500f28 (hardened `.htaccess`: HTTPS + www to apex in one 301, 403 on config/dot/md/log files, caching, gzip, security headers; no CSP, HSTS commented out) and 20cf4da (`docs/deploy.md`). Host PHP is 8.3 (ea-php83, system default; user should confirm the domain row in MultiPHP Manager). FTP: `ftp.groundzerodevs.com` rejects explicit FTPS (504 on AUTH TLS/SSL); the account is jailed outside `public_html`; the user chose cPanel zip upload instead (plain FTP was authorized for the session but not needed). First zip was corrupt (bsdtar padding); rebuilt with .NET ZipArchive (forward slashes, `unzip -t` OK, 55 KB, sha in scratchpad none) and extracted by the user 2026-09-30. `*.zip` ignored in git (c8645fb).
- T8 live verification by parent (read-only GET/HEAD on https://groundzerodevs.com, 2026-09-30): http and www (http/https) -> 301 to `https://groundzerodevs.com/`; `/` 200 (42200 B) and `/en/` 200 (41929 B), matching dist sizes; ES/EN `lang`, titles, canonical and hreflang correct; `/contact.config.php`, `/contact.config.php/x`, `/CONTACT.CONFIG.PHP`, `/contact.local.php`, `/.htaccess` -> 403; favicon.ico, og.png, robots.txt, sitemap-index.xml and sitemap-0.xml -> 200; unknown path -> 404; gzip on; security headers present; no beacon (no token). NOT verified: form submit and mail delivery (spam/SPF/DKIM/DMARC), PHP version actually used by the domain, Lighthouse on the live host, HSTS/CSP (not enabled).

## Next step (updated)
Finish T8: real form test in ES and EN (message in contacto@, not spam), SPF/DKIM/DMARC per `docs/email-setup.md`, delete the temporary FTP account `gentle@`. Then T9 and the deferred Cloudflare token.

## Previous next step
T8: deploy to HostGator (`.htaccess` HTTPS/caching/www redirect, `allowed_hosts`, upload `dist/`, real form test both languages, SPF/DKIM/DMARC, 403 on `contact.config.php`). Needs the user's cPanel/FTP access decisions and the Cloudflare token (deferred). T9 (screenshots) blocked on the user.

## Previous next step
T5: PHP contact form handler (`/contact.php`) with honeypot, validation and delivery to contacto@groundzerodevs.com; SPF/DKIM checklist. Needs a user decision on mail delivery (see below).
