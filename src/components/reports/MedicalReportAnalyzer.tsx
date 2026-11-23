import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Download,
  Share2,
  Sparkles,
  Search,
  Eye,
  GitCompare,
  FileCheck,
  HelpCircle,
  X
} from 'lucide-react';
import { MedicalReport, Biomarker } from '../../types';
import { useHealthcare } from '../../context/HealthcareContext';
import { reportParserService } from '../../services/reportParserService';
import { SAMPLE_REPORTS } from '../../data/sampleReports';

export const MedicalReportAnalyzer: React.FC = () => {
  const { reports, addReport, deleteReport } = useHealthcare();

  const [activeReport, setActiveReport] = useState<MedicalReport>(reports[0] || SAMPLE_REPORTS[0]);
  const [comparingReport, setComparingReport] = useState<MedicalReport | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'out_of_range'>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    setIsAnalyzing(true);
    try {
      const result = await reportParserService.parseUploadedFile(file);
      addReport(result.report);
      setActiveReport(result.report);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const displayedBiomarkers = activeReport.biomarkers.filter((b) => {
    if (filterStatus === 'out_of_range') {
      return b.status === 'high' || b.status === 'low' || b.status === 'critical';
    }
    return true;
  });

  const abnormalCount = activeReport.biomarkers.filter(
    (b) => b.status === 'high' || b.status === 'low' || b.status === 'critical'
  ).length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Medical Report Analyzer (OCR)</h1>
              <p className="text-xs text-slate-500">
                Upload laboratory test PDFs or images for intelligent biomarker parsing and plain-English summaries
              </p>
            </div>
          </div>
        </div>

        {/* Upload Trigger */}
        <div className="flex items-center space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isAnalyzing ? 'Analyzing OCR Document...' : 'Upload Medical Report'}</span>
          </button>
        </div>
      </div>

      {/* Reports History Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
        {reports.map((rep) => {
          const isSelected = activeReport.id === rep.id;
          return (
            <button
              key={rep.id}
              onClick={() => {
                setActiveReport(rep);
                setIsComparing(false);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{rep.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {rep.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* Report Overview & Summary Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">{activeReport.title}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {activeReport.type}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Laboratory: <strong className="text-slate-700">{activeReport.labName}</strong> • Patient: <strong className="text-slate-700">{activeReport.patientName}</strong> • Date: {activeReport.date}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {reports.length > 1 && (
              <button
                onClick={() => {
                  const other = reports.find((r) => r.id !== activeReport.id);
                  if (other) {
                    setComparingReport(other);
                    setIsComparing(!isComparing);
                  }
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                  isComparing ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>{isComparing ? 'Hide Comparison' : 'Compare with Earlier Report'}</span>
              </button>
            )}

            <button
              onClick={() => deleteReport(activeReport.id)}
              className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition"
              title="Delete Report"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Plain-Language Health Summary Box */}
        <div className="p-4 bg-gradient-to-r from-blue-50/80 to-teal-50/80 rounded-2xl border border-blue-200/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>MediCore AI Clinical Interpretation</span>
            </div>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              abnormalCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {abnormalCount > 0 ? `${abnormalCount} Out-of-Range Indicators` : 'All Markers Normal'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {activeReport.aiSummary}
          </p>
        </div>
      </div>

      {/* Side-by-side Comparison View if enabled */}
      {isComparing && comparingReport && (
        <div className="bg-indigo-50/60 rounded-2xl p-6 border border-indigo-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GitCompare className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-800">
                Comparative Analysis: {activeReport.title} ({activeReport.date}) vs {comparingReport.title} ({comparingReport.date})
              </h3>
            </div>
            <button onClick={() => setIsComparing(false)} className="text-xs text-slate-400 hover:text-slate-700">
              ✕ Close Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-2">
              <span className="text-xs font-bold text-indigo-700">Current Report ({activeReport.date})</span>
              <ul className="space-y-1 text-xs">
                {activeReport.biomarkers.map((b, i) => (
                  <li key={i} className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600">{b.name}</span>
                    <strong className="text-slate-900">{b.value} {b.unit}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-2">
              <span className="text-xs font-bold text-slate-600">Previous Report ({comparingReport.date})</span>
              <ul className="space-y-1 text-xs">
                {comparingReport.biomarkers.map((b, i) => (
                  <li key={i} className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-600">{b.name}</span>
                    <strong className="text-slate-900">{b.value} {b.unit}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Biomarkers Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Biomarker Findings & Reference Intervals</h3>
            <p className="text-xs text-slate-500">Clinical reference intervals and physiological significance</p>
          </div>

          {/* Filter toggle */}
          <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Biomarkers ({activeReport.biomarkers.length})
            </button>
            <button
              onClick={() => setFilterStatus('out_of_range')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterStatus === 'out_of_range' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Out-of-Range ({abnormalCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Test Name</th>
                <th className="py-3 px-4">Patient Result</th>
                <th className="py-3 px-4">Reference Range</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">What This Means (Plain Language)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {displayedBiomarkers.map((b, idx) => {
                const isOutOfRange = b.status === 'high' || b.status === 'low' || b.status === 'critical';

                return (
                  <tr key={idx} className={`hover:bg-slate-50 transition ${isOutOfRange ? 'bg-amber-50/20' : ''}`}>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {b.name}
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-sm">
                      <span className={isOutOfRange ? 'text-amber-800' : 'text-slate-800'}>
                        {b.value} <span className="text-xs font-normal text-slate-500">{b.unit}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {b.referenceRange}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase inline-flex items-center space-x-1 ${
                          b.status === 'normal'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'high'
                            ? 'bg-amber-100 text-amber-800'
                            : b.status === 'low'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {b.status === 'high' && <ArrowUpRight className="w-3 h-3" />}
                        {b.status === 'low' && <ArrowDownRight className="w-3 h-3" />}
                        <span>{b.status}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 leading-relaxed max-w-md">
                      {b.explanation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations & Questions to ask your Doctor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Supportive Lifestyle Recommendations</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {activeReport.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Questions for Your Prescribing Physician</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {activeReport.doctorDiscussionPoints.map((pt, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">?</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
