'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Ticket, CheckCircle2, User, Phone, Mail, Award, BookOpen, AlertCircle } from 'lucide-react';
import DigitalPassCard, { PassData } from './DigitalPassCard';
import { FEST_CONFIG } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

const BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Civil Engineering (CE)',
  'Mechanical Engineering (ME)',
  'Electrical & Electronics Engineering (EEE)',
  'Food Processing & Preservation (FPP)',
  'Mathematics & Computing (M&C)',
];

const BATCHES = [
  '1st Year / Fresher (Batch 2026)',
  '2nd Year / Senior (Batch 2025)',
  '3rd Year / Senior (Batch 2024)',
  '4th Year / Senior (Batch 2023)',
];

export default function RegistrationSection() {
  const [existingPass, setExistingPass] = useState<PassData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    phone: '',
    branch: BRANCHES[0],
    batchYear: BATCHES[0],
    participateMrMsFreshers: false,
    interests: [] as string[],
  });

  // Check if student already has a registered pass on this device
  useEffect(() => {
    try {
      const stored = localStorage.getItem('zunoon_pass');
      if (stored) {
        setExistingPass(JSON.parse(stored));
      }
    } catch {
      // LocalStorage unavailable or corrupt
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed. Please check your details.');
      }

      // Success confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#f43f5e', '#3b82f6', '#10b981'],
        });
      } catch {
        // Confetti non-fatal
      }

      // Save pass locally
      localStorage.setItem('zunoon_pass', JSON.stringify(data.pass));
      setExistingPass(data.pass);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInterestToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  return (
    <section id="register" className="py-20 px-4 sm:px-8 max-w-5xl mx-auto relative">
      <ScrollReveal direction="up" distance={24}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <CheckCircle2 className="w-4 h-4" /> 100% FREE ENTRY & PARTICIPATION
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000]">
            CLAIM YOUR ATTENDANCE PASS
          </h2>
          <p className="font-chewy text-xl text-purple-200 mt-2 max-w-xl mx-auto">
            Zero fees. Complete your details below to generate your official Zunoon digital attendance pass and QR entry code.
          </p>
        </div>
      </ScrollReveal>

      {existingPass ? (
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-sm font-mono text-emerald-400 font-bold bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-500/30">
              Active Attendance Pass Found for this Device
            </span>
          </div>
          <DigitalPassCard
            pass={existingPass}
            onReset={() => {
              if (confirm('Do you want to register another attendee or start over?')) {
                localStorage.removeItem('zunoon_pass');
                setExistingPass(null);
              }
            }}
          />
        </div>
      ) : (
        <ScrollReveal direction="up" distance={30} delay={100}>
          <div className="comic-box p-6 sm:p-10 rounded-3xl bg-[#170e35] max-w-2xl mx-auto relative">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 text-sm font-mono flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-amber-300 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoComplete="name"
                  autoCapitalize="words"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0d0722] border-2 border-black rounded-xl text-white text-base sm:text-sm focus:border-amber-400 focus:outline-none shadow-[3px_3px_0px_#000]"
                />
                <User className="w-4 h-4 text-purple-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Roll Number & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase font-bold text-amber-300 mb-1.5">
                  LNJPIT Roll / Reg No *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    inputMode="text"
                    autoCapitalize="characters"
                    placeholder="e.g. 24105123045"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0d0722] border-2 border-black rounded-xl text-white text-base sm:text-sm focus:border-amber-400 focus:outline-none shadow-[3px_3px_0px_#000]"
                  />
                  <BookOpen className="w-4 h-4 text-purple-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-bold text-amber-300 mb-1.5">
                  WhatsApp Contact Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="[0-9]{10}"
                    title="10-digit mobile number"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0d0722] border-2 border-black rounded-xl text-white text-base sm:text-sm focus:border-amber-400 focus:outline-none shadow-[3px_3px_0px_#000]"
                  />
                  <Phone className="w-4 h-4 text-purple-400 absolute right-3.5 top-3.5" />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-amber-300 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  placeholder="e.g. student@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0d0722] border-2 border-black rounded-xl text-white text-base sm:text-sm focus:border-amber-400 focus:outline-none shadow-[3px_3px_0px_#000]"
                />
                <Mail className="w-4 h-4 text-purple-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Branch Selection */}
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-amber-300 mb-1.5">
                Engineering Department / Branch *
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-4 py-3 bg-[#0d0722] border-2 border-black rounded-xl text-white text-base sm:text-sm focus:border-amber-400 focus:outline-none shadow-[3px_3px_0px_#000]"
              >
                {BRANCHES.map((b) => (
                  <option key={b} value={b} className="bg-[#12092b]">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch / Year Selection */}
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-amber-300 mb-1.5">
                Academic Year *
              </label>
              <select
                value={formData.batchYear}
                onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                className="w-full px-4 py-3 bg-[#0d0722] border-2 border-black rounded-xl text-white text-base sm:text-sm focus:border-amber-400 focus:outline-none shadow-[3px_3px_0px_#000]"
              >
                {BATCHES.map((by) => (
                  <option key={by} value={by} className="bg-[#12092b]">
                    {by}
                  </option>
                ))}
              </select>
            </div>

            {/* Mr & Ms Freshers Contest Checkbox */}
            <div className="p-4 rounded-2xl bg-amber-400/10 border-2 border-amber-400/40">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.participateMrMsFreshers}
                  onChange={(e) => setFormData({ ...formData, participateMrMsFreshers: e.target.checked })}
                  className="w-5 h-5 mt-0.5 rounded border-black text-amber-500 focus:ring-0 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-carter text-amber-300 text-sm tracking-wide block">
                    Nominate me for Mr. & Ms. Freshers Pageant
                  </span>
                  <span className="text-purple-200/80 font-sans">
                    I would like to participate in the talent, ramp walk, and personality pageant rounds.
                  </span>
                </div>
              </label>
            </div>

            {/* Event Interest Badges */}
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-amber-300 mb-2">
                Select Events You'd Like to Attend / Compete In:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Dance Face-Off',
                  'Singing (Sur Sargam)',
                  'Street Play (Nukkad)',
                  'Stand-Up / Shayari',
                  'LAN Gaming / BGMI',
                  'Freshers DJ Celebration',
                ].map((item) => {
                  const selected = formData.interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleInterestToggle(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] transition-transform ${
                        selected
                          ? 'bg-amber-400 text-black scale-105'
                          : 'bg-white/5 text-purple-200 hover:bg-white/10'
                      }`}
                    >
                      {item} {selected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="comic-btn w-full py-4 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-carter text-lg uppercase rounded-2xl tracking-wide flex items-center justify-center gap-2 shadow-[5px_5px_0px_#000]"
              >
                {loading ? (
                  <span>Generating Attendance Pass...</span>
                ) : (
                  <>
                    <Ticket className="w-5 h-5" />
                    <span>Generate Free Attendance Pass</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] font-mono text-purple-300/70 mt-3">
                Completely Free • No Payment Information Required • Instant Admission Pass
              </p>
            </div>
          </form>
        </div>
      </ScrollReveal>
      )}
    </section>
  );
}
