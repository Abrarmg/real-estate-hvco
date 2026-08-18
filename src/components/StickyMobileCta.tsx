import React, { useState, useEffect } from 'react';
import { ArrowRight, Activity, Clock } from 'lucide-react';

interface StickyMobileCtaProps {
  onStartAudit: () => void;
  show: boolean;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onStartAudit, show }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show || !scrolled) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 bg-[#0B111E]/95 backdrop-blur-md border-t border-slate-800 md:hidden no-print transition-all duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
            <Activity className="w-3 h-3" />
            <span>LEAD LEAKAGE AUDIT</span>
          </div>
          <p className="text-[10px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" /> Takes 3 mins • Free
          </p>
        </div>

        <button
          onClick={onStartAudit}
          className="flex-1 max-w-[200px] py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950 cursor-pointer"
        >
          <span>Find My Leaks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
