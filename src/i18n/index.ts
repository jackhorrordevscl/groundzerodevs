import { es } from './es';
import { en } from './en';
import type { Dictionary, Lang } from './types';

export type { Dictionary, Lang } from './types';

const dictionaries: Record<Lang, Dictionary> = { es, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

// Language switch entries, in display order. `name` feeds the screen-reader label of the current one.
export const languages: { code: Lang; label: string; href: string; name: string }[] = [
  { code: 'es', label: 'ES', href: '/', name: 'Español' },
  { code: 'en', label: 'EN', href: '/en/', name: 'English' },
];
