<?php
/**
 * Contact form defaults. Safe to commit: no secrets here.
 *
 * Override any key by creating `contact.local.php` next to this file (gitignored, upload it
 * manually). It must `return` an array with the keys you want to change.
 *
 * Direct web requests to this file produce an empty page: it only returns configuration.
 */
return array(
    // Where messages are delivered, and the envelope/From identity (must be a mailbox on this domain).
    'recipient' => 'contacto@groundzerodevs.com',
    'from' => 'contacto@groundzerodevs.com',
    'from_name' => 'groundzerodevs web',

    // 'mail' = PHP mail() (default, no credentials). 'file' = append the message to
    // <data_dir>/contact-outbox.log instead of sending (local testing).
    'transport' => 'mail',

    // Private working files (throttle counters, file transport log), kept outside the web root.
    // null = sys_get_temp_dir() . '/groundzerodevs-contact'. Any other value must be an absolute path.
    'data_dir' => null,

    // Per-IP abuse limits: minimum seconds between submissions and maximum submissions per hour.
    'throttle_interval' => 30,
    'throttle_per_hour' => 10,

    // Extra hostnames (besides the request host) accepted in Origin/Referer, e.g. 'www.groundzerodevs.com'.
    'allowed_hosts' => array(),
);
