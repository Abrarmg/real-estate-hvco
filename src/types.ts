export interface AuditQuestionOption {
  id: string;
  label: string;
  sublabel?: string;
  points: {
    speedToLead?: number;
    followUp?: number;
    qualification?: number;
    appointmentFlow?: number;
    reactivation?: number;
    overall?: number;
  };
}

export interface AuditQuestion {
  id: number;
  category: 'volume' | 'source' | 'speed' | 'followup' | 'frequency' | 'sms' | 'crm' | 'appointment' | 'reactivation' | 'database' | 'frustration' | 'urgency';
  title: string;
  subtitle?: string;
  options: AuditQuestionOption[];
}

export interface UserAuditAnswers {
  leadVolume?: string;
  leadSource?: string;
  responseTime?: string;
  followUpMethod?: string;
  followUpFrequency?: string;
  smsAutomation?: string;
  crmUsage?: string;
  appointmentAutomation?: string;
  reactivation?: string;
  databaseSize?: string;
  biggestFrustration?: string;
  urgency?: string;
}

export interface UserContactInfo {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  websiteOrBrokerage?: string;
  crmPlatform?: string;
}

export interface PillarScore {
  name: string;
  key: 'speedToLead' | 'followUp' | 'qualification' | 'appointmentFlow' | 'reactivation';
  score: number;
  industryAverage?: number;
  status?: 'critical' | 'warning' | 'healthy' | 'optimal';
  headline?: string;
  description?: string;
  recommendation?: string;
}

export interface AuditResult {
  overallScore: number;
  riskLevel?: 'HIGH LEAKAGE RISK' | 'MODERATE LEAKAGE' | 'SOME LEAKAGE' | 'EXCELLENT LEAD FLOW';
  riskColor?: string;
  riskDescription?: string;
  pillars: PillarScore[];
  biggestLeak?: PillarScore;
  secondBiggestLeak?: PillarScore;
  estimatedMonthlyLeads?: number;
  estimatedLostAppointments?: number;
  estimatedLostGCI?: number;
  specificTactics?: {
    title: string;
    action: string;
    impact: string;
  }[];
  aiDiagnostic?: AIReportResponse;
  timestamp?: string;
}

export interface LeadSubmissionPayload {
  contact: UserContactInfo;
  answers: UserAuditAnswers;
  result: AuditResult;
  submittedAt: string;
}

export interface AILeak {
  title: string;
  status: 'CRITICAL' | 'NEEDS ATTENTION' | 'OPPORTUNITY';
  explanation: string;
}

export interface AIQuickWinStep {
  label: string;
  action: string;
}

export interface AIPriority {
  urgency: 'NOW' | 'NEXT' | 'LATER';
  action: string;
}

export interface AIReportResponse {
  diagnosis: string;
}
