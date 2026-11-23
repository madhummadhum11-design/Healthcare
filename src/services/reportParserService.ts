// MediCore AI - Clinical Report OCR & Biomarker Parsing Service

import { MedicalReport, Biomarker } from '../types';
import { SAMPLE_REPORTS } from '../data/sampleReports';

export interface ParseResult {
  report: MedicalReport;
  rawTextExtracted: string;
}

export class ReportParserService {
  // Reference dictionary for known lab biomarkers
  private biomarkerDict: Record<
    string,
    {
      unit: string;
      referenceRange: string;
      normalMin: number;
      normalMax: number;
      explanation: string;
    }
  > = {
    'Total Cholesterol': {
      unit: 'mg/dL',
      referenceRange: '< 200 mg/dL',
      normalMin: 120,
      normalMax: 200,
      explanation: 'Total circulating cholesterol. Elevated levels indicate increased cardiovascular atheroma risk.'
    },
    'LDL Cholesterol': {
      unit: 'mg/dL',
      referenceRange: '< 100 mg/dL',
      normalMin: 50,
      normalMax: 100,
      explanation: 'Low-density lipoprotein ("bad cholesterol"). Contributes directly to arterial plaque buildup.'
    },
    'HDL Cholesterol': {
      unit: 'mg/dL',
      referenceRange: '> 50 mg/dL',
      normalMin: 50,
      normalMax: 90,
      explanation: 'High-density lipoprotein ("good cholesterol"). Helps reverse cholesterol transport from arteries back to liver.'
    },
    'Triglycerides': {
      unit: 'mg/dL',
      referenceRange: '< 150 mg/dL',
      normalMin: 40,
      normalMax: 150,
      explanation: 'Fats from dietary caloric surplus. High levels correlate with metabolic syndrome and steatotic liver disease.'
    },
    'Fasting Blood Glucose': {
      unit: 'mg/dL',
      referenceRange: '70 - 99 mg/dL',
      normalMin: 70,
      normalMax: 99,
      explanation: 'Basal glucose after 8-hour overnight fast. 100-125 mg/dL is prediabetes; >= 126 mg/dL is diabetes threshold.'
    },
    'HbA1c (Glycated Hemoglobin)': {
      unit: '%',
      referenceRange: '< 5.7 %',
      normalMin: 4.0,
      normalMax: 5.6,
      explanation: 'Reflects average blood sugar levels over the past 90 days. >= 6.5% indicates diabetes.'
    },
    'Hemoglobin': {
      unit: 'g/dL',
      referenceRange: '13.5 - 17.5 g/dL',
      normalMin: 13.5,
      normalMax: 17.5,
      explanation: 'Oxygen-carrying metalloprotein inside red blood cells. Low values signify anemia.'
    },
    'WBC Count': {
      unit: '/µL',
      referenceRange: '4,000 - 11,000 /µL',
      normalMin: 4000,
      normalMax: 11000,
      explanation: 'Total white blood cells. Elevations signal infection or inflammation; low values indicate immunosuppression.'
    },
    'Platelet Count': {
      unit: '/µL',
      referenceRange: '150,000 - 450,000 /µL',
      normalMin: 150000,
      normalMax: 450000,
      explanation: 'Cell fragments essential for normal blood clotting and vessel repair.'
    },
    'TSH (Thyroid Stimulating Hormone)': {
      unit: 'µIU/mL',
      referenceRange: '0.45 - 4.50 µIU/mL',
      normalMin: 0.45,
      normalMax: 4.5,
      explanation: 'Pituitary hormone driving thyroid activity. High TSH indicates an underactive thyroid (hypothyroidism).'
    },
    'Serum Creatinine': {
      unit: 'mg/dL',
      referenceRange: '0.70 - 1.20 mg/dL',
      normalMin: 0.7,
      normalMax: 1.2,
      explanation: 'Muscle metabolic waste filtered by kidneys. High values indicate compromised renal filtration.'
    },
    'eGFR': {
      unit: 'mL/min/1.73m²',
      referenceRange: '> 90 mL/min/1.73m²',
      normalMin: 90,
      normalMax: 140,
      explanation: 'Estimated rate at which the kidneys filter blood. Values below 60 mL/min indicate chronic kidney disease.'
    },
    'Uric Acid': {
      unit: 'mg/dL',
      referenceRange: '3.5 - 7.2 mg/dL',
      normalMin: 3.5,
      normalMax: 7.2,
      explanation: 'End product of purine breakdown. Elevated levels predispose to gout arthritis and kidney stones.'
    },
    'ALT / SGPT': {
      unit: 'U/L',
      referenceRange: '7 - 56 U/L',
      normalMin: 7,
      normalMax: 56,
      explanation: 'Liver enzyme found inside hepatocytes. Leakage into bloodstream signals liver cellular irritation or fatty liver.'
    }
  };

