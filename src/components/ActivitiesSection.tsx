'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ACTIVITIES, ActivityItem } from '@/data/activities';
import { Trophy, Users, Clock, MapPin, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const CATEGORIES = ['All', 'Pageant', 'Dance', 'Music', 'Dramatics', 'Gaming', 'Informal'];

export default function ActivitiesSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState<ActivityItem | null>(null);

  const filtered = selectedCategory === 'All'
    ? ACTIVITIES
    : ACTIVITIES.filter((item) => item.category === selectedCategory);

  return (
    <section id="activities" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
      <ScrollReveal direction="up" distance={24}>
        <div className="text-center mb-12">
          <span className="px-4 py-1 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold tracking-widest uppercase">
            ACTIVITIES & COMPETITIONS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000] mt-3">
            STAGE YOUR BRILLIANCE
          </h2>
          <p className="font-chewy text-xl text-purple-200 mt-2 max-w-xl mx-auto">
            From the crowning of Mr. & Ms. Freshers to thunderous street plays and dance battles. Free participation for all batches.
          </p>

          {/* Filter Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {CATEGORIES.map((cat, idx) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    transform: `rotate(${idx % 2 === 0 ? '-2deg' : '2deg'})`,
                  }}
                  className={`comic-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-carter uppercase tracking-wide transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-black shadow-[4px_4px_0px_#000]'
                      : 'bg-[#1b103e] text-purple-200 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Grid of Interactive Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item, idx) => {
          const rotAngle = idx % 2 === 0 ? -1.5 : 1.5;
          return (
            <ScrollReveal
              key={item.id}
              direction="up"
              distance={28}
              delay={(idx % 4) * 80}
              rotate={rotAngle}
            >
              <div
                className="comic-box p-6 rounded-3xl bg-[#160d33] flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98] transition-transform relative group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-0.5 rounded-full text-black font-carter text-[11px] border border-black shadow-[2px_2px_0px_#000]"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.badge}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                        item.status === 'Approved'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                          : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {item.status === 'Approved' ? 'CONFIRMED' : 'PROPOSED'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-carter text-white tracking-wide leading-tight group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-purple-200/80 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                  <div className="text-[11px] font-mono text-purple-300 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{item.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.timeSlot}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="comic-btn w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-carter text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-1"
                  >
                    <span>Rules & Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Rules & Details Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl bg-[#170e35] rounded-3xl border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-rose-600 text-white border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-black font-carter text-xs border border-black mb-2" style={{ backgroundColor: activeModalItem.color }}>
              {activeModalItem.category}
            </div>

            <h3 className="font-carter text-3xl sm:text-4xl text-white tracking-wide">
              {activeModalItem.title}
            </h3>

            <p className="text-sm text-purple-200 mt-2 font-sans leading-relaxed">
              {activeModalItem.description}
            </p>

            <div className="my-5 p-4 rounded-2xl bg-black/40 border-2 border-black space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-purple-200">
                <span>VENUE:</span>
                <span className="text-white font-bold">{activeModalItem.venue}</span>
              </div>
              <div className="flex items-center justify-between text-purple-200">
                <span>SLOT:</span>
                <span className="text-amber-400 font-bold">{activeModalItem.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between text-purple-200">
                <span>FORMAT:</span>
                <span className="text-white font-bold">
                  {activeModalItem.isTeam ? `Team (${activeModalItem.minTeam}-${activeModalItem.maxTeam} members)` : 'Solo Performance'}
                </span>
              </div>
            </div>

            {/* Rules list */}
            <div>
              <h4 className="font-carter text-lg text-amber-300 mb-2">Competition Guidelines:</h4>
              <ul className="space-y-2 text-xs text-purple-100 font-sans">
                {activeModalItem.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coordinators */}
            {activeModalItem.coordinators.length > 0 && (
              <div className="mt-5 pt-4 border-t border-white/10 text-xs font-mono text-purple-300">
                <p className="font-bold text-amber-400 mb-1">Student Coordinators:</p>
                <div className="flex flex-wrap gap-4">
                  {activeModalItem.coordinators.map((c, i) => (
                    <span key={i}>
                      {c.name} {c.phone && `(${c.phone})`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <Link
                href="/#register"
                onClick={() => setActiveModalItem(null)}
                className="comic-btn flex-1 py-3 text-center bg-amber-400 hover:bg-amber-300 text-black font-carter text-sm uppercase rounded-xl"
              >
                Claim Free Attendance Pass
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
