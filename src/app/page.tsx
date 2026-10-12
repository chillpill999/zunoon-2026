import HeroSection from '@/components/HeroSection';
import Marquee from '@/components/Marquee';
import AboutSection from '@/components/AboutSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import ScheduleSection from '@/components/ScheduleSection';
import GallerySection from '@/components/GallerySection';
import RegistrationSection from '@/components/RegistrationSection';
import FaqSection from '@/components/FaqSection';
import TeamSection from '@/components/TeamSection';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-purple-900/30 via-indigo-900/20 to-transparent blur-3xl pointer-events-none" />

      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. INFINITE SPONSORS / PARTNERS MARQUEE */}
      <Marquee />

      {/* 3. ABOUT ZUNOON & LNJPIT CHAPRA */}
      <AboutSection />

      {/* 4. FEST ACTIVITIES & COMPETITIONS */}
      <ActivitiesSection />

      {/* 5. SCHEDULE TIMELINE */}
      <ScheduleSection />

      {/* 6. VISUAL STORYTELLING & GALLERY */}
      <GallerySection />

      {/* 7. 100% FREE REGISTRATION & DIGITAL PASS GENERATOR */}
      <RegistrationSection />

      {/* 8. FAQ ACCORDION */}
      <FaqSection />

      {/* 9. LEADERSHIP & ORGANIZING COMMITTEE */}
      <TeamSection />
    </div>
  );
}
