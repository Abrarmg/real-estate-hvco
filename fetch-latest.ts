import pg from 'pg';
const { Pool } = pg;

async function fetchLatest() {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL });
    const result = await pool.query('SELECT * FROM audits ORDER BY "createdAt" DESC LIMIT 1');
    if (result.rows.length === 0) {
      console.log('No audits found in the database.');
    } else {
      const audit = result.rows[0];
      console.log('Latest Audit:');
      console.log(`ID: ${audit.id}`);
      console.log(`Email: ${audit.email}`);
      console.log(`Internal Email Status: ${audit.internal_email_status}`);
      console.log(`Prospect Email Status: ${audit.prospect_email_status}`);
      console.log(`Created At: ${audit.createdAt}`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Failed to fetch:', err);
    process.exit(1);
  }
}

fetchLatest();
