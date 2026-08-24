import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Column,
  Row,
  Button
} from '@react-email/components';

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

export const InternalLeadEmail = ({
  auditId,
  contact,
  scores,
  diagnosis,
  answers,
  reportUrl
}: InternalLeadEmailProps) => {
  const scoreColor = getStatusColor(scores.overallScore);
  const statusText = getStatusText(scores.overallScore);

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          
          <Section style={header}>
            <Text style={headerText}>NEW LEAD AUDIT COMPLETED</Text>
            <Text style={introText}>{contact.firstName} just completed the Lead Leakage Audit.</Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={sectionTitle}>CONTACT INFO</Text>
            <Text style={contactItem}><strong>Name:</strong> {contact.firstName}</Text>
            <Text style={contactItem}>
              <strong>Email:</strong> <Link href={`mailto:${contact.email}`} style={link}>{contact.email}</Link>
            </Text>
            {contact.phone && (
              <Text style={contactItem}>
                <strong>Phone:</strong> <Link href={`tel:${contact.phone}`} style={link}>{contact.phone}</Link>
              </Text>
            )}
            {contact.websiteOrBrokerage && (
              <Text style={contactItem}><strong>Company/Website:</strong> {contact.websiteOrBrokerage}</Text>
            )}
            {contact.crmPlatform && (
              <Text style={contactItem}><strong>CRM:</strong> {contact.crmPlatform}</Text>
            )}
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={sectionTitle}>LEAD SCORE</Text>
            <Row>
              <Column>
                <Text style={{ ...scoreHero, color: scoreColor }}>{scores.overallScore}/100</Text>
                <Text style={{ ...scoreStatus, color: scoreColor }}>{statusText}</Text>
              </Column>
            </Row>

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
                <Text style={scoreCardLabel}>Lead Qualification</Text>
                <Text style={scoreCardValue}>{scores.qualification}</Text>
              </Column>
              <Column style={scoreCard}>
                <Text style={scoreCardLabel}>Appointment Flow</Text>
                <Text style={scoreCardValue}>{scores.appointmentFlow}</Text>
              </Column>
              <Column style={scoreCard}>
                <Text style={scoreCardLabel}>Lead Reactivation</Text>
                <Text style={scoreCardValue}>{scores.reactivation}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={sectionTitle}>PERSONALIZED DIAGNOSIS</Text>
            {diagnosis.split('\n').map((paragraph, i) => (
              paragraph.trim() ? <Text key={i} style={paragraphStyle}>{paragraph}</Text> : null
            ))}
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={sectionTitle}>AUDIT ANSWERS (RAW)</Text>
            <Text style={answersText}>{JSON.stringify(answers, null, 2)}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={ctaSection}>
            <Button href={reportUrl} style={primaryButton}>
              VIEW FULL AUDIT &rarr;
            </Button>
            <Text style={secondaryAction}>
              Or reply to this email to contact {contact.firstName} directly.
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

const headerText = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#64748b',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
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

const sectionTitle = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#94a3b8',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
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

const scoreCard = {
  padding: '12px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #f1f5f9',
  textAlign: 'center' as const,
  width: '20%',
};

const scoreCardLabel = {
  fontSize: '10px',
  fontWeight: 'bold',
  color: '#64748b',
  textTransform: 'uppercase' as const,
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

const answersText = {
  fontSize: '12px',
  color: '#64748b',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f8fafc',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
};

const ctaSection = {
  textAlign: 'center' as const,
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
