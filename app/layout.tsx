import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: "Royalties Buffet | Premium Buffet Dining", template: "%s | Royalties Buffet" },
  description: "A premium all-you-can-enjoy buffet experience, celebration catering and franchise opportunities from Royalties Buffet.",
  metadataBase: new URL("https://royaltiesbuffet.com"),
  openGraph: {
    title: "Royalties Buffet",
    description: "Come hungry. Leave like royalty.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
