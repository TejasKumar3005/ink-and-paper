import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../site.config';
import { url } from './url';

export type WritingEntry = CollectionEntry<'writing'>;
export type StoryEntry = CollectionEntry<'story'>;

const published = <T extends { data: { draft?: boolean } }>(entry: T) =>
  import.meta.env.DEV || !entry.data.draft;

/** Writing, newest first. Articles and thoughts share the one stream. */
export async function getWriting(): Promise<WritingEntry[]> {
  const entries = await getCollection('writing', published);
  return entries.sort(
    (a: WritingEntry, b: WritingEntry) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function getArticles(): Promise<WritingEntry[]> {
  return (await getWriting()).filter((entry) => entry.data.kind === 'article');
}

/**
 * The story lane, read top to bottom. `order` wins if you set it;
 * otherwise the newest photograph opens the sequence.
 */
export async function getStory(): Promise<StoryEntry[]> {
  const entries = await getCollection('story', published);
  return entries.sort((a: StoryEntry, b: StoryEntry) => {
    const ao = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.data.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}

const dateFormatter = new Intl.DateTimeFormat(site.locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatDate = (date: Date) => dateFormatter.format(date);

/** ISO date for <time datetime>, without the time-of-day noise. */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export function readingTime(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / site.wordsPerMinute));
}

/** Articles link out; thoughts live in the stream and are linked by anchor. */
export const entryHref = (entry: WritingEntry) =>
  entry.data.kind === 'article' ? url(`/writing/${entry.id}/`) : url(`/writing/#${entry.id}`);

export const entryTitle = (entry: WritingEntry) =>
  entry.data.title ?? `A note, ${formatDate(entry.data.date)}`;
