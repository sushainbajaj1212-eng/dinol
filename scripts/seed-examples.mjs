/**
 * Seeds src/data/examples.json with real generated packs.
 *   node --env-file=.env.local scripts/seed-examples.mjs
 *
 * Re-run whenever you retune the prompts in src/lib/prompts.ts.
 */
import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

const SEEDS = [
  {
    slug: "creator-payouts",
    label: "Creator payouts",
    mode: "creator",
    tone: "punchy",
    intensity: "spicy",
    input:
      "Platforms keep quietly changing creator payout terms and everyone acts like it is normal. The people making the content have the least say in how it gets paid for.",
  },
  {
    slug: "launch-too-early",
    label: "Launching too early",
    mode: "debate",
    tone: "analytical",
    intensity: "balanced",
    input:
      "Should crypto founders stop launching a token before they have a working product? Argue both sides properly.",
  },
  {
    slug: "hypecat",
    label: "HYPECAT token launch",
    mode: "crypto",
    tone: "founder",
    intensity: "balanced",
    input:
      "A community token called HYPECAT for independent journalists who fund each other's investigations. Playful branding, credible substance, no presale and no insider allocation.",
  },
];

const SYSTEM = await readExport("SYSTEM_PROMPT");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function readExport() {
  // The prompt module is TS, so mirror the essentials here rather than compiling.
  return `You are DINOL, an AI hot take studio for opinion-led creators and crypto founders.
Write like a sharp internet-native creator. No cliches, no em dashes, no placeholders.
Every item must be specific to the input. Be honest in scoring.
Return ONLY valid JSON, no markdown fences.`;
}

const SCHEMA = `{
  "summary": "one sentence on the sharpest angle",
  "titles": [{ "text": "", "angle": "", "ctrGuess": 0 }],
  "thumbnails": [{ "concept": "", "overlayText": "", "composition": "", "palette": "", "imagePrompt": "" }],
  "hooks": [{ "hook": "", "script": "", "platform": "" }],
  "talkingPoints": [""],
  "debate": { "for": [""], "against": [""], "rebuttals": [{ "claim": "", "rebuttal": "" }], "punchlines": [""], "structure": [""], "riskFlags": [""] },
  "threads": { "tweets": [""], "quoteTweets": [""], "thread": [""] },
  "crypto": { "names": [""], "tickers": [""], "taglines": [""], "heroHeadline": "", "launchTweets": [""], "founderBios": [""], "memeIdeas": [""], "landingCopy": [{ "heading": "", "body": "" }], "ctas": [""] },
  "score": { "clickability": 0, "clarity": 0, "emotion": 0, "controversy": 0, "novelty": 0, "factCheckRisk": 0, "overall": 0, "whyItWorks": "", "whyItMayFlop": "" }
}`;

async function run() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY missing. Run with: node --env-file=.env.local scripts/seed-examples.mjs");
    process.exit(1);
  }

  const out = [];
  for (const seed of SEEDS) {
    process.stdout.write(`Generating ${seed.slug}... `);
    const res = await openai.chat.completions.create({
      model: process.env.DINOL_TEXT_MODEL || "gpt-4.1-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: `Mode: ${seed.mode}. Tone: ${seed.tone}. Intensity: ${seed.intensity}.
Produce 8 titles, 4 thumbnails, 4 hooks, 6 talking points, 5 tweets, 2 quote tweets and an 8 tweet thread.
${seed.mode === "crypto" ? "Fill the crypto section fully." : "Omit the crypto key entirely."}

INPUT:
"""
${seed.input}
"""

Return JSON matching:
${SCHEMA}`,
        },
      ],
    });

    const parsed = JSON.parse(res.choices[0].message.content);
    out.push({
      ...parsed,
      id: seed.slug,
      slug: seed.slug,
      label: seed.label,
      createdAt: new Date().toISOString(),
      mode: seed.mode,
      tone: seed.tone,
      intensity: seed.intensity,
      input: seed.input,
    });
    console.log("done");
  }

  const target = path.join(process.cwd(), "src/data/examples.json");
  await fs.writeFile(target, JSON.stringify(out, null, 2));
  console.log(`\nWrote ${out.length} example packs to src/data/examples.json`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
