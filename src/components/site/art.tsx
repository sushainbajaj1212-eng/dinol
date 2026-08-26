/**
 * Hand-authored brand illustrations. Vector rather than generated images so
 * they stay crisp, weigh nothing, and inherit the DINOL palette.
 */

const O = "var(--orange)";
const E = "var(--espresso)";
const C = "var(--cream)";
const L = "var(--line)";

/* ------------------------------- Titles art ------------------------------- */

export function ArtTitles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 130" className={className} aria-hidden>
      <rect x="10" y="16" width="180" height="26" rx="10" fill="#fff" stroke={L} />
      <rect x="22" y="26" width="118" height="7" rx="3.5" fill={O} />
      <rect x="156" y="25" width="22" height="9" rx="4.5" fill="var(--orange-soft)" />
      <rect x="10" y="52" width="180" height="26" rx="10" fill="#fff" stroke={L} />
      <rect x="22" y="62" width="92" height="7" rx="3.5" fill="#E4D9C9" />
      <rect x="156" y="61" width="22" height="9" rx="4.5" fill="var(--cream-deep)" />
      <rect x="10" y="88" width="180" height="26" rx="10" fill="#fff" stroke={L} />
      <rect x="22" y="98" width="130" height="7" rx="3.5" fill="#E4D9C9" />
    </svg>
  );
}

/* ----------------------------- Thumbnails art ----------------------------- */

export function ArtThumbnails({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 130" className={className} aria-hidden>
      <g transform="rotate(-6 60 70)">
        <rect x="12" y="34" width="96" height="60" rx="10" fill={E} />
        <circle cx="42" cy="60" r="9" fill={O} />
        <rect x="24" y="76" width="52" height="6" rx="3" fill={C} opacity=".8" />
      </g>
      <g transform="rotate(5 140 66)">
        <rect x="96" y="26" width="96" height="60" rx="10" fill="#fff" stroke={L} />
        <rect x="96" y="26" width="96" height="34" rx="10" fill="var(--orange-soft)" />
        <rect x="108" y="66" width="46" height="6" rx="3" fill={O} />
        <rect x="108" y="76" width="66" height="5" rx="2.5" fill="#E4D9C9" />
      </g>
    </svg>
  );
}

/* ------------------------------- Debate art ------------------------------- */

export function ArtDebate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 130" className={className} aria-hidden>
      <path d="M14 24h72a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8H40l-14 14V74h-12a8 8 0 0 1-8-8V32a8 8 0 0 1 8-8Z" fill={O} />
      <rect x="24" y="40" width="46" height="6" rx="3" fill="#fff" opacity=".85" />
      <rect x="24" y="54" width="32" height="6" rx="3" fill="#fff" opacity=".55" />
      <path d="M186 44h-72a8 8 0 0 0-8 8v34a8 8 0 0 0 8 8h46l14 14V94h12a8 8 0 0 0 8-8V52a8 8 0 0 0-8-8Z" fill="#fff" stroke={L} />
      <rect x="120" y="60" width="46" height="6" rx="3" fill="#E4D9C9" />
      <rect x="120" y="74" width="30" height="6" rx="3" fill="#E4D9C9" />
    </svg>
  );
}

/* ------------------------------- Hooks art -------------------------------- */

export function ArtHooks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 130" className={className} aria-hidden>
      <rect x="66" y="12" width="68" height="106" rx="14" fill={E} />
      <rect x="72" y="18" width="56" height="94" rx="10" fill="var(--cream-deep)" />
      <path d="M92 44l24 15-24 15V44Z" fill={O} />
      <rect x="80" y="86" width="40" height="5" rx="2.5" fill="#D9CBB8" />
      <rect x="86" y="96" width="28" height="5" rx="2.5" fill="#D9CBB8" />
      <path d="M32 40c-8 8-8 42 0 50" stroke={O} strokeWidth="5" strokeLinecap="round" fill="none" opacity=".5" />
      <path d="M48 52c-4 4-4 22 0 26" stroke={O} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M168 40c8 8 8 42 0 50" stroke={O} strokeWidth="5" strokeLinecap="round" fill="none" opacity=".5" />
      <path d="M152 52c4 4 4 22 0 26" stroke={O} strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ------------------------------- Crypto art ------------------------------- */

export function ArtCrypto({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 130" className={className} aria-hidden>
      <circle cx="100" cy="65" r="42" fill={E} />
      <path d="M100 34 L118 66 L100 78 L82 66 Z" fill={O} />
      <path d="M100 84 L118 72 L100 98 L82 72 Z" fill={O} opacity=".65" />
      <circle cx="42" cy="34" r="12" fill="var(--orange-soft)" />
      <circle cx="164" cy="98" r="16" fill="var(--orange-soft)" />
      <circle cx="158" cy="30" r="7" fill={O} opacity=".35" />
    </svg>
  );
}

/* ------------------------------- Score art -------------------------------- */

export function ArtScore({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 130" className={className} aria-hidden>
      <path d="M24 96a56 56 0 0 1 152 0" fill="none" stroke="var(--cream-deep)" strokeWidth="16" strokeLinecap="round" />
      <path d="M24 96a56 56 0 0 1 92-53" fill="none" stroke={O} strokeWidth="16" strokeLinecap="round" />
      <circle cx="100" cy="96" r="8" fill={E} />
      <path d="M100 96 L136 56" stroke={E} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

/* ----------------------------- Mode glyph set ----------------------------- */

export function GlyphCreator({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="6" y="14" width="42" height="30" rx="8" fill={O} />
      <path d="M48 26l12-7v26l-12-7v-12Z" fill={E} />
      <circle cx="18" cy="54" r="4" fill={E} opacity=".3" />
      <circle cx="32" cy="54" r="4" fill={E} opacity=".3" />
    </svg>
  );
}

export function GlyphDebate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M8 12h28v22H20l-8 8v-8H8V12Z" fill={O} />
      <path d="M56 26H32v22h12l8 8v-8h4V26Z" fill={E} />
    </svg>
  );
}

export function GlyphCrypto({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="24" fill={E} />
      <path d="M32 14 L44 34 L32 41 L20 34 Z" fill={O} />
      <path d="M32 45 L44 38 L32 52 L20 38 Z" fill={O} opacity=".6" />
    </svg>
  );
}

/* --------------------------- Decorative elements -------------------------- */

/** Soft blurred blob used behind section headings. */
export function Blob({
  className,
  color = "var(--orange)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: `radial-gradient(circle, ${color}, transparent 68%)`,
      }}
      aria-hidden
    />
  );
}

/** Thin ticker-style divider with the brand mark repeated. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 12" className={className} fill="none" aria-hidden>
      <path
        d="M0 6c10-8 20 8 30 0s20 8 30 0 20 8 30 0 20 8 30 0 20 8 30 0 20 8 30 0 20 8 30 0"
        stroke={O}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity=".45"
      />
    </svg>
  );
}
