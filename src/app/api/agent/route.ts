import { NextRequest, NextResponse } from 'next/server';
import campaignTemplates from '@/agent/campaignTemplates.json';
import { UserProfile } from '@/lib/types';
// import { buildUserProfile } from '@/agent/profileBuilder';
// import { renderTemplate } from '@/agent/templateBuilder';
// import { generateEmail } from '@/agent/tools/generateEmail';

function mockAISummary(userInfo: UserProfile) {
  return {
    summary: `AI summary for ${userInfo.name}: ${userInfo.age} years old, ${userInfo.gender}, key traits: ${userInfo.traits?.join(', ') || ''}. Loyalty: ${userInfo.loyaltyScore ?? 'N/A'}.`,
    structured: {
      name: userInfo.name,
      age: userInfo.age,
      gender: userInfo.gender,
      traits: userInfo.traits,
      lifestyle: userInfo.lifestyle,
      loyaltyScore: userInfo.loyaltyScore,
      beautyGoals: userInfo.beautyGoals,
      riskPreference: userInfo.riskPreference,
      locationLevel: userInfo.locationLevel,
      spendingLevel: userInfo.spendingLevel,
      appointmentActivity: userInfo.appointmentActivity,
      surgery_history: userInfo.surgery_history,
    }
  };
}

function mockAIPrompt(userInfo: UserProfile, template: string, variables: Record<string, string | number>) {
  return `Prompt for ${userInfo.name} with template: ${template} and variables: ${JSON.stringify(variables)}`;
}

function mockEmailText(userInfo: UserProfile, template: string, variables: Record<string, string | number>) {
  return `Dear ${userInfo.name},\nThis is a mock marketing email based on your profile and selected template.\nVariables: ${JSON.stringify(variables)}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userInfo, templateId, variables } = body;

  const selected = campaignTemplates.find(t => t.id === templateId);
  if (!selected) {
    return NextResponse.json({ error: 'Invalid templateId' }, { status: 400 });
  }

  // Always return mock data in dev
  const aiProfile = mockAISummary(userInfo);
  const aiPrompt = mockAIPrompt(userInfo, selected.template, variables);
  const emailText = mockEmailText(userInfo, selected.template, variables);
  return NextResponse.json({
    userProfile: aiProfile,
    emailText,
    prompt: aiPrompt
  });

  // prod: use real tools
  // const userProfile = await buildUserProfile(userInfo);
  // const finalPrompt = `User Profile: ${userProfile}. Please generate a marketing email based on the following content:\n${renderTemplate(selected.template, {
  //   ...variables,
  //   name: userInfo.name
  // })}`;
  // const emailText = await generateEmail({ prompt: finalPrompt });
  // return NextResponse.json({
  //   userProfile: { summary: userProfile, structured: userInfo },
  //   emailText,
  //   prompt: finalPrompt
  // });
}
