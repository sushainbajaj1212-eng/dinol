"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button, Pill } from "@/components/ui";
import { MODES } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Mode } from "@/lib/types";

/** Real rendered thumbnails, floated around the headline like a moodboard. */
const FLOATERS = [
  {
    src: "/assets/examples/creator-payouts-1.png",
    text: "THEY LIED",
    className: "left-[2%] top-[17%] w-[168px] -rotate-[9deg] xl:left-[4%] xl:w-[205px]",
    delay: 0.35,
  },
  {
    src: "/assets/examples/hypecat-2.png",
    text: "NO INSIDERS",
    className: "right-[2%] top-[11%] w-[162px] rotate-[8deg] xl:right-[4%] xl:w-[198px]",
    delay: 0.45,
  },
  {
    src: "/assets/examples/launch-too-early-3.png",
    text: "TOO EARLY",
    className: "left-[4%] bottom-[12%] w-[150px] rotate-[6deg] xl:left-[6%] xl:w-[180px]",
    delay: 0.55,
  },
  {
    src: "/assets/examples/creator-payouts-3.png",
    text: "$0.00",
    className: "right-[4%] bottom-[14%] w-[156px] -rotate-[7deg] xl:right-[6%] xl:w-[188px]",
    delay: 0.65,
  },
];

function Floater({
  src,
  text,
  className,
  delay,
}: (typeof FLOATERS)[number]) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(
        "pointer-events-none absolute hidden overflow-hidden rounded-2xl border-4 border-white bg-[var(--espresso)] shadow-lift lg:block",
        className,
      )}
    >
      <div className="relative aspect-video">
        <Image src={src} alt="" fill sizes="205px" className="object-cover" />
        <figcaption className="display absolute inset-0 flex items-center justify-center px-3 text-center text-[19px] leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {text}
        </figcaption>
      </div>
    </motion.figure>
  );
}

export function Hero() {
  const router = useRouter();
  const [mode, setMode] = React.useState<Mode>("creator");
  const [value, setValue] = React.useState("");

  const active = MODES.find((m) => m.id === mode)!;

  function go(text?: string) {
    const q = (text ?? value).trim();
    const params = new URLSearchParams({ mode });
    if (q) params.set("q", q);
    router.push(`/app?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden">
      {/* ambient art */}
      <div className="pointer-events-none absolute inset-0 grain opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.18),transparent_62%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.10),transparent_65%)]" />

      {FLOATERS.map((f) => (
        <Floater key={f.src} {...f} />
      ))}

      <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-14 text-center sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Pill>
            <Sparkles className="size-3.5 text-[var(--orange)]" />
            Free to start. No card required.
          </Pill>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="display mx-auto mt-7 max-w-[13ch] text-[40px] leading-[0.95] sm:max-w-[18ch] sm:text-[58px] md:text-[66px] lg:max-w-[20ch]"
        >
          Turn One Hot Take
          <br />
          Into <span className="hl">a Viral Content Pack</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-[var(--espresso-soft)] sm:text-[17px]"
        >
          Paste a topic, tweet, transcript or token idea. DINOL gives you
          titles, thumbnails, hooks, talking points, threads and crypto launch
          assets in seconds.
        </motion.p>

        {/* input console */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="rounded-[26px] border border-[var(--line)] bg-white p-2.5 shadow-lift">
            <div className="flex gap-1.5 rounded-2xl bg-[var(--cream)] p-1.5">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "flex-1 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all",
                    mode === m.id
                      ? "bg-white text-[var(--espresso)] shadow-soft"
                      : "text-[var(--muted)] hover:text-[var(--espresso)]",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) go();
              }}
              rows={3}
              placeholder={active.placeholder}
              className="mt-2 w-full resize-none bg-transparent px-4 py-3 text-left text-[15px] leading-relaxed text-[var(--espresso)] outline-none placeholder:text-[var(--muted)]"
            />

            <div className="flex items-center justify-between gap-3 px-2 pb-1">
              <span className="hidden text-xs text-[var(--muted)] sm:block">
                {active.blurb}
              </span>
              <Button size="lg" onClick={() => go()} className="ml-auto">
                Generate my pack
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-[var(--muted)]">
              Try:
            </span>
            {active.examples.map((ex) => (
              <button
                key={ex}
                onClick={() => go(ex)}
                className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1.5 text-xs font-medium text-[var(--espresso-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--orange)] hover:text-[var(--orange)]"
              >
                {ex}
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
            <Zap className="size-3.5 text-[var(--orange)]" />
            Full pack in about 12 seconds. Free account, no card.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
