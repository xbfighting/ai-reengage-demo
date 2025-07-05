import { NextRequest, NextResponse } from 'next/server';
import { UserProfile } from '@/lib/types';
import { generatePrompt } from '@/lib/prompts';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userProfile: UserProfile = body.profile;
  const scene = body.scene;

  const prompt = generatePrompt(userProfile, scene);

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4', // or gpt-3.5-turbo
      messages: [
        {
          role: 'system',
          content: 'You are an AI copywriting expert specializing in medical aesthetics marketing.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.9,
      max_tokens: 600
    })
  });

  const json = await res.json();
  const reply = json.choices?.[0]?.message?.content;

  return NextResponse.json({ email: reply || '[Generation failed, please try again later]' });
}
