import React from "react"
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Fahami Jemal Harun | Software Engineer",
  description:
    "Personal portfolio of Fahami Jemal Harun - Software Engineering Student and Full-Stack Developer with a focus on Backend and Cloud technologies.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "Cloud Computing",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
  ],
  authors: [{ name: "Fahami Jemal Harun" }],
  creator: "Fahami Jemal Harun",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Fahami Jemal Harun | Software Engineer",
    description:
      "Personal portfolio of Fahami Jemal Harun - Software Engineering Student and Full-Stack Developer.",
    siteName: "Fahami Jemal Harun Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahami Jemal Harun | Software Engineer",
    description:
      "Personal portfolio of Fahami Jemal Harun - Software Engineering Student and Full-Stack Developer.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
