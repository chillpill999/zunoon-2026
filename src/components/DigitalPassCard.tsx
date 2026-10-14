'use client';

import { useRef } from 'react';
import { Download, Ticket, CheckCircle2, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

export interface PassData {
  admitId: string;
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
  branch: string;
  batchYear: string;
  interests?: string[];
  participateMrMsFreshers?: boolean;
  registeredAt: string;
  status: string;
  qrToken: string;
}

export default function DigitalPassCard({ pass, onReset }: { pass: PassData; onReset?: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=svg&data=${encodeURIComponent(
    pass.qrToken || `${pass.admitId}:${pass.rollNumber}`
  )}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center max-w-md w-full mx-auto">
      {/* Physical-style Festival Admit Card */}
      <div
        ref={cardRef}
        className="w-full rounded-3xl bg-gradient-to-b from-[#1b103e] to-[#0f0827] border-4 border-black p-6 shadow-[8px_8px_0px_#000] relative overflow-hidden select-none print:shadow-none print:border-2"
      >
        {/* Top Perforation / Tag Hole */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-black/80 border border-white/20" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Fest Header */}
        <div className="text-center mt-2 pb-4 border-b-2 border-dashed border-white/20">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-black font-carter text-[10px] tracking-widest uppercase border border-black shadow-[2px_2px_0px_#000] mb-1.5">
            <Ticket className="w-3 h-3" /> OFFICIAL ATTENDANCE PASS
          </div>
          <h3 className="font-carter text-3xl sm:text-4xl text-white tracking-wide uppercase drop-shadow-[2px_2px_0px_#000]">
            ZUN<span className="text-amber-400">OO</span>N
          </h3>
          <p className="text-xs font-mono text-purple-300 tracking-wider">
            {FEST_CONFIG.shortInstitution} • FRESHERS FEST
          </p>
        </div>

        {/* QR Code & Admit Reference */}
        <div className="my-5 flex flex-col items-center">
          <div className="p-3 bg-white rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt={`QR Attendance Pass for ${pass.fullName}`}
              className="w-40 h-40 object-contain"
              loading="lazy"
            />
            {/* Animated Security Hologram Watermark */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/20 to-transparent pointer-events-none rounded-xl animate-pulse" />
          </div>

          <span className="mt-3 font-mono font-bold text-sm tracking-widest text-amber-400 bg-black/60 px-3 py-1 rounded-lg border border-amber-400/40">
            {pass.admitId}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> VERIFIED • ENTRY PERMITTED
          </span>
        </div>

        {/* Attendee Details Grid */}
        <div className="bg-black/40 rounded-2xl p-4 border-2 border-black space-y-2.5 text-xs font-mono">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-purple-300">ATTENDEE</span>
            <span className="font-carter text-sm text-white">{pass.fullName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-purple-300">ROLL NO</span>
            <span className="font-bold text-amber-300">{pass.rollNumber}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-purple-300">BRANCH</span>
            <span className="font-bold text-white">{pass.branch}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-purple-300">BATCH</span>
            <span className="text-white/90">{pass.batchYear}</span>
          </div>

          {pass.participateMrMsFreshers && (
            <div className="pt-2 border-t border-white/10 flex justify-between items-center text-amber-400">
              <span>SPECIAL CONTEST</span>
              <span className="font-bold">MR/MS FRESHERS CONTESTANT</span>
            </div>
          )}
        </div>

        {/* Guidelines Footer */}
        <div className="mt-4 pt-3 border-t-2 border-dashed border-white/20 text-[10px] text-purple-300/80 text-center space-y-1">
          <p className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Present at LNJPIT Gate alongside your physical College ID card</span>
          </p>
          <p className="text-[9px] text-purple-400">Non-transferable • Zero Entry Fees</p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full print:hidden">
        <button
          onClick={handlePrint}
          className="comic-btn flex-1 py-3 px-5 bg-amber-400 hover:bg-amber-300 text-black font-carter text-sm uppercase rounded-xl flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Save / Print Pass</span>
        </button>

        {onReset && (
          <button
            onClick={onReset}
            className="comic-btn py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-carter text-xs uppercase rounded-xl"
          >
            New Entry
          </button>
        )}
      </div>
    </div>
  );
}
