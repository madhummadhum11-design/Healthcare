// MediCore AI - Type Definitions

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  role: UserRole;
  emailVerified: boolean;
  isActive: boolean;
  token?: string;
  createdAt?: string;
}

export type AuthPageView = 'login' | 'register' | 'forgot_password' | 'reset_password' | 'authenticated';

export type HealthStatus = 'normal' | 'elevated' | 'critical' | 'low';

export interface VitalSign {
  id: string;
  timestamp: string; // ISO string
  type: 'bp' | 'heart_rate' | 'glucose' | 'temperature' | 'spo2' | 'weight' | 'height' | 'bmi' | 'respiratory_rate' | 'cholesterol' | 'hemoglobin';
  value: number;
  secondaryValue?: number; // e.g. Diastolic for BP
  unit: string;
  status: HealthStatus;
  notes?: string;
  context?: 'fasting' | 'post_prandial' | 'resting' | 'active' | 'general';
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  heightCm: number;
  weightKg: number;
  email: string;
  phone: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  medicalHistory: string[];
  insuranceProvider?: string;
  policyNumber?: string;
}

export type Specialty =
  | 'General Physician'
  | 'Cardiologist'
  | 'Dermatologist'
  | 'Neurologist'
  | 'Orthopedic'
  | 'Pediatrician'
  | 'Gynecologist'
  | 'Ophthalmologist'
  | 'ENT Specialist'
  | 'Psychiatrist'
  | 'Endocrinologist'
  | 'Gastroenterologist'
  | 'Pulmonologist'
  | 'Oncologist';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  qualifications: string;
  experienceYears: number;
  hospitalAffiliation: string;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  about: string;
  languages: string[];
  availableDays: string[];
  slots: string[];
  verified: boolean;
}

export type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled';
export type ConsultationType = 'video' | 'in-person' | 'chat';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: Specialty;
  doctorAvatar: string;
  hospital: string;
  patientName: string;
  date: string;
  timeSlot: string;
  type: ConsultationType;
  status: AppointmentStatus;
  fee: number;
  symptoms: string;
  notes?: string;
  prescriptionUrl?: string;
  cancelReason?: string;
}

export type AssistantVoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isEmergency?: boolean;
  emergencyType?: string;
  suggestedActions?: string[];
  medicalReferences?: string[];
  language?: string;
  attachment?: {
    name: string;
    type: 'image' | 'pdf';
    url: string;
  };
  cardType?: 'doctors' | 'facilities' | 'report' | 'vitals';
  cardData?: any;
}

export interface ClinicalTriageState {
  symptom?: string;
  step: 'none' | 'onset' | 'severity' | 'associated' | 'guidance' | 'resolved';
  onset?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  associatedSymptoms?: string[];
  lastQuestionAsked?: string;
}

export interface MedicalCondition {
  id: string;
  name: string;
  category: string;
  overview: string;
  causes: string[];
  symptoms: string[];
  riskFactors: string[];
  typesOrStages: string[];
  diagnosticMethods: string[];
  treatmentApproaches: string[];
  prevention: string[];
  lifestyleRecommendations: string[];
  whenToConsultDoctor: string[];
  emergencyWarningSigns: string[];
  references: { title: string; source: string; url?: string }[];
}

export interface Biomarker {
  name: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'low' | 'high' | 'critical';
  explanation: string;
}

export interface MedicalReport {
  id: string;
  title: string;
  date: string;
  type: 'Blood Test' | 'Lipid Panel' | 'Thyroid Profile' | 'Complete Blood Count (CBC)' | 'HbA1c / Glucose' | 'Urinalysis' | 'ECG';
  patientName: string;
  labName: string;
  biomarkers: Biomarker[];
  aiSummary: string;
  recommendations: string[];
  doctorDiscussionPoints: string[];
  fileName?: string;
  fileSize?: string;
}

export interface Medication {
  id: string;
  brandName: string;
  genericName: string;
  drugClass: string;
  indications: string[];
  dosageForms: string[];
  commonSideEffects: string[];
  warnings: string[];
  interactions: string[];
  storage: string;
  prescriptionRequired: boolean;
  standardDosage: string;
}

export interface MedicationReminder {
  id: string;
  medicineName: string;
  dosage: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  time: string; // e.g. "08:00 AM"
  takenToday: boolean;
  takenAt?: string;
  foodRelation: 'Before Food' | 'After Food' | 'With Food' | 'Anytime';
  frequency: string;
  instructions?: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'Hospital' | 'Clinic' | 'Pharmacy' | 'Diagnostic Lab' | 'Emergency Care';
  address: string;
  city: string;
  distanceKm: number;
  phone: string;
  openHours: string;
  isOpen24Hours: boolean;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
  specialties: string[];
  emergencyServices: boolean;
  ambulanceAvailable: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'medication' | 'appointment' | 'vitals' | 'alert' | 'report';
  read: boolean;
  actionUrl?: string;
}

export interface HealthRecordDoc {
  id: string;
  title: string;
  category: 'Lab Report' | 'Prescription' | 'Discharge Summary' | 'Vaccination' | 'Insurance';
  date: string;
  doctorName?: string;
  hospitalName?: string;
  fileSize: string;
  fileType: 'pdf' | 'image';
  tags: string[];
}
