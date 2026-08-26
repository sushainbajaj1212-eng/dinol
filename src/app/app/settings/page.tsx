"use client";

import * as React from "react";
import { Button, Card, Eyebrow } from "@/components/ui";
import { TONES, INTENSITIES } from "@/data/site";
import { clearHistory } from "@/lib/store";
import { cn } from "@/lib/utils";

const KEY = "dinol.settings.v1";

export default function SettingsPage() {
  const [tone, setTone] = React.useState("punchy");
  const [intensity, setIntensity] = React.useState("balanced");
  const [voice, setVoice] = React.useState("");
  const [banned, setBanned] = React.useState("unlock, dive into, game-changer, revolutionize");
  const [savedNote, setSavedNote] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setTone(s.tone ?? "punchy");
        setIntensity(s.intensity ?? "balanced");
        setVoice(s.voice ?? "");
        setBanned(s.banned ?? banned);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function save() {
    localStorage.setItem(KEY, JSON.stringify({ tone, intensity, voice, banned }));
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 1800);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Eyebrow>Preferences</Eyebrow>
      <h1 className="display mt-2 text-[34px]">Settings</h1>
      <p className="mt-2 text-[15px] text-[var(--espresso-soft)]">
        Defaults for every new generation. Brand voice is a Pro feature and is
        stored locally until you sign in.
      </p>

      <Card className="mt-8 p-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
          Default tone
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
                  : "border border-[var(--line)] bg-white text-[var(--espresso-soft)]",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
          Default intensity
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {INTENSITIES.map((x) => (
            <button
              key={x.id}
              onClick={() => setIntensity(x.id)}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-left transition-all",
                intensity === x.id
                  ? "border-[var(--orange)] bg-[var(--orange-soft)]"
                  : "border-[var(--line)] bg-white",
              )}
            >
              <div className="text-[13px] font-bold text-[var(--espresso)]">{x.label}</div>
              <div className="text-[11px] text-[var(--muted)]">{x.hint}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Brand voice
          </span>
          <span className="rounded-full bg-[var(--orange-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--orange-deep)]">
            PRO
          </span>
        </div>
        <textarea
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          rows={4}
          placeholder="Describe how you sound. eg. dry, sceptical, allergic to hype, uses short sentences, never says 'guys'"
          className="mt-2 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--cream)]/50 p-3.5 text-[14px] outline-none focus:border-[var(--orange)] focus:bg-white"
        />

        <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
          Banned phrases
        </div>
        <input
          value={banned}
          onChange={(e) => setBanned(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--cream)]/50 px-3.5 py-2.5 text-[13px] outline-none focus:border-[var(--orange)] focus:bg-white"
        />

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={save}>Save preferences</Button>
          {savedNote && (
            <span className="text-[13px] font-semibold text-[#0F9D58]">Saved</span>
          )}
        </div>
      </Card>

      <Card className="mt-5 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <div className="text-[15px] font-bold text-[var(--espresso)]">Local data</div>
          <p className="text-[13px] text-[var(--espresso-soft)]">
            Clear the guest history stored in this browser.
          </p>
        </div>
        <Button variant="secondary" onClick={() => clearHistory()}>
          Clear history
        </Button>
      </Card>
    </div>
  );
}
