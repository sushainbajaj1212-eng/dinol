import Link from "next/link";
import { Card, Button } from "@/components/ui";

export function AuthDisabled() {
  return (
    <Card className="max-w-md p-8 text-center">
      <h1 className="display text-[24px]">Accounts are not configured yet</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--espresso-soft)]">
        This deployment has no Clerk keys set. Add
        <code className="mx-1 rounded bg-[var(--cream)] px-1.5 py-0.5 text-[12px]">
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        </code>
        and
        <code className="mx-1 rounded bg-[var(--cream)] px-1.5 py-0.5 text-[12px]">
          CLERK_SECRET_KEY
        </code>
        to enable sign in. The studio needs an account, so it is unavailable until they are set.
      </p>
      <Link href="/examples" className="mt-6 inline-block">
        <Button>Browse example packs</Button>
      </Link>
    </Card>
  );
}
