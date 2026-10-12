'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const INTRO_TEXT = 'THE ZUNOON UNIVERSE IS LOADING ';

type Stage = 'loader' | 'enter' | 'video' | 'complete';

export default function Preloader() {
  const [stage, setStage] = useState<Stage>('loader');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check device and session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 800);
      const hasSeen = sessionStorage.getItem('zunoon_intro_seen');
      if (hasSeen) {
        setStage('complete');
      }
    }

    // Allow replaying intro via custom event
    const handleReplay = () => {
      if (containerRef.current) {
        gsap.set(containerRef.current, { opacity: 1 });
      }
      setStage('loader');
    };
    window.addEventListener('replay-zunoon-intro', handleReplay);
    return () => window.removeEventListener('replay-zunoon-intro', handleReplay);
  }, []);

  // Stage 1: Loader -> Enter after 3.5s
  useEffect(() => {
    if (stage !== 'loader') return;

    const timer = setTimeout(() => {
      setStage('enter');
    }, 3500);

    return () => clearTimeout(timer);
  }, [stage]);

  // Stage 3: When video stage begins, play unmuted
  useEffect(() => {
    if (stage === 'video' && videoRef.current) {
      const vid = videoRef.current;
      vid.currentTime = 0;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay with sound restricted, playing muted:', err);
          vid.muted = true;
          vid.play().catch(() => {});
        });
      }
    }
  }, [stage]);

  const handleEnterClick = () => {
    setStage('video');
  };

  const handleFinish = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          sessionStorage.setItem('zunoon_intro_seen', 'true');
          setStage('complete');
        },
      });
    } else {
      sessionStorage.setItem('zunoon_intro_seen', 'true');
      setStage('complete');
    }
  };

  if (stage === 'complete') {
    return <div className="hidden" aria-hidden="true" />;
  }

  const characters = INTRO_TEXT.split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] w-screen h-screen bg-black text-white flex items-center justify-center overflow-hidden select-none"
    >
      {/* ================= STAGE 1: LETTER-BY-LETTER MONOSPACE LOADER TICKER ================= */}
      {stage === 'loader' && (
        <div className="flex flex-col items-center justify-center w-full px-4 animate-in fade-in duration-500">
          <div className="intro-ticker-wrapper text-white">
            {characters.map((char, idx) => (
              <span
                key={idx}
                className={`intro-ticker-letter letter${idx + 1}`}
                style={{
                  animationDelay: `calc(var(--duration) / ${characters.length} * var(--delay-factor) * (${characters.length - idx - 1}) * -1)`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-2 text-white/30 font-mono text-xs uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>LNJPIT Chapra • Freshers Fest 2026</span>
          </div>
        </div>
      )}

      {/* ================= STAGE 2: PITCH-BLACK CLICK TO ENTER ================= */}
      {stage === 'enter' && (
        <div className="flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
          <button
            onClick={handleEnterClick}
            className="px-10 py-4 text-base sm:text-lg tracking-[0.25em] uppercase text-white border border-white/50 hover:bg-white hover:text-black transition-all duration-300 font-mono shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] cursor-pointer"
          >
            Click to Enter
          </button>
          <p className="text-[11px] font-mono tracking-widest text-white/40 uppercase mt-5">
            Sound Recommended • LNJPIT Chapra
          </p>
        </div>
      )}

      {/* ================= STAGE 3: FULLSCREEN CINEMATIC INTRO VIDEO ================= */}
      {stage === 'video' && (
        <div className="relative w-full h-full flex items-center justify-center bg-black animate-in fade-in duration-300">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={false}
            onEnded={handleFinish}
            className="w-full h-full object-cover max-w-none"
          >
            <source src={isMobile ? '/intro_mob.mp4' : '/intro.mp4'} type="video/mp4" />
            <source src={isMobile ? '/intro_mob.webm' : '/intro.webm'} type="video/webm" />
          </video>

          {/* Top-Right Skip Button */}
          <button
            onClick={handleFinish}
            className="absolute top-6 right-6 z-[100] px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white font-mono text-xs uppercase border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* Bottom Watermark */}
          <div className="absolute bottom-6 left-6 z-[100] pointer-events-none text-white/50 font-mono text-xs tracking-widest uppercase">
            ZUNOON • LNJPIT CHAPRA
          </div>
        </div>
      )}
    </div>
  );
}
