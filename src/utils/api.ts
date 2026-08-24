import { UserAuditAnswers, AuditResult, AIReportResponse } from '../types';

export async function generateAIReport(
  answers: UserAuditAnswers,
  result: AuditResult,
  contact: any
): Promise<{ diagnosis: string; auditId?: string } | null> {
  try {
    const sortedPillars = [...result.pillars].sort((a, b) => a.score - b.score);
    const primaryLeak = sortedPillars[0];
    const secondaryLeak = sortedPillars[1];
    const tertiaryLeak = sortedPillars[2];

    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers,
        scores: {
          overallScore: result.overallScore,
          speedToLead: result.pillars.find(p => p.key === 'speedToLead')?.score,
          followUp: result.pillars.find(p => p.key === 'followUp')?.score,
          qualification: result.pillars.find(p => p.key === 'qualification')?.score,
          appointmentFlow: result.pillars.find(p => p.key === 'appointmentFlow')?.score,
          reactivation: result.pillars.find(p => p.key === 'reactivation')?.score,
        },
        primaryLeak,
        secondaryLeak,
        tertiaryLeak,
        contact
      }),
    });

    if (!response.ok) {
      console.warn("AI generation endpoint returned an error status:", response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating AI report:", error);
    return null;
  }
}
