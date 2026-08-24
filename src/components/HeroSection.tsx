import React from 'react';
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Hero3DCardIllustration } from './Hero3DCardIllustration';
import { UserAuditAnswers, UserContactInfo, AuditResult } from '../types';

interface HeroSectionProps {
  onAuditCompleted: (result: AuditResult, answers: UserAuditAnswers, contact: UserContactInfo) => void;
  onOpenAuditModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuditModal }) => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FFFFFF] to-[#FFFFFF] overflow-hidden flex flex-col justify-between">
      
      {/* Top Warm Golden/Yellow Atmospheric Glow (Radial light from top right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 right-0 w-[350px] xs:w-[480px] sm:w-[650px] h-[350px] xs:h-[480px] sm:h-[650px] bg-gradient-to-bl from-[#FFF3A3]/50 via-[#FFFDE0]/35 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 sm:-mr-28 sm:-mt-28"
      />

      {/* Main Container */}
      <div className="max-w-[1080px] mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 pt-6 xs:pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 relative z-10 w-full flex flex-col items-center">
        
        {/* Top Badge: "THE 3-MINUTE LEAD LEAKAGE AUDIT" */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 xs:px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-900 text-[10px] xs:text-[11px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase mb-6 sm:mb-10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] select-none"
        >
          <div className="w-4 h-4 rounded-full flex items-center justify-center text-amber-500">
            <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span>THE 3-MINUTE LEAD LEAKAGE AUDIT</span>
        </motion.div>

        {/* Hero Top Grid: Left (Headline + Copy) & Right (3D Analytics Card Illustration) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full mb-8 sm:mb-14">
          
          {/* Left Column: Headline & Subheading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7 text-left flex flex-col justify-center"
          >
            <h1 className="text-[28px] xs:text-[34px] sm:text-[42px] lg:text-[46px] font-black text-slate-950 tracking-[-0.03em] leading-[1.18] sm:leading-[1.14]">
              How to Find Out Why Your<br />
              Real Estate Leads Are<br />
              <span className="bg-[#FFE500] text-slate-950 px-2 xs:px-2.5 py-0.5 rounded-lg inline-block font-black my-1 shadow-2xs">
                Going Cold
              </span>{' '}
              — Without<br />
              Spending More on Ads —<br />
              in Just{' '}
              <span className="relative text-[#1A4BFF] font-black inline-block">
                3 Minutes
                {/* Yellow hand-drawn wave underline with path animation */}
                <motion.svg
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
                  className="absolute -bottom-1 left-0 w-full h-2 sm:h-2.5 text-[#FFE500] overflow-visible pointer-events-none"
                  viewBox="0 0 100 10"
                  fill="none"
                >
                  <path
                    d="M2 6C30 1.5 65 1.5 98 5"
                    stroke="#FFE500"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mt-4 sm:mt-6 max-w-[560px]">
              Take the free 3-minute Lead Leakage Audit to uncover the biggest gaps in your lead response, follow-up and nurturing process — then get a personalized breakdown of where your opportunities may be slipping away and what you can do about it.
            </p>
          </motion.div>

          {/* Right Column: 3D Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end items-center"
          >
            <Hero3DCardIllustration />
          </motion.div>
        </div>

        {/* 3 Numbered Feature / Insight Cards (01, 02, 03) */}
        <div className="w-full max-w-[940px] space-y-3.5 sm:space-y-5 mb-8 sm:mb-12">
          
          {/* Card 01 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.99 }}
            className="relative flex items-center gap-3.5 xs:gap-5 sm:gap-6 p-4 sm:p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-200 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            {/* Left yellow vertical accent strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FFE500]" />
            
            {/* Round light-blue number circle */}
            <div className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-[#EEF4FF] text-[#1A4BFF] font-black text-base xs:text-lg sm:text-xl flex items-center justify-center shrink-0 ml-1">
              01
            </div>

            {/* Content text */}
            <p className="text-xs xs:text-sm sm:text-base md:text-[17px] text-slate-800 leading-relaxed font-normal text-left">
              <strong className="font-bold text-slate-950">How to turn more paid leads into conversations</strong> without chasing every prospect yourself.
            </p>
          </motion.div>

          {/* Card 02 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.99 }}
            className="relative flex items-center gap-3.5 xs:gap-5 sm:gap-6 p-4 sm:p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-200 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            {/* Left yellow vertical accent strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FFE500]" />
            
            {/* Round light-blue number circle */}
            <div className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-[#EEF4FF] text-[#1A4BFF] font-black text-base xs:text-lg sm:text-xl flex items-center justify-center shrink-0 ml-1">
              02
            </div>

            {/* Content text */}
            <p className="text-xs xs:text-sm sm:text-base md:text-[17px] text-slate-800 leading-relaxed font-normal text-left">
              You need more leads, right? <strong className="text-[#E11D48] font-black">WRONG</strong> — you may need to fix what happens after the lead comes in.
            </p>
          </motion.div>

          {/* Card 03 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.99 }}
            className="relative flex items-center gap-3.5 xs:gap-5 sm:gap-6 p-4 sm:p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-200 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            {/* Left yellow vertical accent strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FFE500]" />
            
            {/* Round light-blue number circle */}
            <div className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-[#EEF4FF] text-[#1A4BFF] font-black text-base xs:text-lg sm:text-xl flex items-center justify-center shrink-0 ml-1">
              03
            </div>

            {/* Content text */}
            <p className="text-xs xs:text-sm sm:text-base md:text-[17px] text-slate-800 leading-relaxed font-normal text-left">
              Have you been following up with leads the wrong way?{' '}
              <span className="font-bold text-slate-950 underline decoration-[#FFE500] decoration-[3px] underline-offset-4">
                And does it really matter?
              </span>
            </p>
          </motion.div>

        </div>

        {/* CTA Button & Trust Line Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col items-center text-center w-full max-w-[480px]"
        >
          
          {/* Main Yellow Call To Action Button */}
          <motion.button
            id="reveal-lead-leakage-score-cta"
            type="button"
            onClick={onOpenAuditModal}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full sm:w-[380px] md:w-[420px] py-3.5 xs:py-4 px-6 sm:px-8 rounded-2xl bg-gradient-to-b from-[#FFDE33] via-[#FFCC00] to-[#E6B800] hover:from-[#FFE24D] hover:to-[#F5C200] text-slate-950 font-black tracking-tight shadow-[0_12px_28px_rgba(230,184,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:shadow-[0_18px_36px_rgba(230,184,0,0.55)] transition-all duration-200 flex items-center justify-between cursor-pointer select-none min-h-[56px]"
          >
            {/* Centered two-line text */}
            <div className="flex-1 text-center font-black text-base xs:text-lg sm:text-xl leading-tight">
              <div>Start Lead Audit Now</div>
            </div>

            {/* Right arrow icon */}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-slate-950 transition-transform duration-200 group-hover:translate-x-1.5 shrink-0 ml-2" />
          </motion.button>

          {/* Trust Text Below Button */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] xs:text-xs sm:text-sm font-semibold text-slate-800 mt-3.5 sm:mt-4 select-none text-center px-2">
            <ShieldCheck className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#1A4BFF] stroke-[2.2] shrink-0" />
            <span>Free Diagnostic • Takes 3 Minutes • No Credit Card Required</span>
          </div>

        </motion.div>

      </div>

      {/* Bottom Royal Blue Wave Curve & Dot Grids */}
      <div className="relative w-full h-28 xs:h-36 sm:h-44 md:h-52 mt-auto overflow-hidden pointer-events-none select-none">
        
        {/* SVG Wave Arc */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,70 C360,180 1080,180 1440,70 L1440,220 L0,220 Z"
            fill="url(#blueWaveGradient)"
          />
          <defs>
            <linearGradient id="blueWaveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B3BE8" />
              <stop offset="50%" stopColor="#082ECE" />
              <stop offset="100%" stopColor="#0521AC" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dot Matrix Pattern - Bottom Left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-4 xs:left-6 sm:left-12 bottom-4 xs:bottom-6 sm:bottom-8 z-10"
        >
          <div className="grid grid-cols-5 gap-1.5 xs:gap-2 sm:gap-2.5">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={`dot-left-${i}`} className="w-1.5 h-1.5 rounded-full bg-white" />
            ))}
          </div>
        </motion.div>

        {/* Dot Matrix Pattern - Bottom Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-4 xs:right-6 sm:right-12 bottom-4 xs:bottom-6 sm:bottom-8 z-10"
        >
          <div className="grid grid-cols-5 gap-1.5 xs:gap-2 sm:gap-2.5">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={`dot-right-${i}`} className="w-1.5 h-1.5 rounded-full bg-white" />
            ))}
          </div>
        </motion.div>

      </div>

    </section>
  );
};
