// Functional tests for public/contact.php against PHP's built-in server (no Apache, no real mail).
// Run: PHP_BIN=/path/to/php npm run test:contact   (PHP_BIN defaults to `php` on PATH)
// Each server runs from a temp docroot with transport=file, so nothing is sent and the repo stays clean.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, copyFileSync, writeFileSync, readFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import http from 'node:http';

const PHP = process.env.PHP_BIN || 'php';
const PUBLIC = resolve('public');
const servers = [];

async function startServer(port, overrides) {
  const root = mkdtempSync(join(tmpdir(), 'gzd-contact-'));
  const data = join(root, 'data');
  mkdirSync(data);
  copyFileSync(join(PUBLIC, 'contact.php'), join(root, 'contact.php'));
  copyFileSync(join(PUBLIC, 'contact.config.php'), join(root, 'contact.config.php'));
  const cfg = { transport: 'file', data_dir: data, ...overrides };
  // PHP single-quoted literal: only backslash and quote need escaping.
  const lit = (v) => (typeof v === 'string' ? JSON.stringify(v).replace(/\$/g, '\\$') : String(v));
  const body = Object.entries(cfg).map(([k, v]) => `'${k}' => ${lit(v)}`).join(', ');
  writeFileSync(join(root, 'contact.local.php'), `<?php return array(${body});`);
  const proc = spawn(PHP, ['-S', `127.0.0.1:${port}`, '-t', root], { stdio: 'ignore' });
  servers.push({ proc, root });
  for (let i = 0; i < 50; i++) {
    try { await request(port, 'GET', {}); return { port, outbox: join(data, 'contact-outbox.log'), data }; } catch { await new Promise((r) => setTimeout(r, 100)); }
  }
  throw new Error('php server did not start');
}

