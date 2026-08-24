import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Column,
  Row,
  Button
} from '@react-email/components';

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

export const ProspectReportEmail = ({
  contact,
  scores,
  diagnosis,
  reportUrl,
  bookingUrl
}: ProspectReportEmailProps) => {
  const scoreColor = getStatusColor(scores.overallScore);
  const statusText = getStatusText(scores.overallScore);

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          
          <Section style={header}>
            <Text style={headerText}>LEAD LEAKAGE AUDIT</Text>
          </Section>

          <Section>
            <Text style={greeting}>Hi {contact.firstName},</Text>
            <Text style={introText}>
              I went through your answers. There are a couple of things I'd fix, but one problem stands out more than the others.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={heroSection}>
            <Text style={sectionTitleCenter}>YOUR LEAD LEAKAGE SCORE</Text>
            <Text style={{ ...scoreHero, color: scoreColor }}>{scores.overallScore}/100</Text>
            <Text style={{ ...scoreStatus, color: scoreColor }}>{statusText}</Text>
          </Section>

          <Section>
            <Row style={scoreCardContainer}>
              <Column style={scoreCard}>
                <Text style={scoreCardLabel}>Speed-to-Lead</Text>
                <Text style={scoreCardValue}>{scores.speedToLead}</Text>
              </Column>
              <Column style={scoreCard}>
                <Text style={scoreCardLabel}>Follow-Up</Text>
                <Text style={scoreCardValue}>{scores.followUp}</Text>
              </Column>
              <Column style={scoreCard}>
                <Text style={scoreCardLabel}>Qualification</Text>
                <Text style={scoreCardValue}>{scores.qualification}</Text>
              </Column>
            </Row>
            <Row style={{ ...scoreCardContainer, marginTop: '8px' }}>
              <Column style={scoreCard}>
                <Text style={scoreCardLabel}>Appt Flow</Text>
                <Text style={scoreCardValue}>{scores.appointmentFlow}</Text>
              </Column>
              <Column style={scoreCard}>
                <Text style={scoreCardLabel}>Reactivation</Text>
                <Text style={scoreCardValue}>{scores.reactivation}</Text>
              </Column>
              <Column style={{ width: '32%' }}></Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={diagnosisSection}>
            {diagnosis.split('\n').map((paragraph, i) => (
              paragraph.trim() ? <Text key={i} style={paragraphStyle}>{paragraph}</Text> : null
            ))}
          </Section>

          <Section style={reportButtonSection}>
            <Button href={reportUrl} style={secondaryButton}>
              VIEW MY FULL REPORT &rarr;
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={ctaSection}>
            <Text style={ctaPrompt}>Want me to show you how I'd fix this?</Text>
            <Text style={ctaDesc}>
              We can spend 15–20 minutes looking at your current lead process and I'll walk you through what I'd change first.
            </Text>
            <Button href={bookingUrl} style={primaryButton}>
              BOOK MY DIAGNOSTIC CALL &rarr;
            </Button>
            <Text style={ctaSubtext}>
              No obligation. No hard pitch.
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              You received this because you requested a Lead Leakage Audit.
            </Text>
            <Text style={footerText}>
              Questions? Just reply to this email.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

// Styles
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

const header = {
  paddingBottom: '20px',
  textAlign: 'center' as const,
};

const headerText = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#64748b',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
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

const heroSection = {
  textAlign: 'center' as const,
  paddingBottom: '24px',
};

const sectionTitleCenter = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#94a3b8',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
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

const scoreCard = {
  padding: '16px 12px',
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  border: '1px solid #f1f5f9',
  textAlign: 'center' as const,
  width: '32%',
};

const scoreCardLabel = {
  fontSize: '10px',
  fontWeight: 'bold',
  color: '#64748b',
  textTransform: 'uppercase' as const,
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

const reportButtonSection = {
  textAlign: 'center' as const,
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

const ctaSection = {
  textAlign: 'center' as const,
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

const footer = {
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#94a3b8',
  margin: '0 0 8px 0',
};

export default ProspectReportEmail;
