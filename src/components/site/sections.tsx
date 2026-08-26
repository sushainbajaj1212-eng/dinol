import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Star,
  Type,
  ImageIcon,
  Swords,
  Hash,
  Coins,
  Gauge,
  Clock,
  Shield,
  Wand2,
  ArrowRight,
} from "lucide-react";
import { Button, Card, Eyebrow, Pill, Meter } from "@/components/ui";
import { Reveal } from "./reveal";
import {
  FAQS,
  FOUNDER,
  PLANS,
  TEMPLATES,
  TESTIMONIALS,
  TRUST_STRIP,
} from "@/data/site";
import { Accordion } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  ArtTitles,
  ArtThumbnails,
  ArtDebate,
  ArtHooks,
  ArtCrypto,
  ArtScore,
  GlyphCreator,
  GlyphDebate,
  GlyphCrypto,
  Squiggle,
} from "./art";

/* ------------------------------ Section shell ------------------------------ */

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("px-5 py-20 sm:py-24", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display mt-3 text-[34px] sm:text-[46px]">{title}</h2>
      {sub && (
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--espresso-soft)]">
          {sub}
        </p>
      )}
    </div>
  );
}

/* -------------------------------- Trust strip ------------------------------ */

export function TrustStrip() {
  const items = [...TRUST_STRIP, ...TRUST_STRIP];
  return (
    <div className="border-y border-[var(--line)] bg-white/60 py-5">
      <div className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
        Built for opinion led media
      </div>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 px-5">
          {items.map((t, i) => (
            <span
              key={t + i}
              className="whitespace-nowrap text-[15px] font-semibold text-[var(--espresso)]/45"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--cream)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--cream)] to-transparent" />
      </div>
    </div>
  );
}

/* ------------------------------- Demo mockup ------------------------------- */

const DEMO_TITLES = [
  "Nobody Wants To Say This About Creator Payouts",
  "I Was Wrong About Ad Revenue",
  "The Real Reason Your Channel Stalled",
  "Platforms Changed The Deal. Again.",
];

