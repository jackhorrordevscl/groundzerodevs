import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://groundzerodevs.com',
  output: 'static',
  // The whole stylesheet is small: inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // Emits sitemap-index.xml with xhtml:link alternates for each locale.
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es', en: 'en' },
      },
    }),
  ],
});
