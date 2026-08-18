import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Shield, 
  Zap, 
  TrendingDown, 
  ArrowRight, 
  Calendar, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  DollarSign, 
  ChevronRight, 
  Users, 
  Activity,
  PhoneCall,
  Check
} from 'lucide-react';
import { AuditResult, UserAuditAnswers, UserContactInfo } from '../types';
import confetti from 'canvas-confetti';

interface ResultsViewProps {
  result: AuditResult;
  answers: UserAuditAnswers;
  contact: UserContactInfo;
  onRetake: () => void;
  onBookStrategyCall: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  answers,
  contact,
  onRetake,
  onBookStrategyCall,
}) => {
  const [animatedScore, setAnimatedScore] = useState<number>(0);

  // Score Count-Up Animation & Confetti (if score is solid) or gentle reveal
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = result.overallScore / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= result.overallScore) {
        setAnimatedScore(result.overallScore);
        clearInterval(timer);
        if (result.overallScore >= 70) {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        }
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [result.overallScore]);

  const handlePrint = () => {
    window.print();
  };

  const getPillarIcon = (key: string) => {
    switch (key) {
      case 'speedToLead': return Clock;
      case 'followUp': return MessageSquare;
      case 'qualification': return Shield;
      case 'appointmentFlow': return Zap;
      case 'reactivation': return TrendingDown;
      default: return Activity;
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-rose-400';
    if (score < 70) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getProgressBg = (score: number) => {
    if (score < 40) return 'bg-rose-500';
    if (score < 70) return 'bg-amber-400';
    return 'bg-emerald-500';
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-[#0B111E] text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono-num font-bold text-slate-300 uppercase tracking-wider">
              OFFICIAL LEAD LEAKAGE AUDIT REPORT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onRetake}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Audit</span>
            </button>
          </div>
        </div>

        {/* Report Master Container */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-[#0F172A] border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-10"
        >
          
          {/* Header Profile Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold font-mono-num uppercase tracking-wider text-emerald-400">
                AUDIT DIAGNOSTIC DOSSIER
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {contact.firstName ? `${contact.firstName}'s Lead Recovery Audit` : 'Real Estate Lead Leakage Audit'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                {contact.websiteOrBrokerage ? `${contact.websiteOrBrokerage} • ` : ''}
                Assessed on {result.timestamp}
              </p>
            </div>

            <div className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-0.5">
              <span className="text-slate-400 font-mono-num text-[11px] uppercase">ESTIMATED VOLUME</span>
              <p className="font-bold text-white">{result.estimatedMonthlyLeads} Leads / Month</p>
            </div>
          </div>

          {/* Core Score Centerpiece & High Level Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Score Big Display */}
            <div className="md:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Lead Recovery Health Score
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl sm:text-7xl font-black font-mono-num text-white tracking-tight">
                    {animatedScore}
                  </span>
                  <span className="text-2xl font-bold text-slate-500 font-mono-num">/100</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-bold tracking-wide ${result.riskColor}`}>
                  <AlertTriangle className="w-4 h-4" />
                  {result.riskLevel}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {result.riskDescription}
                </p>
              </div>
            </div>

            {/* Opportunity / Lost Revenue Impact */}
            <div className="md:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Estimated Latent Pipeline Opportunity
                </span>
                <div className="mt-4 space-y-3">
                  
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200">Lost Monthly Appointments</p>
                        <p className="text-[11px] text-slate-400">From delayed response & weak nurture</p>
                      </div>
                    </div>
                    <span className="text-base font-bold font-mono-num text-rose-400">
                      ~{result.estimatedLostAppointments} / mo
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200">Annual Recoverable GCI Value</p>
                        <p className="text-[11px] text-slate-400">Based on standard conversion benchmarks</p>
                      </div>
                    </div>
                    <span className="text-base font-bold font-mono-num text-emerald-400">
                      ${result.estimatedLostGCI.toLocaleString()} / yr
                    </span>
                  </div>

                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                *Calculated using your monthly lead volume ({result.estimatedMonthlyLeads}/mo) & standard real estate transaction values.
              </div>
            </div>

          </div>

          {/* Full 5-Pillar Breakdown */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Your 5 Core Pipeline Pillars
              </h3>
              <span className="text-xs text-slate-400 hidden sm:block">
                Industry Average: ~45/100
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.pillars.map((pillar) => {
                const Icon = getPillarIcon(pillar.key);
                const scoreColor = getScoreColor(pillar.score);
                const progressBg = getProgressBg(pillar.score);

                return (
                  <div
                    key={pillar.key}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-200">
                          <Icon className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm font-bold text-white">{pillar.name}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-lg font-bold font-mono-num ${scoreColor}`}>
                            {pillar.score}
                          </span>
                          <span className="text-xs text-slate-500 font-mono-num">/100</span>
                        </div>
                      </div>

                      {/* Bar Gauge */}
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${progressBg}`}
                          style={{ width: `${pillar.score}%` }}
                        />
                      </div>

                      <p className="text-xs font-semibold text-slate-200 pt-1">
                        {pillar.headline}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                        Tactical Fix:
                      </span>
                      {pillar.recommendation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC BIGGEST LEAK SPOTLIGHT */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-950 border border-rose-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                YOUR BIGGEST LEAKAGE POINT
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                {result.biggestLeak.name} ({result.biggestLeak.score}/100)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                Based on your diagnostic answers, <strong>{result.biggestLeak.name}</strong> is currently your most critical pipeline vulnerability.
                {result.biggestLeak.description}
              </p>
            </div>

            <div className="pt-2">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  What You Can Do About It:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {result.biggestLeak.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* 3 Practical Next-Step Recommendations */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              3 Tactical Priorities For Your Pipeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.specificTactics.map((tactic, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 font-mono-num">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {tactic.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tactic.action}
                  </p>
                  <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 font-medium">
                    <span className="text-emerald-400">Impact:</span> {tactic.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SOFT SERVICE INTRODUCTION (Section 18) */}
          <div className="pt-8 border-t border-slate-800 space-y-6">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="text-xs font-mono-num font-bold text-emerald-400 uppercase tracking-wider">
                PROVEN ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Want Us to Help Fix These Leaks?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We build AI-powered lead response, qualification, follow-up and appointment systems specifically tailored for US real estate agents and brokerages.
              </p>
            </div>

            {/* Workflow Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
                
                <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold">
                  New Paid Lead
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
                
                <div className="px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold">
                  ⚡ Instant AI SMS (&lt;45s)
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400" />

                <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold">
                  Pre-Qualification
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400" />

                <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold">
                  14-Day Nurture
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400" />

                <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold">
                  Calendar Booking
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400" />

                <div className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold">
                  Human Handoff (Agent Closes)
                </div>

              </div>
            </div>
          </div>

          {/* STRATEGY CALL SECTION (Section 19) */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 p-6 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                COMPLIMENTARY STRATEGY SESSION
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Let's Map Out Your Lead-to-Appointment System
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                On this 20-minute private call, we'll look at your current lead journey, identify your exact leakage points, and map out what could realistically be automated in your CRM.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Review your current lead flow & ad sources</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Identify specific follow-up & response gaps</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pinpoint high-ROI automation opportunities</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Build a customized recommended workflow for your CRM</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="book-strategy-call-btn"
                onClick={onBookStrategyCall}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base tracking-tight transition-all duration-200 shadow-xl shadow-emerald-950 cursor-pointer"
              >
                <span>Book My Free Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <span className="text-xs text-slate-400 text-center sm:text-left">
                No pitch pressure • 1-on-1 workflow architecture
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};
