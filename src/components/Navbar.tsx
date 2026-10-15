'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Activities', href: '/#activities' },
  { label: 'Schedule', href: '/#schedule' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Team', href: '/#team' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all">
      <header className="pointer-events-auto max-w-7xl mx-auto rounded-2xl sm:rounded-full bg-white/[0.14] hover:bg-white/[0.18] backdrop-blur-md sm:backdrop-blur-xl backdrop-saturate-150 border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),0_0_25px_rgba(255,255,255,0.18),inset_0_1px_2px_0_rgba(255,255,255,0.5)] px-3 sm:px-7 py-2 sm:py-2.5 transition-all duration-300 transform-gpu will-change-transform">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Institution Badge */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-400 border-2 border-black flex items-center justify-center font-carter text-lg sm:text-2xl text-black shadow-[2px_2px_0px_#000] -rotate-6 group-hover:rotate-0 transition-transform shrink-0">
              A
            </div>
            <div className="flex flex-col text-left justify-center min-w-0">
              <span className="font-carter text-[15px] sm:text-2xl tracking-wide text-white leading-tight whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                AARAMBH <span className="text-amber-400">2.0</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-white/80 tracking-wider truncate block leading-none mt-0.5">
                {FEST_CONFIG.shortInstitution}
              </span>
            </div>
          </Link>

          {/* Desktop Frosted Glass Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full font-carter text-sm uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Controls: My Pass & Free Register */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              href="/pass"
              className="h-8 sm:h-9 px-2.5 sm:px-4 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 text-white font-carter text-xs sm:text-sm uppercase shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all backdrop-blur-md flex items-center justify-center gap-1.5 shrink-0"
              title="View my digital attendance pass"
              aria-label="View digital attendance pass"
            >
              <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-amber-300" />
              <span className="hidden sm:inline">My Pass</span>
            </Link>

            <a
              href="#register"
              className="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-carter text-xs sm:text-sm uppercase border-2 border-black shadow-[2px_2px_0px_#000] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1 shrink-0 whitespace-nowrap"
            >
              <span>Register</span>
              <span className="hidden sm:inline">Free</span>
            </a>

            {/* Mobile Menu Toggle - Two clean horizontal bars matching Blitzschlag */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 flex flex-col items-center justify-center gap-1 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] active:scale-95 transition-all shrink-0"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <span className="font-carter text-base text-white">✕</span>
              ) : (
                <>
                  <span className="w-4 h-[2px] bg-white rounded-full shadow-sm" />
                  <span className="w-4 h-[2px] bg-white rounded-full shadow-sm" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer & Backdrop */}
        {mobileOpen && (
          <div className="relative z-50 lg:hidden mt-3 bg-black/75 backdrop-blur-2xl border border-white/25 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl font-carter text-sm uppercase tracking-wider text-white hover:bg-white/15 transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-white/20 flex gap-2">
              <Link
                href="/pass"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-carter text-center text-xs uppercase rounded-xl flex items-center justify-center gap-1.5"
              >
                <Ticket className="w-4 h-4 text-amber-300" />
                <span>View Pass</span>
              </Link>
              <a
                href="#register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-carter text-center text-xs uppercase rounded-xl border border-black shadow-[2px_2px_0px_#000]"
              >
                Register Free
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
