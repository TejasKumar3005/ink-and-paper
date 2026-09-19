/* ────────────────────────────────────────────────────────────────────────────
 *  EDIT ME FIRST.
 *
 *  This is the only file you need to touch to make the site yours: name, bio,
 *  email, links, and the bits of copy that appear on the home and contact
 *  pages. Everything else reads from here.
 *
 *  Every value below is a placeholder. Search the project for "TODO:" to find
 *  all of them (including the placeholder photos and writing).
 * ────────────────────────────────────────────────────────────────────────── */

export type SocialLink = {
  /** Shown to readers. Keep it short — one or two words. */
  label: string;
  href: string;
  /** Optional: the handle, shown small and monospaced next to the label. */
  handle?: string;
};

export const site = {
  // TODO: your name, as you want it set in type at the top of every page.
  // (Read off the signature on the Air City cover — correct it if it is wrong.)
  name: 'Tejas Kumar',

  // TODO: the full URL the site is deployed at. Used for canonical links, the
  // sitemap, RSS, OpenGraph — and, because it may include a path, for Astro's
  // `base`. No trailing slash.
  //
  //   GitHub Pages, project site:  https://YOU.github.io/REPO
  //   GitHub Pages, user site:     https://YOU.github.io
  //   Custom domain:               https://yourdomain.com
  url: 'https://YOUR-USERNAME.github.io/ink-and-paper',

  // TODO: a short line that sits under your name in the header and in search
  // results. Aim for six words, not sixteen.
  tagline: 'Writing, photographs, and slow work.',

  // TODO: used for <meta name="description"> on pages that do not set their own.
  description:
    'The personal site of Tejas Kumar — a photographic story lane, writing in progress, and a short introduction.',

  // TODO: your email address. Rendered as a mailto: link on the contact page.
  email: 'hello@example.com',

  // TODO: language of the site content.
  locale: 'en',

  /** The first-person introduction on the home page. Short paragraphs read best. */
  intro: {
    // TODO: the first thing a visitor reads. One sentence, quietly confident.
    // The word wrapped in {accent} is set in the accent colour with an ink blot
    // blooming behind it.
    lede: 'I build things, and I keep the {drawings}.',

    // TODO: two or three short paragraphs. Who you are, what you are into.
    body: [
      'I am an engineer. Most of what I make starts as a page of pencil, gets argued with for a while, and eventually turns into something that runs.',
      'Before that: a lot of karate, a floating city that was never going to fly, and a desk I have still not really moved away from. The story lane has the evidence.',
    ],

    // TODO: what you are working on right now. This is the line people come
    // back for — keep it current.
    now: {
      label: 'Currently',
      text: 'Say what you are working on this month. One sentence is plenty — this is the line people come back to check.',
      // TODO: set this to the month you last updated the line above.
      updated: 'September 2026',
    },
  },

  /** One line of warmth for the contact page. Nothing more. */
  // TODO: replace with your own invitation.
  contactNote:
    'I read everything, and I answer most things. Slow replies are a feature of the medium, not indifference.',

  // TODO: your links. Add or remove freely — the layout adapts.
  links: [
    { label: 'GitHub', href: 'https://github.com/example', handle: '@example' },
    { label: 'Instagram', href: 'https://instagram.com/example', handle: '@example' },
    { label: 'X', href: 'https://x.com/example', handle: '@example' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/example/' },
  ] satisfies SocialLink[],

  /** Navigation. Order matters; keep it to four or fewer. */
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Story lane', href: '/story/' },
    { label: 'Writing', href: '/writing/' },
    { label: 'Contact', href: '/contact/' },
  ],

  // TODO: replace public/og.jpg with a 1200×630 image of your own.
  ogImage: '/og.jpg',

  /** Words per minute used to estimate reading time on articles. */
  wordsPerMinute: 220,
};

export type Site = typeof site;
