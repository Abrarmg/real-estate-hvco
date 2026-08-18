import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Clock, Activity } from 'lucide-react';

interface InteractiveAuditCtaProps {
  onStartAudit: () => void;
}

export const InteractiveAuditCta: React.FC<InteractiveAuditCtaProps> = ({ onStartAudit }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#090E17] border-y border-slate-800 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5" />
          <span>FREE REAL ESTATE PIPELINE DIAGNOSTIC</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Curious Where <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">YOUR</span> Leads Are Leaking?
        </h2>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Answer a few simple questions about your current lead process and get your personalized Lead Leakage Score and recovery opportunities in under 3 minutes.
        </p>

        {/* Button & Microcopy */}
        <div className="space-y-4 pt-2">
          <button
            id="midpage-start-audit-btn"
            onClick={onStartAudit}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg sm:text-xl tracking-tight transition-all duration-200 shadow-2xl shadow-emerald-950 hover:shadow-emerald-900/60 active:scale-[0.98] cursor-pointer"
          >
            <span>Start My Free Audit</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              Takes 3 minutes
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Free
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              No obligation
            </span>
          </div>
        </div>

        {/* Quick Sample Steps Snapshot */}
        <div className="pt-8 max-w-2xl mx-auto grid grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 font-mono-num uppercase">01 / DIAGNOSE</span>
            <p className="text-xs font-semibold text-slate-200">12 Quick Multiple-Choice Questions</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 font-mono-num uppercase">02 / SCORE</span>
            <p className="text-xs font-semibold text-slate-200">Instant Lead Recovery Calculation</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 font-mono-num uppercase">03 / RECOVER</span>
            <p className="text-xs font-semibold text-slate-200">Tailored Actionable Leak Fixes</p>
          </div>
        </div>

      </div>
    </section>
  );
};
