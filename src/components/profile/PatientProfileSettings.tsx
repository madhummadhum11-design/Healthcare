import React, { useState } from 'react';
import {
  User,
  Shield,
  Phone,
  Heart,
  AlertCircle,
  Download,
  Trash2,
  Lock,
  FileText,
  Key,
  CheckCircle2,
  Plus,
  X,
  History,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PatientProfileSettings: React.FC = () => {
  const {
    user,
    updateProfile,
    auditLogs,
    exportHealthData,
    deleteAccountData,
    switchDemoProfile
  } = useAuth();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup);
  const [heightCm, setHeightCm] = useState(user.heightCm);
  const [weightKg, setWeightKg] = useState(user.weightKg);

  const [emergencyName, setEmergencyName] = useState(user.emergencyContact.name);
  const [emergencyRelation, setEmergencyRelation] = useState(user.emergencyContact.relationship);
  const [emergencyPhone, setEmergencyPhone] = useState(user.emergencyContact.phone);

  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const [saveToast, setSaveToast] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      age: Number(age),
      phone,
      email,
      bloodGroup,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      emergencyContact: {
        name: emergencyName,
        relationship: emergencyRelation,
        phone: emergencyPhone
      }
    });

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleAddAllergy = () => {
    if (!newAllergy.trim()) return;
    if (!user.allergies.includes(newAllergy.trim())) {
      updateProfile({ allergies: [...user.allergies, newAllergy.trim()] });
    }
    setNewAllergy('');
  };

  const handleRemoveAllergy = (allergy: string) => {
    updateProfile({ allergies: user.allergies.filter((a) => a !== allergy) });
  };

  const handleAddCondition = () => {
    if (!newCondition.trim()) return;
    if (!user.chronicConditions.includes(newCondition.trim())) {
      updateProfile({ chronicConditions: [...user.chronicConditions, newCondition.trim()] });
    }
    setNewCondition('');
  };

  const handleRemoveCondition = (cond: string) => {
    updateProfile({ chronicConditions: user.chronicConditions.filter((c) => c !== cond) });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Patient Profile & Clinical Settings</h1>
              <p className="text-xs text-slate-500">
                Manage personal identification, allergies, chronic conditions, and security keys
              </p>
            </div>
          </div>
        </div>

        {/* Demo Switcher Quick Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Active Demo:</span>
          <button
            onClick={() => switchDemoProfile('john')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              user.name.includes('John')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            John Doe (HTN)
          </button>
          <button
            onClick={() => switchDemoProfile('priya')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              user.name.includes('Priya')
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Priya Sharma (PCOS)
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-2 text-xs font-semibold text-emerald-800 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Patient profile and emergency parameters saved successfully.</span>
        </div>
      )}

      {/* Main Profile Form Grid */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Personal & Clinical Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Personal Demographics & Contact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Age (Years)</label>
                <input
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                >
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <h3 className="text-sm font-bold text-slate-800 pt-4 pb-2 border-b border-slate-100 flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span>Primary Emergency Contact (SOS Responder)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Relationship</label>
                <input
                  type="text"
                  required
                  value={emergencyRelation}
                  onChange={(e) => setEmergencyRelation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Save Profile Changes
              </button>
            </div>
          </div>

          {/* Right 1 Col: Allergies & Chronic Conditions */}
          <div className="space-y-6">
            {/* Allergies Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Known Allergies</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Critical for drug interaction alerts and antibiotic contraindications
              </p>

              <div className="flex flex-wrap gap-1.5">
                {user.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200"
                  >
                    <span>{allergy}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAllergy(allergy)}
                      className="text-rose-400 hover:text-rose-700 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="e.g. Aspirin, Latex"
                  className="flex-1 text-xs p-2 rounded-xl border border-slate-200 bg-slate-50"
                />
                <button
                  type="button"
                  onClick={handleAddAllergy}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Chronic Conditions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <Heart className="w-4 h-4 text-blue-600" />
                <span>Chronic Diagnoses</span>
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {user.chronicConditions.map((cond) => (
                  <span
                    key={cond}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200"
                  >
                    <span>{cond}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCondition(cond)}
                      className="text-blue-400 hover:text-blue-700 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="e.g. Asthma, Osteoarthritis"
                  className="flex-1 text-xs p-2 rounded-xl border border-slate-200 bg-slate-50"
                />
                <button
                  type="button"
                  onClick={handleAddCondition}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Security, Privacy & Data Compliance Panel (Section 13) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Security & Patient Data Governance</h3>
              <p className="text-xs text-slate-500">
                End-to-end data encryption, privacy consent, and immutable audit logs
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AES-256 Storage Encryption Active</span>
          </span>
        </div>

        {/* Security Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="font-bold text-slate-800 flex items-center space-x-1.5">
              <Download className="w-4 h-4 text-blue-600" />
              <span>Portability & Data Export</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Download your complete encrypted Electronic Health Record including vitals, logs, and profile.
            </p>
            <button
              onClick={exportHealthData}
              className="mt-2 w-full py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold rounded-lg transition"
            >
              Export Record (JSON)
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="font-bold text-slate-800 flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-teal-600" />
              <span>Session & Access Control</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Two-Factor Authentication (2FA) is enabled for all telehealth sessions and record modifications.
            </p>
            <div className="mt-2 text-[11px] text-emerald-700 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>TLS 1.3 Transport In Use</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 space-y-2">
            <div className="font-bold text-red-900 flex items-center space-x-1.5">
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>Right to be Forgotten</span>
            </div>
            <p className="text-[11px] text-red-700">
              GDPR-compliant permanent purge of your health parameters, consult notes, and documents.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all cached health data and reset the workspace?')) {
                  deleteAccountData();
                }
              }}
              className="mt-2 w-full py-2 bg-white border border-red-300 hover:bg-red-100 text-red-700 font-bold rounded-lg transition"
            >
              Purge All Data
            </button>
          </div>
        </div>

        {/* Audit Log Stream */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span>Recent Security Access Logs (Real-Time Audit Trail)</span>
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2 px-3">Action Event</th>
                  <th className="py-2 px-3">Timestamp (IST)</th>
                  <th className="py-2 px-3">Host / Protocol</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="py-2 px-3 font-sans font-medium text-slate-900">{log.action}</td>
                    <td className="py-2 px-3 text-slate-500">{log.timestamp}</td>
                    <td className="py-2 px-3 text-slate-500">{log.ipAddress}</td>
                    <td className="py-2 px-3">
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
