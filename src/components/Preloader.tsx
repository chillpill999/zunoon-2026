'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

type Stage = 'wordmark' | 'entry-screen' | 'complete';

interface FloatingWord {
  id: string;
  text: string;
  x: string;
  y: string;
  size: string;
  color: string;
  opacity: number;
  rotation: number;
  blur: string;
  driftClass: string;
  duration: string;
  depth: number;
}

// Data-driven Devanagari floating typography (words related to youth, celebration, dreams, and festivity)
const FLOATING_WORDS: FloatingWord[] = [
  // Top-Left Zone
  {
    id: 'w-aarambh',
    text: 'आरंभ',
    x: '11%',
    y: '14%',
    size: 'text-4xl sm:text-6xl',
    color: '#eab308', // mustard yellow
    opacity: 0.85,
    rotation: -8,
    blur: '0px',
    driftClass: 'animate-drift-a',
    duration: '14s',
    depth: 26,
  },
  {
    id: 'w-shuruwaat',
    text: 'शुरुआत',
    x: '31%',
    y: '17%',
    size: 'text-xl sm:text-3xl',
    color: '#f5f5f4', // off-white
    opacity: 0.52,
    rotation: 6,
    blur: '1.5px',
    driftClass: 'animate-drift-b',
    duration: '18s',
    depth: 18,
  },
  {
    id: 'w-aa',
    text: 'आ',
    x: '6%',
    y: '30%',
    size: 'text-5xl sm:text-7xl',
    color: '#facc15', // gold
    opacity: 0.22,
    rotation: -15,
    blur: '3.5px',
    driftClass: 'animate-drift-c',
    duration: '22s',
    depth: 34,
  },

  // Top-Right Zone
  {
    id: 'w-jashn',
    text: 'जश्न',
    x: '78%',
    y: '15%',
    size: 'text-3xl sm:text-5xl',
    color: '#d4af37', // muted gold
    opacity: 0.8,
    rotation: 9,
    blur: '0px',
    driftClass: 'animate-drift-b',
    duration: '16s',
    depth: 24,
  },
  {
    id: 'w-sapne',
    text: 'सपने',
    x: '61%',
    y: '21%',
    size: 'text-2xl sm:text-4xl',
    color: '#e7e5e4', // off-white
    opacity: 0.55,
    rotation: -7,
    blur: '1px',
    driftClass: 'animate-drift-a',
    duration: '19s',
    depth: 20,
  },
  {
    id: 'w-rambh',
    text: 'रं',
    x: '89%',
    y: '27%',
    size: 'text-5xl sm:text-7xl',
    color: '#f59e0b', // amber
    opacity: 0.28,
    rotation: 12,
    blur: '4px',
    driftClass: 'animate-drift-c',
    duration: '21s',
    depth: 32,
  },

  // Mid-Left Zone (flanked away from central button)
  {
    id: 'w-safar',
    text: 'सफ़र',
    x: '13%',
    y: '48%',
    size: 'text-2xl sm:text-4xl',
    color: '#f5f5f4', // off-white
    opacity: 0.7,
    rotation: -5,
    blur: '0px',
    driftClass: 'animate-drift-c',
    duration: '17s',
    depth: 22,
  },
  {
    id: 'w-tarang',
    text: 'तरंग',
    x: '24%',
    y: '57%',
    size: 'text-lg sm:text-2xl',
    color: '#c59b27', // muted gold
    opacity: 0.42,
    rotation: 10,
    blur: '2px',
    driftClass: 'animate-drift-a',
    duration: '15s',
    depth: 16,
  },

  // Mid-Right Zone (flanked away from central button)
  {
    id: 'w-dosti',
    text: 'दोस्ती',
    x: '81%',
    y: '49%',
    size: 'text-3xl sm:text-5xl',
    color: '#eab308', // mustard yellow
    opacity: 0.76,
    rotation: 7,
    blur: '0px',
    driftClass: 'animate-drift-a',
    duration: '16s',
    depth: 24,
  },
  {
    id: 'w-umang',
    text: 'उमंग',
    x: '71%',
    y: '61%',
    size: 'text-lg sm:text-2xl',
    color: '#e7e5e4', // off-white
    opacity: 0.45,
    rotation: -10,
    blur: '2.5px',
    driftClass: 'animate-drift-b',
    duration: '20s',
    depth: 17,
  },

  // Bottom-Left Zone
  {
    id: 'w-yaadein',
    text: 'यादें',
    x: '12%',
    y: '78%',
    size: 'text-3xl sm:text-5xl',
    color: '#facc15', // gold
    opacity: 0.8,
    rotation: -8,
    blur: '0px',
    driftClass: 'animate-drift-b',
    duration: '15s',
    depth: 26,
  },
  {
    id: 'w-kahaani',
    text: 'कहानी',
    x: '30%',
    y: '82%',
    size: 'text-xl sm:text-3xl',
    color: '#d6d3d1', // off-white
    opacity: 0.5,
    rotation: 5,
    blur: '1.5px',
    driftClass: 'animate-drift-c',
    duration: '19s',
    depth: 19,
  },
  {
    id: 'w-na',
    text: 'न',
    x: '5%',
    y: '67%',
    size: 'text-6xl sm:text-8xl',
    color: '#d4af37', // muted gold
    opacity: 0.2,
    rotation: -14,
    blur: '5px',
    driftClass: 'animate-drift-a',
    duration: '25s',
    depth: 38,
  },

  // Bottom-Right Zone
  {
    id: 'w-aawaaz',
    text: 'आवाज़',
    x: '76%',
    y: '80%',
    size: 'text-3xl sm:text-5xl',
    color: '#f5f5f4', // off-white
    opacity: 0.7,
    rotation: 11,
    blur: '0px',
    driftClass: 'animate-drift-a',
    duration: '17s',
    depth: 23,
  },
  {
    id: 'w-pehchaan',
    text: 'पहचान',
    x: '57%',
    y: '83%',
    size: 'text-2xl sm:text-4xl',
    color: '#eab308', // mustard yellow
    opacity: 0.55,
    rotation: -4,
    blur: '1px',
    driftClass: 'animate-drift-c',
    duration: '18s',
    depth: 21,
  },
  {
    id: 'w-rang',
    text: 'रंग',
    x: '89%',
    y: '72%',
    size: 'text-5xl sm:text-7xl',
    color: '#c59b27', // muted gold
    opacity: 0.25,
    rotation: 16,
    blur: '4px',
    driftClass: 'animate-drift-b',
    duration: '22s',
    depth: 34,
  },
];

