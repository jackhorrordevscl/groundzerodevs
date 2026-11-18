import type { Dictionary } from './types';

// Approved EN copy from design D (`_design/project/D-Editorial-EN.dc.html`).
// The design has no title/meta description; those two are a faithful translation of the ES ones.
export const en: Dictionary = {
  meta: {
    title: 'groundzerodevs · Software, digital presence and support',
    description:
      'We build what your business needs and keep it running. Software, digital presence and ongoing support for SMBs and startups in Chile and LATAM.',
  },
  ids: {
    services: 'services',
    work: 'work',
    sustain: 'sustain',
    process: 'process',
    contact: 'contact',
  },
  common: {
    homeHref: '/en/',
    newTab: '(opens in a new tab)',
  },
  header: {
    navLabel: 'Main',
    menu: 'Menu',
    nav: {
      services: 'Services',
      work: 'Work',
      sustain: 'Sustain',
      process: 'Process',
      contact: 'Contact',
    },
  },
  hero: {
    eyebrow: 'CHILE · LATAM: FOR SMBS AND STARTUPS',
    title: 'We build what your business needs.',
    titleMark: 'And keep it running.',
    lead: 'Custom software, digital presence and ongoing support. We develop with AI as a tool; a person makes the decisions and reviews every change.',
    ctaPrimary: 'Talk on WhatsApp',
    ctaSecondary: 'See our work',
    pillarsLabel: 'Pillars',
    pillars: ['BUILD', 'PRESENCE', 'SUSTAIN'],
    caption: 'Every system starts at zero. We take it to production.',
  },
  pillars: {
    label: '01 — SERVICES',
    title: 'What we do',
    items: [
      {
        number: '01',
        name: 'Build',
        text: 'Software that solves a real problem, from idea to production.',
        items: ['Custom software', 'Automation and integrations', 'MVPs and prototyping'],
      },
      {
        number: '02',
        name: 'Presence',
        text: 'Get found and get remembered: web, social and measurement.',
        items: ['Community management', 'Web design and development', 'SEO and analytics'],
      },
      {
        number: '03',
        name: 'Sustain',
        text: 'What we build, up and running: support, maintenance and improvements.',
        items: ['User support', 'Maintenance and SLAs', 'Technology advisory'],
      },
    ],
  },
  cases: {
    label: '02 — WORK',
    title: 'What we have built and sustained.',
    items: {
      umbral: {
        kind: 'OWN PRODUCT · BUILD',
        status: 'EARLY ACCESS',
        name: 'Umbral',
        text: 'Clinical records for independent psychologists and therapists: public booking page, Flow payments and mandatory two-factor authentication. Designed to align with Chilean laws 20.584, 19.628 and 21.719.',
        stack: 'React · NestJS · Prisma · PostgreSQL',
      },
      judired: {
        kind: 'OWN PRODUCT · BUILD',
        status: 'BETA TESTING',
        name: 'JudiRed',
        text: 'Legal CRM for independent lawyers and law firms: cases, case files, procedural deadlines and fees. Each firm isolated with PostgreSQL row-level security.',
        stack: 'Next.js · NestJS · Prisma · PostgreSQL',
      },
      morgado: {
        kind: 'CLIENT · PRESENCE',
        status: 'IN PRODUCTION',
        name: 'Morgado, Cía. & Asociados',
        text: 'Corporate website built with a custom static site generator on Node, delivered as HTML and PHP on shared hosting. Plus management of its Instagram.',
        stack: 'Node · PHP · Tailwind 4',
      },
      journaling: {
        kind: 'CLIENT · PRESENCE',
        status: 'IN PRODUCTION',
        name: 'Journaling En Red',
        text: 'Multi-page website for a therapeutic journaling service, positioned as psychosocial and non-clinical. Contact and booking forms with explicit data consent.',
        stack: 'Astro · Tailwind 4 · Vercel',
      },
      elizabeth: {
        kind: 'CLIENT · PRESENCE',
        status: 'IN PRODUCTION',
        name: 'Elizabeth Maureira, Attorney',
        text: "Digital presence for an attorney's independent practice: 9 areas of law with their own page, a location map and contact by WhatsApp or form.",
        stack: 'Astro · Tailwind 4 · Vercel',
      },
      champa: {
        kind: 'CLIENT · PRESENCE',
        status: 'IN DEVELOPMENT',
        name: 'Vidriería Champa',
        text: 'Website with a 3-step quote form that opens WhatsApp with the message already written, without sending data to a server. 24/7 emergency response.',
        stack: 'Astro · Vercel',
      },
    },
    thumbAlt: (name) => `Screenshot of ${name}`,
    thumbPending: (name) => `[SCREENSHOT PENDING · ${name.toUpperCase()}]`,
    lab: {
      ariaLabel: 'Lab',
      label: 'LAB · R&D',
      text: '— in-house research: a multi-agent gate that approves or blocks coding-agent actions before they run.',
    },
  },
  sustain: {
    label: '03 — SUSTAIN',
    title: 'Building is half the job. The other half is sustaining it.',
    counters: [
      { value: '297', label: 'issues resolved' },
      { value: '~46 h', label: 'median resolution · Umbral (90 days)' },
      { value: '~19 h', label: 'median resolution · Morgado (all-time)' },
      { value: '4', label: 'projects in maintenance', extra: '+4 in development' },
    ],
    note: {
      before: 'Data as of ',
      date: 'Nov 18, 2026',
      after:
        ' (Jul–Nov 2026). Includes fixes, improvements and audits from projects in maintenance; projects in development are not counted. Medians over closed issues: Umbral, last 90 days; Morgado, full history because it has few recent issues.',
    },
  },
  process: {
    label: '04 — PROCESS',
    title: 'How we work',
    steps: [
      { name: 'Discovery', text: 'We learn your business and define what to build first.' },
      { name: 'Plan', text: 'We agree scope, timelines and priorities in writing.' },
      { name: 'Build', text: 'Short, visible deliveries, with tests. We use AI to move faster; a person reviews every change.' },
      { name: 'Operate', text: 'We stay: monitoring, support and continuous improvement.' },
    ],
  },
  contact: {
    label: '05 — CONTACT',
    title: 'Got something in mind? Tell us what you need.',
    hours: 'We reply during business hours, Chile time.',
    name: 'Name',
    email: 'Email',
    message: 'What do you need?',
    honeypot: 'Do not fill in this field',
    submit: 'Send message',
    status: {
      sending: 'Sending your message…',
      sent: 'Thanks, we got your message. We will reply during business hours.',
      invalid: 'Please check your details: we need your name, a valid email and a message of at least 10 characters.',
      limit: 'You sent several messages in a row. Please wait a moment and try again, or message us on WhatsApp.',
      send: 'We could not send your message. Please try again, or reach us on WhatsApp or at contacto@groundzerodevs.com.',
    },
  },
};
