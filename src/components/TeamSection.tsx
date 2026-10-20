'use client';

import { 
  Users,
  Award,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

export interface CoreMember {
  id: string;
  name: string;
  title: string;
  role: string;
  department: string;
  branchShort: string;
  branchLong: string;
  image: string;
  isLead?: boolean;
  priorityOrder: number;
  badgeColor: string;
  tagBg: string;
  rotation: number;
}

// 8 Core Committee Members mapped according to site order:
// 1) Chandra Pratap Singh (CSE Lead - priority #1 card)
// 2) Ankit Raj (ME)
// 3) Ayush Kumar (EEE)
// 4) Vimal Yadav (Civil)
// 5) DR Raju (CSE)
// 6) Manish Kumar (Civil)
// 7) Priyanshu Singh (CSE)
// 8) Aman Raj (ME)
export const CORE_COMMITTEE: CoreMember[] = [
  {
    id: 'core-cse-lead',
    name: 'Chandra Pratap Singh',
    title: 'Core Committee Lead',
    role: 'Core Organizing Lead',
    department: 'Computer Science & Engg.',
    branchShort: 'CSE',
    branchLong: 'Dept. of Computer Science & Engineering',
    image: '/team/member_4_cse_lead.jpg',
    isLead: true,
    priorityOrder: 1,
    badgeColor: '#fbbf24',
    tagBg: 'bg-amber-400 text-black',
    rotation: -1.5,
  },
  {
    id: 'core-me',
    name: 'Ankit Raj',
    title: 'Core Committee Member',
    role: 'Core Organizing Lead',
    department: 'Mechanical Engineering',
    branchShort: 'ME',
    branchLong: 'Dept. of Mechanical Engineering',
    image: '/team/member_1_me.jpg',
    priorityOrder: 2,
    badgeColor: '#3b82f6',
    tagBg: 'bg-blue-400 text-black',
    rotation: 1,
  },
  {
    id: 'core-eee',
    name: 'Ayush Kumar',
    title: 'Core Committee Member',
    role: 'Core Organizing Lead',
    department: 'Electrical & Electronics',
    branchShort: 'EEE',
    branchLong: 'Dept. of Electrical & Electronics Engg.',
    image: '/team/member_2_eee.jpg',
    priorityOrder: 3,
    badgeColor: '#10b981',
    tagBg: 'bg-emerald-400 text-black',
    rotation: -1,
  },
  {
    id: 'core-civil',
    name: 'Vimal Yadav',
    title: 'Core Committee Member',
    role: 'Core Organizing Lead',
    department: 'Civil Engineering',
    branchShort: 'CIVIL',
    branchLong: 'Dept. of Civil Engineering',
    image: '/team/member_3_civil.jpg',
    priorityOrder: 4,
    badgeColor: '#ec4899',
    tagBg: 'bg-pink-400 text-black',
    rotation: 1.5,
  },
  {
    id: 'core-cse',
    name: 'DR Raju',
    title: 'Core Committee Member',
    role: 'Core Organizing Lead',
    department: 'Computer Science & Engg.',
    branchShort: 'CSE',
    branchLong: 'Dept. of Computer Science & Engineering',
    image: '/team/member_5_cse.jpg',
    priorityOrder: 5,
    badgeColor: '#8b5cf6',
    tagBg: 'bg-purple-400 text-black',
    rotation: -0.5,
  },
  {
    id: 'core-civil-2',
    name: 'Manish Kumar',
    title: 'Core Committee Member',
    role: 'Core Organizing Lead',
    department: 'Civil Engineering',
    branchShort: 'CIVIL',
    branchLong: 'Dept. of Civil Engineering',
    image: '/team/member_6_civil.jpg',
    priorityOrder: 6,
    badgeColor: '#06b6d4',
    tagBg: 'bg-cyan-400 text-black',
    rotation: 1,
  },
  {
    id: 'core-cse-2',
    name: 'Priyanshu Singh',
    title: 'Core Committee Member',
    role: 'Core Organizing Lead',
    department: 'Computer Science & Engg.',
    branchShort: 'CSE',
    branchLong: 'Dept. of Computer Science & Engineering',
    image: '/team/member_7_cse.jpg',
    priorityOrder: 7,
    badgeColor: '#0ea5e9',
    tagBg: 'bg-sky-400 text-black',
    rotation: -1,
  },
  {
    id: 'core-me-2',
    name: 'Aman Raj',
    title: 'Core Committee Member',
    role: 'Core Organizing Lead',
    department: 'Mechanical Engineering',
    branchShort: 'ME',
    branchLong: 'Dept. of Mechanical Engineering',
    image: '/team/member_8_me.jpg',
    priorityOrder: 8,
    badgeColor: '#f97316',
    tagBg: 'bg-orange-400 text-black',
    rotation: 0.5,
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#110626] overflow-hidden">
      {/* Background Banner with Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: `url('/assets/bg_main.jpg')` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-black border-2 border-black text-xs font-carter tracking-widest uppercase shadow-[2px_2px_0px_#000] -rotate-1">
              <Award className="w-3.5 h-3.5" />
              <span>THE ARCHITECTS OF AARAMBH 2.0</span>
            </span>
            <h2 className="text-5xl sm:text-7xl font-carter tracking-wide text-white drop-shadow-[5px_5px_0px_#000] uppercase mt-3">
              MEET THE <span className="text-amber-400">CORE COMMITTEE</span>
            </h2>
            <p className="font-chewy text-xl text-purple-200 mt-2 max-w-2xl mx-auto">
              The core student leadership from Mechanical, EEE, Civil, and Computer Science Engineering spearheading Aarambh 2.0 at {FEST_CONFIG.shortInstitution}.
            </p>
          </div>
        </ScrollReveal>

        {/* Central Spotlight Badge */}
        <ScrollReveal direction="up" distance={20} delay={60}>
          <div className="mb-12 p-4 sm:p-5 rounded-3xl bg-[#1b0f38] border-2 border-amber-400/70 shadow-[5px_5px_0px_#000] max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-black border-2 border-black flex items-center justify-center font-carter shadow-[2px_2px_0px_#000] -rotate-3 shrink-0">
                <ShieldCheck className="w-5 h-5 text-black" />
              </div>
              <div className="text-left">
                <span className="font-carter text-sm sm:text-base text-white tracking-wide uppercase block">
                  LNJPIT CORE STEERING BODY
                </span>
                <span className="text-xs font-mono text-purple-300">
                  Inter-departmental student leaders powering fest planning, registrations & events.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-amber-300">
              <span className="px-2.5 py-1 rounded-xl bg-black/50 border border-white/10">🎓 LNJPIT Chapra</span>
              <span className="px-2.5 py-1 rounded-xl bg-amber-400/20 border border-amber-400/40 font-bold">8 Core Leads</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 8 Core Committee Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CORE_COMMITTEE.map((member, idx) => (
            <ScrollReveal
              key={member.id}
              direction="up"
              distance={28}
              delay={idx * 60}
              rotate={member.rotation}
            >
              <div
                className={`comic-box p-4 rounded-3xl transition-all group flex flex-col justify-between h-full relative ${
                  member.isLead
                    ? 'bg-[#22104a] border-amber-400 shadow-[6px_6px_0px_#f59e0b] hover:scale-105 ring-2 ring-amber-400/60'
                    : 'bg-[#180e33] border-black shadow-[6px_6px_0px_#000] hover:scale-105'
                }`}
              >
                {/* Tape Sticker at Top */}
                <div
                  className={`w-16 h-4 border border-black/50 -rotate-2 mx-auto -mt-6 mb-3 shadow-[1px_1px_0px_#000] ${
                    member.isLead ? 'bg-amber-300' : 'bg-amber-200/50'
                  }`}
                />

                {/* Portrait Photo Container */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-3 border-black mb-3.5 bg-[#0e0722] shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.department} Core Committee`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient shadow for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                  {/* Top-Left Branch Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-carter text-[10px] tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000] ${member.tagBg}`}
                    >
                      {member.branchShort}
                    </span>
                  </div>

                  {/* Top-Right Priority Lead Badge if applicable */}
                  {member.isLead && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-carter text-[9px] tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 font-bold">
                        <Award className="w-3 h-3 text-black shrink-0" />
                        <span>CORE LEAD</span>
                      </span>
                    </div>
                  )}

                  {/* Bottom Department Tag Overlay on Image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-left">
                    <span className="font-carter text-sm text-white block drop-shadow-[2px_2px_0px_#000] leading-tight">
                      {member.department}
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 block font-semibold mt-0.5">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Card Info Below Image */}
                <div className="text-left px-1 mt-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3
                      className={`font-carter text-base sm:text-lg tracking-wide ${
                        member.isLead ? 'text-amber-300' : 'text-white'
                      }`}
                    >
                      {member.name}
                    </h3>
                    {member.isLead && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                        PRIORITY
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-carter text-amber-400/90 block mb-1">
                    {member.title}
                  </span>

                  <p className="text-[11px] font-mono text-purple-200/90 leading-tight">
                    {member.branchLong}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-purple-300/80">
                    <span className="truncate">LNJPIT Chapra</span>
                    <span className="text-amber-400 font-bold shrink-0">Batch 2K25</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer Note */}
        <ScrollReveal direction="up" distance={16} delay={200}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-black/40 border border-white/15 text-xs font-mono text-purple-300">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>LNJPIT Cultural Council • Guided by Honorable Principal & Faculty Advisory Board</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
