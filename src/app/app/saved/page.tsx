import { PackList } from "@/components/app/pack-list";

export default function SavedPage() {
  return (
    <PackList
      source="saved"
      title="Saved packs"
      blurb="The packs you starred. Keep the ones you are actually going to shoot."
    />
  );
}
