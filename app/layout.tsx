import type { Metadata } from "next";
import { Playfair_Display, Gowun_Dodum } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const gowunDodum = Gowun_Dodum({
  variable: "--font-gowun",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Korean Name Generator",
  description: "Generate your Korean name based on your English name.",
  verification: {
    google: "7IOk2xh4n4iy25W4jKfpDMFvsuRk5oc0CbgzI7F65XA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${gowunDodum.variable} font-sans antialiased bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-P5S9SB3FGT" />
    </html>
  );
}
