'use client';

import { Zap, Music, Crown, Flame, Users, Theater } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    title: 'Stage Lighting & Euphoria',
    caption: 'Concert illumination and laser shows at the main amphitheatre.',
    color: 'from-amber-500 to-rose-600',
    rotation: -2.5,
    tag: 'LIGHTS',
    icon: Flame,
  },
  {
    title: 'Ramp Walk Charisma',
    caption: 'Mr. & Ms. Freshers contenders commanding the runway.',
    color: 'from-rose-500 to-purple-600',
    rotation: 3,
    tag: 'PAGEANT',
    icon: Crown,
  },
  {
    title: 'Acoustic Harmonies',
    caption: 'Strumming chords and soulful Bollywood melodies under the stars.',
    color: 'from-blue-500 to-cyan-500',
    rotation: -1.8,
    tag: 'MUSIC',
    icon: Music,
  },
  {
    title: 'Awaaz: Street Play',
    caption: 'Roaring percussion and dramatic student expression on the lawn.',
    color: 'from-red-600 to-amber-600',
    rotation: 2.2,
    tag: 'DRAMA',
    icon: Theater,
  },
  {
    title: 'High-Voltage Dance',
    caption: 'Synchronization and acrobatic hip-hop crew battles.',
    color: 'from-purple-600 to-pink-500',
    rotation: -3,
    tag: 'DANCE',
    icon: Zap,
  },
  {
    title: 'Batch Celebrations',
    caption: 'Lifelong friendships forged on day one at LNJPIT Chapra.',
    color: 'from-emerald-500 to-teal-600',
    rotation: 2.5,
    tag: 'MEMORIES',
    icon: Users,
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 px-4 sm:px-8 bg-[#100829] border-y-4 border-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="px-4 py-1 rounded-full bg-pink-600/30 text-pink-300 border border-pink-500/40 text-xs font-mono font-bold tracking-widest uppercase">
            VISUAL STORYTELLING
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000] mt-3">
            SNAPSHOTS OF PASSION
          </h2>
          <p className="font-chewy text-xl text-purple-200 mt-2 max-w-xl mx-auto">
            Glimpses into the electric atmosphere, stage drama, and unforgettable memories made at LNJPIT.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={idx}
                style={{ '--rot': `rotate(${item.rotation}deg)` } as React.CSSProperties}
                className="comic-box p-4 rounded-3xl bg-[#1c113e] [transform:none] sm:[transform:var(--rot)] hover:rotate-0 hover:scale-105 transition-all group"
              >
                {/* Illustrated Activity Badge Canvas */}
                <div
                  className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.color} border-2 border-black flex flex-col justify-between p-4 relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]`}
                >
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white font-mono text-[10px] font-bold tracking-wider">
                      {item.tag}
                    </span>
                    <div className="p-1 rounded-lg bg-black/40 text-white">
                      <ItemIcon className="w-4 h-4 text-amber-300" />
                    </div>
                  </div>

                  {/* Comic Halftone Pattern Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

                  <div className="relative z-10">
                    <h4 className="font-carter text-2xl text-white drop-shadow-[2px_2px_0px_#000]">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Caption */}
                <div className="pt-3 px-1">
                  <p className="text-xs text-purple-200 font-sans leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
