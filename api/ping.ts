export default function handler(req: any, res: any) {
  console.log("ENV KEYS:", Object.keys(process.env).join(', '));
  res.json({ status: "ok", timestamp: Date.now(), hasOpenAi: !!process.env.OPENAI_API_KEY });
}
