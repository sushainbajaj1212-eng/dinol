export type Mode = "creator" | "debate" | "crypto";

export type Tone =
  | "punchy"
  | "analytical"
  | "unhinged"
  | "warm"
  | "deadpan"
  | "founder";

export type Intensity = "safe" | "balanced" | "spicy";

export interface GenerateRequest {
  input: string;
  mode: Mode;
  tone: Tone;
  intensity: Intensity;
  audience?: string;
  refine?: RefineAction;
}

export type RefineAction =
  | "stronger"
  | "more_controversial"
  | "safer"
  | "shorter"
  | "more_creator";

export interface TitleItem {
  text: string;
  angle: string;
  ctrGuess: number;
}

export interface ThumbnailConcept {
  concept: string;
  overlayText: string;
  composition: string;
  palette: string;
  imagePrompt: string;
  /** Set when the graphic has already been rendered and stored. */
  imageUrl?: string;
}

export interface HookItem {
  hook: string;
  script: string;
  platform: string;
}

export interface DebatePack {
  for: string[];
  against: string[];
  rebuttals: { claim: string; rebuttal: string }[];
  punchlines: string[];
  structure: string[];
  riskFlags: string[];
}

export interface ThreadPack {
  tweets: string[];
  quoteTweets: string[];
  thread: string[];
}

export interface CryptoPack {
  names: string[];
  tickers: string[];
  taglines: string[];
  heroHeadline: string;
  launchTweets: string[];
  founderBios: string[];
  memeIdeas: string[];
  landingCopy: { heading: string; body: string }[];
  ctas: string[];
}

export interface ViralityScore {
  clickability: number;
  clarity: number;
  emotion: number;
  controversy: number;
  novelty: number;
  factCheckRisk: number;
  overall: number;
  whyItWorks: string;
  whyItMayFlop: string;
}

export interface ContentPack {
  id: string;
  createdAt: string;
  mode: Mode;
  tone: Tone;
  intensity: Intensity;
  input: string;
  summary: string;
  titles: TitleItem[];
  thumbnails: ThumbnailConcept[];
  hooks: HookItem[];
  talkingPoints: string[];
  debate: DebatePack;
  threads: ThreadPack;
  crypto?: CryptoPack;
  score: ViralityScore;
  demo?: boolean;
}
