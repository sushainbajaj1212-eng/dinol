import { cn } from "@/lib/utils";

export function DinolMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" fill="none" className={cn("size-7", className)} aria-hidden>
      <rect width="512" height="512" rx="118" fill="var(--espresso)" />
      <g transform="translate(-22,2)">
  <path d="M196 186 L204 142 L238 178 Z" fill="var(--orange)"/>
  <path d="M256 168 L272 128 L296 176 Z" fill="var(--orange)"/>
  <path d="M124 352
           L150 292
           C130 218 196 166 270 166
           C324 166 366 190 388 214
           L426 230
           C438 240 436 256 422 260
           L300 266
           L322 300
           L422 296
           C428 312 416 328 396 330
           L214 336
           L196 352
           Z"
        fill="var(--orange)"/>
  <circle cx="352" cy="228" r="16" fill="var(--cream)"/>
  <circle cx="410" cy="242" r="6" fill="var(--espresso)" opacity="0.45"/>
</g>
    </svg>
  );
}

export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <DinolMark />
      <span
        className={cn(
          "display text-[19px] tracking-[-0.02em]",
          invert ? "text-[var(--cream)]" : "text-[var(--espresso)]",
        )}
      >
        DINOL
      </span>
    </span>
  );
}
