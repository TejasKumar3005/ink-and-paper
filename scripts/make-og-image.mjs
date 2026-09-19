/**
 * Renders the two images that are not photographs: the 1200×630 social card
 * used when a link to the site is shared, and the touch icon.
 *
 * TODO: a card of your own — a photograph, or your name set in type — will
 * always beat this abstract one. Replace `public/og.jpg` and delete this file.
 *
 *   npm run og
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

/** Ink-adjacent palettes only: warm greys, cold greys, faded indigo, oxblood-brown. */
const palettes = [
  ['#2b2a28', '#6f6a60', '#d8d1c4'],
  ['#1d1e26', '#4a4a63', '#b9b5c4'],
  ['#2a2320', '#7a6355', '#ded3c3'],
  ['#232826', '#5d6b63', '#cbd0c8'],
  ['#26222b', '#6b5f74', '#ccc3cc'],
  ['#2c2825', '#87796a', '#e3dbcd'],
];

/** A cheap deterministic PRNG so regenerating gives the same pictures. */
function rng(seed) {
  let state = seed * 9301 + 49297;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

function composition(width, height, palette, seed) {
  const random = rng(seed);
  const [dark, mid, light] = palette;
  const horizon = (0.42 + random() * 0.28) * height;
  const n = (v) => v.toFixed(0);

  /** Soft masses of tone, blurred, standing in for weather and distance. */
  const masses = Array.from({ length: 6 }, (_, i) => {
    const cx = random() * width;
    const cy = random() * height;
    const r = (0.18 + random() * 0.42) * Math.max(width, height);
    const fill = [dark, mid, light][i % 3];
    return `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(r)}" ry="${n(
      r * (0.55 + random() * 0.6),
    )}" fill="${fill}" opacity="${(0.16 + random() * 0.28).toFixed(2)}" />`;
  }).join('');

  /** A handful of sharper forms so the frame has something to hold on to. */
  const forms = Array.from({ length: 4 }, () => {
    const w = (0.02 + random() * 0.06) * width;
    const h = (0.08 + random() * 0.4) * height;
    const x = random() * width;
    const y = horizon - h * (0.55 + random() * 0.5);
    return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(
      h,
    )}" rx="${n(w / 2)}" fill="${dark}" opacity="${(0.14 + random() * 0.26).toFixed(2)}" />`;
  }).join('');

  const glow = (0.3 + random() * 0.4) * width;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0.15" y2="1">
      <stop offset="0" stop-color="${dark}" />
      <stop offset="0.45" stop-color="${mid}" />
      <stop offset="1" stop-color="${light}" />
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0" stop-color="${mid}" />
      <stop offset="1" stop-color="${dark}" />
    </linearGradient>
    <radialGradient id="glow" cx="${(glow / width).toFixed(3)}" cy="${(
      (horizon / height) *
      0.92
    ).toFixed(3)}" r="0.55">
      <stop offset="0" stop-color="${light}" stop-opacity="0.75" />
      <stop offset="1" stop-color="${light}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.45" stop-color="${dark}" stop-opacity="0" />
      <stop offset="1" stop-color="${dark}" stop-opacity="0.55" />
    </radialGradient>
    <filter id="soften" x="-15%" y="-15%" width="130%" height="130%">
      <feGaussianBlur stdDeviation="${(width / 26).toFixed(1)}" />
    </filter>
    <filter id="haze" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="${(width / 160).toFixed(1)}" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#sky)" />
  <g filter="url(#soften)" clip-path="inset(0)">${masses}</g>
  <rect width="${width}" height="${height}" fill="url(#glow)" />
  <g filter="url(#haze)">${forms}</g>
  <rect y="${n(horizon)}" width="${width}" height="${n(
    height - horizon,
  )}" fill="url(#ground)" opacity="0.88" />
  <rect y="${n(horizon - 2)}" width="${width}" height="3" fill="${light}" opacity="0.22" />
  <rect width="${width}" height="${height}" fill="url(#vignette)" />
</svg>`;
}

async function grain(width, height, sigma = 12) {
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 128, g: 128, b: 128 },
      noise: { type: 'gaussian', mean: 128, sigma },
    },
  })
    .png()
    .toBuffer();
}

async function render({ width, height, palette, seed, out, quality = 78 }) {
  const base = Buffer.from(composition(width, height, palette, seed));
  const texture = await grain(width, height);

  const pipeline = sharp(base)
    .composite([{ input: texture, blend: 'overlay' }])
    .blur(0.4)
    .modulate({ saturation: 0.72, brightness: 1.01 });

  await pipeline
    .jpeg({ quality, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(out);

  console.log(`  ✓ ${out.replace(root + '/', '')}`);
}

await mkdir(publicDir, { recursive: true });

console.log('Rendering social card and touch icon…');
await render({
  width: 1200,
  height: 630,
  palette: palettes[1],
  seed: 911,
  out: join(publicDir, 'og.jpg'),
  quality: 72,
});

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" fill="#faf8f4" />
  <circle cx="90" cy="86" r="42" fill="#1a1a18" />
  <path d="M34 140c34-9 78-9 112 0" stroke="#454a7d" stroke-width="7" stroke-linecap="round" fill="none" />
</svg>`;
await sharp(Buffer.from(icon)).png().toFile(join(publicDir, 'apple-touch-icon.png'));
console.log('  ✓ public/apple-touch-icon.png');
console.log('Done.');
