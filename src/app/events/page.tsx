import EventRegistrationPortal from '@/components/EventRegistrationPortal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Official Competitions & Event Registration | Aarambh 2.0',
  description:
    'Register for 29 competitions across 5 student clubs (Literary, Technical, Sports, Art, Cultural) at Aarambh 2.0, LNJPIT Chapra. 100% Free Participation.',
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
