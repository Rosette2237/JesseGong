// JesseGong/app/layout.tsx

import type { Metadata } from "next";
import { EB_Garamond, Open_Sans } from "next/font/google";

import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boyang Gong",
  description: "This is a personal website for Boyang Gong",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${ebGaramond.variable}`}>
      <body className={`${openSans.className} bg-slate-50 text-slate-900`}>
        <div className="min-h-screen">
          <Navbar />

          <main className="mx-auto w-full max-w-7xl px-6 py-10">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}