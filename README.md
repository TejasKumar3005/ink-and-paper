# Ink & Paper

A personal website: an introduction, a photographic story lane, a stream of
writing, and a contact page. Built with [Astro](https://astro.build), shipping
about 19 kB of JavaScript in total (7 kB over the wire) — the page-transition
router, the ink bloom, and one `IntersectionObserver`. Everything else is CSS
and SVG.

---

## Running it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command              | What it does                                      |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Dev server with hot reload                        |
| `npm run build`      | Static build into `dist/`                         |
| `npm run preview`    | Serve the built site locally                      |
| `npm run check`      | Type-check the project                            |
| `npm run placeholders` | Regenerate the placeholder images (see below)   |

---

## Where to edit your bio and links

**`src/site.config.ts`.** That is the one file. It holds your name, tagline,
meta description, email, social links, navigation, the home-page introduction
and the "Currently" line. Nothing personal is hard-coded anywhere else.

Two things live outside it, both in `public/`:

- `public/og.jpg` — the 1200×630 image used when a link to the site is shared.
- `public/favicon.svg` and `public/apple-touch-icon.png` — the site mark.

### Finding everything that still needs your attention

Every piece of placeholder content is marked. Search the project for `TODO:`:

```bash
grep -rn "TODO:" src public scripts
```

That will turn up the config placeholders, the sample writing, the sample
story-lane entries, and the placeholder image generator.

---

## Adding a photo to the story lane

Two steps.

1. **Drop the image** into `src/assets/stories/`. Any common format works —
   JPEG, PNG, WebP, AVIF. Use the largest version you have; Astro resizes it
   down to the sizes the page actually needs and converts it to WebP at build
   time, so a 4000 px original is fine and preferable.

2. **Add one Markdown file** to `src/content/story/`. The filename becomes the
   entry's id, and files are read newest-first by date:

```markdown
---
title: Low tide, ten past six
date: 2026-03-14
image: ../../assets/stories/low-tide.jpg
alt: A pale estuary at dawn, three weathered mooring posts standing in shallow water.
meta: Estuary · Portra 400
---

Whatever you want to say beside the picture. Two short paragraphs usually sits
best against the image; the layout will take more if you have more.
```

| Field   | Required | Notes                                                               |
| ------- | -------- | ------------------------------------------------------------------- |
| `title` | yes      | Shown beside the photograph.                                        |
| `date`  | yes      | `YYYY-MM-DD`. Controls the order of the lane.                        |
| `image` | yes      | Path **relative to the Markdown file**. Build fails if it is wrong.  |
| `alt`   | yes      | Describe the picture for someone who cannot see it.                  |
| `meta`  | no       | Small line under the text: place, film stock, camera.                |
| `order` | no       | Force a position. Lower numbers first; otherwise date decides.       |
| `draft` | no       | `true` keeps it in `dev` but out of the built site.                  |

The lane alternates which side the text sits on automatically, so you never
have to think about it. On screens narrower than about 900 px the text stacks
under the photograph.

### Bringing your own photographs across

Pull the branch, then:

```bash
cp ~/Pictures/selects/*.jpg src/assets/stories/
rm src/assets/stories/0*-*.jpg      # the six placeholders
npm run dev
```

Then replace the six files in `src/content/story/` with your own, pointing
`image:` at your filenames. Delete `scripts/make-placeholders.mjs` and the
`placeholders` script in `package.json` once you no longer need them.

Portrait, landscape and square all work; the lane is built around a column, not
a fixed aspect ratio, so mixing orientations is what gives it rhythm.

---

## Adding an article or a thought

Both live in `src/content/writing/` and share one chronological stream on
`/writing/`. The only difference is `kind`.

**An article** gets its own page at `/writing/<filename>/`, with a drop cap,
reading time, and pull-quote styling:

```markdown
---
title: On finishing
date: 2026-08-21
kind: article
description: One sentence for the stream summary, the page description and the RSS item.
---

Your first paragraph gets the drop cap automatically.

## A subheading

> A blockquote, for quoting other people.

<aside class="pullquote">
A pull quote, for emphasising your own sentence. On wide screens it floats
into the right margin; on narrow ones it sits inline.
</aside>
```

**A thought** renders inline and in full in the stream, with no page of its
own. Leave the title out — the date is the heading:

```markdown
---
date: 2026-09-02
kind: thought
---

Two or three sentences. If it needs a title, it is an article.
```

Both accept `draft: true`, which hides the entry from the built site while
leaving it visible in `npm run dev`.

Reading time is calculated from the word count at build time; the words-per-
minute figure is in `src/site.config.ts` if you read faster or slower than 220.

---

## How it is put together

```
src/
  site.config.ts        ← your name, bio, links. Start here.
  content.config.ts     ← frontmatter schemas for both collections
  content/
    story/              ← one Markdown file per photograph
    writing/            ← articles and thoughts together
  assets/stories/       ← the photographs themselves
  components/           ← masthead, colophon, and the ink pieces
  layouts/Base.astro    ← the page shell and the reveal observer
  pages/                ← one file per route
  styles/
    global.css          ← the design system: colour, type, spacing, layout
    motion.css          ← every animation, and the reduced-motion opt-out
```

### The design system

Colour, type and spacing are CSS custom properties at the top of
`global.css` — a warm paper, a deep ink, and exactly one accent (a faded
indigo). Dark mode follows `prefers-color-scheme` and is ink-on-black rather
than an inversion; it is the second block of tokens in the same file. Changing
the accent for the entire site is a one-line edit.

Type is set in a system serif stack with a monospace for dates and captions,
so there are no webfonts to download and no layout shift while they arrive. If
you would rather self-host a serif, Astro's `fonts` config is the place.

### The motion

Every animation is in `motion.css` and is meant to read as ink: an irregular
bloom that washes over the viewport between pages, a brush stroke that draws
itself under headings, text that fades up out of a soft blur, photographs that
develop from desaturated and soft to clear. The irregular edges come from
`feTurbulence` / `feDisplacementMap` filters defined in
`src/components/InkDefs.astro`.

All of it is disabled under `prefers-reduced-motion: reduce`, which falls back
to instant, static states. If you turn that setting on in your OS, the site
should behave as though none of this code exists. Animations are also gated on
a `.js` class, so with JavaScript disabled the page renders fully visible
rather than blank.

---

## Deploying

The site is fully static: `npm run build` writes `dist/`, and any static host
will serve it. Set your real domain in `site.config.ts` first — the sitemap,
RSS feed and OpenGraph tags are all built from it.

If this repository has no remote yet, give it one before connecting a host:

```bash
git remote add origin git@github.com:you/your-site.git
git push -u origin HEAD
```

**Netlify** — connect the repository, or:

```bash
npx netlify deploy --build --prod
```

Build command `npm run build`, publish directory `dist`.

**Vercel** — connect the repository; Astro is detected automatically. Or:

```bash
npx vercel --prod
```

Build command `npm run build`, output directory `dist`.

**Cloudflare Pages** — connect the repository and set the framework preset to
Astro (build command `npm run build`, output directory `dist`). Or:

```bash
npm run build && npx wrangler pages deploy dist
```

**GitHub Pages** — works too, via `withastro/action`. If you deploy to a
project subpath rather than a domain root, set `base` in `astro.config.mjs`.

After the first deploy, check that `https://your-domain/sitemap-index.xml` and
`https://your-domain/rss.xml` both resolve.

---

## Accessibility and performance notes

Kept honest rather than assumed, so please keep them true if you change things:

- One `h1` per page, headings in order, landmarks on every region.
- A skip link that is the first thing in the tab order and visible on focus.
- Visible focus rings everywhere, using the accent colour.
- Text meets WCAG AA against paper and against ink, in both colour schemes.
- `alt` text is required on story-lane entries — the build fails without it.
- Images are lazy-loaded apart from the first one in the lane, and served as
  responsive WebP.
- No webfonts, no analytics, no third-party requests of any kind.
