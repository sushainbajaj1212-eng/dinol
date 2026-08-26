import { NextResponse } from "next/server";
import { ETH_RECEIVER, isTxHash } from "@/lib/payments";

export const runtime = "nodejs";

/**
 * Records a claimed ETH payment so it can be reconciled against the chain.
 *
 * SWAP POINT: this currently validates and logs. To go fully automatic, verify
 * the hash against an RPC provider (Alchemy, Infura, or a public node):
 *   1. eth_getTransactionByHash -> confirm `to` === ETH_RECEIVER
 *   2. confirm `value` >= the quoted wei for the plan
 *   3. eth_getTransactionReceipt -> confirm status 0x1 and enough confirmations
 *   4. then write the Subscription row via Prisma and grant the tier.
 */
export async function POST(req: Request) {
  let body: { txHash?: string; plan?: string; amountEth?: number; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const txHash = (body.txHash ?? "").trim();
  if (!isTxHash(txHash)) {
    return NextResponse.json(
      { error: "That does not look like an Ethereum transaction hash. It should start with 0x and be 66 characters long." },
      { status: 400 },
    );
  }

  const plan = (body.plan ?? "").toString().slice(0, 40);

  console.log("[dinol] payment claimed", {
    txHash,
    plan,
    amountEth: body.amountEth,
    receiver: ETH_RECEIVER,
    at: new Date().toISOString(),
  });

  return NextResponse.json({
    status: "pending_confirmation",
    txHash,
    plan,
    message:
      "Payment recorded. Access unlocks once the transaction has enough confirmations on Ethereum mainnet, usually within a few minutes.",
  });
}
