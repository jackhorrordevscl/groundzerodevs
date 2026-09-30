// Shape shared by every language dictionary. TypeScript enforces that `es` and `en` stay in sync.
import type { CaseId } from '../data/cases';

export type Lang = 'es' | 'en';

export interface Dictionary {
  meta: { title: string; description: string };
  // Section ids double as nav anchors, so they are per language and must match the header nav.
  ids: { services: string; work: string; sustain: string; process: string; contact: string };
  common: { homeHref: string; newTab: string };
  header: {
    navLabel: string;
    menu: string; // visible label of the mobile menu button
    nav: { services: string; work: string; sustain: string; process: string; contact: string };
  };
  hero: {
    eyebrow: string;
    title: string;
    titleMark: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    pillarsLabel: string;
    pillars: [string, string, string];
    caption: string;
  };
  pillars: {
    label: string;
    title: string;
    items: { number: string; name: string; text: string; items: string[] }[];
  };
  cases: {
    label: string;
    title: string;
    items: Record<CaseId, { kind: string; status: string; name: string; text: string }>;
    thumbAlt: (name: string) => string;
    thumbPending: (name: string) => string;
    lab: { ariaLabel: string; label: string; text: string };
  };
  sustain: {
    label: string;
    title: string;
    counters: { value: string; label: string; extra?: string }[];
    note: { before: string; date: string; after: string };
  };
  process: {
    label: string;
    title: string;
    steps: { name: string; text: string }[];
  };
  contact: {
    label: string;
    title: string;
    hours: string;
    name: string;
    email: string;
    message: string;
    honeypot: string;
    submit: string;
    // Form result messages; the inline script reads them from data attributes.
    status: { sending: string; sent: string; invalid: string; limit: string; send: string };
  };
}
