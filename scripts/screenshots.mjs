/**
 * Captures real product screenshots and composites them onto branded
 * DINOL backdrops for the Orynth listing.
 *
 *   npm run dev            (in another terminal)
 *   node scripts/screenshots.mjs [baseUrl]
 *
 * Output: orynth/screenshot-1..5.png at 2560x1600.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const BASE = process.argv[2] || "http://localhost:3001";
const OUT = path.join(process.cwd(), "orynth");

const CREAM = "#FBF7F0";
const ESPRESSO = "#23140C";
const ORANGE = "#FF5A1F";

/** Each shot: where to go, what to wait for, and the caption on the backdrop. */
const SHOTS = [
  {
    name: "screenshot-1",
    url: "/",
    caption: "One idea in. A full content pack out.",
    kicker: "The landing",
    dark: false,
    full: false,
  },
  {
    name: "screenshot-2",
    url: "/app?template=podcast-rant",
    caption: "Pick a mode, a tone, and how hard to push it.",
    kicker: "The studio",
    dark: false,
    full: false,
  },
  {
    name: "screenshot-3",
    hideHeader: true,
    url: "/p/creator-payouts",
    caption: "Ten titles, each with its angle and a click estimate.",
    kicker: "Headline pack",
    dark: true,
    full: false,
    action: async (page) => {
      await page.getByRole("button", { name: "Titles" }).first().click();
      await page.waitForTimeout(600);
      await page.evaluate(() => window.scrollTo(0, 560));
    },
  },
  {
    name: "screenshot-4",
    hideHeader: true,
    url: "/p/creator-payouts",
    caption: "Thumbnail concepts with composition, palette and overlay text.",
    kicker: "Thumbnails",
    dark: false,
    full: false,
    action: async (page) => {
      await page.getByRole("button", { name: "Thumbnails" }).first().click();
      await page.waitForTimeout(700);
      await page.evaluate(() => window.scrollTo(0, 620));
    },
  },
  {
    name: "screenshot-5",
    hideHeader: true,
    url: "/p/creator-payouts",
    caption: "An honest score, including why it might flop.",
    kicker: "Virality feedback",
    dark: true,
    full: false,
    action: async (page) => {
      await page.getByRole("button", { name: "Score" }).first().click();
      await page.waitForTimeout(700);
      await page.evaluate(() => window.scrollTo(0, 250));
    },
  },
];

/* --------------------------- branded backdrop ---------------------------- */

const W = 2560;
const H = 1600;

function backdrop({ caption, kicker, dark }) {
  const bg = dark ? ESPRESSO : CREAM;
  const fg = dark ? CREAM : ESPRESSO;
  const dot = dark ? "rgba(251,247,240,0.07)" : "rgba(35,20,12,0.055)";

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <pattern id="g" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="${dot}"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="${ORANGE}" stop-opacity="${dark ? 0.3 : 0.18}"/>
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- brand mark -->
  <g transform="translate(150,104) scale(0.17)">
    <rect width="512" height="512" rx="118" fill="${dark ? "#3A251A" : ESPRESSO}"/>
    <g transform="translate(-22,2)">
      <path d="M196 186 L204 142 L238 178 Z" fill="${ORANGE}"/>
      <path d="M256 168 L272 128 L296 176 Z" fill="${ORANGE}"/>
      <path d="M124 352 L150 292 C130 218 196 166 270 166 C324 166 366 190 388 214
               L426 230 C438 240 436 256 422 260 L300 266 L322 300 L422 296
               C428 312 416 328 396 330 L214 336 L196 352 Z" fill="${ORANGE}"/>
      <circle cx="352" cy="228" r="16" fill="${CREAM}"/>
    </g>
  </g>
  <text x="252" y="160" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="46" font-weight="800" letter-spacing="-1.5" fill="${fg}">DINOL</text>

  <text x="${W - 150}" y="150" text-anchor="end"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="26" font-weight="700" letter-spacing="4" fill="${ORANGE}">${kicker.toUpperCase()}</text>

  <text x="150" y="290" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="72" font-weight="800" letter-spacing="-2.5" fill="${fg}">${caption}</text>
</svg>`);
}

/* -------------------------------- capture -------------------------------- */

async function run() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const shot of SHOTS) {
    process.stdout.write(`  ${shot.name} ... `);
    await page.goto(BASE + shot.url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1400);
    if (shot.hideHeader) {
      await page.addStyleTag({
        content: "header{display:none !important} main{padding-top:0 !important}",
      });
      await page.waitForTimeout(200);
    }
    if (shot.action) {
      try {
        await shot.action(page);
      } catch (err) {
        console.log(`(action skipped: ${err.message.split("\n")[0]})`);
      }
    }
    await page.waitForTimeout(700);

    const raw = await page.screenshot({ fullPage: shot.full });

    // Round the browser frame corners and drop it onto the backdrop.
    const frameW = 2100;
    const shotImg = sharp(raw).resize({ width: frameW });
    const meta = await shotImg.metadata();
    const frameH = Math.min(meta.height ?? 1180, 1180);
    const cropped = await sharp(raw)
      .resize({ width: frameW })
      .extract({ left: 0, top: 0, width: frameW, height: frameH })
      .composite([
        {
          input: Buffer.from(
            `<svg width="${frameW}" height="${frameH}"><rect width="${frameW}" height="${frameH}" rx="26" fill="#fff"/></svg>`,
          ),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();

    await sharp(backdrop(shot))
      .composite([
        {
          input: await sharp(
            Buffer.from(
              `<svg width="${frameW + 120}" height="${frameH + 120}"><rect x="60" y="52" width="${frameW}" height="${frameH}" rx="26" fill="rgba(35,20,12,0.30)"/></svg>`,
            ),
          )
            .blur(30)
            .png()
            .toBuffer(),
          left: Math.round((W - frameW) / 2) - 60,
          top: 300,
        },
        {
          input: cropped,
          left: Math.round((W - frameW) / 2),
          top: 360,
        },
      ])
      .png()
      .toFile(path.join(OUT, `${shot.name}.png`));

    console.log("done");
  }

  await browser.close();
  console.log(`\nWrote ${SHOTS.length} screenshots to orynth/`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
