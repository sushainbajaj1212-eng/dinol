import { Nav } from "@/components/site/nav";
import { clerkEnabled } from "@/lib/auth";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { ThumbnailGallery } from "@/components/site/gallery";
import {
  LiveShowcase,
  TitleMarquee,
  Comparison,
  StickyCta,
} from "@/components/site/showcase";
import {
  Features,
  Stats,
  Modes,
  Templates,
  HowItWorks,
  ThumbnailBand,
  ViralityBand,
  FounderSection,
  Testimonials,
  Pricing,
  Faq,
  FinalCta,
} from "@/components/site/sections";

export default function Home() {
  return (
    <>
      <Nav authEnabled={clerkEnabled} />
      <main>
        {/* 1. The promise */}
        <Hero />
        <TitleMarquee />

        {/* 2. Proof it is real, before any explanation */}
        <LiveShowcase />

        {/* 3. What you get, illustrated */}
        <Features />
        <Stats />

        {/* 4. How to point it */}
        <Modes />
        <HowItWorks />

        {/* 5. The two hero features, in depth */}
        <ThumbnailGallery />
        <ThumbnailBand />
        <ViralityBand />

        {/* 6. Shortcuts */}
        <Templates />

        {/* 7. Objection handling */}
        <Comparison />
        <Testimonials />

        {/* 8. Who made it */}
        <FounderSection />

        {/* 9. Convert */}
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
