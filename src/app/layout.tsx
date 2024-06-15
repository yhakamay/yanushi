import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "やぬし",
  description:
    "スプラトゥーン歴1年。好きなものはホコとダイナモ、苦手なものはウルショとサブ性ガン積みもみじシューターです。",
  keywords: ["Splatoon", "スプラトゥーン", "Splatoon3", "スプラトゥーン3"],
  openGraph: {
    title: "やぬし",
    siteName: "やぬし",
    description:
      "スプラトゥーン歴1年。好きなものはホコとダイナモ、苦手なものはウルショとサブ性ガン積みもみじシューターです。",
    type: "website",
    locale: "ja_JP",
    url: "https://www.yanushi.me/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} className="min-h-screen p-8 lg:p-12 overflow-x-hidden"`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
