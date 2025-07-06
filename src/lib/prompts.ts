import { UserProfile } from "./types";

export function generatePrompt(profile: UserProfile, scene: string) {
  const {
    name,
    age,
    gender,
    spendingLevel,
    riskPreference,
    appointmentActivity,
    locationLevel,
    loyaltyScore,
  } = profile;
  const genderText = gender === 'Female' ? 'female' : 'male';

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

  return {
    role: "system",
    content: "You are an AI copywriting expert specializing in medical aesthetics marketing. Generate a marketing email based on the provided user profile and scene.",
    data: {
      userProfile: {
        name,
        age,
        gender: genderText,
        spendingLevel: spendingLevel ?? 'N/A',
        riskPreference: riskPreference ?? 'N/A',
        appointmentActivity: appointmentActivity ?? 'N/A',
        locationLevel: locationLevel ?? 'N/A',
        loyaltyScore: loyaltyScore ?? 'N/A',
      },
      scene: {
        type: scene,
        instruction: sceneInstruction,
      },
      requirements: [
        "The email tone should be caring and emotional, not too stiff.",
        "Include personalized recommendations, special offers, and motivate quick action.",
        "Tailor the content to their personality traits, lifestyle, and all profile dimensions (e.g., spending level, beauty goals, risk preference, loyalty score, etc.).",
        "Limit the email to around 200 words.",
        "Output only the email body."
      ]
    }
  };
}
