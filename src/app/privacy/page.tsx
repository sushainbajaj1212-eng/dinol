import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="26 August 2026"
      sections={[
        {
          h: "What we collect",
          p: [
            "Using the studio requires an account, so we store the email address and authentication identifiers our auth provider gives us. Browsing the landing page, examples and shared packs requires nothing.",
            "If you create an account we store your email address, your authentication identifiers from our auth provider, your subscription status, and the packs you choose to save.",
            "We collect standard server logs including IP address and user agent for security, rate limiting and abuse prevention.",
          ],
        },
        {
          h: "Your inputs",
          p: [
            "The text you paste into the studio is sent to our AI provider to produce your pack. It is used for that purpose and to populate your own history if you are signed in.",
            "We do not sell your inputs, publish them, or use them to train public models. Do not paste material you are not permitted to share, including confidential transcripts or personal data belonging to other people.",
          ],
        },
        {
          h: "Third parties",
          p: [
            "We use OpenAI for text and image generation, Clerk for authentication, and Vercel for hosting. Each processes data under its own terms.",
            "Payments are made in ETH directly to our wallet, so there is no payment processor and we never receive or store card details. We do store the transaction hash you submit, which is already public on the Ethereum blockchain, in order to match your payment to your account.",
          ],
        },
        {
          h: "Cookies",
          p: [
            "We use only the cookies required to keep you signed in and to keep the service secure. We do not run third party advertising trackers.",
          ],
        },
        {
          h: "Retention and your rights",
          p: [
            "Saved packs are kept until you delete them or close your account. Deleting your account removes your packs and profile data within 30 days.",
            "You can request an export or a deletion of your data at any time by contacting us from the address on your account.",
          ],
        },
      ]}
    />
  );
}
