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
    homeLabel: 'groundzerodevs, home',
    homeHref: '/en/',
    newTab: '(opens in a new tab)',
  },
  header: {
    navLabel: 'Main',
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
    lead: 'Software, digital presence and ongoing support. One team, with AI applied at every stage.',
    ctaPrimary: 'Talk on WhatsApp',
    ctaSecondary: 'See our work',
    pillarsLabel: 'Pillars',
    pillars: ['BUILD', 'PRESENCE', 'SUSTAIN'],
    caption: 'Every system starts at zero. We take it to production.',
  },
  pillars: {
    label: '01 — SERVICES',
    title: 'Three pillars. One team.',
    items: [
      {
        number: '01',
        name: 'Build',
        text: 'Software that solves a real problem. AI: agents and chatbots integrated into your systems.',
        items: ['Custom software', 'Automation and integrations', 'MVPs and prototyping'],
      },
      {
        number: '02',
        name: 'Presence',
        text: 'Get found and get remembered. AI: content support and metrics analysis.',
        items: ['Community management', 'Web design and development', 'SEO and analytics'],
      },
      {
        number: '03',
        name: 'Sustain',
        text: 'What we build, up and running. AI: ticket triage and an assisted knowledge base.',
        items: ['User support', 'Maintenance and SLAs', 'Technology advisory'],
      },
    ],
  },
  cases: {
    label: '02 — WORK',
    title: 'We build our own products. We know what it takes to get them to production.',
    items: {
      umbral: {
        kind: 'OWN PRODUCT · BUILD',
        status: 'EARLY ACCESS',
        name: 'Umbral',
        text: 'Clinical records for independent psychologists in Chile. Encryption, audit trail and Chilean regulatory compliance.',
      },
      morgado: {
        kind: 'CLIENT · PRESENCE',
        status: 'IN PRODUCTION',
        name: 'Morgado, Cía. & Asociados',
        text: 'Corporate website for a law firm in Santiago, plus management of its Instagram.',
      },
      journaling: {
        kind: 'CLIENT · PRESENCE',
        status: 'IN PRODUCTION',
        name: 'Journaling En Red',
        text: 'Website for a psychosocial support service in Santiago.',
      },
      elizabeth: {
        kind: 'CLIENT · PRESENCE',
        status: 'IN PRODUCTION',
        name: 'Elizabeth Maureira, Attorney',
        text: 'Professional website for a lawyer in Providencia, Santiago.',
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
      { value: '204', label: 'issues resolved' },
      { value: '~3 h', label: 'median resolution · Umbral' },
      { value: '~19 h', label: 'median resolution · Morgado' },
      { value: '4', label: 'projects in maintenance', extra: '+2 in development' },
    ],
    note: {
      before: 'Data as of ',
      date: 'Sep 29, 2026',
      after:
        ' (Jul–Sep 2026). Includes fixes, improvements and audits. Median over closed issues. Two of the four projects have required no changes to date.',
    },
  },
  process: {
    label: '04 — PROCESS',
    title: 'How we work',
    steps: [
      { name: 'Discovery', text: 'We learn your business and define what to build first.' },
      { name: 'Plan', text: 'We agree scope, timelines and priorities in writing.' },
      { name: 'Build', text: 'Short, visible deliveries, with tests.' },
      { name: 'Operate', text: 'We stay: monitoring, support and continuous improvement.' },
    ],
  },
  contact: {
    label: '05 — CONTACT',
    title: "Got something in mind? Let's start from zero.",
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
