import React, { useState } from 'react';
import {
  Pill,
  Search,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { Medication } from '../../types';
import { MEDICINES_DATA } from '../../data/medicines';

export const MedicineDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  // Interaction Checker Tool state
  const [drugA, setDrugA] = useState<string>(MEDICINES_DATA[0].id);
  const [drugB, setDrugB] = useState<string>(MEDICINES_DATA[4].id);
  const [interactionResult, setInteractionResult] = useState<string | null>(null);

  const filteredMeds = MEDICINES_DATA.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.brandName.toLowerCase().includes(q) ||
      m.genericName.toLowerCase().includes(q) ||
      m.drugClass.toLowerCase().includes(q) ||
      m.indications.some((ind) => ind.toLowerCase().includes(q))
    );
  });

  const checkDrugInteraction = () => {
    const medA = MEDICINES_DATA.find((m) => m.id === drugA);
    const medB = MEDICINES_DATA.find((m) => m.id === drugB);

    if (!medA || !medB) return;

    if (medA.id === medB.id) {
      setInteractionResult('⚠️ You selected the same medication twice. Please select two distinct drugs to test compatibility.');
      return;
    }

    // Check known interactions
    const matchA = medA.interactions.some((i) =>
      i.toLowerCase().includes(medB.genericName.toLowerCase().slice(0, 5))
    );
    const matchB = medB.interactions.some((i) =>
      i.toLowerCase().includes(medA.genericName.toLowerCase().slice(0, 5))
    );

    if (matchA || matchB) {
      setInteractionResult(`⚠️ POTENTIAL CLINICAL INTERACTION DETECTED between ${medA.genericName} and ${medB.genericName}. Combining these agents may elevate adverse event risks or alter pharmacokinetics. Consult your prescribing physician or pharmacist before co-administration.`);
    } else {
      setInteractionResult(`🟢 No major contraindicating interactions identified between ${medA.genericName} and ${medB.genericName} in standard clinical reference databases. Always confirm with your physician.`);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Pharmaceutical Medicine Directory</h1>
              <p className="text-xs text-slate-500">
                Verified drug monographs, indications, side effects, dosage forms, and clinical precautions
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brand, generic name, or condition..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Drug-Drug Interaction Checker Tool Widget */}
      <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl p-6 border border-blue-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Clinical Drug-Drug Interaction Checker
          </h3>
          <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
            Clinical Tool
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Select two medications to cross-check compatibility, enzymatic inhibitions, and adverse co-administration alerts:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-5">
            <select
              value={drugA}
              onChange={(e) => setDrugA(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {MEDICINES_DATA.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.genericName} ({m.brandName})
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 text-center text-xs font-bold text-slate-400">
            WITH
          </div>

          <div className="sm:col-span-5">
            <select
              value={drugB}
              onChange={(e) => setDrugB(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {MEDICINES_DATA.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.genericName} ({m.brandName})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={checkDrugInteraction}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Check Compatibility
          </button>

          {interactionResult && (
            <div className="flex-1 text-xs p-3 rounded-xl bg-white border border-slate-200 shadow-2xs font-medium text-slate-800">
              {interactionResult}
            </div>
          )}
        </div>
      </div>

      {/* Medicines Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMeds.map((med) => (
          <div
            key={med.id}
            onClick={() => setSelectedMed(med)}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    med.prescriptionRequired
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {med.prescriptionRequired ? '⚠️ Rx Required' : '🟢 OTC'}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">{med.drugClass}</span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition">
                  {med.genericName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">Brand: {med.brandName}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Primary Uses / Indications
                </span>
                <ul className="text-xs text-slate-600 space-y-0.5">
                  {med.indications.slice(0, 2).map((ind, i) => (
                    <li key={i} className="line-clamp-1">
                      • {ind}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Common Dosage Form
                </span>
                <p className="text-xs text-slate-600 line-clamp-1">{med.dosageForms[0]}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold group-hover:underline">
              <span>View Full Monograph</span>
              <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>

      {/* Medication Full Monograph Modal */}
      {selectedMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#12304A] to-[#1E4E79] text-white flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedMed.prescriptionRequired
                        ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                        : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                    }`}
                  >
                    {selectedMed.prescriptionRequired ? 'Prescription-Only (Rx)' : 'Over-The-Counter (OTC)'}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">• {selectedMed.drugClass}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold mt-1">
                  {selectedMed.genericName} <span className="font-normal text-slate-300 text-sm">({selectedMed.brandName})</span>
                </h2>
              </div>

              <button
                onClick={() => setSelectedMed(null)}
                className="p-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 custom-scrollbar text-xs sm:text-sm text-slate-700 leading-relaxed">
              {/* Indications */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Approved Indications & Clinical Uses
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  {selectedMed.indications.map((ind, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dosage & Administration */}
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                <h4 className="font-bold text-blue-900 text-xs uppercase tracking-wider">
                  Available Formulations & Standard Administration
                </h4>
                <div className="text-xs text-slate-800 space-y-1">
                  <p><strong>Available Forms:</strong> {selectedMed.dosageForms.join(', ')}</p>
                  <p><strong>Standard Adult Dosage:</strong> {selectedMed.standardDosage}</p>
                </div>
              </div>

              {/* Side Effects & Warnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-rose-900">
                    Common Adverse Effects
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {selectedMed.commonSideEffects.map((se, i) => (
                      <li key={i}>• {se}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2">
                  <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Precautions & Black Box Warnings</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-amber-950 font-medium">
                    {selectedMed.warnings.map((w, i) => (
                      <li key={i}>⚠️ {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Drug Interactions */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Important Drug-Drug & Food Interactions
                </h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {selectedMed.interactions.map((inter, i) => (
                    <li key={i}>• {inter}</li>
                  ))}
                </ul>
              </div>

              {/* Storage */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center space-x-2">
                <PackageCheck className="w-4 h-4 text-slate-500 shrink-0" />
                <span><strong>Storage Instructions:</strong> {selectedMed.storage}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Do not alter medication dosages without licensed medical supervision.</span>
              <button
                onClick={() => setSelectedMed(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
