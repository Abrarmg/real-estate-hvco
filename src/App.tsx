import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { AuditModal } from './components/AuditModal';
import { ResultsView } from './components/ResultsView';
import { StrategyCallModal } from './components/StrategyCallModal';
import { UserAuditAnswers, UserContactInfo, AuditResult } from './types';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'landing' | 'loading' | 'results'>('landing');

  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditAnswers, setAuditAnswers] = useState<UserAuditAnswers>({});
  const [userContact, setUserContact] = useState<UserContactInfo>({
    firstName: '',
    email: '',
    phone: '',
    websiteOrBrokerage: '',
    crmPlatform: '',
  });

  // Check if previous completed audit exists in localStorage for convenience
  useEffect(() => {
    try {
      // Check if viewing a specific report
      const path = window.location.pathname;
      if (path.startsWith('/report/')) {
        const id = path.split('/')[2];
        if (id) {
          setViewMode('loading');
          fetch(`/api/audit/${id}`)
            .then(res => {
              if (!res.ok) throw new Error('Not found');
              return res.json();
            })
            .then(data => {
              // Map DB format to UI format
              const mappedResult: AuditResult = {
                pillars: [
                  { key: 'speedToLead', name: 'Speed-to-Lead', score: data.scores.speedToLead },
                  { key: 'followUp', name: 'Follow-Up', score: data.scores.followUp },
                  { key: 'qualification', name: 'Lead Qualification', score: data.scores.qualification },
                  { key: 'appointmentFlow', name: 'Appointment Flow', score: data.scores.appointmentFlow },
                  { key: 'reactivation', name: 'Lead Reactivation', score: data.scores.reactivation },
                ],
                overallScore: data.overallScore,
                aiDiagnostic: { diagnosis: data.diagnosis }
              };
              setAuditResult(mappedResult);
              setAuditAnswers(data.answers);
              setUserContact({
                firstName: data.firstName,
                email: data.email,
                phone: data.phone || '',
                websiteOrBrokerage: data.websiteOrBrokerage || '',
                crmPlatform: data.crmPlatform || ''
              });
              setViewMode('results');
            })
            .catch(err => {
              console.error(err);
              setViewMode('landing');
            });
          return;
        }
      }

      // Check if previous completed audit exists in localStorage for convenience
      const savedPayload = localStorage.getItem('lead_leakage_audit_result');
      if (savedPayload) {
        const parsed = JSON.parse(savedPayload);
        if (parsed.result && parsed.contact) {
          setAuditAnswers(parsed.answers || {});
          setUserContact(parsed.contact);
          
          if (!parsed.result.aiDiagnostic || !parsed.result.aiDiagnostic.diagnosis) {
            // Need to generate AI diagnostic
            setAuditResult(parsed.result);
            setViewMode('loading');
            import('./utils/api').then(({ generateAIReport }) => {
              generateAIReport(parsed.answers || {}, parsed.result, parsed.contact).then(response => {
                if (response) {
                  parsed.result.aiDiagnostic = { diagnosis: response.diagnosis };
                  setAuditResult({ ...parsed.result });
                  localStorage.setItem(
                    'lead_leakage_audit_result',
                    JSON.stringify({ result: parsed.result, answers: parsed.answers, contact: parsed.contact })
                  );
                }
                setViewMode('results');
              });
            });
          } else {
            setAuditResult(parsed.result);
            setViewMode('results');
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleStartAudit = () => {
    setIsAuditModalOpen(true);
  };

  const handleAuditCompleted = async (
    result: AuditResult,
    answers: UserAuditAnswers,
    contact: UserContactInfo
  ) => {
    setIsAuditModalOpen(false);
    setViewMode('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Call the AI Endpoint
    const { generateAIReport } = await import('./utils/api');
    const response = await generateAIReport(answers, result, contact);
    
    if (response) {
      result.aiDiagnostic = { diagnosis: response.diagnosis };
    }

    setAuditResult(result);
    setAuditAnswers(answers);
    setUserContact(contact);
    setViewMode('results');

    // Save to local storage
    try {
      localStorage.setItem(
        'lead_leakage_audit_result',
        JSON.stringify({ result, answers, contact, date: new Date().toISOString() })
      );
    } catch {
      // ignore
    }
  };

  const handleRetakeAudit = () => {
    setViewMode('landing');
    setIsAuditModalOpen(true);
  };

  const handleOpenStrategyModal = () => {
    setIsStrategyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#FFE500] selection:text-slate-950 flex flex-col justify-start">
      {/* Conditional View Rendering */}
      {viewMode === 'landing' ? (
        <main className="flex-1 w-full">
          {/* Hero Section matching screenshot */}
          <HeroSection
            onAuditCompleted={handleAuditCompleted}
            onOpenAuditModal={handleStartAudit}
          />
        </main>
      ) : viewMode === 'loading' ? (
        <main className="flex-1 w-full flex items-center justify-center bg-[#0B111E] text-slate-100 min-h-screen">
          <div className="max-w-md w-full p-8 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Analyzing your lead flow...</h2>
            <div className="space-y-3 text-sm text-slate-400 text-left w-full max-w-xs mx-auto">
              <div className="flex items-center gap-3 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Reviewing response speed</span>
              </div>
              <div className="flex items-center gap-3 animate-pulse" style={{ animationDelay: '400ms' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Analyzing follow-up</span>
              </div>
              <div className="flex items-center gap-3 animate-pulse" style={{ animationDelay: '800ms' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Checking nurture</span>
              </div>
              <div className="flex items-center gap-3 animate-pulse" style={{ animationDelay: '1200ms' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Building personalized report</span>
              </div>
            </div>
          </div>
        </main>
      ) : (
        auditResult && (
          <main className="py-8 bg-slate-50 min-h-screen">
            <ResultsView
              result={auditResult}
              answers={auditAnswers}
              contact={userContact}
              onRetake={handleRetakeAudit}
              onBookStrategyCall={handleOpenStrategyModal}
            />
          </main>
        )
      )}

      {/* Interactive Audit Modal (Fallback/Retake trigger) */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onAuditCompleted={handleAuditCompleted}
      />

      {/* Strategy Call Booking Dialog */}
      <StrategyCallModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
        contact={userContact}
        result={auditResult}
      />
    </div>
  );
}

