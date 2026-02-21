// JesseGong/app/layout.tsx

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boyang Gong",
  description: "This is a personal website for Boyang Gong",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="min-h-screen">
          <Navbar />

          {/* Wider than the navbar container for a more open layout */}
          <main className="mx-auto w-full max-w-7xl px-6 py-10">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
