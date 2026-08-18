import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Mail, 
  Lock,
  ChevronRight,
  AlertCircle,
  Check
} from 'lucide-react';
import { AUDIT_QUESTIONS } from '../data/auditQuestions';
import { UserAuditAnswers, UserContactInfo, AuditResult } from '../types';
import { calculateLeadLeakageScore } from '../utils/scoringEngine';

interface InlineAuditFormProps {
  onAuditCompleted: (result: AuditResult, answers: UserAuditAnswers, contact: UserContactInfo) => void;
  isInPhoneMockup?: boolean;
}

export const InlineAuditForm: React.FC<InlineAuditFormProps> = ({ onAuditCompleted, isInPhoneMockup = false }) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 to 11 = questions, 12 = contact capture, 13 = analyzing loader
  const [answers, setAnswers] = useState<UserAuditAnswers>({});
  
  // Contact Form State
  const [contactInfo, setContactInfo] = useState<UserContactInfo>({
    firstName: '',
    email: '',
    phone: '',
    websiteOrBrokerage: '',
    crmPlatform: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loadingPhase, setLoadingPhase] = useState<number>(0);

  const totalQuestions = AUDIT_QUESTIONS.length;
  const isContactStep = currentStep === totalQuestions;
  const isAnalyzingStep = currentStep === totalQuestions + 1;

  const currentQuestion = AUDIT_QUESTIONS[currentStep];

  const analysisPhases = [
    { title: 'Auditing speed-to-lead & response times...', sub: 'Comparing metrics with high-converting benchmarks' },
    { title: 'Detecting multi-touch leakage points...', sub: 'Measuring pipeline drop-offs across follow-up stages' },
    { title: 'Analyzing database decay & dormant prospects...', sub: 'Evaluating potential revenue left on the table' },
    { title: 'Finalizing your Lead Leakage Score...', sub: 'Preparing your customized audit report and breakdown' },
  ];

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    const category = currentQuestion.category;
    let answerKey: keyof UserAuditAnswers = 'leadVolume';

    if (category === 'volume') answerKey = 'leadVolume';
    else if (category === 'source') answerKey = 'leadSource';
    else if (category === 'speed') answerKey = 'responseTime';
    else if (category === 'followup') answerKey = 'followUpMethod';
    else if (category === 'frequency') answerKey = 'followUpFrequency';
    else if (category === 'sms') answerKey = 'smsAutomation';
    else if (category === 'crm') answerKey = 'crmUsage';
    else if (category === 'appointment') answerKey = 'appointmentAutomation';
    else if (category === 'reactivation') answerKey = 'reactivation';
    else if (category === 'database') answerKey = 'databaseSize';
    else if (category === 'frustration') answerKey = 'biggestFrustration';
    else if (category === 'urgency') answerKey = 'urgency';

    const updatedAnswers = { ...answers, [answerKey]: optionId };
    setAnswers(updatedAnswers);

    // Auto-advance to next question or contact form with smooth response
    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setCurrentStep(totalQuestions); // Go to contact capture step
      }
    }, 200);
  };

  const handleBack = () => {
    if (currentStep > 0 && !isAnalyzingStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const validateContactForm = () => {
    const errors: { [key: string]: string } = {};
    if (!contactInfo.firstName.trim()) {
      errors.firstName = 'Name is required';
    }
    if (!contactInfo.email?.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setCurrentStep(totalQuestions + 1); // Go to loader

    // Simulate animated loading progress
    let phase = 0;
    const interval = setInterval(() => {
      phase++;
      if (phase < analysisPhases.length) {
        setLoadingPhase(phase);
      } else {
        clearInterval(interval);
        // Calculate scores and finish
        const finalResult = calculateLeadLeakageScore(answers);
        onAuditCompleted(finalResult, answers, contactInfo);
      }
    }, 800);
  };

  const progressPercentage = Math.round(
    isContactStep ? 96 : isAnalyzingStep ? 100 : ((currentStep + 1) / totalQuestions) * 90
  );

  return (
    <div className={`w-full bg-white flex flex-col flex-1 ${
      isInPhoneMockup 
        ? 'rounded-none shadow-none border-0' 
        : 'rounded-2xl shadow-md shadow-slate-200/60 border border-slate-300/80 overflow-hidden'
    }`}>
      {/* 6. Thin Yellow Progress Bar */}
      {!isAnalyzingStep && (
        <div className="w-full bg-slate-100 h-1 overflow-hidden shrink-0">
          <motion.div
            className="h-full bg-[#FFE500]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Form Body - Reduced vertical padding for fast feel */}
      <div className={`flex-1 flex flex-col justify-between ${
        isInPhoneMockup ? 'p-3.5 sm:p-4.5' : 'p-4 sm:p-5 lg:p-6'
      }`}>
        {/* QUESTIONS STAGE */}
        {!isContactStep && !isAnalyzingStep && currentQuestion && (
          <div className="space-y-3.5 sm:space-y-4">
            {/* 6. Top Progress Indicator */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-500 pb-0.5">
              <span className="uppercase tracking-[0.16em] font-bold text-slate-800">
                QUESTION {currentStep + 1} OF {totalQuestions}
              </span>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-950 font-semibold cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              )}
            </div>

            {/* Question Text */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug">
                {currentQuestion.title}
              </h3>
              {currentQuestion.subtitle && (
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            {/* 7. Question Options (Interactive states) */}
            <div className="space-y-2 pt-1">
              {currentQuestion.options.map((option, idx) => {
                const category = currentQuestion.category;
                let currentAnswer = '';
                if (category === 'volume') currentAnswer = answers.leadVolume || '';
                else if (category === 'source') currentAnswer = answers.leadSource || '';
                else if (category === 'speed') currentAnswer = answers.responseTime || '';
                else if (category === 'followup') currentAnswer = answers.followUpMethod || '';
                else if (category === 'frequency') currentAnswer = answers.followUpFrequency || '';
                else if (category === 'sms') currentAnswer = answers.smsAutomation || '';
                else if (category === 'crm') currentAnswer = answers.crmUsage || '';
                else if (category === 'appointment') currentAnswer = answers.appointmentAutomation || '';
                else if (category === 'reactivation') currentAnswer = answers.reactivation || '';
                else if (category === 'database') currentAnswer = answers.databaseSize || '';
                else if (category === 'frustration') currentAnswer = answers.biggestFrustration || '';
                else if (category === 'urgency') currentAnswer = answers.urgency || '';

                const isSelected = currentAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer group min-h-[46px] select-none ${
                      isSelected
                        ? 'border-[#FFE500] bg-[#FFFDE7] text-slate-950 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50/70 hover:-translate-y-0.5 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 pr-2">
                      <span
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#FFE500] text-slate-950'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 stroke-[3] text-slate-950" />
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </span>
                      <div>
                        <span className={`text-xs sm:text-sm font-semibold leading-snug block ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-800'}`}>
                          {option.label}
                        </span>
                        {option.sublabel && (
                          <span className={`text-[10px] sm:text-[11px] block mt-0.5 ${isSelected ? 'text-slate-600' : 'text-slate-500'}`}>
                            {option.sublabel}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected
                          ? 'text-slate-950 translate-x-0.5'
                          : 'text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CONTACT CAPTURE STAGE */}
        {isContactStep && (
          <form onSubmit={handleSubmitContactForm} className="space-y-3.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span className="uppercase tracking-wider font-bold text-slate-700">
                Final Step • Free Report
              </span>
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-950 font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Questions</span>
              </button>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#FFE500] text-slate-950 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Audit Complete</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950">
                Where should we send your Audit Report?
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Enter your details to generate your customized Lead Leakage Score & actionable recovery roadmap.
              </p>
            </div>

            <div className="space-y-2.5 pt-0.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-0.5">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={contactInfo.firstName}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, firstName: e.target.value });
                      if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: '' });
                    }}
                    placeholder="e.g. Sarah"
                    className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                      formErrors.firstName
                        ? 'border-rose-500 focus:border-rose-600'
                        : 'border-slate-200 focus:border-slate-950'
                    }`}
                  />
                </div>
                {formErrors.firstName && (
                  <p className="text-[10px] text-rose-600 mt-0.5 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-0.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                    }}
                    placeholder="sarah@realtygroup.com"
                    className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                      formErrors.email
                        ? 'border-rose-500 focus:border-rose-600'
                        : 'border-slate-200 focus:border-slate-950'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[10px] text-rose-600 mt-0.5 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                id="inline-submit-audit-btn"
                className="w-full py-3 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer group border-2 border-slate-950"
              >
                <span className="text-[#FFE500]">Reveal My Lead Leakage Report</span>
                <ArrowRight className="w-4 h-4 text-[#FFE500] transition-transform group-hover:translate-x-1" />
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-slate-500 font-medium mt-1.5">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>100% Confidential • Instant Generation</span>
              </div>
            </div>
          </form>
        )}

        {/* ANALYZING LOADER STAGE */}
        {isAnalyzingStep && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 text-[#FFE500] flex items-center justify-center shadow-lg border border-slate-800 animate-pulse">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFE500] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FFE500]"></span>
              </span>
            </div>

            <div className="space-y-1.5 max-w-xs">
              <h4 className="text-base font-bold text-slate-950">
                {analysisPhases[loadingPhase]?.title || 'Finalizing Lead Audit...'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {analysisPhases[loadingPhase]?.sub || 'Auditing responses against benchmark metrics...'}
              </p>
            </div>

            {/* Step Indicators */}
            <div className="w-full max-w-xs space-y-1.5 pt-1 text-left">
              {analysisPhases.map((phase, idx) => {
                const isDone = idx < loadingPhase;
                const isCurrent = idx === loadingPhase;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 text-xs p-2 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-950 font-bold border border-slate-300'
                        : isDone
                        ? 'text-emerald-700 font-medium'
                        : 'text-slate-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className="truncate">{phase.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Note */}
        {!isAnalyzingStep && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
              <span>Real Estate Diagnostic</span>
            </div>
            <span className="font-semibold text-slate-700">Instant Online Results</span>
          </div>
        )}
      </div>
    </div>
  );
};

