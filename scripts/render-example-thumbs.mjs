/**
 * Pre-renders the thumbnail graphics for the seeded example packs so the
 * examples and share pages ship with real images instead of empty frames.
 *
 *   node --env-file=.env.local scripts/render-example-thumbs.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.DINOL_IMAGE_MODEL || "gpt-image-1";
const PER_PACK = 4;

const STYLE =
  "photorealistic, shot on a 35mm lens, crisp studio key light, shallow depth of field, high contrast";

function fullPrompt(concept) {
  return `${concept}. ${STYLE}. Composed as a 16:9 YouTube thumbnail with the subject offset to one side and clear empty space for a text overlay. Extremely legible at small size. No text, no letters, no words, no watermark, no logos in the image.`;
}

const file = path.join(process.cwd(), "src/data/examples.json");
const packs = JSON.parse(await fs.readFile(file, "utf8"));
const outDir = path.join(process.cwd(), "public/assets/examples");
await fs.mkdir(outDir, { recursive: true });

for (const pack of packs) {
  const thumbs = (pack.thumbnails ?? []).slice(0, PER_PACK);
  for (let i = 0; i < thumbs.length; i++) {
    const t = thumbs[i];
    const name = `${pack.slug}-${i + 1}.png`;
    process.stdout.write(`  ${name} ... `);
    try {
      const res = await openai.images.generate({
        model: MODEL,
        prompt: fullPrompt(t.imagePrompt || t.concept),
        size: "1536x1024",
        quality: "medium",
        n: 1,
      });
      await fs.writeFile(
        path.join(outDir, name),
        Buffer.from(res.data[0].b64_json, "base64"),
      );
      t.imageUrl = `/assets/examples/${name}`;
      console.log("done");
    } catch (err) {
      console.log(`failed: ${err.message}`);
    }
  }
}

await fs.writeFile(file, JSON.stringify(packs, null, 2));
console.log("\nUpdated src/data/examples.json with imageUrl paths");
