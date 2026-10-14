'use client';

import { 
  Users,
  Award,
  Heart,
  Code2,
  Compass,
  Megaphone,
  Clock
} from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

interface CommitteeWing {
  title: string;
  department: string;
  tag: string;
  tagColor: string;
  gradient: string;
  icon: typeof Users;
  rotation: number;
}

const COMMITTEE_WINGS: CommitteeWing[] = [
  {
    title: 'Core Committee & Student General Secretary',
    department: 'LNJPIT Student Council',
    tag: 'EXECUTIVE LEAD',
    tagColor: '#ec4899',
    gradient: 'from-pink-500 via-rose-600 to-purple-700',
    icon: Award,
    rotation: -2,
  },
  {
    title: 'Cultural Affairs & Stage Production',
    department: 'Cultural Council',
    tag: 'CULTURAL WING',
    tagColor: '#10b981',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    icon: Heart,
    rotation: 2,
  },
  {
    title: 'Technical Infrastructure & Web Architecture',
    department: 'Digital Media & Tech',
    tag: 'TECH CREW',
    tagColor: '#06b6d4',
    gradient: 'from-cyan-500 via-blue-600 to-indigo-800',
    icon: Code2,
    rotation: -1.5,
  },
  {
    title: 'Logistics, Hospitality & Public Relations',
    department: 'Campus Operations',
    tag: 'OPERATIONS',
    tagColor: '#f97316',
    gradient: 'from-orange-500 via-amber-600 to-red-700',
    icon: Compass,
    rotation: 2.5,
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#110626] overflow-hidden">
      {/* Background Banner with Ornate Mandala Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('/assets/bg_main.jpg')` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24}>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400 text-black border-2 border-black text-xs font-carter tracking-widest uppercase shadow-[2px_2px_0px_#000] -rotate-1">
              THE ARCHITECTS OF AARAMBH 2.0
            </span>
            <h2 className="text-5xl sm:text-7xl font-carter tracking-wide text-white drop-shadow-[5px_5px_0px_#000] uppercase mt-3">
              MEET THE <span className="text-amber-400">TEAM</span>
            </h2>
            <p className="font-chewy text-xl text-purple-200 mt-2 max-w-xl mx-auto">
              Faculty mentors, student leads, and dedicated committee creating a memorable Freshers Fest at {FEST_CONFIG.shortInstitution}.
            </p>
          </div>
        </ScrollReveal>

        {/* Central Spotlight Announcement Card */}
        <ScrollReveal direction="up" distance={32} scale={0.96} delay={100}>
          <div className="comic-box p-8 sm:p-12 rounded-3xl bg-[#1e1140] text-center max-w-3xl mx-auto mb-16 shadow-[8px_8px_0px_#000]">
            <div className="w-20 h-20 rounded-2xl bg-amber-400 border-3 border-black text-black flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_#000] -rotate-6">
              <Clock className="w-10 h-10" />
            </div>

            <span className="inline-block px-4 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-xs font-mono text-amber-300 tracking-widest uppercase mb-3">
              OFFICIAL ANNOUNCEMENT • {FEST_CONFIG.shortInstitution}
            </span>

            <h3 className="text-3xl sm:text-5xl md:text-6xl font-carter text-white tracking-wide uppercase drop-shadow-[4px_4px_0px_#000]">
              TO BE DECIDED <span className="text-amber-400">SHORTLY</span>
            </h3>

            <p className="font-chewy text-lg sm:text-2xl text-purple-200 mt-4 leading-relaxed max-w-xl mx-auto">
              The official organizing committee, student coordinators, and faculty advisors for AARAMBH 2.0 are currently being finalized and will be revealed shortly!
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-purple-300">
              <span className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10">🎓 LNJPIT Chapra</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10">🎪 Batch 2026</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold">📢 Nominations In Progress</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Committee Wings Roadmap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {COMMITTEE_WINGS.map((wing, idx) => {
            const IconComponent = wing.icon;
            return (
              <ScrollReveal
                key={wing.title}
                direction="up"
                distance={28}
                delay={(idx % 4) * 80}
                rotate={wing.rotation}
              >
                <div
                  className="comic-box p-5 rounded-3xl bg-[#1e1140] hover:rotate-0 hover:scale-105 active:scale-95 transition-all group flex flex-col justify-between h-full"
                >
                  {/* Tape Sticker at Top */}
                  <div className="w-16 h-4 bg-amber-200/40 border border-black/50 -rotate-3 mx-auto -mt-7 mb-3 shadow-[1px_1px_0px_#000]" />

                  {/* Stylized Avatar Badge Area */}
                  <div
                    className={`relative w-full aspect-square rounded-2xl overflow-hidden border-3 border-black mb-4 bg-gradient-to-br ${wing.gradient} shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-4`}
                  >
                    {/* Comic Halftone Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_1.5px,transparent_1.5px)] bg-[size:10px_10px] pointer-events-none" />

                    {/* Top Tag */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-black font-carter text-[10px] tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000]"
                        style={{ backgroundColor: wing.tagColor }}
                      >
                        {wing.tag}
                      </span>
                    </div>

                    {/* Center TBD Emblem */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-black/40 border-3 border-amber-300 flex items-center justify-center shadow-[4px_4px_0px_#000] group-hover:scale-110 transition-transform">
                        <span className="font-carter text-2xl sm:text-3xl text-white tracking-widest drop-shadow-[2px_2px_0px_#000]">
                          TBD
                        </span>
                      </div>
                    </div>

                    {/* Bottom Icon Badge */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 p-1.5 rounded-xl bg-black/60 border border-white/20 text-white shadow-[2px_2px_0px_#000]">
                      <IconComponent className="w-4 h-4 text-amber-300" />
                    </div>
                  </div>

                  {/* Info Details */}
                  <div className="text-left px-1">
                    <h3 className="font-carter text-xl text-amber-400 tracking-wide">
                      To be decided shortly
                    </h3>
                    <p className="text-xs font-sans text-purple-200 mt-1 font-medium leading-relaxed">
                      {wing.title}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-purple-300">
                      <span className="text-purple-300 font-bold">{wing.department}</span>
                      <span className="text-white/60">LNJPIT</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
