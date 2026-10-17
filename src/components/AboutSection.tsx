'use client';

import Image from 'next/image';
import { Ticket, CheckCircle2, Trophy, Users, Heart, MapPin, Bus, GraduationCap, Flame } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0518] overflow-hidden">
      {/* Background Decorative Ambient Aura (Desktop only to conserve mobile GPU fill-rate) */}
      <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] lg:w-[1200px] h-[600px] lg:h-[800px] bg-gradient-to-b from-purple-900/20 via-rose-900/15 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading Tag */}
        <ScrollReveal direction="up" distance={24}>
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-1.5 rounded-full bg-amber-400 text-black border-3 border-black text-xs font-carter tracking-widest uppercase shadow-[3px_3px_0px_#000] -rotate-2">
              CHAPTER ONE: THE ODYSSEY
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-carter tracking-wide text-white drop-shadow-[6px_6px_0px_#000] uppercase mt-4">
              ABOUT <span className="text-amber-400">US</span>
            </h2>
            <p className="font-chewy text-xl sm:text-2xl text-purple-200 mt-2 max-w-2xl mx-auto drop-shadow-[2px_2px_0px_#000]">
              {FEST_CONFIG.tagline}
            </p>
          </div>
        </ScrollReveal>

        {/* The Graphic Collage Feature Canvas */}
        <ScrollReveal direction="up" distance={30} scale={0.97} delay={100}>
          <div className="relative w-full rounded-3xl overflow-hidden border-4 border-black shadow-[10px_10px_0px_#000] bg-[#1a0e35] mb-16">
            {/* Authentic High-Res Collage Image */}
            <div className="relative w-full aspect-[9/16] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[1/2] max-h-[1400px]">
              <Image
                src="/about_collage.jpg"
                alt="Aarambh 2.0 About Us Tapestry"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Dark gradient overlay at bottom for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating Interactive Story Box Over the Canvas */}
            <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-20">
              <div className="p-6 sm:p-8 rounded-3xl bg-black/85 backdrop-blur-md border-3 border-amber-400 shadow-[8px_8px_0px_#000] text-center max-w-3xl mx-auto">
                <span className="px-3.5 py-1 rounded-full bg-rose-600 text-white font-carter text-xs tracking-wider uppercase border-2 border-black shadow-[2px_2px_0px_#000] -rotate-1 inline-block mb-3">
                  SAFAR: FRESHERS VERSE
                </span>
                <h3 className="font-carter text-2xl sm:text-4xl text-white tracking-wide">
                  WHERE PASSION MEETS CAMPUS SPIRIT
                </h3>
                <p className="mt-3 text-xs sm:text-sm md:text-base font-sans text-purple-100 leading-relaxed">
                  <strong className="text-amber-300">AARAMBH 2.0</strong> is the definitive freshers festival of{' '}
                  <span className="text-white font-bold">{FEST_CONFIG.institution}</span>, Chapra. Inspired by the raw, vibrant energy of Indian street culture, retro cinema, and campus camaraderie, Aarambh 2.0 invites every first-year student to step into the spotlight.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#events"
                    className="comic-btn px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-sm uppercase tracking-wide inline-flex items-center gap-2 -rotate-1"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>REGISTER FOR EVENTS</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Grand Festival Key Stats (Verified LNJPIT Facts) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <ScrollReveal direction="up" delay={50} rotate={-2}>
            <div className="comic-box p-6 rounded-3xl bg-[#1b103c] text-center hover:rotate-0 transition-transform">
              <span className="text-4xl sm:text-5xl font-carter text-amber-400 drop-shadow-[3px_3px_0px_#000] block">
                {FEST_CONFIG.stats.freshersFootfall.value}
              </span>
              <span className="font-carter text-xs sm:text-sm text-white tracking-wider uppercase mt-2 block">
                {FEST_CONFIG.stats.freshersFootfall.label}
              </span>
              <span className="text-[11px] font-mono text-purple-300 mt-1 block">
                {FEST_CONFIG.stats.freshersFootfall.subtext}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120} rotate={2}>
            <div className="comic-box p-6 rounded-3xl bg-[#1b103c] text-center hover:rotate-0 transition-transform">
              <span className="text-4xl sm:text-5xl font-carter text-rose-500 drop-shadow-[3px_3px_0px_#000] block">
                {FEST_CONFIG.stats.departments.value}
              </span>
              <span className="font-carter text-xs sm:text-sm text-white tracking-wider uppercase mt-2 block">
                {FEST_CONFIG.stats.departments.label}
              </span>
              <span className="text-[11px] font-mono text-purple-300 mt-1 block">
                {FEST_CONFIG.stats.departments.subtext}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={190} rotate={-1}>
            <div className="comic-box p-6 rounded-3xl bg-[#1b103c] text-center hover:rotate-0 transition-transform">
              <span className="text-4xl sm:text-5xl font-carter text-emerald-400 drop-shadow-[3px_3px_0px_#000] block">
                {FEST_CONFIG.stats.entryFee.value}
              </span>
              <span className="font-carter text-xs sm:text-sm text-white tracking-wider uppercase mt-2 block">
                {FEST_CONFIG.stats.entryFee.label}
              </span>
              <span className="text-[11px] font-mono text-purple-300 mt-1 block">
                {FEST_CONFIG.stats.entryFee.subtext}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={260} rotate={1}>
            <div className="comic-box p-6 rounded-3xl bg-[#1b103c] text-center hover:rotate-0 transition-transform">
              <span className="text-4xl sm:text-5xl font-carter text-cyan-400 drop-shadow-[3px_3px_0px_#000] block">
                {FEST_CONFIG.stats.venueCampus.value}
              </span>
              <span className="font-carter text-xs sm:text-sm text-white tracking-wider uppercase mt-2 block">
                {FEST_CONFIG.stats.venueCampus.label}
              </span>
              <span className="text-[11px] font-mono text-purple-300 mt-1 block">
                {FEST_CONFIG.stats.venueCampus.subtext}
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Editorial Twin Cards: About LNJPIT Chapra & About The Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: About LNJPIT Chapra */}
          <ScrollReveal direction="right" delay={100} rotate={-1}>
            <div className="comic-box p-6 sm:p-8 rounded-3xl bg-[#170e35] relative overflow-hidden h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black border-2 border-black flex items-center justify-center font-carter text-xl shadow-[3px_3px_0px_#000]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-amber-300 tracking-wider uppercase block">
                    GOVERNMENT ENGINEERING COLLEGE
                  </span>
                  <h3 className="font-carter text-2xl sm:text-3xl text-white tracking-wide">
                    ABOUT LNJPIT CHAPRA
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-sans text-purple-100/90 leading-relaxed">
                Established by the Government of Bihar under the Department of Science, Technology and Technical Education,{' '}
                <strong>Loknayak Jai Prakash Institute of Technology (LNJPIT)</strong> stands as a premier beacon of technical education in the Saran division. Named in honor of the revolutionary freedom fighter Loknayak Jai Prakash Narayan, the campus nurtures future innovators, engineers, and cultural leaders across branches including CSE, CE, ME, EEE, Food Processing & Preservation (FPP), and Mathematics & Computing (M&C).
              </p>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-purple-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Chapra, Bihar
                </span>
                <span className="text-amber-300">Batch 2026</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: About THEME - Safar: Freshers Verse */}
          <ScrollReveal direction="left" delay={150} rotate={1}>
            <div className="comic-box p-6 sm:p-8 rounded-3xl bg-[#170e35] relative overflow-hidden h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white border-2 border-black flex items-center justify-center font-carter text-xl shadow-[3px_3px_0px_#000]">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-rose-300 tracking-wider uppercase block">
                    ANNUAL FESTIVAL THEME
                  </span>
                  <h3 className="font-carter text-2xl sm:text-3xl text-white tracking-wide">
                    SAFAR: FRESHERS VERSE
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-sans text-purple-100/90 leading-relaxed">
                This edition celebrates the transition into engineering life — the shared journeys on campus buses, the lively debates at chai stalls, late-night hostel jam sessions, and the courage to step outside one's comfort zone. Aarambh 2.0 transforms the traditional college induction into a cinematic carnival where every newcomer finds their rhythm, their mentors, and their lifelong friends.
              </p>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-purple-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Free Admission
                </span>
                <span className="text-rose-400">LNJPIT Cultural Council</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
