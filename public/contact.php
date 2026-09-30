<?php
/**
 * groundzerodevs contact form handler. PHP 7.4+ compatible, no dependencies.
 *
 * POST fields: name, email, message, lang (es|en), website (honeypot, must stay empty).
 * Responses: 303 redirect back to the page with ?sent=1 or ?error=<code> (no-JS flow), or JSON
 * {ok:true} / {ok:false,error:"<code>"} when the caller sends Accept: application/json or
 * X-Requested-With: fetch. Error codes: invalid, limit, send.
 */

const GZD_LANGS = array('es', 'en');

/** Load defaults plus the optional local override. */
function gzd_config()
{
    $config = require __DIR__ . '/contact.config.php';
    $local = __DIR__ . '/contact.local.php';
    if (is_file($local)) {
        $override = require $local;
        if (is_array($override)) {
            $config = array_merge($config, $override);
        }
    }
    return $config;
}

function gzd_wants_json()
{
    $accept = isset($_SERVER['HTTP_ACCEPT']) ? (string) $_SERVER['HTTP_ACCEPT'] : '';
    $xhr = isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? strtolower((string) $_SERVER['HTTP_X_REQUESTED_WITH']) : '';
    return stripos($accept, 'application/json') !== false || $xhr === 'fetch';
}

/**
 * Send the final response and stop. $error is null on success, otherwise a public error code.
 * Internal details are never exposed; they go to error_log by the caller.
 */
function gzd_respond($error, $lang, $status)
{
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    if (gzd_wants_json()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($error === null ? array('ok' => true) : array('ok' => false, 'error' => $error));
        exit;
    }
    $base = $lang === 'en' ? '/en/' : '/';
    $anchor = $lang === 'en' ? 'contact' : 'contacto';
    $query = $error === null ? 'sent=1' : 'error=' . $error;
    http_response_code(303);
    header('Location: ' . $base . '?' . $query . '#' . $anchor);
    exit;
}

function gzd_method_not_allowed()
{
    http_response_code(405);
    header('Allow: POST');
    header('Content-Type: text/plain; charset=UTF-8');
    header('Cache-Control: no-store');
    echo 'Method Not Allowed';
    exit;
}

function gzd_host_of($url)
{
    $host = parse_url($url, PHP_URL_HOST);
    return is_string($host) ? strtolower($host) : '';
}

/** Same-origin check: Origin if sent, otherwise Referer; both missing is rejected. */
function gzd_same_origin(array $config)
{
    $requestHost = isset($_SERVER['HTTP_HOST']) ? strtolower((string) $_SERVER['HTTP_HOST']) : '';
    $requestHost = preg_replace('/:\d+$/', '', $requestHost);
    $allowed = array($requestHost);
    foreach ((array) $config['allowed_hosts'] as $h) {
        $allowed[] = strtolower((string) $h);
    }
    $source = '';
    if (!empty($_SERVER['HTTP_ORIGIN'])) {
        $source = (string) $_SERVER['HTTP_ORIGIN'];
    } elseif (!empty($_SERVER['HTTP_REFERER'])) {
        $source = (string) $_SERVER['HTTP_REFERER'];
    }
    $host = gzd_host_of($source);
    return $host !== '' && $requestHost !== '' && in_array($host, $allowed, true);
}

/** Split a UTF-8 string into characters (no mbstring needed). Invalid UTF-8 yields an empty list. */
function gzd_chars($s)
{
    $chars = preg_split('//u', $s, -1, PREG_SPLIT_NO_EMPTY);
    return is_array($chars) ? $chars : array();
}

function gzd_len($s)
{
    return count(gzd_chars($s));
}

/** Read a POST field as a string; arrays and missing values become ''. */
function gzd_field($key)
{
    return isset($_POST[$key]) && is_string($_POST[$key]) ? $_POST[$key] : '';
}

/** Collapse any whitespace or control characters (CR, LF, tab, NUL...) to single spaces. */
function gzd_single_line($s)
{
    $out = preg_replace('/[\p{Cc}\s]+/u', ' ', $s);
    return trim($out === null ? '' : $out);
}

/** RFC 2047 encoded-word text safe for a header value; printable ASCII is returned unchanged. */
function gzd_encode_header($s)
{
    if (preg_match('/^[\x20-\x7E]*$/', $s)) {
        return $s;
    }
    $chars = gzd_chars($s);
    $words = array();
    $chunk = '';
    foreach ($chars as $c) {
        // 42 bytes -> 56 base64 chars, so each encoded word stays under the 75 character limit.
        if (strlen($chunk) + strlen($c) > 42) {
            $words[] = $chunk;
            $chunk = '';
        }
        $chunk .= $c;
    }
    if ($chunk !== '') {
        $words[] = $chunk;
    }
    $encoded = array();
    foreach ($words as $w) {
        $encoded[] = '=?UTF-8?B?' . base64_encode($w) . '?=';
    }
    return implode("\r\n ", $encoded);
}

/** Private working directory (created on demand). Returns null when unusable. */
function gzd_data_dir(array $config)
{
    $dir = $config['data_dir'];
    if (!is_string($dir) || $dir === '') {
        $dir = rtrim(sys_get_temp_dir(), '/\\') . DIRECTORY_SEPARATOR . 'groundzerodevs-contact';
    }
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return null;
    }
    return is_writable($dir) ? $dir : null;
}

