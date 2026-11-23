// MediCore AI - Siri-Style Conversational Clinical Reasoning & Triage Engine

import { ChatMessage, ClinicalTriageState, Doctor, Facility } from '../types';
import { ENCYCLOPEDIA_DATA } from '../data/encyclopedia';
import { MEDICINES_DATA } from '../data/medicines';
import { DOCTORS_DATA } from '../data/doctors';
import { FACILITIES_DATA } from '../data/facilities';

export interface AIResponse {
  text: string;
  isEmergency: boolean;
  emergencyType?: string;
  suggestedActions?: string[];
  medicalReferences?: string[];
  suggestedQuestions?: string[];
  cardType?: 'doctors' | 'facilities' | 'report' | 'vitals';
  cardData?: any;
  updatedTriageState?: ClinicalTriageState;
}

export class AIChatService {
  // Emergency Red-Flag Keyword Patterns (Safety Layer)
  private emergencyPatterns = [
    {
      type: 'Acute Myocardial Infarction / Cardiac Crisis',
      regex: /(chest pain|crushing pain|pressure in chest|pain radiating to arm|pain radiating to jaw|heart attack|chest tightness with sweat)/i,
      guidance: `🚨 CRITICAL EMERGENCY ALERT: POSSIBLE ACUTE CORONARY EVENT
Your symptoms indicate a possible acute cardiac event (such as a heart attack).
IMMEDIATE ACTIONS REQUIRED:
1. Dial 112 or 108 IMMEDIATELY or have someone drive you to the nearest Emergency Department. Do not drive yourself.
2. Rest in a comfortable seated position (half-seated against pillows).
3. If not allergic to aspirin and no history of gastrointestinal bleeding, chew one 300-325 mg non-enteric adult aspirin while awaiting emergency responders.
4. Unlock your front door so emergency responders can enter without delay.`
    },
    {
      type: 'Acute Stroke (Cerebrovascular Accident)',
      regex: /(stroke|face droop|facial droop|slurred speech|arm weakness|cannot move arm|sudden numbness on one side|sudden blindness|loss of balance and speech)/i,
      guidance: `🚨 CRITICAL EMERGENCY ALERT: POSSIBLE ACUTE STROKE (BE-FAST)
Stroke is an extreme time-critical emergency ("Time is Brain").
IMMEDIATE ACTIONS REQUIRED:
1. Dial 112 or 108 IMMEDIATELY. Request an emergency ambulance equipped for stroke triage to a Stroke-Ready Hospital.
2. Note the EXACT TIME symptoms first started. Intravenous thrombolysis must be initiated within 4.5 hours.
3. Do NOT give food, water, or medication (swallowing reflexes may be compromised, risk of aspiration).
4. Lay the patient flat or on their side with head slightly elevated.`
    },
    {
      type: 'Severe Respiratory Distress / Hypoxemia',
      regex: /(cannot breathe|severe breathing difficulty|gasping for air|turning blue|lips blue|suffocating|choking|severe asthma attack not responding)/i,
      guidance: `🚨 CRITICAL EMERGENCY ALERT: SEVERE RESPIRATORY DISTRESS
Critically compromised breathing or blue lips (cyanosis) indicates acute hypoxemia.
IMMEDIATE ACTIONS REQUIRED:
1. Call 112 or 108 right now.
2. Sit upright, leaning forward resting arms on knees (tripod position) to optimize diaphragmatic ventilation.
3. Use rescue bronchodilator inhaler (Salbutamol) with spacer (4-10 puffs, 1 puff every 30-60 seconds) if available.
4. Loosen all restrictive clothing around the neck and chest.`
    },
    {
      type: 'Severe Anaphylactic Shock',
      regex: /(anaphylaxis|throat swelling|throat closing|tongue swelling|difficulty swallowing with hives|severe allergic reaction)/i,
      guidance: `🚨 CRITICAL EMERGENCY ALERT: ANAPHYLAXIS
Life-threatening systemic allergic reaction.
IMMEDIATE ACTIONS REQUIRED:
1. Administer Epinephrine Auto-Injector (EpiPen) into the outer mid-thigh IMMEDIATELY if available. Hold for 3-5 seconds.
2. Dial 112 or 108 immediately.
3. Lie flat with legs elevated unless breathing is difficult (in which case sit upright).`
    },
    {
      type: 'Unconsciousness / Massive Hemorrhage / Seizure',
      regex: /(unconscious|passed out and unresponsive|massive bleeding|blood spurting|seizure lasting more than 5 minutes)/i,
      guidance: `🚨 CRITICAL EMERGENCY ALERT: UNRESPONSIVENESS / LIFE-THREATENING CRISIS
IMMEDIATE ACTIONS REQUIRED:
1. Call 112 or 108 immediately.
2. Check for breathing and carotid pulse. If no breathing or only gasping, start Hands-Only CPR immediately (100–120 compressions/minute in the center of the chest).
3. For massive external bleeding: Apply continuous firm pressure directly on wound with clean gauze or tourniquet.`
    }
  ];

