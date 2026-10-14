'use client';

import { Clock, MapPin, AlertCircle, Calendar } from 'lucide-react';
import { FEST_SCHEDULE } from '@/data/schedule';
import { FEST_CONFIG } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

export default function ScheduleSection() {
  return (
    <section id="schedule" className="py-20 px-4 sm:px-8 max-w-5xl mx-auto relative">
      <ScrollReveal direction="up" distance={24}>
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 rounded-full bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold tracking-widest uppercase">
            TENTATIVE ITINERARY • SUBJECT TO APPROVAL
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000] mt-3">
            CHRONOLOGY OF CELEBRATION
          </h2>
          <p className="font-chewy text-xl text-purple-200 mt-2 max-w-xl mx-auto">
            From morning lamp lighting to the freshers DJ night. Proposed timeline outline below.
          </p>
        </div>
      </ScrollReveal>

      {/* Official Schedule & Date Notice Banner */}
      <ScrollReveal direction="up" distance={20} delay={80}>
        <div className="mb-12 p-6 rounded-3xl bg-[#1d103d] border-3 border-amber-400/80 shadow-[6px_6px_0px_#000] max-w-3xl mx-auto">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-black border-2 border-black flex items-center justify-center shrink-0 -rotate-3 shadow-[2px_2px_0px_#000]">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-carter text-sm text-amber-300 tracking-wide uppercase block">
                OFFICIAL SCHEDULE & DATE ANNOUNCEMENT
              </span>
              <p className="text-xs sm:text-sm font-sans text-purple-100 mt-1.5 leading-relaxed">
                {FEST_CONFIG.scheduleAnnouncement}
              </p>
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-[11px] font-mono text-purple-300">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{FEST_CONFIG.dateStatus}</span>
                </span>
                <span className="text-white/40">•</span>
                <span>{FEST_CONFIG.venueStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="relative border-l-4 border-black ml-4 sm:ml-32 space-y-8">
        {FEST_SCHEDULE.map((slot, idx) => (
          <ScrollReveal
            key={idx}
            direction="left"
            distance={24}
            delay={(idx % 5) * 80}
            className="relative pl-6 sm:pl-8 group"
          >
            {/* Timeline node sticker */}
            <div
              className="absolute -left-[14px] top-4 w-6 h-6 rounded-full border-3 border-black shadow-[2px_2px_0px_#000] transition-transform group-hover:scale-125 group-active:scale-125"
              style={{ backgroundColor: slot.color }}
            />

            {/* Time label badge (left on desktop, top on mobile) */}
            <div className="sm:absolute sm:-left-36 sm:top-3 sm:w-28 text-left sm:text-right mb-2 sm:mb-0">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-black/60 border border-white/20 font-mono text-[11px] font-bold text-amber-300 shadow-[2px_2px_0px_#000]">
                {slot.time}
              </span>
            </div>

            {/* Event Box */}
            <div className="comic-box p-5 sm:p-6 rounded-2xl bg-[#170e35] hover:scale-[1.01] active:scale-[0.99] transition-transform">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-black font-carter text-[10px] uppercase border border-black shadow-[1px_1px_0px_#000]"
                    style={{ backgroundColor: slot.color }}
                  >
                    {slot.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/40 text-[9px] font-mono font-bold uppercase">
                    PROPOSED
                  </span>
                </div>
                <span className="text-[11px] font-mono text-purple-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{slot.venue}</span>
                </span>
              </div>

              <h3 className="font-carter text-xl sm:text-2xl text-white tracking-wide">
                {slot.title}
              </h3>

              <p className="text-xs sm:text-sm text-purple-200/80 mt-2 font-sans leading-relaxed">
                {slot.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
