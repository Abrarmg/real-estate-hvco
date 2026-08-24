import path from 'path';
import fs from 'fs';

let dbPath = '/tmp/audits.json';
if (process.env.VERCEL !== '1') {
  dbPath = path.resolve(process.cwd(), 'audits.json');
}

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

function readDB(): Record<string, SavedAudit> {
  if (!fs.existsSync(dbPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    return {};
  }
}

function writeDB(data: Record<string, SavedAudit>) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export function saveAudit(audit: Partial<SavedAudit>) {
  const data = readDB();
  data[audit.id!] = audit as SavedAudit;
  writeDB(data);
}

export function updateEmailStatus(id: string, type: 'internal' | 'prospect', status: string, resendId?: string) {
  const data = readDB();
  if (data[id]) {
    (data[id] as any)[`${type}_email_status`] = status;
    if (resendId) (data[id] as any)[`${type}_resend_id`] = resendId;
    writeDB(data);
  }
}

export function getAuditById(id: string): SavedAudit | undefined {
  const data = readDB();
  return data[id];
}
