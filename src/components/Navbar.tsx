'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Ticket } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

interface NavItem {
  label: string;
  href: string;
  rotation: number;
  hoverBg: string;
  textColor: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/#about', rotation: -6, hoverBg: '#f59e0b', textColor: '#000000' },
  { label: 'Activities', href: '/#activities', rotation: 6, hoverBg: '#ec4899', textColor: '#ffffff' },
  { label: 'Schedule', href: '/#schedule', rotation: -5, hoverBg: '#3b82f6', textColor: '#ffffff' },
  { label: 'Gallery', href: '/#gallery', rotation: 5, hoverBg: '#10b981', textColor: '#000000' },
  { label: 'FAQ', href: '/#faq', rotation: -4, hoverBg: '#06b6d4', textColor: '#000000' },
  { label: 'Team', href: '/#team', rotation: 4, hoverBg: '#8b5cf6', textColor: '#ffffff' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090514]/90 backdrop-blur-md border-b-2 border-black/80 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Institution Badge */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-amber-400 border-2 border-black flex items-center justify-center font-carter text-2xl text-black shadow-[3px_3px_0px_#000] -rotate-6 group-hover:rotate-0 transition-transform">
            Z
          </div>
          <div className="flex flex-col text-left">
            <span className="font-carter text-2xl sm:text-3xl tracking-wide text-white leading-none drop-shadow-[2px_2px_0px_#000]">
              ZUN<span className="text-amber-400">OO</span>N
            </span>
            <span className="text-[10px] font-mono text-purple-300 tracking-wider">
              {FEST_CONFIG.shortInstitution}
            </span>
          </div>
        </Link>

        {/* Desktop Tilted Sticker Navigation */}
        <nav className="hidden lg:flex items-center gap-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{ transform: `rotate(${item.rotation}deg)` }}
              className="px-3.5 py-1.5 rounded-lg font-carter text-sm uppercase tracking-wide border-2 border-black bg-white/10 text-white shadow-[3px_3px_0px_#000] transition-all hover:scale-110 active:scale-95"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = item.hoverBg;
                e.currentTarget.style.color = item.textColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls: My Pass & Free Register */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/pass"
            className="flex items-center justify-center gap-1.5 w-10 h-10 sm:w-auto sm:h-auto sm:px-3.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-carter text-xs sm:text-sm uppercase border-2 border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] hover:scale-105 active:scale-95 transition-all -rotate-2"
            title="View my digital attendance pass"
            aria-label="View digital attendance pass"
          >
            <Ticket className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">My Pass</span>
          </Link>

          <a
            href="#register"
            className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-xs sm:text-sm uppercase border-2 border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] hover:scale-105 active:scale-95 transition-all rotate-2"
          >
            <span>Register</span>
            <span className="hidden sm:inline">Free</span>
          </a>

          {/* Mobile Menu Toggle - 44x44px accessible touch target */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 text-white border-2 border-black shadow-[2px_2px_0px_#000] active:scale-95 transition-transform"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 lg:hidden mt-3 bg-[#130b2c] border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl font-carter text-base border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-between active:scale-98 transition-transform"
                style={{ backgroundColor: item.hoverBg, color: item.textColor }}
              >
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-white/20 flex gap-2.5">
              <Link
                href="/pass"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-carter text-center text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5"
              >
                <Ticket className="w-4 h-4" />
                <span>View Pass</span>
              </Link>
              <a
                href="#register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-black font-carter text-center text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]"
              >
                Register Free
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
