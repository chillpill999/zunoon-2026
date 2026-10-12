'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, Award, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

type Category = 'all' | 'core' | 'advisors' | 'organizing' | 'leads';

interface Member {
  name: string;
  role: string;
  category: 'core' | 'advisors' | 'organizing' | 'leads';
  branch: string;
  tag: string;
  tagColor: string;
  image: string;
  rotation: number;
}

const TEAM_MEMBERS: Member[] = [
  {
    name: 'Dr. B. K. Singh',
    role: 'Chief Patron & Principal, LNJPIT',
    category: 'advisors',
    branch: 'Administration',
    tag: 'CHIEF PATRON',
    tagColor: '#f59e0b',
    image: '/cube/img1.jpg',
    rotation: -2,
  },
  {
    name: 'Prof. S. N. Sharma',
    role: 'Convener, Cultural Affairs',
    category: 'advisors',
    branch: 'Faculty Council',
    tag: 'CONVENER',
    tagColor: '#3b82f6',
    image: '/cube/img2.jpg',
    rotation: 2.5,
  },
  {
    name: 'Aman Kumar Raj',
    role: 'Overall Student General Secretary',
    category: 'core',
    branch: 'CSE (Computer Science)',
    tag: 'STUDENT LEAD',
    tagColor: '#ec4899',
    image: '/cube/img3.jpg',
    rotation: -1.5,
  },
  {
    name: 'Priya Kumari',
    role: 'Head of Cultural & Stage Production',
    category: 'core',
    branch: 'FPP (Food Processing & Preservation)',
    tag: 'CULTURAL HEAD',
    tagColor: '#10b981',
    image: '/cube/img4.jpg',
    rotation: 3,
  },
  {
    name: 'Rohan Verma',
    role: 'Technical Lead & Web Architecture',
    category: 'leads',
    branch: 'M&C (Mathematics & Computing)',
    tag: 'TECH LEAD',
    tagColor: '#06b6d4',
    image: '/cube/img5.jpg',
    rotation: -2.5,
  },
  {
    name: 'Vikash Kumar',
    role: 'Logistics, Venue & Security Head',
    category: 'organizing',
    branch: 'ME (Mechanical Engg.)',
    tag: 'LOGISTICS HEAD',
    tagColor: '#8b5cf6',
    image: '/cube/img6.jpg',
    rotation: 1.8,
  },
  {
    name: 'Anjali Singh',
    role: 'Sponsorship & Public Relations Lead',
    category: 'organizing',
    branch: 'CE (Civil Engg.)',
    tag: 'PR & SPONSORS',
    tagColor: '#f97316',
    image: '/cube/img7.jpg',
    rotation: -2,
  },
  {
    name: 'Rahul Mishra',
    role: 'Hospitality & Freshers Welcoming',
    category: 'leads',
    branch: 'EE (Electrical Engg.)',
    tag: 'HOSPITALITY',
    tagColor: '#eab308',
    image: '/cube/img8.jpg',
    rotation: 2.2,
  },
];

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState<Category>('all');

  const filteredMembers =
    activeTab === 'all'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.category === activeTab);

  return (
    <section id="team" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#110626] overflow-hidden">
      {/* Background Banner with Ornate Mandala Texture Matching Frame 10 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('/assets/bg_main.jpg')` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400 text-black border-2 border-black text-xs font-carter tracking-widest uppercase shadow-[2px_2px_0px_#000] -rotate-1">
            THE ARCHITECTS OF ZUNOON
          </span>
          <h2 className="text-5xl sm:text-7xl font-carter tracking-wide text-white drop-shadow-[5px_5px_0px_#000] uppercase mt-3">
            MEET THE <span className="text-amber-400">TEAM</span>
          </h2>
          <p className="font-chewy text-xl text-purple-200 mt-2 max-w-xl mx-auto">
            Faculty mentors, student leads, and dedicated volunteers creating a memorable Freshers Fest at LNJPIT Chapra.
          </p>
        </div>

        {/* Filter Navigation Tabs Matching Frame 10 */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          {[
            { id: 'all', label: 'ALL MEMBERS' },
            { id: 'core', label: 'CORE COMMITTEE' },
            { id: 'advisors', label: 'ADVISORS' },
            { id: 'organizing', label: 'ORGANIZING CREW' },
            { id: 'leads', label: 'STUDENT LEADS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Category)}
              className={`px-5 py-2.5 rounded-2xl font-carter text-xs sm:text-sm uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black shadow-[4px_4px_0px_#000] scale-105 -rotate-1'
                  : 'bg-white/10 text-white hover:bg-white/20 shadow-[2px_2px_0px_#000]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Polaroid Style Tilted Grid Matching Frame 10 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map((m, idx) => (
            <div
              key={m.name}
              style={{ transform: `rotate(${m.rotation}deg)` }}
              className="comic-box p-4 rounded-3xl bg-[#1e1140] hover:rotate-0 hover:scale-105 transition-all group flex flex-col justify-between"
            >
              {/* Tape Sticker at Top */}
              <div className="w-16 h-4 bg-amber-200/40 border border-black/50 -rotate-3 mx-auto -mt-6 mb-2 shadow-[1px_1px_0px_#000]" />

              {/* Photo Area */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-black mb-4 bg-zinc-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 z-10">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-black font-carter text-[10px] tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000]"
                    style={{ backgroundColor: m.tagColor }}
                  >
                    {m.tag}
                  </span>
                </div>
              </div>

              {/* Info Details */}
              <div className="text-left px-1">
                <h3 className="font-carter text-xl text-white tracking-wide group-hover:text-amber-400 transition-colors">
                  {m.name}
                </h3>
                <p className="text-xs font-sans text-purple-200 mt-1 font-medium">
                  {m.role}
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-purple-300">
                  <span className="text-amber-300">{m.branch}</span>
                  <span className="text-white/60">LNJPIT</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
