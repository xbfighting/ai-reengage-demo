import { UserProfile } from '@/lib/types';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export async function buildUserProfile(userInfo: UserProfile): Promise<string> {
  const llm = new ChatOpenAI({ temperature: 0.7 });

  const prompt = `
Please generate a concise user profile description (within 100 words) based on the following customer information:

Name: ${userInfo.name}
Age: ${userInfo.age}, Gender: ${userInfo.gender}
Surgery History: ${userInfo.surgery_history?.map((s: { type: string; date: string }) => `${s.type}(${s.date})`).join(', ')}
Personality Traits: ${userInfo.traits.join(', ')}
Historical Spending Amount: ${userInfo.totalSpend || 'Unknown'}
Referral Source: ${userInfo.referralSource || 'Unknown'}
Communication Records: ${userInfo.communicationRecords || 'Unknown'}
Lifestyle: ${userInfo.lifestyle.join(', ') || 'Unknown'}
Beauty Goals: ${userInfo.beautyGoals?.join(', ') || 'Unknown'}
Risk Preference: ${userInfo.riskPreference || 'Unknown'}
Geographical Location: ${userInfo.locationLevel || 'Unknown'}
Loyalty Score: ${userInfo.loyaltyScore || 'Unknown'}
Customer Note: ${userInfo.customerNote || 'None'}
Last Procedure: ${userInfo.lastProcedure || 'None'}
Months Since Last Procedure: ${userInfo.monthsSince || 'Unknown'}

Output Format: User Profile: xxxxx (Do not add explanations or extra content)
`;

  if (process.env.APP_ENV === 'dev') {
    return `User Profile: ${userInfo.name}, ${userInfo.age} years old, ${userInfo.gender}. Key traits: ${userInfo.traits?.join(', ') || 'N/A'}. Loyalty: ${userInfo.loyaltyScore ?? 'N/A'}. (Mocked by AI)`;
  }

  const res = await llm.invoke([
    new SystemMessage("You are a senior medical aesthetics copywriting marketing expert."),
    new HumanMessage(prompt)
  ]);

  const content = typeof res.content === 'string' ? res.content : JSON.stringify(res.content);
  return content;
}
