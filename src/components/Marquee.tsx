'use client';

import { Sparkles, Ticket, Trophy, Music, Zap, Theater, Disc3, Mail } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

interface MarqueeTickerItem {
  icon: typeof Sparkles;
  label: string;
  sub: string;
  color: string;
  borderColor: string;
}

const FESTIVAL_HIGHLIGHTS: MarqueeTickerItem[] = [
  {
    icon: Ticket,
    label: '100% FREE PASSES',
    sub: 'Class of 2026 Induction',
    color: 'text-amber-300',
    borderColor: 'border-amber-400/40',
  },
  {
    icon: Trophy,
    label: 'MR. & MS. FRESHERS',
    sub: 'Signature Stage Pageant',
    color: 'text-rose-400',
    borderColor: 'border-rose-400/40',
  },
  {
    icon: Music,
    label: 'SUR SARGAM ACOUSTIC',
    sub: 'Voice of LNJPIT Battle',
    color: 'text-cyan-300',
    borderColor: 'border-cyan-400/40',
  },
  {
    icon: Zap,
    label: 'BEAT DROP DANCE',
    sub: 'High-Voltage Crews',
    color: 'text-pink-400',
    borderColor: 'border-pink-400/40',
  },
  {
    icon: Theater,
    label: 'AWAAZ: STREET DRAMA',
    sub: 'Central Quad Natak',
    color: 'text-red-400',
    borderColor: 'border-red-400/40',
  },
  {
    icon: Disc3,
    label: 'EUPHORIA DJ NIGHT',
    sub: 'Open Air Amphitheatre',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400/40',
  },
  {
    icon: Mail,
    label: 'PARTNERSHIP DESK',
    sub: 'zunoon.lnjpit@gmail.com',
    color: 'text-purple-300',
    borderColor: 'border-purple-400/40',
  },
];

export default function Marquee() {
  return (
    <section className="w-full py-8 bg-[#0d041a] border-y-4 border-black overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-4 text-center mb-5">
        <span className="font-carter text-xs sm:text-sm tracking-widest uppercase text-amber-400 bg-black/60 px-4 py-1.5 rounded-full border border-amber-400/40 shadow-[2px_2px_0px_#000]">
          FESTIVAL PULSE • {FEST_CONFIG.shortInstitution}
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex">
        {/* Continuous Continuous Marquee Ribbon */}
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 px-4">
          {[...FESTIVAL_HIGHLIGHTS, ...FESTIVAL_HIGHLIGHTS].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#180a2e] border-2 border-black ${item.borderColor} shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform flex-shrink-0`}
              >
                <div className="w-9 h-9 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
                  <IconComponent className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="text-left">
                  <p className={`text-xs font-carter tracking-wide uppercase ${item.color}`}>
                    {item.label}
                  </p>
                  <p className="text-[10px] font-mono text-purple-200/80 uppercase">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
