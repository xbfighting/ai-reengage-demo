import { UserProfile } from '@/lib/types';

export function selectStrategyAndGeneratePrompt(userProfile: UserProfile): { scene: string; prompt: string } {
  let scene = '';

  // Determine the marketing scenario based on user profile
  if ((userProfile.loyaltyScore ?? 0) > 80) {
    scene = 'Holiday Greeting';
  } else if ((userProfile.appointmentActivity ?? 0) < 50) {
    scene = 'Repurchase Reminder';
  } else if ((userProfile.beautyGoals?.length ?? 0) > 0) {
    scene = 'New Product Recommendation';
  } else {
    scene = 'General Engagement';
  }

  // Generate the marketing prompt based on the selected scene
  const prompt = `User Profile: ${userProfile.name}, ${userProfile.age} years old, ${userProfile.gender}.
Scene: ${scene}.
Please create a marketing email tailored to this user, considering their traits, lifestyle, and preferences.`;

  return { scene, prompt };
}
