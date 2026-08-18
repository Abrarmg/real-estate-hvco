import React from 'react';
import { Clock, MessageSquare, Database, CalendarCheck, Cpu, Target } from 'lucide-react';

export const FascinationBullets: React.FC = () => {
  const cards = [
    {
      icon: Clock,
      title: 'The Speed-to-Lead Leak',
      description: 'Find out whether your current response process could be causing high-intent prospects to move on before you ever speak with them.',
      badge: 'SPEED & TIMING',
      accentColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      icon: MessageSquare,
      title: 'The Follow-Up Leak',
      description: "Discover what happens to leads who don't respond to your first message — and whether your current process gives up too early.",
      badge: 'PERSISTENCE & CADENCE',
      accentColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
    {
      icon: Database,
      title: 'The Database Leak',
      description: "Identify the overlooked opportunity sitting inside your old leads and discover whether you're systematically re-engaging them.",
      badge: 'DORMANT ASSETS',
      accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      icon: CalendarCheck,
      title: 'The Appointment Leak',
      description: 'See where prospects may be falling out between expressing interest and actually booking a conversation.',
      badge: 'BOOKING FRICTION',
      accentColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      icon: Cpu,
      title: 'The Automation Opportunity',
      description: 'Get a clear picture of which parts of your lead journey could potentially be automated without removing the human relationship.',
      badge: 'HUMAN + AI WORKFLOW',
      accentColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      icon: Target,
      title: 'The "More Leads" Trap',
      description: 'Find out whether buying more leads is actually the best next move — or whether your existing pipeline needs fixing first.',
      badge: 'CAPITAL ALLOCATION',
      accentColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950/80 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>DIAGNOSTIC SCOPE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            What Your Free Audit Will Reveal
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A comprehensive, unvarnished look at the 6 vital inflection points where real estate commissions are won or lost.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-[#0F172A] border border-slate-800 p-6 sm:p-7 hover:border-slate-700 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-200 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono-num font-bold px-2.5 py-1 rounded-md border ${card.accentColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-800/80 mt-5 flex items-center justify-between text-xs text-slate-400">
                  <span>Diagnosed in Audit</span>
                  <span className="font-mono-num font-semibold text-emerald-400">Score & Action Plan</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
