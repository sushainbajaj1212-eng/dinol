"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  ImageIcon,
  Zap,
  Swords,
  Hash,
  Coins,
  Gauge,
  Loader2,
  Download,
  Lock,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Button, Card, CopyButton, Meter, Pill } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ContentPack, RefineAction } from "@/lib/types";

const TABS = [
  { id: "titles", label: "Titles", icon: Type },
  { id: "thumbnails", label: "Thumbnails", icon: ImageIcon },
  { id: "hooks", label: "Hooks", icon: Zap },
  { id: "debate", label: "Debate", icon: Swords },
  { id: "threads", label: "Threads", icon: Hash },
  { id: "crypto", label: "Crypto", icon: Coins },
  { id: "score", label: "Score", icon: Gauge },
] as const;

type TabId = (typeof TABS)[number]["id"];

const REFINEMENTS: { id: RefineAction; label: string }[] = [
  { id: "stronger", label: "Make stronger" },
  { id: "more_controversial", label: "More controversial" },
  { id: "safer", label: "Make safer" },
  { id: "shorter", label: "Shorten" },
  { id: "more_creator", label: "More creator-like" },
];

const IMAGE_STYLES = [
  { id: "photoreal", label: "Photoreal" },
  { id: "bold", label: "Bold" },
  { id: "meme", label: "Meme" },
  { id: "clean", label: "Clean" },
];

/* ------------------------------- Row helpers ------------------------------- */

