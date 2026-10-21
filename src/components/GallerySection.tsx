'use client';

import { useState } from 'react';
import { 
  Zap, 
  Music, 
  Crown, 
  Flame, 
  Users, 
  Theater, 
  Trophy, 
  GraduationCap, 
  Award, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  tag: string;
  category: 'dance' | 'pageant' | 'music' | 'celebrations' | 'ceremony';
  image: string;
  color: string;
  rotation: number;
  icon: any;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'classical-dance',
    title: 'Grace on Stage',
    caption: 'A spellbinding solo classical dance performance captivating the festive crowd on the grand stage.',
    tag: 'CLASSICAL DANCE',
    category: 'dance',
    image: '/gallery/classical_dance.jpg',
    color: 'from-rose-500 to-pink-600',
    rotation: -1.5,
    icon: Flame,
  },
  {
    id: 'traditional-ramp',
    title: 'Traditional Runway',
    caption: 'Mr. & Ms. Aarambh contenders commanding the runway with elegance in vibrant traditional attire.',
    tag: 'RAMP WALK',
    category: 'pageant',
    image: '/gallery/traditional_ramp_walk.jpg',
    color: 'from-amber-500 to-orange-600',
    rotation: 2,
    icon: Crown,
  },
  {
    id: 'hiphop-dance',
    title: 'High-Voltage Dance',
    caption: 'Electrifying solo popping, locking, and high-energy freestyle choreography under laser beams.',
    tag: 'HIP-HOP DANCE',
    category: 'dance',
    image: '/gallery/hiphop_dance.jpg',
    color: 'from-purple-600 to-indigo-600',
    rotation: -2,
    icon: Zap,
  },
  {
    id: 'theatrical-act',
    title: 'Theatrical Solo Act',
    caption: 'Creative cosplay, dramatic wings, and expressive storytelling captivating the amphitheatre night.',
    tag: 'DRAMA & COSPLAY',
    category: 'pageant',
    image: '/gallery/theatrical_wings.jpg',
    color: 'from-red-600 to-rose-700',
    rotation: 1.8,
    icon: Theater,
  },
  {
    id: 'live-band',
    title: 'Acoustic Harmonies',
    caption: 'Dual acoustic guitarists and soulful rock melodies reverberating across the festival grounds.',
    tag: 'LIVE BAND',
    category: 'music',
    image: '/album/live_band_performance.jpg',
    color: 'from-blue-500 to-cyan-600',
    rotation: -1.8,
    icon: Music,
  },
  {
    id: 'batch-celebrations',
    title: 'Batch Celebrations',
    caption: 'Lifelong friendships and student brotherhood forged under illuminated campus fairy lights.',
    tag: 'CAMPUS LIFE',
    category: 'celebrations',
    image: '/album/campus_celebrations.jpg',
    color: 'from-emerald-500 to-teal-600',
    rotation: 2.2,
    icon: Users,
  },
  {
    id: 'trophy-ceremony',
    title: 'Champions Podium',
    caption: 'Student winners holding high their championship trophies alongside proud faculty leads.',
    tag: 'VICTORY & HONORS',
    category: 'ceremony',
    image: '/album/trophy_ceremony.jpg',
    color: 'from-yellow-500 to-amber-600',
    rotation: -1.2,
    icon: Trophy,
  },
  {
    id: 'lamp-lighting',
    title: 'Ceremonial Lamp Lighting',
    caption: 'Traditional Deep Prajwalan ritual inaugurating Aarambh 2.0 with sacred dignity and grace.',
    tag: 'DEEP PRAJWALAN',
    category: 'ceremony',
    image: '/album/lamp_lighting.jpg',
    color: 'from-amber-600 to-rose-600',
    rotation: 1.5,
    icon: Flame,
  },
  {
    id: 'principal-felicitation',
    title: 'Principal Felicitation',
    caption: 'Principal Dr. Sanjay Kumar being felicitated on stage in front of the grand Aarambh LED screen.',
    tag: 'LEADERSHIP',
    category: 'ceremony',
    image: '/album/principal_felicitation.jpg',
    color: 'from-rose-600 to-purple-600',
    rotation: -2.2,
    icon: GraduationCap,
  },
  {
    id: 'inaugural-bouquet',
    title: 'Dignitary Felicitations',
    caption: 'Distinguished guest speakers and faculty mentors receiving ceremonial floral bouquets.',
    tag: 'FELICITATION',
    category: 'ceremony',
    image: '/album/inaugural_felicitation.jpg',
    color: 'from-teal-500 to-blue-600',
    rotation: 2,
    icon: Award,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'ALL MOMENTS' },
  { id: 'dance', label: 'DANCE & ACTS' },
  { id: 'pageant', label: 'RAMP & DRAMA' },
  { id: 'music', label: 'MUSIC' },
  { id: 'celebrations', label: 'CAMPUS LIFE' },
  { id: 'ceremony', label: 'CEREMONIAL & HONORS' },
] as const;

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const currentIdx = activePhoto ? filteredItems.findIndex(i => i.id === activePhoto.id) : -1;

  const showPrev = () => {
    if (currentIdx > -1) {
      const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
      setActivePhoto(filteredItems[prevIdx]);
    }
  };

  const showNext = () => {
    if (currentIdx > -1) {
      const nextIdx = (currentIdx + 1) % filteredItems.length;
      setActivePhoto(filteredItems[nextIdx]);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-8 bg-[#100829] border-y-4 border-black relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" distance={24}>
          <div className="text-center mb-10">
            <span className="px-4 py-1.5 rounded-full bg-pink-600/30 text-pink-300 border border-pink-500/40 text-xs font-mono font-bold tracking-widest uppercase shadow-[2px_2px_0px_#000]">
              VISUAL STORYTELLING
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000] mt-4">
              SNAPSHOTS OF PASSION
            </h2>
            <p className="font-chewy text-lg sm:text-xl text-purple-200 mt-2 max-w-xl mx-auto">
              Real captured memories across dance, music, runway pageants, and celebrations at LNJPIT Chapra.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] scale-105'
                    : 'bg-[#1b0a33] text-purple-200 border border-purple-500/30 hover:border-amber-400/60 shadow-[2px_2px_0px_#000]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                distance={28}
                delay={(idx % 3) * 80}
                rotate={item.rotation}
              >
                <div
                  className="comic-box p-3.5 rounded-3xl bg-[#1c113e] hover:rotate-0 hover:scale-[1.03] active:scale-95 transition-all group h-full flex flex-col justify-between border-3 border-black shadow-[6px_6px_0px_#000]"
                >
                  {/* Clean Photo Frame - Zero text written upon photo */}
                  <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-black bg-black cursor-pointer shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
                    onClick={() => setActivePhoto(item)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                  </div>

                  {/* Card Details Sits Cleanly Below Photo */}
                  <div className="pt-3 px-1 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/70 text-amber-300 border border-amber-400/30 font-mono text-[10px] font-bold tracking-wider uppercase">
                          {item.tag}
                        </span>
                        <div className="p-1 rounded-lg bg-black/50 border border-white/10 text-amber-300">
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <h4 className="font-carter text-xl text-white drop-shadow-[2px_2px_0px_#000] leading-snug">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-purple-200 font-sans leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActivePhoto(item)}
                      className="mt-4 w-full py-2 rounded-xl bg-purple-900/60 hover:bg-amber-400 hover:text-black text-purple-200 border border-purple-500/30 hover:border-black text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[2px_2px_0px_#000]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW FULL PHOTO ↗</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal for Gallery Photos */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full flex flex-col items-center justify-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Counter, Title and Close Button */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-mono text-purple-200 bg-black/60 px-3 py-1 rounded-full border border-white/20">
                {activePhoto.title} • {currentIdx + 1} of {filteredItems.length}
              </span>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer flex items-center gap-1 text-xs font-carter"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Modal Photo Frame - Clean high-resolution photo */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden border-4 border-amber-400 bg-black shadow-[10px_10px_0px_#000]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full max-h-[73vh] object-contain"
              />
            </div>

            {/* Navigation Controls Below Photo */}
            <div className="mt-4 flex items-center justify-between w-full px-1">
              <button
                type="button"
                onClick={showPrev}
                className="px-4 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-white border-2 border-black text-xs font-carter flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                title="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV</span>
              </button>

              <span className="text-xs text-purple-300 font-mono hidden sm:inline">
                {activePhoto.caption}
              </span>

              <button
                type="button"
                onClick={showNext}
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
