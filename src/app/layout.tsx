import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

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
        className={`${notoSansJP.className} className="min-h-screen p-8 lg:p-12 overflow-x-hidden"`}
      >
        {children}
      </body>
    </html>
  );
}
