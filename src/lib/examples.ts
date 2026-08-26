import raw from "@/data/examples.json";
import type { ContentPack } from "./types";

export type ExamplePack = ContentPack & { slug: string; label: string };

export const EXAMPLES = raw as unknown as ExamplePack[];

export function getExample(slug: string) {
  return EXAMPLES.find((e) => e.slug === slug) ?? null;
}
