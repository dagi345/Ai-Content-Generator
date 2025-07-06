// app/api/gemini/route.ts

import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY!, // No "NEXT_PUBLIC_" here
});

const config = {
  thinkingConfig: { thinkingBudget: -1 },
  responseMimeType: 'text/plain',
};

const model = 'gemini-2.5-pro';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  console.log(prompt)

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const stream = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of stream) {
    result += chunk.text;
  }

  return NextResponse.json({ result });
}
