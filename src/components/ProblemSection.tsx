import React from 'react';
import { ArrowDown, AlertOctagon, UserPlus, PhoneCall, Filter, RefreshCw, Calendar, CheckCircle2, TrendingDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#0B111E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>THE REALITY OF PAID REAL ESTATE LEADS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Your Lead Problem Might Not Be Lead Generation
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            You can keep buying more leads. But if your response and follow-up system has leaks, you're simply pouring more leads into a bucket with holes.
          </p>
        </div>

        {/* Visual Funnel Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left / Top: Interactive Visual Funnel */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Standard Paid Lead Funnel Drop-off Analysis
                </span>
                <span className="text-xs font-mono-num text-rose-400 font-semibold flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> 70-80% DROP-OFF
                </span>
              </div>

              {/* Funnel Steps */}
              <div className="space-y-3 pt-2">
                
                {/* 1. Lead Generated */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">1. Lead Generated</span>
                      <p className="text-xs text-slate-400">Ad Click / Portal Form Submission</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono-num text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                    100% INFLOW
                  </span>
                </div>

                <div className="flex justify-center -my-1 text-slate-600">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* THE LEAKAGE ZONE CONTAINER HIGHLIGHT */}
                <div className="relative p-4 rounded-xl bg-rose-950/20 border-2 border-dashed border-rose-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-rose-400" />
                      THE CRITICAL LEAD LEAKAGE ZONE
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                      Where Money Is Lost
                    </span>
                  </div>

                  {/* 2. Lead Responded To */}
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between opacity-95">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                        <PhoneCall className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-200">2. Lead Responded To</span>
                        <p className="text-[11px] text-amber-400/90 font-medium">⚠️ 5+ minute delay = 80% drop in pick-up rate</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono-num text-amber-300 font-bold">~45% Reached</span>
                  </div>

                  {/* 3. Lead Qualified */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between opacity-85">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs">
                        <Filter className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-300">3. Lead Qualified</span>
                        <p className="text-[11px] text-slate-400">Budget, timeline & intent pre-screened</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono-num text-rose-300 font-bold">~25% Screened</span>
                  </div>

                  {/* 4. Lead Followed Up With */}
                  <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs">
                        <RefreshCw className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-300">4. Lead Followed Up With (5+ touches)</span>
                        <p className="text-[11px] text-slate-400">Average agent gives up after only 1.5 attempts</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono-num text-rose-400 font-bold">~12% Persisted</span>
                  </div>

                  {/* 5. Appointment Booked */}
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between opacity-65">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-300">5. Appointment Booked</span>
                        <p className="text-[11px] text-slate-400">Phone tag kills hot prospect momentum</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono-num text-rose-400 font-bold">~3-5% Booked</span>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-slate-600">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* 6. Closed Client */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-emerald-300">6. Closed Commission / Client</span>
                      <p className="text-xs text-slate-400">Buyer or Listing Agreement Executed</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono-num text-emerald-400">1-2% NET CONVERSION</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right / Bottom: The Core Realization Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Most agents focus heavily on getting more leads.
              </h3>
              
              <p className="text-base text-slate-300 leading-relaxed">
                The bigger opportunity may be what happens <span className="text-emerald-400 font-semibold">after the lead arrives</span>.
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold text-base leading-none mt-0.5">✕</span>
                  <p>Buying 50 more leads into a leaky 2-touch follow-up system just increases your monthly ad bill.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base leading-none mt-0.5">✓</span>
                  <p>Plugging the response and persistent nurture leak doubles appointment output without spending an extra dollar on ads.</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs sm:text-sm text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The 3-Minute Audit</strong> diagnoses exactly which step in your funnel has the largest drop-off so you know where to focus first.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
