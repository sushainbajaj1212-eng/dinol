import type { Metadata } from "next";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { Logo } from "@/components/site/logo";
import { clerkEnabled } from "@/lib/auth";
import { AuthDisabled } from "@/components/auth/disabled";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-16">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      {clerkEnabled ? (
        <SignIn signUpUrl="/sign-up" fallbackRedirectUrl="/app" />
      ) : (
        <AuthDisabled />
      )}
      <Link
        href="/examples"
        className="mt-8 text-[13px] font-semibold text-[var(--muted)] hover:text-[var(--orange)]"
      >
        Or read a full example pack first
      </Link>
    </div>
  );
}
