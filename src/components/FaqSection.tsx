import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is the audit really free?',
      answer: 'Yes. The audit is 100% free and designed to give you an objective, data-backed diagnostic snapshot of your current lead handling, follow-up cadence, and hidden leakage points.',
    },
    {
      question: 'How long does it take?',
      answer: 'Approximately 3 minutes. The audit consists of 12 targeted multiple-choice questions regarding your response speed, CRM workflows, and follow-up persistence.',
    },
    {
      question: 'Do I need to install anything?',
      answer: 'No. The audit runs entirely within this browser interface without requiring any software downloads, browser extensions, or access tokens.',
    },
    {
      question: 'Is this only for Facebook leads?',
      answer: 'No. The audit is engineered for all primary paid real estate channels, including Facebook/Instagram Ads, Google Search & LSAs, Zillow Premier Agent, Realtor.com, IDX search websites, and cold database contacts.',
    },
    {
      question: 'Will you try to sell me something?',
      answer: 'The audit provides actionable recommendations first. If you want our direct assistance in architecting and deploying the automated follow-up infrastructure in your CRM, you have the option to schedule a strategy call.',
    },
    {
      question: 'Do you work with solo agents?',
      answer: 'Yes. The diagnostic and automation architectures scale flexibly—whether you are a solo high-producing agent looking to eliminate manual texting, or a 20-agent team looking to maximize team routing and lead accountability.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#090E17] border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Common Questions About the Audit
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Clear, transparent answers on how the diagnostic evaluation works.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
