/**
 * Renders DINOL's vector brand mark to PNG at every size we ship.
 *   node scripts/brand-icon.mjs
 *
 * The mark is authored here as SVG rather than generated, because icons need
 * crisp geometry that image models do not produce reliably.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ESPRESSO = "#23140C";
const ORANGE = "#FF5A1F";
const CREAM = "#FBF7F0";

/** The dino head: one confident silhouette, thick enough to read at 32px. */
const HEAD = `
  <path d="M196 186 L204 142 L238 178 Z" fill="${ORANGE}"/>
  <path d="M256 168 L272 128 L296 176 Z" fill="${ORANGE}"/>
  <path d="M124 352
           L150 292
           C130 218 196 166 270 166
           C324 166 366 190 388 214
           L426 230
           C438 240 436 256 422 260
           L300 266
           L322 300
           L422 296
           C428 312 416 328 396 330
           L214 336
           L196 352
           Z"
        fill="${ORANGE}"/>
  <circle cx="352" cy="228" r="16" fill="${CREAM}"/>
  <circle cx="410" cy="242" r="6" fill="${ESPRESSO}" opacity="0.45"/>
`;

function icon(size, rounded = true) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">
  ${rounded ? `<rect width="512" height="512" rx="118" fill="${ESPRESSO}"/>` : ""}
  <g transform="translate(-22,2)">${HEAD}</g>
</svg>`;
}

const wordmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 260" width="900" height="260">
  <rect width="900" height="260" fill="${CREAM}"/>
  <g transform="translate(60,32) scale(0.375)">
    <rect width="512" height="512" rx="118" fill="${ESPRESSO}"/>
    <g transform="translate(-22,2)">${HEAD}</g>
  </g>
  <text x="288" y="163"
        font-family="Bricolage Grotesque, Inter, Helvetica, Arial, sans-serif"
        font-size="112" font-weight="800" letter-spacing="-3"
        fill="${ESPRESSO}">DINOL</text>
</svg>`;

const OUT = [
  { file: "public/assets/icon-512.png", svg: icon(512) },
  { file: "public/assets/icon-192.png", svg: icon(192) },
  { file: "public/assets/apple-icon.png", svg: icon(180) },
  { file: "public/favicon.ico", svg: icon(64), ico: true },
  { file: "orynth/logo.png", svg: icon(1024) },
  { file: "orynth/logo-wordmark.png", svg: wordmark, w: 1800, h: 520 },
];

for (const job of OUT) {
  const target = path.join(process.cwd(), job.file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  const buf = Buffer.from(job.svg);
  if (job.ico) {
    // .ico containers are fussy; a 64px PNG renamed works in every modern browser,
    // and the SVG icon in metadata is what actually gets used.
    await sharp(buf, { density: 384 }).resize(64, 64).png().toFile(target.replace(".ico", ".png"));
  } else if (job.w) {
    await sharp(buf, { density: 300 }).resize(job.w, job.h).png().toFile(target);
  } else {
    await sharp(buf, { density: 600 }).png().toFile(target);
  }
  console.log("wrote", job.file);
}

// The inline SVG used by the site favicon metadata
await fs.writeFile(
  path.join(process.cwd(), "public/assets/icon.svg"),
  icon(512),
);
console.log("wrote public/assets/icon.svg");
