import { Resend } from 'resend';
import { render } from '@react-email/render';
import * as React from 'react';
import InternalLeadEmail from '../emails/InternalLeadEmail.js';
import ProspectReportEmail from '../emails/ProspectReportEmail.js';
import { SavedAudit, updateEmailStatus } from './db.js';

export async function sendAuditEmails(audit: SavedAudit) {
  const EMAILS_ENABLED = process.env.EMAILS_ENABLED === 'true';
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Lead Audit <reports@yourdomain.com>';
  const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || 'owner@example.com';
  const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'owner@example.com';
  const APP_URL = process.env.APP_URL || 'http://localhost:3000';
  const BOOKING_URL = process.env.BOOKING_URL || 'https://gotautomated.com/';
  const TEST_RECIPIENT = process.env.EMAIL_TEST_RECIPIENT;
  if (!EMAILS_ENABLED) {
    console.log('Emails are disabled via EMAILS_ENABLED. Skipping send.');
    return;
  }

  const reportUrl = `${APP_URL}/report/${audit.id}`;

  const internalRecipient = TEST_RECIPIENT || NOTIFICATION_EMAIL;
  const prospectRecipient = TEST_RECIPIENT || audit.email;

  console.log(`[EMAIL DEBUG] internal recipient resolved: ${internalRecipient}`);
  console.log(`[EMAIL DEBUG] prospect recipient resolved: ${prospectRecipient}`);

  // 1. Send Internal Lead Notification
  try {
    const internalHtml = await render(
      React.createElement(InternalLeadEmail, {
        auditId: audit.id,
        contact: {
          firstName: audit.firstName,
          email: audit.email,
          phone: audit.phone,
          websiteOrBrokerage: audit.websiteOrBrokerage,
          crmPlatform: audit.crmPlatform,
        },
        scores: audit.scores,
        diagnosis: audit.diagnosis,
        answers: audit.answers,
        reportUrl,
      })
    );
    
    // We attempt to extract a primary bottleneck from the score.
    // The lowest score is the primary bottleneck.
    const scoreEntries = Object.entries(audit.scores).filter(([k]) => k !== 'overallScore');
    scoreEntries.sort((a, b) => (a[1] as number) - (b[1] as number));
    const primaryLeakName = scoreEntries[0][0];

    const internalSubject = `New Lead: ${audit.firstName} | ${primaryLeakName} Leak | Score ${audit.overallScore}`;

    console.log('[EMAIL DEBUG] sending internal email');
    const internalData = await resend.emails.send({
      from: FROM_EMAIL,
      to: internalRecipient,
      replyTo: audit.email || REPLY_TO_EMAIL,
      subject: internalSubject,
      html: internalHtml,
      headers: {
        'Idempotency-Key': `audit-admin-${audit.id}`,
      },
      tags: [
        { name: 'type', value: 'audit_admin' },
        { name: 'audit_id', value: audit.id },
      ],
    });

    if (internalData.error) {
      console.error('[EMAIL DEBUG] internal result FAILED', internalData.error);
      updateEmailStatus(audit.id, 'internal', 'failed');
    } else {
      console.log('[EMAIL DEBUG] internal result SUCCESS', internalData.data?.id);
      updateEmailStatus(audit.id, 'internal', 'sent', internalData.data?.id);
    }
  } catch (err) {
    console.error('Error in sendInternalEmail:', err);
    updateEmailStatus(audit.id, 'internal', 'failed');
  }

  // 2. Send Prospect Report Email
  if (!audit.email) {
    console.warn('No email provided by prospect. Skipping prospect report email.');
    return;
  }

  try {
    const prospectHtml = await render(
      React.createElement(ProspectReportEmail, {
        contact: { firstName: audit.firstName },
        scores: audit.scores,
        diagnosis: audit.diagnosis,
        reportUrl,
        bookingUrl: BOOKING_URL,
      })
    );

    const prospectSubject = `Your Lead Leakage Audit is ready, ${audit.firstName}`;

    console.log('[EMAIL DEBUG] sending prospect email');
    const prospectData = await resend.emails.send({
      from: FROM_EMAIL,
      to: prospectRecipient,
      replyTo: REPLY_TO_EMAIL,
      subject: prospectSubject,
      html: prospectHtml,
      headers: {
        'Idempotency-Key': `audit-prospect-${audit.id}`,
      },
      tags: [
        { name: 'type', value: 'audit_report' },
        { name: 'audit_id', value: audit.id },
      ],
    });

    if (prospectData.error) {
      console.error('[EMAIL DEBUG] prospect result FAILED', prospectData.error);
      updateEmailStatus(audit.id, 'prospect', 'failed');
    } else {
      console.log('[EMAIL DEBUG] prospect result SUCCESS', prospectData.data?.id);
      updateEmailStatus(audit.id, 'prospect', 'sent', prospectData.data?.id);
    }
  } catch (err) {
    console.error('Error in sendProspectEmail:', err);
    updateEmailStatus(audit.id, 'prospect', 'failed');
  }
  
  console.log('[EMAIL DEBUG] email flow complete');
}
