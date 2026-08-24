import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env explicitly FIRST
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { Resend } from 'resend';

async function testResend() {
  console.log('RESEND_API_KEY loaded:', !!process.env.RESEND_API_KEY ? 'YES' : 'NO');
  console.log('RESEND_FROM_EMAIL loaded:', !!process.env.RESEND_FROM_EMAIL ? 'YES' : 'NO', process.env.RESEND_FROM_EMAIL);
  console.log('LEAD_NOTIFICATION_EMAIL loaded:', !!process.env.LEAD_NOTIFICATION_EMAIL ? 'YES' : 'NO');
  console.log('REPLY_TO_EMAIL loaded:', !!process.env.REPLY_TO_EMAIL ? 'YES' : 'NO');
  console.log('APP_URL loaded:', !!process.env.APP_URL ? 'YES' : 'NO');
  console.log('BOOKING_URL loaded:', !!process.env.BOOKING_URL ? 'YES' : 'NO');
  console.log('EMAILS_ENABLED value:', process.env.EMAILS_ENABLED === 'true' ? 'enabled' : 'disabled');
  console.log('EMAIL_TEST_RECIPIENT loaded:', !!process.env.EMAIL_TEST_RECIPIENT ? 'YES' : 'NO');

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'reports@abrar.gotautomated.com',
    to: process.env.EMAIL_TEST_RECIPIENT || process.env.LEAD_NOTIFICATION_EMAIL || 'ibrarsargana7840@gmail.com',
    subject: 'Resend Connection Test',
    html: '<h1>Resend works</h1><p>This email was sent directly from the server.</p>'
  });

  if (error) {
    console.error('RESEND DIRECT TEST: FAILED');
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
  } else {
    console.log('RESEND DIRECT TEST: SUCCESS');
    console.log('Resend Email ID:', data?.id);
  }
}

testResend();
