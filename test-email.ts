import { render } from '@react-email/render';
import React from 'react';
import fs from 'fs';
import InternalLeadEmail from './src/emails/InternalLeadEmail';
import ProspectReportEmail from './src/emails/ProspectReportEmail';

const mockAudit = {
  id: 'test-123',
  firstName: 'John',
  email: 'john@example.com',
  phone: '555-1234',
  websiteOrBrokerage: 'John Real Estate',
  crmPlatform: 'HubSpot',
  scores: {
    overallScore: 75,
    speedToLead: 15,
    followUp: 20,
    qualification: 10,
    appointmentFlow: 15,
    reactivation: 15
  },
  diagnosis: 'Line 1\nLine 2',
  answers: { "Q1": "A1" }
};

const reportUrl = 'https://example.com/report';
const bookingUrl = 'https://example.com/book';

async function main() {
  const internalHtml = await render(
    React.createElement(InternalLeadEmail, {
      auditId: mockAudit.id,
      contact: {
        firstName: mockAudit.firstName,
        email: mockAudit.email,
        phone: mockAudit.phone,
        websiteOrBrokerage: mockAudit.websiteOrBrokerage,
        crmPlatform: mockAudit.crmPlatform,
      },
      scores: mockAudit.scores,
      diagnosis: mockAudit.diagnosis,
      answers: mockAudit.answers,
      reportUrl,
    })
  );

  const prospectHtml = await render(
    React.createElement(ProspectReportEmail, {
      contact: { firstName: mockAudit.firstName },
      scores: mockAudit.scores,
      diagnosis: mockAudit.diagnosis,
      reportUrl,
      bookingUrl,
    })
  );

  fs.writeFileSync('/tmp/internal1.html', internalHtml);
  fs.writeFileSync('/tmp/prospect1.html', prospectHtml);
  console.log('Saved baseline HTML');
}

main().catch(console.error);
