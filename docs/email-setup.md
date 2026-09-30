# Contact form email setup (HostGator shared hosting)

The form posts to `/contact.php`, which sends one plain-text email with PHP `mail()` to
`contacto@groundzerodevs.com`. No SMTP credentials or Composer packages are involved.

## Files

| File | Purpose |
| --- | --- |
| `public/contact.php` | Handler (PHP 7.4+, also runs on 8.x). |
| `public/contact.config.php` | Committed defaults: recipient, From, transport, throttle limits. |
| `contact.local.php` (next to it) | Optional overrides. Gitignored, upload manually, never commit. |
| `public/.htaccess` | Denies web access to the config and local override files. |

Everything in `public/` is copied to `dist/` by `npm run build`; upload `dist/` to `public_html`.

## Deployment checklist

1. Upload `dist/` to `public_html` (keep the hidden `.htaccess`; enable "Show Hidden Files" in the cPanel File Manager).
2. Confirm the PHP version in cPanel > MultiPHP Manager. 7.4 or newer works; do not pick anything older.
3. Check the mailbox: cPanel > Email Accounts must list `contacto@groundzerodevs.com`.
4. Email authentication: cPanel > **Email Deliverability** for `groundzerodevs.com`. SPF and DKIM must both show as valid; use "Repair" if not.
5. DMARC: add a TXT record `_dmarc.groundzerodevs.com`, for example `v=DMARC1; p=none; rua=mailto:contacto@groundzerodevs.com`. Start with `p=none`, tighten later once reports look clean.
6. Verify the `.htaccess` rules: `https://groundzerodevs.com/contact.config.php` and `/contact.local.php` must return 403, not a blank 200.
7. Send a real test from the live form (ES and EN). Check it lands in the inbox, not spam, and that "Reply" targets the visitor. In Gmail, "Show original" should read `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`.
8. If nothing arrives: look for `contact.php: delivery failed` in the `error_log` file in `public_html`, and use Track Delivery in cPanel.

## Local overrides

Create `contact.local.php` beside `contact.php`:

```php
<?php
return array(
    'recipient' => 'someone@groundzerodevs.com',
    'transport' => 'mail',
);
```

Any key from `contact.config.php` can be overridden. Keys you omit keep their defaults.

## Switch transport

- `mail` (default): PHP `mail()`, envelope sender forced to `from` with `-f`. `from` must be a mailbox on this domain or SPF/DMARC alignment breaks.
- `file`: nothing is sent; each message is appended to `<data_dir>/contact-outbox.log`. Use it locally or to isolate mail problems: set `'transport' => 'file'` in `contact.local.php`.

## Throttle and private files

Abuse limits are per IP (`REMOTE_ADDR`): at least 30 s between submissions and at most 10 per hour (`throttle_interval`, `throttle_per_hour`). Counters are small files named `rl-<hash>.json` in `data_dir`, which defaults to `sys_get_temp_dir()/groundzerodevs-contact`. That is outside `public_html`, so it is not web accessible; stale files are cleaned automatically. If `data_dir` is not writable the throttle is skipped and a line is logged.

If you set `data_dir` to a folder inside `public_html`, add an `.htaccess` with `Require all denied` inside it. If the site later sits behind a proxy or CDN, `REMOTE_ADDR` will be the proxy address; revisit the throttle before enabling one.

## Local testing

```sh
PHP_BIN=/path/to/php npm run test:contact
```

The tests start PHP's built-in server on temporary docroots with `transport = file`, so no mail is sent. `.htaccess` behavior and real `mail()` delivery cannot be tested that way; use the checklist above after deploying.
