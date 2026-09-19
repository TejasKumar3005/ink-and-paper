// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { site } from './src/site.config.ts';

export default defineConfig({
  site: site.url,
  integrations: [sitemap()],
  image: {
    // Story-lane photos are the only heavy assets on the site.
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      wrap: true,
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
  devToolbar: {
    enabled: false,
  },
});
