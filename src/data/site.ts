import type { Intensity, Mode, Tone } from "@/lib/types";

export const SITE = {
  name: "DINOL",
  domain: "dinol.fun",
  url: "https://dinol.fun",
  tagline: "Turn one hot take into a viral content pack",
  description:
    "Paste a topic, tweet, transcript or token idea. DINOL gives you titles, thumbnails, hooks, talking points, threads and launch assets in seconds. Free to start.",
};

export const FOUNDER = {
  name: "Tyson Hockley",
  handle: "@HockleyTyson",
  x: "https://x.com/HockleyTyson",
  role: "Founder of DINOL",
  photo: "/assets/founder.jpg",
  bio: [
    "Tyson Hockley is a creator and commentator who built his audience the hard way: opinions first, algorithm second. He has spent years in the trenches of independent media, where the difference between a video that lands and one that disappears is usually a title, a thumbnail and the first six seconds.",
    "DINOL came out of that frustration. The work of turning a good take into publishable content is mechanical, repetitive and slow, and it eats the time that should go into thinking. So he built the tool he wanted: paste the idea, get the whole pack, publish the same day.",
  ],
  beliefs: [
    "Speed beats polish. A take published today beats a perfect one published next week.",
    "Creators should own their distribution, not rent it.",
    "The tools should serve the voice, never replace it.",
  ],
};

export const MODES: {
  id: Mode;
  label: string;
  blurb: string;
  placeholder: string;
  examples: string[];
}[] = [
  {
    id: "creator",
    label: "Creator",
    blurb: "Topics, rants, transcripts and video ideas into a full publish pack.",
    placeholder:
      "Paste a topic, a rant, a transcript, or a video idea. Example: why creator platforms keep quietly changing the payout terms",
    examples: [
      "Why mainstream media keeps getting creator economics wrong",
      "Turn this podcast rant into a viral YouTube package",
      "Streaming platforms are quietly training on our archives",
    ],
  },
  {
    id: "debate",
    label: "Debate",
    blurb: "A contested claim into arguments, rebuttals and clip-ready punchlines.",
    placeholder:
      "Drop a claim or a contested question. Example: should crypto founders stop launching before they have a product?",
    examples: [
      "Should crypto founders stop launching too early?",
      "Is audience funding better than brand sponsorship?",
      "AI voice cloning should require opt-in consent by law",
    ],
  },
  {
    id: "crypto",
    label: "Crypto Launch",
    blurb: "A token or project concept into brand, copy and launch assets.",
    placeholder:
      "Describe the project, token, category and vibe. Example: a community token for independent journalists called HYPECAT",
    examples: [
      "Generate a content pack for a token called HYPECAT",
      "A creator-owned memecoin for a podcast community",
      "Launch brief for an on-chain tipping app for streamers",
    ],
  },
];

export const TONES: { id: Tone; label: string }[] = [
  { id: "punchy", label: "Punchy" },
  { id: "analytical", label: "Analytical" },
  { id: "unhinged", label: "Unhinged" },
  { id: "warm", label: "Warm" },
  { id: "deadpan", label: "Deadpan" },
  { id: "founder", label: "Founder" },
];

export const INTENSITIES: { id: Intensity; label: string; hint: string }[] = [
  { id: "safe", label: "Safe", hint: "Brand safe, fully defensible" },
  { id: "balanced", label: "Balanced", hint: "Opinionated, not reckless" },
  { id: "spicy", label: "Spicy", hint: "Maximum polarization" },
];

