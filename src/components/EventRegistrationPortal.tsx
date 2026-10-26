'use client';

import { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  BookOpen,
  Terminal,
  Palette,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  X,
  MapPin,
  Clock,
  Users,
  Award,
  ChevronRight,
  Share2,
  AlertCircle,
  FileText,
  Check,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { CLUBS, FEST_EVENTS, FestEvent, ClubCategory } from '@/data/events';
import ScrollReveal from '@/components/ScrollReveal';

const BRANCH_OPTIONS = [
  'Computer Science & Engineering (CSE)',
  'Civil Engineering (CE)',
  'Mechanical Engineering (ME)',
  'Electrical & Electronics Engineering (EEE)',
  'Food Processing & Preservation (FPP)',
  'Mathematics & Computing (M&C)',
];

const BATCH_OPTIONS = [
  '1st Year / Fresher (Batch 2026)',
  '2nd Year / Senior (Batch 2025)',
  '3rd Year / Senior (Batch 2024)',
  '4th Year / Senior (Batch 2023)',
];

const QUICK_TAG_FILTERS = [
  'All',
  'Boys',
  'Girls',
  'English Only',
  'Solo',
  'Team',
  'Singles / Doubles',
];

interface RegisteredRecord {
  eventId: string;
  eventTitle: string;
  clubName: string;
  fullName: string;
  rollNumber: string;
  branch: string;
  phone: string;
  subCategory?: string;
  teamName?: string;
  registeredAt: string;
}

export default function EventRegistrationPortal() {
  const [selectedClub, setSelectedClub] = useState<ClubCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeModalEvent, setActiveModalEvent] = useState<FestEvent | null>(null);
  const [modalTab, setModalTab] = useState<'register' | 'rules'>('register');
  const [showMyRegistrations, setShowMyRegistrations] = useState(false);

  // Local storage state for registered competitions
  const [registrations, setRegistrations] = useState<RegisteredRecord[]>([]);

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    phone: '',
    branch: BRANCH_OPTIONS[0],
    batchYear: BATCH_OPTIONS[0],
    subCategory: '',
    teamName: '',
    teamMembers: '',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Load saved registrations on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aarambh_registered_events');
      if (stored) {
        setRegistrations(JSON.parse(stored));
      }
    } catch {
      // LocalStorage error non-fatal
    }
  }, []);

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
    setFormSuccess(null);
    setFormError(null);

    // Autofill defaults if available
    setFormData((prev) => ({
      ...prev,
      subCategory: event.tags[0] || '',
      teamName: '',
      teamMembers: '',
    }));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalEvent) return;

    setFormError(null);
    setFormSubmitting(true);

    if (!formData.fullName.trim() || !formData.rollNumber.trim() || !formData.phone.trim()) {
      setFormError('Please enter your Full Name, Roll Number, and WhatsApp Number.');
      setFormSubmitting(false);
      return;
    }

    try {
      const record: RegisteredRecord = {
        eventId: activeModalEvent.id,
        eventTitle: activeModalEvent.title,
        clubName: activeModalEvent.clubName,
        fullName: formData.fullName.trim(),
        rollNumber: formData.rollNumber.trim().toUpperCase(),
        branch: formData.branch,
        phone: formData.phone.trim(),
        subCategory: formData.subCategory || undefined,
        teamName: formData.teamName ? formData.teamName.trim() : undefined,
        registeredAt: new Date().toISOString(),
      };

      const updated = [...registrations.filter((r) => r.eventId !== activeModalEvent.id), record];
      localStorage.setItem('aarambh_registered_events', JSON.stringify(updated));
      setRegistrations(updated);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#f43f5e', '#3b82f6', '#10b981'],
        });
      } catch {
        // Confetti fallback
      }

      setFormSuccess(`Successfully registered for ${activeModalEvent.title}! Your spot is confirmed.`);
    } catch {
      setFormError('Could not save registration locally. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const isEventRegistered = (id: string) => {
    return registrations.some((r) => r.eventId === id);
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
            Choose your arena across all 5 student clubs. 27 major competitions with official certificates, trophies, and glory for all LNJPIT batches.
          </p>

          {/* User Registration Status Badge */}
          {registrations.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2">
              <button
                onClick={() => setShowMyRegistrations(true)}
                className="comic-btn px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-carter text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>You are registered for {registrations.length} {registrations.length === 1 ? 'event' : 'events'}</span>
                <span className="underline ml-1">View list →</span>
              </button>
            </div>
          )}
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
              placeholder="Search 27 competitions (e.g. Debate, Live Painting, BGMI, Singing, Hackathon)..."
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
            const registered = isEventRegistered(event.id);
            const rot = idx % 3 === 0 ? '-1deg' : idx % 3 === 1 ? '1deg' : '0deg';

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
                  {/* Top Bar: Club Badge & Registered Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-black font-carter text-[11px] border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-wide shrink-0"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.clubName}
                      </span>

                      {registered ? (
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-500/60 font-mono text-[10px] font-bold flex items-center gap-1 shadow-sm">
                          <Check className="w-3 h-3" /> REGISTERED
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-950/60 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold">
                          {event.badge}
                        </span>
                      )}
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

                    {/* Dual Action CTA Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => openEventModal(event, 'register')}
                        className={`comic-btn py-2.5 px-3 rounded-xl font-carter text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 border-2 border-black ${
                          registered
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[3px_3px_0px_#000]'
                            : 'bg-amber-400 hover:bg-amber-300 text-black shadow-[3px_3px_0px_#000]'
                        }`}
                      >
                        {registered ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Registered</span>
                          </>
                        ) : (
                          <>
                            <Trophy className="w-3.5 h-3.5" />
                            <span>Register</span>
                          </>
                        )}
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
                <span>Register for Competition</span>
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

            {/* TAB 1: REGISTRATION */}
            {modalTab === 'register' && (
              <div>
                {/* Check if official Google Form URL is available */}
                {activeModalEvent.formUrl ? (
                  <div className="mb-6 p-5 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-center">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-carter text-xs uppercase mb-2 inline-block">
                      Official Form Ready
                    </span>
                    <p className="text-xs sm:text-sm text-purple-100 mb-4 font-sans">
                      The official registration Google Form is live for {activeModalEvent.title}. Click below to complete your registration directly.
                    </p>
                    <a
                      href={activeModalEvent.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comic-btn px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-carter text-sm uppercase rounded-xl inline-flex items-center gap-2 shadow-[3px_3px_0px_#000]"
                    >
                      <span>Open Official Google Form</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="mb-5 p-3 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs font-mono flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Official Google Form is releasing shortly by coordinators. Complete this on-site pre-registration to reserve your participation spot now!
                    </span>
                  </div>
                )}

                {/* Success Message Banner */}
                {formSuccess && (
                  <div className="mb-5 p-4 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 text-xs font-mono flex items-center gap-2 shadow-[3px_3px_0px_#000]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{formSuccess}</span>
                  </div>
                )}

                {/* Error Banner */}
                {formError && (
                  <div className="mb-5 p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 text-xs font-mono flex items-center gap-2 shadow-[3px_3px_0px_#000]">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Built-in On-Site Registration Form */}
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-amber-300 mb-1">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Adarsh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border-2 border-black text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Roll Number */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-amber-300 mb-1">
                        COLLEGE ROLL NUMBER *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        placeholder="e.g. 23105128042"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border-2 border-black text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Branch */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-amber-300 mb-1">
                        ENGINEERING BRANCH *
                      </label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border-2 border-black text-white text-xs font-sans focus:outline-none focus:border-amber-400"
                      >
                        {BRANCH_OPTIONS.map((b) => (
                          <option key={b} value={b} className="bg-[#170e35] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Batch Year */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-amber-300 mb-1">
                        BATCH YEAR *
                      </label>
                      <select
                        value={formData.batchYear}
                        onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/60 border-2 border-black text-white text-xs font-sans focus:outline-none focus:border-amber-400"
                      >
                        {BATCH_OPTIONS.map((batch) => (
                          <option key={batch} value={batch} className="bg-[#170e35] text-white">
                            {batch}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-amber-300 mb-1">
                        WHATSAPP / PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border-2 border-black text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Event Format / Sub-Category */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-amber-300 mb-1">
                        CATEGORY / FORMAT SELECTION
                      </label>
                      <input
                        type="text"
                        value={formData.subCategory}
                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                        placeholder={
                          activeModalEvent.tags[0] || 'e.g. Boys Singles, BGMI, Solo'
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border-2 border-black text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Team details if applicable */}
                  {(activeModalEvent.format.toLowerCase().includes('team') ||
                    activeModalEvent.format.toLowerCase().includes('squad') ||
                    activeModalEvent.format.toLowerCase().includes('duo')) && (
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                      <p className="text-xs font-mono text-purple-200 font-bold flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>Team Information (For group competitions):</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={formData.teamName}
                          onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                          placeholder="Team / Squad Name (e.g. Phoenix Warriors)"
                          className="w-full px-3 py-2 rounded-xl bg-black/70 border border-black text-white text-xs font-sans focus:outline-none focus:border-amber-400"
                        />
                        <input
                          type="text"
                          value={formData.teamMembers}
                          onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                          placeholder="Teammates' Names & Roll Numbers (comma-separated)"
                          className="w-full px-3 py-2 rounded-xl bg-black/70 border border-black text-white text-xs font-sans focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="comic-btn w-full py-3.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-carter text-sm uppercase tracking-wider rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2"
                    >
                      <Trophy className="w-4 h-4" />
                      <span>{formSubmitting ? 'Confirming...' : 'CONFIRM EVENT REGISTRATION'}</span>
                    </button>
                    <p className="text-[10px] font-mono text-purple-300 text-center mt-2">
                      100% Free Participation • Official LNJPIT Aarambh 2.0 Registration
                    </p>
                  </div>
                </form>
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
                  <div className="p-4 rounded-2xl bg-black/50 border-2 border-black">
                    <h5 className="font-carter text-sm text-amber-400 mb-2">Student Coordinators:</h5>
                    <div className="space-y-2 text-xs font-mono text-purple-200">
                      {activeModalEvent.coordinators.map((c, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-1">
                          <span className="font-bold text-white">{c.name}</span>
                          <span className="text-purple-300">{c.role}</span>
                          {c.phone && <span className="text-amber-400">{c.phone}</span>}
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
                  <span>Proceed to Register for {activeModalEvent.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* "My Registered Events" Modal */}
      {showMyRegistrations && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl bg-[#170e35] rounded-3xl border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowMyRegistrations(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-rose-600 text-white border-2 border-black"
              aria-label="Close registered events list"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-amber-400" />
              <h3 className="font-carter text-2xl text-white">Your Registered Events</h3>
            </div>

            {registrations.length === 0 ? (
              <p className="text-sm font-sans text-purple-200">
                You haven&apos;t registered for any events yet. Pick a competition above and register!
              </p>
            ) : (
              <div className="space-y-3">
                {registrations.map((r, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-black/50 border-2 border-black flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-carter text-base text-amber-300 block">{r.eventTitle}</span>
                      <span className="font-mono text-purple-300 text-[11px]">
                        {r.clubName} • {r.fullName} ({r.rollNumber})
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/50 font-mono text-[10px] font-bold shrink-0">
                      CONFIRMED
                    </span>
                  </div>
                ))}

                <button
                  onClick={() => setShowMyRegistrations(false)}
                  className="comic-btn w-full mt-4 py-2.5 bg-amber-400 text-black font-carter text-xs uppercase rounded-xl border border-black"
                >
                  Close & Explore More Events
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
