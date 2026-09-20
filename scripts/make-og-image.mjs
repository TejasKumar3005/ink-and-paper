/**
 * Renders the 1200×630 social card (name + tagline) and the touch icon.
 *
 *   npm run og
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#faf8f4"/>
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="1200" height="630" filter="url(#grain)" opacity="0.07"/>
  <g opacity="0.14" fill="#454a7d">
    <ellipse cx="980" cy="170" rx="210" ry="160"/>
    <ellipse cx="1080" cy="230" rx="90" ry="70"/>
    <ellipse cx="890" cy="110" rx="60" ry="48"/>
    <circle cx="1040" cy="80" r="22"/>
  </g>
  <g opacity="0.09" fill="#1a1a18">
    <ellipse cx="160" cy="520" rx="180" ry="90"/>
    <circle cx="70" cy="560" r="28"/>
  </g>
  <path d="M96 430 C 280 418, 520 448, 760 428 S 1040 412, 1108 424"
        fill="none" stroke="#454a7d" stroke-width="3.2" stroke-linecap="round" opacity="0.7"/>
  <text x="96" y="248" font-family="Fraunces, 'Iowan Old Style', serif" font-weight="600"
        font-size="92" fill="#1a1a18" letter-spacing="-1.5">Tejas Kumar</text>
  <text x="100" y="330" font-family="Instrument Serif, 'Iowan Old Style', serif" font-style="italic"
        font-size="42" fill="#454a7d">To be alive is to grow</text>
</svg>`;

await mkdir(publicDir, { recursive: true });

await sharp(Buffer.from(svg))
  .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(join(publicDir, 'og.jpg'));
console.log('  ✓ public/og.jpg');

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" fill="#faf8f4"/>
  <circle cx="90" cy="86" r="42" fill="#1a1a18"/>
  <path d="M34 140c34-9 78-9 112 0" stroke="#454a7d" stroke-width="7" stroke-linecap="round" fill="none"/>
</svg>`;
await sharp(Buffer.from(icon)).png().toFile(join(publicDir, 'apple-touch-icon.png'));
console.log('  ✓ public/apple-touch-icon.png');
console.log('Done.');
