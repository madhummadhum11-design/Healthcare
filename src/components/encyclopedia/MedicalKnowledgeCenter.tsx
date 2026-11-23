import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ExternalLink,
  AlertTriangle,
  Heart,
  Activity,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  X,
  Share2,
  Bookmark
} from 'lucide-react';
import { MedicalCondition } from '../../types';
import { ENCYCLOPEDIA_DATA, MEDICAL_CATEGORIES } from '../../data/encyclopedia';

export const MedicalKnowledgeCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Conditions');
  const [searchDisease, setSearchDisease] = useState<string>('');
  const [activeCondition, setActiveCondition] = useState<MedicalCondition | null>(null);

  const filteredConditions = ENCYCLOPEDIA_DATA.filter((c) => {
    const matchesCategory =
      selectedCategory === 'All Conditions' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchDisease.toLowerCase()) ||
      c.category.toLowerCase().includes(searchDisease.toLowerCase()) ||
      c.symptoms.some((s) => s.toLowerCase().includes(searchDisease.toLowerCase())) ||
      c.overview.toLowerCase().includes(searchDisease.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Complete Medical Knowledge Center</h1>
              <p className="text-xs text-slate-500">
                Peer-reviewed medical encyclopedia spanning 20 clinical categories & recognized health authorities
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchDisease}
            onChange={(e) => setSearchDisease(e.target.value)}
            placeholder="Search diseases, symptoms, treatments..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* 20 Categories Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
        {MEDICAL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredConditions.map((cond) => (
          <div
            key={cond.id}
            onClick={() => setActiveCondition(cond)}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                  {cond.category}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                {cond.name}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {cond.overview}
              </p>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Primary Symptoms
                </span>
                <div className="flex flex-wrap gap-1">
                  {cond.symptoms.slice(0, 3).map((sym, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-slate-50 text-slate-700 rounded-md text-[11px] border border-slate-200 truncate max-w-full"
                    >
                      {sym}
                    </span>
                  ))}
                  {cond.symptoms.length > 3 && (
                    <span className="px-1.5 py-0.5 text-slate-400 text-[11px]">
                      +{cond.symptoms.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{cond.references.length} Clinical Citations</span>
              <span className="font-semibold text-blue-600 group-hover:underline">Read Full Monograph →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Condition Full Monograph Modal */}
      {activeCondition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Top Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#12304A] to-[#1E4E79] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  {activeCondition.category}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight mt-1">
                  {activeCondition.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveCondition(null)}
                className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Scroll View */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar text-xs sm:text-sm text-slate-700 leading-relaxed">
              {/* Definition & Overview */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Definition & Clinical Overview</span>
                </h3>
                <p className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 leading-relaxed">
                  {activeCondition.overview}
                </p>
              </div>

              {/* Causes & Risk Factors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-blue-900">
                    Etiology & Causes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeCondition.causes.map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-amber-900">
                    Predisposing Risk Factors
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeCondition.riskFactors.map((r, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Symptoms */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-rose-900">
                  Common Clinical Symptoms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeCondition.symptoms.map((s, i) => (
                    <div key={i} className="flex items-center space-x-2 p-2 bg-slate-50 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Types / Stages & Diagnostics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Clinical Classification / Stages
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {activeCondition.typesOrStages.map((t, i) => (
                      <li key={i} className="p-2 bg-slate-50 rounded-lg">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Diagnostic Modalities & Tests
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeCondition.diagnosticMethods.map((d, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Treatment Approaches & Lifestyle */}
              <div className="p-4 rounded-2xl border border-teal-200 bg-teal-50/40 space-y-3">
                <h3 className="font-bold text-teal-900 text-xs uppercase tracking-wider">
                  Evidence-Based Management & Therapies
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeCondition.treatmentApproaches.map((t, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-teal-600 font-bold">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to see doctor & Red-Flag Warnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2">
                  <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>When to Consult a Physician</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-amber-950">
                    {activeCondition.whenToConsultDoctor.map((w, i) => (
                      <li key={i}>• {w}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border-2 border-red-400 bg-red-50 space-y-2">
                  <h4 className="font-bold text-red-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>Red-Flag Emergency Signs (Call 108/112)</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-red-950 font-medium">
                    {activeCondition.emergencyWarningSigns.map((e, i) => (
                      <li key={i}>⚠️ {e}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clinical Citations */}
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1.5">
                <div className="font-bold text-slate-700">Trustworthy Medical References:</div>
                {activeCondition.references.map((ref, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <ExternalLink className="w-3 h-3 text-blue-500" />
                    <span>
                      {ref.title} — <strong className="text-slate-600">{ref.source}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Peer-reviewed for health literacy. Does not substitute professional medical care.</span>
              <button
                onClick={() => setActiveCondition(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition"
              >
                Close Monograph
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
