# DINOL

**Turn one hot take into a viral content pack.** dinol.fun

An AI hot-take studio for creators, commentators and crypto founders. Paste a
topic, tweet, transcript or token brief and DINOL returns titles, thumbnail
concepts with rendered graphics, short-form hooks, talking points, a debate kit,
threads, crypto launch assets and an honest virality score.

The studio requires a free account. The landing page, examples and public share
pages are fully readable without one, so visitors can judge the output before
signing up.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in OPENAI_API_KEY at minimum
npm run dev
```

Open http://localhost:3000.

- Without `OPENAI_API_KEY` the app still runs and serves a clearly-labelled demo
  pack, so the UI is never empty.
- Without Clerk keys the middleware is skipped and `/app` is unreachable, since
  the studio is gated. Marketing pages and examples still work.

---

## Environment

| Variable | Required | What it does |
| --- | --- | --- |
| `OPENAI_API_KEY` | For real output | Text and image generation |
| `DINOL_TEXT_MODEL` | No | Defaults to `gpt-4.1-mini` |
| `DINOL_IMAGE_MODEL` | No | Defaults to `gpt-image-1` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Enables sign in/up and the studio gate |
| `CLERK_SECRET_KEY` | Yes | Server-side Clerk |
| `NEXT_PUBLIC_ETH_RECEIVER` | No | Overrides the ETH payment address |
| `DATABASE_URL` | For persistence | Postgres (Neon or Supabase) |
| `NEXT_PUBLIC_SITE_URL` | No | Used for OG tags and share links |

Never commit `.env.local`. It is gitignored.

---

## Architecture

```
src/
  app/
    page.tsx                 landing
    pricing|examples|faq|about|privacy|terms/
    app/                     the studio (generator, history, saved, billing, settings)
    p/[slug]/                public shared pack pages
    sign-in|sign-up/         Clerk routes
    api/
      generate/              text pack generation
      thumbnail/             image rendering
      eth-rate/              live ETH price for checkout
      payments/              records a claimed ETH transaction
  components/
    site/                    marketing UI, brand art, logo
    app/                     studio, pack viewer, pack list
    auth/                    Clerk provider and controls
    ui/                      buttons, cards, meters, accordion
  lib/
    prompts.ts               ALL prompt engineering
    openai.ts                model selection and client
    sanitize.ts              output cleanup (em dashes etc)
    fallback.ts              offline demo pack
    payments.ts              ETH config
    store.ts                 guest localStorage persistence
  data/site.ts               all site copy, plans, templates, FAQs
  data/examples.json         seeded example packs (real generated output)
