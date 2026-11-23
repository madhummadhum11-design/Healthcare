import React, { useState } from 'react';
import {
  FolderHeart,
  Upload,
  Search,
  FileText,
  Download,
  Calendar,
  Tag,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { HealthRecordDoc } from '../../types';

export const HealthRecordsLocker: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchDoc, setSearchDoc] = useState<string>('');

  const [records, setRecords] = useState<HealthRecordDoc[]>([
    {
      id: 'doc-1',
      title: 'Discharge Summary - Appendectomy',
      category: 'Discharge Summary',
      date: '2018-06-12',
      hospitalName: 'Manipal Hospital, HAL Airport Road',
      doctorName: 'Dr. Ramesh Chandra',
      fileSize: '2.4 MB',
      fileType: 'pdf',
      tags: ['Surgery', 'Post-Op', 'Surgical Recovery']
    },
    {
      id: 'doc-2',
      title: 'Digital Prescription - Cardiovascular & Lipid Protocol',
      category: 'Prescription',
      date: '2026-10-18',
      hospitalName: 'Apollo Heart Center',
      doctorName: 'Dr. Arvind Swaminathan',
      fileSize: '650 KB',
      fileType: 'pdf',
      tags: ['Hypertension', 'Cardiology', 'Statins']
    },
    {
      id: 'doc-3',
      title: 'COVID-19 Full Vaccination Certificate (Booster)',
      category: 'Vaccination',
      date: '2023-01-20',
      hospitalName: 'National Health Mission / CoWIN',
      doctorName: 'Government Immunization Center',
      fileSize: '420 KB',
      fileType: 'pdf',
      tags: ['Immunization', 'COVID-19', 'WHO Verified']
    },
    {
      id: 'doc-4',
      title: 'Star Health Premier Health Policy Document',
      category: 'Insurance',
      date: '2026-03-01',
      hospitalName: 'Star Health & Allied Insurance',
      fileSize: '3.1 MB',
      fileType: 'pdf',
      tags: ['Insurance Policy', 'Cashless TPA', 'Coverage 15L']
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<HealthRecordDoc['category']>('Lab Report');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const categories = ['All', 'Lab Report', 'Prescription', 'Discharge Summary', 'Vaccination', 'Insurance'];

  const filtered = records.filter((r) => {
    const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchSearch =
      r.title.toLowerCase().includes(searchDoc.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchDoc.toLowerCase())) ||
      (r.hospitalName && r.hospitalName.toLowerCase().includes(searchDoc.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDoc: HealthRecordDoc = {
      id: `doc-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      date: new Date().toISOString().split('T')[0],
      hospitalName: 'MediCore Clinical Archive',
      fileSize: '1.2 MB',
      fileType: 'pdf',
      tags: [newCategory, 'Verified Upload']
    };

    setRecords((prev) => [newDoc, ...prev]);
    setNewTitle('');
    setUploadModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <FolderHeart className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Personal Health Records (PHR)</h1>
              <p className="text-xs text-slate-500">
                Encrypted digital health locker for lifelong medical documents and records
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            placeholder="Search documents or tags..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Records Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                  {doc.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{doc.fileSize}</span>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700 shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">{doc.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{doc.hospitalName}</p>
                  {doc.doctorName && (
                    <p className="text-[11px] text-slate-600 font-medium">Physician: {doc.doctorName}</p>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Recorded on {doc.date}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {doc.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-600 rounded-md border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  alert(`Downloading ${doc.title} (${doc.fileSize}). Encrypted SHA-256 verified.`);
                }}
                className="text-blue-600 hover:text-blue-700 font-bold flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>

              <button
                onClick={() => handleDelete(doc.id)}
                className="text-slate-400 hover:text-red-600 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Upload Health Record to Locker</h3>

            <form onSubmit={handleAddDocument} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Annual Health Checkup ECG Report"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                >
                  <option value="Lab Report">Lab Report</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Discharge Summary">Discharge Summary</option>
                  <option value="Vaccination">Vaccination Certificate</option>
                  <option value="Insurance">Insurance Policy</option>
                </select>
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-500 cursor-pointer hover:border-blue-400 transition">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span>Drag and drop your file here, or click to browse</span>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Save to Locker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
