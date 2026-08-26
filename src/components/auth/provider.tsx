"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

/** DINOL brand styling applied to every Clerk surface. */
export function DinolClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#FF5A1F",
          colorForeground: "#23140C",
          colorBackground: "#FFFFFF",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
        },
        elements: {
          card: "shadow-lift border border-[var(--line)]",
          headerTitle: "font-bold tracking-tight",
          formButtonPrimary:
            "bg-[#FF5A1F] hover:bg-[#E0430C] text-white font-semibold normal-case",
          footerActionLink: "text-[#FF5A1F] hover:text-[#E0430C]",
          logoBox: "hidden",
          footer: "hidden",
          badge: "hidden",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
