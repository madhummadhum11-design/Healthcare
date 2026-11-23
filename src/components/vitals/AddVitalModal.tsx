import React, { useState } from 'react';
import { X, Activity, AlertCircle, Check } from 'lucide-react';
import { VitalSign, HealthStatus } from '../../types';
import { useHealthcare } from '../../context/HealthcareContext';

interface AddVitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: VitalSign['type'];
}

export const AddVitalModal: React.FC<AddVitalModalProps> = ({
  isOpen,
  onClose,
  initialType = 'bp'
}) => {
  const { addVital } = useHealthcare();

  const [type, setType] = useState<VitalSign['type']>(initialType);
  const [value, setValue] = useState<string>('120');
  const [secondaryValue, setSecondaryValue] = useState<string>('80'); // For BP Diastolic
  const [timestamp, setTimestamp] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [context, setContext] = useState<VitalSign['context']>('resting');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  // Determine clinically appropriate status and unit based on entered value
  const calculateStatus = (t: VitalSign['type'], val: number, secVal?: number): { status: HealthStatus; unit: string } => {
    switch (t) {
      case 'bp': {
        const sys = val;
        const dia = secVal || 80;
        if (sys >= 180 || dia >= 120) return { status: 'critical', unit: 'mmHg' };
        if (sys >= 130 || dia >= 80) return { status: 'elevated', unit: 'mmHg' };
        if (sys < 90 || dia < 60) return { status: 'low', unit: 'mmHg' };
        return { status: 'normal', unit: 'mmHg' };
      }
      case 'heart_rate': {
        if (val > 140 || val < 45) return { status: 'critical', unit: 'bpm' };
        if (val > 100) return { status: 'elevated', unit: 'bpm' };
        if (val < 60) return { status: 'low', unit: 'bpm' };
        return { status: 'normal', unit: 'bpm' };
      }
      case 'glucose': {
        if (val < 55 || val > 300) return { status: 'critical', unit: 'mg/dL' };
        if (val >= 126) return { status: 'critical', unit: 'mg/dL' };
        if (val >= 100) return { status: 'elevated', unit: 'mg/dL' };
        if (val < 70) return { status: 'low', unit: 'mg/dL' };
        return { status: 'normal', unit: 'mg/dL' };
      }
      case 'spo2': {
        if (val < 90) return { status: 'critical', unit: '%' };
        if (val < 94) return { status: 'elevated', unit: '%' };
        return { status: 'normal', unit: '%' };
      }
      case 'temperature': {
        if (val >= 104) return { status: 'critical', unit: '°F' };
        if (val >= 100.4) return { status: 'elevated', unit: '°F' };
        if (val < 96) return { status: 'low', unit: '°F' };
        return { status: 'normal', unit: '°F' };
      }
      case 'weight': {
        return { status: 'normal', unit: 'kg' };
      }
      case 'bmi': {
        if (val >= 30) return { status: 'elevated', unit: 'kg/m²' };
        if (val >= 25) return { status: 'elevated', unit: 'kg/m²' };
        if (val < 18.5) return { status: 'low', unit: 'kg/m²' };
        return { status: 'normal', unit: 'kg/m²' };
      }
      case 'respiratory_rate': {
        if (val > 25 || val < 10) return { status: 'critical', unit: 'breaths/min' };
        if (val > 20) return { status: 'elevated', unit: 'breaths/min' };
        return { status: 'normal', unit: 'breaths/min' };
      }
      case 'cholesterol': {
        if (val >= 240) return { status: 'critical', unit: 'mg/dL' };
        if (val >= 200) return { status: 'elevated', unit: 'mg/dL' };
        return { status: 'normal', unit: 'mg/dL' };
      }
      case 'hemoglobin': {
        if (val < 10) return { status: 'critical', unit: 'g/dL' };
        if (val < 13) return { status: 'low', unit: 'g/dL' };
        return { status: 'normal', unit: 'g/dL' };
      }
      default:
        return { status: 'normal', unit: '' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numVal = parseFloat(value);
    const numSecVal = type === 'bp' ? parseFloat(secondaryValue) : undefined;
    const { status, unit } = calculateStatus(type, numVal, numSecVal);

    addVital({
      timestamp: new Date(timestamp).toISOString(),
      type,
      value: numVal,
      secondaryValue: numSecVal,
      unit,
      status,
      context,
      notes: notes || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Record Health Parameter</h3>
              <p className="text-[11px] text-slate-500">Add verified clinical vital measurement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Select Parameter Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Health Parameter
            </label>
            <select
              value={type}
              onChange={(e) => {
                const t = e.target.value as VitalSign['type'];
                setType(t);
                if (t === 'bp') setValue('120');
                else if (t === 'heart_rate') setValue('72');
                else if (t === 'glucose') setValue('100');
                else if (t === 'spo2') setValue('98');
                else if (t === 'temperature') setValue('98.6');
                else if (t === 'weight') setValue('74.5');
                else if (t === 'respiratory_rate') setValue('16');
                else if (t === 'cholesterol') setValue('190');
                else if (t === 'hemoglobin') setValue('14.2');
              }}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              <option value="bp">Blood Pressure (Systolic / Diastolic)</option>
              <option value="heart_rate">Heart Rate / Pulse (bpm)</option>
              <option value="glucose">Blood Glucose (mg/dL)</option>
              <option value="spo2">Oxygen Saturation - SpO2 (%)</option>
              <option value="temperature">Body Temperature (°F)</option>
              <option value="weight">Body Weight (kg)</option>
              <option value="respiratory_rate">Respiratory Rate (breaths/min)</option>
              <option value="cholesterol">Total Cholesterol (mg/dL)</option>
              <option value="hemoglobin">Hemoglobin (g/dL)</option>
            </select>
          </div>

          {/* Value Inputs */}
          {type === 'bp' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Systolic (mmHg)
                </label>
                <input
                  type="number"
                  required
                  min="60"
                  max="260"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  required
                  min="40"
                  max="160"
                  value={secondaryValue}
                  onChange={(e) => setSecondaryValue(e.target.value)}
                  className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="80"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Measured Value
              </label>
              <input
                type="number"
                step="any"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>
          )}

          {/* Measurement Context & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Context / State
              </label>
              <select
                value={context}
                onChange={(e) => setContext(e.target.value as any)}
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <option value="resting">Resting (Seated)</option>
                <option value="fasting">Fasting (Before food)</option>
                <option value="post_prandial">Post-Prandial (After meal)</option>
                <option value="active">Active / Post-exercise</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Clinical Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Clinical Context / Patient Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Taken after 10 mins rest, took morning medication at 8 AM"
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          {/* Disclaimer notice */}
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-start space-x-2 text-[11px] text-blue-800">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Single readings do not constitute a clinical diagnosis. Consistent trends over time provide actionable clinical insights for your doctor.
            </span>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
            >
              Save Reading
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
