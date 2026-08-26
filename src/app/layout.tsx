import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { clerkEnabled } from "@/lib/auth";
import { DinolClerkProvider } from "@/components/auth/provider";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FBF7F0",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "AI thumbnail maker",
    "YouTube title generator",
    "content pack generator",
    "creator tools",
    "crypto launch copy",
    "viral hooks",
    "debate prep AI",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    images: [{ url: "/assets/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    creator: "@HockleyTyson",
    images: ["/assets/og.png"],
  },
  icons: {
    icon: [{ url: "/assets/icon.svg", type: "image/svg+xml" }],
    apple: "/assets/icon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} antialiased`}>
        {clerkEnabled ? (
          <DinolClerkProvider>{children}</DinolClerkProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
