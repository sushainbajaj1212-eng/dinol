import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * The studio requires an account. Marketing pages, the examples and the public
 * share pages stay open so a visitor can judge the product before signing up.
 *
 * When no Clerk keys are configured the middleware is skipped entirely, so a
 * fresh clone still runs locally without auth set up.
 */
const enabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const isProtected = createRouteMatcher([
  "/app(.*)",
  "/api/generate(.*)",
  "/api/thumbnail(.*)",
]);

export default enabled
  ? clerkMiddleware(async (auth, req) => {
      if (isProtected(req)) {
        await auth.protect();
      }
    })
  : () => NextResponse.next();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
