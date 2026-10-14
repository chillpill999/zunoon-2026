'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  MapPin,
  Ticket,
  Trophy,
  ArrowRight,
  Play,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [blobSrc, setBlobSrc] = useState<string | null>(null);

  // Detect screen size for adaptive asset selection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 800);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload video into Blob URL for instant zero-latency frame scrubbing on mobile & PC
  useEffect(() => {
    let active = true;
    const target = isMobile ? '/home_mob.mp4' : '/home.mp4';
    fetch(target)
      .then((res) => res.blob())
      .then((blob) => {
        if (!active) return;
        const url = URL.createObjectURL(blob);
        setBlobSrc(url);
      })
      .catch((err) => {
        console.warn('Video blob preload error, falling back to direct stream:', err);
      });

    return () => {
      active = false;
      if (blobSrc) URL.revokeObjectURL(blobSrc);
    };
  }, [isMobile]);

  // Unified 60fps Scroll-Scrubbing Controller for Mobile & Desktop
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!video || !container) {
          rafId = null;
          return;
        }

        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const totalScroll = rect.height - viewportHeight;
        const scrolled = -rect.top;

        if (rect.top <= 0 && scrolled <= totalScroll) {
          const progress = Math.max(0, Math.min(scrolled / totalScroll, 1));
          setScrollProgress(progress);

          // Scrub video frame in exact 1:1 synchronization with scroll progress
          if (video.duration && Number.isFinite(video.duration)) {
            const targetTime = video.duration * progress;
            if (Math.abs(video.currentTime - targetTime) > 0.015) {
              if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
                (video as any).fastSeek(targetTime);
              } else {
                video.currentTime = targetTime;
              }
            }
          }
        } else if (rect.top > 0) {
          setScrollProgress(0);
          if (video.duration && Number.isFinite(video.duration)) {
            video.currentTime = 0;
          }
        } else if (scrolled > totalScroll) {
          setScrollProgress(1);
          if (video.duration && Number.isFinite(video.duration)) {
            video.currentTime = video.duration;
          }
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial sync
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [blobSrc, isMobile]);

  const fallbackSrc = isMobile ? '/home_mob.mp4' : '/home.mp4';

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: isMobile ? '390vh' : '420vh',
        backgroundColor: '#000000',
      }}
    >
      {/* Sticky Pinned Viewport Container (100dvh for mobile address bar stability) */}
      <div className="sticky top-0 left-0 w-full h-screen min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
        {/* Cinematic Scroll-Scrubbed Video Element */}
        <video
          ref={videoRef}
          src={blobSrc || fallbackSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none will-change-contents"
        />

        {/* Ambient Darkened Gradient at Top for Navbar Contrast */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

        {/* PHASE 1 OVERLAY (0% to 25% Scroll): Main Hero Branding & Call-to-Actions */}
        <div
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto transition-all duration-300 pointer-events-auto"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 4.2),
            transform: `translateY(${-scrollProgress * 120}px) scale(${1 - scrollProgress * 0.12})`,
            pointerEvents: scrollProgress > 0.22 ? 'none' : 'auto',
          }}
        >
          {/* Floating Retro Decorative Badges (Visible & scaled on both Mobile & Desktop) */}
          <div className="absolute -top-10 sm:-top-12 left-1 sm:left-6 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 bg-pink-500 text-white font-carter text-[10px] sm:text-sm rounded-xl sm:rounded-2xl border-2 sm:border-3 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] -rotate-12 animate-float pointer-events-none z-30">
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>BATCH 2026</span>
          </div>

          <div className="absolute -top-7 sm:-top-6 right-1 sm:right-8 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 bg-amber-400 text-black font-carter text-[10px] sm:text-sm rounded-xl sm:rounded-2xl border-2 sm:border-3 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] rotate-12 animate-float pointer-events-none z-30">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
            <span>MR. & MS. FRESHERS</span>
          </div>

          {/* College & Edition Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/70 border-2 border-amber-400/80 backdrop-blur-md mb-3 sm:mb-4 shadow-[3px_3px_0px_#000] -rotate-1 max-w-[92vw]">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-carter text-[11px] sm:text-sm text-amber-300 tracking-wider uppercase truncate">
              {FEST_CONFIG.shortInstitution} • {FEST_CONFIG.location}
            </span>
          </div>

          {/* Grand 3D Festival Title */}
          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-carter tracking-wide text-white drop-shadow-[6px_6px_0px_#000000] sm:drop-shadow-[8px_8px_0px_#000000] uppercase leading-none select-none">
            AARAMBH <span className="text-amber-400">2.0</span>
          </h1>

          {/* Tagline */}
          <p className="mt-2.5 sm:mt-3 text-base sm:text-2xl md:text-3xl font-chewy text-amber-200 tracking-wide max-w-2xl drop-shadow-[2px_2px_0px_#000]">
            {FEST_CONFIG.tagline}
          </p>

          {/* Status Badge */}
          <div className="mt-3 sm:mt-4 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-sm font-mono text-purple-200 bg-black/80 px-4 sm:px-5 py-2 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000]">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{FEST_CONFIG.dateStatus}</span>
            </span>
            <span className="text-white/40">•</span>
            <span>{FEST_CONFIG.venueStatus}</span>
            <span className="text-white/40">•</span>
            <span className="text-emerald-400 font-bold">100% FREE PASSES</span>
          </div>

          {/* Call to Actions */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
            <a
              href="#register"
              className="comic-btn px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-sm sm:text-lg uppercase tracking-wide flex items-center justify-center gap-2 -rotate-1 sm:-rotate-2 min-h-[48px]"
            >
              <Ticket className="w-5 h-5 shrink-0" />
              <span>GET FREE PASS</span>
            </a>

            <a
              href="#about"
              className="comic-btn px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-carter text-sm sm:text-lg uppercase tracking-wide flex items-center justify-center gap-2 rotate-1 sm:rotate-2 min-h-[48px]"
            >
              <span>EXPLORE FEST</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </a>

            <button
              onClick={() => {
                sessionStorage.removeItem('aarambh_intro_seen');
                sessionStorage.removeItem('zunoon_intro_seen');
                window.dispatchEvent(new CustomEvent('replay-aarambh-intro'));
              }}
              className="comic-btn px-5 py-3 sm:py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-carter text-xs sm:text-base uppercase tracking-wide flex items-center justify-center gap-2 -rotate-1 cursor-pointer min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-white shrink-0" />
              <span>REPLAY INTRO</span>
            </button>
          </div>
        </div>

        {/* PHASE 2 OVERLAY (28% to 62% Scroll): Cassette Tape & Horn OK Please Milestone */}
        <div
          className="absolute z-20 bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-all duration-300 px-4 w-full max-w-xl"
          style={{
            opacity:
              scrollProgress >= 0.26 && scrollProgress <= 0.62
                ? Math.sin(((scrollProgress - 0.26) / 0.36) * Math.PI)
                : 0,
            transform: `translate(-50%, ${
              scrollProgress < 0.44 ? 24 - (scrollProgress - 0.26) * 50 : -((scrollProgress - 0.44) * 50)
            }px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl bg-black/90 border-3 border-amber-400 text-white font-carter text-xs sm:text-lg shadow-[6px_6px_0px_#000] -rotate-1 max-w-[94vw]">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 animate-ping shrink-0" />
            <span className="text-amber-300 shrink-0">SIDE A:</span>
            <span className="tracking-wide truncate">HORN OK PLEASE • CASSETTE MIXTAPE 2026</span>
          </div>
        </div>

        {/* PHASE 3 OVERLAY (66% to 98% Scroll): Tata Truck Back Milestone */}
        <div
          className="absolute z-20 bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-all duration-300 px-4 w-full max-w-xl"
          style={{
            opacity:
              scrollProgress >= 0.66 && scrollProgress <= 0.98
                ? Math.sin(((scrollProgress - 0.66) / 0.32) * Math.PI)
                : 0,
            transform: `translate(-50%, ${
              scrollProgress < 0.82 ? 24 - (scrollProgress - 0.66) * 50 : -((scrollProgress - 0.82) * 50)
            }px)`,
          }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl bg-black/90 border-3 border-rose-500 text-white font-carter text-xs sm:text-lg shadow-[6px_6px_0px_#000] rotate-1 max-w-[94vw]">
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
          <span className="font-mono text-[11px] font-bold text-amber-300/90 tracking-widest uppercase bg-black/70 px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_#000]">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-5 h-5 text-amber-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
