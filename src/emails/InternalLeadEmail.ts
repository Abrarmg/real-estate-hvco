import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Body, Container, Section, Text, Link, Hr, Column, Row, Button } from '@react-email/components';

interface InternalLeadEmailProps {
  auditId: string;
  contact: {
    firstName: string;
    email: string;
    phone?: string;
    websiteOrBrokerage?: string;
    crmPlatform?: string;
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
  answers: any;
  reportUrl: string;
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

export const InternalLeadEmail = ({ auditId, contact, scores, diagnosis, answers, reportUrl }: InternalLeadEmailProps) => {
    const scoreColor = getStatusColor(scores.overallScore);
    const statusText = getStatusText(scores.overallScore);
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Body, { style: main, children: _jsxs(Container, { style: container, children: [_jsxs(Section, { style: header, children: [_jsx(Text, { style: headerText, children: "NEW LEAD AUDIT COMPLETED" }), _jsxs(Text, { style: introText, children: [contact.firstName, " just completed the Lead Leakage Audit."] })] }), _jsx(Hr, { style: hr }), _jsxs(Section, { children: [_jsx(Text, { style: sectionTitle, children: "CONTACT INFO" }), _jsxs(Text, { style: contactItem, children: [_jsx("strong", { children: "Name:" }), " ", contact.firstName] }), _jsxs(Text, { style: contactItem, children: [_jsx("strong", { children: "Email:" }), " ", _jsx(Link, { href: `mailto:${contact.email}`, style: link, children: contact.email })] }), contact.phone && (_jsxs(Text, { style: contactItem, children: [_jsx("strong", { children: "Phone:" }), " ", _jsx(Link, { href: `tel:${contact.phone}`, style: link, children: contact.phone })] })), contact.websiteOrBrokerage && (_jsxs(Text, { style: contactItem, children: [_jsx("strong", { children: "Company/Website:" }), " ", contact.websiteOrBrokerage] })), contact.crmPlatform && (_jsxs(Text, { style: contactItem, children: [_jsx("strong", { children: "CRM:" }), " ", contact.crmPlatform] }))] }), _jsx(Hr, { style: hr }), _jsxs(Section, { children: [_jsx(Text, { style: sectionTitle, children: "LEAD SCORE" }), _jsx(Row, { children: _jsxs(Column, { children: [_jsxs(Text, { style: { ...scoreHero, color: scoreColor }, children: [scores.overallScore, "/100"] }), _jsx(Text, { style: { ...scoreStatus, color: scoreColor }, children: statusText })] }) }), _jsxs(Row, { style: scoreCardContainer, children: [_jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Speed-to-Lead" }), _jsx(Text, { style: scoreCardValue, children: scores.speedToLead })] }), _jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Follow-Up" }), _jsx(Text, { style: scoreCardValue, children: scores.followUp })] }), _jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Lead Qualification" }), _jsx(Text, { style: scoreCardValue, children: scores.qualification })] }), _jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Appointment Flow" }), _jsx(Text, { style: scoreCardValue, children: scores.appointmentFlow })] }), _jsxs(Column, { style: scoreCard, children: [_jsx(Text, { style: scoreCardLabel, children: "Lead Reactivation" }), _jsx(Text, { style: scoreCardValue, children: scores.reactivation })] })] })] }), _jsx(Hr, { style: hr }), _jsxs(Section, { children: [_jsx(Text, { style: sectionTitle, children: "PERSONALIZED DIAGNOSIS" }), diagnosis.split('\n').map((paragraph, i) => (paragraph.trim() ? _jsx(Text, { style: paragraphStyle, key: i, children: paragraph }) : null))] }), _jsx(Hr, { style: hr }), _jsxs(Section, { children: [_jsx(Text, { style: sectionTitle, children: "AUDIT ANSWERS (RAW)" }), _jsx(Text, { style: answersText, children: JSON.stringify(answers, null, 2) })] }), _jsx(Hr, { style: hr }), _jsxs(Section, { style: ctaSection, children: [_jsx(Button, { href: reportUrl, style: primaryButton, children: "VIEW FULL AUDIT \u2192" }), _jsxs(Text, { style: secondaryAction, children: ["Or reply to this email to contact ", contact.firstName, " directly."] })] })] }) })] }));
};

const main = {
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    margin: '0 auto',
    padding: '40px 20px',
    width: '600px',
    maxWidth: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
};
const header = {
    paddingBottom: '20px',
};
const headerText: any = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: '0 0 8px 0',
};
const introText = {
    fontSize: '20px',
    color: '#0f172a',
    margin: '0',
};
const hr = {
    borderColor: '#f1f5f9',
    margin: '30px 0',
};
const sectionTitle: any = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '16px',
};
const contactItem = {
    fontSize: '15px',
    color: '#334155',
    margin: '4px 0',
};
const link = {
    color: '#2563eb',
    textDecoration: 'none',
};
const scoreHero = {
    fontSize: '48px',
    fontWeight: '900',
    margin: '0 0 4px 0',
};
const scoreStatus = {
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    margin: '0 0 24px 0',
};
const scoreCardContainer = {
    width: '100%',
};
const scoreCard: any = {
    padding: '12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #f1f5f9',
    textAlign: 'center',
    width: '20%',
};
const scoreCardLabel: any = {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    margin: '0 0 8px 0',
};
const scoreCardValue = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: '0',
};
const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#1e293b',
    margin: '0 0 16px 0',
};
const answersText: any = {
    fontSize: '12px',
    color: '#64748b',
    whiteSpace: 'pre-wrap',
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
};
const ctaSection: any = {
    textAlign: 'center',
    paddingTop: '20px',
};
const primaryButton = {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-block',
};
const secondaryAction = {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '16px',
};
export default InternalLeadEmail;