  public async parseUploadedFile(file: File): Promise<ParseResult> {
    // Simulate OCR processing time
    await new Promise((res) => setTimeout(res, 1200));

    const name = file.name.toLowerCase();

    // Match appropriate sample or synthesize parsed report based on file name or type
    if (name.includes('cbc') || name.includes('blood_count') || name.includes('hemoglobin')) {
      const rep = SAMPLE_REPORTS[1];
      return {
        report: { ...rep, id: `rep-${Date.now()}`, fileName: file.name, fileSize: `${(file.size / 1024).toFixed(1)} KB` },
        rawTextExtracted: `PATIENT REPORT OCR SCAN
Lab: Anand Diagnostic Laboratory
Patient: John Doe | Age: 42 | Gender: M
Sample Collected: Whole Blood EDTA
====================================
Hemoglobin (Hb): 13.8 g/dL [13.5 - 17.5] NORMAL
RBC Count: 4.65 mil/uL [4.50 - 5.90] NORMAL
WBC Total: 7200 /uL [4000 - 11000] NORMAL
Platelet Count: 245,000 /uL [150000 - 450000] NORMAL
MCV: 88.4 fL [80.0 - 96.0] NORMAL
ESR: 12 mm/hr [< 15] NORMAL`
      };
    } else if (name.includes('thyroid') || name.includes('tsh') || name.includes('t3_t4')) {
      const rep = SAMPLE_REPORTS[2];
      return {
        report: { ...rep, id: `rep-${Date.now()}`, fileName: file.name, fileSize: `${(file.size / 1024).toFixed(1)} KB` },
        rawTextExtracted: `PATIENT REPORT OCR SCAN
Lab: Thyrocare Reference Lab
Test: Thyroid Function Profile (Ultra-sensitive)
====================================
TSH: 6.42 uIU/mL [0.45 - 4.50] HIGH
Free T4: 1.15 ng/dL [0.82 - 1.77] NORMAL
Total T3: 104 ng/dL [80 - 200] NORMAL
Anti-TPO Antibodies: 48 IU/mL [< 35] HIGH`
      };
    }

    // Default to Comprehensive Lipid & Metabolic Panel
    const rep = SAMPLE_REPORTS[0];
    return {
      report: { ...rep, id: `rep-${Date.now()}`, fileName: file.name, fileSize: `${(file.size / 1024).toFixed(1)} KB` },
      rawTextExtracted: `PATIENT REPORT OCR SCAN
Lab: Metropolis Central Clinical Reference Laboratories
Patient: John Doe | Age: 42 | Gender: M
Test: Comprehensive Lipid & Renal Panel
====================================
Total Cholesterol: 238 mg/dL [< 200] HIGH
LDL Cholesterol: 154 mg/dL [< 100] HIGH
HDL Cholesterol: 42 mg/dL [> 50] LOW
Triglycerides: 210 mg/dL [< 150] HIGH
Fasting Blood Sugar: 112 mg/dL [70 - 99] HIGH (PREDIABETES)
Serum Creatinine: 0.95 mg/dL [0.70 - 1.20] NORMAL
eGFR: 98 mL/min/1.73m2 [> 90] NORMAL`
    };
  }

  public parseCustomRawText(text: string, title: string = 'User Medical Report'): MedicalReport {
    const biomarkers: Biomarker[] = [];
    const lines = text.split('\n');

    for (const line of lines) {
      for (const [key, meta] of Object.entries(this.biomarkerDict)) {
        if (line.toLowerCase().includes(key.toLowerCase())) {
          // Extract numbers
          const match = line.match(/(\d+(\.\d+)?)/);
          if (match) {
            const val = parseFloat(match[1]);
            let status: 'normal' | 'high' | 'low' | 'critical' = 'normal';
            if (val > meta.normalMax * 1.5) status = 'critical';
            else if (val > meta.normalMax) status = 'high';
            else if (val < meta.normalMin * 0.7) status = 'critical';
            else if (val < meta.normalMin) status = 'low';

            biomarkers.push({
              name: key,
              value: val,
              unit: meta.unit,
              referenceRange: meta.referenceRange,
              status,
              explanation: meta.explanation
            });
            break;
          }
        }
      }
    }

    // If no specific recognized biomarkers, fall back to default template
    if (biomarkers.length === 0) {
      return SAMPLE_REPORTS[0];
    }

    const highCount = biomarkers.filter((b) => b.status === 'high' || b.status === 'critical').length;
    const lowCount = biomarkers.filter((b) => b.status === 'low').length;

    const summary = `Extracted ${biomarkers.length} clinical biomarkers from your document. Detected ${highCount} elevated and ${lowCount} low values outside standard physiological reference ranges. All results should be evaluated in context by your prescribing clinician.`;

    return {
      id: `rep-${Date.now()}`,
      title,
      date: new Date().toISOString().split('T')[0],
      type: 'Blood Test',
      patientName: 'John Doe',
      labName: 'Verified Clinical Pathology Services',
      biomarkers,
      aiSummary: summary,
      recommendations: [
        'Schedule a routine physician consultation to review these lab parameters.',
        'Adopt general lifestyle optimizations including adequate hydration, balanced whole-food nutrition, and 150 minutes of weekly aerobic exercise.'
      ],
      doctorDiscussionPoints: [
        'Review whether repeat testing is required in 8 to 12 weeks.',
        'Discuss if targeted pharmacotherapy or nutritional supplementation is appropriate.'
      ]
    };
  }
}

export const reportParserService = new ReportParserService();