export function DemoSection() {
  return (
    <Section id="features" className="bg-[var(--cream-deep)]">
      <Reveal>
        <SectionHead
          eyebrow="The studio"
          title={
            <>
              One input. <span className="hl">Seven outputs.</span>
            </>
          }
          sub="Everything you would normally open five tabs and three tools for, produced in one pass and formatted to copy straight out."
        />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-14 overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-lift">
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--cream)] px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#FF5F57]" />
            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="size-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 rounded-md bg-white px-3 py-1 text-[11px] font-medium text-[var(--muted)]">
              dinol.fun/app
            </span>
          </div>

          <div className="grid gap-0 md:grid-cols-[300px_1fr]">
            {/* controls */}
            <div className="border-b border-[var(--line)] bg-[var(--cream)]/50 p-5 md:border-b-0 md:border-r">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                Input
              </div>
              <div className="mt-2 rounded-xl border border-[var(--line)] bg-white p-3 text-[13px] leading-relaxed text-[var(--espresso-soft)]">
                Platforms quietly changed creator payout terms again and
                everyone is pretending it is normal.
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Mode", value: "Creator" },
                  { label: "Tone", value: "Punchy" },
                  { label: "Intensity", value: "Spicy" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span className="text-xs text-[var(--muted)]">{r.label}</span>
                    <span className="rounded-full bg-[var(--orange-soft)] px-2.5 py-1 text-[11px] font-bold text-[var(--orange-deep)]">
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-[var(--espresso)] px-4 py-3 text-center text-[13px] font-semibold text-[var(--cream)]">
                Generate pack
              </div>
            </div>

            {/* output */}
            <div className="p-5">
              <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-[var(--line)] pb-3">
                {["Titles", "Thumbnails", "Hooks", "Debate", "Threads", "Score"].map(
                  (t, i) => (
                    <span
                      key={t}
                      className={cn(
                        "whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold",
                        i === 0
                          ? "bg-[var(--espresso)] text-[var(--cream)]"
                          : "text-[var(--muted)]",
                      )}
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>

              <div className="mt-4 space-y-2.5">
                {DEMO_TITLES.map((t, i) => (
                  <div
                    key={t}
                    className="flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--cream)]/40 px-4 py-3"
                  >
                    <span className="text-[14px] font-semibold text-[var(--espresso)]">
                      {t}
                    </span>
                    <span className="shrink-0 rounded-md bg-white px-2 py-1 text-[11px] font-bold text-[#0F9D58]">
                      {92 - i * 5} CTR
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { l: "Clickability", v: 91 },
                  { l: "Clarity", v: 78 },
                  { l: "Risk", v: 22 },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-[var(--line)] bg-white p-3"
                  >
                    <div className="display text-[26px] text-[var(--espresso)]">
                      {s.v}
                    </div>
                    <div className="text-[11px] text-[var(--muted)]">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------- Feature grid ------------------------------ */

const FEATURES = [
  {
    icon: Type,
    art: ArtTitles,
    title: "Headline pack",
    body: "Ten title options with the angle spelled out and a click estimate, so you pick on reasoning rather than vibes.",
  },
  {
    icon: ImageIcon,
    art: ArtThumbnails,
    title: "Thumbnail pack",
    body: "Concepts with composition notes, overlay text and a render button. Your editor stops asking what you meant.",
  },
  {
    icon: Swords,
    art: ArtDebate,
    title: "Debate pack",
    body: "The strongest case for, the strongest case against, and the rebuttal to the comment you are about to get.",
  },
  {
    icon: Hash,
    art: ArtHooks,
    title: "Hooks and threads",
    body: "First lines that survive a scroll, 30 second scripts, and an eight tweet thread already formatted.",
  },
  {
    icon: Coins,
    art: ArtCrypto,
    title: "Crypto launch pack",
    body: "Names, tickers, taglines, launch tweets, founder bio and landing copy for a token or community launch.",
  },
  {
    icon: Gauge,
    art: ArtScore,
    title: "Virality feedback",
    body: "Scored on clickability, clarity, emotion, controversy, novelty and fact check risk, with a blunt flop warning.",
  },
];

export function Features() {
  return (
    <Section>
      <Reveal>
        <SectionHead
          eyebrow="What you get"
          title="Everything in one pass"
          sub="Not a title generator with extras bolted on. Every section is produced from the same understanding of your idea, so they agree with each other."
        />
        <Squiggle className="mx-auto mt-6 w-40" />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <div className="relative flex h-[132px] items-center justify-center overflow-hidden bg-[var(--cream-deep)]">
                <div className="absolute inset-0 grain opacity-50" />
                <f.art className="relative h-[104px] w-auto transition-transform duration-500 group-hover:scale-[1.06]" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--orange-soft)] transition-colors group-hover:bg-[var(--orange)]">
                    <f.icon className="size-4 text-[var(--orange)] transition-colors group-hover:text-white" />
                  </span>
                  <h3 className="text-[17px] font-bold text-[var(--espresso)]">
                    {f.title}
                  </h3>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--espresso-soft)]">
                  {f.body}
                </p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------- Stats ---------------------------------- */

const STATS = [
  { value: "7", label: "output types per pack", sub: "titles to launch copy" },
  { value: "12s", label: "average generation", sub: "idea to full pack" },
  { value: "3", label: "modes", sub: "creator, debate, crypto" },
  { value: "$0", label: "to get started", sub: "free account, no card" },
];

export function Stats() {
  return (
    <section className="bg-[var(--espresso)] px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="text-center sm:text-left">
              <div className="display text-[54px] leading-none text-[var(--orange)]">
                {s.value}
              </div>
              <div className="mt-2 text-[14px] font-bold text-[var(--cream)]">
                {s.label}
              </div>
              <div className="text-[13px] text-[var(--cream)]/50">{s.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Modes ---------------------------------- */

const MODE_CARDS = [
  {
    glyph: GlyphCreator,
    name: "Creator mode",
    href: "/app?mode=creator",
    tint: "var(--orange-soft)",
    body: "For topics, rants, transcripts and video ideas. Optimised for YouTube, streams and short form.",
    outputs: ["Titles", "Thumbnails", "Hooks", "Talking points"],
  },
  {
    glyph: GlyphDebate,
    name: "Debate mode",
    href: "/app?mode=debate",
    tint: "#E8EEFF",
    body: "For a contested claim. Builds the honest case both ways, then arms you with rebuttals and punchlines.",
    outputs: ["Both sides", "Rebuttals", "Punchlines", "Risk flags"],
  },
  {
    glyph: GlyphCrypto,
    name: "Crypto launch",
    href: "/app?mode=crypto",
    tint: "#E6F7F1",
    body: "For a token, product or community. Produces the brand and copy assets a launch actually needs.",
    outputs: ["Names", "Tickers", "Launch tweets", "Landing copy"],
  },
];

export function Modes() {
  return (
    <Section>
      <Reveal>
        <SectionHead
          eyebrow="Three modes"
          title={
            <>
              Pick the <span className="hl">right weapon</span>
            </>
          }
          sub="The same engine, pointed at three different jobs. Each mode changes what gets weighted and what gets written."
        />
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {MODE_CARDS.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.07}>
            <Link href={m.href} className="group block h-full">
              <Card className="flex h-full flex-col p-7 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lift">
                <span
                  className="flex size-16 items-center justify-center rounded-2xl"
                  style={{ background: m.tint }}
                >
                  <m.glyph className="size-8" />
                </span>
                <h3 className="display mt-5 text-[24px]">{m.name}</h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-[var(--espresso-soft)]">
                  {m.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-4">
                  {m.outputs.map((o) => (
                    <span
                      key={o}
                      className="rounded-full bg-[var(--cream)] px-2.5 py-1 text-[11px] font-semibold text-[var(--espresso-soft)]"
                    >
                      {o}
                    </span>
                  ))}
                </div>
                <span className="mt-4 flex items-center gap-1.5 text-[13px] font-bold text-[var(--orange)]">
                  Open this mode
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------- Templates -------------------------------- */

export function Templates() {
  return (
    <Section id="templates" className="bg-[var(--cream-deep)]">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            center={false}
            eyebrow="Templates"
            title={
              <>
                Start from a<br />
                <span className="hl">proven angle</span>
              </>
            }
            sub="Eight prompt templates tuned for the formats creators actually publish. Click one, edit the brief, generate."
          />
          <Link href="/app">
            <Button variant="secondary">
              Open the studio <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TEMPLATES.map((t, i) => (
          <Reveal key={t.id} delay={(i % 4) * 0.05}>
            <Link
              href={`/app?template=${t.id}`}
              className="group block h-full overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div
                className="relative flex h-28 items-end p-4"
                style={{
                  background: `linear-gradient(135deg, ${t.accent}, ${t.accent}bb)`,
                }}
              >
                <div className="absolute inset-0 grain opacity-30" />
                <span className="relative display text-[19px] leading-tight text-white">
                  {t.title}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[13px] leading-relaxed text-[var(--espresso-soft)]">
                  {t.blurb}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-[var(--orange)] opacity-0 transition-opacity group-hover:opacity-100">
                  Use template <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------- How it works ------------------------------ */

const STEPS = [
  {
    n: "01",
    title: "Paste the idea",
    body: "A sentence, a rant, a transcript, a tweet or a launch brief. Anything that carries the point.",
  },
  {
    n: "02",
    title: "Set the voice",
    body: "Pick a mode, a tone and how far you want to push it. Safe, balanced or spicy.",
  },
  {
    n: "03",
    title: "Publish the pack",
    body: "Copy the title, render the thumbnail, film the hook, post the thread. Same day.",
  },
];

export function HowItWorks() {
  return (
    <Section>
      <Reveal>
        <SectionHead eyebrow="How it works" title="Three steps, one sitting" />
      </Reveal>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="relative">
              <div className="display text-[64px] leading-none text-[var(--orange)]/18">
                {s.n}
              </div>
              <h3 className="mt-2 text-[20px] font-bold text-[var(--espresso)]">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--espresso-soft)]">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------ Thumbnail band ----------------------------- */

export function ThumbnailBand() {
  return (
    <section className="relative overflow-hidden bg-[var(--orange)] px-5 py-20 sm:py-24">
      <div className="absolute inset-0 grain opacity-25" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="rounded-3xl bg-white p-4 shadow-lift">
            <div className="aspect-video overflow-hidden rounded-2xl bg-[var(--espresso)]">
              <div className="relative flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_40%,#4A342A,#160C07)]">
                <div className="absolute left-6 top-6 rounded-md bg-[var(--orange)] px-2.5 py-1 text-[10px] font-black tracking-wider text-white">
                  RENDERED
                </div>
                <div className="display px-8 text-center text-[34px] leading-none text-white">
                  THEY
                  <br />
                  <span className="text-[var(--orange)]">LIED</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {["Photoreal", "Bold", "Meme", "Clean"].map((s, i) => (
                <span
                  key={s}
                  className={cn(
                    "flex-1 rounded-lg px-2 py-1.5 text-center text-[11px] font-bold",
                    i === 0
                      ? "bg-[var(--espresso)] text-white"
                      : "bg-[var(--cream-deep)] text-[var(--muted)]",
                  )}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="text-white">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
              Thumbnails
            </div>
            <h2 className="display mt-3 text-[36px] leading-[1.02] sm:text-[46px]">
              Concepts you can
              <br />
              actually shoot
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/90">
              Every concept comes with the composition, the palette and the
              overlay text. Hit render and DINOL generates the image in four
              styles, ready to drop into your editor.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Four style presets from photoreal to meme",
                "16:9 renders sized for YouTube and X",
                "Overlay text written to be legible at thumbnail size",
                "Watermark free downloads on paid plans",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-white">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/25">
                    <Check className="size-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/app" className="mt-8 inline-block">
              <Button variant="dark">
                Render a thumbnail <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Virality band ------------------------------ */

export function ViralityBand() {
  return (
    <section id="virality" className="bg-[var(--espresso)] px-5 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="text-[var(--cream)]">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--orange)]">
              Virality feedback
            </div>
            <h2 className="display mt-3 text-[36px] leading-[1.02] sm:text-[46px]">
              Find out why it
              <br />
              will flop first
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[var(--cream)]/80">
              Most tools flatter you. DINOL scores the pack on six axes and then
              tells you, in plain language, the most likely reason it dies in
              the feed. Fix the weak leg before you shoot.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Clickability",
                "Clarity",
                "Emotion",
                "Controversy",
                "Novelty",
                "Fact check risk",
              ].map((t) => (
                <Pill
                  key={t}
                  className="border-white/15 bg-white/10 text-[var(--cream)]"
                >
                  {t}
                </Pill>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Overall
                </div>
                <div className="display text-[52px] leading-none text-[var(--espresso)]">
                  76
                </div>
              </div>
              <span className="rounded-full bg-[#0F9D58]/10 px-3 py-1.5 text-xs font-bold text-[#0F9D58]">
                Worth shooting
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <Meter label="Clickability" value={82} />
              <Meter label="Clarity" value={74} />
              <Meter label="Emotion" value={79} />
              <Meter label="Novelty" value={61} />
              <Meter label="Fact check risk" value={34} invert />
            </div>
            <div className="mt-6 rounded-xl bg-[var(--cream)] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">
                Why this may flop
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--espresso-soft)]">
                The angle is close to takes that already saturated the timeline,
                so novelty is the weak leg. If the first three seconds do not
                name a specific stake, retention drops fast.
              </p>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Founder ---------------------------------- */

export function FounderSection({ full = false }: { full?: boolean }) {
  return (
    <Section id="founder" className={full ? "" : "bg-[var(--cream-deep)]"}>
      <div className="grid items-start gap-12 md:grid-cols-[320px_1fr]">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--espresso)] shadow-lift">
              <div className="relative aspect-square">
                <Image
                  src={FOUNDER.photo}
                  alt={FOUNDER.name}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-3 rounded-2xl bg-[var(--orange)] px-4 py-2.5 text-[13px] font-bold text-white shadow-lift">
              Founder
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <Eyebrow>Who built this</Eyebrow>
            <h2 className="display mt-3 text-[34px] sm:text-[44px]">
              {FOUNDER.name}
            </h2>
            <a
              href={FOUNDER.x}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[var(--espresso)] transition-all hover:-translate-y-0.5 hover:border-[var(--espresso)]"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {FOUNDER.handle}
            </a>

            <div className="mt-6 space-y-4">
              {FOUNDER.bio.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="max-w-2xl text-[16px] leading-relaxed text-[var(--espresso-soft)]"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {FOUNDER.beliefs.map((b, i) => (
                <Card key={b} className="p-4">
                  <div className="display text-[20px] text-[var(--orange)]/30">
                    0{i + 1}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--espresso)]">
                    {b}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------- Testimonials ------------------------------ */

export function Testimonials() {
  return (
    <Section>
      <Reveal>
        <SectionHead
          eyebrow="Creators"
          title={
            <>
              Loved by people who
              <br />
              <span className="hl">post for a living</span>
            </>
          }
        />
      </Reveal>
      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.06} className="mb-5 break-inside-avoid">
            <Card className="p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="size-3.5 fill-[var(--orange)] text-[var(--orange)]" />
                ))}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--espresso)]">
                {t.quote}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[var(--espresso)] text-[13px] font-bold text-[var(--cream)]">
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[var(--espresso)]">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-[var(--muted)]">{t.role}</div>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------- Pricing --------------------------------- */

export function Pricing({ compact = false }: { compact?: boolean }) {
  return (
    <Section id="pricing" className={compact ? "" : "bg-[var(--cream-deep)]"}>
      <Reveal>
        <SectionHead
          eyebrow="Pricing"
          title="Simple pricing"
          sub="Start free, then pay in ETH straight to the project wallet when you need the volume. No card and no processor in the middle."
        />
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.07}>
            <Card
              className={cn(
                "relative flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1",
                p.featured &&
                  "border-[var(--orange)] shadow-lift ring-1 ring-[var(--orange)]",
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--orange)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}
              <div className="text-[15px] font-bold text-[var(--espresso)]">
                {p.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="display text-[46px] text-[var(--espresso)]">
                  ${p.price}
                </span>
                <span className="text-[14px] text-[var(--muted)]">/month</span>
              </div>
              <p className="mt-2 text-[14px] text-[var(--espresso-soft)]">
                {p.blurb}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-[var(--espresso-soft)]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--orange)]" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={`/app/billing?plan=${p.id}`} className="mt-7">
                <Button
                  className="w-full"
                  variant={p.featured ? "primary" : "secondary"}
                >
                  {p.cta}
                </Button>
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Clock, t: "Free to start", b: "Make your first packs without paying anything." },
            { icon: Shield, t: "Paid in ETH", b: "Ethereum mainnet, direct to the wallet. No card details." },
            { icon: Wand2, t: "You own the output", b: "Commercial use included on every plan." },
          ].map((x) => (
            <div key={x.t} className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-white/60 p-4">
              <x.icon className="mt-0.5 size-4 shrink-0 text-[var(--orange)]" />
              <div>
                <div className="text-[13px] font-bold text-[var(--espresso)]">{x.t}</div>
                <div className="text-[12px] text-[var(--muted)]">{x.b}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ----------------------------------- FAQ ----------------------------------- */

export function Faq({ compact = false }: { compact?: boolean }) {
  return (
    <Section className={compact ? "" : ""}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display mt-3 text-[34px] sm:text-[44px]">
              Frequently
              <br />
              asked
            </h2>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-[var(--espresso-soft)]">
              Credits, ownership, privacy and what happens to your transcripts.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion items={FAQS} />
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------- Final CTA -------------------------------- */

export function FinalCta() {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-[var(--orange)] px-6 py-20 text-center">
          <div className="absolute inset-0 grain opacity-25" />
          <div className="relative">
            <h2 className="display mx-auto max-w-2xl text-[38px] leading-[1.02] text-white sm:text-[54px]">
              Your next take deserves
              <br />
              a better title
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] text-white/90">
              Read a full example pack first. Then make your own, free, in
              about twelve seconds.
            </p>
            <Link href="/app" className="mt-9 inline-block">
              <Button variant="dark" size="lg">
                Build my content pack <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
