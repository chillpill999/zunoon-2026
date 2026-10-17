'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  Move3d, 
  Compass, 
  Flame, 
  Music, 
  Crown, 
  GraduationCap, 
  Ticket,
  Trophy,
  ChevronRight,
  X
} from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

interface CubeFaceData {
  id: string;
  name: string;
  tag: string;
  tagBg: string;
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
  actionHref: string;
  gradient: string;
  icon: any;
  transform: string;
  borderColor: string;
}

export default function CubeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [activeFace, setActiveFace] = useState<CubeFaceData | null>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    const container = containerRef.current;
    if (!cube || !container) return;

    let isVisible = false;
    let isPointerDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let curRotY = 0;
    let curRotX = 0;

    const dragSensitivity = 0.35;
    const lerpFactor = 0.08;
    const idleSpeedY = 0.25;
    const dragThreshold = 6;

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      isDragging = false;
      startX = lastX = e.clientX;
      startY = lastY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;

      const totalDeltaX = e.clientX - startX;
      const totalDeltaY = e.clientY - startY;

      if (!isDragging) {
        if (Math.hypot(totalDeltaX, totalDeltaY) < dragThreshold) return;
        isDragging = true;
      }

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;

      targetRotY += deltaX * dragSensitivity;
      targetRotX -= deltaY * dragSensitivity;

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerUp = () => {
      isPointerDown = false;
      isDragging = false;
    };

    cube.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const onScroll = () => {
      if (!isVisible || isDragging) return;
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Scroll velocity influence adds dynamic 3D reaction only when visible
      targetRotY += scrollDiff * 0.16;
      targetRotX += Math.max(-15, Math.min(15, scrollDiff * 0.06));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let animationId: number | null = null;
    const animate = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      if (!isDragging) {
        targetRotY += idleSpeedY;
        targetRotX = Math.sin(Date.now() * 0.001) * 10;
      }

      curRotY += (targetRotY - curRotY) * lerpFactor;
      curRotX += (targetRotX - curRotX) * lerpFactor;

      const isMobile = window.innerWidth < 768;
      const tz = isMobile ? '-150px' : '-220px';
      const scale = isMobile ? '0.75' : '1';

      cube.style.transform = `
        translate3d(0, 0, ${tz})
        scale(${scale})
        rotateX(${curRotX.toFixed(2)}deg)
        rotateY(${curRotY.toFixed(2)}deg)
      `;

      animationId = requestAnimationFrame(animate);
    };

    // IntersectionObserver to ONLY run RAF when the cube is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationId) {
            animationId = requestAnimationFrame(animate);
          }
        } else {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cube.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('scroll', onScroll);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const faceSize = 320;
  const half = faceSize / 2;

  const FACES: CubeFaceData[] = [
    {
      id: 'front',
      name: 'Front',
      tag: 'CENTRAL THEME',
      tagBg: '#f59e0b',
      title: 'AARAMBH 2.0',
      subtitle: 'The Freshers Odyssey',
      description: 'The premier annual cultural welcome festival for LNJPIT Chapra newcomers.',
      actionText: 'EXPLORE FEST',
      actionHref: '#about',
      gradient: 'from-amber-600 via-rose-700 to-purple-950',
      borderColor: 'border-amber-400',
      icon: Flame,
      transform: `translateZ(${half}px)`,
    },
    {
      id: 'back',
      name: 'Back',
      tag: 'CAMPUS VERSE',
      tagBg: '#ec4899',
      title: 'SAFAR VERSE',
      subtitle: 'A New Chapter Begins',
      description: 'Celebrate lifelong friendships, hostel camaraderie, and memories in the making.',
      actionText: 'CAMPUS LIFE',
      actionHref: '#about',
      gradient: 'from-indigo-900 via-purple-900 to-pink-900',
      borderColor: 'border-pink-400',
      icon: Compass,
      transform: `rotateY(180deg) translateZ(${half}px)`,
    },
    {
      id: 'right',
      name: 'Right',
      tag: 'STAGE LIGHTS',
      tagBg: '#3b82f6',
      title: 'LIVE STAGES',
      subtitle: 'Euphoria & High Voltage',
      description: 'Acoustic harmonies, explosive hip-hop crew battles, and street play theatricals.',
      actionText: 'EXPLORE EVENTS',
      actionHref: '#events',
      gradient: 'from-blue-600 via-indigo-700 to-purple-950',
      borderColor: 'border-blue-400',
      icon: Music,
      transform: `rotateY(90deg) translateZ(${half}px)`,
    },
    {
      id: 'left',
      name: 'Left',
      tag: 'SPOTLIGHT',
      tagBg: '#10b981',
      title: 'MR. & MS. FRESHERS',
      subtitle: 'Command the Runway',
      description: 'The most anticipated pageant of the semester. Walk with charisma, poise, and attitude.',
      actionText: 'PAGEANT DETAILS',
      actionHref: '#events',
      gradient: 'from-emerald-600 via-teal-700 to-cyan-950',
      borderColor: 'border-emerald-400',
      icon: Crown,
      transform: `rotateY(-90deg) translateZ(${half}px)`,
    },
    {
      id: 'top',
      name: 'Top',
      tag: 'CAMPUS PRIDE',
      tagBg: '#8b5cf6',
      title: 'BATCH 2026',
      subtitle: 'LNJPIT Chapra Brotherhood',
      description: 'CSE, CE, ME, EEE, FPP & M&C branches united under one sky.',
      actionText: 'MEET TEAM',
      actionHref: '#team',
      gradient: 'from-purple-600 via-fuchsia-700 to-rose-950',
      borderColor: 'border-purple-400',
      icon: GraduationCap,
      transform: `rotateX(90deg) translateZ(${half}px)`,
    },
    {
      id: 'bottom',
      name: 'Bottom',
      tag: '5 CLUBS • 29 EVENTS',
      tagBg: '#eab308',
      title: 'REGISTER FOR EVENTS',
      subtitle: 'Literary, Tech, Sports, Art, Cultural',
      description: 'Compete in 29 official campus tournaments with trophies and certificates. Open for all batches.',
      actionText: 'REGISTER NOW',
      actionHref: '#events',
      gradient: 'from-amber-500 via-orange-600 to-red-900',
      borderColor: 'border-yellow-400',
      icon: Trophy,
      transform: `rotateX(-90deg) translateZ(${half}px)`,
    },
  ];

  return (
    <section id="cube" className="relative min-h-screen w-full bg-[#110123] overflow-hidden flex flex-col items-center justify-center py-20 px-4 select-none">
      {/* Background Cosmic Starfield & Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-[#180332] to-[#0a0016] pointer-events-none" />

      {/* Horizontal Glowing Red Laser Beam */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_20px_#ef4444,0_0_40px_#dc2626] pointer-events-none -translate-y-1/2 opacity-70 z-0" />

      {/* Top Header */}
      <ScrollReveal direction="up" distance={24} className="relative z-10 text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-xs font-mono text-purple-200 tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#000]">
          <Move3d className="w-3.5 h-3.5 text-amber-400" />
          INTERACTIVE 3D ALBUM
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-carter tracking-wide text-white uppercase drop-shadow-[5px_5px_0px_#000]">
          StEP into the <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-purple-400 bg-clip-text text-transparent">AARAMBH-VERSE</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base font-chewy text-purple-200 max-w-lg mx-auto">
          Drag and rotate the 3D cube to discover each facet of the Aarambh 2.0 Freshers Fest celebration.
        </p>
      </ScrollReveal>

      {/* 3D Perspective Viewport */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-lg h-[360px] sm:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: '1100px' }}
      >
        {/* Responsive Scaled Wrapper to fit perfectly on mobile */}
        <div className="transform scale-[0.78] sm:scale-100 origin-center transition-transform">
          {/* The 3D CSS Cube (Photoless, 100% Vector & Typography) */}
          <div
            ref={cubeRef}
            className="relative will-change-transform"
            style={{
              width: `${faceSize}px`,
              height: `${faceSize}px`,
              transformStyle: 'preserve-3d',
            }}
          >
          {FACES.map((face) => {
            const FaceIcon = face.icon;
            return (
              <div
                key={face.name}
                style={{
                  width: `${faceSize}px`,
                  height: `${faceSize}px`,
                  position: 'absolute',
                  transform: face.transform,
                  backfaceVisibility: 'hidden',
                }}
                className={`rounded-3xl overflow-hidden border-4 ${face.borderColor} shadow-[0_0_35px_rgba(0,0,0,0.8)] bg-black group p-5 cursor-pointer flex flex-col justify-between`}
                onClick={() => setActiveFace(face)}
              >
                {/* Background Gradient Canvas with Halftone */}
                <div className={`absolute inset-0 bg-gradient-to-br ${face.gradient} opacity-95`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_1.5px,transparent_1.5px)] bg-[size:10px_10px] pointer-events-none" />

                {/* Face Top Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-black font-carter text-[10px] tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000]"
                    style={{ backgroundColor: face.tagBg }}
                  >
                    {face.tag}
                  </span>
                  <div className="p-1.5 rounded-xl bg-black/50 border border-white/20 text-white shadow-[2px_2px_0px_#000]">
                    <FaceIcon className="w-4 h-4 text-amber-300" />
                  </div>
                </div>

                {/* Center Graphic Emblem */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-2">
                  <h3 className="font-carter text-2xl sm:text-3xl text-white tracking-wide drop-shadow-[3px_3px_0px_#000]">
                    {face.title}
                  </h3>
                  <p className="font-chewy text-sm sm:text-base text-amber-300 mt-1 drop-shadow-[1px_1px_0px_#000]">
                    {face.subtitle}
                  </p>
                </div>

                {/* Face Bottom Footer */}
                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/20">
                  <span className="text-[10px] font-mono text-purple-200">
                    LNJPIT CHAPRA
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-full border border-amber-400/40 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    TAP TO EXPAND ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Interactive Drag Hint */}
      <div className="relative z-10 mt-12 flex items-center gap-2 text-xs font-mono text-purple-300/80 bg-black/60 px-4 py-1.5 rounded-full border border-purple-500/30">
        <Compass className="w-4 h-4 text-amber-400 animate-spin" />
        <span>DRAG TO ROTATE 360° IN ANY DIRECTION</span>
      </div>

      {/* Expanded Modal Details (Zero Photos, 100% On-Brand Information) */}
      {activeFace && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setActiveFace(null)}
        >
          <div 
            className="relative max-w-lg w-full rounded-3xl overflow-hidden border-4 border-amber-400 bg-[#160a2e] shadow-[10px_10px_0px_#000] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveFace(null)}
              className="absolute top-4 right-4 p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-3 py-1 rounded-full text-black font-carter text-xs tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000]"
                style={{ backgroundColor: activeFace.tagBg }}
              >
                {activeFace.tag}
              </span>
              <span className="text-xs font-mono text-purple-300">
                {FEST_CONFIG.shortInstitution}
              </span>
            </div>

            <h3 className="font-carter text-3xl sm:text-4xl text-white tracking-wide drop-shadow-[3px_3px_0px_#000]">
              {activeFace.title}
            </h3>
            <p className="font-chewy text-lg text-amber-300 mt-1">
              {activeFace.subtitle}
            </p>

            <p className="mt-4 text-sm font-sans text-purple-100 leading-relaxed border-t border-white/10 pt-4">
              {activeFace.description}
            </p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <a
                href={activeFace.actionHref}
                onClick={() => setActiveFace(null)}
                className="comic-btn px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-xs sm:text-sm uppercase tracking-wide inline-flex items-center gap-2 shadow-[3px_3px_0px_#000]"
              >
                <span>{activeFace.actionText}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setActiveFace(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/20"
              >
                BACK TO CUBE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
