import { VitalSign } from '../types';

export const INITIAL_VITALS: VitalSign[] = [
  // Today's Readings
  {
    id: 'v-1',
    timestamp: '2026-11-23T08:15:00',
    type: 'bp',
    value: 124,
    secondaryValue: 82,
    unit: 'mmHg',
    status: 'elevated',
    notes: 'Morning resting reading after 5 mins seated',
    context: 'resting'
  },
  {
    id: 'v-2',
    timestamp: '2026-11-23T08:16:00',
    type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    status: 'normal',
    notes: 'Resting pulse',
    context: 'resting'
  },
  {
    id: 'v-3',
    timestamp: '2026-11-23T08:20:00',
    type: 'glucose',
    value: 104,
    unit: 'mg/dL',
    status: 'elevated',
    notes: 'Fasting blood glucose before breakfast',
    context: 'fasting'
  },
  {
    id: 'v-4',
    timestamp: '2026-11-23T08:22:00',
    type: 'spo2',
    value: 98,
    unit: '%',
    status: 'normal',
    notes: 'Pulse oximeter finger reading',
    context: 'resting'
  },
  {
    id: 'v-5',
    timestamp: '2026-11-23T08:25:00',
    type: 'temperature',
    value: 98.4,
    unit: '°F',
    status: 'normal',
    notes: 'Digital oral thermometer',
    context: 'resting'
  },
  {
    id: 'v-6',
    timestamp: '2026-11-23T08:30:00',
    type: 'weight',
    value: 74.5,
    unit: 'kg',
    status: 'normal',
    notes: 'Morning weight before food',
    context: 'fasting'
  },
  {
    id: 'v-7',
    timestamp: '2026-11-23T08:30:00',
    type: 'bmi',
    value: 24.3,
    unit: 'kg/m²',
    status: 'normal',
    notes: 'Calculated with height 175 cm',
    context: 'general'
  },

  // Past 6 days for trends
  // Day -1 (Nov 22)
  {
    id: 'v-8',
    timestamp: '2026-11-22T08:30:00',
    type: 'bp',
    value: 122,
    secondaryValue: 80,
    unit: 'mmHg',
    status: 'elevated',
    context: 'resting'
  },
  {
    id: 'v-9',
    timestamp: '2026-11-22T08:32:00',
    type: 'heart_rate',
    value: 74,
    unit: 'bpm',
    status: 'normal',
    context: 'resting'
  },
  {
    id: 'v-10',
    timestamp: '2026-11-22T08:35:00',
    type: 'glucose',
    value: 108,
    unit: 'mg/dL',
    status: 'elevated',
    context: 'fasting'
  },
  {
    id: 'v-11',
    timestamp: '2026-11-22T08:36:00',
    type: 'spo2',
    value: 98,
    unit: '%',
    status: 'normal',
    context: 'resting'
  },

  // Day -2 (Nov 21)
  {
    id: 'v-12',
    timestamp: '2026-11-21T08:45:00',
    type: 'bp',
    value: 128,
    secondaryValue: 84,
    unit: 'mmHg',
    status: 'elevated',
    context: 'resting'
  },
  {
    id: 'v-13',
    timestamp: '2026-11-21T08:46:00',
    type: 'heart_rate',
    value: 76,
    unit: 'bpm',
    status: 'normal',
    context: 'resting'
  },
  {
    id: 'v-14',
    timestamp: '2026-11-21T08:50:00',
    type: 'glucose',
    value: 112,
    unit: 'mg/dL',
    status: 'elevated',
    context: 'fasting'
  },
  {
    id: 'v-15',
    timestamp: '2026-11-21T08:52:00',
    type: 'spo2',
    value: 97,
    unit: '%',
    status: 'normal',
    context: 'resting'
  },

  // Day -3 (Nov 20)
  {
    id: 'v-16',
    timestamp: '2026-11-20T08:15:00',
    type: 'bp',
    value: 119,
    secondaryValue: 78,
    unit: 'mmHg',
    status: 'normal',
    context: 'resting'
  },
  {
    id: 'v-17',
    timestamp: '2026-11-20T08:16:00',
    type: 'heart_rate',
    value: 70,
    unit: 'bpm',
    status: 'normal',
    context: 'resting'
  },
  {
    id: 'v-18',
    timestamp: '2026-11-20T08:20:00',
    type: 'glucose',
    value: 102,
    unit: 'mg/dL',
    status: 'elevated',
    context: 'fasting'
  },
  {
    id: 'v-19',
    timestamp: '2026-11-20T08:22:00',
    type: 'spo2',
    value: 99,
    unit: '%',
    status: 'normal',
    context: 'resting'
  },

  // Day -4 (Nov 19)
  {
    id: 'v-20',
    timestamp: '2026-11-19T08:30:00',
    type: 'bp',
    value: 126,
    secondaryValue: 82,
    unit: 'mmHg',
    status: 'elevated',
    context: 'resting'
  },
  {
    id: 'v-21',
    timestamp: '2026-11-19T08:31:00',
    type: 'heart_rate',
    value: 75,
    unit: 'bpm',
    status: 'normal',
    context: 'resting'
  },
  {
    id: 'v-22',
    timestamp: '2026-11-19T08:35:00',
    type: 'glucose',
    value: 115,
    unit: 'mg/dL',
    status: 'elevated',
    context: 'fasting'
  },

  // Day -5 (Nov 18)
  {
    id: 'v-23',
    timestamp: '2026-11-18T08:15:00',
    type: 'bp',
    value: 120,
    secondaryValue: 80,
    unit: 'mmHg',
    status: 'elevated',
    context: 'resting'
  },
  {
    id: 'v-24',
    timestamp: '2026-11-18T08:16:00',
    type: 'heart_rate',
    value: 71,
    unit: 'bpm',
    status: 'normal',
    context: 'resting'
  },
  {
    id: 'v-25',
    timestamp: '2026-11-18T08:20:00',
    type: 'glucose',
    value: 99,
    unit: 'mg/dL',
    status: 'normal',
    context: 'fasting'
  },

  // Day -6 (Nov 17)
  {
    id: 'v-26',
    timestamp: '2026-11-17T08:25:00',
    type: 'bp',
    value: 125,
    secondaryValue: 82,
    unit: 'mmHg',
    status: 'elevated',
    context: 'resting'
  },
  {
    id: 'v-27',
    timestamp: '2026-11-17T08:26:00',
    type: 'heart_rate',
    value: 73,
    unit: 'bpm',
    status: 'normal',
    context: 'resting'
  },
  {
    id: 'v-28',
    timestamp: '2026-11-17T08:30:00',
    type: 'glucose',
    value: 106,
    unit: 'mg/dL',
    status: 'elevated',
    context: 'fasting'
  }
];

