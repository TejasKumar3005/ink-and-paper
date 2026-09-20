// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { site } from './src/site.config.ts';

/**
 * Everything is derived from the single `url` in src/site.config.ts, so
 * deploying somewhere else means editing one line.
 *
 * On the custom domain the site is at the root (`base` is `/`). A GitHub
 * Pages project URL without a domain still works: put the repo path in `url`
 * and `base` follows it.
 */
const deployed = new URL(site.url);

export default defineConfig({
  site: deployed.origin,
  base: deployed.pathname,
  integrations: [sitemap()],
  image: {
    // Story-lane photos are the only heavy assets on the site.
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    shikiConfig: {
      theme: 'vitesse-light',
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
