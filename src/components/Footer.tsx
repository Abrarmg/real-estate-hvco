import React from 'react';
import { Activity, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onStartAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartAudit }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070B14] py-12 sm:py-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Brand & Mission Statement */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="space-y-2 max-w-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-tight">
                The Real Estate Lead Leakage Audit™
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An objective diagnostic benchmark helping US real estate professionals, teams, and brokerages audit their inbound lead response speed, follow-up persistence, and dormant database value.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onStartAudit}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Take the 3-Minute Audit
            </button>
          </div>
        </div>

        {/* Legal & Compliance Disclaimers */}
        <div className="space-y-4 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> This diagnostic tool is an independent assessment utility created for informational and educational purposes. Lead volume estimations, conversion models, and lost GCI figures are calculated using empirical real estate industry averages and user-submitted inputs. Results will vary based on geographic market dynamics, local median home sales prices, lead source quality, and agent execution.
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/40 text-slate-500">
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} Real Estate Lead Leakage Audit™. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-500" />
                256-Bit SSL Encrypted & Private
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-300 transition-colors cursor-pointer">Diagnostic Methodology</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
