import type { Metadata, Viewport } from "next";
import { Carter_One, Chewy, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import StructuredData from "@/components/StructuredData";

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
  metadataBase: new URL("https://zunoon-2026.vercel.app"),
  title: {
    default: "AARAMBH 2.0 | Annual College Freshers Fest — LNJPIT Chapra",
    template: "%s | AARAMBH 2.0 — LNJPIT Chapra",
  },
  description:
    "Official website for AARAMBH 2.0 (30 Oct – 1 Nov 2026), the Annual Cultural & Freshers Welcome Fest of Loknayak Jai Prakash Institute of Technology (LNJPIT), Chapra, Bihar. 5 Student Clubs, 29 Competitions, 100% Free Registration & Events.",
  keywords: [
    "Aarambh 2.0",
    "Aarambh 2026",
    "LNJPIT Chapra",
    "LNJPIT",
    "Loknayak Jai Prakash Institute of Technology",
    "College Freshers Fest",
    "Bihar Engineering Fest",
    "LNJPIT Event Registration",
    "LNJPIT Confessions",
    "Literary Club LNJPIT",
    "Technical Club LNJPIT",
    "Sports Club LNJPIT",
    "Art Club LNJPIT",
    "Cultural Club LNJPIT",
    "Chapra College Festival",
    "Bihar College Competitions",
    "Mr and Ms Freshers LNJPIT",
    "Free College Fest Entry",
  ],
  authors: [{ name: "LNJPIT Cultural Council" }, { name: "Aarambh 2.0 Student Committee" }],
  creator: "LNJPIT Cultural Affairs Secretariat",
  publisher: "Loknayak Jai Prakash Institute of Technology, Chapra",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AARAMBH 2.0 | Annual Freshers Fest — LNJPIT Chapra",
    description:
      "A New Chapter. One Campus. Endless Memories. Officially scheduled for 30 Oct – 1 Nov 2026. Explore 29 competitions across 5 student clubs, schedule, gallery, and register for free at LNJPIT Chapra.",
    url: "https://zunoon-2026.vercel.app",
    type: "website",
    locale: "en_IN",
    siteName: "AARAMBH 2.0",
    images: [
      {
        url: "/aarambh_logo_official.png",
        width: 976,
        height: 312,
        alt: "AARAMBH 2.0 Official Festival Logo — LNJPIT Chapra",
      },
      {
        url: "/about_collage.jpg",
        width: 1200,
        height: 630,
        alt: "AARAMBH 2.0 Festival Collage — LNJPIT Campus Life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AARAMBH 2.0 | LNJPIT Chapra Freshers Fest",
    description:
      "Official College Cultural Festival (30 Oct – 1 Nov 2026). 5 Student Clubs & 29 Competitions. 100% Free Participation. Register Now.",
    images: ["/aarambh_logo_official.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  category: "event",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${carterOne.variable} ${chewy.variable} ${spaceGrotesk.variable}`}>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
