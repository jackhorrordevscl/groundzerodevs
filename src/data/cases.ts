// Language-neutral case data. Copy (names, blurbs, tags) lives in the i18n dictionaries.
// Screenshots are not delivered yet (task T9). To swap a placeholder for a real capture,
// drop the 1440x900 WebP in `public/cases/` and set `image` here; nothing else changes.

export type CaseId = 'umbral' | 'morgado' | 'journaling' | 'elizabeth';

export interface CaseMedia {
  url: string;
  host: string;
  image: string | null; // e.g. '/cases/umbral.webp'
}

export const caseMedia: Record<CaseId, CaseMedia> = {
  umbral: { url: 'https://umbral.groundzerodevs.com', host: 'umbral.groundzerodevs.com', image: null },
  morgado: { url: 'https://morgadoyasociados.cl', host: 'morgadoyasociados.cl', image: null },
  journaling: {
    url: 'https://journalingenred.vercel.app',
    host: 'journalingenred.vercel.app',
    image: null,
  },
  elizabeth: {
    url: 'https://elizabeth-landing.vercel.app',
    host: 'elizabeth-landing.vercel.app',
    image: null,
  },
};

// Display order of the cards; the featured one gets the early-access styling.
export const caseOrder: CaseId[] = ['umbral', 'morgado', 'journaling', 'elizabeth'];
export const featuredCase: CaseId = 'umbral';

export const magiUrl = 'https://github.com/jackhorrordevscl/magi';
export const magiHost = 'github.com/jackhorrordevscl/magi';
