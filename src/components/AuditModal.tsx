import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Activity, 
  Clock, 
  Mail, 
  User, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { AUDIT_QUESTIONS } from '../data/auditQuestions';
import { UserAuditAnswers, UserContactInfo, AuditResult } from '../types';
import { calculateLeadLeakageScore } from '../utils/scoringEngine';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuditCompleted: (result: AuditResult, answers: UserAuditAnswers, contact: UserContactInfo) => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose, onAuditCompleted }) => {
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<number>(0);

  // Analysis Loader steps
  const analysisPhases = [
    { title: 'Analyzing your lead flow...', sub: 'Auditing speed-to-lead and initial intake velocity' },
    { title: 'Checking response gaps...', sub: 'Evaluating multi-channel drop-off between inquiry and reply' },
    { title: 'Analyzing follow-up & database decay...', sub: 'Calculating dormant lead value and persistence shortfall' },
    { title: 'Calculating your Lead Leakage Score...', sub: 'Generating personalized recovery roadmap and benchmark metrics' },
  ];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalQuestions = AUDIT_QUESTIONS.length;
  const currentQuestion = AUDIT_QUESTIONS[currentStep];

  const handleSelectOption = (optionId: string) => {
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

    // Auto advance smoothly
    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Move to Contact Capture (step index 12)
        setCurrentStep(totalQuestions);
      }
    }, 240);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const validateContactForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!contactInfo.firstName.trim()) {
      errors.firstName = 'Please enter your name';
    }
    if (!contactInfo.email?.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setIsSubmitting(true);
    setCurrentStep(totalQuestions + 1); // Move to loading animation (step index 13)

    // Execute multi-stage loading animation
    let phase = 0;
    const interval = setInterval(() => {
      phase++;
      if (phase < analysisPhases.length) {
        setLoadingPhase(phase);
      } else {
        clearInterval(interval);
        // Calculate dynamic results
        const finalResult = calculateLeadLeakageScore(answers);
        onAuditCompleted(finalResult, answers, contactInfo);
      }
    }, 850);
  };

  const progressPercentage = currentStep < totalQuestions
    ? Math.round(((currentStep + 1) / totalQuestions) * 100)
    : 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6">
        
        {/* Modal Container */}
        <motion.div 
          id="audit-modal-container"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-950/20 overflow-hidden flex flex-col max-h-[92vh]"
        >
          
          {/* Header Bar with Progress */}
          <div className="border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              {currentStep > 0 && currentStep <= totalQuestions && (
                <button
                  onClick={handlePrevStep}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Previous Question"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-950 bg-[#FFE500] px-2 py-0.5 rounded-md tracking-wider uppercase">
                    {currentStep < totalQuestions
                      ? `QUESTION ${currentStep + 1} OF ${totalQuestions}`
                      : currentStep === totalQuestions
                      ? 'DIAGNOSTIC REPORT DELIVERY'
                      : 'DIAGNOSING PIPELINE...'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block mt-1 font-medium">
                  Real Estate Lead Leakage Audit™
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Progress Bar */}
          {currentStep <= totalQuestions && (
            <div className="w-full bg-slate-100 h-1.5">
              <motion.div
                className="bg-[#FFCC00] h-full"
                initial={false}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          )}

          {/* Modal Body */}
          <div className="p-4 xs:p-5 sm:p-8 overflow-y-auto flex-1 bg-white">
          
          {/* 1. QUESTIONS STEP (0 to 11) */}
          {currentStep < totalQuestions && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                  Step {currentStep + 1} of {totalQuestions}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1">
                  {currentQuestion.title}
                </h3>
                {currentQuestion.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-2.5 sm:gap-3 pt-1">
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
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-[#FFFDE7] border-[#FFE500] text-slate-950 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 pr-2">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
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
                        <div className="space-y-0.5">
                          <p className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? 'text-slate-950' : 'text-slate-900'}`}>
                            {option.label}
                          </p>
                          {option.sublabel && (
                            <p className={`text-[11px] sm:text-xs ${isSelected ? 'text-slate-700' : 'text-slate-500'}`}>
                              {option.sublabel}
                            </p>
                          )}
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-slate-950 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Select an option to advance</span>
                <span>Takes ~3 mins total</span>
              </div>
            </div>
          )}

          {/* 2. CONTACT CAPTURE STEP (Index 12) */}
          {currentStep === totalQuestions && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  12/12 Questions Completed
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Your Lead Leakage Score Is Ready.
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                  Where should we send your personalized Lead Flow Breakdown & Recovery Roadmap?
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleContactSubmit} className="space-y-4 max-w-lg mx-auto pt-2">
                
                {/* First Name / Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah"
                      value={contactInfo.firstName}
                      onChange={(e) => {
                        setContactInfo({ ...contactInfo, firstName: e.target.value });
                        if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: '' });
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  {formErrors.firstName && (
                    <p className="text-rose-500 text-xs mt-1">{formErrors.firstName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="sarah@realtygroup.com"
                      value={contactInfo.email}
                      onChange={(e) => {
                        setContactInfo({ ...contactInfo, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-rose-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Submit CTA */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    id="submit-contact-reveal-score"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-b from-[#FFDE33] via-[#FFCC00] to-[#E6B800] hover:from-[#FFE24D] hover:to-[#F5C200] text-slate-950 font-black text-base tracking-tight shadow-[0_10px_25px_rgba(230,184,0,0.4)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reveal My Lead Leakage Score</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Your information is 100% private and never sold or shared.</span>
                  </div>
                </div>

              </form>
            </div>
          )}

          {/* 3. MULTI-PHASE DIAGNOSTIC LOADER STEP (Index 13) */}
          {currentStep > totalQuestions && (
            <div className="py-12 px-4 text-center space-y-8 max-w-md mx-auto">
              
              {/* Spinning Diagnostic Pulse */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-[#FFCC00] animate-spin" />
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1A4BFF]">
                  <Activity className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              {/* Progress Text */}
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-950 transition-all duration-300">
                  {analysisPhases[loadingPhase]?.title || 'Processing Diagnostic...'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  {analysisPhases[loadingPhase]?.sub || 'Auditing your responses'}
                </p>
              </div>

              {/* Step checklist */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
                {analysisPhases.map((phase, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    {idx < loadingPhase ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : idx === loadingPhase ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#FFCC00] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-slate-200 border border-slate-300 shrink-0" />
                    )}
                    <span className={idx <= loadingPhase ? 'text-slate-900 font-bold' : 'text-slate-500'}>
                      {phase.title}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
