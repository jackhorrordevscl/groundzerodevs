# groundzerodevs

Bilingual (ES/EN) static landing page for the software studio groundzerodevs, live at <https://groundzerodevs.com>. Built with [Astro](https://astro.build) and a small PHP contact handler, hosted on shared hosting (HostGator).

## Requirements

- Node.js 22.12 or newer and npm.
- PHP 7.4 or newer, only to run the contact handler tests.

## Commands

```sh
npm ci                  # install exact dependencies
npm run dev             # dev server with hot reload
npm run build           # static output in dist/
npm run preview         # serve dist/ locally
PHP_BIN=/path/to/php npm run test:contact   # contact handler tests (PHP_BIN defaults to `php` on PATH)
```

## Project structure

| Path | What it holds |
| --- | --- |
| `src/components/` | One Astro component per section (Hero, Pillars, Cases, Sustain, Process, Contact, Footer, Header). |
| `src/i18n/` | Typed dictionaries: `types.ts` (shape), `es.ts` (default, neutral Spanish), `en.ts`. Both must keep identical keys. |
| `src/data/cases.ts` | Case URLs, status and image paths. |
| `src/pages/` | `/` (ES) and `/en/` (EN). |
| `public/` | `contact.php` handler, `contact.config.php`, `.htaccess`, `robots.txt`, favicons, OG image, case screenshots in `public/cases/`. |
| `tests/` | Contact handler tests. |
| `docs/` | Deploy, email and analytics guides. |
| `odd/tasks/` | Working plan and decisions log. |

## Add or edit a case

1. Add or update the entry in `src/data/cases.ts` (URL, status, image path).
2. Write the case copy in **both** `src/i18n/es.ts` and `src/i18n/en.ts`.
3. Add a 1440x900 WebP screenshot of the public site to `public/cases/` (never the interior of an app, never client user data).
4. Run `npm run build` and check `/` and `/en/`.

## Sustain counters

The numbers in the Sustain section (`sustain.counters` and `sustain.note` in both dictionaries) are refreshed by hand. The measurement method, repos, commands and cutoff date are in `odd/tasks/landing-groundzerodevs.md`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PUBLIC_CF_BEACON_TOKEN` | Optional. Enables Cloudflare Web Analytics at build time. |

No secrets are committed. Local contact overrides go in `public/contact.local.php`, which is gitignored.

## Guides

- [Deploy](docs/deploy.md): build, upload the zip through cPanel File Manager, smoke tests, rollback.
- [Email setup](docs/email-setup.md): SPF, DKIM, DMARC and mail delivery.
- [Analytics](docs/analytics.md): Cloudflare Web Analytics.

## Conventions

Conventional Commits. Work goes directly on `main` unless noted otherwise.

## License

All rights reserved. The code and content in this repository are not licensed for reuse.
