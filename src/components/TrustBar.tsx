import React from 'react';
import { Layers } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const leadChannels = [
    { label: 'Facebook / Instagram Ads', type: 'Meta Ads' },
    { label: 'Google Search & LSA', type: 'Search Intent' },
    { label: 'Zillow Premier / Flex', type: 'Portal Buyer' },
    { label: 'Realtor.com Leads', type: 'Portal Inbound' },
    { label: 'CRM Database Inactive Leads', type: 'Dormant Assets' },
    { label: 'Custom IDX & Website Leads', type: 'Direct Traffic' },
  ];

  return (
    <section className="border-y border-slate-800/80 bg-slate-950/60 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Label */}
          <div className="flex items-center gap-2.5 text-slate-400 shrink-0 text-center lg:text-left">
            <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
              Built for agents who rely on paid lead generation:
            </span>
          </div>

          {/* Lead Source Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {leadChannels.map((ch, idx) => (
              <div
                key={idx}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-medium hover:border-slate-700 transition-colors shadow-sm"
              >
                <span className="text-white font-semibold">{ch.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
