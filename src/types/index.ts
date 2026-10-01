export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Laki-laki' | 'Perempuan';
  psoriasisDuration: string;
  affectedAreas: string[];
  currentMedications: string[];
  otherDiseases: string;
  registeredAt: string;
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: 'Kortikosteroid Topikal' | 'Analog Vitamin D3' | 'Kombinasi' | 'Keratolitik' | 'Inhibitor Kalsineurin' | 'Emolien & Pelembap' | 'Lainnya';
  form: 'Salep (Ointment)' | 'Krim' | 'Gel' | 'Solusio / Losio';
  potency?: 'Ringan' | 'Sedang' | 'Kuat' | 'Sangat Kuat (Superpoten)' | 'Bukan Steroid';
  indication: string;
  ftuRecommendation: string;
  frequency: string;
  maxDuration: string;
  howToApply: string[];
  precautions: string[];
  sideEffects: string[];
  taperingGuidance: string;
  isPrescriptionRequired: boolean;
}

export interface AdherenceLog {
  id: string;
  date: string;
  timeSlot: 'Pagi' | 'Siang' | 'Malam';
  medicationName: string;
  status: 'used' | 'missed';
  sideEffectReport: 'none' | 'burning' | 'redness' | 'itching' | 'atrophy';
  note?: string;
  recordedAt: string;
}

export interface AdherenceStats {
  totalLogs: number;
  completedDoses: number;
  missedDoses: number;
  adherenceRate: number;
  streakDays: number;
}

export interface SkinTrackerEntry {
  id: string;
  date: string;
  weekLabel: string;
  bodyArea: string;
  photoUrl?: string;
  erythema: number; // 0 - 4
  scaling: number;  // 0 - 4
  induration: number; // 0 - 4
  pruritus: number; // 0 - 4
  estimatedArea: string;
  notes: string;
}

export interface ConsultationSummary {
  patient: UserProfile;
  treatmentSummary: {
    activeMedications: string[];
    adherenceRate: number;
    sideEffectEventsCount: number;
    sideEffectDetails: string[];
  };
  skinProgression: {
    initialScore: number;
    latestScore: number;
    pruritusChange: string;
    notes: string;
  };
  recommendedDoctorQuestions: string[];
  generatedAt: string;
}
