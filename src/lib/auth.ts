/**
 * DINOL is no-signup-first: the whole studio has to work for a guest with no
 * Clerk keys configured at all. So every Clerk touchpoint is gated on this
 * flag rather than assumed.
 */
export const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);
