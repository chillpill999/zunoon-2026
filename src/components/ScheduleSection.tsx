'use client';

import { Clock, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { FEST_SCHEDULE } from '@/data/schedule';
import { FEST_CONFIG } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

export default function ScheduleSection() {
  return (
    <section id="schedule" className="py-20 px-4 sm:px-8 max-w-5xl mx-auto relative">
      <ScrollReveal direction="up" distance={24}>
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-black border-2 border-black text-xs font-carter tracking-widest uppercase shadow-[3px_3px_0px_#000] -rotate-1 mb-3">
            <Clock className="w-3.5 h-3.5" />
            OFFICIAL SCHEDULE • 1 NOVEMBER 2026 (5 PM – 10 PM)
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000] mt-1">
            CHRONOLOGY OF <span className="text-amber-400">CELEBRATION</span>
          </h2>
          <p className="font-chewy text-xl text-purple-200 mt-2 max-w-xl mx-auto">
            All flagship stage events are scheduled on 1st November 2026 from 5:00 PM to 10:00 PM at the Main LNJPIT Ground.
          </p>
        </div>
      </ScrollReveal>

      {/* Official Schedule & Date Notice Banner */}
      <ScrollReveal direction="up" distance={20} delay={80}>
        <div className="mb-12 p-6 sm:p-7 rounded-3xl bg-[#1d103d] border-3 border-amber-400 shadow-[6px_6px_0px_#000] max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-black border-2 border-black flex items-center justify-center shrink-0 -rotate-3 shadow-[2px_2px_0px_#000]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-carter text-sm sm:text-base text-amber-300 tracking-wide uppercase">
                  OFFICIAL FESTIVAL DATES & SCHEDULE ANNOUNCED
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-black font-carter text-[10px] uppercase border border-black shadow-[1px_1px_0px_#000]">
                  CONFIRMED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-purple-100 mt-1 leading-relaxed">
                Aarambh 2.0 is officially announced from <strong className="text-amber-300">30th October to 1st November 2026</strong>! All marquee stage celebrations of the Chronology of Celebration are scheduled on <strong className="text-amber-300">1st November from 5:00 PM to 10:00 PM</strong> at the Main LNJPIT Ground, Chapra.
              </p>
              <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-purple-300">
                <span className="flex items-center gap-1.5 text-amber-300 font-bold bg-black/60 px-3 py-1 rounded-xl border border-white/10 shadow-[1px_1px_0px_#000]">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>30 OCT – 1 NOV 2026</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-300 font-bold bg-black/60 px-3 py-1 rounded-xl border border-white/10 shadow-[1px_1px_0px_#000]">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1 NOV • 5:00 PM – 10:00 PM</span>
                </span>
                <span className="flex items-center gap-1.5 text-purple-200 bg-black/60 px-3 py-1 rounded-xl border border-white/10 shadow-[1px_1px_0px_#000]">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Main LNJPIT Ground</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Vertical Timeline */}
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
              <span className="inline-block px-2.5 py-1 rounded-lg bg-black/75 border border-white/20 font-mono text-[11px] font-bold text-amber-300 shadow-[2px_2px_0px_#000]">
                {slot.time}
              </span>
            </div>

            {/* Event Box */}
            <div className="comic-box p-5 sm:p-6 rounded-2xl bg-[#170e35] hover:scale-[1.01] active:scale-[0.99] transition-transform border-3 border-black shadow-[6px_6px_0px_#000]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-black font-carter text-[10px] uppercase border border-black shadow-[1px_1px_0px_#000]"
                    style={{ backgroundColor: slot.color }}
                  >
                    {slot.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-400 text-black border border-black text-[9px] font-carter tracking-wider uppercase shadow-[1px_1px_0px_#000]">
                    CONFIRMED
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-500/30 text-[9px] font-mono">
                    1 NOV
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
