'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  Move3d, 
  Compass, 
  ChevronRight,
  ChevronLeft,
  X,
  Camera,
  Eye,
  RotateCw
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface CubeFaceData {
  id: string;
  name: string;
  borderColor: string;
  transform: string;
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
      name: 'Inaugural Felicitation',
      borderColor: 'border-amber-400',
      transform: `translateZ(${half}px)`,
      image: '/album/inaugural_felicitation.jpg',
      targetRot: { x: 0, y: 0 },
    },
    {
      id: 'live-band',
      name: 'Live Band Performance',
      borderColor: 'border-blue-400',
      transform: `rotateY(90deg) translateZ(${half}px)`,
      image: '/album/live_band_performance.jpg',
      targetRot: { x: 0, y: -90 },
    },
    {
      id: 'campus-life',
      name: 'Campus Celebrations',
      borderColor: 'border-pink-400',
      transform: `rotateY(180deg) translateZ(${half}px)`,
      image: '/album/campus_celebrations.jpg',
      targetRot: { x: 0, y: 180 },
    },
    {
      id: 'trophy',
      name: 'Trophy Ceremony',
      borderColor: 'border-emerald-400',
      transform: `rotateY(-90deg) translateZ(${half}px)`,
      image: '/album/trophy_ceremony.jpg',
      targetRot: { x: 0, y: 90 },
    },
    {
      id: 'lamp-lighting',
      name: 'Ceremonial Lamp Lighting',
      borderColor: 'border-amber-300',
      transform: `rotateX(90deg) translateZ(${half}px)`,
      image: '/album/lamp_lighting.jpg',
      targetRot: { x: -90, y: 0 },
    },
    {
      id: 'principal-felicitation',
      name: 'Principal Felicitation',
      borderColor: 'border-rose-400',
      transform: `rotateX(-90deg) translateZ(${half}px)`,
      image: '/album/principal_felicitation.jpg',
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
          Explore real memories from the LNJPIT festival grounds. Drag the 3D Cube 360° to view each memory face, or tap any photo to expand.
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
            {FACES.map((face, index) => {
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
                  className={`rounded-3xl overflow-hidden border-4 ${face.borderColor} shadow-[0_0_35px_rgba(0,0,0,0.85)] bg-black group cursor-pointer relative select-none`}
                  onClick={() => setActiveFace(face)}
                  title="Click to view full photo"
                >
                  {/* Clean Real Photo - Pure photograph without any text or dark overlay */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={face.image}
                    alt={`Aarambh fest photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Drag Hint */}
      <div className="relative z-10 mt-8 flex items-center gap-2 text-xs font-mono text-purple-300/80 bg-black/60 px-4 py-1.5 rounded-full border border-purple-500/30 shadow-[2px_2px_0px_#000]">
        <Compass className="w-4 h-4 text-amber-400 animate-spin" />
        <span>DRAG TO ROTATE 360° IN ANY DIRECTION • CLICK ANY PHOTO TO EXPAND</span>
      </div>

      {/* 6 Interactive Album Photos Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-14 px-2 sm:px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-black border-2 border-black font-carter text-[11px] tracking-wider uppercase shadow-[2px_2px_0px_#000]">
            <Camera className="w-3.5 h-3.5" />
            <span>FESTIVAL PHOTO ALBUM • 6 MOMENTS</span>
          </span>
          <h3 className="font-carter text-2xl sm:text-3xl text-white uppercase mt-2 drop-shadow-[2px_2px_0px_#000]">
            CAMPUS MEMORIES & <span className="text-amber-400">CELEBRATIONS</span>
          </h3>
          <p className="text-xs sm:text-sm font-mono text-purple-300 mt-1 max-w-xl mx-auto">
            Click any photo to rotate the 3D Album Cube directly to that face or view in high-resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACES.map((face, index) => (
            <div
              key={face.id}
              className="comic-box p-3 rounded-2xl bg-[#1b0a33] border-3 border-black shadow-[6px_6px_0px_#000] hover:scale-[1.02] transition-all group flex flex-col justify-between"
            >
              {/* Photo Frame - Pure Clean Photo without any text written upon it */}
              <div 
                className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-black bg-black cursor-pointer shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
                onClick={() => {
                  rotateToRef.current?.(face.targetRot.x, face.targetRot.y);
                  setActiveFace(face);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={face.image}
                  alt={`Album photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Controls Below Photo */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => rotateToRef.current?.(face.targetRot.x, face.targetRot.y)}
                  className="px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Rotate 3D Cube to this face"
                >
                  <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>CUBE ↺</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    rotateToRef.current?.(face.targetRot.x, face.targetRot.y);
                    setActiveFace(face);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black border border-black text-[11px] font-carter shadow-[1px_1px_0px_#000] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-black" />
                  <span>VIEW ↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Modal Details with Full High-Res Photo View - ZERO text on photo */}
      {activeFace && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setActiveFace(null)}
        >
          <div 
            className="relative max-w-4xl w-full flex flex-col items-center justify-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Counter and Close Button */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-mono text-purple-200 bg-black/60 px-3 py-1 rounded-full border border-white/20">
                Photo {currentModalIndex + 1} of {FACES.length}
              </span>
              <button
                onClick={() => setActiveFace(null)}
                className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer flex items-center gap-1 text-xs font-carter"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Modal Photo Frame - Clean high-resolution photo, no text overlay */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden border-4 border-amber-400 bg-black shadow-[10px_10px_0px_#000]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeFace.image}
                alt={`Photo ${currentModalIndex + 1}`}
                className="w-full max-h-[73vh] object-contain"
              />
            </div>

            {/* Navigation Controls Below Photo */}
            <div className="mt-4 flex items-center justify-between w-full px-1">
              <button
                type="button"
                onClick={showPrevModal}
                className="px-4 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-white border-2 border-black text-xs font-carter flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                title="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV</span>
              </button>

              <button
                type="button"
                onClick={showNextModal}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black border-2 border-black text-xs font-carter flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                title="Next photo"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
