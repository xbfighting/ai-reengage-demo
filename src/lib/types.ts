export type SurgeryRecord = {
  type: string;
  date: string;
};

export type UserProfile = {
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  traits: string[];
  surgery_history: SurgeryRecord[];
  lifestyle: string[]; // New: lifestyle & preferences
  spendingLevel?: number; // 0-100
  beautyGoals?: string[];
  riskPreference?: 'Adventurous' | 'Conservative';
  appointmentActivity?: number; // 0-100
  locationLevel?: 'Tier 1' | 'New Tier 1' | 'Tier 2' | 'Other';
  loyaltyScore?: number; // 0-100
};

export type EmailResult = {
  emailText: string;
};
