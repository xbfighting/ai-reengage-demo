import { NextRequest, NextResponse } from 'next/server';
import campaignTemplates from '@/agent/campaignTemplates.json';
import { UserProfile } from '@/lib/types';
import { buildUserProfile } from '@/agent/profileBuilder';
import { renderTemplate } from '@/agent/templateBuilder';
import { generateEmail } from '@/agent/tools/generateEmail';
import { scoreEmail } from '@/agent/tools/scoreEmail';

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

  try {
    // 使用 agent 目录中的完整 AI 功能
    const userProfile = await buildUserProfile(userInfo);

    // 渲染模板变量
    const renderedTemplate = renderTemplate(selected.template, {
      ...variables,
      name: userInfo.name
    });

    // 构建最终的 prompt
    const finalPrompt = `User Profile: ${userProfile}\n\nPlease generate a marketing email based on the following template:\n${renderedTemplate}\n\nRequirements:\n- Keep the tone professional yet warm\n- Personalize based on the user profile\n- Include specific details from the template\n- Make it compelling and action-oriented`;

    // 生成邮件内容
    const emailText = await generateEmail({ prompt: finalPrompt });

    // 评分邮件质量
    const emailScore = await scoreEmail(emailText, userInfo, selected.title);

    return NextResponse.json({
      userProfile: {
        summary: userProfile,
        structured: userInfo
      },
      emailText,
      emailScore,
      prompt: finalPrompt
    });

  } catch (error) {
    console.error('Error generating email:', error);

    // 在生产环境出错时，回退到 mock 数据
    const aiProfile = mockAISummary(userInfo);
    const aiPrompt = mockAIPrompt(userInfo, selected.template, variables);
    const emailText = mockEmailText(userInfo, selected.template, variables);

    return NextResponse.json({
      userProfile: aiProfile,
      emailText: emailText + '\n\n[Note: This is fallback content due to AI service unavailability]',
      prompt: aiPrompt,
      error: 'AI service temporarily unavailable, showing fallback content'
    });
  }
}
