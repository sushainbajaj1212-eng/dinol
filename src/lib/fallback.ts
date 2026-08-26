import type { ContentPack, GenerateRequest } from "./types";

/**
 * Deterministic offline pack. Used when OPENAI_API_KEY is missing or the API
 * call fails, so the product never shows an empty state. Clearly marked demo.
 */
export function fallbackPack(req: GenerateRequest): ContentPack {
  const topic = req.input.trim().replace(/\s+/g, " ").slice(0, 90) || "your take";
  const short = topic.length > 46 ? topic.slice(0, 46).trim() + "..." : topic;

  return {
    id: "demo",
    createdAt: new Date().toISOString(),
    mode: req.mode,
    tone: req.tone,
    intensity: req.intensity,
    input: req.input,
    summary: `Demo pack for "${short}". Add an OPENAI_API_KEY to generate real output.`,
    demo: true,
    titles: [
      { text: `Nobody Wants To Say This About ${short}`, angle: "forbidden truth framing", ctrGuess: 88 },
      { text: `I Was Wrong About ${short}`, angle: "public reversal", ctrGuess: 84 },
      { text: `${short} Is A Bigger Deal Than You Think`, angle: "stakes escalation", ctrGuess: 79 },
      { text: `The Real Reason ${short} Keeps Happening`, angle: "hidden cause", ctrGuess: 82 },
      { text: `Let's Talk About ${short}, Honestly`, angle: "sincerity contrast", ctrGuess: 71 },
      { text: `${short}: What Everyone Gets Backwards`, angle: "correction hook", ctrGuess: 80 },
    ],
    thumbnails: [
      {
        concept: "Close crop reaction face, one eyebrow raised, hard rim light",
        overlayText: "THEY LIED",
        composition: "Subject on the right third, empty space left for text",
        palette: "Espresso brown, bone white, signal orange",
        imagePrompt: `A close up portrait of a young creator with a skeptical raised eyebrow, dramatic rim lighting, dark studio background, subject offset to the right`,
      },
      {
        concept: "Split screen of two opposing symbols with a crack down the middle",
        overlayText: "PICK A SIDE",
        composition: "Hard vertical split, tension at the centre seam",
        palette: "Cream, deep red, black",
        imagePrompt: `A dramatic split composition showing two opposing objects separated by a jagged crack, studio lighting, high contrast`,
      },
      {
        concept: "Hand holding a phone showing a rising chart, blurred crowd behind",
        overlayText: "IT'S ALREADY OVER",
        composition: "Foreground hand bottom left, subject blurred behind",
        palette: "Cool grey, neon green, black",
        imagePrompt: `A hand holding a smartphone displaying a sharply rising line chart, blurred crowd in the background, cinematic lighting`,
      },
      {
        concept: "Empty chair under a spotlight in a dark room",
        overlayText: "NO ONE SHOWED",
        composition: "Centered subject, heavy negative space above",
        palette: "Black, warm amber, dust grey",
        imagePrompt: `A single empty chair lit by one harsh overhead spotlight in a dark empty room, moody atmospheric haze`,
      },
    ],
    hooks: [
      { hook: `Everyone is wrong about ${short} and I can prove it in 30 seconds.`, script: `Everyone is wrong about ${short}. Here is the part they skip. The incentive is not what you think it is. Once you see it you cannot unsee it. Follow if you want the long version.`, platform: "Shorts" },
      { hook: `Stop scrolling. ${short} is about to affect you directly.`, script: `Stop scrolling. ${short} sounds like someone else's problem. It is not. Here is the chain of events. It ends at your feed, your wallet, your attention. Save this.`, platform: "TikTok" },
      { hook: `I changed my mind about ${short}. Here is what broke me.`, script: `I defended this position for a year. Then I looked at the actual numbers. Here is what I found and why I flipped. Tell me I am wrong in the comments.`, platform: "Reels" },
    ],
    talkingPoints: [
      `The mainstream framing of ${short} confuses the symptom with the cause`,
      "Follow the incentive, not the argument",
      "The loudest voices have the least exposure to the downside",
      "There is a version of this that was fine ten years ago and is not fine now",
      "The counterargument is strong and pretending otherwise loses the room",
    ],
    debate: {
      for: [
        `The evidence around ${short} is directionally clear even if the details are contested`,
        "The cost of being wrong in one direction is far higher than the other",
        "Every serious objection assumes the current system stays static, and it will not",
      ],
      against: [
        "The data set is small and heavily selected",
        "This confuses correlation with a mechanism",
        "The proposed alternative has failed in at least two comparable cases",
      ],
      rebuttals: [
        { claim: "You are cherry picking", rebuttal: "Name the sample you would accept, and I will run the same argument against it." },
        { claim: "This is just a vibe, not evidence", rebuttal: "Vibes are the leading indicator. The data confirms it a year later, and by then the decision is already made." },
      ],
      punchlines: [
        "We did not get here by accident. We got here on purpose, slowly.",
        "The system is not broken. It is working exactly as designed for someone else.",
      ],
      structure: [
        "Open with the strongest version of the other side",
        "Show the one fact that breaks it",
        "Concede the real weakness in your own case",
        "Land the stakes",
        "Ask the audience a question they cannot answer neutrally",
      ],
      riskFlags: [
        "Any specific statistic needs a source on screen",
        "Avoid naming individuals as bad actors without documentation",
      ],
    },
    threads: {
      tweets: [
        `Unpopular: ${short} is not the problem. It is the receipt.`,
        `The ${short} discourse is 90% people arguing about the label and 10% about the thing.`,
        `If you are still framing ${short} as a debate you are two years behind.`,
      ],
      quoteTweets: [
        "This is the most confident wrong take I have read all week, and I want to explain why carefully.",
        "Agree with the premise, completely disagree with what follows from it.",
      ],
      thread: [
        `Everyone is arguing about ${short} using a model that stopped being true. A thread.`,
        "1. Start with the incentive. Nobody in this argument is neutral, including me.",
        "2. The original framing made sense when the cost of being wrong was low. It is not low now.",
        "3. Here is the part that gets skipped: the second order effect is bigger than the first.",
        "4. The strongest counterargument is real. It says the sample is too small. Fair.",
        "5. But the direction has been consistent across every sample we have.",
        "6. What I would change my mind on: one clean counterexample at scale.",
        "7. Until then I am taking the side with the cheaper mistake. Follow for the long version.",
      ],
    },
    crypto:
      req.mode === "crypto"
        ? {
            names: ["Dinol", "Hotline", "Firstmover", "Loudmouth", "Signalcamp"],
            tickers: ["DINOL", "HOTL", "LOUD", "SGNL"],
            taglines: ["Built loud, on purpose", "For people who post before they are ready", "The internet's opinion layer"],
            heroHeadline: "The community that argues in public and ships anyway",
            launchTweets: [
              "We are live. No presale, no insiders, no roadmap PDF. Just the thing, working.",
              "Spent six months building this in silence. That was the last quiet day.",
            ],
            founderBios: [
              "Building in public. Loud takes, real shipping. Contract in bio.",
              "Ex nothing, currently everything. Building the internet's opinion layer.",
            ],
            memeIdeas: [
              "Two buttons sweating meme where both buttons say ship it",
              "Chart going down with the caption 'conviction'",
            ],
            landingCopy: [
              { heading: "Built in the open", body: "Every decision gets posted before it is finished. The community sees the ugly version first." },
              { heading: "No gatekeepers", body: "There is no allocation list and no private round. Everyone finds out at the same time." },
            ],
            ctas: ["Join the group", "Get in early", "Read the thesis"],
          }
        : undefined,
    score: {
      clickability: 82,
      clarity: 74,
      emotion: 79,
      controversy: 68,
      novelty: 61,
      factCheckRisk: 34,
      overall: 76,
      whyItWorks: "The framing creates an information gap the viewer wants closed. It also picks a side, which gives the comment section something to fight about.",
      whyItMayFlop: "The angle is close to takes that already saturated the timeline, so novelty is the weak leg. If the first 3 seconds do not name a specific stake, retention drops fast.",
    },
  };
}
