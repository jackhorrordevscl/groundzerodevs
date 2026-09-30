// Language-neutral case data. Copy (names, blurbs, tags) lives in the i18n dictionaries.
// Screenshots are 1440x900 WebP captures of the public home pages in `public/cases/` (Umbral: its
// public landing only, never the app). To swap one, drop the WebP there and set `image` here;
// nothing else changes. `null` falls back to a neutral placeholder.

export type CaseId = 'umbral' | 'morgado' | 'journaling' | 'elizabeth';

export interface CaseMedia {
  url: string;
  host: string;
  image: string | null; // e.g. '/cases/umbral.webp'
}

export const caseMedia: Record<CaseId, CaseMedia> = {
  umbral: { url: 'https://umbral.groundzerodevs.com', host: 'umbral.groundzerodevs.com', image: '/cases/umbral.webp' },
  morgado: { url: 'https://morgadoyasociados.cl', host: 'morgadoyasociados.cl', image: '/cases/morgado.webp' },
  journaling: {
    url: 'https://journalingenred.vercel.app',
    host: 'journalingenred.vercel.app',
    image: '/cases/journaling.webp',
  },
  elizabeth: {
    url: 'https://abogadaelizabeth.vercel.app',
    host: 'abogadaelizabeth.vercel.app',
    image: '/cases/elizabeth.webp',
  },
};

// Display order of the cards; the featured one gets the early-access styling.
export const caseOrder: CaseId[] = ['umbral', 'morgado', 'journaling', 'elizabeth'];
export const featuredCase: CaseId = 'umbral';

export const magiUrl = 'https://github.com/jackhorrordevscl/magi';
export const magiHost = 'github.com/jackhorrordevscl/magi';
