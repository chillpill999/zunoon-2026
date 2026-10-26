'use client';

import { useState, useMemo } from 'react';
import {
  Trophy,
  BookOpen,
  Terminal,
  Palette,
  Sparkles,
  Search,
  CheckCircle2,
  ExternalLink,
  X,
  MapPin,
  Clock,
  Users,
  AlertCircle,
  FileText,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { CLUBS, FEST_EVENTS, FestEvent, ClubCategory } from '@/data/events';
import ScrollReveal from '@/components/ScrollReveal';

const QUICK_TAG_FILTERS = [
  'All',
  'Boys',
  'Girls',
  'English Only',
  'Solo',
  'Team',
  'Singles / Doubles',
];

export default function EventRegistrationPortal() {
  const [selectedClub, setSelectedClub] = useState<ClubCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeModalEvent, setActiveModalEvent] = useState<FestEvent | null>(null);
  const [modalTab, setModalTab] = useState<'register' | 'rules'>('register');

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return FEST_EVENTS.filter((event) => {
      // Club filter
      if (selectedClub !== 'all' && event.club !== selectedClub) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'All') {
        const matchesTag = event.tags.some((t) =>
          t.toLowerCase().includes(selectedTag.toLowerCase())
        );
        const matchesBadge = event.badge.toLowerCase().includes(selectedTag.toLowerCase());
        const matchesFormat = event.format.toLowerCase().includes(selectedTag.toLowerCase());
        if (!matchesTag && !matchesBadge && !matchesFormat) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = event.title.toLowerCase().includes(q);
        const inDesc = event.description.toLowerCase().includes(q);
        const inVenue = event.venue.toLowerCase().includes(q);
        const inBadge = event.badge.toLowerCase().includes(q);
        const inTags = event.tags.some((t) => t.toLowerCase().includes(q));
        const inClub = event.clubName.toLowerCase().includes(q);
        return inTitle || inDesc || inVenue || inBadge || inTags || inClub;
      }

      return true;
    });
  }, [selectedClub, selectedTag, searchQuery]);

  const openEventModal = (event: FestEvent, tab: 'register' | 'rules' = 'register') => {
    setActiveModalEvent(event);
    setModalTab(tab);
  };

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-24">
      {/* Anchor alias so #register scrolls here as well */}
      <div id="register" className="absolute -top-24 left-0 pointer-events-none" />
      <div id="activities" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Header & Category Intro */}
      <ScrollReveal direction="up" distance={24}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-black border-2 sm:border-3 border-black text-xs font-carter tracking-widest uppercase shadow-[3px_3px_0px_#000] -rotate-1 mb-4">
            <Trophy className="w-4 h-4" />
            <span>FESTIVAL COMPETITIONS & CLUB ARENAS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-carter tracking-wide text-white drop-shadow-[5px_5px_0px_#000] uppercase mt-1">
            REGISTER FOR <span className="text-amber-400">EVENTS</span>
          </h2>

          <p className="font-chewy text-xl sm:text-2xl text-purple-200 mt-2 max-w-2xl mx-auto">
            Choose your arena across all 5 student clubs. 29 major competitions with official certificates, trophies, and glory for all LNJPIT batches.
          </p>
        </div>
      </ScrollReveal>

      {/* Blitzschlag Style Club Pill Switchers */}
      <ScrollReveal direction="up" distance={20} delay={50}>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {/* "All" Category Pill */}
          <button
            onClick={() => setSelectedClub('all')}
            className={`comic-btn px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-carter uppercase tracking-wide transition-all flex items-center gap-2 ${
              selectedClub === 'all'
                ? 'bg-amber-400 text-black shadow-[4px_4px_0px_#000] -rotate-1 scale-105'
                : 'bg-[#180f33] text-purple-200 hover:text-white border-2 border-black/80 hover:bg-[#201445]'
            }`}
          >
            <span>All Arenas</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                selectedClub === 'all' ? 'bg-black text-amber-400' : 'bg-white/10 text-white'
              }`}
            >
              {FEST_EVENTS.length}
            </span>
          </button>

          {/* Individual Club Switcher Pills */}
          {CLUBS.map((club, idx) => {
            const isSelected = selectedClub === club.id;
            const rot = idx % 2 === 0 ? '-1deg' : '1deg';

            return (
              <button
                key={club.id}
                onClick={() => setSelectedClub(club.id)}
                className={`comic-btn px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-carter uppercase tracking-wide transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'text-black shadow-[4px_4px_0px_#000]'
                    : 'bg-[#180f33] text-purple-200 hover:text-white border-2 border-black/80 hover:bg-[#201445]'
                }`}
                style={{
                  backgroundColor: isSelected ? club.color : undefined,
                  transform: isSelected ? `rotate(${rot}) scale(1.05)` : 'none',
                }}
              >
                {club.id === 'literary' && <BookOpen className="w-4 h-4 shrink-0" />}
                {club.id === 'technical' && <Terminal className="w-4 h-4 shrink-0" />}
                {club.id === 'sports' && <Trophy className="w-4 h-4 shrink-0" />}
                {club.id === 'art' && <Palette className="w-4 h-4 shrink-0" />}
                {club.id === 'cultural' && <Sparkles className="w-4 h-4 shrink-0" />}

                <span>{club.shortName}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isSelected ? 'bg-black text-white' : 'bg-white/10 text-white'
                  }`}
                >
                  {club.eventCount}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Search Input & Quick Filter Chips */}
      <div className="comic-box p-4 sm:p-5 rounded-3xl bg-[#140b2e] border-3 border-black shadow-[6px_6px_0px_#000] mb-10 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 29 competitions (e.g. Blind Coding, Circuitron, Hackathon, BGMI, Singing)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/50 border-2 border-black text-white placeholder-purple-300/60 text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white p-1"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {QUICK_TAG_FILTERS.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition-all ${
                    active
                      ? 'bg-amber-400 text-black border border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-purple-300">
          <span>
            Showing <strong className="text-amber-400">{filteredEvents.length}</strong> of{' '}
            {FEST_EVENTS.length} events
          </span>
          {(searchQuery || selectedTag !== 'All' || selectedClub !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('All');
                setSelectedClub('all');
              }}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Reset filters</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Blitzschlag Style Event Cards */}
      {filteredEvents.length === 0 ? (
        <div className="comic-box p-12 rounded-3xl bg-[#160d33] text-center max-w-lg mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h3 className="font-carter text-2xl text-white">No Competitions Found</h3>
          <p className="text-purple-200 text-sm font-sans mt-2">
            No events match your current filter &ldquo;{searchQuery || selectedTag}&rdquo;. Try resetting the filters to explore all 29 events.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('All');
              setSelectedClub('all');
            }}
            className="comic-btn mt-5 px-6 py-2 bg-amber-400 text-black font-carter text-sm uppercase rounded-xl"
          >
            Show All Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, idx) => {
            const rot = idx % 3 === 0 ? '-1deg' : idx % 3 === 1 ? '1deg' : '0deg';
            const hasForm = Boolean(event.formUrl || (event.formUrls && event.formUrls.length > 0));

            return (
              <ScrollReveal
                key={event.id}
                direction="up"
                distance={24}
                delay={(idx % 6) * 60}
              >
                <div
                  className="comic-box p-6 rounded-3xl bg-[#160c33] border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-all relative group h-full"
                  style={{ transform: `rotate(${rot})` }}
                >
                  {/* Top Bar: Club Badge & Event Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-black font-carter text-[11px] border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-wide shrink-0"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.clubName}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-md bg-amber-950/60 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold">
                        {event.badge}
                      </span>
                    </div>

                    {/* Event Title */}
                    <h3 className="text-2xl sm:text-3xl font-carter text-white tracking-wide leading-tight group-hover:text-amber-300 transition-colors">
                      {event.title}
                    </h3>

                    {/* Format & Eligibility Tag Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-[10px] font-bold">
                        {event.format}
                      </span>
                      {event.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-black/40 text-purple-200 border border-white/10 font-mono text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-purple-200/80 mt-3 line-clamp-3 leading-relaxed font-sans">
                      {event.description}
                    </p>
                  </div>

                  {/* Bottom Meta & Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-white/10 space-y-3.5">
                    <div className="text-[11px] font-mono text-purple-300 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{event.timeSlot}</span>
                      </div>
                    </div>

                    {/* Live Form Status */}
                    {hasForm ? (
                      <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                        <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                          <span>Google Form Live</span>
                        </span>
                        <span className="text-purple-300 text-[10px]">
                          {event.coordinators.length} {event.coordinators.length === 1 ? 'Lead' : 'Leads'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                        <span className="inline-flex items-center gap-1.5 text-purple-300 font-medium bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Form Releasing Soon</span>
                        </span>
                        <span className="text-purple-300 text-[10px]">
                          {event.coordinators.length} {event.coordinators.length === 1 ? 'Lead' : 'Leads'}
                        </span>
                      </div>
                    )}

                    {/* Dual Action CTA Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => openEventModal(event, 'register')}
                        className="comic-btn py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_#000]"
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{hasForm ? 'Register' : 'Details'}</span>
                      </button>

                      <button
                        onClick={() => openEventModal(event, 'rules')}
                        className="comic-btn py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-carter text-xs uppercase tracking-wide flex items-center justify-center gap-1 border-2 border-black shadow-[3px_3px_0px_#000]"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Rulebook</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      )}

      {/* Active Modal: Blitzschlag Registration & Rulebook Drawer */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#170e35] rounded-3xl border-4 border-black p-5 sm:p-8 shadow-[10px_10px_0px_#000] max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white border-2 border-black shadow-[2px_2px_0px_#000] z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-12">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="px-3 py-0.5 rounded-full text-black font-carter text-xs border border-black uppercase"
                  style={{ backgroundColor: activeModalEvent.color }}
                >
                  {activeModalEvent.clubName}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white font-mono text-[11px] font-bold">
                  {activeModalEvent.badge}
                </span>
              </div>

              <h3 className="font-carter text-3xl sm:text-4xl text-white tracking-wide">
                {activeModalEvent.title}
              </h3>

              <p className="text-xs sm:text-sm text-purple-200 mt-2 font-sans leading-relaxed">
                {activeModalEvent.description}
              </p>
            </div>

            {/* Event Key Specs Box */}
            <div className="my-5 p-4 rounded-2xl bg-black/50 border-2 border-black grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <span className="text-purple-300 block">FORMAT:</span>
                <span className="text-white font-bold">{activeModalEvent.format}</span>
              </div>
              <div>
                <span className="text-purple-300 block">VENUE:</span>
                <span className="text-amber-400 font-bold truncate block">{activeModalEvent.venue}</span>
              </div>
              <div>
                <span className="text-purple-300 block">SLOT:</span>
                <span className="text-white font-bold">{activeModalEvent.timeSlot}</span>
              </div>
            </div>

            {/* Modal Tab Switcher (Register vs Rules) */}
            <div className="flex border-b-2 border-black mb-6">
              <button
                onClick={() => setModalTab('register')}
                className={`flex-1 py-2.5 text-center font-carter text-xs sm:text-sm uppercase tracking-wide border-b-4 transition-all flex items-center justify-center gap-1.5 ${
                  modalTab === 'register'
                    ? 'border-amber-400 text-amber-400 bg-white/5'
                    : 'border-transparent text-purple-300 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Official Registration</span>
              </button>

              <button
                onClick={() => setModalTab('rules')}
                className={`flex-1 py-2.5 text-center font-carter text-xs sm:text-sm uppercase tracking-wide border-b-4 transition-all flex items-center justify-center gap-1.5 ${
                  modalTab === 'rules'
                    ? 'border-amber-400 text-amber-400 bg-white/5'
                    : 'border-transparent text-purple-300 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Rulebook & Coordinators</span>
              </button>
            </div>

            {/* TAB 1: OFFICIAL REGISTRATION */}
            {modalTab === 'register' && (
              <div className="space-y-6">
                {/* Multi-Division Google Forms (e.g. Cricket Boys/Girls, Esports) */}
                {activeModalEvent.formUrls && activeModalEvent.formUrls.length > 0 ? (
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-pink-500/20 border-3 border-amber-400 text-center shadow-[4px_4px_0px_#000]">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-carter text-xs uppercase mb-3 inline-block shadow-[2px_2px_0px_#000]">
                      Official Google Forms Ready
                    </span>
                    <h4 className="font-carter text-xl sm:text-2xl text-white mb-2">
                      Choose Your Tournament Division
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-100 mb-5 max-w-lg mx-auto font-sans font-medium leading-relaxed">
                      Select your tournament division below to fill out the official registration form for <strong className="text-amber-300">{activeModalEvent.title}</strong>:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
                      {activeModalEvent.formUrls.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="comic-btn flex-1 px-4 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-carter text-xs sm:text-sm uppercase rounded-xl inline-flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000] border-2 border-black transition-transform active:translate-x-0.5 active:translate-y-0.5"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-4 h-4 shrink-0" />
                        </a>
                      ))}
                    </div>
                    <p className="text-[10px] font-mono text-purple-300/80 mt-4">
                      100% Free Participation • Verified LNJPIT Aarambh 2.0 Registration Form
                    </p>
                  </div>
                ) : activeModalEvent.formUrl ? (
                  /* Single Official Google Form */
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-[#1d0e3b] border-3 border-amber-400 text-center shadow-[4px_4px_0px_#000]">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-carter text-xs uppercase mb-3 inline-block shadow-[2px_2px_0px_#000]">
                      Official Google Form Ready
                    </span>
                    <h4 className="font-carter text-xl sm:text-2xl text-white mb-2">
                      Fill Official Registration Form
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-100 mb-5 max-w-lg mx-auto font-sans font-medium leading-relaxed">
                      The official registration Google Form is live for <strong className="text-amber-300">{activeModalEvent.title}</strong>. Click below to submit your details and confirm your spot:
                    </p>
                    <a
                      href={activeModalEvent.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comic-btn w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-carter text-sm sm:text-base uppercase tracking-wider rounded-2xl inline-flex items-center justify-center gap-2.5 shadow-[4px_4px_0px_#000] border-3 border-black transition-transform active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <Trophy className="w-5 h-5 shrink-0" />
                      <span>OPEN OFFICIAL GOOGLE FORM</span>
                      <ExternalLink className="w-5 h-5 shrink-0" />
                    </a>
                    <p className="text-[10px] font-mono text-purple-300/80 mt-4">
                      100% Free Participation • Official LNJPIT Aarambh 2.0 Registration
                    </p>
                  </div>
                ) : (
                  /* Form Releasing Soon Notice */
                  <div className="p-6 rounded-2xl bg-purple-900/40 border-2 border-purple-500/30 text-center shadow-[4px_4px_0px_#000]">
                    <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <span className="px-3 py-1 rounded-full bg-purple-800 text-purple-200 font-mono text-[11px] font-bold uppercase mb-2 inline-block">
                      Registration Form Releasing Soon
                    </span>
                    <h4 className="font-carter text-xl text-white mb-2">
                      Official Form Coming Shortly
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-200 max-w-md mx-auto font-sans leading-relaxed">
                      The official registration Google Form for <strong className="text-amber-300">{activeModalEvent.title}</strong> is being prepared by the student coordinators and will be live shortly.
                    </p>
                    <button
                      onClick={() => setModalTab('rules')}
                      className="comic-btn mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-carter text-xs sm:text-sm uppercase rounded-xl inline-flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000]"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Rules & Contact Coordinators</span>
                    </button>
                  </div>
                )}

                {/* Direct Coordinator Assistance Block */}
                {activeModalEvent.coordinators.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border-2 border-black shadow-[4px_4px_0px_#000]">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h5 className="font-carter text-sm text-amber-400 flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-400" />
                        <span>Need Help? Contact Coordinators ({activeModalEvent.coordinators.length})</span>
                      </h5>
                      <span className="text-[10px] font-mono text-purple-300">Direct Contact</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                      {activeModalEvent.coordinators.map((c, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-[#120826] border border-purple-500/30 flex items-center justify-between gap-2 shadow-[2px_2px_0px_#000]"
                        >
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs truncate">{c.name}</p>
                            {c.role && (
                              <p className="text-[10px] font-mono text-purple-300/80 truncate">
                                {c.role}
                              </p>
                            )}
                          </div>
                          {c.phone ? (
                            <a
                              href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
                              className="px-2 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400 hover:text-black border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors"
                              title={`Call ${c.name}`}
                            >
                              <Phone className="w-3 h-3" />
                              <span>{c.phone.replace('+91 ', '')}</span>
                            </a>
                          ) : (
                            <span className="text-[10px] font-mono text-purple-400/60 italic">Coordinator</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: RULES & COORDINATORS */}
            {modalTab === 'rules' && (
              <div className="space-y-6">
                {/* Guidelines list */}
                <div>
                  <h4 className="font-carter text-lg text-amber-300 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Official Competition Guidelines:</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-purple-100 font-sans">
                    {activeModalEvent.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coordinators Contact Box */}
                {activeModalEvent.coordinators.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border-3 border-black shadow-[4px_4px_0px_#000]">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h5 className="font-carter text-sm sm:text-base text-amber-400 flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-400" />
                        <span>Student Coordinators ({activeModalEvent.coordinators.length})</span>
                      </h5>
                      <span className="text-[10px] font-mono text-purple-300">Direct Contact</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                      {activeModalEvent.coordinators.map((c, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-[#120826] border border-purple-500/30 flex items-center justify-between gap-2 shadow-[2px_2px_0px_#000]"
                        >
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs truncate">{c.name}</p>
                            {c.role && (
                              <p className="text-[10px] font-mono text-purple-300/80 truncate">
                                {c.role}
                              </p>
                            )}
                          </div>
                          {c.phone ? (
                            <a
                              href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
                              className="px-2 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400 hover:text-black border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors"
                              title={`Call ${c.name}`}
                            >
                              <Phone className="w-3 h-3" />
                              <span>{c.phone.replace('+91 ', '')}</span>
                            </a>
                          ) : (
                            <span className="text-[10px] font-mono text-purple-400/60 italic">Coordinator</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Switch to Register Button */}
                <button
                  onClick={() => setModalTab('register')}
                  className="comic-btn w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-carter text-sm uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2"
                >
                  <span>Proceed to Official Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
