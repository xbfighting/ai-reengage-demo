import { UserProfile } from '@/lib/types';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export interface EmailScore {
  overall: number; // 0-100
  personalization: number; // 0-100
  engagement: number; // 0-100
  actionability: number; // 0-100
  brandAlignment: number; // 0-100
  explanation: string;
  suggestions: string[];
}

export async function scoreEmail(
  emailContent: string,
  userProfile: UserProfile,
  templateType: string
): Promise<EmailScore> {

  // 开发环境返回模拟评分
  if (process.env.NODE_ENV === 'development' && !process.env.OPENAI_API_KEY) {
    return {
      overall: Math.floor(Math.random() * 20) + 80, // 80-100
      personalization: Math.floor(Math.random() * 15) + 85,
      engagement: Math.floor(Math.random() * 25) + 75,
      actionability: Math.floor(Math.random() * 20) + 80,
      brandAlignment: Math.floor(Math.random() * 10) + 90,
      explanation: `Mock evaluation for ${userProfile.name}'s ${templateType} email. Strong personalization based on their traits: ${userProfile.traits?.join(', ')}. Good alignment with their ${userProfile.riskPreference} risk preference.`,
      suggestions: [
        'Consider adding more specific procedure details',
        'Enhance the urgency of the call-to-action',
        'Include social proof or testimonials'
      ]
    };
  }

  const llm = new ChatOpenAI({ temperature: 0.3 });

  const prompt = `
Please evaluate this marketing email for a medical aesthetics practice:

EMAIL CONTENT:
${emailContent}

USER PROFILE:
- Name: ${userProfile.name}
- Age: ${userProfile.age}, Gender: ${userProfile.gender}
- Traits: ${userProfile.traits?.join(', ')}
- Loyalty Score: ${userProfile.loyaltyScore}/100
- Risk Preference: ${userProfile.riskPreference}
- Beauty Goals: ${userProfile.beautyGoals?.join(', ')}
- Surgery History: ${userProfile.surgery_history?.map(s => s.type).join(', ')}

TEMPLATE TYPE: ${templateType}

Please score the email on the following criteria (0-100 scale):
1. PERSONALIZATION: How well does it address the specific user's profile, traits, and history?
2. ENGAGEMENT: How likely is it to capture and maintain the recipient's attention?
3. ACTIONABILITY: How clear and compelling is the call-to-action?
4. BRAND ALIGNMENT: How well does it represent a professional medical aesthetics practice?

Also provide:
- An overall score (0-100)
- A brief explanation (2-3 sentences)
- 2-3 specific improvement suggestions

Format your response as JSON:
{
  "overall": number,
  "personalization": number,
  "engagement": number,
  "actionability": number,
  "brandAlignment": number,
  "explanation": "string",
  "suggestions": ["string", "string", "string"]
}
`;

  try {
    const res = await llm.invoke([
      new SystemMessage("You are an expert email marketing analyst specializing in medical aesthetics. Provide detailed, actionable feedback."),
      new HumanMessage(prompt)
    ]);

    const content = typeof res.content === 'string' ? res.content : JSON.stringify(res.content);

    // 尝试解析 JSON 响应
    const scoreData = JSON.parse(content);

    return {
      overall: Math.max(0, Math.min(100, scoreData.overall || 0)),
      personalization: Math.max(0, Math.min(100, scoreData.personalization || 0)),
      engagement: Math.max(0, Math.min(100, scoreData.engagement || 0)),
      actionability: Math.max(0, Math.min(100, scoreData.actionability || 0)),
      brandAlignment: Math.max(0, Math.min(100, scoreData.brandAlignment || 0)),
      explanation: scoreData.explanation || 'No explanation provided',
      suggestions: Array.isArray(scoreData.suggestions) ? scoreData.suggestions : []
    };

  } catch (error) {
    console.error('Error scoring email:', error);

    // 回退评分
    return {
      overall: 75,
      personalization: 70,
      engagement: 75,
      actionability: 80,
      brandAlignment: 85,
      explanation: 'Unable to generate detailed score due to service error.',
      suggestions: ['Review email content for clarity', 'Ensure strong call-to-action', 'Add more personalization']
    };
  }
}