export const TEMPLATES: {
  id: string;
  title: string;
  blurb: string;
  mode: Mode;
  tone: Tone;
  intensity: Intensity;
  prompt: string;
  accent: string;
}[] = [
  {
    id: "podcast-rant",
    title: "Podcast Rant Pack",
    blurb: "Turn a 10 minute rant into titles, clips and a thread.",
    mode: "creator",
    tone: "unhinged",
    intensity: "spicy",
    prompt:
      "Turn this podcast rant into a full content pack: the ad model broke independent media and everyone is pretending it didn't. Paste your transcript below this line.",
    accent: "#FF5A1F",
  },
  {
    id: "livestream-titles",
    title: "Livestream Title Pack",
    blurb: "Twenty title options that survive a scrolling browse page.",
    mode: "creator",
    tone: "punchy",
    intensity: "balanced",
    prompt:
      "I am going live tonight to react to the biggest story in creator news this week. Give me stream titles that work on a browse page.",
    accent: "#2F6BFF",
  },
  {
    id: "reaction-video",
    title: "Reaction Video Pack",
    blurb: "React without sounding like every other reaction channel.",
    mode: "creator",
    tone: "deadpan",
    intensity: "balanced",
    prompt:
      "I am reacting to a viral video where a founder blames their audience for a failed launch. Give me a full reaction package.",
    accent: "#00A47C",
  },
  {
    id: "breaking-news",
    title: "Breaking News Pack",
    blurb: "Be first without being wrong.",
    mode: "creator",
    tone: "analytical",
    intensity: "safe",
    prompt:
      "A major platform just changed its monetization terms overnight. Give me a fast, careful breaking news package with fact check flags.",
    accent: "#C2410C",
  },
  {
    id: "token-launch",
    title: "Crypto Token Launch",
    blurb: "Name, ticker, tagline, launch tweet, landing copy.",
    mode: "crypto",
    tone: "founder",
    intensity: "balanced",
    prompt:
      "A community token for independent creators who fund each other's projects. Playful but credible. No presale, no insiders.",
    accent: "#7C3AED",
  },
  {
    id: "founder-thread",
    title: "Founder Thread Pack",
    blurb: "Build in public without the LinkedIn voice.",
    mode: "crypto",
    tone: "founder",
    intensity: "balanced",
    prompt:
      "Write a build in public thread about shipping a product solo in 6 weeks, including the parts that went badly.",
    accent: "#0F766E",
  },
  {
    id: "controversy",
    title: "Creator Controversy Pack",
    blurb: "Take a side, survive the comments.",
    mode: "debate",
    tone: "punchy",
    intensity: "spicy",
    prompt:
      "Creators who take brand money should have to disclose the rate, not just the fact that it is an ad.",
    accent: "#DC2626",
  },
  {
    id: "hot-take-defense",
    title: "Hot Take Defense Kit",
    blurb: "Every counterargument, answered in advance.",
    mode: "debate",
    tone: "analytical",
    intensity: "balanced",
    prompt:
      "Defend this take: audience funded media produces better journalism than advertiser funded media.",
    accent: "#1D4ED8",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I used to spend an hour on titles before every upload. Now I spend four minutes and the CTR went up, which is annoying but I will take it.",
    name: "Marcus Vale",
    role: "YouTube, 340k",
    stars: 5,
  },
  {
    quote:
      "The debate mode is the sleeper feature. It hands me the counterargument before the comments do, so I stopped getting ambushed on stream.",
    name: "Priya Raghunathan",
    role: "Live commentary",
    stars: 5,
  },
  {
    quote:
      "We launched a community token on a Friday. The tagline, the launch tweet and half the landing page came out of one DINOL run.",
    name: "Dex Okafor",
    role: "Crypto founder",
    stars: 5,
  },
  {
    quote:
      "It told me my idea would flop and explained why. It was right. That single line saved me a whole shoot day.",
    name: "Hanna Lindqvist",
    role: "Documentary creator",
    stars: 5,
  },
  {
    quote:
      "Thumbnail concepts come with composition notes, so my editor stopped asking me what I meant. That alone paid for it.",
    name: "Theo Barrett",
    role: "Podcast, 90k",
    stars: 5,
  },
  {
    quote:
      "I write my own scripts. I use this for the first six seconds, which is the part I am worst at.",
    name: "Jules Amara",
    role: "Short form",
    stars: 5,
  },
];

export const FAQS = [
  {
    q: "Do I need an account?",
    a: "Yes, the studio needs a free account. It takes about twenty seconds with an email address or a Google login, and no card is required. The account is what makes your packs yours: saved history, a library you can come back to, and the credits attached to your plan. You can read every example pack on this site before you sign up.",
  },
  {
    q: "How does the credit system work?",
    a: "One generation is one credit and it produces the entire pack: titles, thumbnails concepts, hooks, talking points, threads and the virality score. Thumbnail renders cost one render credit each. Unused credits do not roll over.",
  },
  {
    q: "Can I change or cancel my plan?",
    a: "Any time. Because billing is a direct ETH payment there is no recurring charge to cancel: a plan simply runs for the month you paid for. To continue, send the next month's payment. To stop, do nothing.",
  },
  {
    q: "How do I pay?",
    a: "In ETH on Ethereum mainnet, sent straight to the project wallet. Pick a plan, send the quoted amount from any wallet you control, then paste the transaction hash to activate. There are no cards and we never see a payment credential.",
  },
  {
    q: "Does the output sound like AI?",
    a: "It is prompted hard against the usual tells. There is a banned phrase list, no em dashes, and every item has to be specific to your input rather than a template with your topic slotted in. Tone presets do most of the remaining work.",
  },
  {
    q: "Who owns what DINOL generates?",
    a: "You do. Use it commercially, edit it, publish it. On paid plans the exports come without a watermark.",
  },
  {
    q: "What happens to my transcripts and inputs?",
    a: "Inputs are used to produce your pack and to populate your own history. They are not sold, not published, and not used to train public models.",
  },
  {
    q: "Is the virality score real or decorative?",
    a: "It is a model judgement, not a guarantee. The useful part is the breakdown: it tells you which leg is weak, and the 'why this may flop' line is deliberately blunt.",
  },
  {
    q: "Is crypto mode financial advice?",
    a: "No. Crypto mode writes brand and launch copy. It will not promise returns or price action, and you are responsible for complying with the rules where you operate.",
  },
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 20,
    blurb: "For creators publishing a few times a week.",
    features: [
      "100 generations per month",
      "20 thumbnail renders",
      "All three modes",
      "Basic virality analysis",
      "30 day history",
      "Watermark on rendered thumbnails",
    ],
    cta: "Pay in ETH",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 50,
    blurb: "For creators who publish daily and need volume.",
    features: [
      "500 generations per month",
      "150 thumbnail renders",
      "Watermark free exports",
      "Advanced virality analysis",
      "Unlimited history and saved packs",
      "Brand voice presets",
      "Crypto launch mode included",
      "Shareable pack pages",
    ],
    cta: "Pay in ETH",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 99,
    blurb: "For teams, studios and full launch operations.",
    features: [
      "2000 generations per month",
      "500 thumbnail renders",
      "Batch generation",
      "Priority rendering queue",
      "Premium image styles",
      "PDF and markdown export",
      "Workspace with up to 5 seats",
      "Priority support",
    ],
    cta: "Pay in ETH",
    featured: false,
  },
];

export const TRUST_STRIP = [
  "YouTube commentary",
  "Twitch",
  "Independent podcasts",
  "Substack",
  "Crypto launches",
  "Short form",
  "Newsletters",
  "Live debate",
];
