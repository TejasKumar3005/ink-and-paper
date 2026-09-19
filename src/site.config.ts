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
  name: 'Iris Calder',

  // TODO: the canonical URL of the deployed site. Used for sitemap, RSS and
  // OpenGraph tags. No trailing slash.
  url: 'https://example.com',

  // TODO: a short line that sits under your name in the header and in search
  // results. Aim for six words, not sixteen.
  tagline: 'Writing, photographs, and slow work.',

  // TODO: used for <meta name="description"> on pages that do not set their own.
  description:
    'The personal site of Iris Calder — essays on craft and attention, a photographic story lane, and notes in progress.',

  // TODO: your email address. Rendered as a mailto: link on the contact page.
  email: 'hello@example.com',

  // TODO: language of the site content.
  locale: 'en',

  /** The first-person introduction on the home page. Short paragraphs read best. */
  intro: {
    // TODO: the first thing a visitor reads. One sentence, quietly confident.
    // The word wrapped in {accent} is set in the accent colour with an ink blot
    // blooming behind it.
    lede: 'I make things that ask for {attention} and give it back.',

    // TODO: two or three short paragraphs. Who you are, what you are into.
    body: [
      'I am a designer and writer living by the coast. For the better part of a decade I have worked on typography, editorial systems, and the quiet infrastructure that lets other people publish well.',
      'Outside of that: long walks with a film camera, letterpress that I am not yet good at, and a standing argument with myself about whether a thing is finished.',
    ],

    // TODO: what you are working on right now. This is the line people come
    // back for — keep it current.
    now: {
      label: 'Currently',
      text: 'Building a small press for short-run photo books, and writing an essay series about attention as a craft skill.',
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
