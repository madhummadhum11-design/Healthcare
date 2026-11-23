import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Droplet,
  Thermometer,
  Wind,
  Scale,
  Plus,
  Download,
  AlertTriangle,
  Info,
  Calendar,
  CheckCircle,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea
} from 'recharts';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';
import { VitalSign } from '../../types';
import { CLINICAL_REFERENCE_RANGES } from '../../data/defaultVitals';

interface HealthParametersProps {
  onOpenAddVital: (type?: VitalSign['type']) => void;
}

export const HealthParameters: React.FC<HealthParametersProps> = ({ onOpenAddVital }) => {
  const { vitals } = useHealthcare();
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<VitalSign['type']>('bp');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');

  const parameterTabs: { type: VitalSign['type']; label: string; icon: any; unit: string }[] = [
    { type: 'bp', label: 'Blood Pressure', icon: Activity, unit: 'mmHg' },
    { type: 'heart_rate', label: 'Heart Rate', icon: Heart, unit: 'bpm' },
    { type: 'glucose', label: 'Blood Glucose', icon: Droplet, unit: 'mg/dL' },
    { type: 'spo2', label: 'Oxygen (SpO2)', icon: Wind, unit: '%' },
    { type: 'temperature', label: 'Body Temperature', icon: Thermometer, unit: '°F' },
    { type: 'weight', label: 'Weight & BMI', icon: Scale, unit: 'kg' },
    { type: 'cholesterol', label: 'Cholesterol', icon: Activity, unit: 'mg/dL' },
    { type: 'hemoglobin', label: 'Hemoglobin', icon: Droplet, unit: 'g/dL' }
  ];

  // Filter vitals for selected type
  const filteredVitals = vitals
    .filter((v) => v.type === selectedType)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Chart data formatting
  const chartData = filteredVitals.map((v) => ({
    date: new Date(v.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    time: new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    val: v.value,
    secVal: v.secondaryValue,
    status: v.status,
    notes: v.notes || ''
  }));

  const latestReading = filteredVitals[filteredVitals.length - 1];

  // Clinical Explanation by Parameter
  const parameterDetails: Record<
    VitalSign['type'],
    {
      description: string;
      clinicalSignificance: string;
      normalGuide: string;
      lifestyleAdvice: string[];
    }
  > = {
    bp: {
      description:
        'Blood pressure measures the lateral force exerted by circulating blood upon the arterial vascular walls. It is recorded as two numbers: Systolic (pressure during myocardial contraction) over Diastolic (pressure during ventricular relaxation).',
      clinicalSignificance:
        'Sustained arterial hypertension causes microvascular remodeling, accelerated atherogenesis, stroke, myocardial infarction, and nephrosclerosis.',
      normalGuide: 'Standard Normal: Systolic < 120 mmHg and Diastolic < 80 mmHg.',
      lifestyleAdvice: [
        'DASH (Dietary Approaches to Stop Hypertension) dietary pattern',
        'Limit sodium intake to under 1,500 mg per day',
        'Engage in 150 minutes of weekly aerobic exercise',
        'Limit caffeine and alcohol consumption'
      ]
    },
    heart_rate: {
      description:
        'Resting heart rate reflects the frequency of ventricular contractions per minute at physical rest, driven by the sinoatrial node and modulated by the autonomic nervous system.',
      clinicalSignificance:
        'A lower resting heart rate in healthy adults often indicates efficient cardiac stroke volume. Persistent resting tachycardia (> 100 bpm) or severe bradycardia (< 50 bpm) requires clinical evaluation.',
      normalGuide: 'Standard Adult Resting Range: 60 - 100 beats per minute (bpm).',
      lifestyleAdvice: [
        'Perform regular cardiovascular endurance conditioning (swimming, brisk walking)',
        'Practice slow diaphragmatic breathing to enhance vagal parasympathetic tone',
        'Ensure adequate electrolyte balance and hydration'
      ]
    },
    glucose: {
      description:
        'Blood glucose concentration indicates circulating blood sugar levels, regulated primarily by pancreatic insulin and glucagon.',
      clinicalSignificance:
        'Chronic fasting hyperglycemia (> 100 mg/dL) points toward impaired insulin sensitivity, prediabetes, or overt Type 2 Diabetes.',
      normalGuide: 'Fasting: 70 - 99 mg/dL. Post-Prandial (2 hrs after food): < 140 mg/dL.',
      lifestyleAdvice: [
        'Prioritize low-glycemic-index whole grains, legumes, and cruciferous vegetables',
        'Avoid sugary beverages, sweetened bakery products, and refined carbohydrates',
        'Post-meal 15-minute walks to enhance GLUT-4 glucose uptake in skeletal muscle'
      ]
    },
    spo2: {
      description:
        'Pulse oximetry estimates peripheral arterial blood oxygen saturation, indicating the percentage of hemoglobin binding sites occupied by oxygen.',
      clinicalSignificance:
        'Values below 94% indicate compromised alveolar gas exchange, seen in asthma, COPD, pneumonia, or pulmonary edema.',
      normalGuide: 'Healthy Range: 95% - 100% on ambient room air.',
      lifestyleAdvice: [
        'Maintain good upright posture to ensure full lung expansion',
        'Avoid exposure to active or passive cigarette smoke and biomass smoke',
        'Use incentive spirometer or pursed-lip breathing if advised by pulmonologist'
      ]
    },
    temperature: {
      description:
        'Body temperature represents the thermal equilibrium governed by the preoptic anterior hypothalamus.',
      clinicalSignificance:
        'Elevated temperature (pyrexia) indicates endogenous cytokine-mediated immune response to microbial pathogens or inflammation.',
      normalGuide: 'Oral Normal Range: 97.7°F - 99.5°F (36.5°C - 37.5°C).',
      lifestyleAdvice: [
        'Stay well-hydrated with water, broths, and electrolyte fluids',
        'Wear breathable cotton clothing and avoid bundling in heavy blankets during fever',
        'Use lukewarm sponging if temperature causes discomfort'
      ]
    },
    weight: {
      description:
        'Body weight and Body Mass Index (BMI = kg/m²) evaluate overall body mass relative to stature.',
      clinicalSignificance:
        'Elevated BMI, especially visceral adiposity, strongly correlates with cardiovascular disease, insulin resistance, and hepatic steatosis.',
      normalGuide: 'Normal BMI: 18.5 - 24.9 kg/m² (Asian guideline cutoff: 18.5 - 22.9 kg/m²).',
      lifestyleAdvice: [
        'Maintain a balanced caloric deficit for healthy, sustainable weight reduction (0.5 kg/week)',
        'Incorporate progressive resistance training to preserve lean muscle tissue',
        'Weigh in once weekly in the morning before breakfast for consistent tracking'
      ]
    },
    respiratory_rate: {
      description: 'Breathing rate measured in full ventilatory cycles (inhalation and exhalation) per minute at rest.',
      clinicalSignificance: 'Tachypnea (> 20 breaths/min) is a sensitive early marker for physiological decompensation.',
      normalGuide: 'Adult Normal: 12 - 20 breaths per minute.',
      lifestyleAdvice: ['Practice controlled box breathing and diaphragmatic expansion.']
    },
    cholesterol: {
      description: 'Total serum cholesterol measuring both LDL atherogenic particles and HDL cardioprotective particles.',
      clinicalSignificance: 'Elevated total cholesterol accelerates coronary and carotid atherosclerotic plaque deposition.',
      normalGuide: 'Optimal: < 200 mg/dL. Borderline High: 200 - 239 mg/dL. High: >= 240 mg/dL.',
      lifestyleAdvice: ['Reduce dietary saturated and trans fats; increase soluble oat fiber and phytosterols.']
    },
    hemoglobin: {
      description: 'Iron-containing protein inside erythrocytes that transports oxygen from lungs to peripheral tissues.',
      clinicalSignificance: 'Low hemoglobin causes tissue hypoxia, fatigue, tachycardia, and exercise intolerance (anemia).',
      normalGuide: 'Adult Males: 13.5 - 17.5 g/dL. Adult Females: 12.0 - 15.5 g/dL.',
      lifestyleAdvice: ['Consume iron-rich foods (lentils, spinach, lean meats) paired with Vitamin C.']
    },
    bmi: {
      description: 'Body Mass Index calculated as weight (kg) divided by height in meters squared.',
      clinicalSignificance: 'Surrogate indicator for total body adiposity and metabolic health risk.',
      normalGuide: 'Normal range: 18.5 - 24.9 kg/m².',
      lifestyleAdvice: ['Combine dietary caloric management with aerobic and resistance exercises.']
    },
    height: {
      description: 'Stature measurement.',
      clinicalSignificance: 'Baseline anthropometric parameter.',
      normalGuide: 'Recorded in centimeters.',
      lifestyleAdvice: []
    }
  };

  const currentMeta = parameterDetails[selectedType] || parameterDetails.bp;

  // Export Printable Summary
  const handleDownloadReport = () => {
    const reportText = `=====================================================
MEDICORE AI - CLINICAL VITALS EXPORT SUMMARY
Patient Name: ${user.name} | Age: ${user.age} | Gender: ${user.gender}
Blood Group: ${user.bloodGroup} | Height: ${user.heightCm} cm | Weight: ${user.weightKg} kg
Generated Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
=====================================================

MONITORED PARAMETER: ${selectedType.toUpperCase()}
Latest Recorded Value: ${latestReading ? `${latestReading.value} ${latestReading.secondaryValue ? `/${latestReading.secondaryValue}` : ''} ${latestReading.unit} (${latestReading.status.toUpperCase()})` : 'N/A'}
Clinical Normal Reference: ${CLINICAL_REFERENCE_RANGES[selectedType as keyof typeof CLINICAL_REFERENCE_RANGES]?.normal || 'See guidelines'}

HISTORICAL RECORDINGS:
${filteredVitals
  .map(
    (v) =>
      `- ${new Date(v.timestamp).toLocaleString()}: ${v.value}${v.secondaryValue ? `/${v.secondaryValue}` : ''} ${v.unit} [${v.status.toUpperCase()}] (${v.context || 'general'}) - Notes: ${v.notes || 'None'}`
  )
  .join('\n')}

CLINICAL GUIDANCE:
${currentMeta.description}

RECOMMENDED LIFESTYLE MEASURES:
${currentMeta.lifestyleAdvice.map((a) => `* ${a}`).join('\n')}

=====================================================
* Educational guidance only. Please present this report to your licensed physician.
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MediCore_Vitals_${selectedType}_${user.name.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header & Actions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Health Parameters & Vitals</h1>
              <p className="text-xs text-slate-500">
                Log, monitor, and analyze physiological indicators over time
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download Report</span>
          </button>

          <button
            onClick={() => onOpenAddVital(selectedType)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Reading</span>
          </button>
        </div>
      </div>

      {/* Parameter Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
        {parameterTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedType === tab.type;
          return (
            <button
              key={tab.type}
              onClick={() => setSelectedType(tab.type)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Historical Interactive Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {parameterTabs.find((t) => t.type === selectedType)?.label} Trend
              </h3>
              <p className="text-xs text-slate-500">
                Clinical reference interval and historical measurements
              </p>
            </div>

            {/* Latest Value Badge */}
            {latestReading && (
              <div className="flex items-center space-x-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500">Latest:</span>
                <span className="text-sm font-extrabold text-slate-800">
                  {latestReading.value}
                  {latestReading.secondaryValue ? `/${latestReading.secondaryValue}` : ''}{' '}
                  {latestReading.unit}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    latestReading.status === 'normal'
                      ? 'bg-emerald-100 text-emerald-800'
                      : latestReading.status === 'elevated'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {latestReading.status}
                </span>
              </div>
            )}
          </div>

          {/* Recharts Line/Area Chart */}
          <div className="h-72 w-full pt-4">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No readings recorded for this parameter yet. Click "+ Add New Reading" above.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      borderRadius: '12px',
                      color: '#FFF',
                      border: 'none',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="val"
                    name={selectedType === 'bp' ? 'Systolic (mmHg)' : 'Measured Value'}
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#FFF' }}
                    activeDot={{ r: 6 }}
                  />
                  {selectedType === 'bp' && (
                    <Line
                      type="monotone"
                      dataKey="secVal"
                      name="Diastolic (mmHg)"
                      stroke="#0D9488"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#0D9488', strokeWidth: 2, stroke: '#FFF' }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Clinical Reference Zone Legend */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-700 font-medium">Optimal / Normal</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-700 font-medium">Elevated / Borderline</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-slate-700 font-medium">Critical / Action Needed</span>
            </div>
            <span className="text-slate-500 text-[11px] font-semibold">
              Guideline: {currentMeta.normalGuide}
            </span>
          </div>
        </div>

        {/* Right 1 Col: Parameter Specific Medical Explanation & Guidance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center space-x-2 text-slate-800">
            <Info className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold">Clinical Parameter Guide</h3>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Physiological Role
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">{currentMeta.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Clinical Significance
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">{currentMeta.clinicalSignificance}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Evidence-Based Recommendations
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {currentMeta.lifestyleAdvice.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start space-x-2 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Consistent abnormal trends should be evaluated by a healthcare professional. Do not self-prescribe or change existing medication doses.
            </span>
          </div>
        </div>
      </div>

      {/* Historical Recordings Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">
            Historical Log Records ({filteredVitals.length} measurements)
          </h3>
          <span className="text-xs text-slate-400">Sorted by most recent</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Measured Value</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Context</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredVitals
                .slice()
                .reverse()
                .map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {new Date(v.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}{' '}
                      at {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {v.value}
                      {v.secondaryValue ? `/${v.secondaryValue}` : ''} {v.unit}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          v.status === 'normal'
                            ? 'bg-emerald-100 text-emerald-800'
                            : v.status === 'elevated'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 capitalize text-slate-500">
                      {v.context || 'Resting'}
                    </td>
                    <td className="py-3 px-4 text-slate-500 italic">
                      {v.notes || '—'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
