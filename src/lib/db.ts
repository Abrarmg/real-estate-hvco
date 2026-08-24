import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../../audits.db');

export const db = new Database(dbPath);

// Initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS audits (
    id TEXT PRIMARY KEY,
    firstName TEXT,
    email TEXT,
    phone TEXT,
    websiteOrBrokerage TEXT,
    crmPlatform TEXT,
    overallScore INTEGER,
    scores JSON,
    answers JSON,
    diagnosis TEXT,
    internal_email_status TEXT DEFAULT 'pending',
    internal_resend_id TEXT,
    prospect_email_status TEXT DEFAULT 'pending',
    prospect_resend_id TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

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

export function saveAudit(audit: Partial<SavedAudit>) {
  const stmt = db.prepare(`
    INSERT INTO audits (
      id, firstName, email, phone, websiteOrBrokerage, crmPlatform,
      overallScore, scores, answers, diagnosis
    ) VALUES (
      @id, @firstName, @email, @phone, @websiteOrBrokerage, @crmPlatform,
      @overallScore, @scores, @answers, @diagnosis
    )
  `);
  
  stmt.run({
    id: audit.id,
    firstName: audit.firstName,
    email: audit.email,
    phone: audit.phone || null,
    websiteOrBrokerage: audit.websiteOrBrokerage || null,
    crmPlatform: audit.crmPlatform || null,
    overallScore: audit.overallScore,
    scores: JSON.stringify(audit.scores),
    answers: JSON.stringify(audit.answers),
    diagnosis: audit.diagnosis
  });
}

export function updateEmailStatus(id: string, type: 'internal' | 'prospect', status: string, resendId?: string) {
  const stmt = db.prepare(`
    UPDATE audits 
    SET ${type}_email_status = @status,
        ${type}_resend_id = @resendId
    WHERE id = @id
  `);
  stmt.run({ id, status, resendId: resendId || null });
}

export function getAuditById(id: string): SavedAudit | undefined {
  const stmt = db.prepare('SELECT * FROM audits WHERE id = ?');
  const row = stmt.get(id) as any;
  if (!row) return undefined;
  
  return {
    ...row,
    scores: JSON.parse(row.scores),
    answers: JSON.parse(row.answers)
  };
}