prisma/schema.prisma         users, subscriptions, generations, shares, usage
scripts/                     asset, icon, screenshot and seeding tooling
orynth/                      listing kit: logo, cover, 5 screenshots
```

### Auth and data flow

`src/proxy.ts` gates `/app/*`, `/api/generate` and `/api/thumbnail` behind
Clerk. Everything else is public. When no Clerk keys are present the middleware
is bypassed entirely so a fresh clone still builds and runs.

Packs currently persist to `localStorage` via `src/lib/store.ts` (history,
saved, usage count), keyed per browser rather than per user. The Prisma schema
is complete and ready to take over; writing generations to `Generation` rows on
the server is the piece left to do.

Clerk's own branding and development banner are hidden via CSS in
`src/app/globals.css` plus `appearance.elements` in
`src/components/auth/provider.tsx`. Removing the "Secured by Clerk" badge is a
paid-plan entitlement, so make sure the plan permits it before launch.

---

## Where to change things

Everything below is marked in the source with a `SWAP POINT` comment.

**Prompts and voice** — `src/lib/prompts.ts`. `SYSTEM_PROMPT` holds the banned
phrase list and formatting rules. `TONE_GUIDE`, `INTENSITY_GUIDE` and
`MODE_GUIDE` control the six tones, three intensities and three modes.
`PACK_SCHEMA` defines the JSON shape the model must return, so adding a new
output section means editing the schema, the TypeScript type in
`src/lib/types.ts`, and a tab in `src/components/app/pack-view.tsx`.

**Models** — `src/lib/openai.ts`, or override with the `DINOL_TEXT_MODEL` and
`DINOL_IMAGE_MODEL` env vars without touching code.

**Image style presets** — `buildImagePrompt` in `src/lib/prompts.ts`. Four
presets ship: photoreal, bold, meme, clean.

**Pricing, copy, templates, FAQs, testimonials** — `src/data/site.ts`. All
user-facing marketing text lives in this one file.

**Payment address** — `src/lib/payments.ts`, or `NEXT_PUBLIC_ETH_RECEIVER`.

**Rate limiting** — the in-memory map in `src/app/api/generate/route.ts` is
per-instance and resets on deploy. Swap it for Redis or Upstash before real
traffic.

---

## Payments

DINOL takes **ETH on Ethereum mainnet only**, sent directly to the project
wallet. There is no processor and no stored card credential.

The flow: pick a plan, the app quotes the ETH amount from a live Coinbase spot
price (with a cached fallback), you send from any wallet, then paste the
transaction hash. `POST /api/payments` validates the hash format and logs the
claim.

**This is not yet automatic.** To finish it, `src/app/api/payments/route.ts`
documents the four calls needed: `eth_getTransactionByHash` to confirm the
recipient and value, `eth_getTransactionReceipt` to confirm status and
confirmations, then writing the `Subscription` row. Until that lands, payments
need manual reconciliation against Etherscan.

Because each month is a separate transaction the user initiates, there is no
recurring charge to cancel and no refund path. That is reflected in the terms.

---

## Scripts

```bash
npm run dev              # dev server
npm run build            # production build
npm run seed:examples    # regenerate src/data/examples.json from live OpenAI
npm run gen:assets       # regenerate OG image and founder placeholder
npm run db:push          # push the Prisma schema
node scripts/brand-icon.mjs             # re-render the logo at every size
node scripts/cover.mjs                  # rebuild the Orynth cover
node scripts/screenshots.mjs [baseUrl]  # recapture the 5 Orynth screenshots
node --env-file=.env.local scripts/render-example-thumbs.mjs  # pre-render example graphics
```

The seeding and asset scripts need `--env-file=.env.local` when run directly.

---

## Deploying

1. Push to GitHub.
2. Import into Vercel. Framework detection handles the rest.
3. Add every environment variable from the table above in Vercel project
   settings. `OPENAI_API_KEY` is the only one required for the product to work.
4. Point `dinol.fun` at the Vercel deployment.
5. If using accounts, create a **production** Clerk instance. The keys in
   development are `pk_test_`/`sk_test_` and are rate limited.

`npm run build` must pass locally first. It currently does, across 22 routes.

---

## Orynth listing kit

`orynth/` contains ready-to-upload assets:

- `cover.png` — 2560x1600 product showcase cover, use as the first image
- `screenshot-1..5.png` — 2560x1600, real product screenshots on branded backdrops
- `logo.png` — 1024x1024 brand icon
- `logo-wordmark.png` — horizontal lockup

Regenerate the screenshots any time the UI changes: start `npm run dev`, then
run `node scripts/screenshots.mjs http://localhost:3000`.

**One-line pitch:** DINOL turns one opinion or launch idea into a
ready-to-publish content machine.

---

## Known gaps

Honest list of what is scaffolded rather than finished:

- **Payment verification is manual.** See the Payments section.
- **Nothing writes to Postgres yet.** The schema is complete and the browser
  store is the source of truth; server-side persistence is not written.
- **Credit limits are not enforced server-side.** The free counter lives in
  `localStorage` and is trivially reset. Real enforcement needs the
  `UsageRecord` table plus a per-user check in `/api/generate`.
- **Rate limiting is in-memory**, so it does not survive a deploy or span
  instances.
- **Testimonials are placeholders.** They are realistic but invented, and
  should be replaced with real quotes before a public launch.
- **Batch generation, PDF export and workspaces** are listed on the Premium
  plan but not built.

---

Built by [Tyson Hockley](https://x.com/HockleyTyson).
