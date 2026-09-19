import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../site.config';
import { entryHref, entryTitle, getWriting } from '../lib/content';

export async function GET(context: APIContext) {
  const entries = await getWriting();

  return rss({
    title: `${site.name} — writing`,
    description: site.description,
    site: context.site ?? site.url,
    items: entries.map((entry) => ({
      title: entryTitle(entry),
      pubDate: entry.data.date,
      description: entry.data.description ?? entry.body?.slice(0, 280),
      link: entryHref(entry),
    })),
    customData: `<language>${site.locale}</language>`,
  });
}
