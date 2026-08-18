import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { DeskPhoneCompanion } from './DeskPhoneCompanion';

interface LaptopMockupProps {
  children: React.ReactNode;
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[1060px] mx-auto select-none"
    >
      {/* Multi-Device Desk Layout Container */}
      <div className="relative w-full">
        {/* 1. Realistic Soft Diffused Desk Shadows (Natural contact & ambient depth) */}
        <div className="absolute inset-x-10 -bottom-6 h-12 bg-slate-900/[0.08] blur-2xl rounded-full pointer-events-none transform translate-y-2" />
        <div className="absolute inset-x-20 -bottom-3 h-8 bg-slate-950/[0.12] blur-lg rounded-full pointer-events-none transform translate-y-1" />
        <div className="absolute inset-x-28 bottom-0 h-2 bg-slate-950/[0.18] blur-[2px] rounded-full pointer-events-none" />

        {/* 2. MacBook Display Lid (Anodized Aluminum Unibody Shell) */}
        <div className="relative mx-auto rounded-t-[14px] sm:rounded-t-[18px] p-[5px] sm:p-[7px] md:p-[8px] bg-gradient-to-b from-[#2C3034] via-[#1A1D20] to-[#111315] shadow-[0_16px_40px_-12px_rgba(15,23,42,0.28),0_0_0_1px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)]">
          
          {/* Top Slim Bezel & FaceTime HD Camera */}
          <div className="w-full h-4 sm:h-5 flex items-center justify-center relative bg-[#111315]">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60">
              {/* Ambient sensor */}
              <div className="w-1 h-1 rounded-full bg-slate-800" />
              {/* Camera lens */}
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-950 ring-[0.5px] ring-slate-700 flex items-center justify-center">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#1e3a5f] shadow-[0_0_2px_rgba(30,58,95,0.8)]" />
              </div>
              {/* TrueTone sensor */}
              <div className="w-1 h-1 rounded-full bg-slate-800" />
            </div>
          </div>

          {/* 3. Screen Container (Physical Display with subtle inner bezel) */}
          <div className="relative w-full rounded-t-[8px] sm:rounded-t-[10px] bg-white overflow-hidden ring-1 ring-black/40 shadow-inner flex flex-col">
            
            {/* Refined Browser / Application Chrome (~48-52px height) */}
            <div className="w-full h-11 sm:h-12 px-3 sm:px-5 bg-[#F8FAFC] border-b border-slate-200/90 flex items-center justify-between select-none">
              
              {/* macOS Window Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
              </div>

              {/* Centered Application Title */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-md bg-white border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-slate-800 tracking-tight">
                  Lead Leakage Diagnostic Portal
                </span>
              </div>

              {/* Right Status Badge */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Diagnostic Active</span>
              </div>
              <div className="sm:hidden w-8" />
            </div>

            {/* Screen Content Viewport */}
            <div className="relative z-10 w-full bg-white flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10">
              <div className="w-full max-w-2xl mx-auto">
                {children}
              </div>
            </div>

          </div>
        </div>

        {/* 4. MacBook Hinge & Unibody Lower Base (Slim Profile) */}
        <div className="relative w-full">
          {/* Recessed Dark Hinge */}
          <div className="h-2 sm:h-2.5 bg-gradient-to-r from-[#1C1F22] via-[#2A2E33] to-[#1C1F22] mx-4 sm:mx-8 shadow-inner ring-[0.5px] ring-black/70" />
          
          {/* Aluminum Chassis Deck */}
          <div className="relative h-3 sm:h-3.5 md:h-4 bg-gradient-to-b from-[#E4E7EA] via-[#D0D5D9] to-[#B6BCC2] rounded-b-[14px] sm:rounded-b-[18px] shadow-[0_8px_20px_-3px_rgba(15,23,42,0.3),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.3)] ring-[0.5px] ring-slate-400/60 flex justify-center items-start">
            {/* Front Opening Thumb Notch */}
            <div className="w-20 sm:w-28 md:w-32 h-1 sm:h-1.5 bg-gradient-to-b from-slate-500 to-slate-600 rounded-b-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.5),0_1px_1px_rgba(255,255,255,0.4)]" />
          </div>

          {/* Bottom Contact Shadow Edge */}
          <div className="h-1 bg-gradient-to-r from-transparent via-slate-900/25 to-transparent mx-12 rounded-full" />
        </div>

        {/* 5. Mobile Phone Mockup Sitting on the Desk Alongside MacBook */}
        <div className="hidden lg:block absolute -right-6 xl:-right-10 -bottom-4 z-20">
          <DeskPhoneCompanion />
        </div>
      </div>
    </motion.div>
  );
};
