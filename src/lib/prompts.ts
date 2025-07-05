import { UserProfile } from "./types";

export function generatePrompt(profile: UserProfile, scene: string): string {
  const {
    name,
    age,
    gender,
    traits,
    surgery_history,
    lifestyle,
    spendingLevel,
    beautyGoals,
    riskPreference,
    appointmentActivity,
    locationLevel,
    loyaltyScore,
  } = profile;
  const genderText = gender === 'Female' ? 'female' : 'male';
  const traitText = traits.join(', ');
  const lifestyleText = lifestyle.join(', ');
  const surgeryText = surgery_history
    .map(s => `${s.date} received ${s.type}`)
    .join(', ');
  const beautyGoalsText = beautyGoals?.join(', ') ?? 'N/A';

  let sceneInstruction = '';

  switch (scene) {
    case 'Repurchase Reminder':
      sceneInstruction = 'Remind the user about post-surgery care and follow-up treatments, and encourage them to book another appointment.';
      break;
    case 'New Product Recommendation':
      sceneInstruction = 'Introduce the latest medical aesthetic services to spark their interest and curiosity.';
      break;
    case 'Holiday Greeting':
      sceneInstruction = 'Send greetings with a festive atmosphere and include special offers to enhance brand favorability.';
      break;
  }

  return `
You are an AI copywriting expert specializing in medical aesthetics marketing. Based on the following user information, generate a ${scene} marketing email：

User Profile：
- Name: ${name}
- Age: ${age}, ${genderText}
- Traits: ${traitText}
- Lifestyle & Preferences: ${lifestyleText}
- Surgery History: ${surgeryText}
- Spending Level: ${spendingLevel ?? 'N/A'}
- Beauty Goals: ${beautyGoalsText}
- Risk Preference: ${riskPreference ?? 'N/A'}
- Appointment Activity: ${appointmentActivity ?? 'N/A'}
- Location Level: ${locationLevel ?? 'N/A'}
- Loyalty Score: ${loyaltyScore ?? 'N/A'}

Scene: ${sceneInstruction}

Requirements：
1. The email tone should be caring and emotional, not too stiff.
2. Include personalized recommendations, special offers, and motivate quick action.
3. Tailor the content to their personality traits, lifestyle, and all profile dimensions (e.g., spending level, beauty goals, risk preference, loyalty score, etc.).
4. Limit the email to around 200 words.
5. Output only the email body.`;
}
