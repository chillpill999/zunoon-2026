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
  title: "AARAMBH 2.0 | College Freshers Fest — LNJPIT Chapra",
  description: "Official portal for AARAMBH 2.0, the Annual Freshers Fest of Loknayak Jai Prakash Institute of Technology (LNJPIT), Chapra, Bihar. 5 Student Clubs, 29 Major Competitions, and 100% Free Event Registration.",
  keywords: ["Aarambh 2.0", "Aarambh", "LNJPIT Chapra", "Freshers Fest", "College Fest", "Event Registration", "Competitions", "Literary Club", "Technical Club", "Sports Club", "Art Club", "Cultural Club"],
  openGraph: {
    title: "AARAMBH 2.0 | LNJPIT Chapra Freshers Fest",
    description: "A New Chapter. One Campus. Endless Memories. Register for 29 competitions across 5 student clubs at LNJPIT Chapra.",
    type: "website",
    locale: "en_IN",
    siteName: "AARAMBH 2.0",
  },
  twitter: {
    card: "summary_large_image",
    title: "AARAMBH 2.0 | LNJPIT Chapra Freshers Fest",
    description: "Official College Cultural Festival. 5 Student Clubs & 29 Competitions. Register Now.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${carterOne.variable} ${chewy.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          rel="preload"
          href="/hero_poster_mob.jpg"
          as="image"
          media="(max-width: 799px)"
        />
        <link
          rel="preload"
          href="/hero_poster.jpg"
          as="image"
          media="(min-width: 800px)"
        />
      </head>
      <body className="min-h-screen bg-[#0a0618] text-white flex flex-col selection:bg-amber-400 selection:text-black">
        <Preloader />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
