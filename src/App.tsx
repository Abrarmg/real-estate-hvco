import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { AuditModal } from './components/AuditModal';
import { ResultsView } from './components/ResultsView';
import { StrategyCallModal } from './components/StrategyCallModal';
import { UserAuditAnswers, UserContactInfo, AuditResult } from './types';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'landing' | 'results'>('landing');

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
      const savedPayload = localStorage.getItem('lead_leakage_audit_result');
      if (savedPayload) {
        const parsed = JSON.parse(savedPayload);
        if (parsed.result && parsed.contact) {
          setAuditResult(parsed.result);
          setAuditAnswers(parsed.answers || {});
          setUserContact(parsed.contact);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleStartAudit = () => {
    setIsAuditModalOpen(true);
  };

  const handleAuditCompleted = (
    result: AuditResult,
    answers: UserAuditAnswers,
    contact: UserContactInfo
  ) => {
    setAuditResult(result);
    setAuditAnswers(answers);
    setUserContact(contact);
    setIsAuditModalOpen(false);
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

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

