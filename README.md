<div align="center">

# groundzerodevs

**Software studio landing page. Bilingual, static, fast.**

[![Live](https://img.shields.io/badge/live-groundzerodevs.com-0a0a0a?style=flat-square)](https://groundzerodevs.com)
![Astro](https://img.shields.io/badge/Astro-7-ff5d01?style=flat-square&logo=astro&logoColor=white)
![Node](https://img.shields.io/badge/Node-%E2%89%A522.12-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-%E2%89%A57.4-777bb4?style=flat-square&logo=php&logoColor=white)
![License](https://img.shields.io/badge/license-All%20rights%20reserved-lightgrey?style=flat-square)

</div>

---

## What is this?

The public website of **groundzerodevs**, a software studio. It is a fully static site built with [Astro](https://astro.build), with a small PHP handler for the contact form, deployed to shared hosting (HostGator).

## Features

- **Bilingual (ES/EN):** Spanish at `/`, English at `/en/`, driven by typed dictionaries that must keep identical keys.
- **Case showcase:** six real projects shown as 16:10 thumbnails in a responsive grid (three columns on wide screens), with one featured case.
- **Contact form:** PHP handler with its own test suite, SPF/DKIM/DMARC guidance and local overrides that never reach git.
- **Static output:** no server runtime, no database. `dist/` is uploaded as-is.
- **SEO ready:** sitemap, `robots.txt`, favicons and Open Graph image.
- **Privacy-friendly analytics:** optional Cloudflare Web Analytics, enabled at build time only.

## Quick start

```sh
npm ci            # install exact dependencies
npm run dev       # dev server with hot reload
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

Contact handler tests (needs PHP 7.4+):

```sh
PHP_BIN=/path/to/php npm run test:contact   # PHP_BIN defaults to `php` on PATH
```

## Requirements

| Tool | Version | Needed for |
| --- | --- | --- |
| Node.js + npm | 22.12 or newer | Everything |
| PHP | 7.4 or newer | Contact handler tests only |

## Project structure

| Path | What it holds |
| --- | --- |
| `src/components/` | One Astro component per section (Hero, Pillars, Cases, Sustain, Process, Contact, Footer, Header). |
| `src/i18n/` | Typed dictionaries: `types.ts` (shape), `es.ts` (default), `en.ts`. |
| `src/data/cases.ts` | Case URLs, status and image paths. |
| `src/pages/` | `/` (ES) and `/en/` (EN). |
| `public/` | `contact.php`, `contact.config.php`, `.htaccess`, `robots.txt`, favicons, OG image, case screenshots in `src/assets/cases/` (resized at build). |
| `tests/` | Contact handler tests. |
| `docs/` | Deploy, email and analytics guides. |
| `odd/tasks/` | Working plan and decisions log. |

## Add or edit a case

1. Add or update the entry in `src/data/cases.ts` (URL, status, image path).
2. Write the case copy in **both** `src/i18n/es.ts` and `src/i18n/en.ts`.
3. Add a 1440x900 WebP screenshot of the public site to `src/assets/cases/` (never the interior of an app, never client user data).
4. Run `npm run build` and check `/` and `/en/`.

## Configuration

| Variable | Purpose |
| --- | --- |
| `PUBLIC_CF_BEACON_TOKEN` | Optional. Enables Cloudflare Web Analytics at build time. |

No secrets are committed. Local contact overrides go in `public/contact.local.php`, which is gitignored.

The numbers in the Sustain section (`sustain.counters` and `sustain.note` in both dictionaries) are refreshed by hand. The method, repos, commands and cutoff date are in `odd/tasks/landing-groundzerodevs.md`.

## Guides

- [Deploy](docs/deploy.md): build, upload the zip through cPanel File Manager, smoke tests, rollback.
- [Email setup](docs/email-setup.md): SPF, DKIM, DMARC and mail delivery.
- [Analytics](docs/analytics.md): Cloudflare Web Analytics.

## Contributing

Conventional Commits. Work goes directly on `main` unless noted otherwise.

## License

All rights reserved. The code and content in this repository are not licensed for reuse.
