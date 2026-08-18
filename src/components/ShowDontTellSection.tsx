import React from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, TrendingUp, Sparkles, FileText } from 'lucide-react';

interface ShowDontTellSectionProps {
  onStartAudit: () => void;
}

export const ShowDontTellSection: React.FC<ShowDontTellSectionProps> = ({ onStartAudit }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#0B111E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>SAMPLE DIAGNOSTIC DELIVERABLE</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Here's What Your Report Could Look Like
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300">
            No generic fluff. You'll receive a quantitative breakdown of your 5 pipeline pillars, your primary leakage bottleneck, and a tailored recovery roadmap.
          </p>
        </div>

        {/* Detailed Report Visual Mockup */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-800/80 via-slate-900 to-[#0F172A] p-2 border border-slate-700/80 shadow-2xl shadow-black/80">
            <div className="rounded-2xl bg-[#0F172A] p-6 sm:p-10 space-y-8">
              
              {/* Report Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-num font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      OFFICIAL AUDIT REPORT
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      CONFIDENTIAL
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    LEAD LEAKAGE AUDIT™
                  </h3>
                  <p className="text-xs text-slate-400">Agent Performance & Infrastructure Assessment</p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-semibold text-emerald-300 self-start sm:self-auto shadow-sm">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>PERSONALIZED TO YOUR ANSWERS</span>
                </div>
              </div>

              {/* Top Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Score Big Card */}
                <div className="md:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Overall Lead Flow Score
                    </span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-5xl sm:text-6xl font-black font-mono-num text-white">38</span>
                      <span className="text-xl font-bold text-slate-500 font-mono-num">/100</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      HIGH LEAKAGE RISK
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Your current setup lets over half of acquired ad leads slip through without persistent follow-up.
                    </p>
                  </div>
                </div>

                {/* Pillar Gauges */}
                <div className="md:col-span-7 space-y-3.5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Lead Flow Health By Pillar</span>
                    <span className="text-[11px] text-slate-500">Benchmark vs Top 5%</span>
                  </h4>

                  {/* 1. Speed */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Speed-to-Lead</span>
                      <span className="font-mono-num font-bold text-amber-400">31%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '31%' }} />
                    </div>
                  </div>

                  {/* 2. Follow-Up */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Follow-Up Persistence</span>
                      <span className="font-mono-num font-bold text-rose-400">24%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '24%' }} />
                    </div>
                  </div>

                  {/* 3. Qualification */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Lead Qualification</span>
                      <span className="font-mono-num font-bold text-emerald-400">61%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '61%' }} />
                    </div>
                  </div>

                  {/* 4. Appointment Flow */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Appointment Flow</span>
                      <span className="font-mono-num font-bold text-amber-400">47%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '47%' }} />
                    </div>
                  </div>

                  {/* 5. Reactivation */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Database Reactivation</span>
                      <span className="font-mono-num font-bold text-rose-400">12%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Action Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-950/90 border border-rose-500/30 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> 🚨 Priority #1 Leakage
                  </span>
                  <h4 className="text-base font-bold text-white">Follow-Up Gap</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your biggest opportunity appears to be the gap between the initial lead response and ongoing follow-up. 80% of non-responsive leads are never touched after day 2.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> ⚡ Suggested Improvement
                  </span>
                  <h4 className="text-base font-bold text-white">Automated Lead Nurture + Human Handoff</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Implement an intelligent 14-day multi-channel conversational cadence that continues engaging until the prospect responds, then immediately alerts the agent.
                  </p>
                </div>
              </div>

              {/* Direct CTA Prompt inside Mockup */}
              <div className="text-center pt-2">
                <button
                  onClick={onStartAudit}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base tracking-tight transition-all duration-200 shadow-lg shadow-emerald-950 cursor-pointer"
                >
                  <span>See Your Exact Scores & Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
