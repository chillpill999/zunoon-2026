import { Phone, Mail, Award, ShieldCheck, Heart } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

interface Member {
  name: string;
  role: string;
  badge: string;
  color: string;
}

const COMMITTEE_MEMBERS: Member[] = [
  {
    name: "Dr. B. K. Singh",
    role: "Chief Patron & Principal, LNJPIT",
    badge: "PATRON",
    color: "#f59e0b",
  },
  {
    name: "Faculty Advisory Board",
    role: "Cultural Committee Heads, LNJPIT",
    badge: "FACULTY MENTORS",
    color: "#3b82f6",
  },
  {
    name: "Aman Raj & Team",
    role: "Overall Student Convener",
    badge: "STUDENT HEAD",
    color: "#ec4899",
  },
  {
    name: "Events & Stage Crew",
    role: "Stage, Lighting & Coordination",
    badge: "PRODUCTION",
    color: "#10b981",
  },
  {
    name: "Media & Technical Team",
    role: "Web Architecture, Design & Media",
    badge: "TECH CREW",
    color: "#06b6d4",
  },
  {
    name: "Discipline & Security Council",
    role: "Campus Safety & Gate Verification",
    badge: "VOLUNTEERS",
    color: "#8b5cf6",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto relative">
      <div className="text-center mb-14">
        <span className="px-4 py-1 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold tracking-widest uppercase">
          LEADERSHIP & COMMITTEE
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000] mt-3">
          BEHIND THE CURTAIN
        </h2>
        <p className="font-chewy text-xl text-purple-200 mt-2 max-w-xl mx-auto">
          Dedicated faculty guides, senior organizers, and student volunteers making Zunoon possible.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMITTEE_MEMBERS.map((m, idx) => (
          <div
            key={idx}
            className="comic-box p-6 rounded-3xl bg-[#170e35] flex flex-col justify-between"
            style={{ transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1deg'})` }}
          >
            <div>
              <span
                className="px-3 py-0.5 rounded-full text-black font-carter text-[10px] tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000]"
                style={{ backgroundColor: m.color }}
              >
                {m.badge}
              </span>

              <h3 className="font-carter text-2xl text-white mt-3 tracking-wide">
                {m.name}
              </h3>

              <p className="text-xs font-mono text-purple-300 mt-1">
                {m.role}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-purple-200/80">
              <span>{FEST_CONFIG.shortInstitution}</span>
              <span className="text-amber-400">LNJPIT Chapra</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
