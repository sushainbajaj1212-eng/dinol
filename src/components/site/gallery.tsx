import Image from "next/image";
import { Reveal } from "./reveal";
import { EXAMPLES } from "@/lib/examples";

/**
 * Real thumbnails rendered by DINOL for the seeded example packs. These are
 * generated images, not stock art, so the landing page shows actual output.
 */
export function ThumbnailGallery() {
  const shots = EXAMPLES.flatMap((pack) =>
    pack.thumbnails
      .filter((t) => t.imageUrl)
      .map((t) => ({ ...t, packLabel: pack.label })),
  ).slice(0, 8);

  if (!shots.length) return null;

  return (
    <section className="overflow-hidden border-y border-[var(--line)] bg-[var(--cream-deep)] py-16">
      <Reveal>
        <div className="mx-auto mb-9 max-w-2xl px-5 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--orange)]">
            Rendered by DINOL
          </div>
          <h2 className="display mt-3 text-[32px] sm:text-[42px]">
            Real thumbnails, not mockups
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--espresso-soft)]">
            Every image below came out of the product, generated from the
            concept text in the pack beside it.
          </p>
        </div>
      </Reveal>

      <div className="relative">
        <div className="flex w-max animate-marquee gap-4 px-5">
          {[...shots, ...shots].map((s, i) => (
            <figure
              key={s.imageUrl! + i}
              className="relative w-[300px] shrink-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--espresso)] shadow-soft sm:w-[360px]"
            >
              <div className="relative aspect-video">
                <Image
                  src={s.imageUrl!}
                  alt={s.concept}
                  fill
                  sizes="360px"
                  className="object-cover"
                />
                <figcaption className="display absolute inset-0 flex items-center justify-center px-6 text-center text-[26px] leading-none text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
                  {s.overlayText}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--cream-deep)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--cream-deep)] to-transparent" />
      </div>
    </section>
  );
}
