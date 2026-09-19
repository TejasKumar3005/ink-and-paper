import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Story lane — one Markdown file per photograph.
 * See README → "Adding a photo to the story lane".
 */
const story = defineCollection({
  loader: glob({ base: './src/content/story', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      /** Path to the photo, relative to this Markdown file. */
      image: image(),
      /** Describe the photograph for someone who cannot see it. Required. */
      alt: z.string(),
      /** Small metadata line under the caption: place, film stock, camera… */
      meta: z.string().optional(),
      /** Lower numbers appear first. Defaults to reverse-chronological. */
      order: z.number().optional(),
      draft: z.boolean().default(false),
    }),
});

/**
 * Writing — articles and thoughts share one chronological stream.
 * `kind: article` gets its own page; `kind: thought` renders inline.
 */
const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date(),
    kind: z.enum(['article', 'thought']).default('article'),
    /** Used for the stream summary and the page description. */
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { story, writing };
