# Ink & Paper

**Live at [tejaskumar3005.github.io/ink-and-paper](https://tejaskumar3005.github.io/ink-and-paper/)**,
deployed from `main` by [the workflow](.github/workflows/deploy.yml) on every push.

A personal website: an introduction, a photographic story lane, a stream of
writing, and a contact page. Built with [Astro](https://astro.build), shipping
about 19 kB of JavaScript in total (7 kB over the wire) — the page-transition
router, the ink splash, and one `IntersectionObserver`. Everything else is CSS
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
| `npm run og`         | Re-render `public/og.jpg` and the touch icon      |

---

## Where to edit your bio and links

**`src/site.config.ts`.** That is the one file. It holds your name, tagline,
meta description, email, social links, navigation, the home-page introduction
and the "Currently" line. Nothing personal is hard-coded anywhere else.

Two things live outside it, both in `public/`:

- `public/og.jpg` — the 1200×630 image used when a link to the site is shared.
- `public/favicon.svg` and `public/apple-touch-icon.png` — the site mark.

The site is Tejas Kumar's. Name, tagline, email, GitHub, X, and LinkedIn
live in `src/site.config.ts`. The writing stream is two essays first
published on X — *Everything We Call "Alive" Is Wrong* and *The Agentic
Economy is about to 100x everything* — with their original diagrams,
and Conway's Game of Life as a looping clip. The social card
(`public/og.jpg`) is the name and tagline on paper.

The story-lane photographs are real; some captions and dates are still
guesses, marked `TODO:` in `src/content/story/`.

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
title: Air City
date: 2016-06-20
image: ../../assets/stories/air-city-cover.jpg
alt: A hand-drawn A4 cover page, “Air” in red block letters and “City” in blue beneath it.
meta: Cover page · ballpoint on A4
order: 2
---

Whatever you want to say beside the picture. Two short paragraphs usually sits
best against the image; the layout will take more if you have more.
```

| Field   | Required | Notes                                                               |
| ------- | -------- | ------------------------------------------------------------------- |
| `title` | yes      | Shown beside the photograph.                                        |
| `date`  | yes      | `YYYY-MM-DD`. Shown above the title, and orders the lane.             |
| `image` | yes      | Path **relative to the Markdown file**. Build fails if it is wrong.  |
| `alt`   | yes      | Describe the picture for someone who cannot see it.                  |
| `meta`  | no       | Small line under the text: place, medium, camera.                    |
| `order` | no       | Force a position. Lower numbers first; otherwise newest date first.  |
| `draft` | no       | `true` keeps it in `dev` but out of the built site.                  |

The lane shows one photograph at a time. Scroll, swipe, or the arrow keys
move to the next picture with a slide; the dots at the bottom jump. Without
JavaScript the photographs stack as a plain list.

The four entries currently in the lane run oldest to newest, which is what the
`order:` field is doing — without it the newest photograph would open the
sequence. Drop `order:` from all four if you would rather read it backwards.

Portrait, landscape and square all work. Each picture is fitted to the
viewport so the photograph and its words stay on the same slide.

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
  assets/writing/       ← diagrams and covers for the essays
  components/           ← masthead, colophon, and the ink pieces
  layouts/Base.astro    ← the page shell and the reveal observer
  lib/url.ts            ← wrap internal links in url() — see below
  pages/                ← one file per route
  styles/
    global.css          ← the design system: colour, type, spacing, layout
    motion.css          ← every animation, and the reduced-motion opt-out
```

### One rule if you add a link

Astro does not rewrite hrefs you write by hand, so an internal link written as
`href="/writing/"` would 404 on a site served from a subpath. Pass internal
paths through the helper instead:

```astro
---
import { url } from '../lib/url';
---
<a href={url('/writing/')}>Writing</a>
```

External links, `mailto:` and `#fragments` need nothing.

### The design system

Colour, type and spacing are CSS custom properties at the top of
`global.css` — a warm paper, a deep ink, and exactly one accent (a faded
indigo). Changing the accent for the entire site is a one-line edit.

The site is light only, on purpose. `color-scheme: only light` on `:root` is
what enforces it: without that line a browser on a dark-set OS will darken
form controls and scrollbars even though the page never asked it to. If you
ever want a dark palette, it is a second `:root` block under
`@media (prefers-color-scheme: dark)` re-declaring the same token names — no
other file needs to change.

Type is set in a system serif stack with a monospace for dates and captions,
so there are no webfonts to download and no layout shift while they arrive. If
you would rather self-host a serif, Astro's `fonts` config is the place.

### The motion

Every animation is in `motion.css` and is meant to read as ink: a drop that
splashes across the viewport between pages, a brush stroke that draws itself
under headings, text that fades up out of a soft blur, photographs that
develop from desaturated and soft to clear.

The page transition is [CodyHouse's ink-drop sprite](https://codyhouse.co/gem/ink-transition-effect/)
— the same PNG-sequence-plus-`steps()` technique used on Sevenhills — not a
live SVG filter. The heading strokes and dividers still use the
`feTurbulence` / `feDisplacementMap` filters in `src/components/InkDefs.astro`.

All of it is disabled under `prefers-reduced-motion: reduce`, which falls back
to instant, static states. If you turn that setting on in your OS, the site
should behave as though none of this code exists. Animations are also gated on
a `.js` class, so with JavaScript disabled the page renders fully visible
rather than blank.

---

## Deploying

The site is fully static: `npm run build` writes `dist/`, and any static host
will serve it.

**Set `url` in `src/site.config.ts` first.** It is the single source of truth
for the deployed address: canonical links, the sitemap, the RSS feed, the
OpenGraph tags, and Astro's `base` are all derived from it. If the URL has a
path in it, every internal link picks that path up automatically.

### GitHub Pages

A workflow is already committed at `.github/workflows/deploy.yml`. It runs on
every push to `main`, type-checks, builds, and publishes `dist/`.

This repository is already set up: Pages is on, the source is GitHub Actions,
and `url` points at the live address. The steps below are what it took, in case
you move it or start again somewhere else.

1. **Push the repository to GitHub.**

   ```bash
   git remote add origin git@github.com:YOU/ink-and-paper.git
   git push -u origin main
   ```

   The workflow triggers on pushes to `main`. If your default branch is called
   something else, change the branch name at the top of
   `.github/workflows/deploy.yml` to match.

2. **Turn Pages on.** Repository → Settings → Pages → *Build and deployment* →
   **Source: GitHub Actions**. Not "Deploy from a branch" — the workflow
   publishes an artifact directly.

3. **Set the URL** in `src/site.config.ts` to match where Pages will serve it:

   | Repository name      | Site lives at                       | `url`                                     |
   | -------------------- | ----------------------------------- | ----------------------------------------- |
   | `ink-and-paper`      | a subpath of your Pages domain      | `https://YOU.github.io/ink-and-paper`     |
   | `YOU.github.io`      | the root of your Pages domain       | `https://YOU.github.io`                   |
   | anything, + a domain | your own domain                     | `https://yourdomain.com`                  |

   Commit and push. The subpath case is the one that usually breaks a static
   site — here it is handled, but only if `url` actually contains the subpath.

4. **Watch the Actions tab.** The first run takes a couple of minutes; after
   that the deployed URL appears under Settings → Pages.

For a custom domain, add it under Settings → Pages, create a `public/CNAME`
file containing the bare domain, and set `url` to `https://yourdomain.com`.

### Other hosts

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

After the first deploy, check that `<your-url>/sitemap-index.xml` and
`<your-url>/rss.xml` both resolve, and that the navigation works — those three
are what break when the deployed URL and `site.config.ts` disagree.

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