function request(port, method, headers, form) {
  return new Promise((resolveReq, reject) => {
    const body = form ? new URLSearchParams(form).toString() : undefined;
    const req = http.request({ host: '127.0.0.1', port, path: '/contact.php', method, headers: {
      ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } : {}),
      ...headers,
    } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolveReq({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

const good = { name: 'Ana Pérez', email: 'ana@example.com', message: 'Hola, necesito una web para mi negocio.', website: '', lang: 'es' };
const same = (port) => ({ Origin: `http://127.0.0.1:${port}` });
const json = { Accept: 'application/json' };
// Unfold headers and decode RFC 2047 B-words so assertions read the human text.
const decode = (t) =>
  t.replace(/\r\n[ \t]+/g, '').replace(/=\?UTF-8\?B\?([^?]+)\?=/g, (_, b) => Buffer.from(b, 'base64').toString('utf8'));
const headerBlock = (t) => t.split('\r\n\r\n')[0];
const outboxText = (s) => (existsSync(s.outbox) ? readFileSync(s.outbox, 'utf8') : '');

let open; // no throttle
let strict; // default throttle (30 s, 10 per hour)

before(async () => {
  open = await startServer(18081, { throttle_interval: 0, throttle_per_hour: 1000 });
  strict = await startServer(18082, {});
});

after(() => {
  for (const s of servers) {
    s.proc.kill();
    setTimeout(() => rmSync(s.root, { recursive: true, force: true }), 500);
  }
});

test('GET returns 405 with Allow: POST', async () => {
  const r = await request(open.port, 'GET', {});
  assert.equal(r.status, 405);
  assert.equal(r.headers.allow, 'POST');
});

test('valid ES submission redirects to /?sent=1#contacto and writes the message', async () => {
  const r = await request(open.port, 'POST', same(open.port), good);
  assert.equal(r.status, 303);
  assert.equal(r.headers.location, '/?sent=1#contacto');
  const out = outboxText(open);
  assert.match(decode(out), /Subject: \[groundzerodevs\] Nuevo mensaje de Ana Pérez/);
  assert.match(out, /Reply-To: =\?UTF-8\?B\?/);
  assert.match(out, /To: contacto@groundzerodevs\.com/);
});

test('valid EN submission redirects to /en/?sent=1#contact with the English subject', async () => {
  const r = await request(open.port, 'POST', same(open.port), { ...good, name: 'John Smith', lang: 'en' });
  assert.equal(r.status, 303);
  assert.equal(r.headers.location, '/en/?sent=1#contact');
  assert.match(decode(outboxText(open)), /Subject: \[groundzerodevs\] New message from John Smith/);
});

test('JSON mode returns {ok:true} for success and {ok:false,error} for failure', async () => {
  const ok = await request(open.port, 'POST', { ...same(open.port), ...json }, good);
  assert.equal(ok.status, 200);
  assert.deepEqual(JSON.parse(ok.body), { ok: true });
  const bad = await request(open.port, 'POST', { ...same(open.port), 'X-Requested-With': 'fetch' }, { ...good, email: 'nope' });
  assert.equal(bad.status, 422);
  assert.deepEqual(JSON.parse(bad.body), { ok: false, error: 'invalid' });
});

test('honeypot filled returns the same success response and sends nothing', async () => {
  const before = outboxText(open);
  const r = await request(open.port, 'POST', same(open.port), { ...good, website: 'http://spam.example' });
  assert.equal(r.status, 303);
  assert.equal(r.headers.location, '/?sent=1#contacto');
  const j = await request(open.port, 'POST', { ...same(open.port), ...json }, { ...good, website: 'x' });
  assert.deepEqual(JSON.parse(j.body), { ok: true });
  assert.equal(outboxText(open), before);
});

test('invalid input is rejected with error=invalid', async () => {
  const cases = {
    'bad email': { email: 'not-an-email' },
    'short message': { message: 'too short' },
    'short name': { name: 'A' },
    'long name': { name: 'x'.repeat(101) },
    'oversize message': { message: 'm'.repeat(5001) },
    'email over 254': { email: 'a'.repeat(250) + '@example.com' },
  };
  for (const [label, patch] of Object.entries(cases)) {
    const r = await request(open.port, 'POST', same(open.port), { ...good, ...patch });
    assert.equal(r.status, 303, label);
    assert.equal(r.headers.location, '/?error=invalid#contacto', label);
  }
});

test('boundary lengths are accepted (name 100, message 5000)', async () => {
  const r = await request(open.port, 'POST', { ...same(open.port), ...json }, { ...good, name: 'n'.repeat(100), message: 'm'.repeat(5000) });
  assert.deepEqual(JSON.parse(r.body), { ok: true });
});

test('CR/LF injection in name and email never creates extra headers', async () => {
  const before = outboxText(open).length;
  const evilName = 'Eve\r\nBcc: victim@example.com\r\nX-Injected: 1';
  const r1 = await request(open.port, 'POST', { ...same(open.port), ...json }, { ...good, name: evilName });
  assert.equal(r1.status, 200); // neutralized: collapsed onto one line and encoded
  const r2 = await request(open.port, 'POST', { ...same(open.port), ...json }, { ...good, email: 'eve@example.com\r\nBcc: victim@example.com' });
  assert.equal(r2.status, 422); // rejected
  const added = outboxText(open).slice(before);
  const entries = added.split('=== ').filter(Boolean);
  assert.equal(entries.length, 1); // only the neutralized name was delivered
  const headers = decode(headerBlock(entries[0])).split('\r\n');
  assert.ok(!headers.some((l) => /^(Bcc|X-Injected):/i.test(l)), 'no injected header lines');
  assert.ok(headers.some((l) => /^Reply-To: Eve Bcc: victim@example.com X-Injected: 1 </.test(l)), 'name collapsed onto one line');
});

test('cross-origin and missing Origin/Referer are rejected; Referer works as fallback', async () => {
  const evil = await request(open.port, 'POST', { ...json, Origin: 'https://evil.example' }, good);
  assert.equal(evil.status, 403);
  assert.deepEqual(JSON.parse(evil.body), { ok: false, error: 'invalid' });
  const none = await request(open.port, 'POST', json, good);
  assert.equal(none.status, 403);
  const ref = await request(open.port, 'POST', { ...json, Referer: `http://127.0.0.1:${open.port}/en/` }, good);
  assert.equal(ref.status, 200);
  const spoof = await request(open.port, 'POST', { ...json, Origin: `http://127.0.0.1.evil.example` }, good);
  assert.equal(spoof.status, 403);
});

test('unknown lang falls back to es; an empty body is invalid', async () => {
  const r = await request(open.port, 'POST', same(open.port), { ...good, lang: 'fr' });
  assert.equal(r.headers.location, '/?sent=1#contacto');
  const empty = await request(open.port, 'POST', same(open.port), {});
  assert.equal(empty.status, 303);
  assert.equal(empty.headers.location, '/?error=invalid#contacto');
});

test('throttle: second submission within 30 s is limited', async () => {
  const h = { ...same(strict.port), ...json };
  const a = await request(strict.port, 'POST', h, good);
  assert.equal(a.status, 200);
  const b = await request(strict.port, 'POST', h, good);
  assert.equal(b.status, 429);
  assert.deepEqual(JSON.parse(b.body), { ok: false, error: 'limit' });
  const redirect = await request(strict.port, 'POST', same(strict.port), good);
  assert.equal(redirect.headers.location, '/?error=limit#contacto');
});

test('throttle: the 11th submission within an hour is limited even with the interval elapsed', async () => {
  const s = await startServer(18083, { throttle_interval: 0, throttle_per_hour: 10 });
  const h = { ...same(s.port), ...json };
  for (let i = 1; i <= 10; i++) {
    const r = await request(s.port, 'POST', h, good);
    assert.equal(r.status, 200, `submission ${i}`);
  }
  const eleventh = await request(s.port, 'POST', h, good);
  assert.equal(eleventh.status, 429);
});

test('delivery failure returns error=send without leaking details', async () => {
  const s = await startServer(18084, { throttle_interval: 0, transport: 'mail' });
  // No sendmail is available in the test environment, so mail() fails.
  const r = await request(s.port, 'POST', { ...same(s.port), ...json }, good);
  assert.equal(r.status, 500);
  assert.deepEqual(JSON.parse(r.body), { ok: false, error: 'send' });
});
