"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Bookmark, BookmarkCheck, RotateCw } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { PackView } from "./pack-view";
import { MODES, TONES, INTENSITIES, TEMPLATES } from "@/data/site";
import {
  bumpUsage,
  getSaved,
  pushHistory,
  remainingFree,
  toggleSaved,
} from "@/lib/store";
import { cn } from "@/lib/utils";
import type { ContentPack, Intensity, Mode, RefineAction, Tone } from "@/lib/types";

const LOADING_LINES = [
  "Reading the take",
  "Finding the sharpest angle",
  "Writing titles that earn the click",
  "Storyboarding thumbnails",
  "Building the counterargument",
  "Scoring the whole thing honestly",
];

/**
 * Renders the first couple of thumbnail graphics immediately so a fresh pack
 * arrives with visuals rather than empty frames. The rest stay on demand so we
 * are not burning image credits on concepts the user will not use.
 */
const AUTO_RENDER = 2;

async function autoRenderThumbnails(pack: ContentPack): Promise<ContentPack> {
  const targets = pack.thumbnails.slice(0, AUTO_RENDER);
  if (!targets.length) return pack;

  const rendered = await Promise.all(
    targets.map(async (t) => {
      try {
        const res = await fetch("/api/thumbnail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ concept: t.imagePrompt || t.concept }),
        });
        const data = await res.json();
        return typeof data.image === "string" ? data.image : undefined;
      } catch {
        return undefined;
      }
    }),
  );

  return {
    ...pack,
    thumbnails: pack.thumbnails.map((t, i) =>
      rendered[i] ? { ...t, imageUrl: rendered[i] } : t,
    ),
  };
}

