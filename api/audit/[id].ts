import type { Request, Response } from 'express';
import { getAuditById } from '../../src/lib/db.js';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const id = req.query.id as string;
    const audit = await getAuditById(id);
    if (!audit) {
      res.status(404).json({ error: 'Audit not found' });
    } else {
      res.json(audit);
    }
  } catch (err) {
    console.error('Error fetching audit:', err);
    res.status(500).json({ error: 'Failed to fetch audit' });
  }
}
