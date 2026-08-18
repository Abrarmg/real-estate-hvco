import React from 'react';
import { Wifi, Battery, Signal, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DeskPhoneCompanion: React.FC = () => {
  return (
    <div className="relative w-[210px] xl:w-[230px] select-none pointer-events-auto">
      {/* Phone Contact Desk Shadow */}
      <div className="absolute -inset-x-2 -bottom-4 h-8 bg-slate-950/20 blur-xl rounded-full pointer-events-none transform translate-y-1" />
      <div className="absolute inset-x-2 -bottom-1 h-3 bg-slate-950/30 blur-xs rounded-full pointer-events-none" />

      {/* Titanium Outer Casing */}
      <div 
        className="relative rounded-[32px] p-[6px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-[0_20px_35px_-10px_rgba(15,23,42,0.35),0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-slate-950 transition-transform duration-300 hover:-translate-y-1"
      >
        {/* Side Buttons */}
        <div className="absolute -left-[2.5px] top-[55px] w-[2.5px] h-5 bg-slate-600 rounded-l-xs" />
        <div className="absolute -left-[2.5px] top-[80px] w-[2.5px] h-7 bg-slate-600 rounded-l-xs" />
        <div className="absolute -right-[2.5px] top-[70px] w-[2.5px] h-9 bg-slate-600 rounded-r-xs" />

        {/* Screen Bezel */}
        <div className="relative w-full rounded-[26px] bg-white overflow-hidden ring-1 ring-black/30 shadow-inner flex flex-col min-h-[380px]">
          
          {/* Top Status Bar & Dynamic Island */}
          <div className="relative z-20 w-full pt-2 px-4 pb-1.5 flex items-center justify-between text-slate-900 bg-slate-50 border-b border-slate-100">
            <span className="text-[9px] font-bold tracking-tight text-slate-900 font-mono">
              9:41
            </span>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-16 h-3.5 bg-slate-950 rounded-full flex items-center justify-end px-1.5 shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ring-[0.5px] ring-slate-700 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-900" />
              </div>
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1 text-slate-900">
              <Signal className="w-2.5 h-2.5 stroke-[2.5]" />
              <Wifi className="w-2.5 h-2.5 stroke-[2.5]" />
              <Battery className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>

          {/* Yellow Progress Bar */}
          <div className="w-full bg-slate-100 h-0.5">
            <div className="w-1/12 h-full bg-[#FFE500]" />
          </div>

          {/* Phone Screen Diagnostic Content */}
          <div className="p-3 flex-1 flex flex-col justify-between bg-white text-left">
            <div>
              {/* Question Indicator */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold tracking-wider uppercase text-slate-500">
                  Question 1 of 12
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-[8px] font-bold text-emerald-700 border border-emerald-200/60">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Live
                </span>
              </div>

              {/* Question Title */}
              <h4 className="text-[11px] font-black text-slate-950 leading-tight mb-2">
                How many new leads do you receive each month?
              </h4>

              {/* Mini Option List */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-1.5 rounded-lg border border-[#FFE500] bg-[#FFFDE7] text-slate-950 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-[#FFE500] text-[9px] font-bold text-slate-950 flex items-center justify-center font-mono">
                      A
                    </span>
                    <span className="text-[10px] font-bold leading-none">1–10 leads / mo</span>
                  </div>
                  <CheckCircle2 className="w-3 h-3 text-slate-950" />
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-slate-100 text-[9px] font-bold text-slate-800 flex items-center justify-center font-mono">
                      B
                    </span>
                    <span className="text-[10px] font-medium leading-none">11–25 leads / mo</span>
                  </div>
                  <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-slate-100 text-[9px] font-bold text-slate-800 flex items-center justify-center font-mono">
                      C
                    </span>
                    <span className="text-[10px] font-medium leading-none">26–50 leads / mo</span>
                  </div>
                  <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Mobile Footer Badge */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-500 font-medium">
              <span>Mobile Diagnostic</span>
              <span className="text-slate-800 font-bold">3 Min</span>
            </div>
          </div>

          {/* Home Bar Indicator */}
          <div className="py-1.5 bg-white flex justify-center items-center border-t border-slate-50">
            <div className="w-16 h-0.5 bg-slate-900/70 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};
