import { getAuditById } from '../src/lib/db.js';
import pg from 'pg';
const { Pool } = pg;

export default async function handler(req: any, res: any) {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL });
    const result = await pool.query('SELECT id, email, internal_email_status, prospect_email_status, created_at FROM audits ORDER BY created_at DESC LIMIT 5');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
