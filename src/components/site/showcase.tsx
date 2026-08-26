"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  ImageIcon,
  Zap,
  Swords,
  Hash,
  Gauge,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { Button, Card, Meter } from "@/components/ui";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";
import { EXAMPLES } from "@/lib/examples";
import type { ExamplePack } from "@/lib/examples";

/* --------------------------- Live output showcase -------------------------- */

const TABS = [
  { id: "titles", label: "Titles", icon: Type },
  { id: "thumbnails", label: "Thumbnails", icon: ImageIcon },
  { id: "hooks", label: "Hooks", icon: Zap },
  { id: "debate", label: "Debate", icon: Swords },
  { id: "threads", label: "Threads", icon: Hash },
  { id: "score", label: "Score", icon: Gauge },
] as const;

type TabId = (typeof TABS)[number]["id"];

/**
 * The real seeded pack, rendered in a browser frame. Everything visible here
 * is genuine output rather than a mocked-up screenshot.
 */
export function LiveShowcase() {
  const pack = EXAMPLES[0] as ExamplePack | undefined;
  const [tab, setTab] = React.useState<TabId>("titles");

  if (!pack) return null;

  return (
    <section id="features" className="relative overflow-hidden px-5 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.10),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--orange)]">
              Real output
            </div>
            <h2 className="display mt-3 text-[34px] sm:text-[48px]">
              One input. <span className="hl">Seven outputs.</span>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--espresso-soft)]">
              This is an actual pack from the product, not a mockup. Click
              through the tabs and read the whole thing.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-lift">
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--cream)] px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 rounded-md bg-white px-3 py-1 text-[11px] font-medium text-[var(--muted)]">
                dinol.fun/app
              </span>
            </div>

            <div className="grid md:grid-cols-[280px_1fr]">
              {/* the input */}
              <div className="border-b border-[var(--line)] bg-[var(--cream)]/40 p-5 md:border-b-0 md:border-r">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  The input
                </div>
                <div className="mt-2 rounded-xl border border-[var(--line)] bg-white p-3.5 text-[13px] leading-relaxed text-[var(--espresso-soft)]">
                  {pack.input}
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    ["Mode", pack.mode],
                    ["Tone", pack.tone],
                    ["Intensity", pack.intensity],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-[11px] text-[var(--muted)]">{k}</span>
                      <span className="rounded-full bg-[var(--orange-soft)] px-2.5 py-1 text-[10px] font-bold uppercase text-[var(--orange-deep)]">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-[var(--espresso)] px-4 py-3 text-center text-[13px] font-semibold text-[var(--cream)]">
                  Generate pack
                </div>
                <p className="mt-4 text-[11px] leading-relaxed text-[var(--muted)]">
                  Produced {pack.titles.length} titles,{" "}
                  {pack.thumbnails.length} thumbnails and{" "}
                  {pack.threads.thread.length} thread posts in one pass.
                </p>
              </div>

              {/* the output */}
              <div className="min-h-[440px] p-5">
                <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-[var(--line)] pb-3">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={cn(
                        "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all",
                        tab === t.id
                          ? "bg-[var(--espresso)] text-[var(--cream)]"
                          : "text-[var(--muted)] hover:bg-[var(--cream-deep)]",
                      )}
                    >
                      <t.icon className="size-3.5" />
                      {t.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    {tab === "titles" && (
                      <div className="space-y-2">
                        {pack.titles.slice(0, 5).map((t) => (
                          <div
                            key={t.text}
                            className="flex items-start justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--cream)]/40 px-4 py-3"
                          >
                            <div>
                              <div className="text-[14px] font-semibold leading-snug text-[var(--espresso)]">
                                {t.text}
                              </div>
                              <div className="mt-0.5 text-[11px] text-[var(--muted)]">
                                {t.angle}
                              </div>
                            </div>
                            <span className="shrink-0 rounded-md bg-white px-2 py-1 text-[11px] font-bold text-[#0F9D58]">
                              {t.ctrGuess}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {tab === "thumbnails" && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {pack.thumbnails.slice(0, 4).map((t, i) => (
                          <div
                            key={i}
                            className="overflow-hidden rounded-xl border border-[var(--line)]"
                          >
                            <div className="relative aspect-video bg-[var(--espresso)]">
                              {t.imageUrl && (
                                <Image
                                  src={t.imageUrl}
                                  alt={t.concept}
                                  fill
                                  sizes="300px"
                                  className="object-cover"
                                />
                              )}
                              <span className="display absolute inset-0 flex items-center justify-center px-4 text-center text-[20px] leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                                {t.overlayText}
                              </span>
                            </div>
                            <p className="bg-white px-3 py-2 text-[11px] leading-snug text-[var(--espresso-soft)]">
                              {t.concept}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {tab === "hooks" && (
                      <div className="space-y-3">
                        {pack.hooks.slice(0, 3).map((h, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-[var(--line)] bg-[var(--cream)]/40 p-4"
                          >
                            <span className="rounded-md bg-[var(--orange-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--orange-deep)]">
                              {h.platform}
                            </span>
                            <p className="mt-2 text-[14px] font-bold leading-snug text-[var(--espresso)]">
                              {h.hook}
                            </p>
                            <p className="mt-1.5 border-l-2 border-[var(--line)] pl-3 text-[12px] leading-relaxed text-[var(--espresso-soft)]">
                              {h.script}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {tab === "debate" && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0F9D58]">
                            Case for
                          </div>
                          <div className="space-y-2">
                            {pack.debate.for.slice(0, 3).map((d, i) => (
                              <p
                                key={i}
                                className="rounded-xl border border-[var(--line)] bg-white px-3.5 py-2.5 text-[12px] leading-relaxed text-[var(--espresso)]"
                              >
                                {d}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#DC2626]">
                            Case against
                          </div>
                          <div className="space-y-2">
                            {pack.debate.against.slice(0, 3).map((d, i) => (
                              <p
                                key={i}
                                className="rounded-xl border border-[var(--line)] bg-white px-3.5 py-2.5 text-[12px] leading-relaxed text-[var(--espresso)]"
                              >
                                {d}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {tab === "threads" && (
                      <div className="space-y-2">
                        {pack.threads.thread.slice(0, 5).map((t, i) => (
                          <div
                            key={i}
                            className="flex gap-3 rounded-xl border border-[var(--line)] bg-white px-4 py-3"
                          >
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--cream-deep)] text-[10px] font-bold text-[var(--muted)]">
                              {i + 1}
                            </span>
                            <p className="text-[12.5px] leading-relaxed text-[var(--espresso)]">
                              {t}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {tab === "score" && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Card className="p-5">
                          <div className="display text-[46px] leading-none text-[var(--espresso)]">
                            {pack.score.overall}
                          </div>
                          <div className="mt-4 space-y-3">
                            <Meter label="Clickability" value={pack.score.clickability} />
                            <Meter label="Clarity" value={pack.score.clarity} />
                            <Meter label="Novelty" value={pack.score.novelty} />
                            <Meter
                              label="Fact check risk"
                              value={pack.score.factCheckRisk}
                              invert
                            />
                          </div>
                        </Card>
                        <Card className="border-[var(--orange)]/30 bg-[var(--orange-soft)] p-5">
                          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--orange-deep)]">
                            Why this may flop
                          </div>
                          <p className="mt-2 text-[13px] leading-relaxed text-[var(--espresso)]">
                            {pack.score.whyItMayFlop}
                          </p>
                        </Card>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={`/p/${pack.slug}`}>
              <Button variant="secondary">
                Read this pack in full <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/examples">
              <Button variant="ghost">See all examples</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Title marquee ------------------------------ */

/** A ribbon of genuine generated titles. Cheap to render, very convincing. */
export function TitleMarquee() {
  const titles = EXAMPLES.flatMap((p) => p.titles.map((t) => t.text)).slice(0, 14);
  if (!titles.length) return null;
  const doubled = [...titles, ...titles];

  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-white/60 py-4">
      <div className="flex w-max animate-marquee gap-3 px-5">
        {doubled.map((t, i) => (
          <span
            key={t + i}
            className="whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--cream)] px-4 py-2 text-[13px] font-semibold text-[var(--espresso-soft)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Comparison ------------------------------- */

const ROWS = [
  { label: "Titles with the angle explained", dinol: true, tool: true, manual: true },
  { label: "Thumbnail concepts and rendered graphics", dinol: true, tool: true, manual: false },
  { label: "Short form hooks and 30 second scripts", dinol: true, tool: false, manual: true },
  { label: "The counterargument, before the comments", dinol: true, tool: false, manual: false },
  { label: "Thread already formatted for X", dinol: true, tool: false, manual: true },
  { label: "Crypto launch brand and copy assets", dinol: true, tool: false, manual: false },
  { label: "An honest reason it might flop", dinol: true, tool: false, manual: false },
  { label: "Time from idea to publishable", dinol: "12 sec", tool: "20 min", manual: "3 hrs" },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return (
      <span className="text-[13px] font-bold text-[var(--espresso)]">{value}</span>
    );
  }
  return value ? (
    <Check className="mx-auto size-4 text-[#0F9D58]" />
  ) : (
    <X className="mx-auto size-4 text-[var(--line)]" />
  );
}

export function Comparison() {
  return (
    <section className="px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--orange)]">
              Why not just
            </div>
            <h2 className="display mt-3 text-[34px] sm:text-[44px]">
              Do it the other way?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--espresso-soft)]">
              A thumbnail tool solves one square of this. Doing it by hand
              solves all of them, on Sunday, badly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-1/2 px-4 pb-4 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                    Capability
                  </th>
                  <th className="px-4 pb-4">
                    <span className="inline-block rounded-full bg-[var(--orange)] px-3.5 py-1.5 text-[12px] font-bold text-white">
                      DINOL
                    </span>
                  </th>
                  <th className="px-4 pb-4 text-[12px] font-bold text-[var(--muted)]">
                    Thumbnail tool
                  </th>
                  <th className="px-4 pb-4 text-[12px] font-bold text-[var(--muted)]">
                    By hand
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.label}>
                    <td
                      className={cn(
                        "px-4 py-3.5 text-[14px] text-[var(--espresso)]",
                        i > 0 && "border-t border-[var(--line)]",
                      )}
                    >
                      {r.label}
                    </td>
                    <td
                      className={cn(
                        "bg-[var(--orange-soft)]/50 px-4 py-3.5 text-center",
                        i > 0 && "border-t border-[var(--orange)]/15",
                      )}
                    >
                      <Cell value={r.dinol} />
                    </td>
                    <td
                      className={cn(
                        "px-4 py-3.5 text-center",
                        i > 0 && "border-t border-[var(--line)]",
                      )}
                    >
                      <Cell value={r.tool} />
                    </td>
                    <td
                      className={cn(
                        "px-4 py-3.5 text-center",
                        i > 0 && "border-t border-[var(--line)]",
                      )}
                    >
                      <Cell value={r.manual} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Sticky CTA ------------------------------- */

export function StickyCta() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setShow(y > 900 && y < max - 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.28 }}
          className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 md:block"
        >
          <div className="flex items-center gap-4 rounded-full border border-[var(--line)] bg-white/95 py-2 pl-6 pr-2 shadow-lift backdrop-blur-xl">
            <span className="text-[14px] font-semibold text-[var(--espresso)]">
              Got a take? Turn it into a pack.
            </span>
            <Link href="/app">
              <Button size="sm">
                Start free <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
