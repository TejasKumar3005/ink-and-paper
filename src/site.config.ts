/* ────────────────────────────────────────────────────────────────────────────
 *  EDIT ME FIRST.
 *
 *  Name, bio, email, links, and the copy on the home and contact pages.
 *  Everything else reads from here.
 * ────────────────────────────────────────────────────────────────────────── */

export type SocialLink = {
  /** Shown to readers. Keep it short — one or two words. */
  label: string;
  href: string;
  /** Optional: the handle, shown small and monospaced next to the label. */
  handle?: string;
};

export const site = {
  name: 'Tejas Kumar',

  // Canonical URL. No trailing slash. Astro's `base` is derived from this.
  url: 'https://tejaskumar3005.github.io/ink-and-paper',

  tagline: 'To be alive is to grow',

  description:
    'Tejas Kumar — writing on life, agents, and the work of growing. A story lane, essays, and a way to write back.',

  email: 'tejaskumar.iitdelhi@gmail.com',

  locale: 'en',

  intro: {
    // The word in {braces} gets the ink blot.
    lede: 'To be alive is to {grow}.',

    body: [
      'I am a computer scientist at IIT Delhi, and I am building TheAgentNet — so businesses can sell to AI agents the way they already sell to people.',
      'Before that: a first karate medal, a city drawn to float, and a desk I wrapped a blanket around because the work would not wait. The story lane has the pictures. The writing has the arguments.',
    ],

    now: {
      label: 'Currently',
      text: 'Building TheAgentNet, and writing about what counts as alive once agents start clearing markets.',
      updated: 'September 2026',
    },
  },

  contactNote:
    'Write to me. I read everything, and I answer like a person — not a ticket queue.',

  links: [
    { label: 'GitHub', href: 'https://github.com/TejasKumar3005', handle: '@TejasKumar3005' },
    { label: 'X', href: 'https://x.com/tejasktwt', handle: '@tejasktwt' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tejas-kumar-brain' },
  ] satisfies SocialLink[],

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Story lane', href: '/story/' },
    { label: 'Writing', href: '/writing/' },
    { label: 'Contact', href: '/contact/' },
  ],

  ogImage: '/og.jpg',

  wordsPerMinute: 220,
};

export type Site = typeof site;
