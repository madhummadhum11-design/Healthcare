import { MedicalReport } from '../types';

export const SAMPLE_REPORTS: MedicalReport[] = [
  {
    id: 'rep-1',
    title: 'Comprehensive Lipid & Metabolic Profile',
    date: '2026-10-18',
    type: 'Lipid Panel',
    patientName: 'John Doe',
    labName: 'Metropolis Central Clinical Reference Laboratories',
    fileName: 'Lipid_Metabolic_Profile_Oct2026.pdf',
    fileSize: '1.4 MB',
    biomarkers: [
      {
        name: 'Total Cholesterol',
        value: 238,
        unit: 'mg/dL',
        referenceRange: '< 200 mg/dL',
        status: 'high',
        explanation: 'Elevated total cholesterol represents the sum of all cholesterol subfractions in the blood. Levels above 200 mg/dL indicate borderline high risk for atherosclerotic plaque formation.'
      },
      {
        name: 'LDL Cholesterol (Calculated)',
        value: 154,
        unit: 'mg/dL',
        referenceRange: '< 100 mg/dL',
        status: 'high',
        explanation: 'Low-Density Lipoprotein ("bad" cholesterol). Elevated LDL directly deposits cholesterol onto arterial walls, narrowing coronary arteries.'
      },
      {
        name: 'HDL Cholesterol',
        value: 42,
        unit: 'mg/dL',
        referenceRange: '> 50 mg/dL (optimal)',
        status: 'low',
        explanation: 'High-Density Lipoprotein ("good" cholesterol). HDL transports excess cholesterol back to the liver for elimination. Suboptimal levels reduce cardiovascular protection.'
      },
      {
        name: 'Triglycerides',
        value: 210,
        unit: 'mg/dL',
        referenceRange: '< 150 mg/dL',
        status: 'high',
        explanation: 'Blood fats stored from excess caloric and sugar intake. Mild to moderate hypertriglyceridemia correlates with insulin resistance and fatty liver predisposition.'
      },
      {
        name: 'Fasting Blood Glucose',
        value: 112,
        unit: 'mg/dL',
        referenceRange: '70 - 99 mg/dL',
        status: 'high',
        explanation: 'Fasting glucose of 112 mg/dL falls into the Impaired Fasting Glucose (Prediabetes) category (100–125 mg/dL), warranting dietary modifications.'
      },
      {
        name: 'Serum Creatinine',
        value: 0.95,
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.20 mg/dL',
        status: 'normal',
        explanation: 'Byproduct of muscle metabolism cleared by the kidneys. Normal levels indicate healthy baseline glomerular filtration.'
      },
      {
        name: 'Estimated GFR (eGFR)',
        value: 98,
        unit: 'mL/min/1.73m²',
        referenceRange: '> 90 mL/min/1.73m²',
        status: 'normal',
        explanation: 'Excellent kidney filtration performance within normal physiological range.'
      }
    ],
    aiSummary: 'Overall metabolic profile demonstrates mild dyslipidemia with elevated total cholesterol (238 mg/dL) and elevated LDL (154 mg/dL), combined with borderline low protective HDL (42 mg/dL) and elevated triglycerides (210 mg/dL). Fasting blood sugar indicates prediabetes (112 mg/dL). Renal filtration biomarkers (Creatinine and eGFR) remain completely healthy and preserved.',
    recommendations: [
      'Adopt a Mediterranean cardioprotective dietary pattern: replace saturated animal fats with monounsaturated extra-virgin olive oil and avocados.',
      'Reduce intake of refined carbohydrates, white sugars, and sweetened beverages to lower serum triglycerides.',
      'Engage in 150 minutes of moderate aerobic exercise (brisk walking, cycling) per week to elevate HDL cholesterol.',
      'Schedule a follow-up lipid panel and HbA1c test in 12 weeks to monitor therapeutic response.'
    ],
    doctorDiscussionPoints: [
      'Ask your physician whether initiating low-to-moderate intensity statin therapy (e.g. Atorvastatin 10–20mg) is recommended based on your 10-year ASCVD risk score.',
      'Discuss whether a fasting HbA1c test is indicated to further evaluate prediabetes status.',
      'Inquire about referral to a clinical dietitian for tailored cardiovascular nutrition planning.'
    ]
  },
  {
    id: 'rep-2',
    title: 'Complete Blood Count (CBC) with Differential',
    date: '2026-09-04',
    type: 'Complete Blood Count (CBC)',
    patientName: 'John Doe',
    labName: 'Anand Diagnostic Laboratory',
    fileName: 'CBC_Report_Sept2026.pdf',
    fileSize: '950 KB',
    biomarkers: [
      {
        name: 'Hemoglobin (Hb)',
        value: 13.8,
        unit: 'g/dL',
        referenceRange: '13.5 - 17.5 g/dL',
        status: 'normal',
        explanation: 'Oxygen-carrying protein in erythrocytes. Well within healthy adult male parameters.'
      },
      {
        name: 'Red Blood Cell (RBC) Count',
        value: 4.65,
        unit: 'million/µL',
        referenceRange: '4.50 - 5.90 million/µL',
        status: 'normal',
        explanation: 'Normal total circulating red blood cell population.'
      },
      {
        name: 'White Blood Cell (WBC) Count',
        value: 7200,
        unit: '/µL',
        referenceRange: '4000 - 11000 /µL',
        status: 'normal',
        explanation: 'Normal total leukocyte count indicating no acute systemic infection or leukemoid reaction.'
      },
      {
        name: 'Platelet Count',
        value: 245000,
        unit: '/µL',
        referenceRange: '150000 - 450000 /µL',
        status: 'normal',
        explanation: 'Healthy thrombocyte count ensuring effective normal physiological hemostasis and clotting.'
      },
      {
        name: 'Mean Corpuscular Volume (MCV)',
        value: 88.4,
        unit: 'fL',
        referenceRange: '80.0 - 96.0 fL',
        status: 'normal',
        explanation: 'Average red cell size is normocytic, with no evidence of microcytosis (iron deficiency) or macrocytosis (B12/folate deficiency).'
      },
      {
        name: 'Erythrocyte Sedimentation Rate (ESR)',
        value: 12,
        unit: 'mm/1st hr',
        referenceRange: '< 15 mm/1st hr',
        status: 'normal',
        explanation: 'Non-specific marker for systemic inflammation is within normal limits.'
      }
    ],
    aiSummary: 'All hematological parameters within the Complete Blood Count are within standard normal reference ranges. No signs of anemia, leukopenia, leukocytosis, thrombocytopenia, or active systemic inflammatory response.',
    recommendations: [
      'Maintain adequate dietary variety with iron-rich leafy greens, legumes, and lean protein.',
      'Repeat routine surveillance blood counts annually during preventative wellness examinations.'
    ],
    doctorDiscussionPoints: [
      'Confirm that your current CBC reflects excellent bone marrow hematopoietic health with no need for iron or vitamin B12 supplementation at this time.'
    ]
  },
  {
    id: 'rep-3',
    title: 'Thyroid Function Test (TFT) Profile',
    date: '2026-07-12',
    type: 'Thyroid Profile',
    patientName: 'John Doe',
    labName: 'Thyrocare National Reference Lab',
    fileName: 'Thyroid_Profile_July2026.pdf',
    fileSize: '820 KB',
    biomarkers: [
      {
        name: 'TSH (Thyroid Stimulating Hormone)',
        value: 6.42,
        unit: 'µIU/mL',
        referenceRange: '0.45 - 4.50 µIU/mL',
        status: 'high',
        explanation: 'Pituitary hormone regulating thyroid output. Elevated TSH indicates that the pituitary gland is working harder to stimulate the thyroid, suggesting subclinical primary hypothyroidism.'
      },
      {
        name: 'Free T4 (Thyroxine)',
        value: 1.15,
        unit: 'ng/dL',
        referenceRange: '0.82 - 1.77 ng/dL',
        status: 'normal',
        explanation: 'Circulating active thyroxine level remains within normal limits despite elevated TSH.'
      },
      {
        name: 'Total T3 (Triiodothyronine)',
        value: 104,
        unit: 'ng/dL',
        referenceRange: '80 - 200 ng/dL',
        status: 'normal',
        explanation: 'Total circulating triiodothyronine is within normal parameters.'
      },
      {
        name: 'Anti-TPO Antibodies',
        value: 48,
        unit: 'IU/mL',
        referenceRange: '< 35 IU/mL',
        status: 'high',
        explanation: 'Mildly elevated anti-thyroid peroxidase autoantibodies suggest an autoimmune background (Hashimoto\'s thyroiditis predisposition).'
      }
    ],
    aiSummary: 'Thyroid profile shows subclinical primary hypothyroidism with elevated TSH (6.42 µIU/mL) alongside normal Free T4 (1.15 ng/dL). Elevated Anti-TPO antibodies point toward autoimmune thyroid reactivity (Hashimoto\'s pattern).',
    recommendations: [
      'Re-check TSH and Free T4 in 6 to 8 weeks to determine if the TSH elevation is persistent.',
      'Ensure adequate dietary selenium and zinc intake while avoiding excessive mega-doses of iodine or kelp.',
      'Consult an endocrinologist for clinical correlation regarding any symptoms of sluggishness, cold intolerance, or unexplained weight gain.'
    ],
    doctorDiscussionPoints: [
      'Discuss whether starting low-dose Levothyroxine (e.g. 25–50 mcg) is indicated based on your clinical symptoms, lipid levels, and cardiovascular history.',
      'Review whether monitoring thyroid ultrasound is advisable.'
    ]
  }
];
