import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "MANTA Benchmark - Animal Welfare Reasoning Leaderboard";
const socialDescription =
  "Do frontier AI models hold their animal welfare reasoning when users push back? Leaderboard, paper, dataset and transcripts from a multi-turn adversarial benchmark.";
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "MANTA Benchmark: How well do LLMs maintain animal welfare values when users push back?",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mantabench.org"),
  title: siteTitle,
  description:
    "MANTA is the first adversarial multi-turn benchmark for animal welfare reasoning in frontier AI models. See results across 8 models, 5 pressure types, and thousands of conversations.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "MANTA Benchmark",
    locale: "en_US",
    title: siteTitle,
    description: socialDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: socialDescription,
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
