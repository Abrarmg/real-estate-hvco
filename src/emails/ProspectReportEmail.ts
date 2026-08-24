import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Body, Container, Section, Text, Hr, Column, Row, Button } from '@react-email/components';

interface ProspectReportEmailProps {
  contact: {
    firstName: string;
  };
  scores: {
    overallScore: number;
    speedToLead: number;
    followUp: number;
    qualification: number;
    appointmentFlow: number;
    reactivation: number;
  };
  diagnosis: string;
  reportUrl: string;
  bookingUrl: string;
}

const getStatusText = (score: number) => {
    if (score >= 81) return 'TIGHT SYSTEM';
    if (score >= 61) return 'MINOR LEAKAGE';
    if (score >= 41) return 'SIGNIFICANT LEAKAGE';
    if (score >= 21) return 'HEAVY LEAKAGE';
    return 'CRITICAL LEAKAGE';
};

const getStatusColor = (score: number) => {
    if (score >= 81) return '#059669'; // emerald-600
    if (score >= 61) return '#d97706'; // amber-600
    if (score >= 41) return '#ea580c'; // orange-600
    return '#e11d48'; // rose-600
};

export const ProspectReportEmail = ({ contact, scores, diagnosis, reportUrl, bookingUrl }: ProspectReportEmailProps) => {
    const scoreColor = getStatusColor(scores.overallScore);
    const statusText = getStatusText(scores.overallScore);
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Body, { style: main, children: _jsxs(Container, { style: container, children: [_jsx(Section, { style: header, children: _jsx(Text, { style: headerText, children: "LEAD LEAKAGE AUDIT" }) }), _jsxs(Section, { children: [_jsxs(Text, { style: greeting, children: ["Hi ", contact.firstName, ","] }), _jsx(Text, { style: introText, children: "I went through your answers. There are a couple of things I'd fix, but one problem stands out more than the others." })] }), _jsx(Hr, { style: hr }), _jsxs(Section, { style: heroSection, children: [_jsx(Text, { style: sectionTitleCenter, children: "YOUR LEAD LEAKAGE SCORE" }), _jsxs(Text, { style: { ...scoreHero, color: scoreColor }, children: [scores.overallScore, "/100"] }), _jsx(Text, { style: { ...scoreStatus, color: scoreColor }, children: statusText })] }), _jsxs(Section, { children: [_jsxs(Row, { style: scoreCardContainer, children: [_jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Speed-to-Lead" }), _jsx(Text, { style: scoreCardValue, children: scores.speedToLead })] }), _jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Follow-Up" }), _jsx(Text, { style: scoreCardValue, children: scores.followUp })] }), _jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Qualification" }), _jsx(Text, { style: scoreCardValue, children: scores.qualification })] })] }), _jsxs(Row, { style: { ...scoreCardContainer, marginTop: '8px' }, children: [_jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Appt Flow" }), _jsx(Text, { style: scoreCardValue, children: scores.appointmentFlow })] }), _jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Reactivation" }), _jsx(Text, { style: scoreCardValue, children: scores.reactivation })] }), _jsx(Column, { style: { width: '32%' } })] })] }), _jsx(Hr, { style: hr }), _jsx(Section, { style: diagnosisSection, children: diagnosis.split('\n').map((paragraph, i) => (paragraph.trim() ? _jsx(Text, { style: paragraphStyle, key: i, children: paragraph }) : null)) }), _jsx(Section, { style: reportButtonSection, children: _jsx(Button, { href: reportUrl, style: secondaryButton, children: "VIEW MY FULL REPORT \u2192" }) }), _jsx(Hr, { style: hr }), _jsxs(Section, { style: ctaSection, children: [_jsx(Text, { style: ctaPrompt, children: "Want me to show you how I'd fix this?" }), _jsx(Text, { style: ctaDesc, children: "We can spend 15\u201320 minutes looking at your current lead process and I'll walk you through what I'd change first." }), _jsx(Button, { href: bookingUrl, style: primaryButton, children: "BOOK MY DIAGNOSTIC CALL \u2192" }), _jsx(Text, { style: ctaSubtext, children: "No obligation. No hard pitch." })] }), _jsx(Hr, { style: hr }), _jsxs(Section, { style: footer, children: [_jsx(Text, { style: footerText, children: "You received this because you requested a Lead Leakage Audit." }), _jsx(Text, { style: footerText, children: "Questions? Just reply to this email." })] })] }) })] }));
};

const main = {
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    margin: '40px auto',
    padding: '40px 20px',
    width: '600px',
    maxWidth: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
};
const header: any = {
    paddingBottom: '20px',
    textAlign: 'center',
};
const headerText: any = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    margin: '0',
};
const greeting = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: '0 0 16px 0',
};
const introText = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#334155',
    margin: '0',
};
const hr = {
    borderColor: '#f1f5f9',
    margin: '32px 0',
};
const heroSection: any = {
    textAlign: 'center',
    paddingBottom: '24px',
};
const sectionTitleCenter: any = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: '0 0 16px 0',
};
const scoreHero = {
    fontSize: '64px',
    fontWeight: '900',
    margin: '0 0 8px 0',
    lineHeight: '1',
};
const scoreStatus = {
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    margin: '0',
};
const scoreCardContainer = {
    width: '100%',
};
const scoreCard: any = {
    padding: '16px 12px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #f1f5f9',
    textAlign: 'center',
    width: '32%',
};
const scoreCardLabel: any = {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    margin: '0 0 8px 0',
};
const scoreCardValue = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: '0',
};
const diagnosisSection = {
    padding: '16px 0',
};
const paragraphStyle = {
    fontSize: '17px',
    lineHeight: '1.6',
    color: '#1e293b',
    margin: '0 0 20px 0',
};
const reportButtonSection: any = {
    textAlign: 'center',
    paddingTop: '16px',
};
const secondaryButton = {
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    padding: '14px 28px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-block',
    border: '1px solid #e2e8f0',
};
const ctaSection: any = {
    textAlign: 'center',
    backgroundColor: '#ffffff',
};
const ctaPrompt = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: '0 0 12px 0',
};
const ctaDesc = {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.5',
    margin: '0 0 24px 0',
};
const primaryButton = {
    backgroundColor: '#ffe500',
    color: '#0f172a',
    padding: '18px 32px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 4px 14px 0 rgba(255, 229, 0, 0.39)',
};
const ctaSubtext = {
    fontSize: '13px',
    color: '#64748b',
    marginTop: '16px',
};
const footer: any = {
    textAlign: 'center',
};
const footerText = {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '0 0 8px 0',
};
export default ProspectReportEmail;
