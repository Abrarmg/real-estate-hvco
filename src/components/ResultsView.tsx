import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Printer, 
  RotateCcw, 
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
  const ai = result.aiDiagnostic;

  // Score Count-Up Animation & Confetti
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

  const getStatusText = (score: number) => {
    if (score >= 81) return 'TIGHT SYSTEM';
    if (score >= 61) return 'MINOR LEAKAGE';
    if (score >= 41) return 'SIGNIFICANT LEAKAGE';
    if (score >= 21) return 'HEAVY LEAKAGE';
    return 'CRITICAL LEAKAGE';
  };

  const getStatusColor = (score: number) => {
    if (score >= 81) return 'text-emerald-600 bg-emerald-50';
    if (score >= 61) return 'text-amber-600 bg-amber-50';
    if (score >= 41) return 'text-orange-600 bg-orange-50';
    return 'text-rose-600 bg-rose-50';
  };

  const getPillarColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-400';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-white text-slate-900 selection:bg-[#FFE500] selection:text-slate-950 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              DIAGNOSTIC REPORT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onRetake}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Audit</span>
            </button>
          </div>
        </div>

        {/* SECTION 1 - SCORE HERO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-sm font-bold tracking-widest uppercase text-slate-500">Your Lead Leakage Score</h1>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-8xl font-black tracking-tighter text-slate-900">{animatedScore}</span>
              <span className="text-2xl font-bold text-slate-400">/ 100</span>
            </div>
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mt-4 ${getStatusColor(result.overallScore)}`}>
              {getStatusText(result.overallScore)}
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-8 border-t border-slate-100">
            {result.pillars.map(pillar => (
              <div key={pillar.key} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
                <span className="text-xs font-bold text-slate-500 uppercase">{pillar.name}</span>
                <span className="text-xl font-bold text-slate-900">{pillar.score}</span>
                <div className={`w-full h-1.5 bg-slate-200 rounded-full overflow-hidden`}>
                  <div className={`h-full ${getPillarColor(pillar.score)}`} style={{ width: `${pillar.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 2 - CONTINUOUS DIAGNOSIS */}
        {ai && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12 pb-16"
          >
            <div className="prose prose-lg prose-slate max-w-none text-slate-800 space-y-6 text-[1.1rem] leading-relaxed">
              {ai.diagnosis?.split('\n').map((paragraph, idx) => (
                paragraph.trim() ? <p key={idx}>{paragraph}</p> : null
              ))}
            </div>
          </motion.div>
        )}

        {/* SECTION 3 - STATIC CTA */}
        {ai && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-12 text-center space-y-8 border-t border-slate-200"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <a
                href="https://gotautomated.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-[#FFE500] hover:bg-[#F2D900] text-slate-950 font-bold text-base sm:text-lg tracking-tight transition-all duration-200 shadow-lg shadow-[#FFE500]/20 hover:scale-105 cursor-pointer w-full sm:w-auto"
              >
                <span>BOOK YOUR DIAGNOSTIC CALL &rarr;</span>
              </a>
              <span className="text-sm text-slate-500 font-medium">
                15–20 minute strategy walkthrough<br/>No obligation. No hard pitch.
              </span>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
