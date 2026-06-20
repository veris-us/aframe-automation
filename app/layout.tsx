import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Frame Automation | Enterprise Software Solutions",
  description:
    "Custom software, business automation, client portals, websites, and SaaS platforms built around the way your business actually works.",

  keywords: [
    "Custom Software",
    "Business Automation",
    "SaaS Development",
    "Client Portals",
    "Enterprise Software",
    "Software Development Oklahoma",
    "A Frame Automation",
  ],

  authors: [{ name: "A Frame Automation" }],

  openGraph: {
    title: "A Frame Automation",
    description:
      "Custom software, business automation, websites, and SaaS platforms.",
    siteName: "A Frame Automation",
    type: "website",
  },
};
