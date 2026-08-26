"use client";

import type { ContentPack } from "./types";

/**
 * Guest persistence. Packs live in the browser until the user signs in,
 * at which point these can be migrated server side via Prisma.
 */
const HISTORY_KEY = "dinol.history.v1";
const SAVED_KEY = "dinol.saved.v1";
const USAGE_KEY = "dinol.usage.v1";

export const FREE_GUEST_PACKS = 3;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or private mode, ignore */
  }
}

export function getHistory(): ContentPack[] {
  return read<ContentPack[]>(HISTORY_KEY, []);
}

export function pushHistory(pack: ContentPack) {
  const next = [pack, ...getHistory().filter((p) => p.id !== pack.id)].slice(0, 40);
  write(HISTORY_KEY, next);
  return next;
}

export function clearHistory() {
  write(HISTORY_KEY, []);
}

export function getSaved(): ContentPack[] {
  return read<ContentPack[]>(SAVED_KEY, []);
}

export function toggleSaved(pack: ContentPack) {
  const current = getSaved();
  const exists = current.some((p) => p.id === pack.id);
  const next = exists
    ? current.filter((p) => p.id !== pack.id)
    : [pack, ...current].slice(0, 100);
  write(SAVED_KEY, next);
  return next;
}

export function isSaved(id: string) {
  return getSaved().some((p) => p.id === id);
}

export function getUsage(): number {
  return read<number>(USAGE_KEY, 0);
}

export function bumpUsage() {
  const next = getUsage() + 1;
  write(USAGE_KEY, next);
  return next;
}

export function remainingFree() {
  return Math.max(0, FREE_GUEST_PACKS - getUsage());
}
