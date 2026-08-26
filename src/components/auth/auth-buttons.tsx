"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui";

/** Renders Clerk controls when configured. Falls back to a plain CTA otherwise. */
export function AuthControls({
  enabled,
  compact = false,
}: {
  enabled: boolean;
  compact?: boolean;
}) {
  if (!enabled) {
    return (
      <Link href="/app">
        <Button size="sm">Try for free</Button>
      </Link>
    );
  }

  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button size="sm">{compact ? "Sign up" : "Sign up free"}</Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }} />
      </Show>
    </>
  );
}
