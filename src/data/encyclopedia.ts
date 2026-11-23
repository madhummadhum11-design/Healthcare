import { MedicalCondition } from '../types';

export const MEDICAL_CATEGORIES = [
  'All Conditions',
  'Cardiovascular Diseases',
  'Respiratory Diseases',
  'Neurological Disorders',
  'Digestive System Diseases',
  'Skin Diseases',
  'Kidney Diseases',
  'Liver Diseases',
  'Bone and Joint Disorders',
  'Eye Diseases',
  'Ear, Nose and Throat Conditions',
  'Diabetes and Endocrine Disorders',
  'Infectious Diseases',
  'Mental Health Conditions',
  'Blood Disorders',
  'Cancer and Oncology',
  'Women\'s Health',
  'Children\'s Health',
  'Genetic Disorders',
  'Autoimmune Diseases',
  'Nutritional Deficiencies'
];

export const ENCYCLOPEDIA_DATA: MedicalCondition[] = [
  // 1. Cardiovascular Diseases
  {
    id: 'cond-1',
    name: 'Hypertension (High Blood Pressure)',
    category: 'Cardiovascular Diseases',
    overview: 'Hypertension is a chronic medical condition where the force of the blood flowing through your blood vessels is consistently too high (typically systolic >= 130 mmHg or diastolic >= 80 mmHg). Often termed the "silent killer" because it frequently has no early warning signs yet significantly elevates the risk of heart disease, stroke, and kidney failure.',
    causes: [
      'Primary (essential) hypertension: genetic predisposition, age-related vascular stiffness, and environmental factors.',
      'Secondary hypertension: chronic kidney disease, endocrine tumors (pheochromocytoma, Cushing syndrome), obstructive sleep apnea, thyroid dysfunction, and certain medications (NSAIDs, oral contraceptives).'
    ],
    symptoms: [
      'Early stage: typically asymptomatic',
      'Occasional morning headaches or occipital throbbing',
      'Dizziness or lightheadedness',
      'Visual disturbances or blurred vision',
      'Shortness of breath during moderate exertion',
      'Palpitations or sensation of racing heart'
    ],
    riskFactors: [
      'High dietary sodium intake (> 2,300 mg/day)',
      'Lack of regular aerobic physical activity',
      'Overweight or obesity (BMI >= 25)',
      'Excessive alcohol consumption and tobacco use',
      'Chronic unmanaged psycho-emotional stress',
      'Family history of premature cardiovascular disease',
      'Age >= 55 for men, >= 65 for women'
    ],
    typesOrStages: [
      'Normal: Systolic < 120 and Diastolic < 80 mmHg',
      'Elevated: Systolic 120–129 and Diastolic < 80 mmHg',
      'Stage 1 Hypertension: Systolic 130–139 or Diastolic 80–89 mmHg',
      'Stage 2 Hypertension: Systolic >= 140 or Diastolic >= 90 mmHg',
      'Hypertensive Crisis: Systolic > 180 and/or Diastolic > 120 mmHg'
    ],
    diagnosticMethods: [
      'Automated ambulatory 24-hour blood pressure monitoring (ABPM)',
      'Repeated in-clinic resting sphygmomanometer readings across 2–3 visits',
      'Urinalysis (for microalbuminuria and renal function)',
      'Serum creatinine, eGFR, and electrolytes',
      '12-lead Electrocardiogram (ECG) to assess left ventricular hypertrophy',
      'Lipid profile and fasting blood glucose test'
    ],
    treatmentApproaches: [
      'First-line antihypertensive pharmacotherapy: ACE inhibitors (e.g. Enalapril, Ramipril) or ARBs (e.g. Losartan, Telmisartan)',
      'Calcium Channel Blockers (e.g. Amlodipine)',
      'Thiazide-like diuretics (e.g. Chlorthalidone, Hydrochlorothiazide)',
      'Beta-blockers for comorbid ischemic heart disease or arrhythmia'
    ],
    prevention: [
      'Adopt the DASH diet (rich in fruits, vegetables, potassium, and low in saturated fats)',
      'Maintain dietary sodium below 1,500–2,000 mg per day',
      'Engage in at least 150 minutes of moderate-intensity aerobic exercise weekly',
      'Smoking cessation and minimizing alcohol intake'
    ],
    lifestyleRecommendations: [
      'Home blood pressure monitoring twice daily with an approved upper-arm cuff',
      'Weight loss of even 5–10% body weight reduces systolic BP by 5–10 mmHg',
      'Mindfulness-based stress reduction, deep breathing, and adequate sleep (7–8 hrs)'
    ],
    whenToConsultDoctor: [
      'Home readings consistently >= 130/80 mmHg over two weeks',
      'Unexplained frequent headaches or ringing in the ears',
      'Persistent swelling in ankles or feet'
    ],
    emergencyWarningSigns: [
      'Blood pressure reading exceeding 180/120 mmHg',
      'Severe central chest pain or pressure',
      'Sudden shortness of breath, numbness, weakness, or difficulty speaking',
      'Sudden severe visual loss or back pain'
    ],
    references: [
      { title: 'AHA/ACC Guideline for High Blood Pressure in Adults', source: 'American Heart Association / JACC (2017/2023)' },
      { title: 'Hypertension Clinical Profile & Management', source: 'World Health Organization (WHO)' },
      { title: 'High Blood Pressure Guidance', source: 'National Institute for Health and Care Excellence (NICE)' }
    ]
  },
  {
    id: 'cond-2',
    name: 'Coronary Artery Disease (CAD)',
    category: 'Cardiovascular Diseases',
    overview: 'Coronary Artery Disease occurs when the major blood vessels supplying the myocardium become damaged or diseased, usually due to atheromatous plaque accumulation. This restricts blood flow, leading to angina pectoris, myocardial ischemia, or acute myocardial infarction.',
    causes: [
      'Atherosclerosis: gradual buildup of fatty deposits, cholesterol, cellular waste, and fibrin inside arterial walls.',
      'Endothelial injury caused by smoking, hypertension, chronic hyperglycemia, and systemic inflammation.'
    ],
    symptoms: [
      'Angina: squeezing, heaviness, or burning sensation across the chest',
      'Radiation of discomfort to left arm, neck, jaw, back, or epigastrium',
      'Dyspnea on exertion',
      'Extreme fatigue during typical everyday activities',
      'Diaphoresis (cold clammy sweating) during episodes'
    ],
    riskFactors: [
      'Elevated LDL-C and low HDL-C',
      'Type 2 Diabetes Mellitus',
      'Cigarette smoking and tobacco use',
      'Family history of early coronary heart disease (< 55 in first-degree male relative)',
      'Sedentary lifestyle and obesity'
    ],
    typesOrStages: [
      'Stable Angina (predictable symptoms with exertion, relieved by rest or sublingual nitroglycerin)',
      'Unstable Angina (new onset, increasing frequency, or occurring at rest)',
      'Non-ST Elevation Myocardial Infarction (NSTEMI)',
      'ST Elevation Myocardial Infarction (STEMI - complete acute coronary occlusion)'
    ],
    diagnosticMethods: [
      '12-lead Electrocardiogram (ECG)',
      'High-sensitivity cardiac Troponin I/T blood assays',
      'Transthoracic Echocardiogram (TTE) for wall motion abnormalities',
      'Coronary CT Angiography (CCTA) with coronary artery calcium scoring',
      'Invasive Coronary Angiography (cardiac catheterization)'
    ],
    treatmentApproaches: [
      'Antiplatelet therapy: Aspirin + P2Y12 inhibitor (Clopidogrel/Ticagrelor)',
      'High-intensity Statin therapy (Atorvastatin 40-80mg, Rosuvastatin 20-40mg)',
      'Beta-blockers (Metoprolol, Bisoprolol) and ACE inhibitors',
      'Percutaneous Coronary Intervention (PCI with drug-eluting stent placement)',
      'Coronary Artery Bypass Grafting (CABG) for multivessel/left main disease'
    ],
    prevention: [
      'Aggressive management of LDL cholesterol (< 70 mg/dL or < 55 mg/dL for high risk)',
      'Strict glycemic and blood pressure control',
      'Mediterranean-style cardioprotective diet'
    ],
    lifestyleRecommendations: [
      'Cardiac rehabilitation program post-intervention',
      'Daily 30-minute moderate walking with cardiologist approval',
      'Stress reduction and smoking cessation support'
    ],
    whenToConsultDoctor: [
      'Recurrent discomfort in the chest with exertion',
      'Noticeable decrease in exercise capacity',
      'Episodes of unexplained lightheadedness'
    ],
    emergencyWarningSigns: [
      'Crushing chest pressure lasting > 5 minutes not relieved by rest',
      'Chest pain accompanied by nausea, cold sweat, lightheadedness, or shortness of breath',
      'Pain spreading to the shoulder, arm, back, neck, or jaw — Call 108 / 911 immediately'
    ],
    references: [
      { title: 'ACC/AHA Guidelines for the Prevention and Management of Coronary Artery Disease', source: 'Circulation / JACC' },
      { title: 'Cardiovascular Diseases Overview', source: 'World Health Organization (WHO)' }
    ]
  },

  // 2. Respiratory Diseases
  {
    id: 'cond-3',
    name: 'Bronchial Asthma',
    category: 'Respiratory Diseases',
    overview: 'Bronchial Asthma is a heterogeneous chronic inflammatory disease of the airways characterized by variable airflow limitation, bronchial hyperresponsiveness, and episodes of wheezing, shortness of breath, and cough.',
    causes: [
      'Genetic susceptibility combined with environmental exposures',
      'Atopic sensitization to allergens (house dust mites, pollens, pet dander, molds)',
      'Childhood viral respiratory tract infections (RSV, rhinovirus)',
      'Occupational irritants, chemical fumes, and air pollution'
    ],
    symptoms: [
      'Recurrent wheezing (high-pitched whistling sound on exhalation)',
      'Dry or productive cough, notably worse at night or early morning',
      'Chest tightness or constriction',
      'Shortness of breath triggered by exercise, cold air, or laughter'
    ],
    riskFactors: [
      'Family history of asthma or atopy (eczema, allergic rhinitis)',
      'Exposure to second-hand cigarette smoke',
      'Urban air particulate pollution (PM2.5 / PM10)',
      'Obesity and chronic gastroesophageal reflux'
    ],
    typesOrStages: [
      'Intermittent Asthma',
      'Mild Persistent Asthma',
      'Moderate Persistent Asthma',
      'Severe Persistent Asthma',
      'Cough-Variant Asthma / Exercise-Induced Bronchoconstriction'
    ],
    diagnosticMethods: [
      'Spirometry with pre- and post-bronchodilator reversibility test (FEV1 increase > 12% and 200 mL)',
      'Peak Expiratory Flow (PEF) diurnal variability monitoring',
      'Fractional exhaled nitric oxide (FeNO) to gauge eosinophilic airway inflammation',
      'Skin prick testing or specific serum IgE for environmental allergens'
    ],
    treatmentApproaches: [
      'Inhaled Corticosteroids (ICS) such as Budesonide, Fluticasone (anti-inflammatory cornerstone)',
      'Inhaled Long-Acting Beta-Agonists (LABA) such as Formoterol, Salmeterol',
      'Reliever therapy: Low-dose ICS-Formoterol or SABA (Albuterol/Salbutamol)',
      'Leukotriene receptor antagonists (Montelukast)',
      'Targeted biologic therapies (anti-IgE Omalizumab, anti-IL5 Mepolizumab) for severe refractory asthma'
    ],
    prevention: [
      'Avoidance of known allergens and home humidity control',
      'HEPA air purification in bedroom environments',
      'Annual influenza and pneumococcal immunizations'
    ],
    lifestyleRecommendations: [
      'Carry quick-relief inhaler at all times',
      'Use a spacer device for pressurized metered-dose inhalers (pMDI)',
      'Pre-medicate with inhaler 15 minutes before strenuous exercise if recommended'
    ],
    whenToConsultDoctor: [
      'Needing quick-relief inhaler more than twice per week',
      'Waking up at night due to coughing or breathlessness',
      'Frequent flare-ups limiting physical activity'
    ],
    emergencyWarningSigns: [
      'Inability to speak in full sentences without gasping for breath',
      'Severe retractions of the chest or neck muscles when breathing',
      'Peak flow meter reading in the Red Zone (< 50% of personal best)',
      'Blue or grey tinge on lips, face, or fingernails (Cyanosis)'
    ],
    references: [
      { title: 'Global Strategy for Asthma Management and Prevention', source: 'GINA (Global Initiative for Asthma)' },
      { title: 'Asthma Fact Sheets', source: 'World Health Organization (WHO)' }
    ]
  },
  {
    id: 'cond-4',
    name: 'Chronic Obstructive Pulmonary Disease (COPD)',
    category: 'Respiratory Diseases',
    overview: 'COPD is a progressive, treatable lung disease characterized by persistent respiratory symptoms and persistent airflow limitation, typically comprising chronic bronchitis and emphysema caused by significant exposure to noxious particles or gases.',
    causes: [
      'Long-term cigarette and tobacco smoking (responsible for > 80% of cases in developed regions)',
      'Indoor biomass fuel smoke exposure (cooking/heating in poorly ventilated homes)',
      'Occupational dusts and chemical vapor inhalation',
      'Alpha-1 antitrypsin deficiency (genetic condition)'
    ],
    symptoms: [
      'Progressive exertional dyspnea (shortness of breath worsening over years)',
      'Chronic daily cough with clear, white, or discolored sputum',
      'Frequent respiratory infections / chest colds',
      'Morning throat clearing, wheezing, and fatigue'
    ],
    riskFactors: [
      'Heavy tobacco smoking history (pack-years)',
      'Age over 40 years',
      'Severe childhood lung infections',
      'Socioeconomic disadvantage and poor air quality'
    ],
    typesOrStages: [
      'GOLD 1 (Mild): FEV1 >= 80% predicted',
      'GOLD 2 (Moderate): 50% <= FEV1 < 80% predicted',
      'GOLD 3 (Severe): 30% <= FEV1 < 50% predicted',
      'GOLD 4 (Very Severe): FEV1 < 30% predicted'
    ],
    diagnosticMethods: [
      'Post-bronchodilator spirometry demonstrating FEV1/FVC ratio < 0.70',
      'High-Resolution Computed Tomography (HRCT) of the chest',
      'Pulse oximetry and arterial blood gas (ABG) analysis',
      'Serum Alpha-1 Antitrypsin level test'
    ],
    treatmentApproaches: [
      'Smoking cessation (the single most effective intervention to halt progression)',
      'Inhaled Long-Acting Muscarinic Antagonists (LAMA - Tiotropium, Umeclidinium)',
      'Inhaled Long-Acting Beta2-Agonists (LABA - Indacaterol, Olodaterol)',
      'Triple therapy (ICS + LAMA + LABA) for frequent exacerbators',
      'Pulmonary rehabilitation and supplemental long-term oxygen therapy (LTOT) for chronic hypoxemia'
    ],
    prevention: [
      'Never smoking or prompt cessation of all tobacco and vaping products',
      'Venting biomass stoves to outside air in rural households',
      'Vaccination against influenza, pneumococcus, RSV, and COVID-19'
    ],
    lifestyleRecommendations: [
      'Pursed-lip breathing and diaphragmatic breathing techniques',
      'Nutritional maintenance to avoid respiratory muscle wasting',
      'Active daily walking regimen titrated to oxygen saturation'
    ],
    whenToConsultDoctor: [
      'Persistent morning cough with sputum for 3 consecutive months',
      'Shortness of breath climbing a single flight of stairs',
      'Color change in sputum to dark yellow or green'
    ],
    emergencyWarningSigns: [
      'Severe acute breathlessness unresponsive to rescue bronchodilators',
      'Confusion, lethargy, or extreme drowsiness (signs of hypercapnia)',
      'Peripheral cyanosis and SpO2 dropping below 88%'
    ],
    references: [
      { title: 'Global Strategy for Diagnosis, Management, and Prevention of COPD', source: 'GOLD (Global Initiative for Chronic Obstructive Lung Disease)' },
      { title: 'COPD Health Topic', source: 'CDC / MedlinePlus' }
    ]
  },

  // 3. Neurological Disorders
  {
    id: 'cond-5',
    name: 'Acute Ischemic Stroke & TIA',
    category: 'Neurological Disorders',
    overview: 'A stroke occurs when the blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin dying within minutes. A Transient Ischemic Attack (TIA) is a temporary blockage that serves as a high-risk warning sign for full stroke.',
    causes: [
      'Thrombosis: clot forms inside an atherosclerotic cerebral or carotid artery.',
      'Embolism: blood clot or cardiac debris travels from elsewhere (commonly left atrial appendage in atrial fibrillation).',
      'Small vessel disease (lacunar infarcts) due to chronic microvascular hypertension.'
    ],
    symptoms: [
      'Sudden numbness or weakness of the face, arm, or leg (especially on one side)',
      'Sudden confusion, trouble speaking, or slurred dysarthric speech',
      'Sudden trouble seeing in one or both eyes (amaurosis fugax, hemianopia)',
      'Sudden loss of balance, coordination, or ataxia',
      'Sudden severe headache with no known cause'
    ],
    riskFactors: [
      'Uncontrolled hypertension (leading risk factor)',
      'Atrial fibrillation and heart valve disorders',
      'Diabetes mellitus and dyslipidemia',
      'Carotid artery stenosis',
      'Tobacco smoking and sedentary lifestyle'
    ],
    typesOrStages: [
      'Transient Ischemic Attack (TIA): symptoms resolve within 24 hours without permanent infarction on MRI',
      'Ischemic Stroke: acute thrombosis or embolism (87% of all strokes)',
      'Hemorrhagic Stroke: intracerebral hemorrhage or subarachnoid hemorrhage'
    ],
    diagnosticMethods: [
      'Non-contrast CT Brain to rule out intracranial hemorrhage immediately',
      'Diffusion-Weighted MRI Brain (gold standard for early acute ischemia)',
      'CT Angiography / MR Angiography of head and neck vessels',
      'Transthoracic / Transesophageal Echocardiography and telemetry for Atrial Fibrillation'
    ],
    treatmentApproaches: [
      'Intravenous Thrombolysis (IV Alteplase / Tenecteplase) within 4.5 hours of symptom onset',
      'Mechanical Thrombectomy for Large Vessel Occlusion (LVO) up to 24 hours in selected patients',
      'Secondary prevention: Antiplatelets (Aspirin, Clopidogrel) or Anticoagulants (DOACs for AFib)',
      'Neuro-rehabilitation (physiotherapy, occupational therapy, speech and swallowing therapy)'
    ],
    prevention: [
      'Rigorous control of blood pressure below 130/80 mmHg',
      'Detection and anticoagulation of non-valvular atrial fibrillation',
      'Carotid endarterectomy or stenting for high-grade carotid stenosis'
    ],
    lifestyleRecommendations: [
      'Follow the BE-FAST acronym: Balance, Eyes, Face, Arms, Speech, Time',
      'Engage in daily aerobic exercise and eliminate smoking completely'
    ],
    whenToConsultDoctor: [
      'Any transient episode of numbness, tingling, or visual blackout even if it resolves within minutes'
    ],
    emergencyWarningSigns: [
      'FACE: One side of the face droops when smiling',
      'ARMS: One arm drifts downward when both arms are raised',
      'SPEECH: Slurred or strange speech',
      'TIME: Call emergency services (108 / 911) IMMEDIATELY. Time lost is brain lost.'
    ],
    references: [
      { title: 'Guidelines for the Early Management of Patients with Acute Ischemic Stroke', source: 'AHA / ASA' },
      { title: 'Stroke Fact Sheet', source: 'World Health Organization (WHO)' }
    ]
  },
  {
    id: 'cond-6',
    name: 'Migraine Disorder',
    category: 'Neurological Disorders',
    overview: 'Migraine is a neurovascular brain disorder characterized by recurrent attacks of moderate-to-severe throbbing or pulsating unilateral headache, typically aggravated by routine physical activity and accompanied by nausea, photophobia, and phonophobia.',
    causes: [
      'Complex genetic and environmental neurochemical alterations',
      'Cortical spreading depression (wave of neuronal depolarization generating aura)',
      'Trigeminovascular system activation releasing calcitonin gene-related peptide (CGRP)'
    ],
    symptoms: [
      'Intense pulsating or throbbing head pain, often unilateral',
      'Aura (visual scintillating scotomas, zigzag flashing lights, sensory numbness) in ~25%',
      'Extreme sensitivity to light (photophobia) and sound (phonophobia)',
      'Nausea, vomiting, and gastric stasis',
      'Postdrome: feeling drained, brain fog, and muscle aches for 24-48 hours'
    ],
    riskFactors: [
      'Strong family history (first-degree relative increases risk threefold)',
      'Female sex (3 times more common due to estrogen fluctuations)',
      'High stress levels, sleep irregularities, and skipping meals',
      'Sensory triggers (bright flashing lights, strong perfumes, weather changes)'
    ],
    typesOrStages: [
      'Migraine without Aura (Common Migraine)',
      'Migraine with Aura (Classic Migraine)',
      'Chronic Migraine (headache >= 15 days/month for > 3 months, with migraine features on >= 8 days)',
      'Hemiplegic / Retinal / Vestibular Migraine variants'
    ],
    diagnosticMethods: [
      'Clinical diagnosis based on International Classification of Headache Disorders (ICHD-3) criteria',
      'Brain MRI / MRA recommended only when atypical features, focal neurological deficits, or sudden "thunderclap" onset exist'
    ],
    treatmentApproaches: [
      'Acute abortive therapy: Triptans (Sumatriptan, Rizatriptan), Gepants (Rimegepant, Ubrogepant)',
      'NSAIDs (Naproxen, Ibuprofen) combined with antiemetics (Metoclopramide)',
      'Prophylactic therapy: Beta-blockers (Propranolol), Topiramate, Amitriptyline',
      'CGRP monoclonal antibodies (Erenumab, Galcanezumab, Fremanezumab) or Botulinum toxin A for chronic migraine'
    ],
    prevention: [
      'Maintaining headache diary to identify individual dietary or environmental triggers',
      'Strict sleep hygiene and consistent meal timings',
      'Adequate hydration (2–3 liters daily)'
    ],
    lifestyleRecommendations: [
      'Rest in a quiet, dark, well-ventilated room during acute attacks',
      'Apply cold compresses to forehead or back of neck'
    ],
    whenToConsultDoctor: [
      'Headaches occurring more than 3-4 days per month',
      'Over-the-counter painkillers needed more than twice a week',
      'Headaches causing missed work or significant disability'
    ],
    emergencyWarningSigns: [
      'Sudden "thunderclap" headache reaching maximal severity in under 1 minute',
      'Headache accompanied by high fever, stiff neck, confusion, or rash',
      'New headache starting after age 50 or in someone with cancer or immunosuppression'
    ],
    references: [
      { title: 'The International Classification of Headache Disorders, 3rd edition (ICHD-3)', source: 'International Headache Society' },
      { title: 'Migraine Information Page', source: 'National Institute of Neurological Disorders and Stroke (NINDS)' }
    ]
  },

  // 4. Digestive System Diseases
  {
    id: 'cond-7',
    name: 'Gastroesophageal Reflux Disease (GERD)',
    category: 'Digestive System Diseases',
    overview: 'GERD is a chronic digestive disease that occurs when stomach acid or stomach content frequently flows back into the esophagus. The repeated backwash irritates and inflames the esophageal mucosal lining, producing heartburn and regurgitation.',
    causes: [
      'Transient lower esophageal sphincter (LES) relaxations',
      'Hiatal hernia (stomach protruding above the diaphragm)',
      'Delayed gastric emptying or elevated intra-abdominal pressure (obesity, pregnancy)'
    ],
    symptoms: [
      'Heartburn: retrosternal burning sensation after meals, often worse when lying down',
      'Acid regurgitation of sour or bitter fluid into the pharynx',
      'Dysphagia (difficulty swallowing) or sensation of a lump in the throat (globus)',
      'Chronic dry cough, hoarseness of voice, or asthma exacerbations'
    ],
    riskFactors: [
      'Obesity and central abdominal adiposity',
      'Pregnancy',
      'Smoking and alcohol consumption',
      'Diets high in fried, spicy, citrus, chocolate, or caffeinated items',
      'Eating large meals within 2–3 hours of sleeping'
    ],
    typesOrStages: [
      'Non-erosive reflux disease (NERD)',
      'Erosive esophagitis (Los Angeles Classification Grades A to D)',
      'Barrett’s Esophagus (premalignant intestinal metaplasia)',
      'Esophageal stricture'
    ],
    diagnosticMethods: [
      'Upper Gastrointestinal Endoscopy (Esophagogastroduodenoscopy - EGD)',
      '24-hour ambulatory esophageal pH-impedance monitoring (gold standard)',
      'High-resolution esophageal manometry'
    ],
    treatmentApproaches: [
      'Proton Pump Inhibitors (PPIs) such as Esomeprazole, Pantoprazole, Omeprazole taken 30-60 mins before breakfast',
      'H2 receptor blockers (Famotidine) for nocturnal breakthrough acid',
      'Alginate-based oral antacids for barrier protection',
      'Anti-reflux surgery: Laparoscopic Nissen Fundoplication or magnetic sphincter augmentation (LINX)'
    ],
    prevention: [
      'Elevate head of bed by 6–8 inches (15–20 cm) using bed risers',
      'Avoid lying supine for at least 3 hours after food intake',
      'Weight reduction and avoiding tight-fitting waist garments'
    ],
    lifestyleRecommendations: [
      'Eat smaller, more frequent meals rather than heavy dinners',
      'Limit intake of peppermint, onions, garlic, chocolate, and carbonated sodas'
    ],
    whenToConsultDoctor: [
      'Heartburn symptoms occurring more than twice a week',
      'Over-the-counter antacids failing to relieve symptoms after 14 days'
    ],
    emergencyWarningSigns: [
      'Food getting stuck in the chest when swallowing (progressive dysphagia)',
      'Vomiting blood (hematemesis) or passing dark black tarry stools (melena)',
      'Severe radiating chest pain (must rule out acute myocardial infarction)'
    ],
    references: [
      { title: 'ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease', source: 'American College of Gastroenterology (2022)' },
      { title: 'Acid Reflux & GERD Information', source: 'NHS UK / MedlinePlus' }
    ]
  },

  // 5. Skin Diseases
  {
    id: 'cond-8',
    name: 'Atopic Dermatitis (Eczema)',
    category: 'Skin Diseases',
    overview: 'Atopic Dermatitis is a chronic, pruritic inflammatory skin disease characterized by skin barrier dysfunction, immune dysregulation, and recurrent flare-ups of dry, red, itchy, and lichenified cutaneous lesions.',
    causes: [
      'Genetic mutations in the Filaggrin (FLG) gene causing defective epidermal barrier function',
      'Th2-skewed immune response with hyper-reactive cutaneous cytokine cascades',
      'Altered cutaneous microbiome with Staphylococcus aureus colonization'
    ],
    symptoms: [
      'Intense pruritus (itching) often severe at night leading to sleep disturbance',
      'Erythematous, dry, scaly patches on flexural creases (antecubital and popliteal fossae)',
      'Excoriations, weeping crusts, and lichenification (thickened leather-like skin)'
    ],
    riskFactors: [
      'Personal or family history of the atopic triad (eczema, allergic rhinitis, asthma)',
      'Living in cold, dry climates or highly urbanized environments',
      'Frequent exposure to harsh detergents, wool, fragrances, and chlorine'
    ],
    typesOrStages: [
      'Infantile Atopic Dermatitis (predominantly facial and extensor surfaces)',
      'Childhood Atopic Dermatitis (flexural creases)',
      'Adult Atopic Dermatitis (diffuse, hands, eyelids, neck)'
    ],
    diagnosticMethods: [
      'Clinical diagnosis based on Hanifin and Rajka criteria',
      'Skin biopsy rarely needed (only to rule out cutaneous T-cell lymphoma or psoriasis)',
      'Serum IgE level and patch testing for allergic contact dermatitis overlays'
    ],
    treatmentApproaches: [
      'Daily emollient barrier repair creams (ceramide-containing moisturizers)',
      'Topical corticosteroids (Hydrocortisone, Betamethasone, Clobetasol) for active flare-ups',
      'Topical calcineurin inhibitors (Tacrolimus, Pimecrolimus) for delicate areas like face and eyelids',
      'Targeted biologics (Dupilumab - anti-IL-4/13) and oral JAK inhibitors (Upadacitinib) for moderate-to-severe disease'
    ],
    prevention: [
      'Soak-and-seal method: apply thick moisturizer within 3 minutes of a lukewarm bath',
      'Wear 100% breathable soft cotton clothing; avoid synthetic fabrics and wool'
    ],
    lifestyleRecommendations: [
      'Keep fingernails short and clean to minimize scratch-induced bacterial inoculations',
      'Use gentle non-soap lipid-free synthetic cleansing bars (syndets)'
    ],
    whenToConsultDoctor: [
      'Skin itching disrupts sleep or daily functioning',
      'Over-the-counter moisturizers and mild cortisone creams fail to control symptoms'
    ],
    emergencyWarningSigns: [
      'Punched-out grouped blisters or pustules accompanied by fever (Eczema Herpeticum - medical emergency)',
      'Rapidly spreading redness, warmth, and purulent yellow crusting (Cellulitis/Staph infection)'
    ],
    references: [
      { title: 'Guidelines of Care for the Management of Atopic Dermatitis', source: 'American Academy of Dermatology (AAD)' },
      { title: 'Eczema / Atopic Dermatitis Overview', source: 'National Eczema Association' }
    ]
  },

  // 6. Kidney Diseases
  {
    id: 'cond-9',
    name: 'Chronic Kidney Disease (CKD)',
    category: 'Kidney Diseases',
    overview: 'Chronic Kidney Disease is the progressive, irreversible loss of renal function over months or years, leading to fluid accumulation, electrolyte imbalances, toxin buildup (uremia), and cardiovascular complications.',
    causes: [
      'Diabetic nephropathy (leading cause worldwide)',
      'Hypertensive nephrosclerosis',
      'Chronic glomerulonephritis and IgA nephropathy',
      'Polycystic kidney disease (PKD) and chronic pyelonephritis',
      'Long-term nephrotoxic drug ingestion (NSAIDs, aminoglycosides)'
    ],
    symptoms: [
      'Early stages: completely asymptomatic (silent progression)',
      'Periorbital puffiness and dependent bilateral pedal edema (swollen ankles)',
      'Fatigue, pallor, and malaise secondary to renal anemia',
      'Nocturia or changes in urine volume and foamy/frothy urine (proteinuria)',
      'Metallic taste in mouth, anorexia, nausea, and persistent generalized pruritus'
    ],
    riskFactors: [
      'Long-standing poorly controlled Diabetes (Type 1 or 2)',
      'Uncontrolled arterial Hypertension',
      'Age over 60 years',
      'Family history of end-stage renal disease'
    ],
    typesOrStages: [
      'Stage 1: Normal or high eGFR (>= 90 mL/min) with kidney damage/proteinuria',
      'Stage 2: Mild eGFR reduction (60–89 mL/min)',
      'Stage 3a & 3b: Moderate eGFR reduction (30–59 mL/min)',
      'Stage 4: Severe eGFR reduction (15–29 mL/min)',
      'Stage 5: Kidney failure / End-Stage Renal Disease (eGFR < 15 mL/min)'
    ],
    diagnosticMethods: [
      'Serum Creatinine with Estimated Glomerular Filtration Rate (eGFR)',
      'Urine Albumin-to-Creatinine Ratio (UACR)',
      'Renal Ultrasonography (assessing kidney size, cortical thickness, and echogenicity)',
      'Serum electrolytes (potassium, sodium, bicarbonate), calcium, and phosphate'
    ],
    treatmentApproaches: [
      'Renoprotection: SGLT2 inhibitors (Dapagliflozin, Empagliflozin) and ACEi/ARBs',
      'Non-steroidal mineralocorticoid receptor antagonists (Finerenone)',
      'Strict blood pressure control (< 120–130 mmHg systolic)',
      'Erythropoiesis-stimulating agents (ESA) and iron supplements for anemia',
      'Renal Replacement Therapy: Hemodialysis, Peritoneal Dialysis, or Kidney Transplantation for Stage 5'
    ],
    prevention: [
      'Annual screening of eGFR and UACR in all patients with diabetes or hypertension',
      'Strict avoidance of over-the-counter NSAIDs (Ibuprofen, Diclofenac)',
      'Maintain adequate hydration and low-sodium diet (< 2g/day)'
    ],
    lifestyleRecommendations: [
      'Dietary protein restriction (0.6–0.8 g/kg/day under nephrology guidance)',
      'Monitor serum potassium and limit high-potassium foods if levels rise'
    ],
    whenToConsultDoctor: [
      'Persistent foamy urine or swelling around eyes upon waking',
      'Rising blood pressure unresponsive to usual medications'
    ],
    emergencyWarningSigns: [
      'Severe shortness of breath when lying flat (acute pulmonary edema)',
      'Severe hyperkalemia (> 6.0 mEq/L) causing cardiac palpitations or weakness',
      'Confusion, severe nausea, and persistent vomiting (uremic encephalopathy)'
    ],
    references: [
      { title: 'KDIGO Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease', source: 'Kidney Disease: Improving Global Outcomes' },
      { title: 'Chronic Kidney Disease Basics', source: 'CDC / National Kidney Foundation' }
    ]
  },

  // 7. Liver Diseases
  {
    id: 'cond-10',
    name: 'Non-Alcoholic Fatty Liver Disease (MASLD)',
    category: 'Liver Diseases',
    overview: 'Metabolic Dysfunction-Associated Steatotic Liver Disease (formerly NAFLD) involves excessive triglyceride accumulation in hepatocytes (> 5% of liver weight) without significant alcohol consumption, strongly linked to insulin resistance, obesity, and dyslipidemia.',
    causes: [
      'Insulin resistance causing unchecked lipolysis and increased free fatty acid delivery to the liver',
      'High dietary intake of refined carbohydrates, saturated fats, and high-fructose corn syrup',
      'Sedentary lifestyle and impaired hepatic beta-oxidation'
    ],
    symptoms: [
      'Most individuals are asymptomatic until advanced stages',
      'Dull aching discomfort or fullness in the right upper quadrant (RUQ) of the abdomen',
      'Chronic unexplained fatigue and lethargy',
      'Hepatomegaly on physical examination'
    ],
    riskFactors: [
      'Body Mass Index (BMI) >= 25 kg/m² (or >= 23 in Asian populations)',
      'Type 2 Diabetes Mellitus and Impaired Glucose Tolerance',
      'High serum triglycerides and low HDL cholesterol',
      'Metabolic syndrome and Polycystic Ovary Syndrome (PCOS)'
    ],
    typesOrStages: [
      'Simple Steatosis (MASL - isolated hepatic fat without significant inflammation)',
      'MASH (Metabolic Dysfunction-Associated Steatohepatitis - inflammation and hepatocyte ballooning)',
      'Hepatic Fibrosis (Stages F1 to F3)',
      'Cirrhosis (Stage F4 - extensive scarring and architectural distortion)'
    ],
    diagnosticMethods: [
      'Abdominal Ultrasound (bright liver echogenicity)',
      'Liver function tests: ALT and AST elevations (ALT often higher than AST)',
      'Transient Elastography (FibroScan) to quantify hepatic steatosis (CAP score) and stiffness (kPa)',
      'FIB-4 Index blood score calculation',
      'Liver Biopsy (gold standard for confirming steatohepatitis and fibrosis stage)'
    ],
    treatmentApproaches: [
      'Lifestyle-induced weight loss: 7–10% body weight reduction resolves steatohepatitis in over 80%',
      'GLP-1 Receptor Agonists (Semaglutide, Tirzepatide) and SGLT2 inhibitors',
      'Resmetirom (THR-beta selective agonist approved for non-cirrhotic MASH with moderate-to-advanced fibrosis)',
      'Cardiovascular risk mitigation: Statins for dyslipidemia'
    ],
    prevention: [
      'Eliminate sugar-sweetened beverages and ultra-processed foods',
      'Adhere to Mediterranean dietary pattern rich in monounsaturated olive oil and nuts',
      'Engage in at least 150–300 minutes of moderate physical exercise per week'
    ],
    lifestyleRecommendations: [
      'Zero or strictly minimal alcohol consumption to avoid dual-etiology liver injury',
      'Drink 2–3 cups of unsweetened black coffee daily (demonstrated hepatoprotective effect)'
    ],
    whenToConsultDoctor: [
      'Routine blood work showing unexplained elevated ALT / AST levels',
      'Ultrasound report noting "Grade 1 or Grade 2 Fatty Liver"'
    ],
    emergencyWarningSigns: [
      'Yellow discoloration of eyes and skin (Jaundice)',
      'Abdominal distension with fluid (Ascites) or bilateral leg swelling',
      'Vomiting blood or altered mental state (hepatic encephalopathy)'
    ],
    references: [
      { title: 'AASLD Practice Guidance on Non-Alcoholic Fatty Liver Disease', source: 'Hepatology / AASLD' },
      { title: 'Global Multi-Society Consensus on Nomenclature for Steatotic Liver Disease', source: 'Journal of Hepatology' }
    ]
  },

  // 8. Bone and Joint Disorders
  {
    id: 'cond-11',
    name: 'Osteoarthritis (OA)',
    category: 'Bone and Joint Disorders',
    overview: 'Osteoarthritis is the most common degenerative joint disease, involving progressive breakdown of articular cartilage, underlying subchondral bone remodeling, osteophyte formation, and synovial inflammation, leading to pain and functional impairment.',
    causes: [
      'Mechanical wear and tear combined with cellular senescence and chondrocyte failure',
      'Biomechanical joint malalignment or prior traumatic injury (post-traumatic OA)',
      'Age-associated degradation of extracellular proteoglycans and type II collagen'
    ],
    symptoms: [
      'Joint pain aggravated by activity and weight-bearing, relieved by rest',
      'Morning joint stiffness lasting less than 30 minutes',
      'Crepitus (grating or crackling sensation) during joint movement',
      'Joint enlargement, bony spurs (Heberden\'s and Bouchard\'s nodes on fingers)',
      'Decreased range of motion and joint instability'
    ],
    riskFactors: [
      'Advancing age (most prevalent > 50 years)',
      'Female gender',
      'Obesity (increases load on knee and hip joints and produces systemic inflammatory adipokines)',
      'Repetitive occupational kneeling, squatting, or heavy lifting'
    ],
    typesOrStages: [
      'Kellgren-Lawrence Grade 1: Doubtful joint space narrowing and possible osteophytes',
      'Grade 2: Definite osteophytes with unimpaired joint space',
      'Grade 3: Moderate osteophytes and definite joint space narrowing',
      'Grade 4: Severe joint space narrowing with subchondral sclerosis'
    ],
    diagnosticMethods: [
      'Weight-bearing plain radiographs (X-rays) of knees, hips, or hands',
      'Clinical assessment of joint tenderness and range of motion',
      'Synovial fluid analysis to exclude crystal arthropathy (gout/pseudogout) or septic arthritis'
    ],
    treatmentApproaches: [
      'First-line topical NSAIDs (Diclofenac gel) to minimize systemic side effects',
      'Oral NSAIDs (Celecoxib, Naproxen) taken at lowest effective dose with gastroprotection',
      'Intra-articular corticosteroid injections for acute inflammatory flare-ups',
      'Supervised physical therapy and quadriceps strengthening exercises',
      'Total Joint Arthroplasty (hip or knee replacement) for end-stage refractory disability'
    ],
    prevention: [
      'Weight management: 1 lb of weight loss reduces 4 lbs of pressure on knee joints',
      'Low-impact aerobic exercises: swimming, stationary cycling, water aerobics',
      'Avoidance of repetitive joint trauma and improper lifting posture'
    ],
    lifestyleRecommendations: [
      'Use assistive walking devices (cane held in contralateral hand) when needed',
      'Wear supportive, cushioned footwear without elevated heels'
    ],
    whenToConsultDoctor: [
      'Persistent joint pain limiting walking, stairs, or self-care',
      'Recurrent joint swelling or feeling of joint "giving way"'
    ],
    emergencyWarningSigns: [
      'Sudden onset of hot, red, intensely swollen joint with fever (rule out Septic Arthritis)',
      'Inability to bear any weight on the leg after a fall (rule out fracture)'
    ],
    references: [
      { title: 'OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis', source: 'Osteoarthritis and Cartilage' },
      { title: 'Osteoarthritis Clinical Review', source: 'Mayo Clinic / CDC' }
    ]
  },

  // 9. Eye Diseases
  {
    id: 'cond-12',
    name: 'Glaucoma (Primary Open-Angle & Angle-Closure)',
    category: 'Eye Diseases',
    overview: 'Glaucoma is a group of progressive optic neuropathies characterized by optic nerve head cupping, retinal ganglion cell apoptosis, and irreversible peripheral visual field loss, often linked to elevated intraocular pressure (IOP).',
    causes: [
      'Impaired trabecular meshwork aqueous outflow leading to increased IOP in Open-Angle Glaucoma',
      'Anatomical iridocorneal angle blockage in Acute Angle-Closure Glaucoma',
      'Optic nerve microvascular insufficiency'
    ],
    symptoms: [
      'Open-angle: asymptomatic in early to moderate stages ("sneak thief of sight")',
      'Gradual bilateral loss of peripheral (tunnel) vision',
      'Acute Angle-Closure: sudden severe ocular pain, headache, nausea, vomiting, rainbow halos around lights, and red eye'
    ],
    riskFactors: [
      'Intraocular pressure > 21 mmHg',
      'Age over 40 (especially >= 60)',
      'Family history of glaucoma in immediate family',
      'High myopia (nearsightedness) or thin central corneal thickness (< 555 µm)',
      'Prolonged topical or systemic corticosteroid therapy'
    ],
    typesOrStages: [
      'Primary Open-Angle Glaucoma (POAG - 90% of cases)',
      'Acute Angle-Closure Glaucoma (ophthalmic emergency)',
      'Normal-Tension Glaucoma (NTG - optic nerve damage despite IOP <= 21 mmHg)',
      'Secondary Glaucomas (neovascular, pseudoexfoliative, pigmentary)'
    ],
    diagnosticMethods: [
      'Goldmann Applanation Tonometry for intraocular pressure measurement',
      'Dilated Fundus Examination assessing Cup-to-Disc ratio (> 0.6 or asymmetry)',
      'Optical Coherence Tomography (OCT) of Retinal Nerve Fiber Layer (RNFL)',
      'Automated Humphrey Visual Field Perimetry (24-2 or 30-2)',
      'Gonioscopy to evaluate anterior chamber angle opening'
    ],
    treatmentApproaches: [
      'Prostaglandin analog eye drops (Latanoprost, Bimatoprost, Travoprost) first-line',
      'Beta-blocker eye drops (Timolol) and Alpha-2 agonists (Brimonidine)',
      'Selective Laser Trabeculoplasty (SLT) to enhance natural drainage',
      'Minimally Invasive Glaucoma Surgery (MIGS) or Trabeculectomy filtering surgery'
    ],
    prevention: [
      'Regular comprehensive dilated eye examinations every 1–2 years after age 40',
      'Consistent daily adherence to prescribed pressure-lowering eye drops'
    ],
    lifestyleRecommendations: [
      'Avoid head-down inverted yoga postures or tight neckties which spike IOP',
      'Wear protective eye gear during racquet sports or DIY carpentry'
    ],
    whenToConsultDoctor: [
      'Difficulty seeing objects out of the corner of your eyes',
      'Frequent changes in eyeglass prescriptions'
    ],
    emergencyWarningSigns: [
      'Sudden excruciating eye pain accompanied by severe headache, nausea, and cloudy cornea — Requires emergency eye care within hours to prevent permanent blindness'
    ],
    references: [
      { title: 'Primary Open-Angle Glaucoma Preferred Practice Pattern', source: 'American Academy of Ophthalmology (AAO)' },
      { title: 'Glaucoma: MedlinePlus Medical Encyclopedia', source: 'U.S. National Library of Medicine' }
    ]
  },

  // 10. Ear, Nose and Throat
  {
    id: 'cond-13',
    name: 'Acute and Chronic Sinusitis (Rhinosinusitis)',
    category: 'Ear, Nose and Throat Conditions',
    overview: 'Sinusitis is inflammation of the mucosal lining of the paranasal sinuses and nasal cavity. It leads to sinus ostia obstruction, impaired mucociliary clearance, mucus retention, and secondary bacterial or fungal infections.',
    causes: [
      'Viral upper respiratory tract infections (rhinovirus, influenza, adenovirus)',
      'Secondary bacterial superinfection (Streptococcus pneumoniae, Haemophilus influenzae)',
      'Allergic rhinitis and airborne allergens',
      'Anatomical defects: deviated nasal septum, nasal polyps, or concha bullosa'
    ],
    symptoms: [
      'Facial pain, pressure, or fullness (worse when bending forward)',
      'Purulent (thick green/yellow) anterior or posterior nasal discharge',
      'Nasal obstruction, congestion, and difficulty breathing through nose',
      'Hyposmia (diminished sense of smell) or anosmia',
      'Maxillary toothache, fever, and fatigue'
    ],
    riskFactors: [
      'Untreated allergic rhinitis or asthma',
      'Tobacco smoke exposure and dry indoor environments',
      'Gastroesophageal reflux into the nasopharynx'
    ],
    typesOrStages: [
      'Acute Rhinosinusitis: symptoms last < 4 weeks (most viral resolve in 7–10 days)',
      'Subacute Rhinosinusitis: symptoms last 4 to 12 weeks',
      'Chronic Rhinosinusitis: symptoms persist for >= 12 weeks without complete resolution',
      'Recurrent Acute Rhinosinusitis: >= 4 episodes per year'
    ],
    diagnosticMethods: [
      'Anterior rhinoscopy and rigid diagnostic nasal endoscopy',
      'Non-contrast CT scan of paranasal sinuses (coronal view - gold standard for chronic disease)',
      'Allergy testing and culture of endoscopically directed middle meatal aspirate'
    ],
    treatmentApproaches: [
      'High-volume isotonic or hypertonic saline nasal irrigation (neti pot or squeeze bottle)',
      'Intranasal corticosteroid sprays (Fluticasone, Mometasone)',
      'Short-course oral antibiotics (Amoxicillin-Clavulanate) only for confirmed bacterial disease (> 10 days of symptoms or "double sickening")',
      'Functional Endoscopic Sinus Surgery (FESS) for refractory chronic or polypoid disease'
    ],
    prevention: [
      'Use humidifiers in dry winter air and maintain sinus hydration',
      'Promptly manage seasonal allergies with antihistamines and nasal sprays'
    ],
    lifestyleRecommendations: [
      'Drink plenty of warm fluids and inhale steam with eucalyptus',
      'Avoid oral decongestants (pseudoephedrine) if you have uncontrolled hypertension'
    ],
    whenToConsultDoctor: [
      'Symptoms lasting longer than 10 days without any improvement',
      'Fever recurring after initial recovery from a cold'
    ],
    emergencyWarningSigns: [
      'Swelling, redness, or tenderness around one or both eyes (orbital cellulitis risk)',
      'Severe frontal headache, neck stiffness, or double vision (intracranial spread)'
    ],
    references: [
      { title: 'Clinical Practice Guideline: Adult Sinusitis', source: 'American Academy of Otolaryngology–Head and Neck Surgery' },
      { title: 'Sinusitis Information', source: 'CDC / NHS' }
    ]
  },

  // 11. Diabetes and Endocrine Disorders
  {
    id: 'cond-14',
    name: 'Type 2 Diabetes Mellitus',
    category: 'Diabetes and Endocrine Disorders',
    overview: 'Type 2 Diabetes is a metabolic disorder characterized by progressive peripheral insulin resistance coupled with relative beta-cell secretory deficiency, resulting in chronic hyperglycemia and microvascular and macrovascular damage.',
    causes: [
      'Genetic polygenic susceptibility interacting with lifestyle triggers',
      'Skeletal muscle and hepatic insulin resistance exacerbated by visceral adiposity',
      'Beta-cell exhaustion, amyloid deposition, and reduced incretin effect'
    ],
    symptoms: [
      'Polyuria (excessive urination, frequent night urination)',
      'Polydipsia (increased thirst) and polyphagia (frequent hunger)',
      'Unexplained weight loss despite normal appetite',
      'Blurred vision and slow-healing cutaneous cuts or sores',
      'Acanthosis nigricans (velvety hyperpigmentation on neck and axillae)'
    ],
    riskFactors: [
      'Overweight or obesity (BMI >= 25, or >= 23 in South Asian populations)',
      'Sedentary lifestyle with minimal physical activity',
      'Prediabetes (HbA1c 5.7–6.4% or Fasting Blood Sugar 100–125 mg/dL)',
      'History of gestational diabetes or polycystic ovary syndrome (PCOS)',
      'First-degree relative with Type 2 Diabetes'
    ],
    typesOrStages: [
      'Normal: Fasting Glucose < 100 mg/dL, HbA1c < 5.7%',
      'Prediabetes: Fasting Glucose 100–125 mg/dL, HbA1c 5.7–6.4%',
      'Diabetes Mellitus: Fasting Glucose >= 126 mg/dL, HbA1c >= 6.5%, or Random Glucose >= 200 mg/dL with symptoms'
    ],
    diagnosticMethods: [
      'Fasting Plasma Glucose (FPG) after an 8-hour fast',
      'Glycated Hemoglobin (HbA1c) using an NGSP-certified assay',
      '75g 2-hour Oral Glucose Tolerance Test (OGTT)',
      'Random plasma glucose with classic osmotic symptoms'
    ],
    treatmentApproaches: [
      'First-line pharmacotherapy: Metformin (reduces hepatic gluconeogenesis)',
      'SGLT2 inhibitors (Empagliflozin, Dapagliflozin) for cardiorenal protection',
      'GLP-1 receptor agonists (Semaglutide, Dulaglutide) providing potent glycemic control and weight reduction',
      'DPP-4 inhibitors, Sulfonylureas, Pioglitazone, or Basal/Bolus Insulin regimens'
    ],
    prevention: [
      'Intensive lifestyle modification: 7% body weight loss and 150 minutes of weekly brisk walking reduces diabetes risk by 58%',
      'Replace refined carbs with dietary fiber, whole grains, legumes, and lean proteins'
    ],
    lifestyleRecommendations: [
      'Continuous Glucose Monitoring (CGM) or fingerstick monitoring as advised',
      'Annual dilated eye exam, annual urine microalbumin check, and daily foot inspections'
    ],
    whenToConsultDoctor: [
      'Home glucose readings consistently above 140 mg/dL fasting or 180 mg/dL post-meal',
      'Tingling, burning, or loss of sensation in toes or feet (diabetic neuropathy)'
    ],
    emergencyWarningSigns: [
      'Hypoglycemia (Blood glucose < 70 mg/dL) causing shakiness, sweating, confusion — ingest 15g fast-acting sugar immediately',
      'Hyperglycemic Hyperosmolar State (HHS) or Diabetic Ketoacidosis (DKA): glucose > 300 mg/dL with severe dehydration, rapid breathing, vomiting, or confusion'
    ],
    references: [
      { title: 'Standards of Care in Diabetes', source: 'American Diabetes Association (ADA 2024)' },
      { title: 'Diabetes Mellitus Global Report', source: 'World Health Organization (WHO)' }
    ]
  },

  // 12. Infectious Diseases
  {
    id: 'cond-15',
    name: 'Dengue Fever',
    category: 'Infectious Diseases',
    overview: 'Dengue is a mosquito-borne tropical viral disease caused by one of four Dengue virus serotypes (DENV-1 to DENV-4), transmitted by female Aedes aegypti and Aedes albopictus mosquitoes, capable of progressing to severe dengue hemorrhagic fever.',
    causes: [
      'Bite of infected female Aedes mosquitoes (daytime biters, breeding in clean standing water)',
      'Secondary infection with a heterologous DENV serotype causing antibody-dependent enhancement (ADE)'
    ],
    symptoms: [
      'Sudden high fever (104°F / 40°C)',
      'Severe retro-orbital (behind the eyes) pain',
      'Severe bone, joint, and muscle pain ("breakbone fever")',
      'Maculopapular rash spreading from trunk to limbs',
      'Mild bleeding manifestations (epistaxis, petechiae, bleeding gums)'
    ],
    riskFactors: [
      'Living in or traveling to tropical and subtropical climates',
      'Presence of stagnant water containers near residences',
      'Previous dengue infection (elevates risk of severe dengue on re-infection)'
    ],
    typesOrStages: [
      'Febrile Phase (Days 1–3): high fever, intense body aches',
      'Critical Phase (Days 3–7): around defervescence when plasma leakage occurs',
      'Recovery Phase (Days 7–10): reabsorption of extravasated fluid, appetite returns',
      'Severe Dengue: Severe plasma leakage leading to Dengue Shock Syndrome (DSS), severe hemorrhage, or organ impairment'
    ],
    diagnosticMethods: [
      'Dengue NS1 Antigen ELISA (positive during days 1–5)',
      'Dengue IgM / IgG antibody serology (IgM rises from day 4–5 onwards)',
      'Serial Complete Blood Count (CBC): monitoring rising hematocrit (hemoconcentration) and falling platelet count (< 100,000/µL)'
    ],
    treatmentApproaches: [
      'Supportive rehydration therapy: oral rehydration salts (ORS), tender coconut water, isotonic fluids',
      'Antipyresis: Paracetamol (Acetaminophen) strictly; avoid Aspirin, Ibuprofen, and NSAIDs due to platelet inhibition and gastric bleed risks',
      'Intravenous crystalloids (Ringer\'s lactate / normal saline) titrated to hematocrit in the critical phase'
    ],
    prevention: [
      'Eliminate open water storage: empty flower pot saucers, buckets, and water coolers weekly',
      'Apply DEET or picaridin insect repellents to exposed skin',
      'Install window and door insect screens and wear light-colored long-sleeve clothing'
    ],
    lifestyleRecommendations: [
      'Strict bed rest during the febrile and critical phases',
      'Monitor urine output (should produce light-colored urine at least every 4–6 hours)'
    ],
    whenToConsultDoctor: [
      'Any high fever in dengue-endemic region',
      'Platelet count drops below 100,000 /µL on routine blood test'
    ],
    emergencyWarningSigns: [
      'Severe persistent abdominal pain or tenderness',
      'Persistent vomiting (> 3 times in 24 hours) or inability to keep fluids down',
      'Bleeding from gums or nose, vomiting blood, or black stools',
      'Extreme lethargy, restlessness, or cold clammy extremities — immediate hospitalization required'
    ],
    references: [
      { title: 'Dengue Guidelines for Diagnosis, Treatment, Prevention and Control', source: 'World Health Organization (WHO)' },
      { title: 'Dengue Clinical Guidance', source: 'CDC Division of Vector-Borne Diseases' }
    ]
  },

  // 13. Mental Health Conditions
  {
    id: 'cond-16',
    name: 'Major Depressive Disorder (MDD)',
    category: 'Mental Health Conditions',
    overview: 'Major Depressive Disorder is a severe, debilitating mood disorder characterized by persistent low mood, loss of interest or pleasure (anhedonia), feelings of worthlessness, cognitive impairment, and vegetative symptoms lasting at least two weeks.',
    causes: [
      'Complex biopsychosocial etiology involving monoamine neurotransmitter dysregulation (serotonin, dopamine, norepinephrine)',
      'Dysregulation of the hypothalamic-pituitary-adrenal (HPA) axis with chronic elevated cortisol',
      'Adverse childhood experiences, acute psychosocial bereavement, and chronic socioeconomic stressors'
    ],
    symptoms: [
      'Persistent sadness, emptiness, or irritable mood most of the day nearly every day',
      'Marked loss of interest or pleasure in all or almost all activities',
      'Significant unintentional weight loss or gain, appetite changes',
      'Insomnia (early morning awakenings) or hypersomnia',
      'Psychomotor agitation or retardation',
      'Fatigue and loss of energy nearly every day',
      'Diminished concentration, indecisiveness, and memory lapses'
    ],
    riskFactors: [
      'Family history of major mood disorders',
      'Co-occurring chronic medical illnesses (stroke, diabetes, cancer)',
      'Substance use disorders and chronic unmanaged pain',
      'Female gender (twice the prevalence of males)'
    ],
    typesOrStages: [
      'Mild, Moderate, or Severe Major Depressive Episode',
      'With Anxious Distress',
      'With Melancholic or Atypical Features',
      'Treatment-Resistant Depression (failure of >= 2 adequate trials of antidepressants)',
      'Postpartum Depression'
    ],
    diagnosticMethods: [
      'Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR) clinical interview',
      'Validated screening tools: Patient Health Questionnaire-9 (PHQ-9), Hamilton Depression Rating Scale (HAM-D)',
      'Medical workup to rule out endocrine etiologies: TSH, Free T4, Vitamin B12, Vitamin D, complete metabolic panel'
    ],
    treatmentApproaches: [
      'Evidence-based Psychotherapy: Cognitive Behavioral Therapy (CBT), Interpersonal Psychotherapy (IPT)',
      'First-line Pharmacotherapy: Selective Serotonin Reuptake Inhibitors (SSRIs - Escitalopram, Sertraline) or SNRIs (Venlafaxine, Duloxetine)',
      'Atypical antidepressants (Bupropion, Mirtazapine)',
      'Neuromodulation: Transcranial Magnetic Stimulation (TMS) or Electroconvulsive Therapy (ECT) for severe treatment-resistant depression'
    ],
    prevention: [
      'Early psychoeducation and cognitive reframing techniques',
      'Building strong social support networks and interpersonal relationships',
      'Prioritizing sleep architecture, balanced nutrition, and daily aerobic exercise'
    ],
    lifestyleRecommendations: [
      'Gradual behavioral activation: scheduling small manageable daily goals',
      'Mindfulness-based stress reduction and journaling',
      'Avoid using alcohol or illicit substances as self-medication'
    ],
    whenToConsultDoctor: [
      'Depressive symptoms persisting beyond 2 weeks that interfere with work, studies, or relationships'
    ],
    emergencyWarningSigns: [
      'Thoughts of suicide, self-harm, or suicide preparation — Contact National Suicide Prevention Lifelines (Tele-MANAS 14416 / 988 in USA) or go to nearest emergency room immediately'
    ],
    references: [
      { title: 'Practice Guideline for the Treatment of Patients with Major Depressive Disorder', source: 'American Psychiatric Association (APA)' },
      { title: 'Depression Fact Sheet', source: 'World Health Organization (WHO)' }
    ]
  },

  // 14. Blood Disorders
  {
    id: 'cond-17',
    name: 'Iron Deficiency Anemia (IDA)',
    category: 'Blood Disorders',
    overview: 'Iron Deficiency Anemia is a microcytic, hypochromic anemia that occurs when the body lacks sufficient iron to produce hemoglobin, compromising the oxygen-carrying capacity of red blood cells to tissues.',
    causes: [
      'Chronic blood loss: occult gastrointestinal bleeding (peptic ulcers, colon polyps, malignancy, hookworm), or heavy menstrual bleeding (menorrhagia)',
      'Inadequate dietary iron intake (strict unsupplemented vegetarian/vegan diets)',
      'Malabsorption: Celiac disease, Helicobacter pylori gastritis, or bariatric gastric bypass surgery',
      'Increased physiological demand: pregnancy, lactation, and childhood growth spurts'
    ],
    symptoms: [
      'Generalized weakness, extreme fatigue, and decreased exercise tolerance',
      'Pallor of skin, nailbeds, and lower palpebral conjunctiva',
      'Exertional dyspnea, tachycardia, or palpitations',
      'Pica (unusual cravings for non-food items like ice, dirt, or starch)',
      'Koilonychia (brittle, spoon-shaped fingernails) and angular cheilitis'
    ],
    riskFactors: [
      'Women of childbearing age with heavy menses',
      'Infants and young children transitioning to cow\'s milk',
      'Frequent whole blood donors',
      'Elderly individuals with chronic gastrointestinal pathologies'
    ],
    typesOrStages: [
      'Stage 1: Iron depletion (low serum ferritin, normal hemoglobin and iron)',
      'Stage 2: Iron deficient erythropoiesis (low ferritin, low transferrin saturation, high TIBC)',
      'Stage 3: Overt Iron Deficiency Anemia (microcytic hypochromic indices, low Hb < 12 g/dL women, < 13 g/dL men)'
    ],
    diagnosticMethods: [
      'Complete Blood Count (CBC): Low Hemoglobin, Hematocrit, MCV (< 80 fL), and MCH',
      'Serum Ferritin (< 30 ng/mL is diagnostic of iron deficiency)',
      'Serum Iron, Total Iron Binding Capacity (TIBC), and Transferrin Saturation (< 16–20%)',
      'Endoscopic workup (Colonoscopy + Upper GI Endoscopy) in adult men and postmenopausal women to identify source of blood loss'
    ],
    treatmentApproaches: [
      'Oral elemental iron supplementation (Ferrous Sulfate, Ferrous Fumarate, Ferrous Ascorbate 100–200mg elemental iron daily or alternate-day dosing)',
      'Co-administration with Vitamin C (Ascorbic acid) to augment intestinal absorption',
      'Intravenous iron formulations (Ferric Carboxymaltose, Iron Sucrose) for intolerance, malabsorption, or severe second/third-trimester anemia',
      'Treatment of the underlying cause (e.g. polypectomy, hormonal therapy for menorrhagia)'
    ],
    prevention: [
      'Incorporate iron-rich foods: lean meats, lentils, beans, dark green leafy vegetables, tofu, and fortified cereals',
      'Avoid drinking tea or coffee simultaneously with iron-rich meals (tannins inhibit absorption)'
    ],
    lifestyleRecommendations: [
      'Continue iron therapy for 3–6 months after hemoglobin normalizes to replenish liver ferritin stores',
      'Take oral iron on an empty stomach or with orange juice for maximal absorption'
    ],
    whenToConsultDoctor: [
      'Persistent unexplainable fatigue or noticeable pale appearance of gums or eyes',
      'Restless legs syndrome sensations at night'
    ],
    emergencyWarningSigns: [
      'Severe breathlessness, chest pain, or fainting spells with exertion',
      'Black tarry stools or visible blood in the stool'
    ],
    references: [
      { title: 'Guidelines on the Identification and Management of Iron Deficiency Anemia', source: 'British Society of Gastroenterology (BSG)' },
      { title: 'Iron Deficiency Anemia: Assessment, Prevention, and Control', source: 'World Health Organization (WHO)' }
    ]
  },

  // 15. Cancer and Oncology
  {
    id: 'cond-18',
    name: 'Colorectal Carcinoma (CRC)',
    category: 'Cancer and Oncology',
    overview: 'Colorectal Cancer is a malignant neoplastic disease originating in the epithelial cells lining the colon or rectum. It almost universally develops through an adenoma-to-carcinoma sequence over 10 to 15 years.',
    causes: [
      'Sporadic somatic gene mutations (APC, KRAS, TP53 mutations causing chromosomal instability)',
      'Inherited genetic syndromes: Lynch syndrome (hereditary nonpolyposis colorectal cancer) and Familial Adenomatous Polyposis (FAP)',
      'Chronic long-standing colonic mucosal inflammation (Ulcerative Colitis, Crohn\'s Disease)'
    ],
    symptoms: [
      'Persistent change in bowel habits (diarrhea, constipation, or narrowing of stool caliber lasting > 4 weeks)',
      'Hematochezia (bright red rectal bleeding) or dark melenic stool',
      'Persistent abdominal discomfort, cramping, gas, or fullness',
      'Feeling that the bowel does not empty completely (tenesmus)',
      'Unexplained weight loss and fatigue due to iron deficiency anemia'
    ],
    riskFactors: [
      'Age >= 45 years (incidence rises sharply with age)',
      'High dietary intake of processed meats and red meats; low dietary fiber',
      'Physical inactivity, obesity, and cigarette smoking',
      'Heavy alcohol consumption',
      'Personal or family history of colorectal polyps or colorectal cancer'
    ],
    typesOrStages: [
      'Stage 0 (Carcinoma in situ): confined to mucosal layer',
      'Stage I: invaded through submucosa into muscularis propria',
      'Stage II: grown through the wall into pericolic tissues without lymph node involvement',
      'Stage III: regional mesenteric lymph node metastases',
      'Stage IV: distant hematogenous metastases (liver, lungs, peritoneum)'
    ],
    diagnosticMethods: [
      'Colonoscopy with biopsy and polypectomy (gold standard screening and diagnostic modality)',
      'Fecal Immunochemical Test (FIT) or Fecal Occult Blood Test (FOBT) annually',
      'Contrast-enhanced CT scan of chest, abdomen, and pelvis for clinical staging',
      'Carcinoembryonic Antigen (CEA) tumor marker level (for baseline and surveillance)'
    ],
    treatmentApproaches: [
      'Surgical Resection: Laparoscopic or open partial colectomy / hemicolectomy with regional lymphadenectomy',
      'Adjuvant or neoadjuvant Chemotherapy (FOLFOX, CAPOX regimens)',
      'Targeted biologic therapies (anti-VEGF Bevacizumab, anti-EGFR Cetuximab/Panitumumab)',
      'Immune Checkpoint Inhibitors (Pembrolizumab) for tumors with High Microsatellite Instability (MSI-H / dMMR)'
    ],
    prevention: [
      'Initiate regular colorectal cancer screening starting at age 45 (earlier if family history)',
      'High-fiber diet (> 30g daily) abundant in vegetables, fruits, and whole grains',
      'Limit red meat (< 3 portions/week) and avoid processed cured meats (bacon, sausages)'
    ],
    lifestyleRecommendations: [
      'Maintain healthy body weight and engage in 30 minutes of aerobic exercise daily',
      'Complete smoking cessation and moderation/abstinence from alcohol'
    ],
    whenToConsultDoctor: [
      'Any visible blood in your stool or on the toilet paper',
      'New onset of constipation or bowel changes lasting more than several weeks'
    ],
    emergencyWarningSigns: [
      'Acute complete bowel obstruction: severe colicky abdominal pain, distension, obstipation, and vomiting',
      'Massive rectal bleeding accompanied by lightheadedness and tachycardia'
    ],
    references: [
      { title: 'Colorectal Cancer Screening and Treatment Guidelines', source: 'National Comprehensive Cancer Network (NCCN)' },
      { title: 'Colorectal Cancer Fact Sheet', source: 'World Health Organization (WHO)' }
    ]
  },

  // 16. Women's Health
  {
    id: 'cond-19',
    name: 'Polycystic Ovary Syndrome (PCOS)',
    category: 'Women\'s Health',
    overview: 'Polycystic Ovary Syndrome is a complex endocrine and metabolic disorder affecting women of reproductive age, characterized by hyperandrogenism, ovulatory dysfunction, and polycystic ovarian morphology on ultrasound.',
    causes: [
      'Insulin resistance and hyperinsulinemia stimulating ovarian theca cells to overproduce androgens',
      'Hypothalamic-pituitary dysregulation with elevated luteinizing hormone (LH) pulse frequency',
      'Low-grade chronic systemic inflammation and strong polygenic familial background'
    ],
    symptoms: [
      'Oligomenorrhea (menstrual cycles > 35 days apart) or Amenorrhea (absence of periods)',
      'Hirsutism: excessive terminal coarse hair growth on chin, upper lip, chest, and lower abdomen',
      'Severe treatment-resistant cystic acne and androgenic alopecia (scalp hair thinning)',
      'Difficulty conceiving due to anovulatory infertility',
      'Rapid weight gain or extreme difficulty losing weight'
    ],
    riskFactors: [
      'First-degree relative (mother or sister) with PCOS or Type 2 Diabetes',
      'Sedentary lifestyle and visceral abdominal adiposity',
      'History of premature adrenarche in childhood'
    ],
    typesOrStages: [
      'Phenotype A: Hyperandrogenism + Ovulatory dysfunction + Polycystic ovaries (Classic)',
      'Phenotype B: Hyperandrogenism + Ovulatory dysfunction',
      'Phenotype C: Hyperandrogenism + Polycystic ovaries (Ovulatory)',
      'Phenotype D: Ovulatory dysfunction + Polycystic ovaries (Non-hyperandrogenic)'
    ],
    diagnosticMethods: [
      'Rotterdam Consensus Criteria (requires at least 2 of 3 features: oligo/anovulation, clinical/biochemical hyperandrogenism, polycystic ovaries on ultrasound)',
      'Total and Free Testosterone, DHEA-S, and 17-OHP (to exclude late-onset congenital adrenal hyperplasia)',
      'Pelvic Transvaginal Ultrasonography (>= 20 follicles per ovary measuring 2–9 mm or ovarian volume > 10 mL)',
      '75g 2-hour Oral Glucose Tolerance Test and fasting Lipid Profile'
    ],
    treatmentApproaches: [
      'Combined Oral Contraceptives (COCs) to regulate menses and suppress ovarian androgen synthesis',
      'Anti-androgens (Spironolactone, Cyproterone) for hirsutism and persistent acne',
      'Metformin or Inositol supplements to enhance insulin sensitivity and restore ovulatory cyclicity',
      'Ovulation induction: Letrozole (first-line) or Clomiphene Citrate for fertility management'
    ],
    prevention: [
      'Modest weight loss of 5–10% body weight significantly improves ovulatory function, androgen levels, and insulin resistance',
      'Low glycemic index (GI) Mediterranean-style balanced diet'
    ],
    lifestyleRecommendations: [
      'Resistance training and aerobic exercises combined to improve skeletal muscle glucose uptake',
      'Prioritize sleep hygiene to regulate circadian leptin and ghrelin satiety signaling'
    ],
    whenToConsultDoctor: [
      'Menstrual periods occurring less than 8 times in a year or missing entirely for 3 consecutive months',
      'Rapid onset of facial hair growth, deep voice, or male-pattern baldness'
    ],
    emergencyWarningSigns: [
      'Severe acute unilateral pelvic pain with vomiting (rule out Ovarian Torsion)',
      'Heavy prolonged menstrual bleeding (> 7 days) causing weakness and fainting'
    ],
    references: [
      { title: 'International Evidence-Based Guideline for the Assessment and Management of PCOS', source: 'Monash University / ESHRE / ASRM' },
      { title: 'Polycystic Ovary Syndrome Clinical Overview', source: 'American College of Obstetricians and Gynecologists (ACOG)' }
    ]
  },

  // 17. Children's Health
  {
    id: 'cond-20',
    name: 'Febrile Seizures in Children',
    category: 'Children\'s Health',
    overview: 'Febrile seizures are convulsions in young children triggered by an acute rise in body temperature (typically >= 100.4°F / 38°C), occurring without an underlying central nervous system infection or defined acute electrolyte imbalance.',
    causes: [
      'Rapid spike in body temperature interacting with an immature developing cerebral cortex',
      'Common viral infections: Roseola infantum (HHV-6), influenza, adenovirus, and enteroviruses',
      'Genetic predisposition with autosomal dominant inheritance patterns in some families'
    ],
    symptoms: [
      'Sudden loss of consciousness with stiffening of the body (tonic phase)',
      'Rhythmic jerking movements of both arms and legs (clonic phase)',
      'Rolling back of eyes and foaming at the mouth',
      'Post-ictal drowsiness or deep sleep lasting 15 to 60 minutes after seizure cessation'
    ],
    riskFactors: [
      'Age between 6 months and 5 years (peak incidence around 12–18 months)',
      'Family history of febrile seizures in parents or siblings',
      'High peak temperature (> 102°F / 39°C) and rapid rate of rise'
    ],
    typesOrStages: [
      'Simple Febrile Seizure (80-85%): generalized, lasts < 15 minutes, does not recur within 24 hours',
      'Complex Febrile Seizure: focal onset, lasts > 15 minutes, or recurs more than once within 24 hours',
      'Febrile Status Epilepticus: continuous seizure lasting >= 30 minutes'
    ],
    diagnosticMethods: [
      'Detailed clinical history and pediatric physical examination to identify source of infection (otitis media, viral pharyngitis, UTI)',
      'Lumbar puncture (LP) strongly indicated if meningeal signs (nuchal rigidity, Kernig\'s sign) or unimmunized status',
      'EEG and neuroimaging (CT/MRI) NOT routinely indicated for simple febrile seizures'
    ],
    treatmentApproaches: [
      'Immediate first aid: roll child onto their side (recovery position), cushion head, do NOT place anything in mouth',
      'Rescue anticonvulsants (Intranasal Midazolam or Rectal Diazepam) only if seizure lasts > 5 minutes',
      'Antipyretics (Paracetamol / Ibuprofen) for comfort (note: antipyretics do not prevent recurrence of seizures)',
      'Long-term daily anti-epileptic drugs are NOT recommended for simple febrile seizures'
    ],
    prevention: [
      'Promptly manage fever with loose clothing, lukewarm sponging, and hydration during febrile illnesses',
      'Ensure routine childhood immunizations are up to date'
    ],
    lifestyleRecommendations: [
      'Reassure parents: simple febrile seizures do not cause brain damage or decrease intellectual capacity; risk of developing epilepsy is only slightly higher than baseline (1–2%)'
    ],
    whenToConsultDoctor: [
      'Every first episode of seizure in a child warrants immediate medical evaluation to determine the infection source'
    ],
    emergencyWarningSigns: [
      'Seizure lasting longer than 5 minutes — call emergency medical services immediately',
      'Child is unresponsive, exhibits stiff neck, petechial purpuric rash, or persistent vomiting after the seizure'
    ],
    references: [
      { title: 'Clinical Practice Guideline: Febrile Seizures', source: 'American Academy of Pediatrics (AAP)' },
      { title: 'Febrile Seizures Fact Sheet', source: 'National Institute of Neurological Disorders and Stroke (NINDS)' }
    ]
  },

  // 18. Genetic Disorders
  {
    id: 'cond-21',
    name: 'Sickle Cell Disease (SCD)',
    category: 'Genetic Disorders',
    overview: 'Sickle Cell Disease is an inherited autosomal recessive hemoglobinopathy caused by a point mutation in the HBB gene, resulting in abnormal Hemoglobin S (HbS). Under hypoxic conditions, HbS polymerizes, causing red blood cells to deform into rigid sickle shapes that obstruct microvasculature.',
    causes: [
      'Homozygous point mutation (Glu6Val) on codon 6 of the beta-globin gene on chromosome 11 (HbSS)',
      'Double heterozygosity with Hemoglobin C (HbSC) or beta-thalassemia (HbS-beta-thal)'
    ],
    symptoms: [
      'Vaso-occlusive pain crises: excruciating bone and joint pain episodes',
      'Chronic hemolytic anemia, fatigue, and jaundice (scleral icterus)',
      'Dactylitis: painful swelling of infant hands and feet ("hand-foot syndrome")',
      'Frequent bacterial infections due to functional autosplenectomy'
    ],
    riskFactors: [
      'Inheriting the sickle gene from both biological parents (25% chance if both carry trait)',
      'Ancestry from sub-Saharan Africa, Mediterranean, Middle East, and parts of India'
    ],
    typesOrStages: [
      'HbSS (Sickle Cell Anemia - most common and severe)',
      'HbSC Disease',
      'HbS Beta-Plus / Beta-Zero Thalassemia'
    ],
    diagnosticMethods: [
      'Newborn screening programs via Isoelectric Focusing or HPLC',
      'Hemoglobin Electrophoresis or High-Performance Liquid Chromatography (HPLC)',
      'Genetic testing for HBB mutation verification',
      'Transcranial Doppler (TCD) ultrasonography annually to assess stroke risk in children'
    ],
    treatmentApproaches: [
      'Disease-modifying drug: Hydroxyurea (induces fetal hemoglobin HbF synthesis, reducing crises and mortality)',
      'Targeted agents: L-glutamine, Crizanlizumab (P-selectin inhibitor), Voxelotor (HbS polymerization inhibitor)',
      'Pain management: rapid intravenous opioids (Morphine, Hydromorphone) for vaso-occlusive crises',
      'Curative therapies: Allogeneic Hematopoietic Stem Cell Transplantation (HSCT) and CRISPR-Cas9 gene therapy (Exagamglogene autotemcel - Exa-cel)'
    ],
    prevention: [
      'Genetic counseling and pre-marital or pre-conception hemoglobinopathy screening',
      'Daily prophylactic oral Penicillin in children from age 2 months to 5 years',
      'Immunizations against encapsulated bacteria (Pneumococcal, Meningococcal, Hib)'
    ],
    lifestyleRecommendations: [
      'Maintain vigorous oral hydration (at least 3–4 liters daily)',
      'Avoid high altitude, unpressurized aircraft, temperature extremes, and exhaustive exertion'
    ],
    whenToConsultDoctor: [
      'Pain crisis not manageable with home oral hydration and analgesics'
    ],
    emergencyWarningSigns: [
      'Acute Chest Syndrome: fever, chest pain, tachypnea, and new lung infiltrate (leading cause of death)',
      'Stroke signs: sudden weakness, facial droop, or altered speech',
      'Priapism lasting > 2 hours or splenic sequestration crisis (rapid pallor, abdominal distension)'
    ],
    references: [
      { title: 'Evidence-Based Management of Sickle Cell Disease', source: 'National Institutes of Health (NIH / NHLBI)' },
      { title: 'Sickle Cell Disease Overview', source: 'World Health Organization (WHO)' }
    ]
  },

  // 19. Autoimmune Diseases
  {
    id: 'cond-22',
    name: 'Systemic Lupus Erythematosus (SLE)',
    category: 'Autoimmune Diseases',
    overview: 'Systemic Lupus Erythematosus is a prototype multisystem autoimmune disease characterized by immune complex deposition, loss of self-tolerance to nuclear antigens, and broad-spectrum inflammatory tissue damage affecting joints, skin, kidneys, brain, and serosa.',
    causes: [
      'Loss of T and B cell tolerance leading to polyclonal autoantibody production (anti-nuclear antibodies, anti-dsDNA)',
      'Impaired apoptotic cell clearance and type I interferon pathway hyperactivation',
      'Triggered by ultraviolet (UV) radiation, viral infections (EBV), and estrogen hormonal surges'
    ],
    symptoms: [
      'Malar "butterfly" rash sparing the nasolabial folds',
      'Discoid lupus plaques and photosensitivity (rash after sun exposure)',
      'Symmetric polyarthritis (inflammatory, non-erosive joint pain in fingers, wrists, knees)',
      'Profound fatigue, low-grade fevers, and diffuse alopecia',
      'Pleuritic chest pain (pleuritis or pericarditis), Raynaud\'s phenomenon, and oral ulcers'
    ],
    riskFactors: [
      'Female gender (female-to-male ratio of 9:1 during reproductive years)',
      'Age between 15 and 44 years',
      'Non-Caucasian descent (higher severity in African, Hispanic, and Asian ancestries)',
      'Family history of autoimmune disorders'
    ],
    typesOrStages: [
      'Mild SLE: cutaneous rash, mild arthritis, fatigue',
      'Moderate SLE: severe rash, pleurisy, hematologic cytopenias',
      'Severe / Organ-Threatening SLE: Lupus Nephritis (Classes I to VI), CNS lupus, myocarditis'
    ],
    diagnosticMethods: [
      'Antinuclear Antibody (ANA) screen (positive in > 98% of patients)',
      'Specific autoantibodies: Anti-dsDNA (correlates with nephritis activity) and Anti-Smith (highly specific)',
      'Complement levels (Low C3 and C4 indicate active disease)',
      'Urinalysis and 24-hour urine protein to detect Lupus Nephritis',
      'EULAR/ACR 2019 Classification Criteria scoring'
    ],
    treatmentApproaches: [
      'Baseline foundation for all patients: Hydroxychloroquine (HCQ) 5 mg/kg/day (reduces flare-ups and mortality)',
      'Corticosteroids (Prednisone, Methylprednisolone pulses) for acute inflammatory exacerbations',
      'Immunosuppressants: Mycophenolate Mofetil (MMF), Azathioprine, Methotrexate',
      'Biologic therapy: Belimumab (anti-BAFF) and Anifrolumab (type I interferon receptor antagonist)'
    ],
    prevention: [
      'Strict photoprotection: broad-spectrum SPF 50+ sunscreen daily and sun-protective clothing',
      'Regular monitoring of CBC, renal function, and urinalysis every 3–6 months'
    ],
    lifestyleRecommendations: [
      'Smoking cessation (smoking actively neutralizes the therapeutic effect of hydroxychloroquine)',
      'Adequate restorative rest during periods of high fatigue'
    ],
    whenToConsultDoctor: [
      'New unexplained rash after sun exposure accompanied by joint pain and mouth ulcers'
    ],
    emergencyWarningSigns: [
      'Puffy face, dark tea-colored urine, and leg swelling (acute Lupus Nephritis flare)',
      'New onset seizures, acute psychosis, or severe unremitting headache (neuropsychiatric lupus)'
    ],
    references: [
      { title: 'EULAR Recommendations for the Management of Systemic Lupus Erythematosus', source: 'Annals of the Rheumatic Diseases' },
      { title: 'Lupus Information & Resources', source: 'Lupus Foundation of America / CDC' }
    ]
  },

  // 20. Nutritional Deficiencies
  {
    id: 'cond-23',
    name: 'Vitamin D Deficiency & Osteomalacia',
    category: 'Nutritional Deficiencies',
    overview: 'Vitamin D deficiency occurs when serum 25-hydroxyvitamin D [25(OH)D] is below physiological thresholds, leading to impaired intestinal calcium and phosphorus absorption, secondary hyperparathyroidism, bone demineralization, and muscle weakness.',
    causes: [
      'Inadequate cutaneous synthesis due to limited solar ultraviolet B (UVB) exposure, indoor lifestyles, and sunscreen use',
      'Insufficient dietary intake (fatty fish, egg yolks, fortified dairy)',
      'Malabsorption syndromes (Celiac disease, Crohn\'s, cystic fibrosis)',
      'Impaired hepatic or renal 25- and 1-alpha-hydroxylation (cirrhosis, CKD)'
    ],
    symptoms: [
      'Often subclinical and asymptomatic in mild stages',
      'Diffuse bone aching, throbbing periosteal tenderness (sternal and tibial pressure)',
      'Proximal muscle weakness (difficulty standing from a low chair or climbing stairs)',
      'Increased susceptibility to frequent respiratory tract infections',
      'Bone fractures from minor falls, rickets in growing children'
    ],
    riskFactors: [
      'Dark skin pigmentation (melanin absorbs UVB photons, reducing synthesis)',
      'Institutionalized or elderly populations',
      'High latitude residency during winter months',
      'Obesity (vitamin D is fat-soluble and sequestered in adipose tissue)'
    ],
    typesOrStages: [
      'Sufficient: 25(OH)D > 30 ng/mL (75 nmol/L)',
      'Insufficient: 25(OH)D between 20–29 ng/mL (50–74 nmol/L)',
      'Deficient: 25(OH)D < 20 ng/mL (50 nmol/L)',
      'Severely Deficient: 25(OH)D < 10 ng/mL (25 nmol/L) with osteomalacia risk'
    ],
    diagnosticMethods: [
      'Serum 25-hydroxyvitamin D [25(OH)D] total assay (gold standard biomarker)',
      'Serum Calcium, Phosphorus, and Alkaline Phosphatase (ALP)',
      'Intact Parathyroid Hormone (PTH) to evaluate secondary hyperparathyroidism',
      'Dual-energy X-ray absorptiometry (DEXA) for Bone Mineral Density (BMD)'
    ],
    treatmentApproaches: [
      'Correction phase for deficiency: Cholecalciferol (Vitamin D3) 50,000 IU orally once weekly for 8 weeks (or 6,000 IU daily)',
      'Maintenance phase: 1,000 to 2,000 IU daily (or 50,000 IU monthly)',
      'Co-administration of adequate elemental Calcium (1,000–1,200 mg/day from diet or supplements)',
      'Calcitriol (active 1,25-dihydroxyvitamin D3) required for chronic kidney disease patients'
    ],
    prevention: [
      'Safe sun exposure: 15–20 minutes of midday sunlight on arms and legs 2–3 times a week',
      'Consumption of fortified foods (milk, plant-based milks, cereals, orange juice)'
    ],
    lifestyleRecommendations: [
      'Take oral vitamin D supplements with the largest fat-containing meal for enhanced intestinal micelle absorption',
      'Weight-bearing exercises (walking, jogging) to stimulate bone remodeling'
    ],
    whenToConsultDoctor: [
      'Unexplained bone and muscle pain persisting for several weeks',
      'History of fragility fracture from a standing height fall'
    ],
    emergencyWarningSigns: [
      'Severe hypocalcemia signs: carpopedal spasm, facial twitching (Chvostek\'s sign), numbness around mouth, or tetanic seizures — requires urgent intravenous calcium gluconate'
    ],
    references: [
      { title: 'Evaluation, Treatment, and Prevention of Vitamin D Deficiency: An Endocrine Society Clinical Practice Guideline', source: 'The Journal of Clinical Endocrinology & Metabolism' },
      { title: 'Vitamin D Fact Sheet for Health Professionals', source: 'National Institutes of Health (NIH ODS)' }
    ]
  }
];
