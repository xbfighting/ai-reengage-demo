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
  referralSource: string;
  totalSpend: string;
  customerNote: string; // New: customer note
  communicationRecords: string; // New: communication records
  lastProcedure?: string; // New: last procedure type
  monthsSince?: number; // New: months since last procedure
};

export type EmailResult = {
  emailText: string;
};
