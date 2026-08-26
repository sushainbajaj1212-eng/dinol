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

const isProtectedPage = createRouteMatcher(["/app(.*)"]);
const isProtectedApi = createRouteMatcher([
  "/api/generate(.*)",
  "/api/thumbnail(.*)",
]);

export default enabled
  ? clerkMiddleware(async (auth, req) => {
      const isPage = isProtectedPage(req);
      const isApi = isProtectedApi(req);
      if (!isPage && !isApi) return;

      const { userId } = await auth();
      if (userId) return;

      // APIs answer with a status the client can act on rather than HTML.
      if (isApi) {
        return NextResponse.json(
          { error: "Sign in to generate. The studio requires an account." },
          { status: 401 },
        );
      }

      // Redirect explicitly rather than relying on auth.protect() to infer the
      // sign-in URL: on a custom domain that inference fails and returns a 404.
      const signIn = new URL("/sign-in", req.url);
      signIn.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signIn);
    })
  : () => NextResponse.next();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|txt|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
