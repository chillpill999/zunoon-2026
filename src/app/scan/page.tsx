'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Search,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  LogOut,
  KeyRound,
} from 'lucide-react';
import { FEST_CONFIG } from '@/data/config';

interface AttendeeInfo {
  admitId?: string;
  fullName?: string;
  rollNumber?: string;
  branch?: string;
  batchYear?: string;
  attendedAt?: string;
}

interface ScanResult {
  valid: boolean;
  reason: 'VERIFIED' | 'ALREADY_CHECKED_IN' | 'NOT_FOUND' | 'ERROR';
  message: string;
  attendee?: AttendeeInfo;
  rawText: string;
  timeScanned: string;
}

export default function GateScanPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [scannerStarted, setScannerStarted] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [manualCode, setManualCode] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html5QrCodeRef = useRef<any>(null);

  // Check stored staff session
  useEffect(() => {
    try {
      const storedPin = sessionStorage.getItem('aarambh_staff_pin') || sessionStorage.getItem('zunoon_staff_pin');
      if (storedPin) {
        setPinInput(storedPin);
        setIsAuthenticated(true);
      }
    } catch {
      // Session storage unavailable
    }
  }, []);

  // Web Audio chime player
  const playBeep = useCallback((type: 'success' | 'duplicate' | 'error') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'duplicate') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(330, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      } else {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.12); // E3
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Audio restricted before interaction
    }
  }, [soundEnabled]);

  // Authenticate Staff Passcode
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch('/api/scan/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput, action: 'authenticate' }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid staff passcode.');
      }

      sessionStorage.setItem('aarambh_staff_pin', pinInput);
      sessionStorage.setItem('zunoon_staff_pin', pinInput);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAuthError(err.message);
      } else {
        setAuthError('Authentication failed. Please verify credentials.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = () => {
    stopScanner();
    sessionStorage.removeItem('aarambh_staff_pin');
    sessionStorage.removeItem('zunoon_staff_pin');
    setPinInput('');
    setIsAuthenticated(false);
    setLastResult(null);
  };

  // Server-side Pass Verification
  const verifyPassWithServer = async (token: string) => {
    if (verifying) return;
    setVerifying(true);
    setErrorMsg(null);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    try {
      const currentPin = sessionStorage.getItem('aarambh_staff_pin') || sessionStorage.getItem('zunoon_staff_pin') || pinInput;
      const res = await fetch('/api/scan/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: currentPin, token }),
      });

      const data = await res.json();

      if (res.status === 401) {
        // Session expired or invalidated
        setIsAuthenticated(false);
        sessionStorage.removeItem('aarambh_staff_pin');
        sessionStorage.removeItem('zunoon_staff_pin');
        throw new Error('Staff authorization expired. Please log in again.');
      }

      const result: ScanResult = {
        valid: Boolean(data.valid),
        reason: data.reason || (data.valid ? 'VERIFIED' : 'NOT_FOUND'),
        message: data.message || (data.valid ? 'Entry granted.' : 'Invalid pass.'),
        attendee: data.attendee,
        rawText: token,
        timeScanned: now,
      };

      setLastResult(result);
      setScanHistory((prev) => [result, ...prev.slice(0, 29)]);

      if (result.valid) {
        playBeep('success');
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
      } else if (result.reason === 'ALREADY_CHECKED_IN') {
        playBeep('duplicate');
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }
      } else {
        playBeep('error');
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([300]);
        }
      }
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : 'Network error during verification';
      setErrorMsg(errorText);
      const failedResult: ScanResult = {
        valid: false,
        reason: 'ERROR',
        message: errorText,
        rawText: token,
        timeScanned: now,
      };
      setLastResult(failedResult);
      playBeep('error');
    } finally {
      setVerifying(false);
    }
  };

  const startScanner = async () => {
    try {
      setErrorMsg(null);
      const { Html5Qrcode } = await import('html5-qrcode');

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode('qr-reader');
      }

      const qrCode = html5QrCodeRef.current;
      await qrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText: string) => {
          verifyPassWithServer(decodedText);
        },
        () => {
          // ignore scan frame errors
        }
      );
      setScannerStarted(true);
    } catch (err: unknown) {
      console.error('Failed to start camera scanner:', err);
      setErrorMsg('Camera access denied or unavailable. Use manual code check-in below.');
      setScannerStarted(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && scannerStarted) {
      try {
        await html5QrCodeRef.current.stop();
        setScannerStarted(false);
      } catch (err) {
        console.warn('Error stopping scanner:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    verifyPassWithServer(manualCode.trim());
    setManualCode('');
  };

  // SCREEN 1: Staff Passcode Authentication Barrier
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070312] text-white pt-28 pb-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.25),rgba(255,255,255,0))] pointer-events-none" />

        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono border border-white/20 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
          </div>

          <div className="comic-box p-8 rounded-3xl bg-[#150a30] text-center shadow-[8px_8px_0px_#000]">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-black border-3 border-black flex items-center justify-center mx-auto mb-5 shadow-[4px_4px_0px_#000] -rotate-3">
              <KeyRound className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold tracking-widest uppercase">
              RESTRICTED GATE ACCESS
            </span>

            <h1 className="font-carter text-2xl sm:text-3xl text-white tracking-wide uppercase mt-3">
              VOLUNTEER SCANNER
            </h1>

            <p className="text-xs text-purple-200/80 mt-2 font-mono">
              Authorized gate staff credentials required to verify festival attendee passes.
            </p>

            {authError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-mono text-left">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-amber-300 uppercase font-bold text-left mb-1.5">
                  Staff Passcode:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter Gate Passcode"
                    className="w-full px-4 py-3 bg-black/60 border-2 border-black rounded-xl text-white text-sm font-mono focus:border-amber-400 focus:outline-none shadow-[3px_3px_0px_#000]"
                  />
                  <Lock className="w-4 h-4 text-purple-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="comic-btn w-full py-3.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-carter text-sm uppercase rounded-xl tracking-wide shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Scanner</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-purple-300/70">
              {FEST_CONFIG.institution} • Gate Security
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 2: Authenticated Scanner Interface
  return (
    <div className="min-h-screen bg-[#070312] text-white pt-24 pb-16 px-4 sm:px-6 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.2),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono border border-white/20 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-purple-300"
              title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-purple-400" />}
            </button>
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Lock Scanner Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400 text-black font-carter text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] -rotate-2 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Gate Staff Authenticated
          </div>
          <h1 className="font-carter text-3xl sm:text-4xl text-white tracking-wide uppercase drop-shadow-[2px_2px_0px_#000]">
            AARAMBH 2.0 <span className="text-amber-400">ENTRY SCANNER</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-2 font-mono">
            {FEST_CONFIG.shortInstitution} • Gate Security & Attendee Verification
          </p>
        </div>

        {/* Active Scan Result Banner */}
        {verifying && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-950/80 border-2 border-amber-400 text-amber-200 text-xs font-mono flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Verifying pass against LNJPIT festival database...</span>
          </div>
        )}

        {lastResult && !verifying && (
          <div
            className={`mb-8 p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_#000] transition-all animate-in fade-in zoom-in-95 duration-200 ${
              lastResult.valid
                ? 'bg-gradient-to-br from-emerald-900/90 to-emerald-950 border-emerald-400/80 text-white'
                : lastResult.reason === 'ALREADY_CHECKED_IN'
                ? 'bg-gradient-to-br from-amber-950 to-orange-950 border-amber-400/90 text-white'
                : 'bg-gradient-to-br from-rose-950 to-red-950 border-rose-500/80 text-white'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {lastResult.valid ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 shrink-0" />
                ) : lastResult.reason === 'ALREADY_CHECKED_IN' ? (
                  <AlertTriangle className="w-10 h-10 text-amber-400 shrink-0" />
                ) : (
                  <XCircle className="w-10 h-10 text-rose-400 shrink-0" />
                )}
                <div>
                  <h2 className="font-carter text-2xl tracking-wide uppercase">
                    {lastResult.valid
                      ? 'ENTRY PERMITTED'
                      : lastResult.reason === 'ALREADY_CHECKED_IN'
                      ? 'DUPLICATE ENTRY'
                      : 'INVALID PASS'}
                  </h2>
                  <p className="text-xs font-mono text-white/80">
                    Scanned at {lastResult.timeScanned} • Gate 1
                  </p>
                </div>
              </div>
              <button
                onClick={() => setLastResult(null)}
                className="px-3 py-1 rounded-xl bg-black/40 hover:bg-black/60 text-xs font-mono border border-white/20"
              >
                Clear
              </button>
            </div>

            {/* Attendee Info Card */}
            {lastResult.attendee ? (
              <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono">
                <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                  <span className="text-purple-300 text-xs block">STUDENT NAME</span>
                  <span className="font-carter text-base text-white">{lastResult.attendee.fullName}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                  <span className="text-purple-300 text-xs block">ROLL NUMBER</span>
                  <span className="font-bold text-amber-300">{lastResult.attendee.rollNumber}</span>
                </div>
                {lastResult.attendee.branch && (
                  <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                    <span className="text-purple-300 text-xs block">DEPARTMENT</span>
                    <span className="text-white text-xs">{lastResult.attendee.branch}</span>
                  </div>
                )}
                {lastResult.attendee.admitId && (
                  <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                    <span className="text-purple-300 text-xs block">ADMIT ID</span>
                    <span className="text-white">{lastResult.attendee.admitId}</span>
                  </div>
                )}
                <div className="sm:col-span-2 text-xs font-mono pt-1 text-white/90">
                  {lastResult.message}
                </div>
              </div>
            ) : (
              <div className="mt-4 text-xs font-mono text-rose-200">
                {lastResult.message} Direct attendee to the LNJPIT Cultural Council Helpdesk.
              </div>
            )}
          </div>
        )}

        {/* Scanner Container */}
        <div className="bg-[#12082b] border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000] mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" />
              <span className="font-carter text-lg text-white">Live Camera Reader</span>
            </div>
            {scannerStarted ? (
              <button
                onClick={stopScanner}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-carter text-xs uppercase border border-black shadow-[2px_2px_0px_#000]"
              >
                Stop Camera
              </button>
            ) : (
              <button
                onClick={startScanner}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-carter text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                Open Camera
              </button>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-amber-950/80 border border-amber-500/50 text-xs text-amber-200 font-mono">
              {errorMsg}
            </div>
          )}

          {/* QR Reader Mounting Element */}
          <div
            id="qr-reader"
            className={`w-full overflow-hidden rounded-2xl border-2 border-black bg-black min-h-[260px] flex items-center justify-center ${
              scannerStarted ? 'block' : 'hidden'
            }`}
          />

          {!scannerStarted && (
            <div className="text-center py-10 px-4 border-2 border-dashed border-white/20 rounded-2xl bg-black/30">
              <Camera className="w-12 h-12 text-purple-400/60 mx-auto mb-3" />
              <p className="text-sm font-carter text-white">Camera is currently paused</p>
              <p className="text-xs text-purple-300/80 mt-1 max-w-sm mx-auto font-mono">
                Tap &ldquo;Open Camera&rdquo; above to point your phone camera at an attendee&apos;s digital pass QR code.
              </p>
            </div>
          )}

          {/* Manual Input Fallback */}
          <form onSubmit={handleManualSubmit} className="mt-6 pt-4 border-t border-white/10">
            <label className="block text-xs font-mono text-purple-300 mb-2">
              Manual Check-in (Roll Number or Admit ID):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="e.g. 24105123045 or ZN-2026-XXXXX"
                className="flex-1 bg-black/60 border-2 border-black rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-purple-400/50 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={verifying}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-carter text-xs uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Verify</span>
              </button>
            </div>
          </form>
        </div>

        {/* Scan History Log */}
        {scanHistory.length > 0 && (
          <div className="bg-[#12082b] border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <span className="font-carter text-lg text-white">Recent Gate Log</span>
              <span className="text-xs font-mono text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-amber-400/30">
                {scanHistory.length} Scanned
              </span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {scanHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    {item.valid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : item.reason === 'ALREADY_CHECKED_IN' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-white mr-2">
                        {item.attendee?.fullName || 'Unknown'}
                      </span>
                      <span className="text-purple-300">
                        {item.attendee?.rollNumber || item.rawText.slice(0, 16)}
                      </span>
                    </div>
                  </div>
                  <span className="text-purple-400 text-[10px]">{item.timeScanned}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
