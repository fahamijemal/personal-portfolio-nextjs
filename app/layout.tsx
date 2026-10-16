import React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getSiteUrl } from "@/lib/site-url";
import {
  personalBrand,
  personalIdentityGraph,
  serializeStructuredData,
} from "@/lib/personal-seo";
import "./globals.css";

const geist = localFont({
  src: "./fonts/geist-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-mono",
  preload: false,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fahami Jemal Harun | Software Developer & IFAA Founder",
    template: "%s | Fahami Jemal Harun",
  },
  description: personalBrand.description,
  keywords: [
    personalBrand.name,
    personalBrand.companyName,
    ...personalBrand.companyAliases,
    "IFAA",
    "IFAA ENTRANCE",
    "qormaata interaansii",
    "Ethiopia",
    "Oromia",
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "Cloud Computing",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
  ],
  authors: [{ name: personalBrand.name, url: siteUrl }],
  creator: "Fahami Jemal Harun",
  openGraph: {
    type: "website",
    locale: "en_ET",
    title: "Fahami Jemal Harun | Software Developer & IFAA Founder",
    description: personalBrand.description,
    siteName: personalBrand.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fahami Jemal Harun — Software Developer & IFAA TECHNOLOGIES Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahami Jemal Harun | Software Developer & IFAA Founder",
    description: personalBrand.description,
    images: ["/opengraph-image"],
  },
  ...(process.env.VERCEL_ENV === "preview" && {
    robots: { index: false, follow: false },
  }),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(personalIdentityGraph()),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
