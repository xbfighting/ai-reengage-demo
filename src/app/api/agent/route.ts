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
  const { userInfo, templateId, variables, customPrompt, editedContent } = body;

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

    // 构建基础 prompt
    let finalPrompt = `User Profile: ${userProfile}\n\nPlease generate a marketing email based on the following template:\n${renderedTemplate}\n\nRequirements:\n- Keep the tone professional yet warm\n- Personalize based on the user profile\n- Include specific details from the template\n- Make it compelling and action-oriented`;

    // 如果有编辑后的内容，改为改进模式
    if (editedContent) {
      finalPrompt = `User Profile: ${userProfile}\n\nPlease improve the following email content while maintaining its core message and structure:\n\n${editedContent}\n\nRequirements:\n- Keep the tone professional yet warm\n- Enhance personalization based on the user profile\n- Improve clarity and persuasiveness\n- Make it more compelling and action-oriented`;
    }

    // 如果有自定义提示词，添加到末尾
    if (customPrompt) {
      finalPrompt += `\n\nAdditional Instructions:\n${customPrompt}`;
    }

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
    let emailText = mockEmailText(userInfo, selected.template, variables);

    // 如果有编辑后的内容，在回退时也要考虑
    if (editedContent) {
      emailText = editedContent + '\n\n[Note: This is your edited content with fallback processing]';
    }

    if (customPrompt) {
      emailText += `\n\n[Custom instructions applied: ${customPrompt}]`;
    }

    return NextResponse.json({
      userProfile: aiProfile,
      emailText: emailText + '\n\n[Note: This is fallback content due to AI service unavailability]',
      prompt: aiPrompt,
      error: 'AI service temporarily unavailable, showing fallback content'
    });
  }
}
