'use client';

const SPONSORS = [
  { name: 'Red Bull', tier: 'Energy Partner', color: 'from-amber-400 to-rose-500' },
  { name: 'Spotify', tier: 'Audio Streaming Partner', color: 'from-emerald-400 to-green-600' },
  { name: 'Fastrack', tier: 'Youth Styling Partner', color: 'from-cyan-400 to-blue-600' },
  { name: 'Boat', tier: 'Audio Lifestyle Partner', color: 'from-rose-500 to-red-600' },
  { name: 'Dominos', tier: 'Food Partner', color: 'from-blue-500 to-indigo-600' },
  { name: 'Zebronics', tier: 'Gaming & Sound Partner', color: 'from-purple-500 to-pink-500' },
  { name: 'MTV Beats', tier: 'Music Channel Partner', color: 'from-yellow-400 to-orange-500' },
  { name: 'Radio Mirchi', tier: 'Official Radio Partner', color: 'from-red-500 to-rose-600' },
];

export default function Marquee() {
  return (
    <section className="w-full py-8 bg-[#130b2c] border-y-4 border-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center mb-4">
        <span className="font-carter text-xs sm:text-sm tracking-widest uppercase text-amber-400 bg-black/40 px-3 py-1 rounded-full border border-amber-400/40">
          PROUDLY POWERED BY OUR OFFICIAL PARTNERS
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex select-none">
        {/* Continuous Marquee Ticker */}
        <div className="animate-marquee flex items-center gap-6 sm:gap-10 px-4">
          {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#1e133e] border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-105 transition-transform"
            >
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${sponsor.color} border-2 border-black flex items-center justify-center font-carter text-white text-base font-bold shadow-[2px_2px_0px_#000] -rotate-6`}
              >
                {sponsor.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-carter text-base text-white tracking-wide leading-tight">
                  {sponsor.name}
                </p>
                <p className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                  {sponsor.tier}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
