import HeroSection from '@/components/HeroSection';
import Marquee from '@/components/Marquee';
import AboutSection from '@/components/AboutSection';
import EventRegistrationPortal from '@/components/EventRegistrationPortal';
import ScheduleSection from '@/components/ScheduleSection';
import CubeSection from '@/components/CubeSection';
import GallerySection from '@/components/GallerySection';
import FaqSection from '@/components/FaqSection';
import TeamSection from '@/components/TeamSection';

export default function HomePage() {
  return (
    <div className="relative bg-[#070210]">
      {/* 1. CINEMATIC HERO & SCROLL-SCRUBBED TRUCK/CASSETTE ODYSSEY (Frames 04, 05, 06, 07) */}
      <HeroSection />

      {/* 2. INFINITE SPONSORS & PARTNERS MARQUEE (Frame 11) */}
      <Marquee />

      {/* 3. ABOUT AARAMBH 2.0 & LNJPIT CHAPRA TAPESTRY (Frames 08 & 12) */}
      <AboutSection />

      {/* 4. BLITZSCHLAG-STYLE CATEGORY-WISE EVENT REGISTRATION (5 Clubs & 29 Competitions) */}
      <EventRegistrationPortal />

      {/* 5. INTERACTIVE 3D ROTATING PHOTO CUBE - STEP INTO THE AARAMBH-VERSE (Frame 09) */}
      <CubeSection />

      {/* 6. FESTIVAL SCHEDULE & TIMELINE */}
      <ScheduleSection />

      {/* 7. VISUAL STORYTELLING GALLERY */}
      <GallerySection />

      {/* 8. FAQ ACCORDION */}
      <FaqSection />

      {/* 9. LEADERSHIP & COMMITTEE CAROUSEL (Frame 10) */}
      <TeamSection />
    </div>
  );
}
