/**
 * The model is told not to use em dashes or the banned cliches, and mostly
 * obeys. This is the belt-and-braces pass so a stray one never reaches a user.
 */
const REPLACEMENTS: [RegExp, string][] = [
  [/\s*[—–]\s*/g, ", "], // em and en dashes
  [/‘|’/g, "'"],
  [/“|”/g, '"'],
  [/\s{2,}/g, " "],
  [/\s+([,.!?;:])/g, "$1"],
  [/,\s*,/g, ","],
];

export function cleanText(value: string): string {
  let out = value;
  for (const [re, to] of REPLACEMENTS) out = out.replace(re, to);
  return out.trim();
}

/** Recursively cleans every string in an arbitrary JSON structure. */
export function cleanDeep<T>(value: T): T {
  if (typeof value === "string") return cleanText(value) as unknown as T;
  if (Array.isArray(value)) return value.map(cleanDeep) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = cleanDeep(v);
    return out as T;
  }
  return value;
}
