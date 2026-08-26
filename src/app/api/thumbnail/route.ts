import { NextResponse } from "next/server";
import { getOpenAI, hasOpenAI, IMAGE_MODEL } from "@/lib/openai";
import { buildImagePrompt } from "@/lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  let body: { concept?: string; style?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const concept = (body.concept ?? "").toString().trim();
  if (!concept) {
    return NextResponse.json({ error: "Missing thumbnail concept." }, { status: 400 });
  }

  if (!hasOpenAI()) {
    return NextResponse.json(
      { error: "Image rendering needs an OPENAI_API_KEY on the server." },
      { status: 503 },
    );
  }

  try {
    const openai = getOpenAI();
    const result = await openai.images.generate({
      model: IMAGE_MODEL,
      prompt: buildImagePrompt(concept, (body.style ?? "photoreal").toString()),
      size: "1536x1024",
      quality: "medium",
      n: 1,
    });

    const b64 = result.data?.[0]?.b64_json;
    const url = result.data?.[0]?.url;
    if (b64) {
      return NextResponse.json({ image: `data:image/png;base64,${b64}` });
    }
    if (url) {
      return NextResponse.json({ image: url });
    }
    return NextResponse.json({ error: "No image returned." }, { status: 502 });
  } catch (err) {
    console.error("[dinol] thumbnail failed", err);
    const message =
      err instanceof Error && /verif/i.test(err.message)
        ? "Your OpenAI organization needs verification before it can use image generation."
        : "Thumbnail rendering failed. Try again in a moment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
