import type { Metadata, Viewport } from "next";
import { Carter_One, Chewy, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0618",
};

const carterOne = Carter_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-carter",
});

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chewy",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ZUNOON 2026 | College Freshers Fest — LNJPIT Chapra",
  description: "Official portal for ZUNOON 2026, the Annual Freshers Fest of Loknayak Jai Prakash Institute of Technology (LNJPIT), Chapra, Bihar. A New Chapter. One Campus. Endless Memories. Free Digital Attendance Passes.",
  keywords: ["Zunoon", "Zunoon 2026", "LNJPIT Chapra", "Freshers Fest", "College Fest", "Free Pass", "Bihar Engineering", "Pronites", "Competitions"],
  openGraph: {
    title: "ZUNOON 2026 | LNJPIT Chapra Freshers Fest",
    description: "A New Chapter. One Campus. Endless Memories. Claim your free digital attendance pass for ZUNOON 2026 at LNJPIT Chapra.",
    type: "website",
    locale: "en_IN",
    siteName: "ZUNOON 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZUNOON 2026 | LNJPIT Chapra Freshers Fest",
    description: "A New Chapter. One Campus. Endless Memories. 100% Free Entry & Digital Passes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${carterOne.variable} ${chewy.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-[#0a0618] text-white flex flex-col selection:bg-amber-400 selection:text-black">
        <Preloader />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
