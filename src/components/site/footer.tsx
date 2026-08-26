import Link from "next/link";
import { Logo } from "./logo";
import { SITE, FOUNDER } from "@/data/site";

const COLS = [
  {
    title: "Product",
    links: [
      { href: "/app", label: "Studio" },
      { href: "/#templates", label: "Templates" },
      { href: "/examples", label: "Examples" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Modes",
    links: [
      { href: "/app?mode=creator", label: "Creator mode" },
      { href: "/app?mode=debate", label: "Debate mode" },
      { href: "/app?mode=crypto", label: "Crypto launch" },
      { href: "/#virality", label: "Virality score" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--cream-deep)]">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--espresso-soft)]">
              The AI hot take studio for creators, commentators and crypto
              founders. One idea in, a full content pack out.
            </p>
            <a
              href={FOUNDER.x}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--espresso)] transition-colors hover:text-[var(--orange)]"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Built by {FOUNDER.handle}
            </a>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--espresso-soft)] transition-colors hover:text-[var(--orange)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span>
            {SITE.domain} · Output is AI generated. Nothing here is financial
            advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
