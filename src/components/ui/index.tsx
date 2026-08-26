"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, ChevronDown } from "lucide-react";

/* ---------------------------------- Button --------------------------------- */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] whitespace-nowrap",
        variant === "primary" &&
          "bg-[var(--orange)] text-white hover:bg-[var(--orange-deep)] shadow-[0_8px_20px_-8px_rgba(255,90,31,0.9)]",
        variant === "secondary" &&
          "bg-white text-[var(--espresso)] border border-[var(--line)] hover:border-[var(--espresso)] shadow-soft",
        variant === "ghost" &&
          "text-[var(--espresso-soft)] hover:text-[var(--espresso)] hover:bg-[var(--cream-deep)]",
        variant === "dark" &&
          "bg-[var(--espresso)] text-[var(--cream)] hover:bg-black",
        size === "sm" && "text-[13px] px-4 h-9",
        size === "md" && "text-sm px-5 h-11",
        size === "lg" && "text-base px-7 h-13 min-h-[52px]",
        className,
      )}
      {...props}
    />
  );
}

/* ----------------------------------- Card ---------------------------------- */

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-soft",
        className,
      )}
      {...props}
    />
  );
}

/* ----------------------------------- Pill ---------------------------------- */

export function Pill({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--espresso-soft)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------- Eyebrow --------------------------------- */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--orange)]">
      {children}
    </div>
  );
}

/* -------------------------------- CopyButton ------------------------------- */

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${label ?? "to clipboard"}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--cream-deep)] hover:text-[var(--espresso)]",
        copied && "text-[var(--orange)]",
        className,
      )}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {label ? <span>{copied ? "Copied" : label}</span> : null}
    </button>
  );
}

/* -------------------------------- Accordion -------------------------------- */

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-white overflow-hidden shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-[var(--cream)]"
            >
              <span className="text-[15px] font-semibold text-[var(--espresso)]">
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-[var(--muted)] transition-transform duration-300",
                  isOpen && "rotate-180 text-[var(--orange)]",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-[var(--espresso-soft)]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------- Meter ---------------------------------- */

export function Meter({
  label,
  value,
  invert = false,
}: {
  label: string;
  value: number;
  invert?: boolean;
}) {
  const good = invert ? value < 40 : value >= 70;
  const mid = invert ? value < 65 : value >= 45;
  const color = good ? "#0F9D58" : mid ? "#E8A317" : "#DC2626";
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-[var(--espresso-soft)]">
          {label}
        </span>
        <span className="text-[13px] font-bold tabular-nums" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--cream-deep)]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.max(2, Math.min(100, value))}%`, background: color }}
        />
      </div>
    </div>
  );
}
