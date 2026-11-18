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

export const metadata: Metadata = {
  title: "AVORA Residences — Come home to your nature",
  description: "Thoughtful homes shaped by light, landscape, and the life within. Explore the AVORA Residences concept in Bengaluru.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={`${basis.variable} ${awesome.variable}`}><body>{children}</body></html>;
}