function Row({
  children,
  copy,
  meta,
}: {
  children: React.ReactNode;
  copy: string;
  meta?: React.ReactNode;
}) {
  return (
    <div className="group flex items-start justify-between gap-3 rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 transition-colors hover:border-[var(--espresso)]/25">
      <div className="min-w-0 flex-1">{children}</div>
      <div className="flex shrink-0 items-center gap-1">
        {meta}
        <CopyButton value={copy} />
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/* -------------------------------- Main view -------------------------------- */

export function PackView({
  pack,
  onRefine,
  busy,
  locked,
}: {
  pack: ContentPack;
  onRefine?: (action: RefineAction) => void;
  busy?: boolean;
  locked?: boolean;
}) {
  const [tab, setTab] = React.useState<TabId>("titles");
  const [style, setStyle] = React.useState("photoreal");
  const [images, setImages] = React.useState<Record<number, string>>(() =>
    Object.fromEntries(
      pack.thumbnails
        .map((t, i) => [i, t.imageUrl])
        .filter((entry): entry is [number, string] => Boolean(entry[1])),
    ),
  );

  // A new pack means a new set of graphics.
  React.useEffect(() => {
    setImages(
      Object.fromEntries(
        pack.thumbnails
          .map((t, i) => [i, t.imageUrl])
          .filter((entry): entry is [number, string] => Boolean(entry[1])),
      ),
    );
  }, [pack.id, pack.thumbnails]);
  const [rendering, setRendering] = React.useState<number | null>(null);
  const [renderError, setRenderError] = React.useState<string | null>(null);

  const visibleTabs = TABS.filter((t) => t.id !== "crypto" || pack.crypto);

  async function render(index: number, concept: string) {
    setRendering(index);
    setRenderError(null);
    try {
      const res = await fetch("/api/thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept, style }),
      });
      const data = await res.json();
      if (data.image) {
        setImages((prev) => ({ ...prev, [index]: data.image }));
      } else {
        setRenderError(data.error ?? "Render failed.");
      }
    } catch {
      setRenderError("Render failed. Check your connection.");
    } finally {
      setRendering(null);
    }
  }

  const allText = React.useMemo(() => {
    switch (tab) {
      case "titles":
        return pack.titles.map((t) => t.text).join("\n");
      case "hooks":
        return pack.hooks.map((h) => `${h.hook}\n${h.script}`).join("\n\n");
      case "threads":
        return pack.threads.thread.join("\n\n");
      case "debate":
        return [...pack.debate.for, ...pack.debate.against].join("\n");
      default:
        return "";
    }
  }, [tab, pack]);

  return (
    <div>
      {pack.demo && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-[#E8A317]/40 bg-[#FFF8E7] p-4">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#B7791F]" />
          <p className="text-[13px] leading-relaxed text-[#7A5A15]">
            <strong>Demo output.</strong> The server has no OPENAI_API_KEY set,
            so this is a canned sample pack. Add the key and restart to generate
            real results.
          </p>
        </div>
      )}

      {/* summary bar */}
      <Card className="mb-4 flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">
            The angle
          </div>
          <p className="mt-1 text-[14px] leading-relaxed text-[var(--espresso)]">
            {pack.summary}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Pill className="capitalize">{pack.mode}</Pill>
          <Pill className="capitalize">{pack.tone}</Pill>
        </div>
      </Card>

      {/* tabs */}
      <div className="no-scrollbar -mx-1 mb-4 flex gap-1 overflow-x-auto px-1">
        {visibleTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all",
              tab === t.id
                ? "bg-[var(--espresso)] text-[var(--cream)]"
                : "text-[var(--muted)] hover:bg-[var(--cream-deep)] hover:text-[var(--espresso)]",
            )}
          >
            <t.icon className="size-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {onRefine &&
          REFINEMENTS.map((r) => (
            <button
              key={r.id}
              disabled={busy}
              onClick={() => onRefine(r.id)}
              className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--espresso-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--orange)] hover:text-[var(--orange)] disabled:opacity-40"
            >
              {r.label}
            </button>
          ))}
        {allText && (
          <CopyButton
            value={allText}
            label="Copy all"
            className="ml-auto border border-[var(--line)] bg-white"
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          {/* ---------------------------- TITLES ---------------------------- */}
          {tab === "titles" &&
            pack.titles.map((t, i) => (
              <Row
                key={t.text + i}
                copy={t.text}
                meta={
                  <span
                    className={cn(
                      "rounded-md px-2 py-1 text-[11px] font-bold tabular-nums",
                      t.ctrGuess >= 80
                        ? "bg-[#0F9D58]/10 text-[#0F9D58]"
                        : t.ctrGuess >= 60
                          ? "bg-[#E8A317]/12 text-[#B7791F]"
                          : "bg-[var(--cream-deep)] text-[var(--muted)]",
                    )}
                  >
                    {t.ctrGuess}
                  </span>
                }
              >
                <div className="text-[15px] font-semibold leading-snug text-[var(--espresso)]">
                  {t.text}
                </div>
                <div className="mt-1 text-[12px] text-[var(--muted)]">
                  {t.angle}
                </div>
              </Row>
            ))}

          {/* -------------------------- THUMBNAILS -------------------------- */}
          {tab === "thumbnails" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-semibold text-[var(--muted)]">
                  Style
                </span>
                {IMAGE_STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all",
                      style === s.id
                        ? "bg-[var(--orange)] text-white"
                        : "border border-[var(--line)] bg-white text-[var(--espresso-soft)]",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {renderError && (
                <div className="rounded-xl border border-[#DC2626]/30 bg-[#FEF2F2] p-3 text-[13px] text-[#991B1B]">
                  {renderError}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {pack.thumbnails.map((t, i) => (
                  <Card key={t.concept + i} className="overflow-hidden">
                    <div className="relative aspect-video bg-[var(--espresso)]">
                      {images[i] ? (
                        <Image
                          src={images[i]}
                          alt={t.concept}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_35%_35%,#4A342A,#180D07)]">
                          <span className="display px-6 text-center text-[26px] leading-none text-white">
                            {t.overlayText}
                          </span>
                        </div>
                      )}
                      {images[i] && (
                        <span className="display pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-[30px] leading-none text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.75)]">
                          {t.overlayText}
                        </span>
                      )}
                      {locked && images[i] && (
                        <span className="absolute bottom-2 right-2 rounded bg-black/55 px-2 py-1 text-[10px] font-bold tracking-wider text-white">
                          DINOL.FUN
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="text-[14px] font-semibold leading-snug text-[var(--espresso)]">
                        {t.concept}
                      </p>
                      <dl className="mt-3 space-y-1.5 text-[12px]">
                        <div className="flex gap-2">
                          <dt className="w-20 shrink-0 text-[var(--muted)]">
                            Overlay
                          </dt>
                          <dd className="font-semibold text-[var(--espresso)]">
                            {t.overlayText}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-20 shrink-0 text-[var(--muted)]">
                            Composition
                          </dt>
                          <dd className="text-[var(--espresso-soft)]">
                            {t.composition}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-20 shrink-0 text-[var(--muted)]">
                            Palette
                          </dt>
                          <dd className="text-[var(--espresso-soft)]">
                            {t.palette}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4 flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={images[i] ? "secondary" : "primary"}
                          disabled={rendering !== null}
                          onClick={() => render(i, t.imagePrompt || t.concept)}
                          className="flex-1"
                        >
                          {rendering === i ? (
                            <>
                              <Loader2 className="size-3.5 animate-spin" />
                              Rendering
                            </>
                          ) : images[i] ? (
                            <>
                              <Sparkles className="size-3.5" />
                              Variation
                            </>
                          ) : (
                            <>
                              <ImageIcon className="size-3.5" />
                              Render graphic
                            </>
                          )}
                        </Button>
                        {images[i] && (
                          <a
                            href={images[i]}
                            download={`dinol-thumbnail-${i + 1}.png`}
                            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3 text-[13px] font-semibold text-[var(--espresso)] hover:border-[var(--espresso)]"
                          >
                            <Download className="size-3.5" />
                          </a>
                        )}
                        <CopyButton value={t.imagePrompt} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* ----------------------------- HOOKS ----------------------------- */}
          {tab === "hooks" && (
            <>
              {pack.hooks.map((h, i) => (
                <Card key={h.hook + i} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="rounded-md bg-[var(--orange-soft)] px-2 py-1 text-[11px] font-bold text-[var(--orange-deep)]">
                        {h.platform}
                      </span>
                      <p className="mt-3 text-[16px] font-bold leading-snug text-[var(--espresso)]">
                        {h.hook}
                      </p>
                    </div>
                    <CopyButton value={`${h.hook}\n\n${h.script}`} />
                  </div>
                  <p className="mt-3 border-l-2 border-[var(--line)] pl-4 text-[14px] leading-relaxed text-[var(--espresso-soft)]">
                    {h.script}
                  </p>
                </Card>
              ))}
              <Group title="Talking points">
                {pack.talkingPoints.map((p, i) => (
                  <Row key={p + i} copy={p}>
                    <span className="text-[14px] text-[var(--espresso)]">{p}</span>
                  </Row>
                ))}
              </Group>
            </>
          )}

          {/* ----------------------------- DEBATE ---------------------------- */}
          {tab === "debate" && (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <Group title="Strongest case for">
                  {pack.debate.for.map((d, i) => (
                    <Row key={d + i} copy={d}>
                      <span className="text-[14px] leading-relaxed text-[var(--espresso)]">
                        {d}
                      </span>
                    </Row>
                  ))}
                </Group>
                <Group title="Strongest case against">
                  {pack.debate.against.map((d, i) => (
                    <Row key={d + i} copy={d}>
                      <span className="text-[14px] leading-relaxed text-[var(--espresso)]">
                        {d}
                      </span>
                    </Row>
                  ))}
                </Group>
              </div>

              <Group title="Rebuttals">
                {pack.debate.rebuttals.map((r, i) => (
                  <Card key={r.claim + i} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[13px] font-bold text-[#DC2626]">
                          &ldquo;{r.claim}&rdquo;
                        </div>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--espresso)]">
                          {r.rebuttal}
                        </p>
                      </div>
                      <CopyButton value={r.rebuttal} />
                    </div>
                  </Card>
                ))}
              </Group>

              <Group title="Punchlines">
                {pack.debate.punchlines.map((p, i) => (
                  <Row key={p + i} copy={p}>
                    <span className="text-[15px] font-semibold text-[var(--espresso)]">
                      {p}
                    </span>
                  </Row>
                ))}
              </Group>

              <Group title="Segment structure">
                {pack.debate.structure.map((s, i) => (
                  <div
                    key={s + i}
                    className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-white px-4 py-3"
                  >
                    <span className="display text-[15px] text-[var(--orange)]">
                      {i + 1}
                    </span>
                    <span className="text-[14px] text-[var(--espresso)]">{s}</span>
                  </div>
                ))}
              </Group>

              {pack.debate.riskFlags.length > 0 && (
                <div className="rounded-xl border border-[#E8A317]/40 bg-[#FFF8E7] p-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B7791F]">
                    <AlertTriangle className="size-3.5" />
                    Risk flags
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {pack.debate.riskFlags.map((r, i) => (
                      <li key={r + i} className="text-[13px] text-[#7A5A15]">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* ---------------------------- THREADS ---------------------------- */}
          {tab === "threads" && (
            <>
              <Group title="Thread">
                {pack.threads.thread.map((t, i) => (
                  <div
                    key={t + i}
                    className="flex gap-3 rounded-xl border border-[var(--line)] bg-white px-4 py-3.5"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--cream-deep)] text-[11px] font-bold text-[var(--muted)]">
                      {i + 1}
                    </span>
                    <p className="flex-1 text-[14px] leading-relaxed text-[var(--espresso)]">
                      {t}
                    </p>
                    <CopyButton value={t} />
                  </div>
                ))}
              </Group>
              <Group title="Standalone posts">
                {pack.threads.tweets.map((t, i) => (
                  <Row key={t + i} copy={t}>
                    <span className="text-[14px] leading-relaxed text-[var(--espresso)]">
                      {t}
                    </span>
                  </Row>
                ))}
              </Group>
              <Group title="Quote tweet bait">
                {pack.threads.quoteTweets.map((t, i) => (
                  <Row key={t + i} copy={t}>
                    <span className="text-[14px] leading-relaxed text-[var(--espresso)]">
                      {t}
                    </span>
                  </Row>
                ))}
              </Group>
            </>
          )}

          {/* ----------------------------- CRYPTO ---------------------------- */}
          {tab === "crypto" && pack.crypto && (
            <>
              <Card className="bg-[var(--espresso)] p-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">
                  Hero headline
                </div>
                <p className="display mt-2 text-[26px] leading-tight text-[var(--cream)]">
                  {pack.crypto.heroHeadline}
                </p>
              </Card>

              <div className="grid gap-5 sm:grid-cols-2">
                <Group title="Names">
                  {pack.crypto.names.map((n, i) => (
                    <Row key={n + i} copy={n}>
                      <span className="text-[15px] font-bold text-[var(--espresso)]">
                        {n}
                      </span>
                    </Row>
                  ))}
                </Group>
                <Group title="Tickers">
                  {pack.crypto.tickers.map((t, i) => (
                    <Row key={t + i} copy={`$${t}`}>
                      <span className="display text-[16px] text-[var(--orange)]">
                        ${t}
                      </span>
                    </Row>
                  ))}
                </Group>
              </div>

              <Group title="Taglines">
                {pack.crypto.taglines.map((t, i) => (
                  <Row key={t + i} copy={t}>
                    <span className="text-[14px] text-[var(--espresso)]">{t}</span>
                  </Row>
                ))}
              </Group>

              <Group title="Launch tweets">
                {pack.crypto.launchTweets.map((t, i) => (
                  <Row key={t + i} copy={t}>
                    <span className="text-[14px] leading-relaxed text-[var(--espresso)]">
                      {t}
                    </span>
                  </Row>
                ))}
              </Group>

              <Group title="Founder bio options">
                {pack.crypto.founderBios.map((t, i) => (
                  <Row key={t + i} copy={t}>
                    <span className="text-[14px] text-[var(--espresso)]">{t}</span>
                  </Row>
                ))}
              </Group>

              <Group title="Meme concepts">
                {pack.crypto.memeIdeas.map((t, i) => (
                  <Row key={t + i} copy={t}>
                    <span className="text-[14px] text-[var(--espresso)]">{t}</span>
                  </Row>
                ))}
              </Group>

              <Group title="Landing page copy">
                {pack.crypto.landingCopy.map((c, i) => (
                  <Card key={c.heading + i} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[15px] font-bold text-[var(--espresso)]">
                          {c.heading}
                        </div>
                        <p className="mt-1 text-[14px] leading-relaxed text-[var(--espresso-soft)]">
                          {c.body}
                        </p>
                      </div>
                      <CopyButton value={`${c.heading}\n${c.body}`} />
                    </div>
                  </Card>
                ))}
              </Group>

              <Group title="Button copy">
                <div className="flex flex-wrap gap-2">
                  {pack.crypto.ctas.map((c, i) => (
                    <span
                      key={c + i}
                      className="rounded-full bg-[var(--orange)] px-4 py-2 text-[13px] font-bold text-white"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Group>
            </>
          )}

          {/* ------------------------------ SCORE ---------------------------- */}
          {tab === "score" && (
            <div className="grid gap-5 md:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                      Overall
                    </div>
                    <div className="display text-[56px] leading-none text-[var(--espresso)]">
                      {pack.score.overall}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-bold",
                      pack.score.overall >= 70
                        ? "bg-[#0F9D58]/10 text-[#0F9D58]"
                        : pack.score.overall >= 50
                          ? "bg-[#E8A317]/12 text-[#B7791F]"
                          : "bg-[#DC2626]/10 text-[#DC2626]",
                    )}
                  >
                    {pack.score.overall >= 70
                      ? "Worth shooting"
                      : pack.score.overall >= 50
                        ? "Needs a sharper angle"
                        : "Rework it"}
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  <Meter label="Clickability" value={pack.score.clickability} />
                  <Meter label="Clarity" value={pack.score.clarity} />
                  <Meter label="Emotional intensity" value={pack.score.emotion} />
                  <Meter label="Controversy" value={pack.score.controversy} />
                  <Meter label="Novelty" value={pack.score.novelty} />
                  <Meter
                    label="Fact check risk"
                    value={pack.score.factCheckRisk}
                    invert
                  />
                </div>
              </Card>

              <div className="space-y-4">
                <Card className="p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0F9D58]">
                    Why this works
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--espresso)]">
                    {pack.score.whyItWorks}
                  </p>
                </Card>
                <Card className="border-[var(--orange)]/30 bg-[var(--orange-soft)] p-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--orange-deep)]">
                    Why this may flop
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--espresso)]">
                    {pack.score.whyItMayFlop}
                  </p>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {locked && (
        <Card className="mt-6 flex flex-wrap items-center justify-between gap-4 border-[var(--orange)]/30 bg-[var(--orange-soft)] p-5">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 size-4 shrink-0 text-[var(--orange-deep)]" />
            <div>
              <div className="text-[14px] font-bold text-[var(--espresso)]">
Watermarked on the free plan
              </div>
              <p className="text-[13px] text-[var(--espresso-soft)]">
                Free plan renders carry a small watermark. Upgrade to export
                clean files, share packs publicly and raise your limits.
              </p>
            </div>
          </div>
          <a href="/app/billing">
            <Button size="sm">See plans</Button>
          </a>
        </Card>
      )}
    </div>
  );
}
