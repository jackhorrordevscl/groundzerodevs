# Deploy to HostGator (shared hosting, FTP)

Static Astro site plus one PHP script (`contact.php`). Everything in `dist/` goes into `public_html/`.
Mail setup (SPF/DKIM/DMARC, transport, throttle) lives in [`email-setup.md`](email-setup.md); analytics in [`analytics.md`](analytics.md).

## Prerequisites

- [ ] cPanel > **MultiPHP Manager** (or "Select PHP Version"): domain `groundzerodevs.com` runs PHP **7.4 or newer**. The handler is tested on 7.4 and 8.4.
- [ ] PHP features the handler needs (all standard, enabled by default): PCRE with UTF-8 (`preg_*` with `/u`), `json`, `hash`, `filter` (`filter_var`), `mail()`. It does **not** need `mbstring`.
- [ ] Mailbox `contacto@groundzerodevs.com` exists (cPanel > Email Accounts).
- [ ] A valid SSL certificate for `groundzerodevs.com` and `www.groundzerodevs.com` (cPanel > SSL/TLS Status, run AutoSSL). Without it, the HTTPS redirect shows a browser warning.
- [ ] DNS: both `groundzerodevs.com` and `www` point to the hosting (the `www` redirect needs it to resolve).
- [ ] Cloudflare token, if you want analytics now (optional, see below).

## Build

```sh
npm ci
npm run build
# with analytics:
PUBLIC_CF_BEACON_TOKEN=<token> npm run build
```

Check `dist/` contains `.htaccess`, `contact.php`, `contact.config.php`, `index.html`, `en/index.html`, `sitemap-*.xml`, `robots.txt`, `og.png`, favicons. Do **not** upload `contact.local.php` unless you need overrides (it is gitignored and never built).

## Upload

Upload the **contents** of `dist/` into `public_html/` (not the `dist` folder itself). Overwrite existing files.

- **`.htaccess` is a dotfile.** Most FTP clients hide it, so it is easy to skip. FileZilla: Server > *Force showing hidden files*. cPanel File Manager: Settings > *Show Hidden Files*. Without it there is no HTTPS redirect and `contact.config.php` is publicly readable (it holds no secrets, but keep it private).
- Transfer type: **Auto** or **Binary**. Never ASCII for `og.png` and `favicon.ico`.
- Prefer FTPS (explicit TLS) or SFTP if the account offers it; plain FTP sends the password unencrypted.
- Before overwriting, download the current `public_html/` to a dated local folder (rollback, below).

## Smoke tests, in order

Run in a private window or after a hard refresh.

- [ ] `http://groundzerodevs.com/` redirects to `https://groundzerodevs.com/` (301, one hop).
- [ ] `http://www.groundzerodevs.com/` and `https://www.groundzerodevs.com/en/` redirect to `https://groundzerodevs.com/...` in a single hop (browser dev tools > Network, or `curl -sI`).
- [ ] `https://groundzerodevs.com/` loads (ES), no mixed-content warnings, fonts render.
- [ ] `https://groundzerodevs.com/en/` loads (EN); the language switch works both ways.
- [ ] `/favicon.ico` and `/favicon.svg` return 200 (tab icon shows).
- [ ] `/sitemap-index.xml` and `/robots.txt` return 200 and list `https://groundzerodevs.com/...` URLs.
- [ ] `/og.png` returns 200 (1200x630).
- [ ] `/contact.config.php` returns **403**. Also `/contact.local.php` (403 or 404) and `/.htaccess` (403).
- [ ] `/contact.php` opened in the browser (GET) returns 405, not a blank 200 or a PHP error.
- [ ] Form submit in ES: success message appears.
- [ ] Form submit in EN: success message appears.
- [ ] Both messages arrive in the `contacto@` inbox, **not spam**; Reply targets the visitor. In Gmail "Show original": SPF, DKIM, DMARC = PASS.
- [ ] Headers (`curl -sI https://groundzerodevs.com/`): `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, `Cache-Control: no-cache`; `Content-Encoding: br` or `gzip` on `curl -sI -H "Accept-Encoding: gzip, br" ...`.
- [ ] If analytics is enabled: a page view shows in Cloudflare Web Analytics within minutes (ad blockers hide your own visit).
- [ ] Optional: run Lighthouse on the live URL.

If the form does not deliver: `error_log` in `public_html` (look for `contact.php: delivery failed`) and cPanel > Track Delivery. Messages in spam: fix SPF/DKIM/DMARC per `email-setup.md`, then consider SMTP.

## What `.htaccess` does

| Rule | Effect |
| --- | --- |
| HTTPS + apex redirect | Any `http://` or `www.` request goes to `https://groundzerodevs.com/...` in one 301. Only for `groundzerodevs.com` and `www.` hosts, so other subdomains sharing `public_html` are untouched. `/.well-known/` validation paths stay on HTTP for AutoSSL. |
| Deny 403 | `contact.config.php`, `contact.local.php` (and backups), dotfiles, `*.md`, `*.log`, and similar. |
| Cache | HTML/XML/TXT `no-cache`; icons and images one day; `_astro/*` one year immutable (currently no such files, the build inlines CSS). |
| Compression | Brotli or gzip when the modules exist. |
| Headers | nosniff, `SAMEORIGIN` framing, referrer policy, minimal Permissions-Policy. |
| No directory listing | `Options -Indexes`. |

Deliberately not set: **HSTS** (commented in `.htaccess`; enable `max-age=31536000` only once HTTPS has been stable for a while, it is hard to undo) and **CSP** (would need to allow `fonts.googleapis.com`, `fonts.gstatic.com`, Astro's inline styles/scripts and, with analytics, `static.cloudflareinsights.com` and `cloudflareinsights.com`; not verifiable without the live host).

`allowed_hosts` in `contact.config.php` stays empty: the form is posted from the same host that serves the page, and `www` redirects to the apex.

## Rollback

1. Keep the previous `public_html/` download (dated folder) until the new release passes the smoke tests.
2. To revert, re-upload that folder over `public_html/` (including `.htaccess`), then hard-refresh.
3. The previous Git state is also rebuildable: `git checkout <commit> && npm ci && npm run build`.
4. If a bad `.htaccess` causes a 500 error, rename or delete it in File Manager to restore access, then fix the rule.

## Limits of this guide

Written and reviewed offline: the `.htaccess` has not been run on Apache and HostGator specifics (module availability, `AllowOverride`, PHP `mail()` reputation) are unconfirmed until the checklist above passes.
