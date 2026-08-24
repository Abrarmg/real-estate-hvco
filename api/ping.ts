export default function handler(req: any, res: any) {
  res.json({ 
    status: "ok", 
    timestamp: Date.now(), 
    hasOpenAi: !!process.env.OPENAI_API_KEY,
    hasDbUrl: !!process.env.DATABASE_URL,
    hasPgUrl: !!process.env.POSTGRES_URL,
    hasResend: !!process.env.RESEND_API_KEY,
    emailsEnabled: process.env.EMAILS_ENABLED === 'true'
  });
}
