/**
 * Generates DINOL's branded imagery with OpenAI.
 *   node --env-file=.env.local scripts/generate-assets.mjs [group]
 *
 * Groups: brand | orynth | all (default)
 * Output: public/assets/ and orynth/
 *
 * SWAP POINT: every prompt below is a plain string. Edit and re-run to restyle
 * the whole product without touching any component.
 */
import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.DINOL_IMAGE_MODEL || "gpt-image-1";

/** The shared brand clause appended to every prompt so the set stays coherent. */
const BRAND = `Brand palette strictly: warm cream background #FBF7F0, deep espresso brown #23140C, signal orange #FF5A1F, bone white. Premium editorial modern SaaS aesthetic, generous negative space, soft rounded geometry, clean and confident, slightly playful but never childish. No stock photo gloss, no neon, no dark crypto cliches, no gradients everywhere.`;

const JOBS = {
  brand: [
    {
      file: "public/assets/logo-mark.png",
      size: "1024x1024",
      prompt: `A single app icon for a brand called DINOL. A minimal abstract geometric dinosaur head silhouette, reduced to two or three confident shapes, facing right, rendered in signal orange on a deep espresso brown rounded square. Flat vector, perfectly centered, thick forms that stay legible at 32 pixels, generous padding inside the square. Looks like a premium app store icon. ${BRAND} Absolutely no text, no letters, no wordmark.`,
    },
    {
      file: "public/assets/og.png",
      size: "1536x1024",
      prompt: `A wide product share card for an AI content tool. Warm cream background with subtle paper grain. Floating white rounded cards arranged at slight angles, suggesting a list of generated headlines, a video thumbnail frame, and a small score meter with an orange bar. Soft realistic drop shadows. Composition leaves a large clear empty area in the upper left for a headline to be placed later. ${BRAND} No text, no letters, no numbers anywhere.`,
    },
    {
      file: "public/assets/founder.jpg",
      size: "1024x1024",
      prompt: `An editorial portrait-style abstract avatar placeholder for a founder profile. A simple flat illustrated silhouette of a person from the shoulders up, three quarter view, wearing sunglasses, rendered in flat espresso brown against a warm cream background with a large soft orange circle behind the head. Minimal, confident, magazine illustration style. ${BRAND} No text, no facial detail beyond the silhouette.`,
    },
  ],
  orynth: [
    {
      file: "orynth/logo.png",
      size: "1024x1024",
      prompt: `A single app icon for a brand called DINOL. A minimal abstract geometric dinosaur head silhouette reduced to two or three confident shapes, facing right, in signal orange on a deep espresso brown rounded square with generous inner padding. Flat vector, perfectly centered, thick legible forms, premium app store icon quality, crisp edges. ${BRAND} Absolutely no text, no letters, no wordmark, no tagline.`,
    },
    {
      file: "orynth/cover.png",
      size: "1536x1024",
      prompt: `A minimal product showcase cover image for an AI writing tool for online creators. Centered composition: one large floating white rounded input card casting a soft shadow on a warm cream background, and three smaller output cards fanning out from it to the right, each suggesting a different result type, one showing a small orange bar meter. A single thin orange arrow flows from the input card to the outputs, communicating one input becoming many outputs. Enormous calm negative space. Editorial, premium, minimal. ${BRAND} No text, no letters, no numbers, no logos.`,
    },
  ],
};

async function generate({ file, prompt, size }) {
  process.stdout.write(`  ${file} ... `);
  const res = await openai.images.generate({
    model: MODEL,
    prompt,
    size,
    quality: "high",
    n: 1,
  });
  const b64 = res.data[0].b64_json;
  const target = path.join(process.cwd(), file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, Buffer.from(b64, "base64"));
  console.log("done");
}

async function run() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY missing. Run with: node --env-file=.env.local scripts/generate-assets.mjs");
    process.exit(1);
  }
  const group = process.argv[2] ?? "all";
  const jobs =
    group === "all" ? [...JOBS.brand, ...JOBS.orynth] : (JOBS[group] ?? []);
  if (!jobs.length) {
    console.error(`Unknown group "${group}". Use: brand | orynth | all`);
    process.exit(1);
  }
  console.log(`Generating ${jobs.length} assets with ${MODEL}\n`);
  for (const job of jobs) {
    try {
      await generate(job);
    } catch (err) {
      console.log("FAILED");
      console.error(`    ${err.message}`);
    }
  }
  console.log("\nDone.");
}

run();
