import { Suspense } from "react";
import { Studio } from "@/components/app/studio";

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-[var(--muted)]">Loading studio...</div>}>
      <Studio />
    </Suspense>
  );
}
