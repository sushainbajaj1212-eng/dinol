import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { clerkEnabled } from "@/lib/auth";
import { Footer } from "@/components/site/footer";
import { Faq, FinalCta } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How credits work, what happens to your inputs, who owns the output, and whether the virality score means anything.",
};

export default function FaqPage() {
  return (
    <>
      <Nav authEnabled={clerkEnabled} />
      <main className="pt-8">
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
