import type { Request, Response } from 'express';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { saveAudit } from '../src/lib/db';
import { sendAuditEmails } from '../src/lib/email';

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

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[EMAIL DEBUG] generate-report reached');
    const { answers, scores, primaryLeak, secondaryLeak, tertiaryLeak, contact } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY missing, using fallback.");
      throw new Error("Missing API Key");
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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
    // AWAIT the email send so Vercel does not terminate the function before it finishes!
    try {
      await sendAuditEmails({
        ...savedAudit,
        internal_email_status: 'pending',
        prospect_email_status: 'pending',
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Failed to send emails:', err);
    }

    // Wrap in JSON and return the ID so the frontend knows its secure identifier
    res.json({ diagnosis: writerContent, auditId });
  } catch (error) {
    console.error("OpenAI Generation Error:", error);
    res.status(500).json({ error: "Failed to generate AI report" });
  }
}
