import { Pool } from 'pg';

export interface SavedAudit {
  id: string;
  firstName: string;
  email: string;
  phone?: string;
  websiteOrBrokerage?: string;
  crmPlatform?: string;
  overallScore: number;
  scores: any;
  answers: any;
  diagnosis: string;
  internal_email_status: string;
  internal_resend_id?: string;
  prospect_email_status: string;
  prospect_resend_id?: string;
  createdAt: string;
}

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString,
  ssl: connectionString && !connectionString.includes('localhost') ? { rejectUnauthorized: false } : false,
});

let isInitialized = false;

async function initDB() {
  if (isInitialized) return;
  if (!connectionString) {
    console.warn("No DATABASE_URL or POSTGRES_URL provided. Database will fail.");
    return;
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS audits (
      id UUID PRIMARY KEY,
      first_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      website_or_brokerage TEXT,
      crm_platform TEXT,
      overall_score INTEGER,
      scores JSONB,
      answers JSONB,
      diagnosis TEXT,
      internal_email_status TEXT,
      internal_resend_id TEXT,
      prospect_email_status TEXT,
      prospect_resend_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  isInitialized = true;
}

export async function saveAudit(audit: Partial<SavedAudit>) {
  await initDB();
  const query = `
    INSERT INTO audits (
      id, first_name, email, phone, website_or_brokerage, crm_platform,
      overall_score, scores, answers, diagnosis,
      internal_email_status, internal_resend_id,
      prospect_email_status, prospect_resend_id, created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
    )
    ON CONFLICT (id) DO UPDATE SET
      first_name = EXCLUDED.first_name,
      email = EXCLUDED.email,
      overall_score = EXCLUDED.overall_score,
      scores = EXCLUDED.scores,
      answers = EXCLUDED.answers,
      diagnosis = EXCLUDED.diagnosis
  `;
  const values = [
    audit.id,
    audit.firstName,
    audit.email,
    audit.phone || null,
    audit.websiteOrBrokerage || null,
    audit.crmPlatform || null,
    audit.overallScore,
    JSON.stringify(audit.scores),
    JSON.stringify(audit.answers),
    audit.diagnosis,
    audit.internal_email_status || 'pending',
    audit.internal_resend_id || null,
    audit.prospect_email_status || 'pending',
    audit.prospect_resend_id || null,
    audit.createdAt ? new Date(audit.createdAt) : new Date()
  ];
  await pool.query(query, values);
}

export async function updateEmailStatus(id: string, type: 'internal' | 'prospect', status: string, resendId?: string) {
  await initDB();
  const statusCol = type === 'internal' ? 'internal_email_status' : 'prospect_email_status';
  const resendCol = type === 'internal' ? 'internal_resend_id' : 'prospect_resend_id';
  
  if (resendId) {
    await pool.query(`UPDATE audits SET ${statusCol} = $1, ${resendCol} = $2 WHERE id = $3`, [status, resendId, id]);
  } else {
    await pool.query(`UPDATE audits SET ${statusCol} = $1 WHERE id = $2`, [status, id]);
  }
}

export async function getAuditById(id: string): Promise<SavedAudit | undefined> {
  await initDB();
  const { rows } = await pool.query('SELECT * FROM audits WHERE id = $1', [id]);
  if (rows.length === 0) return undefined;
  
  const row = rows[0];
  return {
    id: row.id,
    firstName: row.first_name,
    email: row.email,
    phone: row.phone,
    websiteOrBrokerage: row.website_or_brokerage,
    crmPlatform: row.crm_platform,
    overallScore: row.overall_score,
    scores: row.scores,
    answers: row.answers,
    diagnosis: row.diagnosis,
    internal_email_status: row.internal_email_status,
    internal_resend_id: row.internal_resend_id,
    prospect_email_status: row.prospect_email_status,
    prospect_resend_id: row.prospect_resend_id,
    createdAt: row.created_at.toISOString()
  };
}
