import React from 'react';
import { Activity, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onStartAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartAudit }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B111E]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Tool Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-950">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white uppercase">
                Real Estate Lead Leakage Audit<span className="text-emerald-400 text-xs align-top ml-0.5">™</span>
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 font-medium tracking-wide uppercase">
              US Real Estate Paid Lead Diagnostic Tool
            </p>
          </div>
        </div>

        {/* Diagnostic Status & Quick CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono-num text-[11px] text-slate-300">2026 AGENT BENCHMARK ACTIVE</span>
          </div>

          <button
            id="nav-start-audit-btn"
            onClick={onStartAudit}
            className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-md shadow-emerald-950 hover:shadow-emerald-900/40 active:scale-[0.98] cursor-pointer"
          >
            <span>Start Free Audit</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
