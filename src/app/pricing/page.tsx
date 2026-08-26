import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { clerkEnabled } from "@/lib/auth";
import { Footer } from "@/components/site/footer";
import { Pricing, Faq, FinalCta } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three plans for creators who publish. Starter at $20, Pro at $50, Premium at $99, paid in ETH. Free to start.",
};

export default function PricingPage() {
  return (
    <>
      <Nav authEnabled={clerkEnabled} />
      <main className="pt-8">
        <Pricing compact />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
