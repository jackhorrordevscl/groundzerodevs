# Analytics (Cloudflare Web Analytics)

The site uses Cloudflare Web Analytics: cookieless, no consent banner needed. The beacon is injected at build time only when `PUBLIC_CF_BEACON_TOKEN` is set. Without it the pages contain no analytics code.

## Get the token

1. Cloudflare dashboard > Analytics & Logs > Web Analytics > Add a site.
2. Enter `groundzerodevs.com`. The site is not proxied by Cloudflare (hosted on HostGator), so choose the JavaScript snippet method, not automatic setup.
3. Copy the `token` value from the snippet: `data-cf-beacon='{"token": "<TOKEN>"}'`.

The token is public by design: it ships in the page HTML and only identifies the site for collection. It is not a secret, but it is kept out of the repo so forks and previews do not report into the production property.

## Build with the beacon

```sh
echo "PUBLIC_CF_BEACON_TOKEN=<TOKEN>" > .env
npm run build
```

Or for a one-off build: `PUBLIC_CF_BEACON_TOKEN=<TOKEN> npm run build`. Then upload `dist/` as usual.

## Verify

- `dist/index.html` and `dist/en/index.html` contain a `<script ... beacon.min.js ... data-cf-beacon=...>` tag; a build without the variable contains none.
- After deploy, page views appear in Cloudflare Web Analytics within a few minutes (ad blockers hide them from your own browser).
