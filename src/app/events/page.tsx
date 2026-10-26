import type { Metadata } from 'next';
import EventRegistrationPortal from '@/components/EventRegistrationPortal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Official Competitions & Event Registration (29 Events) | Aarambh 2.0',
  description:
    'Register for 29 competitions across 5 student clubs (Literary, Technical, Sports, Art, Cultural) at Aarambh 2.0, LNJPIT Chapra. Debate, Web Hackathon, Blind Coding, Circitron, BGMI, Live Painting, Singing, Rampwalk. 100% Free Participation.',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Register for 29 Events & Competitions | Aarambh 2.0 — LNJPIT Chapra',
    description:
      'Official registrations open for 29 competitions across Literary, Technical, Sports, Art, and Cultural clubs at LNJPIT Chapra. 100% free entry.',
    url: 'https://zunoon-2026.vercel.app/events',
    type: 'website',
    images: ['/aarambh_logo_official.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register for Events | Aarambh 2.0 — LNJPIT Chapra',
    description: '29 competitions across 5 student clubs at LNJPIT Chapra. Register now for free.',
  },
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#070210] text-white pt-24">
      <Navbar />
      <EventRegistrationPortal />
      <Footer />
    </main>
  );
}
