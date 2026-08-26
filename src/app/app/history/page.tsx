import { PackList } from "@/components/app/pack-list";

export default function HistoryPage() {
  return (
    <PackList
      source="history"
      title="History"
      blurb="Your last 40 packs. As a guest these live in this browser only, so signing in is what makes them permanent."
    />
  );
}
