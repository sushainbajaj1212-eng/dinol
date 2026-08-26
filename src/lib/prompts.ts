import type { GenerateRequest, Intensity, Mode, RefineAction, Tone } from "./types";

/**
 * SWAP POINT: everything about DINOL's writing voice lives in this file.
 * Edit these strings to retune output quality without touching route code.
 */

export const SYSTEM_PROMPT = `You are DINOL — an AI hot-take studio built for opinion-led creators, commentators and crypto founders.

You turn a single idea into a publish-ready content pack. You are not a generic assistant.

Non-negotiables:
- Write like a sharp internet-native creator, never like a marketing bot.
- No cliches: never use "unlock", "dive into", "game-changer", "in today's fast-paced world", "revolutionize", "elevate".
- No em dashes. Use plain punctuation.
- Titles must be specific to the actual input, never generic templates with the topic slotted in.
- Every item must be immediately copy-pasteable, no placeholders like [TOPIC].
- Be honest in scoring. If the idea is weak, say so in whyItMayFlop.
- Return ONLY valid JSON matching the requested schema. No markdown fences, no commentary.`;

const TONE_GUIDE: Record<Tone, string> = {
  punchy: "Short, hard-hitting sentences. High energy. Confident.",
  analytical: "Calm, evidence-led, precise. Persuades with structure not volume.",
  unhinged: "Chaotic internet voice, meme-literate, very online. Still coherent.",
  warm: "Human, generous, conversational. Invites the audience in.",
  deadpan: "Dry, understated, funny by restraint. Lets the take land on its own.",
  founder: "Builder voice. Direct, mission-led, slightly contrarian, no fluff.",
};

const INTENSITY_GUIDE: Record<Intensity, string> = {
  safe: "Keep it defensible and brand-safe. Strong opinion, zero recklessness. Avoid naming individuals negatively.",
  balanced: "Confident and opinionated. Willing to take a side without being inflammatory.",
  spicy: "Maximum polarization within the bounds of truth. Pick a side hard. Never fabricate facts or defame real people.",
};

const MODE_GUIDE: Record<Mode, string> = {
  creator: `CREATOR MODE. The input is a topic, rant, transcript or video idea. Optimise for YouTube, streams and short-form. Titles should earn the click without lying about the content.`,
  debate: `DEBATE MODE. The input is a claim or contested question. Build the strongest honest case on both sides, then arm the user with rebuttals and clip-ready punchlines. Flag anything that needs a source.`,
  crypto: `CRYPTO LAUNCH MODE. The input is a token, product or community concept. Produce launch-ready brand and copy assets. Never promise returns, never imply financial advice, never guarantee price action.`,
};

export const REFINE_GUIDE: Record<RefineAction, string> = {
  stronger: "Rewrite the whole pack with more conviction and sharper verbs. Cut every hedge.",
  more_controversial: "Increase polarization. Take a harder side. Stay factual and never defame.",
  safer: "Reduce risk. Make every claim defensible and brand-safe while keeping it interesting.",
  shorter: "Compress everything. Shorter titles, tighter hooks, fewer words per line.",
  more_creator: "Make it sound like a real person talking to a camera, not written copy.",
};

export const PACK_SCHEMA = `{
  "summary": "one sentence on the sharpest angle in this idea",
  "titles": [{ "text": "string", "angle": "why this angle works, max 10 words", "ctrGuess": 0-100 }],
  "thumbnails": [{
    "concept": "the visual idea in one sentence",
    "overlayText": "max 5 words, all caps ok",
    "composition": "subject placement, framing, focal point",
    "palette": "3 colors described plainly",
    "imagePrompt": "a full standalone image-generation prompt for a 16:9 youtube thumbnail, photographic or graphic, describing subject, expression, background, lighting and mood. Do not mention text or typography."
  }],
  "hooks": [{ "hook": "first line, spoken", "script": "15 to 30 second script", "platform": "TikTok | Reels | Shorts" }],
  "talkingPoints": ["string"],
  "debate": {
    "for": ["strongest arguments supporting the take"],
    "against": ["strongest honest counterarguments"],
    "rebuttals": [{ "claim": "what a critic says", "rebuttal": "how to answer it" }],
    "punchlines": ["clip-ready one liners"],
    "structure": ["ordered beats for covering this on camera"],
    "riskFlags": ["claims needing a source, legal risk, or audience backlash risk"]
  },
  "threads": {
    "tweets": ["standalone posts"],
    "quoteTweets": ["reactions designed to be quote-tweeted"],
    "thread": ["numbered thread, each item one tweet, first item is the hook"]
  },
  "score": {
    "clickability": 0-100, "clarity": 0-100, "emotion": 0-100,
    "controversy": 0-100, "novelty": 0-100, "factCheckRisk": 0-100,
    "overall": 0-100,
    "whyItWorks": "two sentences",
    "whyItMayFlop": "two honest sentences on the real failure mode"
  }
}`;

const CRYPTO_SCHEMA = `Additionally include a "crypto" key:
"crypto": {
  "names": ["project name options"],
  "tickers": ["3 to 6 character tickers, uppercase"],
  "taglines": ["short brand lines"],
  "heroHeadline": "the landing page h1",
  "launchTweets": ["launch announcement options"],
  "founderBios": ["short bio options for the founder account"],
  "memeIdeas": ["meme concepts described in one line"],
  "landingCopy": [{ "heading": "string", "body": "2 sentences" }],
  "ctas": ["button copy options"]
}`;

export function buildUserPrompt(req: GenerateRequest) {
  const counts =
    req.mode === "crypto"
      ? "8 titles, 4 thumbnails, 5 hooks, 6 talking points, 6 tweets, 3 quote tweets, an 8 tweet thread"
      : "10 titles, 4 thumbnails, 5 hooks, 8 talking points, 6 tweets, 3 quote tweets, an 8 tweet thread";

  return `${MODE_GUIDE[req.mode]}

TONE: ${TONE_GUIDE[req.tone]}
INTENSITY: ${INTENSITY_GUIDE[req.intensity]}
AUDIENCE: ${req.audience?.trim() || "an opinion-led creator audience that is very online"}
${req.refine ? `REFINEMENT PASS: ${REFINE_GUIDE[req.refine]}` : ""}

USER INPUT:
"""
${req.input.slice(0, 8000)}
"""

Produce ${counts}. In debate mode weight the debate section heaviest. In crypto mode weight the crypto section heaviest.

Return JSON exactly matching this shape:
${PACK_SCHEMA}
${req.mode === "crypto" ? CRYPTO_SCHEMA : ""}`;
}

/** SWAP POINT: image styling for thumbnail renders. */
export function buildImagePrompt(concept: string, style: string) {
  const styles: Record<string, string> = {
    photoreal:
      "photorealistic, shot on a 35mm lens, crisp studio key light, shallow depth of field, high contrast",
    bold:
      "bold graphic poster style, flat saturated color blocking, heavy shapes, high contrast, editorial",
    meme:
      "chaotic internet meme energy, oversaturated, slightly cursed, screenshot aesthetic",
    clean:
      "clean premium product aesthetic, soft studio gradient background, minimal, lots of negative space",
  };
  return `${concept}. ${styles[style] ?? styles.photoreal}. Composed as a 16:9 YouTube thumbnail with the subject offset to one side and clear empty space for a text overlay. Extremely legible at small size. No text, no letters, no words, no watermark, no logos in the image.`;
}
