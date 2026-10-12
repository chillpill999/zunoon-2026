'use client';

import Image from 'next/image';

const SPONSOR_LOGOS = [
  { name: 'Sponsor 1', src: '/assets/logo1.png', tier: 'Title Partner' },
  { name: 'Sponsor 2', src: '/assets/logo2.png', tier: 'Powered By' },
  { name: 'Sponsor 3', src: '/assets/logo3.png', tier: 'Audio Partner' },
  { name: 'Sponsor 4', src: '/assets/logo4.png', tier: 'Youth Partner' },
  { name: 'Sponsor 5', src: '/assets/logo5.png', tier: 'Beverage Partner' },
  { name: 'Partner Alpha', src: '/assets/sponsor_qq.png', tier: 'Media Partner' },
  { name: 'Partner Beta', src: '/assets/sponsor_ww.png', tier: 'Gaming Partner' },
];

export default function Marquee() {
  return (
    <section className="w-full py-10 bg-[#0d041a] border-y-4 border-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <span className="font-carter text-xs sm:text-sm tracking-widest uppercase text-amber-400 bg-black/60 px-4 py-1.5 rounded-full border border-amber-400/40 shadow-[2px_2px_0px_#000]">
          OFFICIAL FESTIVAL PARTNERS & SPONSORS
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex select-none">
        {/* Infinite Continuous Marquee Ribbon */}
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 px-4">
          {[...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS].map((sponsor, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-[#180a2e] border-2 border-black shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform flex-shrink-0"
            >
              <div className="relative w-20 h-10 flex items-center justify-center">
                <Image
                  src={sponsor.src}
                  alt={sponsor.name}
                  width={80}
                  height={40}
                  className="max-h-8 w-auto object-contain brightness-95 contrast-125"
                />
              </div>
              <div className="border-l border-white/20 pl-3">
                <p className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-bold">
                  {sponsor.tier}
                </p>
                <p className="text-[9px] font-sans text-purple-300/80 uppercase">
                  ZUNOON 2026
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
