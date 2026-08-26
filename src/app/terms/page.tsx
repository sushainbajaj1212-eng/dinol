import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="26 August 2026"
      sections={[
        {
          h: "The service",
          p: [
            "DINOL generates draft content from the input you provide. Output is produced by an AI model, may contain errors, and is a starting point rather than a finished fact checked publication.",
            "You are responsible for reviewing anything you publish. Where the pack flags a claim as needing a source, treat that as a real instruction rather than a formality.",
          ],
        },
        {
          h: "Ownership",
          p: [
            "You own the output you generate and may use it commercially. On paid plans exports are delivered without a watermark.",
            "You keep ownership of everything you paste in. You confirm you have the right to submit it.",
          ],
        },
        {
          h: "Acceptable use",
          p: [
            "Do not use DINOL to produce defamatory statements about real people, to impersonate anyone, to generate harassment campaigns, or to create content that is illegal where you operate.",
            "Do not resell raw access to the generation endpoints or attempt to circumvent rate limits and credit allocations.",
          ],
        },
        {
          h: "Crypto mode",
          p: [
            "Crypto launch mode produces brand and marketing copy only. Nothing it generates is financial, investment, legal or tax advice, and it will not make claims about price or returns.",
            "Token launches are heavily regulated in many jurisdictions. Complying with the rules that apply to you is entirely your responsibility.",
          ],
        },
        {
          h: "Billing",
          p: [
            "Plans are paid in ETH on Ethereum mainnet, in advance, directly to the project wallet. There is no recurring charge and no stored payment credential: each month you pay is a separate transaction you initiate.",
            "Because blockchain transactions are final, payments are not reversible by us. Send only on Ethereum mainnet and only the quoted amount. Funds sent on another network or to the wrong address cannot be recovered.",
            "Credits reset each paid month and do not roll over. If you do not send the next payment, the plan simply lapses back to the free tier.",
          ],
        },
        {
          h: "Liability",
          p: [
            "The service is provided as is. To the maximum extent permitted by law our total liability is limited to the amount you paid in the twelve months before the claim.",
          ],
        },
      ]}
    />
  );
}
