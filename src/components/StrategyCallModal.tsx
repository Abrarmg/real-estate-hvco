import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Phone, Building2, Database, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { UserContactInfo, AuditResult } from '../types';

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: UserContactInfo;
  result?: AuditResult | null;
}

export const StrategyCallModal: React.FC<StrategyCallModalProps> = ({
  isOpen,
  onClose,
  contact,
  result,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDay, setSelectedDay] = useState<'tomorrow' | 'day_after' | 'next_week'>('tomorrow');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM EST');
  const [notes, setNotes] = useState<string>('');

  const [formData, setFormData] = useState({
    name: contact.firstName || '',
    email: contact.email || '',
    phone: contact.phone || '',
    brokerage: contact.websiteOrBrokerage || '',
    crm: contact.crmPlatform || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const times = [
    '09:30 AM EST',
    '11:00 AM EST',
    '01:30 PM EST',
    '03:00 PM EST',
    '04:30 PM EST',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0F172A] border border-slate-700 shadow-2xl shadow-black overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-slate-800 p-5 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                Private Strategy Call & Roadmap
              </h3>
              <p className="text-xs text-slate-400">20-Minute 1-on-1 Architecture Session</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white tracking-tight">
                  Map Your Automated Lead Recovery System
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  {result?.biggestLeak 
                    ? `We'll specifically review your ${result.biggestLeak.name} leakage point (${result.biggestLeak.score}/100) and design an automated follow-up blueprint for your CRM.`
                    : "We'll diagnose your current response workflow and blueprint a bespoke AI follow-up architecture."}
                </p>
              </div>

              {/* Time slot picker */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Select Preferred Day & Time Slot:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setSelectedDay('tomorrow')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedDay === 'tomorrow'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDay('day_after')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedDay === 'day_after'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    In 2 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDay('next_week')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedDay === 'next_week'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    Next Week
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`text-xs py-1.5 px-3 rounded-md border transition-colors cursor-pointer ${
                        selectedTime === t
                          ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="name@realty.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone (for Calendar Invite)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CRM / Tech Stack</label>
                  <input
                    type="text"
                    value={formData.crm}
                    onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Follow Up Boss, kvCORE"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specific question or goal for the call (Optional):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. How to automate responses to Zillow leads after 8 PM..."
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-tight transition-all duration-200 shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Strategy Call Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Free • No sales pressure • Calendar invite sent instantly
                </p>
              </div>

            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight">
                Strategy Session Confirmed!
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name || 'there'}</strong>. We've reserved your strategy slot for <strong>{selectedTime}</strong>. A calendar invite and prep dossier have been sent to <strong>{formData.email}</strong>.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto text-left space-y-1.5">
                <span className="font-bold text-emerald-400 uppercase text-[10px]">Next Steps:</span>
                <p>1. Check your email for the Google Calendar / Zoom invite link.</p>
                <p>2. We'll have your customized Lead Leakage Roadmap pre-loaded for the call.</p>
              </div>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close & View Audit Breakdown
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
