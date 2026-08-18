import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneMockupProps {
  children: React.ReactNode;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[420px] mx-auto py-4 sm:py-6 perspective-[1000px]">
      {/* 3D Floating Shadow */}
      <div className="absolute inset-x-8 bottom-0 h-10 bg-slate-900/25 blur-2xl rounded-full transform translate-y-4 scale-95 pointer-events-none" />

      {/* Outer Phone Shell */}
      <div 
        className="relative mx-auto rounded-[46px] p-[10px] sm:p-[12px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_2px_rgba(255,255,255,0.25)] ring-1 ring-slate-950/80 transition-transform duration-300 ease-out sm:hover:-translate-y-1"
        style={{
          boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Left Side Buttons (Volume Up / Down & Action) */}
        <div className="absolute -left-[3px] top-[105px] w-[3px] h-8 bg-slate-700 rounded-l-sm shadow-xs" />
        <div className="absolute -left-[3px] top-[148px] w-[3px] h-12 bg-slate-700 rounded-l-sm shadow-xs" />
        <div className="absolute -left-[3px] top-[170px] w-[3px] h-12 bg-slate-700 rounded-l-sm shadow-xs" />

        {/* Right Side Button (Power) */}
        <div className="absolute -right-[3px] top-[135px] w-[3px] h-16 bg-slate-700 rounded-r-sm shadow-xs" />

        {/* Inner Phone Screen Bezel */}
        <div className="relative w-full rounded-[36px] bg-slate-950 overflow-hidden ring-1 ring-black/40 shadow-inner flex flex-col min-h-[580px]">
          
          {/* Top Status Bar & Dynamic Island */}
          <div className="relative z-20 w-full pt-3 px-6 pb-2 flex items-center justify-between text-slate-900 bg-white border-b border-slate-100 select-none">
            {/* Left: Time */}
            <span className="text-[11px] font-bold tracking-tight text-slate-900 pl-1 font-mono">
              9:41
            </span>

            {/* Center: Dynamic Island / Camera Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-5 bg-slate-950 rounded-full flex items-center justify-end px-2 gap-1.5 shadow-xs">
              {/* Camera Lens */}
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-950/80" />
              </div>
            </div>

            {/* Right: Connectivity Icons */}
            <div className="flex items-center gap-1.5 text-slate-900 pr-1">
              <Signal className="w-3 h-3 stroke-[2.5]" />
              <Wifi className="w-3 h-3 stroke-[2.5]" />
              <div className="flex items-center gap-0.5">
                <Battery className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Screen Content Area */}
          <div className="relative z-10 flex-1 bg-white overflow-y-auto overflow-x-hidden flex flex-col">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="relative z-20 w-full py-2 bg-white flex justify-center items-center select-none border-t border-slate-100/60">
            <div className="w-32 h-1 bg-slate-900/80 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