export default function Preloader() {
  const [stage, setStage] = useState<Stage>('wordmark');
  const [isMobile, setIsMobile] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wordsLayerRef = useRef<HTMLDivElement>(null);

  // Check device and session storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 800);
      const hasSeen = sessionStorage.getItem('aarambh_intro_seen') || sessionStorage.getItem('zunoon_intro_seen');
      if (hasSeen) {
        setStage('complete');
      }
    }

    // Global listener to replay intro whenever requested
    const handleReplay = () => {
      setIsTransitioningOut(false);
      setButtonHovered(false);
      if (containerRef.current) {
        gsap.set(containerRef.current, { opacity: 1, display: 'flex' });
      }
      setStage('wordmark');
    };

    window.addEventListener('replay-aarambh-intro', handleReplay);
    window.addEventListener('replay-zunoon-intro', handleReplay);
    return () => {
      window.removeEventListener('replay-aarambh-intro', handleReplay);
      window.removeEventListener('replay-zunoon-intro', handleReplay);
    };
  }, []);

  // Stage 1: Cinematic Wordmark -> auto-progress to Stage 2 after 3.8s
  useEffect(() => {
    if (stage !== 'wordmark') return;

    const timer = setTimeout(() => {
      setStage('entry-screen');
    }, 3800);

    return () => clearTimeout(timer);
  }, [stage]);

  // Pointer move handler for interactive Devanagari parallax in Stage 2
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const normalizedX = (clientX - centerX) / centerX;
    const normalizedY = (clientY - centerY) / centerY;
    setPointerOffset({ x: normalizedX, y: normalizedY });
  }, [isMobile]);

  // Stage 2: Click to Enter -> Transition into Stage 3 (Homepage)
  const handleEnterClick = () => {
    if (isTransitioningOut) return;
    setIsTransitioningOut(true);

    // 1. Tactile press animation on button
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.15,
        ease: 'power2.in',
      });
    }

    // 2. Coordinated outward drift and fade of floating Hindi words
    if (wordsLayerRef.current) {
      const wordElements = wordsLayerRef.current.querySelectorAll('.floating-deva-word');
      gsap.to(wordElements, {
        opacity: 0,
        scale: 0.85,
        y: '+=30',
        duration: 0.6,
        stagger: {
          each: 0.02,
          from: 'center',
        },
        ease: 'power3.in',
      });
    }

    // 3. Smooth curtain dissolve into the main homepage
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.85,
        delay: 0.25,
        ease: 'power2.inOut',
        onComplete: () => {
          sessionStorage.setItem('aarambh_intro_seen', 'true');
          sessionStorage.setItem('zunoon_intro_seen', 'true');
          setStage('complete');
        },
      });
    } else {
      sessionStorage.setItem('aarambh_intro_seen', 'true');
      sessionStorage.setItem('zunoon_intro_seen', 'true');
      setStage('complete');
    }
  };

  if (stage === 'complete') {
    return <div className="hidden" aria-hidden="true" />;
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={stage === 'entry-screen' ? handlePointerMove : undefined}
      className="fixed inset-0 z-[99999] w-screen h-screen bg-black text-white flex items-center justify-center overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* STAGE 1: CINEMATIC WORDMARK (AARAMBH 2.0 filled with moving festival footage)   */}
      {/* ========================================================================= */}
      {stage === 'wordmark' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4 bg-black animate-in fade-in duration-500">
          {/* Subtle Ambient Background Halo */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)] pointer-events-none" />

          {/* Large Video-Filled AARAMBH 2.0 Wordmark */}
          <div className="relative w-full max-w-5xl h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <svg
              className="w-full h-full drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]"
              viewBox="0 0 1000 320"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <mask id="aarambhWordmarkMask">
                  <rect width="1000" height="320" fill="black" />
                  <text
                    x="500"
                    y="185"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontFamily="'Carter One', 'Impact', sans-serif"
                    fontWeight="900"
                    fontSize="135"
                    letterSpacing="4"
                  >
                    AARAMBH 2.0
                  </text>
                </mask>
              </defs>

              {/* High-Energy Video Masked Inside AARAMBH 2.0 Letters */}
              <foreignObject width="1000" height="320" mask="url(#aarambhWordmarkMask)">
                <div className="w-full h-full">
                  <video
                    src={isMobile ? '/intro_mob.mp4' : '/intro.mp4'}
                    autoPlay
                    playsInline
                    muted
                    loop
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              </foreignObject>

              {/* Crisp Golden Border Outline */}
              <text
                x="500"
                y="185"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="#d4af37"
                strokeWidth="2.5"
                fontFamily="'Carter One', 'Impact', sans-serif"
                fontWeight="900"
                fontSize="135"
                letterSpacing="4"
              >
                AARAMBH 2.0
              </text>
            </svg>
          </div>

          {/* Subtitle */}
          <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
            <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-amber-400 uppercase">
              LNJPIT CHAPRA • FRESHERS FEST 2026
            </p>
            <p className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
              A New Chapter • One Campus • Endless Memories
            </p>
          </div>

          {/* Skip directly to Interactive Entry Screen */}
          <button
            onClick={() => setStage('entry-screen')}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-white/20 bg-black/60 hover:bg-black/90 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider backdrop-blur-md cursor-pointer transition-all"
          >
            Skip Intro →
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: INTERACTIVE ENTRY SCREEN (Black, Floating Devanagari, Button)     */}
      {/* ========================================================================= */}
      {stage === 'entry-screen' && (
        <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden animate-in fade-in duration-700">
          {/* Deep Black Void Background */}
          <div className="absolute inset-0 bg-black pointer-events-none" />

          {/* Layer of Scattered Floating Devanagari Typography */}
          <div ref={wordsLayerRef} className="absolute inset-0 pointer-events-none">
            {FLOATING_WORDS.map((item) => {
              // Calculate parallax translation response to pointer
              const translateX = pointerOffset.x * item.depth;
              const translateY = pointerOffset.y * item.depth;

              return (
                <div
                  key={item.id}
                  className={`floating-deva-word absolute font-devanagari select-none transition-transform duration-300 ease-out ${item.driftClass}`}
                  style={
                    {
                      left: item.x,
                      top: item.y,
                      color: item.color,
                      opacity: buttonHovered ? Math.min(1, item.opacity + 0.15) : item.opacity,
                      filter: `blur(${item.blur})`,
                      '--rot': `${item.rotation}deg`,
                      '--drift-duration': item.duration,
                      transform: `translate(${translateX}px, ${translateY}px) rotate(${item.rotation}deg)`,
                      willChange: 'transform, opacity',
                    } as React.CSSProperties
                  }
                >
                  <span className={`${item.size} block font-bold tracking-wide`}>
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Stage: Minimal, Refined CLICK TO ENTER Button */}
          <div className="relative z-30 flex flex-col items-center justify-center px-4">
            <button
              ref={buttonRef}
              type="button"
              onClick={handleEnterClick}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              className="group relative px-12 sm:px-16 py-4 sm:py-5 min-w-[260px] sm:min-w-[320px] rounded-[2px] bg-black/60 backdrop-blur-sm border border-neutral-600/80 hover:border-amber-400/90 active:scale-95 transition-all duration-500 ease-out overflow-hidden cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Click to Enter Aarambh 2.0 Freshers Fest Homepage"
            >
              {/* Soft Shimmer Light Beam that sweeps diagonally across on hover */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none skew-x-[-20deg]"
                aria-hidden="true"
              />

              {/* Controlled warm ambient fill on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-amber-400/[0.08] via-white/[0.04] to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Bold, Condensed White Uppercase Typography: CLICK TO ENTER */}
              <span className="relative z-10 block font-sans font-bold text-sm sm:text-base tracking-[0.25em] text-white uppercase group-hover:tracking-[0.32em] group-hover:text-amber-100 transition-all duration-300 select-none">
                CLICK TO ENTER
              </span>
            </button>

            {/* Subtle, non-distracting atmospheric footnote */}
            <p className="mt-5 text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase select-none">
              Sound Recommended • LNJPIT Chapra
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
