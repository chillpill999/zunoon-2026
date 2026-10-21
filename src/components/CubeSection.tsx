'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  Move3d, 
  Compass, 
  Flame, 
  Music, 
  Crown, 
  GraduationCap, 
  Trophy,
  ChevronRight,
  ChevronLeft,
  X,
  Camera,
  Eye,
  RotateCw
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
  image: string;
  targetRot: { x: number; y: number };
}

export default function CubeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const rotateToRef = useRef<((x: number, y: number) => void) | null>(null);
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
    let pauseIdleUntil = 0;

    const dragSensitivity = 0.35;
    const lerpFactor = 0.08;
    const idleSpeedY = 0.25;
    const dragThreshold = 6;

    rotateToRef.current = (x: number, y: number) => {
      targetRotX = x;
      targetRotY = y;
      pauseIdleUntil = Date.now() + 5000;
    };

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
        if (Date.now() > pauseIdleUntil) {
          targetRotY += idleSpeedY;
          targetRotX = Math.sin(Date.now() * 0.001) * 10;
        }
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
      id: 'inaugural',
      name: 'Front',
      tag: 'GRAND INAUGURAL',
      tagBg: '#f59e0b',
      title: 'AARAMBH 2.0',
      subtitle: 'Dignitary Felicitations',
      description: 'Honorable dignitaries, guest speakers, and faculty mentors being felicitated with ceremonial bouquets at the Grand Inaugural Ceremony of Aarambh 2.0.',
      actionText: 'EXPLORE FEST',
      actionHref: '#about',
      gradient: 'from-amber-600/80 via-rose-700/80 to-purple-950/90',
      borderColor: 'border-amber-400',
      icon: Flame,
      transform: `translateZ(${half}px)`,
      image: '/album/inaugural_felicitation.jpg',
      targetRot: { x: 0, y: 0 },
    },
    {
      id: 'live-band',
      name: 'Right',
      tag: 'LIVE STAGES',
      tagBg: '#3b82f6',
      title: 'BATTLE OF THE BANDS',
      subtitle: 'Acoustic & Rock Night',
      description: 'Electrifying musical ensembles, dual acoustic guitarists, and soulful vocalists taking center stage under festival floodlights and confetti showers.',
      actionText: 'STAGE EVENTS',
      actionHref: '#events',
      gradient: 'from-blue-600/80 via-indigo-700/80 to-purple-950/90',
      borderColor: 'border-blue-400',
      icon: Music,
      transform: `rotateY(90deg) translateZ(${half}px)`,
      image: '/album/live_band_performance.jpg',
      targetRot: { x: 0, y: -90 },
    },
    {
      id: 'campus-life',
      name: 'Back',
      tag: 'CAMPUS VERSE',
      tagBg: '#ec4899',
      title: 'SAFAR VERSE',
      subtitle: 'Friendships & Brotherhood',
      description: 'A vibrant gathering of LNJPIT engineering students celebrating fest night under campus fairy lights, bonding over music, laughs, and unforgettable memories.',
      actionText: 'COMMUNITY LIFE',
      actionHref: '#team',
      gradient: 'from-indigo-900/80 via-purple-900/80 to-pink-900/90',
      borderColor: 'border-pink-400',
      icon: Compass,
      transform: `rotateY(180deg) translateZ(${half}px)`,
      image: '/album/campus_celebrations.jpg',
      targetRot: { x: 0, y: 180 },
    },
    {
      id: 'trophy',
      name: 'Left',
      tag: 'VICTORY & HONORS',
      tagBg: '#10b981',
      title: 'CHAMPIONS PODIUM',
      subtitle: 'Trophy Presentation',
      description: 'Celebration of triumph and excellence — student winners proudly holding the championship trophy with faculty and fest committee leads on the main LNJPIT stage.',
      actionText: 'AWARDS & EVENTS',
      actionHref: '#events',
      gradient: 'from-emerald-600/80 via-teal-700/80 to-cyan-950/90',
      borderColor: 'border-emerald-400',
      icon: Trophy,
      transform: `rotateY(-90deg) translateZ(${half}px)`,
      image: '/album/trophy_ceremony.jpg',
      targetRot: { x: 0, y: 90 },
    },
    {
      id: 'pride',
      name: 'Top',
      tag: 'CAMPUS PRIDE',
      tagBg: '#8b5cf6',
      title: 'BATCH 2K25 & 2K26',
      subtitle: 'LNJPIT Chapra Unity',
      description: 'CSE, Civil, Mechanical, and EEE branches united under one sky, celebrating the engineering spirit and creativity of LNJPIT Chapra.',
      actionText: 'MEET TEAM',
      actionHref: '#team',
      gradient: 'from-purple-600/80 via-fuchsia-700/80 to-rose-950/90',
      borderColor: 'border-purple-400',
      icon: GraduationCap,
      transform: `rotateX(90deg) translateZ(${half}px)`,
      image: '/assets/bg_main.jpg',
      targetRot: { x: -90, y: 0 },
    },
    {
      id: 'heritage',
      name: 'Bottom',
      tag: '5 CLUBS • 29 EVENTS',
      tagBg: '#eab308',
      title: 'FESTIVAL HERITAGE',
      subtitle: 'Aarambh Legacy',
      description: 'Relive the most memorable moments, competitions, and celebrations from the flagship cultural festival of LNJPIT.',
      actionText: 'REGISTER NOW',
      actionHref: '#events',
      gradient: 'from-amber-500/80 via-orange-600/80 to-red-900/90',
      borderColor: 'border-yellow-400',
      icon: Crown,
      transform: `rotateX(-90deg) translateZ(${half}px)`,
      image: '/cube/bg.jpg',
      targetRot: { x: 90, y: 0 },
    },
  ];

  const currentModalIndex = activeFace ? FACES.findIndex(f => f.id === activeFace.id) : -1;

  const showPrevModal = () => {
    if (currentModalIndex > -1) {
      const prevIdx = (currentModalIndex - 1 + FACES.length) % FACES.length;
      const prevFace = FACES[prevIdx];
      setActiveFace(prevFace);
      rotateToRef.current?.(prevFace.targetRot.x, prevFace.targetRot.y);
    }
  };

  const showNextModal = () => {
    if (currentModalIndex > -1) {
      const nextIdx = (currentModalIndex + 1) % FACES.length;
      const nextFace = FACES[nextIdx];
      setActiveFace(nextFace);
      rotateToRef.current?.(nextFace.targetRot.x, nextFace.targetRot.y);
    }
  };

  return (
    <section id="cube" className="relative min-h-screen w-full bg-[#110123] overflow-hidden flex flex-col items-center justify-center py-20 px-4 select-none">
      {/* Background Cosmic Starfield & Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-[#180332] to-[#0a0016] pointer-events-none" />

      {/* Horizontal Glowing Red Laser Beam */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_20px_#ef4444,0_0_40px_#dc2626] pointer-events-none -translate-y-1/2 opacity-70 z-0" />

      {/* Top Header */}
      <ScrollReveal direction="up" distance={24} className="relative z-10 text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-xs font-mono text-purple-200 tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#000]">
          <Move3d className="w-3.5 h-3.5 text-amber-400" />
          INTERACTIVE 3D ALBUM
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-carter tracking-wide text-white uppercase drop-shadow-[5px_5px_0px_#000]">
          STEP INTO THE <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-purple-400 bg-clip-text text-transparent">AARAMBH-VERSE</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base font-chewy text-purple-200 max-w-xl mx-auto">
          Explore real memories from the LNJPIT main ground. Drag the 3D Cube 360° to view each memory face, or tap any photo to expand.
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
          {/* The 3D CSS Cube */}
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
                  key={face.id}
                  style={{
                    width: `${faceSize}px`,
                    height: `${faceSize}px`,
                    position: 'absolute',
                    transform: face.transform,
                    backfaceVisibility: 'hidden',
                  }}
                  className={`rounded-3xl overflow-hidden border-4 ${face.borderColor} shadow-[0_0_35px_rgba(0,0,0,0.8)] bg-black group p-5 cursor-pointer flex flex-col justify-between relative`}
                  onClick={() => setActiveFace(face)}
                >
                  {/* Real Photo Background */}
                  {face.image && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={face.image}
                        alt={face.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Dark Vignette Overlay for Text Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
                    </div>
                  )}

                  {/* Face Top Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-black font-carter text-[10px] tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000]"
                      style={{ backgroundColor: face.tagBg }}
                    >
                      {face.tag}
                    </span>
                    <div className="p-1.5 rounded-xl bg-black/60 border border-white/20 text-white shadow-[2px_2px_0px_#000] backdrop-blur-xs">
                      <FaceIcon className="w-4 h-4 text-amber-300" />
                    </div>
                  </div>

                  {/* Center Graphic Emblem */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 border border-white/20 text-[9px] font-mono text-amber-300 uppercase mb-1.5 shadow-[1px_1px_0px_#000]">
                      <Camera className="w-2.5 h-2.5 text-amber-400" />
                      <span>FESTIVAL MEMORY</span>
                    </span>
                    <h3 className="font-carter text-2xl sm:text-3xl text-white tracking-wide drop-shadow-[3px_3px_0px_#000] uppercase leading-tight">
                      {face.title}
                    </h3>
                    <p className="font-chewy text-sm sm:text-base text-amber-300 mt-1 drop-shadow-[1px_1px_0px_#000]">
                      {face.subtitle}
                    </p>
                  </div>

                  {/* Face Bottom Footer */}
                  <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/20 backdrop-blur-xs">
                    <span className="text-[10px] font-mono text-purple-200">
                      LNJPIT CHAPRA
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/80 px-2.5 py-0.5 rounded-full border border-amber-400/40 group-hover:bg-amber-400 group-hover:text-black transition-colors shadow-[1px_1px_0px_#000]">
                      EXPAND PHOTO ↗
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Drag Hint */}
      <div className="relative z-10 mt-8 flex items-center gap-2 text-xs font-mono text-purple-300/80 bg-black/60 px-4 py-1.5 rounded-full border border-purple-500/30 shadow-[2px_2px_0px_#000]">
        <Compass className="w-4 h-4 text-amber-400 animate-spin" />
        <span>DRAG TO ROTATE 360° IN ANY DIRECTION • CLICK ANY FACE TO EXPAND</span>
      </div>

      {/* 4 Interactive Album Moments Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-14 px-2 sm:px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-black border-2 border-black font-carter text-[11px] tracking-wider uppercase shadow-[2px_2px_0px_#000]">
            <Camera className="w-3.5 h-3.5" />
            <span>FESTIVAL ALBUM VAULT • 4 OFFICIAL MOMENTS</span>
          </span>
          <h3 className="font-carter text-2xl sm:text-3xl text-white uppercase mt-2 drop-shadow-[2px_2px_0px_#000]">
            REAL MOMENTS FROM THE <span className="text-amber-400">LNJPIT GROUND</span>
          </h3>
          <p className="text-xs sm:text-sm font-mono text-purple-300 mt-1 max-w-xl mx-auto">
            Click any snapshot to rotate the 3D Album Cube directly to that memory or view in high-resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACES.filter(f => f.image.startsWith('/album/')).map((face) => (
            <div
              key={face.id}
              className="comic-box p-3.5 rounded-2xl bg-[#1b0a33] border-3 border-black shadow-[6px_6px_0px_#000] hover:scale-105 transition-all group flex flex-col justify-between"
            >
              {/* Tape sticker */}
              <div className="w-16 h-3.5 bg-amber-300 border border-black/50 -rotate-2 mx-auto -mt-5 mb-2.5 shadow-[1px_1px_0px_#000]" />

              {/* Photo Thumbnail */}
              <div 
                className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-black bg-black cursor-pointer mb-2.5 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
                onClick={() => {
                  rotateToRef.current?.(face.targetRot.x, face.targetRot.y);
                  setActiveFace(face);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={face.image}
                  alt={face.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div 
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-carter tracking-wider uppercase border border-black shadow-[1px_1px_0px_#000]"
                  style={{ backgroundColor: face.tagBg, color: '#000' }}
                >
                  {face.tag}
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Card Meta */}
              <div className="px-1">
                <h4 className="font-carter text-sm sm:text-base text-white tracking-wide truncate">
                  {face.title}
                </h4>
                <p className="text-[11px] font-mono text-amber-300 truncate">
                  {face.subtitle}
                </p>
              </div>

              {/* Interaction Buttons */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => rotateToRef.current?.(face.targetRot.x, face.targetRot.y)}
                  className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                  title="Rotate 3D Cube to this face"
                >
                  <RotateCw className="w-3 h-3 text-amber-400" />
                  <span>CUBE ↺</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    rotateToRef.current?.(face.targetRot.x, face.targetRot.y);
                    setActiveFace(face);
                  }}
                  className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-black border border-black text-[10px] font-carter shadow-[1px_1px_0px_#000] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3 text-black" />
                  <span>VIEW ↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Modal Details with Full High-Res Photo View */}
      {activeFace && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
          onClick={() => setActiveFace(null)}
        >
          <div 
            className="relative max-w-2xl w-full rounded-3xl overflow-hidden border-4 border-amber-400 bg-[#160a2e] shadow-[10px_10px_0px_#000] p-5 sm:p-7 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveFace(null)}
              className="absolute top-4 right-4 p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Photo Frame */}
            {activeFace.image && (
              <div className="relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden border-3 border-black shadow-[5px_5px_0px_#000] mb-4 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeFace.image}
                  alt={activeFace.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full text-black font-carter text-[10px] tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000]"
                  style={{ backgroundColor: activeFace.tagBg }}
                >
                  {activeFace.tag}
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-purple-200 bg-black/75 px-3 py-1 rounded-lg border border-white/20 backdrop-blur-xs">
                  <span>📍 Main LNJPIT Ground, Chapra</span>
                  <span className="text-amber-300 font-bold">Aarambh 2.0 Fest Archive</span>
                </div>
              </div>
            )}

            {/* Header info */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono text-purple-300">
                {FEST_CONFIG.shortInstitution} • Official Album
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={showPrevModal}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-black text-white border border-white/20 text-xs flex items-center gap-0.5 cursor-pointer"
                  title="Previous photo"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono hidden sm:inline">PREV</span>
                </button>
                <button
                  type="button"
                  onClick={showNextModal}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-black text-white border border-white/20 text-xs flex items-center gap-0.5 cursor-pointer"
                  title="Next photo"
                >
                  <span className="text-[10px] font-mono hidden sm:inline">NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="font-carter text-2xl sm:text-3xl text-white tracking-wide drop-shadow-[2px_2px_0px_#000] uppercase">
              {activeFace.title}
            </h3>
            <p className="font-chewy text-base sm:text-lg text-amber-300 mt-0.5">
              {activeFace.subtitle}
            </p>

            <p className="mt-3 text-xs sm:text-sm font-sans text-purple-100 leading-relaxed border-t border-white/10 pt-3">
              {activeFace.description}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3 pt-2">
              <a
                href={activeFace.actionHref}
                onClick={() => setActiveFace(null)}
                className="comic-btn px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-xs uppercase tracking-wide inline-flex items-center gap-2 shadow-[2px_2px_0px_#000]"
              >
                <span>{activeFace.actionText}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setActiveFace(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/20 cursor-pointer"
              >
                CLOSE VIEWER
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
