import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All Time High | End-to-End Crypto Launch Management",
  description:
    "ATH powers token launches with discipline and credibility. 90+ TGEs, $80M+ raised, $1.5B+ DEX volume. Multi-chain expertise with clean, transparent execution.",
  keywords: [
    "ATH",
    "All Time High",
    "crypto launch authority",
    "token launch management",
    "token generation event support",
    "TGE advisor",
    "Web3 fundraising",
    "token architecture",
    "crypto execution",
    "Solana TGE",
    "Ethereum TGE",
    "Avalanche TGE",
    "Binance Smart Chain launch",
    "Base blockchain",
    "Hyperliquid",
    "SUI blockchain",
    "liquidity planning",
    "crypto launch framework",
    "blockchain project growth",
  ],
  authors: [{ name: "CodeDale Team" }],
  creator: "CodeDale",
  publisher: "CodeDale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.alltimehigh.ai/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "All Time High | End-to-End Crypto Launch Management",
    description:
      "ATH powers token launches with discipline and credibility. 90+ TGEs, $80M+ raised, $1.5B+ DEX volume. Multi-chain expertise with clean, transparent execution.",
    url: "https://www.alltimehigh.ai/",
    siteName: "All Time High",
    images: [
      {
        url: "/ath-og.png",
        width: 1200,
        height: 630,
        alt: "All Time High | End-to-End Crypto Launch Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Time High | End-to-End Crypto Launch Management",
    description:
      "ATH powers token launches with discipline and credibility. 90+ TGEs, $80M+ raised, $1.5B+ DEX volume. Multi-chain expertise with clean, transparent execution.",
    images: ["/ath-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisWrapper>{children}</LenisWrapper>
      </body>
    </html>
  );
}
