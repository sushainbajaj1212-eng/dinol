import { Nav } from "@/components/site/nav";
import { clerkEnabled } from "@/lib/auth";
import { Footer } from "@/components/site/footer";
import { Eyebrow } from "@/components/ui";

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <>
      <Nav authEnabled={clerkEnabled} />
      <main className="px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display mt-3 text-[40px] sm:text-[52px]">{title}</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">Last updated {updated}</p>

          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-[19px] font-bold text-[var(--espresso)]">{s.h}</h2>
                <div className="mt-3 space-y-3">
                  {s.p.map((para) => (
                    <p
                      key={para.slice(0, 20)}
                      className="text-[15px] leading-relaxed text-[var(--espresso-soft)]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
