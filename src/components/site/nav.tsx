"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { AuthControls } from "@/components/auth/auth-buttons";

const LINKS = [
  { href: "/#features", label: "Product" },
  { href: "/examples", label: "Examples" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Founder" },
  { href: "/faq", label: "FAQ" },
];

export function Nav({ authEnabled = false }: { authEnabled?: boolean }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--line)] bg-[var(--cream)]/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="DINOL home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-[14px] font-medium text-[var(--espresso-soft)] transition-colors hover:bg-[var(--cream-deep)] hover:text-[var(--espresso)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/app">
            <Button variant="ghost" size="sm">
              Open studio
            </Button>
          </Link>
          <AuthControls enabled={authEnabled} />
        </div>

        <button
          className="md:hidden rounded-lg p-2 text-[var(--espresso)]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--cream)] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-[var(--espresso-soft)]"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/app" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full">Open the studio</Button>
            </Link>
            {authEnabled && (
              <div className="mt-2 flex gap-2">
                <Link href="/sign-in" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up" className="flex-1" onClick={() => setOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
