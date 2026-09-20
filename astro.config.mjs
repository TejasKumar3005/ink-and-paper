// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { site } from './src/site.config.ts';

/**
 * Everything is derived from the single `url` in src/site.config.ts, so
 * deploying somewhere else means editing one line.
 *
 * A GitHub Pages *project* site lives under a path — https://you.github.io/repo
 * — and Astro needs that path as `base`. Setting `site.url` to the full
 * deployed URL is enough; the origin and the base are split out here.
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
