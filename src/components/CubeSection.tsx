'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Sparkles, Move3d, Compass } from 'lucide-react';

const CUBE_IMAGES = [
  '/cube/img1.jpg',
  '/cube/img2.jpg',
  '/cube/img3.jpg',
  '/cube/img4.jpg',
  '/cube/img5.jpg',
  '/cube/img6.jpg',
  '/cube/img7.jpg',
  '/cube/img8.jpg',
  '/cube/img9.jpg',
  '/cube/img10.jpg',
  '/cube/img11.jpg',
  '/cube/img12.jpg',
  '/cube/img13.jpg',
];

export default function CubeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

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
    const idleSpeedX = 0.12;
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

    let animationId: number;
    const animate = () => {
      if (!isDragging) {
        targetRotY += idleSpeedY;
        targetRotX = Math.sin(Date.now() * 0.001) * 12; // gentle floating wobble
      }

      curRotY += (targetRotY - curRotY) * lerpFactor;
      curRotX += (targetRotX - curRotX) * lerpFactor;

      const isMobile = window.innerWidth < 768;
      const tz = isMobile ? '-150px' : '-220px';
      const scale = isMobile ? '0.75' : '1';

      cube.style.transform = `
        translateZ(${tz})
        scale(${scale})
        rotateX(${curRotX}deg)
        rotateY(${curRotY}deg)
      `;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cube.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 6 cube faces: Front, Back, Right, Left, Top, Bottom
  // Each face size is 320px x 320px (half = 160px)
  const faceSize = 320;
  const half = faceSize / 2;

  const faces = [
    { name: 'Front', transform: `translateZ(${half}px)`, img: CUBE_IMAGES[0] },
    { name: 'Back', transform: `rotateY(180deg) translateZ(${half}px)`, img: CUBE_IMAGES[1] },
    { name: 'Right', transform: `rotateY(90deg) translateZ(${half}px)`, img: CUBE_IMAGES[2] },
    { name: 'Left', transform: `rotateY(-90deg) translateZ(${half}px)`, img: CUBE_IMAGES[3] },
    { name: 'Top', transform: `rotateX(90deg) translateZ(${half}px)`, img: CUBE_IMAGES[4] },
    { name: 'Bottom', transform: `rotateX(-90deg) translateZ(${half}px)`, img: CUBE_IMAGES[5] },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#110123] overflow-hidden flex flex-col items-center justify-center py-20 px-4 select-none">
      {/* Background Cosmic Starfield & Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-[#180332] to-[#0a0016] pointer-events-none" />

      {/* Horizontal Glowing Red Laser Beam (Matching Frame 09) */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_20px_#ef4444,0_0_40px_#dc2626] pointer-events-none -translate-y-1/2 opacity-70 z-0" />

      {/* Top Header */}
      <div className="relative z-10 text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-xs font-mono text-purple-200 tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#000]">
          <Move3d className="w-3.5 h-3.5 text-amber-400" />
          INTERACTIVE 3D EXPERIENCE
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-carter tracking-wide text-white uppercase drop-shadow-[5px_5px_0px_#000]">
          StEP into the <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-purple-400 bg-clip-text text-transparent">ZUNIVERSE</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base font-chewy text-purple-200 max-w-lg mx-auto">
          Drag and rotate the cube to explore unforgettable moments from festival stages and live concerts.
        </p>
      </div>

      {/* 3D Perspective Viewport */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-lg h-[400px] sm:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1100px' }}
      >
        {/* The 3D CSS Cube */}
        <div
          ref={cubeRef}
          className="relative"
          style={{
            width: `${faceSize}px`,
            height: `${faceSize}px`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.05s linear',
          }}
        >
          {faces.map((face, idx) => (
            <div
              key={face.name}
              style={{
                width: `${faceSize}px`,
                height: `${faceSize}px`,
                position: 'absolute',
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
              className="rounded-3xl overflow-hidden border-4 border-amber-400/90 shadow-[0_0_30px_rgba(234,179,8,0.35)] bg-black group"
              onClick={() => setActiveImage(face.img)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={face.img}
                  alt={`Fest Memory ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Halftone / Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="font-carter text-xs text-amber-300 tracking-wider uppercase drop-shadow-[2px_2px_0px_#000]">
                    STAGE {idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded-full border border-white/20">
                    CLICK TO ZOOM
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Drag Hint */}
      <div className="relative z-10 mt-12 flex items-center gap-2 text-xs font-mono text-purple-300/80 bg-black/60 px-4 py-1.5 rounded-full border border-purple-500/30">
        <Compass className="w-4 h-4 text-amber-400 animate-spin" />
        <span>DRAG TO ROTATE 360° IN ANY DIRECTION</span>
      </div>

      {/* Zoom Modal if user clicks on a face */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-2xl max-h-[80vh] w-full aspect-square rounded-3xl overflow-hidden border-4 border-amber-400 shadow-[8px_8px_0px_#000]">
            <Image src={activeImage} alt="Expanded Fest Memory" fill className="object-cover" />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 px-4 py-1.5 bg-rose-600 text-white font-carter text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              CLOSE ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
