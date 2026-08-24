import handler from './api/generate-report.js';
import express from 'express';

const app = express();
app.use(express.json());
app.post('/api/generate-report', handler);

app.listen(3001, () => {
  console.log('Testing api/generate-report on 3001');
});
