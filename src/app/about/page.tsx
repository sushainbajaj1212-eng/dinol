import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { clerkEnabled } from "@/lib/auth";
import { Footer } from "@/components/site/footer";
import { FounderSection, FinalCta, Section, SectionHead } from "@/components/site/sections";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/site/reveal";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "DINOL is the AI hot take studio for opinion led creators, built by Tyson Hockley.",
};

const PRINCIPLES = [
  {
    t: "Show the work before the pitch",
    b: "Every example pack on this site is real output, readable in full without an account. You should be able to judge the product before you commit anything to it.",
  },
  {
    t: "Honest scoring, not flattery",
    b: "A tool that tells you every idea is a 94 is worthless. DINOL will tell you when the angle is tired and name the reason.",
  },
  {
    t: "Your voice, amplified",
    b: "Tone presets exist so the output sounds like you on your best day, not like a model averaging the internet.",
  },
  {
    t: "Speed is the feature",
    b: "The window on a take is hours, not weeks. Everything here is built to get you from idea to published in one sitting.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav authEnabled={clerkEnabled} />
      <main>
        <Section className="pb-0">
          <Reveal>
            <SectionHead
              eyebrow="About"
              title={<>Built for people who <span className="hl">post opinions</span></>}
              sub={`${SITE.name} exists because the gap between having a good take and publishing it is mostly logistics. Titles, thumbnails, hooks, threads. Necessary work, but not the thinking.`}
            />
          </Reveal>
        </Section>

        <FounderSection full />

        <Section className="bg-[var(--cream-deep)]">
          <Reveal>
            <SectionHead eyebrow="Principles" title="What we optimise for" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06}>
                <Card className="h-full p-6">
                  <h3 className="text-[18px] font-bold text-[var(--espresso)]">{p.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--espresso-soft)]">{p.b}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
