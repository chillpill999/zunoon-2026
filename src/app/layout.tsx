import type { Metadata } from "next";
import { Carter_One, Chewy, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

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
  title: "Zunoon'26 | Annual Cultural Festival",
  description: "Zunoon 2026 is the premier annual cultural extravaganza. Explore pronites, flagship competitions, passes, and 60+ electrifying events.",
  keywords: ["Zunoon", "Zunoon 2026", "Cultural Fest", "College Fest", "Pronites", "Competitions"],
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
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
