import { NextResponse } from "next/server";
import { getOpenAI, hasOpenAI, parseJson, TEXT_MODEL } from "@/lib/openai";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { fallbackPack } from "@/lib/fallback";
import { shortId } from "@/lib/utils";
import { cleanDeep } from "@/lib/sanitize";
import type { ContentPack, GenerateRequest, Intensity, Mode, Tone } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODES: Mode[] = ["creator", "debate", "crypto"];
const TONES: Tone[] = ["punchy", "analytical", "unhinged", "warm", "deadpan", "founder"];
const INTENSITIES: Intensity[] = ["safe", "balanced", "spicy"];

/** Lightweight in-memory throttle. SWAP POINT: replace with Redis/Upstash in prod. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

function throttled(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (throttled(ip)) {
    return NextResponse.json(
      { error: "Slow down a moment, you are generating very fast." },
      { status: 429 },
    );
  }

  let body: Partial<GenerateRequest>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = (body.input ?? "").toString().trim();
  if (input.length < 8) {
    return NextResponse.json(
      { error: "Give me a bit more to work with. At least a sentence." },
      { status: 400 },
    );
  }

  const request: GenerateRequest = {
    input: input.slice(0, 12000),
    mode: MODES.includes(body.mode as Mode) ? (body.mode as Mode) : "creator",
    tone: TONES.includes(body.tone as Tone) ? (body.tone as Tone) : "punchy",
    intensity: INTENSITIES.includes(body.intensity as Intensity)
      ? (body.intensity as Intensity)
      : "balanced",
    audience: body.audience?.toString().slice(0, 200),
    refine: body.refine,
  };

  if (!hasOpenAI()) {
    return NextResponse.json({ pack: fallbackPack(request), demo: true });
  }

  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: TEXT_MODEL,
      temperature: request.intensity === "spicy" ? 1.0 : 0.85,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(request) },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const parsed = parseJson<Omit<ContentPack, "id" | "createdAt" | "mode" | "tone" | "intensity" | "input">>(raw);

    const pack: ContentPack = {
      id: shortId(),
      createdAt: new Date().toISOString(),
      mode: request.mode,
      tone: request.tone,
      intensity: request.intensity,
      input: request.input,
      summary: parsed.summary ?? "",
      titles: parsed.titles ?? [],
      thumbnails: parsed.thumbnails ?? [],
      hooks: parsed.hooks ?? [],
      talkingPoints: parsed.talkingPoints ?? [],
      debate: parsed.debate ?? {
        for: [], against: [], rebuttals: [], punchlines: [], structure: [], riskFlags: [],
      },
      threads: parsed.threads ?? { tweets: [], quoteTweets: [], thread: [] },
      crypto: parsed.crypto,
      score: parsed.score ?? {
        clickability: 0, clarity: 0, emotion: 0, controversy: 0,
        novelty: 0, factCheckRisk: 0, overall: 0, whyItWorks: "", whyItMayFlop: "",
      },
    };

    return NextResponse.json({ pack: cleanDeep(pack) });
  } catch (err) {
    console.error("[dinol] generate failed", err);
    return NextResponse.json({ pack: fallbackPack(request), demo: true, degraded: true });
  }
}