  public detectEmergency(text: string): { isEmergency: boolean; type?: string; guidance?: string } {
    for (const pattern of this.emergencyPatterns) {
      if (pattern.regex.test(text)) {
        return {
          isEmergency: true,
          type: pattern.type,
          guidance: pattern.guidance
        };
      }
    }
    return { isEmergency: false };
  }

  public async generateResponse(
    userMessage: string,
    history: ChatMessage[],
    language: string = 'English',
    currentTriageState?: ClinicalTriageState
  ): Promise<AIResponse> {
    const trimmed = userMessage.trim();
    const lower = trimmed.toLowerCase();

    // 1. Critical Emergency Check
    const emergencyCheck = this.detectEmergency(trimmed);
    if (emergencyCheck.isEmergency) {
      return {
        text: emergencyCheck.guidance || '🚨 Critical medical emergency detected. Call 112 or 108 immediately.',
        isEmergency: true,
        emergencyType: emergencyCheck.type,
        suggestedActions: [
          'Call Emergency Ambulance (112)',
          'Find Nearest Trauma Center',
          'Notify Family Emergency Contact',
          'First Aid Protocols'
        ],
        medicalReferences: ['AHA Emergency Cardiovascular Care Guidelines', 'WHO Clinical Management Guidelines'],
        cardType: 'facilities',
        cardData: FACILITIES_DATA.filter((f) => f.emergencyServices).slice(0, 2)
      };
    }

    // 2. Multilingual Greetings & Handlers (Kannada, Hindi, etc.)
    if (language.includes('Kannada') || /kannada|ಕನ್ನಡ/i.test(trimmed)) {
      return this.handleKannada(trimmed, currentTriageState);
    }
    if (language.includes('Hindi') || /hindi|हिन्दी/i.test(trimmed)) {
      return this.handleHindi(trimmed, currentTriageState);
    }
    if (language.includes('Tamil') || /tamil|தமிழ்/i.test(trimmed)) {
      return this.handleTamil(trimmed);
    }
    if (language.includes('Telugu') || /telugu|తెలుగు/i.test(trimmed)) {
      return this.handleTelugu(trimmed);
    }

    // 3. Conversational Greetings (Siri-Style)
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|hello medicore|hey medicore)\b/i.test(lower)) {
      return {
        text: `Hello! Welcome to MediCore. How are you feeling today? I'm here to listen, understand your symptoms, and guide you through your healthcare journey.`,
        isEmergency: false,
        suggestedActions: [
          'I have a headache',
          'Check my symptoms',
          'Find a doctor',
          'Explain a medicine'
        ],
        updatedTriageState: { step: 'none' }
      };
    }

    // 4. Intent: Doctor Consultation / Search Doctors
    if (
      lower.includes('find a doctor') ||
      lower.includes('book a doctor') ||
      lower.includes('see a doctor') ||
      lower.includes('cardiologist') ||
      lower.includes('neurologist') ||
      lower.includes('dermatologist') ||
      lower.includes('general physician') ||
      lower.includes('pediatrician') ||
      lower.includes('orthopedic') ||
      lower.includes('gynecologist') ||
      lower.includes('consultation')
    ) {
      return this.handleDoctorSearchIntent(lower);
    }

    // 5. Intent: Nearby Medical Facilities / Hospital Search
    if (
      lower.includes('nearby hospital') ||
      lower.includes('hospitals near me') ||
      lower.includes('find a pharmacy') ||
      lower.includes('pharmacy nearby') ||
      lower.includes('emergency care') ||
      lower.includes('diagnostic lab') ||
      lower.includes('clinic near me')
    ) {
      return this.handleFacilitySearchIntent(lower);
    }

    // 6. Intent: Patient Health Parameters / Vitals
    if (
      lower.includes('check my vitals') ||
      lower.includes('my blood pressure') ||
      lower.includes('my health parameters') ||
      lower.includes('my pulse') ||
      lower.includes('my glucose')
    ) {
      return {
        text: `Here is a summary of your recorded health vitals from your profile:\n\n• **Blood Pressure:** 124/82 mmHg (Mildly elevated, resting)\n• **Heart Rate:** 72 bpm (Normal sinus rhythm)\n• **Fasting Blood Glucose:** 104 mg/dL (Prediabetes range)\n• **SpO2 Level:** 98% (Optimal)\n• **Body Temperature:** 98.4°F (Normal)\n• **BMI:** 24.3 kg/m² (Healthy weight)\n\nWould you like me to record a new reading or analyze your recent 7-day trend?`,
        isEmergency: false,
        suggestedActions: ['+ Log New Blood Pressure', 'View Detailed Vitals Charts', 'Ask AI Health Tips'],
        cardType: 'vitals'
      };
    }

    // 7. Intent: Specific Pharmaceutical Drug Query
    const matchedMed = MEDICINES_DATA.find(
      (m) =>
        lower.includes(m.brandName.toLowerCase()) ||
        lower.includes(m.genericName.toLowerCase()) ||
        m.genericName.toLowerCase().split(' ').some((part) => part.length > 4 && lower.includes(part))
    );

    if (matchedMed) {
      return {
        text: `### 💊 Clinical Overview: **${matchedMed.genericName}** (*${matchedMed.brandName}*)

**Drug Class:** ${matchedMed.drugClass}
**Prescription Status:** ${matchedMed.prescriptionRequired ? '⚠️ Prescription-Only (Rx)' : '🟢 Over-The-Counter (OTC)'}

#### 📋 Common Medical Uses:
${matchedMed.indications.map((ind) => `- ${ind}`).join('\n')}

#### 📦 Available Dosage Forms:
${matchedMed.dosageForms.map((df) => `- ${df}`).join('\n')}

#### ⚠️ Common Side Effects:
${matchedMed.commonSideEffects.map((se) => `- ${se}`).join('\n')}

#### 🛑 Key Warnings & Precautions:
${matchedMed.warnings.map((w) => `- ${w}`).join('\n')}

#### 🔄 Known Drug Interactions:
${matchedMed.interactions.map((i) => `- ${i}`).join('\n')}

#### 💡 Safe Storage:
${matchedMed.storage}

---
*⚕️ Clinical Safety Notice: Educational information only. Never modify dosage without physician guidance.*`,
        isEmergency: false,
        suggestedActions: [
          `What are alternatives to ${matchedMed.genericName}?`,
          `How should I take ${matchedMed.genericName} with food?`,
          `Check drug-drug interactions`
        ],
        medicalReferences: ['FDA Approved Drug Monographs', 'WHO Model List of Essential Medicines']
      };
    }

    // 8. Intent: Disease Explanation (RAG over Medical Encyclopedia)
    const matchedCondition = ENCYCLOPEDIA_DATA.find(
      (c) =>
        (lower.includes('what is') || lower.includes('explain') || lower.includes('tell me about')) &&
        (lower.includes(c.name.toLowerCase()) ||
          (lower.includes('hypertension') && c.id === 'cond-1') ||
          (lower.includes('asthma') && c.id === 'cond-3') ||
          (lower.includes('copd') && c.id === 'cond-4') ||
          (lower.includes('migraine') && c.id === 'cond-6') ||
          (lower.includes('gerd') && c.id === 'cond-7') ||
          (lower.includes('eczema') && c.id === 'cond-8') ||
          (lower.includes('kidney') && c.id === 'cond-9') ||
          (lower.includes('diabetes') && c.id === 'cond-14') ||
          (lower.includes('pcos') && c.id === 'cond-19') ||
          (lower.includes('vitamin d') && c.id === 'cond-23'))
    );

    if (matchedCondition) {
      return {
        text: `### 🩺 Understanding **${matchedCondition.name}**

${matchedCondition.overview}

#### 🔍 Common Clinical Symptoms:
${matchedCondition.symptoms.slice(0, 5).map((s) => `- ${s}`).join('\n')}

#### 🧬 Causes & Key Risk Factors:
${matchedCondition.causes.slice(0, 2).map((c) => `- ${c}`).join('\n')}
${matchedCondition.riskFactors.slice(0, 3).map((r) => `- Risk: ${r}`).join('\n')}

#### 🧪 Diagnostic Methods:
${matchedCondition.diagnosticMethods.slice(0, 3).map((d) => `- ${d}`).join('\n')}

#### 💊 Standard Treatment Approaches:
${matchedCondition.treatmentApproaches.slice(0, 3).map((t) => `- ${t}`).join('\n')}

#### 🥗 Prevention & Lifestyle Guidance:
${matchedCondition.lifestyleRecommendations.slice(0, 3).map((l) => `- ${l}`).join('\n')}

#### 👨‍⚕️ When to Consult a Physician:
${matchedCondition.whenToConsultDoctor.map((w) => `- ${w}`).join('\n')}

---
*⚕️ Educational Guidance: Consult a licensed clinician for individualized diagnostic testing.*`,
        isEmergency: false,
        suggestedActions: [
          `Find a doctor for ${matchedCondition.name}`,
          `What lab tests diagnose ${matchedCondition.name}?`,
          `Dietary recommendations for ${matchedCondition.name}`
        ],
        medicalReferences: matchedCondition.references.map((r) => `${r.title} (${r.source})`)
      };
    }

    // 9. Intelligent Multi-Turn Symptom Triage Engine
    return this.handleSymptomTriageFlow(lower, currentTriageState, history);
  }

  // Multi-Turn Patient Guidance Workflow
  private handleSymptomTriageFlow(
    query: string,
    triageState?: ClinicalTriageState,
    history?: ChatMessage[]
  ): AIResponse {
    const state: ClinicalTriageState = triageState || { step: 'none' };

    // Detect primary symptom from query or previous state
    let detectedSymptom = state.symptom;
    if (!detectedSymptom) {
      if (query.includes('headache') || query.includes('head ache') || query.includes('migraine')) {
        detectedSymptom = 'headache';
      } else if (query.includes('fever') || query.includes('chills') || query.includes('temperature') || query.includes('hot')) {
        detectedSymptom = 'fever';
      } else if (query.includes('cough') || query.includes('throat') || query.includes('cold') || query.includes('sneez')) {
        detectedSymptom = 'cough / upper respiratory';
      } else if (query.includes('stomach') || query.includes('belly') || query.includes('abdominal') || query.includes('nausea') || query.includes('acid') || query.includes('gastric')) {
        detectedSymptom = 'abdominal discomfort';
      } else if (query.includes('dizz') || query.includes('lightheaded') || query.includes('vertigo')) {
        detectedSymptom = 'dizziness / vertigo';
      } else if (query.includes('fatigue') || query.includes('tired') || query.includes('weak') || query.includes('exhausted')) {
        detectedSymptom = 'fatigue / weakness';
      } else if (query.includes('knee') || query.includes('joint') || query.includes('back pain') || query.includes('body pain')) {
        detectedSymptom = 'musculoskeletal pain';
      }
    }

    // Step 1 -> Step 2: First symptom statement ("I have a headache", "I feel sick")
    if (state.step === 'none' || !state.symptom) {
      if (detectedSymptom) {
        return {
          text: `I'm sorry you're experiencing a ${detectedSymptom}. I'm here to help you understand what might be happening.\n\nTo give you the most accurate guidance:\n1. **When did this ${detectedSymptom} start?** (e.g., today, a few hours ago, or several days ago?)\n2. **Is it mild, moderate, or severe?**`,
          isEmergency: false,
          suggestedActions: [
            'Started today, mild',
            'Started yesterday, moderate',
            'Several days ago, severe',
            'It is sudden and throbbing'
          ],
          updatedTriageState: {
            symptom: detectedSymptom,
            step: 'onset',
            lastQuestionAsked: 'onset and severity'
          }
        };
      }
    }

    // Step 2 -> Step 3: Patient answered onset/severity ("Started yesterday and moderate")
    if (state.step === 'onset') {
      let severity: 'mild' | 'moderate' | 'severe' = 'moderate';
      if (query.includes('mild') || query.includes('slight') || query.includes('little')) severity = 'mild';
      if (query.includes('severe') || query.includes('intense') || query.includes('worst') || query.includes('bad')) severity = 'severe';

      // Red flag warning if severe sudden onset
      if (severity === 'severe' && (query.includes('thunderclap') || query.includes('sudden') || query.includes('worst'))) {
        return {
          text: `⚠️ **Warning:** A sudden, exceptionally severe "worst headache of your life" can be a sign of a neurological emergency (such as a subarachnoid bleed). If this came on within seconds or is accompanied by stiff neck, confusion, or visual loss, please seek emergency medical evaluation immediately (Dial 112 / 108).`,
          isEmergency: true,
          emergencyType: 'Sudden Severe Onset Symptom',
          suggestedActions: ['Call 112 Emergency', 'Find Nearest Emergency Room'],
          cardType: 'facilities',
          cardData: FACILITIES_DATA.filter((f) => f.emergencyServices).slice(0, 2)
        };
      }

      return {
        text: `Thank you for clarifying. I've noted that your ${state.symptom} is **${severity}**.\n\nNext, do you have any **associated symptoms** such as:\n• Fever or chills?\n• Nausea or vomiting?\n• Light sensitivity, blurred vision, or neck stiffness?\n• Any numbness or difficulty speaking?`,
        isEmergency: false,
        suggestedActions: [
          'No other symptoms, just the discomfort',
          'Yes, mild fever and nausea',
          'Sensitive to light and sound',
          'Feel a bit tired and dizzy'
        ],
        updatedTriageState: {
          symptom: state.symptom,
          step: 'associated',
          onset: query,
          severity,
          lastQuestionAsked: 'associated symptoms'
        }
      };
    }

    // Step 3 -> Step 4 / 5: Patient answered associated symptoms
    if (state.step === 'associated') {
      const symptom = state.symptom || 'symptoms';
      const severity = state.severity || 'moderate';

      let possibleCauses: string[] = [];
      let selfCareTips: string[] = [];
      let specialistRecommendation = 'General Physician';

      if (symptom.includes('headache')) {
        specialistRecommendation = 'Neurologist';
        if (query.includes('light') || query.includes('nausea') || query.includes('one side')) {
          possibleCauses = [
            'Migraine episode without aura (throbbing pain aggravated by sensory stimuli)',
            'Tension-type headache triggered by neck muscle tightness, posture, or screen fatigue',
            'Dehydration or caffeine withdrawal'
          ];
        } else if (query.includes('fever') || query.includes('cold')) {
          possibleCauses = [
            'Viral upper respiratory infection or acute rhinosinusitis causing sinus pressure',
            'Systemic viral fever syndrome'
          ];
        } else {
          possibleCauses = [
            'Tension headache secondary to stress, sleep disruption, or prolonged screen use',
            'Cervicogenic tension or eye strain'
          ];
        }
        selfCareTips = [
          'Rest in a cool, dark, quiet room with minimal auditory and screen stimulation',
          'Stay well-hydrated: drink at least 500 mL of water or electrolyte fluid immediately',
          'Apply a cold ice pack to the forehead or warm compress to the back of the neck',
          'Gentle neck and shoulder stretching'
        ];
      } else if (symptom.includes('fever')) {
        specialistRecommendation = 'General Physician';
        possibleCauses = [
          'Acute viral respiratory or viral gastroenteritis infection',
          'Seasonal viral syndrome (e.g. dengue or flu in tropical areas)',
          'Bacterial pharyngitis or urinary tract infection'
        ];
        selfCareTips = [
          'Monitor body temperature twice daily with a calibrated digital thermometer',
          'Stay well-hydrated with tender coconut water, clear broths, and oral rehydration fluids',
          'Wear light, breathable cotton clothing; avoid heavy blankets during spikes',
          'Lukewarm sponging if temperature causes significant distress'
        ];
      } else {
        possibleCauses = [
          'Mild functional inflammatory reaction or fatigue-induced response',
          'Dietary sensitivity, dehydration, or postural strain'
        ];
        selfCareTips = [
          'Rest comfortably and avoid strenuous physical exertion',
          'Maintain balanced hydration and light, easily digestible meals',
          'Log your symptoms in your Health Parameters dashboard'
        ];
      }

      return {
        text: `### 🩺 MediCore Clinical Guidance: **${symptom.toUpperCase()}**

Based on our conversation (severity: **${severity}**, onset: **${state.onset || 'recent'}**, associated: **${query}**):

#### 📋 Possible Considerations:
${possibleCauses.map((c) => `- ${c}`).join('\n')}

#### 🌿 Evidence-Based Supportive Care:
${selfCareTips.map((s) => `- ${s}`).join('\n')}

#### 👨‍⚕️ Recommended Next Step:
If symptoms do not improve within 24 to 48 hours, or if you develop red-flag warning signs (high fever, severe stiff neck, persistent vomiting, or confusion), please consult a **${specialistRecommendation}**.

Would you like me to show available doctor consultation slots, or find nearby medical clinics?`,
        isEmergency: false,
        suggestedActions: [
          `Find a ${specialistRecommendation}`,
          'Find nearby medical clinics',
          'Log health reading',
          'Ask another question'
        ],
        cardType: 'doctors',
        cardData: DOCTORS_DATA.filter((d) => d.specialty.toLowerCase().includes(specialistRecommendation.toLowerCase()) || d.specialty === 'General Physician').slice(0, 2),
        updatedTriageState: {
          symptom: state.symptom,
          step: 'guidance',
          associatedSymptoms: [query]
        }
      };
    }

    // Default Fallback
    return {
      text: `I understand. Could you tell me a little more about what you're experiencing? For example, are you looking for doctor consultations, pharmacy locations, lab report interpretation, or guidance on a specific health symptom?`,
      isEmergency: false,
      suggestedActions: [
        'I have a headache',
        'Find a doctor near me',
        'Explain my lab report',
        'Check nearby pharmacies'
      ],
      updatedTriageState: { step: 'none' }
    };
  }

  // Doctor Search Intent Handler
  private handleDoctorSearchIntent(query: string): AIResponse {
    let matchedSpecialty = 'General Physician';
    if (query.includes('cardio') || query.includes('heart')) matchedSpecialty = 'Cardiologist';
    else if (query.includes('neuro') || query.includes('brain') || query.includes('nerve')) matchedSpecialty = 'Neurologist';
    else if (query.includes('derma') || query.includes('skin') || query.includes('rash')) matchedSpecialty = 'Dermatologist';
    else if (query.includes('ortho') || query.includes('bone') || query.includes('joint')) matchedSpecialty = 'Orthopedic';
    else if (query.includes('pediatric') || query.includes('child') || query.includes('baby')) matchedSpecialty = 'Pediatrician';
    else if (query.includes('gynae') || query.includes('women') || query.includes('pcos')) matchedSpecialty = 'Gynecologist';
    else if (query.includes('ent') || query.includes('ear') || query.includes('sinus')) matchedSpecialty = 'ENT Specialist';
    else if (query.includes('endo') || query.includes('thyroid') || query.includes('sugar')) matchedSpecialty = 'Endocrinologist';
    else if (query.includes('gastro') || query.includes('stomach') || query.includes('liver')) matchedSpecialty = 'Gastroenterologist';
    else if (query.includes('pulmo') || query.includes('lung') || query.includes('asthma')) matchedSpecialty = 'Pulmonologist';

    const matchingDocs = DOCTORS_DATA.filter((d) => d.specialty === matchedSpecialty);

    return {
      text: `I found verified **${matchedSpecialty}** specialists ready for online tele-health video consultations or in-clinic visits. Here are our top-rated physicians with verified appointment slots:`,
      isEmergency: false,
      suggestedActions: [
        `Book appointment with ${matchingDocs[0]?.name || 'Doctor'}`,
        'View all medical specialties',
        'Find nearby hospital'
      ],
      cardType: 'doctors',
      cardData: matchingDocs.slice(0, 2)
    };
  }

  // Facility Search Intent Handler
  private handleFacilitySearchIntent(query: string): AIResponse {
    let facType: Facility['type'] = 'Hospital';
    if (query.includes('pharmacy') || query.includes('medical store')) facType = 'Pharmacy';
    else if (query.includes('lab') || query.includes('diagnostic')) facType = 'Diagnostic Lab';
    else if (query.includes('emergency') || query.includes('trauma')) facType = 'Emergency Care';
    else if (query.includes('clinic')) facType = 'Clinic';

    const matchingFacs = FACILITIES_DATA.filter((f) => f.type === facType);

    return {
      text: `Here are verified **${facType}** facilities near your current location with operating hours, distances, and contact details:`,
      isEmergency: false,
      suggestedActions: [
        `Call ${matchingFacs[0]?.name || 'Facility'}`,
        'Get driving directions',
        'Find 24/7 pharmacies'
      ],
      cardType: 'facilities',
      cardData: matchingFacs.slice(0, 2)
    };
  }

  // Multilingual Handlers
  private handleKannada(query: string, triageState?: ClinicalTriageState): AIResponse {
    const lower = query.toLowerCase();

    if (lower.includes('ನಮಸ್ಕಾರ') || lower.includes('hello') || lower.includes('hi')) {
      return {
        text: `ನಮಸ್ಕಾರ! ಮೆಡಿಕೋರ್ AI ಆರೋಗ್ಯ ಸಹಾಯಕಕ್ಕೆ ಸುಸ್ವಾಗತ. ಇಂದು ನಿಮ್ಮ ಆರೋಗ್ಯ ಹೇಗಿದೆ? ನಿಮಗೆ ಯಾವ ರೀತಿಯ ಸಹಾಯ ಬೇಕು ಎಂದು ತಿಳಿಸಿ.`,
        isEmergency: false,
        suggestedActions: ['ನನಗೆ ತಲೆನೋವು ಇದೆ', 'ಜ್ವರ ಬಂದಿದೆ', 'ವೈದ್ಯರನ್ನು ಹುಡುಕಿ']
      };
    }

    if (lower.includes('ತಲೆನೋವು') || lower.includes('headache')) {
      return {
        text: `ತಲೆನೋವು ಇರುವುದು ಕೇಳಿ ಬೇಸರವಾಯಿತು. ನಿಮ್ಮ ಆರೋಗ್ಯದ ಕಾಳಜಿಗಾಗಿ:\n1. ಈ ತಲೆನೋವು ಯಾವಾಗ ಪ್ರಾರಂಭವಾಯಿತು?\n2. ನೋವು ಕಡಿಮೆಯೇ ಅಥವಾ ತೀವ್ರವಾಗಿದೆಯೇ?\n3. ಜ್ವರ ಅಥವಾ ಕಣ್ಣು ಮಂಜಾಗುವ ಲಕ್ಷಣಗಳು ಇವೆಯೇ?`,
        isEmergency: false,
        suggestedActions: ['ಇಂದು ಪ್ರಾರಂಭವಾಯಿತು, ಸಾಧಾರಣ ನೋವು', 'ಜ್ವರ ಇದೆ', 'ವೈದ್ಯರ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ']
      };
    }

    if (lower.includes('ಜ್ವರ') || lower.includes('fever')) {
      return {
        text: `ಜ್ವರದ ಸಮಯದಲ್ಲಿ ಸಾಕಷ್ಟು ಬೆಚ್ಚಗಿನ ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಉತ್ತಮ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ. ತಾಪಮಾನ ೧೦೧°F ಗಿಂತ ಹೆಚ್ಚಿದ್ದರೆ ಅಥವಾ ೨ ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಮುಂದುವರಿದರೆ ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.\n\nತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ **112** ಅಥವಾ **108** ಗೆ ಕರೆ ಮಾಡಿ.`,
        isEmergency: false,
        suggestedActions: ['ವೈದ್ಯರ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ', 'ಆಸ್ಪತ್ರೆ ಹುಡುಕಿ']
      };
    }

    return {
      text: `ಮೆಡಿಕೋರ್ AI ಆರೋಗ್ಯ ಸಹಾಯಕ: ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ. ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ. ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ ದಯವಿಟ್ಟು ಅರ್ಹ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.\n\n*ತುರ್ತು ಸಹಾಯಕ್ಕೆ 112 ಕರೆ ಮಾಡಿ.*`,
      isEmergency: false,
      suggestedActions: ['ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ', 'ಆಸ್ಪತ್ರೆ ಹುಡುಕಿ']
    };
  }

  private handleHindi(query: string, triageState?: ClinicalTriageState): AIResponse {
    const lower = query.toLowerCase();

    if (lower.includes('नमस्ते') || lower.includes('hello') || lower.includes('hi')) {
      return {
        text: `नमस्ते! मेडिकोर AI स्वास्थ्य सहायक में आपका स्वागत है। आज आप कैसा महसूस कर रहे हैं? मैं आपके स्वास्थ्य को समझने में मदद के लिए यहाँ हूँ।`,
        isEmergency: false,
        suggestedActions: ['मुझे सिरदर्द है', 'बुखार के लक्षण', 'डॉक्टर खोजें']
      };
    }

    if (lower.includes('सिरदर्द') || lower.includes('headache')) {
      return {
        text: `सिरदर्द के बारे में जानकर दुख हुआ। बेहतर मार्गदर्शन के लिए:\n1. यह सिरदर्द कब शुरू हुआ?\n2. दर्द हल्का है, मध्यम है या बहुत तेज़?\n3. क्या इसके साथ बुखार या उल्टी जैसा महसूस हो रहा है?`,
        isEmergency: false,
        suggestedActions: ['आज शुरू हुआ, मध्यम है', 'तेज़ सिरदर्द है', 'डॉक्टर से परामर्श लें']
      };
    }

    return {
      text: `मेडिकोर AI स्वास्थ्य सहायक: आपके लक्षणों के अनुसार, कृपया पर्याप्त आराम करें और गुनगुना पानी पिएं। यदि लक्षण 24-48 घंटों से अधिक बने रहें, तो कृपया डॉक्टर से संपर्क करें।\n\n*आपातकालीन स्थिति में 112 पर कॉल करें।*`,
      isEmergency: false,
      suggestedActions: ['डॉक्टर परामर्श बुक करें', 'निकटतम अस्पताल खोजें']
    };
  }

  private handleTamil(query: string): AIResponse {
    return {
      text: `வணக்கம்! உங்கள் உடல்நலம் சார்ந்த கேள்விக்கு நன்றி. போதுமான அளவு ஓய்வெடுக்கவும், வெந்நீர் அருந்தவும். அறிகுறிகள் தொடர்ந்தால் மருத்துவரை அணுகவும். அவசர உதவிக்கு **112** அல்லது **108** ஐ அழைக்கவும்.`,
      isEmergency: false,
      suggestedActions: ['மருத்துவரை அணுகவும்', 'அருகிலுள்ள மருத்துவமனை']
    };
  }

  private handleTelugu(query: string): AIResponse {
    return {
      text: `నమస్కారం! మీ ఆరోగ్య సమస్యను పంచుకున్నందుకు ధన్యవాదాలు. తగినంత విశ్రాంతి తీసుకోండి మరియు నీరు త్రాగండి. సమస్య కొనసాగితే వెంటనే వైద్యుడిని సంప్రదించండి. అత్యవసర సహాయం కొరకు **112** లేదా **108** కి కాల్ చేయండి.`,
      isEmergency: false,
      suggestedActions: ['వైద్యుల అపాయింట్‌మెంట్', 'సమీప ఆసుపత్రులు']
    };
  }
}

export const aiChatService = new AIChatService();
