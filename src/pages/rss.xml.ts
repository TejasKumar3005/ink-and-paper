import rss from '@astrojs/rss';
import { site } from '../site.config';
import { entryHref, entryTitle, getWriting } from '../lib/content';

export async function GET() {
  const entries = await getWriting();

  return rss({
    title: `${site.name} — writing`,
    description: site.description,
    site: site.url,
    items: entries.map((entry) => ({
      title: entryTitle(entry),
      pubDate: entry.data.date,
      description: entry.data.description ?? entry.body?.slice(0, 280),
      // Absolute, so the feed generator leaves the URL — and the `#thought`
      // fragments that link to individual notes — exactly as written.
      link: new URL(entryHref(entry), site.url).href,
    })),
    customData: `<language>${site.locale}</language>`,
  });
}
