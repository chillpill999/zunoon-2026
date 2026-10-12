'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Sparkles,
  Trophy,
  ArrowRight,
  Play,
  Volume2,
  VolumeX,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 800);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let rafId: number | null = null;
    let mobilePlayed = false;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!video || !container) {
          rafId = null;
          return;
        }

        const rect = container.getBoundingClientRect();
        const totalScroll = rect.height - window.innerHeight;
        const scrolled = -rect.top;

        if (rect.top <= 0 && scrolled <= totalScroll) {
          const progress = Math.max(0, Math.min(scrolled / totalScroll, 1));
          setScrollProgress(progress);

          if (!isMobile && video.duration) {
            // Smoothly scrub video time based on scroll progress
            video.currentTime = video.duration * progress;
          }
        } else if (rect.top > 0) {
          setScrollProgress(0);
          if (!isMobile && video.duration) {
            video.currentTime = 0;
          }
        } else if (scrolled > totalScroll) {
          setScrollProgress(1);
          if (!isMobile && video.duration) {
            video.currentTime = video.duration;
          }
        }

        // Mobile autoplay when scrolled into view
        if (isMobile) {
          if (rect.top <= 0 && !mobilePlayed) {
            mobilePlayed = true;
            video.currentTime = 0;
            video.play().catch(() => {});
          } else if (rect.top > 0 && mobilePlayed) {
            mobilePlayed = false;
            video.pause();
            video.currentTime = 0;
          }
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const videoSrc = isMobile ? '/home_mob.mp4' : '/home.mp4';

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: isMobile ? '280vh' : '420vh', backgroundColor: '#000000' }}
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Cinematic Scroll-Scrubbed Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Ambient Darkened Gradient at Top for Navbar Contrast */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

        {/* PHASE 1 OVERLAY (0% to 25% Scroll): Main Hero Branding & Call-to-Actions */}
        <div
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto transition-all duration-300 pointer-events-auto"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 4.5),
            transform: `translateY(${-scrollProgress * 100}px) scale(${1 - scrollProgress * 0.15})`,
            pointerEvents: scrollProgress > 0.2 ? 'none' : 'auto',
          }}
        >
          {/* Floating Retro Decorative Badges */}
          <div className="absolute -top-12 left-0 sm:left-6 hidden sm:flex items-center gap-2 px-4 py-2 bg-pink-500 text-white font-carter text-xs sm:text-sm rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] -rotate-12 animate-float">
            <GraduationCap className="w-4 h-4" /> BATCH 2026 WELCOME
          </div>

          <div className="absolute -top-6 right-0 sm:right-8 hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-400 text-black font-carter text-xs sm:text-sm rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] rotate-12 animate-float">
            <Trophy className="w-4 h-4 text-black" /> MR. & MS. FRESHERS
          </div>

          {/* College & Edition Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border-2 border-amber-400/80 backdrop-blur-md mb-4 shadow-[3px_3px_0px_#000] -rotate-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-carter text-xs sm:text-sm text-amber-300 tracking-wider uppercase">
              {FEST_CONFIG.institution} • {FEST_CONFIG.location}
            </span>
          </div>

          {/* Grand 3D Festival Title */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-carter tracking-wide text-white drop-shadow-[8px_8px_0px_#000000] uppercase leading-none select-none">
            ZUN<span className="text-amber-400">OO</span>N
          </h1>

          {/* Tagline */}
          <p className="mt-3 text-lg sm:text-2xl md:text-3xl font-chewy text-amber-200 tracking-wide max-w-2xl drop-shadow-[2px_2px_0px_#000]">
            {FEST_CONFIG.tagline}
          </p>

          {/* Status Badge */}
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono text-purple-200 bg-black/75 px-5 py-2 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{FEST_CONFIG.dateStatus}</span>
            </span>
            <span className="text-white/40">•</span>
            <span>{FEST_CONFIG.venueStatus}</span>
            <span className="text-white/40">•</span>
            <span className="text-emerald-400 font-bold">100% FREE PASSES</span>
          </div>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <a
              href="#register"
              className="comic-btn px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-base sm:text-lg uppercase tracking-wide flex items-center gap-2 -rotate-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>GET FREE PASS</span>
            </a>

            <a
              href="#about"
              className="comic-btn px-7 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-carter text-base sm:text-lg uppercase tracking-wide flex items-center gap-2 rotate-2"
            >
              <span>EXPLORE FEST</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <button
              onClick={() => {
                sessionStorage.removeItem('zunoon_intro_seen');
                window.dispatchEvent(new CustomEvent('replay-zunoon-intro'));
              }}
              className="comic-btn px-5 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-carter text-sm sm:text-base uppercase tracking-wide flex items-center gap-2 -rotate-1 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>REPLAY INTRO</span>
            </button>
          </div>
        </div>

        {/* PHASE 2 OVERLAY (30% to 60% Scroll): Cassette Tape & Horn OK Please Milestone */}
        <div
          className="absolute z-20 bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-all duration-300 px-4"
          style={{
            opacity:
              scrollProgress >= 0.28 && scrollProgress <= 0.62
                ? Math.sin(((scrollProgress - 0.28) / 0.34) * Math.PI)
                : 0,
            transform: `translate(-50%, ${
              scrollProgress < 0.45 ? 20 - (scrollProgress - 0.28) * 40 : -((scrollProgress - 0.45) * 40)
            }px)`,
          }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-black/85 border-3 border-amber-400 text-white font-carter text-sm sm:text-lg shadow-[6px_6px_0px_#000] -rotate-1">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <span className="text-amber-300">SIDE A:</span>
            <span className="tracking-wide">HORN OK PLEASE • CASSETTE MIXTAPE 2026</span>
          </div>
        </div>

        {/* PHASE 3 OVERLAY (68% to 98% Scroll): Tata Truck Back Milestone */}
        <div
          className="absolute z-20 bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-all duration-300 px-4"
          style={{
            opacity:
              scrollProgress >= 0.68 && scrollProgress <= 0.98
                ? Math.sin(((scrollProgress - 0.68) / 0.3) * Math.PI)
                : 0,
            transform: `translate(-50%, ${
              scrollProgress < 0.83 ? 20 - (scrollProgress - 0.68) * 40 : -((scrollProgress - 0.83) * 40)
            }px)`,
          }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-6 py-2.5 rounded-2xl bg-black/85 border-3 border-rose-500 text-white font-carter text-sm sm:text-lg shadow-[6px_6px_0px_#000] rotate-1">
            <span className="text-amber-400">BURA NA MANO FRESHERS HAI</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="text-rose-400">SAFAR LNJPIT VERSE</span>
          </div>
        </div>

        {/* Bottom Scroll Prompt Indicator */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none transition-opacity duration-300"
          style={{ opacity: scrollProgress < 0.08 ? 1 : Math.max(0, 1 - scrollProgress * 15) }}
        >
          <span className="font-mono text-[11px] font-bold text-amber-300/90 tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_#000]">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-5 h-5 text-amber-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
