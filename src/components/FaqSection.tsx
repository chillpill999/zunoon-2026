'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '@/data/faq';
import ScrollReveal from '@/components/ScrollReveal';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-8 max-w-4xl mx-auto relative">
      <ScrollReveal direction="up" distance={24}>
        <div className="text-center mb-14">
          <span className="px-4 py-1 rounded-full bg-cyan-400 text-black border-2 border-black text-xs font-carter tracking-widest uppercase shadow-[2px_2px_0px_#000]">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000] mt-3">
            FREQUENTLY ASKED
          </h2>
          <p className="font-chewy text-xl text-purple-200 mt-2">
            Everything freshers and seniors need to know before stepping into Zunoon.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <ScrollReveal
              key={idx}
              direction="up"
              distance={20}
              delay={(idx % 6) * 60}
            >
              <div
                className="comic-box rounded-2xl bg-[#170e35] overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-carter text-base sm:text-lg text-white hover:text-amber-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-amber-400 border border-amber-400/30">
                      {faq.tag}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-purple-100/90 font-sans leading-relaxed border-t border-white/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
