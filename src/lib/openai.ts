import OpenAI from "openai";

/**
 * SWAP POINT: model selection.
 * Text  -> DINOL_TEXT_MODEL  (default gpt-4.1-mini, cheap + fast + good at JSON)
 * Image -> DINOL_IMAGE_MODEL (default gpt-image-1)
 */
export const TEXT_MODEL = process.env.DINOL_TEXT_MODEL || "gpt-4.1-mini";
export const IMAGE_MODEL = process.env.DINOL_IMAGE_MODEL || "gpt-image-1";

let client: OpenAI | null = null;

export function hasOpenAI() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getOpenAI(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

/** Strips accidental markdown fences and parses JSON defensively. */
export function parseJson<T>(raw: string): T {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  }
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first > 0 || last < text.length - 1) {
    text = text.slice(first, last + 1);
  }
  return JSON.parse(text) as T;
}
