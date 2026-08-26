"use client";

import * as React from "react";
import Link from "next/link";
import { Trash2, Inbox } from "lucide-react";
import { Button, Card, Eyebrow } from "@/components/ui";
import { PackView } from "./pack-view";
import { clearHistory, getHistory, getSaved } from "@/lib/store";
import type { ContentPack } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PackList({
  source,
  title,
  blurb,
}: {
  source: "history" | "saved";
  title: string;
  blurb: string;
}) {
  const [packs, setPacks] = React.useState<ContentPack[] | null>(null);
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const list = source === "history" ? getHistory() : getSaved();
    setPacks(list);
    setActive(list[0]?.id ?? null);
  }, [source]);

  const current = packs?.find((p) => p.id === active) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>{source === "history" ? "Recent" : "Library"}</Eyebrow>
          <h1 className="display mt-2 text-[34px]">{title}</h1>
          <p className="mt-2 max-w-lg text-[15px] text-[var(--espresso-soft)]">
            {blurb}
          </p>
        </div>
        {source === "history" && packs && packs.length > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              clearHistory();
              setPacks([]);
              setActive(null);
            }}
          >
            <Trash2 className="size-3.5" />
            Clear history
          </Button>
        )}
      </div>

      {packs === null ? (
        <Card className="mt-8 p-10 text-center text-[var(--muted)]">Loading...</Card>
      ) : packs.length === 0 ? (
        <Card className="mt-8 flex min-h-[320px] flex-col items-center justify-center p-10 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[var(--cream-deep)]">
            <Inbox className="size-6 text-[var(--muted)]" />
          </div>
          <h2 className="display mt-5 text-[22px]">Nothing here yet</h2>
          <p className="mt-2 max-w-sm text-[14px] text-[var(--espresso-soft)]">
            {source === "history"
              ? "Packs you generate as a guest are kept in this browser. Generate one and it shows up here."
              : "Hit save on a pack in the studio and it lands in your library."}
          </p>
          <Link href="/app" className="mt-6">
            <Button>Open the studio</Button>
          </Link>
        </Card>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          <div className="space-y-2 lg:sticky lg:top-24">
            {packs.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={cn(
                  "w-full rounded-xl border p-3.5 text-left transition-all",
                  active === p.id
                    ? "border-[var(--orange)] bg-[var(--orange-soft)]"
                    : "border-[var(--line)] bg-white hover:border-[var(--espresso)]/25",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[var(--muted)]">
                    {p.mode}
                  </span>
                  <span className="text-[11px] text-[var(--muted)]">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-snug text-[var(--espresso)]">
                  {p.input}
                </p>
              </button>
            ))}
          </div>

          <div>{current && <PackView pack={current} locked />}</div>
        </div>
      )}
    </div>
  );
}
