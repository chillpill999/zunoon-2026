import Link from 'next/link';
import { Mail, Phone, MapPin, Heart, Ticket, GraduationCap } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

export default function Footer() {
  return (
    <footer className="w-full bg-[#070312] border-t-4 border-black text-white pt-14 pb-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Col 1: Brand & Institution */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 border-2 border-black flex items-center justify-center font-carter text-xl text-black shadow-[3px_3px_0px_#000] -rotate-6">
              A
            </div>
            <span className="font-carter text-xl tracking-wide text-white">
              AARAMBH <span className="text-amber-400">2.0</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-sans">
            The grand freshers welcome festival of {FEST_CONFIG.institution}, celebrating student creativity, cultural performance, and campus brotherhood.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {FEST_CONFIG.socials.instagram && (
              <a
                href={FEST_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-pink-600 text-white border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-110 transition-transform flex items-center justify-center"
                aria-label="AARAMBH 2.0 Official Instagram (@aarambh_lnjpit_26)"
                title="AARAMBH 2.0 Official Instagram (@aarambh_lnjpit_26)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
            {FEST_CONFIG.socials.youtube && (
              <a
                href={FEST_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-rose-600 text-white border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-110 transition-transform flex items-center justify-center"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <p className="font-carter text-base sm:text-lg text-amber-400 tracking-wide">Explore Aarambh 2.0</p>
          <ul className="space-y-2 text-xs sm:text-sm text-purple-200/90 font-medium">
            <li>
              <Link href="/#about" className="hover:text-amber-400 transition-colors">
                About the Freshers Fest
              </Link>
            </li>
            <li>
              <Link href="/#activities" className="hover:text-amber-400 transition-colors">
                Activities & Pageant
              </Link>
            </li>
            <li>
              <Link href="/#schedule" className="hover:text-amber-400 transition-colors">
                Event Schedule & Timeline
              </Link>
            </li>
            <li>
              <Link href="/#gallery" className="hover:text-amber-400 transition-colors">
                Campus Gallery
              </Link>
            </li>
            <li>
              <Link href="/#register" className="hover:text-amber-400 transition-colors">
                Free Registration
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Campus & Contact */}
        <div className="space-y-3">
          <p className="font-carter text-base sm:text-lg text-amber-400 tracking-wide">Campus Desk</p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-purple-200/90 font-medium">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{FEST_CONFIG.contact.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{FEST_CONFIG.contact.phone.join(', ')}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{FEST_CONFIG.contact.campusAddress}</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Entry Notice */}
        <div className="space-y-3">
          <p className="font-carter text-base sm:text-lg text-amber-400 tracking-wide">Admission Policy</p>
          <div className="p-4 rounded-2xl bg-[#140b2e] border-2 border-black text-xs font-mono text-purple-200/90 space-y-2 shadow-[3px_3px_0px_#000]">
            <p className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5" /> 100% Free Festival
            </p>
            <p className="text-[11px] leading-relaxed">
              No payment or paid passes exist. Generate your free digital pass and present your LNJPIT ID card at the gate.
            </p>
            <div className="flex flex-col gap-1.5">
              <Link
                href="/pass"
                className="inline-block mt-1 text-amber-400 underline underline-offset-4 hover:text-amber-300 font-bold text-[11px]"
              >
                Access Your Digital Pass →
              </Link>
              <Link
                href="/scan"
                className="inline-block text-purple-300 hover:text-amber-400 font-mono text-[10px] opacity-80 hover:opacity-100 transition-opacity"
              >
                Gate Scanner (Volunteers) →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/70 gap-3">
        <p>© 2026 AARAMBH 2.0 • {FEST_CONFIG.institution}, Chapra. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> of{' '}
          <a
            href={FEST_CONFIG.socials.hothlali || "https://www.instagram.com/hothlali_department/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 transition-colors"
          >
            hothlali department
          </a>
        </p>
      </div>
    </footer>
  );
}