/**
 * Per-IP throttle backed by one small file per IP hash. Atomic under flock.
 * Returns true and records the attempt when allowed. Fails open (with a log line) if the
 * data directory is unusable, so a filesystem problem never blocks real visitors.
 */
function gzd_throttle_allow($dir, $ip, $interval, $perHour)
{
    if ($dir === null) {
        error_log('contact.php: data dir unusable, throttle disabled');
        return true;
    }
    $file = $dir . DIRECTORY_SEPARATOR . 'rl-' . hash('sha256', $ip) . '.json';
    $fh = @fopen($file, 'c+');
    if ($fh === false || !flock($fh, LOCK_EX)) {
        error_log('contact.php: cannot lock throttle file, throttle disabled');
        return true;
    }
    $now = time();
    $times = json_decode((string) stream_get_contents($fh), true);
    $times = is_array($times) ? $times : array();
    $recent = array();
    foreach ($times as $t) {
        if (is_int($t) && $t > $now - 3600) {
            $recent[] = $t;
        }
    }
    $allowed = true;
    if (count($recent) >= $perHour) {
        $allowed = false;
    } elseif ($recent && $now - max($recent) < $interval) {
        $allowed = false;
    }
    if ($allowed) {
        $recent[] = $now;
    }
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($recent));
    flock($fh, LOCK_UN);
    fclose($fh);

    // Opportunistic cleanup of stale counters (about 1 request in 50).
    if (mt_rand(1, 50) === 1) {
        foreach ((array) glob($dir . DIRECTORY_SEPARATOR . 'rl-*.json') as $old) {
            if (@filemtime($old) < $now - 7200) {
                @unlink($old);
            }
        }
    }
    return $allowed;
}

/** Deliver via the configured transport. Returns true on success. */
function gzd_deliver(array $config, $subject, $headers, $body, $dir)
{
    if ($config['transport'] === 'file') {
        if ($dir === null) {
            return false;
        }
        $entry = '=== ' . gmdate('c') . " ===\r\nTo: " . $config['recipient'] . "\r\nSubject: " . $subject
            . "\r\n" . $headers . "\r\n\r\n" . $body . "\r\n\r\n";
        return @file_put_contents($dir . DIRECTORY_SEPARATOR . 'contact-outbox.log', $entry, FILE_APPEND | LOCK_EX) !== false;
    }
    // Envelope sender (-f) keeps SPF/DMARC aligned with the domain on shared hosting.
    $params = '-f' . $config['from'];
    return @mail($config['recipient'], $subject, $body, $headers, $params);
}

function gzd_handle()
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        gzd_method_not_allowed();
    }

    $lang = gzd_field('lang');
    $lang = in_array($lang, GZD_LANGS, true) ? $lang : 'es';
    $config = gzd_config();

    if (!gzd_same_origin($config)) {
        gzd_respond('invalid', $lang, 403);
    }

    // Honeypot: pretend success, deliver nothing.
    if (gzd_field('website') !== '') {
        gzd_respond(null, $lang, 200);
    }

    $name = gzd_single_line(gzd_field('name'));
    $email = trim(gzd_field('email'));
    $message = trim(str_replace(array("\r\n", "\r"), "\n", gzd_field('message')));

    $nameLen = gzd_len($name);
    $messageLen = gzd_len($message);
    $valid = $nameLen >= 2 && $nameLen <= 100
        && strlen($email) <= 254 && filter_var($email, FILTER_VALIDATE_EMAIL) !== false
        && !preg_match('/[\r\n]/', $email)
        && $messageLen >= 10 && $messageLen <= 5000
        && preg_match('//u', $message) === 1;
    if (!$valid) {
        gzd_respond('invalid', $lang, 422);
    }
    // Drop control characters other than newline and tab from the body.
    $message = preg_replace('/[^\P{Cc}\n\t]/u', '', $message);

    $ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : 'unknown';
    $dir = gzd_data_dir($config);
    if (!gzd_throttle_allow($dir, $ip, (int) $config['throttle_interval'], (int) $config['throttle_per_hour'])) {
        gzd_respond('limit', $lang, 429);
    }

    $subjectName = $nameLen > 60 ? implode('', array_slice(gzd_chars($name), 0, 60)) : $name;
    $subject = $lang === 'en'
        ? '[groundzerodevs] New message from ' . $subjectName
        : '[groundzerodevs] Nuevo mensaje de ' . $subjectName;
    $subject = gzd_encode_header($subject);

    $fromName = gzd_encode_header(gzd_single_line((string) $config['from_name']));
    $headers = implode("\r\n", array(
        'From: ' . $fromName . ' <' . $config['from'] . '>',
        'Reply-To: ' . gzd_encode_header($name) . ' <' . $email . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: quoted-printable',
    ));

    $lines = array(
        'Name: ' . $name,
        'Email: ' . $email,
        'Language: ' . $lang,
        'IP: ' . $ip,
        'Date (UTC): ' . gmdate('Y-m-d H:i:s'),
        '',
        $message,
    );
    $body = quoted_printable_encode(str_replace("\n", "\r\n", implode("\n", $lines)));

    if (!gzd_deliver($config, $subject, $headers, $body, $dir)) {
        // No message content in the log, only the failure and the sender IP.
        error_log('contact.php: delivery failed via ' . $config['transport'] . ' (ip ' . $ip . ')');
        gzd_respond('send', $lang, 500);
    }
    gzd_respond(null, $lang, 200);
}

gzd_handle();