export function Studio() {
  const params = useSearchParams();

  const [input, setInput] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("creator");
  const [tone, setTone] = React.useState<Tone>("punchy");
  const [intensity, setIntensity] = React.useState<Intensity>("balanced");
  const [audience, setAudience] = React.useState("");
  const [pack, setPack] = React.useState<ContentPack | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [line, setLine] = React.useState(0);
  const [free, setFree] = React.useState(3);
  const [saved, setSaved] = React.useState(false);
  const ranInitial = React.useRef(false);

  const activeMode = MODES.find((m) => m.id === mode)!;

  React.useEffect(() => setFree(remainingFree()), []);

  React.useEffect(() => {
    if (!busy) return;
    const t = setInterval(
      () => setLine((l) => (l + 1) % LOADING_LINES.length),
      1800,
    );
    return () => clearInterval(t);
  }, [busy]);

  /* Hydrate from query string: ?q=, ?mode=, ?template= */
  React.useEffect(() => {
    if (ranInitial.current) return;
    ranInitial.current = true;

    const template = params.get("template");
    const tpl = TEMPLATES.find((t) => t.id === template);
    if (tpl) {
      setInput(tpl.prompt);
      setMode(tpl.mode);
      setTone(tpl.tone);
      setIntensity(tpl.intensity);
      return;
    }

    const m = params.get("mode");
    if (m && MODES.some((x) => x.id === m)) setMode(m as Mode);

    const q = params.get("q");
    if (q) {
      setInput(q);
      void generate({ text: q, useMode: (m as Mode) ?? "creator" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generate(opts?: {
    text?: string;
    useMode?: Mode;
    refine?: RefineAction;
  }) {
    const text = (opts?.text ?? input).trim();
    if (text.length < 8) {
      setError("Give me at least a sentence to work with.");
      return;
    }
    setBusy(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: text,
          mode: opts?.useMode ?? mode,
          tone,
          intensity,
          audience,
          refine: opts?.refine,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed. Try again.");
        return;
      }
      const fresh = await autoRenderThumbnails(data.pack);
      setPack(fresh);
      pushHistory(fresh);
      setFree(Math.max(0, 3 - bumpUsage()));
      requestAnimationFrame(() =>
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  function save() {
    if (!pack) return;
    toggleSaved(pack);
    setSaved(getSaved().some((p) => p.id === pack.id));
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">
        {/* ------------------------------ Controls ------------------------------ */}
        <Card className="p-5 lg:sticky lg:top-24">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Mode
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-xl bg-[var(--cream)] p-1.5">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "rounded-lg px-2 py-2 text-[12px] font-semibold transition-all",
                  mode === m.id
                    ? "bg-white text-[var(--espresso)] shadow-soft"
                    : "text-[var(--muted)] hover:text-[var(--espresso)]",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
            {activeMode.blurb}
          </p>

          <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Your idea
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void generate();
            }}
            rows={7}
            placeholder={activeMode.placeholder}
            className="mt-2 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--cream)]/50 p-3.5 text-[14px] leading-relaxed text-[var(--espresso)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--orange)] focus:bg-white"
          />

          <div className="mt-2 flex flex-wrap gap-1.5">
            {activeMode.examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="rounded-full border border-[var(--line)] bg-white px-2.5 py-1 text-[11px] text-[var(--espresso-soft)] transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
              >
                {ex.length > 38 ? ex.slice(0, 38) + "..." : ex}
              </button>
            ))}
          </div>

          <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Tone
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all",
                  tone === t.id
                    ? "bg-[var(--espresso)] text-[var(--cream)]"
                    : "border border-[var(--line)] bg-white text-[var(--espresso-soft)] hover:border-[var(--espresso)]",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Intensity
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {INTENSITIES.map((x) => (
              <button
                key={x.id}
                onClick={() => setIntensity(x.id)}
                title={x.hint}
                className={cn(
                  "rounded-lg border px-2 py-2 text-[12px] font-semibold transition-all",
                  intensity === x.id
                    ? "border-[var(--orange)] bg-[var(--orange-soft)] text-[var(--orange-deep)]"
                    : "border-[var(--line)] bg-white text-[var(--espresso-soft)]",
                )}
              >
                {x.label}
              </button>
            ))}
          </div>

          <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Audience <span className="font-medium normal-case tracking-normal">(optional)</span>
          </div>
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="eg. 25-40 year old finance sceptics"
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--cream)]/50 px-3.5 py-2.5 text-[13px] text-[var(--espresso)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--orange)] focus:bg-white"
          />

          {error && (
            <div className="mt-4 rounded-xl border border-[#DC2626]/30 bg-[#FEF2F2] p-3 text-[13px] text-[#991B1B]">
              {error}
            </div>
          )}

          <Button
            size="lg"
            className="mt-5 w-full"
            disabled={busy}
            onClick={() => void generate()}
          >
            {busy ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Generating
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Generate pack
              </>
            )}
          </Button>

          <p className="mt-3 text-center text-[11px] text-[var(--muted)]">
            {free > 0
              ? `${free} free ${free === 1 ? "pack" : "packs"} left on your account this month.`
              : "Free packs used up. Upgrade for more volume and watermark free exports."}
          </p>
        </Card>

        {/* ------------------------------- Results ------------------------------- */}
        <div id="results">
          {busy && !pack && <LoadingState line={LOADING_LINES[line]} />}

          {!busy && !pack && <EmptyState />}

          {pack && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h1 className="display text-[26px]">Your pack</h1>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" onClick={save}>
                    {saved ? (
                      <>
                        <BookmarkCheck className="size-3.5 text-[var(--orange)]" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="size-3.5" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={busy}
                    onClick={() => void generate()}
                  >
                    <RotateCw className={cn("size-3.5", busy && "animate-spin")} />
                    Regenerate
                  </Button>
                </div>
              </div>

              <PackView
                pack={pack}
                busy={busy}
                locked
                onRefine={(action) => void generate({ refine: action })}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingState({ line }: { line: string }) {
  return (
    <Card className="p-8">
      <div className="flex items-center gap-3">
        <Loader2 className="size-5 animate-spin text-[var(--orange)]" />
        <span className="text-[15px] font-semibold text-[var(--espresso)]">
          {line}
        </span>
      </div>
      <div className="mt-7 space-y-3">
        {[92, 78, 85, 64, 88, 71].map((w, i) => (
          <div
            key={i}
            className="shimmer relative h-11 overflow-hidden rounded-xl bg-[var(--cream-deep)]"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-[var(--orange-soft)]">
        <Sparkles className="size-6 text-[var(--orange)]" />
      </div>
      <h2 className="display mt-5 text-[24px]">Paste a take to start</h2>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[var(--espresso-soft)]">
        A topic, a rant, a transcript, a tweet or a launch brief. You get
        titles, thumbnail concepts, hooks, talking points, a debate kit, threads
        and an honest virality score.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["Titles", "Thumbnails", "Hooks", "Debate", "Threads", "Score"].map(
          (t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[12px] font-semibold text-[var(--muted)]"
            >
              {t}
            </span>
          ),
        )}
      </div>
    </Card>
  );
}
