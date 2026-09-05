import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const chillax = localFont({
  src: "../fonts/Chillax-Variable.woff2",
  variable: "--font-chillax",
  display: "swap",
  weight: "200 700",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Location prestige à Lyon`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={chillax.variable}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
