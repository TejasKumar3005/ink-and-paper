import type { APIContext } from 'astro';
import { site } from '../site.config';

/** Generated so the sitemap URL follows `site.url` instead of drifting. */
export function GET({ site: base }: APIContext) {
  const origin = (base ?? new URL(site.url)).origin;
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