export const CLINICAL_REFERENCE_RANGES = {
  bp: {
    name: 'Blood Pressure',
    unit: 'mmHg',
    normal: 'Systolic < 120 and Diastolic < 80',
    elevated: 'Systolic 120-129 and Diastolic < 80',
    abnormal: 'Systolic >= 130 or Diastolic >= 80',
    critical: 'Systolic > 180 or Diastolic > 120 (Hypertensive Crisis)'
  },
  heart_rate: {
    name: 'Heart Rate',
    unit: 'bpm',
    normal: '60 - 100 bpm (resting)',
    low: '< 60 bpm (Bradycardia)',
    elevated: '> 100 bpm (Tachycardia)',
    critical: '< 45 bpm or > 140 bpm resting'
  },
  glucose: {
    name: 'Blood Glucose (Fasting)',
    unit: 'mg/dL',
    normal: '70 - 99 mg/dL',
    elevated: '100 - 125 mg/dL (Prediabetes)',
    abnormal: '>= 126 mg/dL (Diabetes threshold)',
    critical: '< 55 mg/dL (Severe Hypoglycemia) or > 300 mg/dL'
  },
  temperature: {
    name: 'Body Temperature',
    unit: '°F',
    normal: '97.7°F - 99.5°F (36.5°C - 37.5°C)',
    elevated: '99.6°F - 100.9°F (Low-grade fever)',
    abnormal: '101.0°F - 103.9°F (Fever)',
    critical: '>= 104.0°F (Hyperpyrexia)'
  },
  spo2: {
    name: 'Oxygen Saturation',
    unit: '%',
    normal: '95% - 100%',
    elevated: '93% - 94% (Mild Hypoxemia)',
    abnormal: '90% - 92% (Moderate Hypoxemia)',
    critical: '< 90% (Severe Hypoxemia - Seek Urgent Care)'
  },
  bmi: {
    name: 'Body Mass Index',
    unit: 'kg/m²',
    low: '< 18.5 (Underweight)',
    normal: '18.5 - 24.9 (Normal weight)',
    elevated: '25.0 - 29.9 (Overweight)',
    abnormal: '>= 30.0 (Obese)'
  }
};
