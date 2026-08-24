import express from 'express';
import { createServer as createViteServer } from 'vite';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { saveAudit, getAuditById } from './src/lib/db.js';
import { sendAuditEmails } from './src/lib/email.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

// Step 1: Diagnostic Engine Prompt (keep this to feed the writer good logic)
const DIAGNOSTIC_SYSTEM_PROMPT = `
You are the Diagnostic Engine for a real estate lead leakage system.
Your job is to analyze the agent's raw answers and scores to find contradictions, root causes, and priorities.
Do NOT write marketing copy. Do NOT write the final report.
Reason about the data and output a structured diagnostic profile.

REQUIRED JSON SCHEMA:
{
  "primaryBottleneck": "Name of the primary bottleneck",
  "primaryReason": "Why this is the primary bottleneck based on their answers",
  "secondaryBottleneck": "Name of secondary bottleneck",
  "thirdBottleneck": "Name of third bottleneck",
  "strongestArea": "What they are doing best",
  "rootCause": "The underlying pattern connecting the bottlenecks",
  "contradictions": ["Contradiction 1", "Contradiction 2"],
  "importantNumbers": ["500-1000 database size", "1-2 follow up attempts"],
  "opportunityCalculation": {
    "metric": "Conversations/Appointments/Revenue",
    "explanation": "What they could gain"
  },
  "quickWin": "One highly specific action they can take in 24 hours",
  "priorityNow": "What to fix first",
  "priorityNext": "What to fix second",
  "priorityLater": "What to fix third",
  "successMetric": "The ONE metric they should track this week",
  "diagnosticConfidence": "high"
}
`;

// Step 2: Report Writer Prompt
const WRITER_SYSTEM_PROMPT = `
You are a highly experienced real estate lead-conversion consultant reviewing one agent's lead system.
Your job is NOT to generate an "audit report."
Your job is to look at their answers and explain, in very simple language, what you would tell them if they were sitting across the table from you.

MOST IMPORTANT RULE:
DO NOT divide the diagnosis into lots of sections. Do not use headings or lists.
Write ONE natural diagnosis that flows from beginning to end. Think of it like a personal note from an expert.

HOW IT SHOULD FEEL:
Imagine the agent showed you their CRM and answers. You looked for 20 minutes. Then you leaned over and said: "Okay. I can see what's happening here."
Do not sound like a report, chatbot, or agency. Sound like an expert who understands lead conversion and explains it simply.

LANGUAGE LEVEL:
Use extremely easy English. Write so a 12-year-old could understand it.
Short sentences. One idea per sentence. Natural contractions (you're, don't).
Use occasional very short sentences for emphasis.
Talk to ONE person (use "you", "your numbers").

START NATURALLY:
Do not start with "Based on your responses...".
Start like a human noticing something: "Okay, the first thing that jumps out at me is..."

USE THEIR NUMBERS NATURALLY:
Mention important scores and answers inside the conversation. Connect answers together.
Find the real problem behind the numbers. Use contrast ("You don't have a reactivation problem. You have a new-lead follow-up problem.").
Acknowledge what is working.

EXPLAIN CAUSE AND EFFECT:
You are doing X. Because of that, Y happens. That creates Z problem. So I would fix A first.
Give advice inside the conversation. Don't create an action plan section.
Don't over-solve it. Give them ONE main priority.

NATURAL PARAGRAPH FLOW:
6-10 short paragraphs. No headings. No numbers. No bullets.
Flow: What stands out -> What works -> Where it breaks -> Connect answers -> Real life meaning -> What NOT to focus on -> What to fix first -> Simple action -> Conclusion.

BANNED AI PHRASES:
"Based on your responses", "Our analysis", "Potential gold", "Optimize", "Maximize", "Leverage", "Actionable insights", "Here's the pattern".
Avoid fake drama ("Boom", "Let that sink in"). Calm confidence is stronger.

FINAL ENDING:
Finish with one clear prescription.
Example: "So if this were my business, I wouldn't worry about getting more leads yet. I'd fix the follow-up first."

OUTPUT FORMAT:
Return ONLY the diagnosis copy. No title. No heading. No markdown headings. No numbered list. No bullet list. No labels. No JSON. No explanation of your reasoning. No mention of AI. Just the natural expert-written diagnosis.
`;

async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.get('/api/audit/:id', (req, res) => {
    try {
      const audit = getAuditById(req.params.id);
      if (!audit) {
        res.status(404).json({ error: 'Audit not found' });
      } else {
        res.json(audit);
      }
    } catch (err) {
      console.error('Error fetching audit:', err);
      res.status(500).json({ error: 'Failed to fetch audit' });
    }
  });

  app.post('/api/generate-report', async (req, res) => {
    try {
      console.log('[EMAIL DEBUG] generate-report reached');
      const { answers, scores, primaryLeak, secondaryLeak, tertiaryLeak, contact } = req.body;

      if (!process.env.OPENAI_API_KEY) {
        console.warn("OPENAI_API_KEY missing, using fallback.");
        throw new Error("Missing API Key");
      }

      const inputData = {
        answers,
        scores,
        primaryLeak: primaryLeak?.name,
        secondaryLeak: secondaryLeak?.name,
        tertiaryLeak: tertiaryLeak?.name
      };

      // STEP 1: Diagnostic Engine
      const diagResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: DIAGNOSTIC_SYSTEM_PROMPT },
          { role: "user", content: JSON.stringify(inputData) }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      });

      const diagContent = diagResponse.choices[0].message.content;
      if (!diagContent) throw new Error("Empty diagnostic response");

      // STEP 2: Report Writer
      const writerResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: WRITER_SYSTEM_PROMPT },
          { role: "user", content: `Raw Data: ${JSON.stringify(inputData)}\nDiagnostic Profile: ${diagContent}` }
        ],
        temperature: 0.7,
      });

      let writerContent = writerResponse.choices[0].message.content;
      if (!writerContent) throw new Error("Empty writer response");
      
      console.log('[EMAIL DEBUG] diagnosis generated');
      // Clean up markdown just in case the model adds bolding or quotes
      writerContent = writerContent.replace(/^"|"$/g, '').trim();

      // Save to database
      const auditId = uuidv4();
      const savedAudit = {
        id: auditId,
        firstName: contact.firstName,
        email: contact.email,
        phone: contact.phone,
        websiteOrBrokerage: contact.websiteOrBrokerage,
        crmPlatform: contact.crmPlatform,
        overallScore: scores.overallScore,
        scores: scores,
        answers: answers,
        diagnosis: writerContent,
      };

      saveAudit(savedAudit);
      console.log(`[EMAIL DEBUG] audit saved: ${auditId}`);

      console.log('[EMAIL DEBUG] attempting email send');
      // Send emails asynchronously (don't block the response)
      sendAuditEmails({
        ...savedAudit,
        internal_email_status: 'pending',
        prospect_email_status: 'pending',
        createdAt: new Date().toISOString()
      }).catch(err => console.error('Failed to send emails asynchronously:', err));

      // Wrap in JSON and return the ID so the frontend knows its secure identifier
      res.json({ diagnosis: writerContent, auditId });
    } catch (error) {
      console.error("OpenAI Generation Error:", error);
      res.status(500).json({ error: "Failed to generate AI report" });
    }
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
