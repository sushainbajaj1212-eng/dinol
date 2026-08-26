"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { AuthControls } from "@/components/auth/auth-buttons";

const TABS = [
  { href: "/app", label: "Studio" },
  { href: "/app/history", label: "History" },
  { href: "/app/saved", label: "Saved" },
  { href: "/app/billing", label: "Billing" },
  { href: "/app/settings", label: "Settings" },
];

export function AppShell({
  children,
  authEnabled = false,
}: {
  children: React.ReactNode;
  authEnabled?: boolean;
}) {
  const path = usePathname();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--cream)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="DINOL home">
              <Logo />
            </Link>
            <nav className="no-scrollbar hidden items-center gap-1 overflow-x-auto sm:flex">
              {TABS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors",
                    path === t.href
                      ? "bg-[var(--espresso)] text-[var(--cream)]"
                      : "text-[var(--espresso-soft)] hover:bg-[var(--cream-deep)]",
                  )}
                >
                  {t.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/app/billing">
              <Button variant="ghost" size="sm">
                Upgrade
              </Button>
            </Link>
            <AuthControls enabled={authEnabled} compact />
          </div>
        </div>
        <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-[var(--line)] px-5 py-2 sm:hidden">
          {TABS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold",
                path === t.href
                  ? "bg-[var(--espresso)] text-[var(--cream)]"
                  : "text-[var(--espresso-soft)]",
              )}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
