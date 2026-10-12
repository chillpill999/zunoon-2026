import { Sparkles, Heart, GraduationCap, Flame } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto relative">
      <div className="text-center mb-14">
        <span className="px-4 py-1 rounded-full bg-amber-400 text-black border-2 border-black text-xs font-carter tracking-widest uppercase shadow-[2px_2px_0px_#000]">
          ABOUT THE EXTRAVAGANZA
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-carter tracking-wide text-white drop-shadow-[4px_4px_0px_#000] mt-3">
          WELCOME TO THE ODYSSEY
        </h2>
        <p className="font-chewy text-xl text-purple-200 mt-2 max-w-2xl mx-auto">
          {FEST_CONFIG.tagline}
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="comic-box p-8 sm:p-12 rounded-3xl bg-[#170e35] relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 font-sans text-sm sm:text-base text-purple-100/90 leading-relaxed">
          <p>
            <strong className="text-amber-400 font-carter text-lg uppercase tracking-wide">ZUNOON</strong> is the quintessential welcome gala of{' '}
            <span className="text-white font-bold">{FEST_CONFIG.institution}</span>, Chapra. It represents an initiation into a vibrant campus life where equations and blueprints meet theatre, rhythm, runway style, and unbounded artistic passion.
          </p>
          <p>
            Organized collaboratively by senior student councils and cultural societies, Zunoon breaks the barriers of departments and semesters. Whether you step into the spotlight to contend for the crown of <em>Mr. & Ms. Freshers</em>, rock the stage in acoustic harmony, or join the roar of the crowd, this festival is where your college story begins.
          </p>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="comic-box p-6 rounded-3xl bg-[#1a103c] -rotate-1 hover:rotate-0 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="font-carter text-2xl text-white tracking-wide">Freshers Induction</h3>
          <p className="text-xs text-purple-200/80 mt-2 font-sans leading-relaxed">
            Welcoming the newly enrolled batch into the LNJPIT family with warmth, mentorship, and unforgettable camaraderie.
          </p>
        </div>

        <div className="comic-box p-6 rounded-3xl bg-[#1a103c] rotate-1 hover:rotate-0 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center mb-4">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-carter text-2xl text-white tracking-wide">Talent Spotlight</h3>
          <p className="text-xs text-purple-200/80 mt-2 font-sans leading-relaxed">
            Giving engineering students a platform to unleash their artistic fire across dance, vocal music, street theatre, and fashion.
          </p>
        </div>

        <div className="comic-box p-6 rounded-3xl bg-[#1a103c] -rotate-1 hover:rotate-0 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-carter text-2xl text-white tracking-wide">Lifelong Bonds</h3>
          <p className="text-xs text-purple-200/80 mt-2 font-sans leading-relaxed">
            Forging memories and friendships that endure long after exams and degrees. One campus, one spirit.
          </p>
        </div>
      </div>
    </section>
  );
}
