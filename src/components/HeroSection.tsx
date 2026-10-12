'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Sparkles, Trophy, ArrowRight, Play, Flame, Star, GraduationCap } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

export default function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-8 pb-20 max-w-6xl mx-auto">
      {/* Floating Retro Decorative Badges */}
      <div className="absolute top-2 left-4 sm:left-10 hidden sm:flex items-center gap-2 px-4 py-2 bg-pink-500 text-white font-carter text-xs sm:text-sm rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] -rotate-12 animate-float">
        <GraduationCap className="w-4 h-4" /> BATCH 2026 WELCOME
      </div>

      <div className="absolute top-8 right-4 sm:right-12 hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-400 text-black font-carter text-xs sm:text-sm rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] rotate-12 animate-float">
        <Trophy className="w-4 h-4 text-black" /> MR. & MS. FRESHERS
      </div>

      <div className="absolute bottom-16 left-8 hidden lg:flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black font-carter text-xs rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] rotate-6 animate-float">
        <Sparkles className="w-4 h-4" /> 100% FREE REGISTRATION
      </div>

      {/* College & Edition Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border-2 border-black/80 backdrop-blur-md mb-6 shadow-[3px_3px_0px_#000] -rotate-1">
        <MapPin className="w-3.5 h-3.5 text-amber-400" />
        <span className="font-carter text-xs sm:text-sm text-amber-300 tracking-wider uppercase">
          {FEST_CONFIG.institution} • {FEST_CONFIG.location}
        </span>
      </div>

      {/* Grand Title */}
      <h1 className="text-6xl sm:text-8xl md:text-9xl font-carter tracking-wide text-white drop-shadow-[7px_7px_0px_#000000] uppercase leading-none select-none">
        ZUN<span className="text-amber-400">OO</span>N
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-chewy text-purple-200 tracking-wide max-w-2xl drop-shadow-[2px_2px_0px_#000]">
        {FEST_CONFIG.tagline}
      </p>

      {/* Date & Venue Status Banner */}
      <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono text-purple-300 bg-black/60 px-5 py-2.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
        <span className="flex items-center gap-1.5 text-amber-300 font-bold">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>{FEST_CONFIG.dateStatus}</span>
        </span>
        <span className="text-white/40">•</span>
        <span>{FEST_CONFIG.venueStatus}</span>
      </div>

      {/* Primary & Secondary Call to Actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a
          href="#register"
          className="comic-btn px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-base sm:text-lg uppercase tracking-wide flex items-center gap-2 -rotate-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>REGISTER FOR FREE</span>
        </a>

        <a
          href="#activities"
          className="comic-btn px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-carter text-base sm:text-lg uppercase tracking-wide flex items-center gap-2 rotate-2"
        >
          <span>EXPLORE ZUNOON</span>
          <ArrowRight className="w-5 h-5" />
        </a>

        <button
          onClick={() => {
            sessionStorage.removeItem('zunoon_intro_seen');
            window.dispatchEvent(new CustomEvent('replay-zunoon-intro'));
          }}
          className="comic-btn px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-carter text-sm sm:text-base uppercase tracking-wide flex items-center gap-2 -rotate-1 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>REPLAY INTRO</span>
        </button>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_#000]">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 px-3.5 py-1.5 bg-rose-600 text-white font-carter text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              CLOSE ✕
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/jLDfGh_0Wjs?autoplay=1"
              title="Zunoon Campus Teaser"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
