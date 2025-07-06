import { NextRequest, NextResponse } from 'next/server';
import { buildUserProfile } from '@/agent/profileBuilder';
import { renderTemplate } from '@/agent/templateBuilder';
import { generateEmail } from '@/agent/tools/generateEmail';
import campaignTemplates from '@/agent/campaignTemplates.json';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userInfo, templateId, variables } = body;

  const userProfile = await buildUserProfile(userInfo);

  const selected = campaignTemplates.find(t => t.id === templateId);
  if (!selected) {
    return NextResponse.json({ error: 'Invalid templateId' }, { status: 400 });
  }

  const finalPrompt = `User Profile: ${userProfile}. Please generate a marketing email based on the following content:\n${renderTemplate(selected.template, {
    ...variables,
    name: userInfo.name
  })}`;

  const emailText = await generateEmail({ prompt: finalPrompt });

  return NextResponse.json({
    userProfile,
    emailText,
    prompt: finalPrompt
  });
}
