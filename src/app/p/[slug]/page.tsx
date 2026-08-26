import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/nav";
import { clerkEnabled } from "@/lib/auth";
import { Footer } from "@/components/site/footer";
import { PackView } from "@/components/app/pack-view";
import { Button, Pill, Eyebrow } from "@/components/ui";
import { EXAMPLES, getExample } from "@/lib/examples";

export function generateStaticParams() {
  return EXAMPLES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pack = getExample(slug);
  if (!pack) return { title: "Pack not found" };
  return {
    title: pack.label,
    description: pack.summary,
    openGraph: { title: `${pack.label} · DINOL`, description: pack.summary },
  };
}

export default async function SharedPackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pack = getExample(slug);
  if (!pack) notFound();

  return (
    <>
      <Nav authEnabled={clerkEnabled} />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <Eyebrow>Shared pack</Eyebrow>
        <h1 className="display mt-2 text-[36px] sm:text-[46px]">{pack.label}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Pill className="capitalize">{pack.mode} mode</Pill>
          <Pill className="capitalize">{pack.tone}</Pill>
          <Pill className="capitalize">{pack.intensity}</Pill>
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            The input
          </div>
          <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--espresso)]">
            {pack.input}
          </p>
        </div>

        <div className="mt-8">
          <PackView pack={pack} />
        </div>

        <div className="mt-12 rounded-3xl bg-[var(--espresso)] p-10 text-center">
          <h2 className="display text-[30px] text-[var(--cream)]">
            Make one of these from your own take
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-[var(--cream)]/75">
            Free to start. About twelve seconds per pack.
          </p>
          <Link href="/app" className="mt-7 inline-block">
            <Button size="lg">
              Open the studio <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
