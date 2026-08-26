"use client";

import * as React from "react";
import { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { Check, Loader2, ShieldCheck, ExternalLink, CircleAlert } from "lucide-react";
import { Button, Card, CopyButton, Eyebrow, Pill } from "@/components/ui";
import { PLANS } from "@/data/site";
import {
  CHAIN,
  ETH_RECEIVER,
  FALLBACK_ETH_USD,
  formatEth,
  isTxHash,
  paymentUri,
  usdToEth,
} from "@/lib/payments";
import { cn } from "@/lib/utils";

function Billing() {
  const params = useSearchParams();
  const [selected, setSelected] = React.useState(params.get("plan") ?? "pro");
  const [ethUsd, setEthUsd] = React.useState<number | null>(null);
  const [rateSource, setRateSource] = React.useState<string>("");
  const [qr, setQr] = React.useState<string | null>(null);
  const [txHash, setTxHash] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const plan = PLANS.find((p) => p.id === selected)!;
  const rate = ethUsd ?? FALLBACK_ETH_USD;
  const amountEth = usdToEth(plan.price, rate);
  const uri = paymentUri(amountEth);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/eth-rate")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setEthUsd(d.ethUsd);
        setRateSource(d.source);
      })
      .catch(() => setEthUsd(FALLBACK_ETH_USD));
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    QRCode.toDataURL(uri, {
      margin: 1,
      width: 480,
      color: { dark: "#23140C", light: "#FFFFFF" },
    })
      .then(setQr)
      .catch(() => setQr(null));
  }, [uri]);

  async function submit() {
    if (!isTxHash(txHash)) {
      setError("Paste the transaction hash. It starts with 0x and is 66 characters long.");
      return;
    }
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash, plan: plan.id, amountEth }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Could not record that payment.");
      else setResult(data.message);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Eyebrow>Billing</Eyebrow>
      <h1 className="display mt-2 text-[34px]">Pay in ETH</h1>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[var(--espresso-soft)]">
        DINOL takes payment in Ethereum only. Send the exact amount to the
        address below from any wallet, then paste the transaction hash to
        activate your plan. No card, no processor, no account number.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_400px] lg:items-start">
        {/* ----------------------------- plan picker ----------------------------- */}
        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            {PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={cn(
                  "rounded-2xl border bg-white p-5 text-left transition-all",
                  selected === p.id
                    ? "border-[var(--orange)] shadow-lift ring-1 ring-[var(--orange)]"
                    : "border-[var(--line)] shadow-soft hover:-translate-y-0.5",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[var(--espresso)]">
                    {p.name}
                  </span>
                  {p.featured && (
                    <span className="rounded-full bg-[var(--orange-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--orange-deep)]">
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="display text-[30px] text-[var(--espresso)]">
                    ${p.price}
                  </span>
                  <span className="text-[12px] text-[var(--muted)]">/mo</span>
                </div>
                <div className="mt-1 text-[12px] font-semibold text-[var(--orange)]">
                  {ethUsd === null ? "..." : `${formatEth(usdToEth(p.price, rate))} ETH`}
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
                  {p.blurb}
                </p>
              </button>
            ))}
          </div>

          <Card className="mt-5 p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              What {plan.name} includes
            </div>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[13px] text-[var(--espresso-soft)]"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--orange)]" />
                  {f}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="mt-5 border-[#E8A317]/40 bg-[#FFF8E7] p-5">
            <div className="flex items-start gap-3">
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-[#B7791F]" />
              <div className="text-[13px] leading-relaxed text-[#7A5A15]">
                <strong>Send on Ethereum mainnet only.</strong> Funds sent on
                another network, or from an exchange account that does not let
                you control the sending address, may be unrecoverable. The
                quoted ETH amount is based on the rate at the moment you pay.
              </div>
            </div>
          </Card>
        </div>

        {/* ------------------------------ checkout ------------------------------ */}
        <Card className="p-6 lg:sticky lg:top-24">
          <div className="flex items-baseline justify-between">
            <span className="text-[16px] font-bold text-[var(--espresso)]">
              {plan.name}
            </span>
            <span className="text-[13px] text-[var(--muted)]">
              ${plan.price} / month
            </span>
          </div>

          <div className="mt-4 rounded-2xl bg-[var(--espresso)] p-5 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">
              Amount due
            </div>
            <div className="display mt-1 text-[38px] leading-none text-[var(--cream)]">
              {ethUsd === null ? (
                <Loader2 className="mx-auto size-7 animate-spin" />
              ) : (
                <>
                  {formatEth(amountEth)}{" "}
                  <span className="text-[22px] text-[var(--orange)]">ETH</span>
                </>
              )}
            </div>
            <div className="mt-2 text-[11px] text-[var(--cream)]/55">
              at ${rate.toLocaleString()} per ETH
              {rateSource === "fallback" && " (cached rate)"}
            </div>
          </div>

          {qr && (
            <div className="mt-4 flex justify-center">
              <div className="rounded-2xl border border-[var(--line)] bg-white p-3">
                <Image
                  src={qr}
                  alt="Scan to pay in ETH"
                  width={168}
                  height={168}
                  unoptimized
                />
              </div>
            </div>
          )}

          <div className="mt-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              Send to · {CHAIN.name}
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--cream)] p-3">
              <code className="min-w-0 flex-1 break-all text-[11px] leading-relaxed text-[var(--espresso)]">
                {ETH_RECEIVER}
              </code>
              <CopyButton value={ETH_RECEIVER} />
            </div>
            <a
              href={`https://etherscan.io/address/${ETH_RECEIVER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--muted)] hover:text-[var(--orange)]"
            >
              View on Etherscan <ExternalLink className="size-3" />
            </a>
          </div>

          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              Confirm your payment
            </div>
            <input
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="0x transaction hash"
              spellCheck={false}
              className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--cream)]/50 px-3.5 py-2.5 font-mono text-[12px] text-[var(--espresso)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--orange)] focus:bg-white"
            />
            <Button
              className="mt-3 w-full"
              size="lg"
              disabled={submitting}
              onClick={submit}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Checking
                </>
              ) : (
                "Activate plan"
              )}
            </Button>

            {error && (
              <p className="mt-3 rounded-xl border border-[#DC2626]/30 bg-[#FEF2F2] p-3 text-[12px] leading-relaxed text-[#991B1B]">
                {error}
              </p>
            )}
            {result && (
              <p className="mt-3 rounded-xl border border-[#0F9D58]/30 bg-[#F0FBF4] p-3 text-[12px] leading-relaxed text-[#0B6B3E]">
                {result}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            <Pill>
              <ShieldCheck className="size-3 text-[var(--orange)]" />
              Self custody
            </Pill>
            <Pill>No card details</Pill>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-[var(--muted)]">Loading...</div>
      }
    >
      <Billing />
    </Suspense>
  );
}
