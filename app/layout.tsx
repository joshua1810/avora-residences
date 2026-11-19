import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const basis = localFont({
  src: [
    { path: "./fonts/BasisGrotesqueArabicPro-Regular.ttf", weight: "400" },
    { path: "./fonts/BasisGrotesqueArabicPro-Medium.ttf", weight: "500" },
    { path: "./fonts/BasisGrotesqueArabicPro-Bold.ttf", weight: "700" },
  ],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-basis",
});

const awesome = localFont({
  src: [
    { path: "./fonts/AwesomeSerifItalic-Regular.otf", weight: "400", style: "italic" },
    { path: "./fonts/AwesomeSerifItalic-MedRegular.otf", weight: "500", style: "italic" },
  ],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-awesome",
});

const title = "AVORA Residences — Come home to your nature";
const description = "Thoughtful homes shaped by light, landscape, and the life within. Explore the AVORA Residences concept in Bengaluru.";
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "avora-residences.vercel.app";
const siteUrl = new URL(process.env.SITE_URL ?? `https://${productionHost}`);
if (!siteUrl.pathname.endsWith("/")) siteUrl.pathname += "/";

const shareImage = {
  url: new URL("avora-share.jpg?v=mist", siteUrl),
  width: 1200,
  height: 630,
  alt: "The peach AVORA wordmark above a villa wrapped in soft mist",
};

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "AVORA Residences",
    title,
    description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={`${basis.variable} ${awesome.variable}`}><body>{children}</body></html>;
}
