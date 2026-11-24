// Language-neutral case data. Copy (names, blurbs, tags) lives in the i18n dictionaries.
// Screenshots are 1440x900 WebP captures of the public home pages in `src/assets/cases/` (Umbral: its
// public landing only, never the app). Astro resizes them at build time into hashed responsive
// variants. To swap one, drop the WebP there and set `image` here; nothing else changes. `null`
// falls back to a neutral placeholder.
import type { ImageMetadata } from 'astro';

export type CaseId = 'umbral' | 'judired' | 'morgado' | 'journaling' | 'elizabeth' | 'champa';

export interface CaseMedia {
  url: string;
  host: string;
  image: ImageMetadata | null;
}

const shots = import.meta.glob<{ default: ImageMetadata }>('../assets/cases/*.webp', { eager: true });
const shot = (file: string): ImageMetadata => {
  const mod = shots[`../assets/cases/${file}`];
  if (!mod) throw new Error(`Missing case screenshot: src/assets/cases/${file}`);
  return mod.default;
};

export const caseMedia: Record<CaseId, CaseMedia> = {
  umbral: { url: 'https://umbral.groundzerodevs.com', host: 'umbral.groundzerodevs.com', image: shot('umbral.webp') },
  judired: { url: 'https://judired.groundzerodevs.com', host: 'judired.groundzerodevs.com', image: shot('judired.webp') },
  morgado: { url: 'https://morgadoyasociados.cl', host: 'morgadoyasociados.cl', image: shot('morgado.webp') },
  journaling: {
    url: 'https://journalingenred.vercel.app',
    host: 'journalingenred.vercel.app',
    image: shot('journaling.webp'),
  },
  elizabeth: {
    url: 'https://abogadaelizabeth.vercel.app',
    host: 'abogadaelizabeth.vercel.app',
    image: shot('elizabeth.webp'),
  },
  champa: {
    url: 'https://vidrieria-champa.vercel.app',
    host: 'vidrieria-champa.vercel.app',
    image: shot('champa.webp'),
  },
};

// Display order of the cards; the featured one gets the early-access styling.
export const caseOrder: CaseId[] = ['umbral', 'judired', 'morgado', 'journaling', 'elizabeth', 'champa'];
export const featuredCase: CaseId = 'umbral';

export const magiUrl = 'https://github.com/jackhorrordevscl/magi';
export const magiHost = 'github.com/jackhorrordevscl/magi';
