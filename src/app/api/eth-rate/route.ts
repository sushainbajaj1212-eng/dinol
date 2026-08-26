import { NextResponse } from "next/server";
import { FALLBACK_ETH_USD } from "@/lib/payments";

export const runtime = "nodejs";
// Price moves slowly enough that a minute of cache is fine and keeps us well
// inside the public API's rate limit.
export const revalidate = 60;

export async function GET() {
  try {
    const res = await fetch(
      "https://api.coinbase.com/v2/prices/ETH-USD/spot",
      { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const price = Number(data?.data?.amount);
    if (!Number.isFinite(price) || price <= 0) throw new Error("bad price");
    return NextResponse.json({ ethUsd: price, source: "coinbase" });
  } catch {
    return NextResponse.json({ ethUsd: FALLBACK_ETH_USD, source: "fallback" });
  }
}
