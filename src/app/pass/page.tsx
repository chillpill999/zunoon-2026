'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Ticket, Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';
import DigitalPassCard, { PassData } from '@/components/DigitalPassCard';

export default function PassPage() {
  const [pass, setPass] = useState<PassData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zunoon_pass');
      if (stored) {
        setPass(JSON.parse(stored));
      }
    } catch {
      // Local storage unavailable
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-[80vh] px-4 py-12 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <div className="mb-6 self-start">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-carter text-xs border border-white/20 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-amber-400">
          Loading digital pass...
        </div>
      ) : pass ? (
        <div className="w-full">
          <div className="text-center mb-6">
            <h1 className="font-carter text-3xl sm:text-4xl text-white tracking-wide">
              YOUR DIGITAL ENTRY PASS
            </h1>
            <p className="text-xs font-mono text-purple-200 mt-1">
              Save this pass to your phone. Present the QR code at the LNJPIT campus gate for entry.
            </p>
          </div>
          <DigitalPassCard
            pass={pass}
            onReset={() => {
              if (confirm('Do you want to register another attendee or start over?')) {
                localStorage.removeItem('zunoon_pass');
                setPass(null);
              }
            }}
          />
        </div>
      ) : (
        <div className="comic-box p-8 sm:p-12 rounded-3xl bg-[#170e35] max-w-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-black border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center mx-auto -rotate-6">
            <Ticket className="w-8 h-8" />
          </div>

          <h2 className="font-carter text-3xl text-white">No Pass Found Yet!</h2>
          <p className="text-sm text-purple-200/90 font-sans leading-relaxed">
            You haven't generated a free attendance pass on this device yet. Complete the quick free registration form to get your instant QR pass.
          </p>

          <div className="pt-2">
            <Link
              href="/#register"
              className="comic-btn inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-carter text-base rounded-xl uppercase tracking-wide"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Free Pass Now</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
