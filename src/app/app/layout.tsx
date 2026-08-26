import type { Metadata } from "next";
import { AppShell } from "@/components/app/shell";
import { clerkEnabled } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Studio",
  description: "Generate a full content pack from one idea.",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell authEnabled={clerkEnabled}>{children}</AppShell>;
}
