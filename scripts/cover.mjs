/**
 * Builds the Orynth product showcase cover: orynth/cover.png at 2560x1600.
 * Vector-composed so the type stays crisp and on-brand.
 *
 *   node scripts/cover.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const W = 2560;
const H = 1600;
const CREAM = "#FBF7F0";
const ESPRESSO = "#23140C";
const ORANGE = "#FF5A1F";
const LINE = "#E9DFD1";
const MUTED = "#8A7566";
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

const MARK = `
  <rect width="512" height="512" rx="118" fill="${ESPRESSO}"/>
  <g transform="translate(-22,2)">
    <path d="M196 186 L204 142 L238 178 Z" fill="${ORANGE}"/>
    <path d="M256 168 L272 128 L296 176 Z" fill="${ORANGE}"/>
    <path d="M124 352 L150 292 C130 218 196 166 270 166 C324 166 366 190 388 214
             L426 230 C438 240 436 256 422 260 L300 266 L322 300 L422 296
             C428 312 416 328 396 330 L214 336 L196 352 Z" fill="${ORANGE}"/>
    <circle cx="352" cy="228" r="16" fill="${CREAM}"/>
  </g>`;

/** One output card in the fan on the right. */
function card(x, y, w, label, rows, accent = false) {
  const lines = rows
    .map(
      (r, i) =>
        `<rect x="${x + 34}" y="${y + 96 + i * 40}" width="${(w - 68) * r}" height="16" rx="8" fill="${
          accent && i === 0 ? ORANGE : "#E4D9C9"
        }"/>`,
    )
    .join("");
  const h = 96 + rows.length * 40 + 20;
  return `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="#fff" stroke="${LINE}" stroke-width="2"/>
    <text x="${x + 34}" y="${y + 60}" font-family="${FONT}" font-size="26" font-weight="700"
          letter-spacing="2.5" fill="${accent ? ORANGE : MUTED}">${label}</text>
    ${lines}
  </g>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <pattern id="dots" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="rgba(35,20,12,0.05)"/>
    </pattern>
    <radialGradient id="glow" cx="72%" cy="18%" r="62%">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="26" flood-color="${ESPRESSO}" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- brand lockup -->
  <g transform="translate(150,110) scale(0.19)">${MARK}</g>
  <text x="272" y="180" font-family="${FONT}" font-size="52" font-weight="800"
        letter-spacing="-1.6" fill="${ESPRESSO}">DINOL</text>
  <text x="${W - 150}" y="172" text-anchor="end" font-family="${FONT}" font-size="28"
        font-weight="700" letter-spacing="4" fill="${MUTED}">DINOL.FUN</text>

  <!-- headline -->
  <text x="150" y="430" font-family="${FONT}" font-size="128" font-weight="800"
        letter-spacing="-5" fill="${ESPRESSO}">Turn one hot take</text>
  <text x="150" y="566" font-family="${FONT}" font-size="128" font-weight="800"
        letter-spacing="-5" fill="${ESPRESSO}">into a <tspan fill="${ORANGE}">viral content pack</tspan>.</text>

  <text x="150" y="666" font-family="${FONT}" font-size="40" font-weight="400"
        fill="#4A342A">Titles, thumbnails, hooks, talking points, threads and launch assets.</text>
  <text x="150" y="726" font-family="${FONT}" font-size="40" font-weight="400"
        fill="#4A342A">One input. Twelve seconds. No signup.</text>

  <!-- the mechanism: input card -->
  <g filter="url(#shadow)">
    <rect x="150" y="880" width="820" height="330" rx="34" fill="#fff" stroke="${LINE}" stroke-width="2"/>
    <rect x="186" y="920" width="748" height="72" rx="18" fill="${CREAM}"/>
    <text x="212" y="966" font-family="${FONT}" font-size="30" font-weight="700"
          letter-spacing="2" fill="${MUTED}">YOUR IDEA</text>
    <rect x="186" y="1024" width="700" height="18" rx="9" fill="#E4D9C9"/>
    <rect x="186" y="1064" width="600" height="18" rx="9" fill="#E4D9C9"/>
    <rect x="186" y="1104" width="430" height="18" rx="9" fill="#E4D9C9"/>
    <rect x="646" y="1136" width="288" height="56" rx="28" fill="${ORANGE}"/>
    <text x="790" y="1174" text-anchor="middle" font-family="${FONT}" font-size="27"
          font-weight="700" fill="#fff">Generate pack</text>
  </g>

  <!-- the arrow -->
  <path d="M1010 1040 C1090 1040 1090 1040 1160 1040" stroke="${ORANGE}" stroke-width="7"
        stroke-linecap="round" fill="none"/>
  <path d="M1148 1020 L1180 1040 L1148 1060 Z" fill="${ORANGE}"/>

  <!-- the fan of outputs -->
  <g filter="url(#shadow)">
    ${card(1240, 800, 560, "TITLES", [0.92, 0.74, 0.86], true)}
    ${card(1500, 1010, 560, "HOOKS", [0.8, 0.62])}
    ${card(1760, 1200, 560, "SCORE", [0.55, 0.9])}
  </g>

  <!-- footer strip -->
  <text x="150" y="1500" font-family="${FONT}" font-size="30" font-weight="600"
        letter-spacing="1" fill="${MUTED}">CREATOR MODE   ·   DEBATE MODE   ·   CRYPTO LAUNCH MODE</text>
</svg>`;

const target = path.join(process.cwd(), "orynth/cover.png");
await fs.mkdir(path.dirname(target), { recursive: true });
await sharp(Buffer.from(svg), { density: 200 }).png().toFile(target);
console.log("wrote orynth/cover.png");
