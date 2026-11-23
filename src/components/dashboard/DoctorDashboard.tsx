import React, { useState } from 'react';
import {
  Stethoscope, Calendar, Clock, Video, MessageSquare, CheckCircle2,
  AlertCircle, Users, Activity, FileText, Plus, ShieldCheck, ChevronRight,
  TrendingUp, Award, DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { VideoConsultationModal } from '../doctors/VideoConsultationModal';
import { Appointment } from '../../types';

interface DoctorAppointment {
  id: string;
  patientName: string;
  patientAge: number;
  gender: string;
  timeSlot: string;
  type: 'video' | 'chat' | 'in-person';
  symptoms: string;
  status: 'pending' | 'in-progress' | 'completed';
  bloodGroup: string;
}

export const DoctorDashboard: React.FC = () => {
  const { currentUser, user } = useAuth();

  const [activeVideoCall, setActiveVideoCall] = useState<Appointment | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<DoctorAppointment | null>(null);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [prescribedMed, setPrescribedMed] = useState('');

  const [availableSlots, setAvailableSlots] = useState<string[]>([
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:30 AM - 12:00 PM',
    '02:00 PM - 02:30 PM',
    '04:00 PM - 04:30 PM'
  ]);
  const [newSlotTime, setNewSlotTime] = useState('');

  const [appointments, setAppointments] = useState<DoctorAppointment[]>([
    {
      id: 'apt-d1',
      patientName: 'John Doe',
      patientAge: 42,
      gender: 'Male',
      timeSlot: '09:00 AM - 09:30 AM',
      type: 'video',
      symptoms: 'Stage 1 Hypertension checkup; blood pressure fluctuating around 138/88 mmHg. Needs medication adjustment.',
      status: 'pending',
      bloodGroup: 'O+'
    },
    {
      id: 'apt-d2',
      patientName: 'Priya Sharma',
      patientAge: 34,
      gender: 'Female',
      timeSlot: '10:00 AM - 10:30 AM',
      type: 'video',
      symptoms: 'Follow-up on thyroid TSH levels and mild lethargy; current dosage Levothyroxine 50 mcg.',
      status: 'pending',
      bloodGroup: 'B+'
    },
    {
      id: 'apt-d3',
      patientName: 'Rahul Verma',
      patientAge: 29,
      gender: 'Male',
      timeSlot: '11:30 AM - 12:00 PM',
      type: 'chat',
      symptoms: 'Acute dry cough with low-grade fever for 3 days. No shortness of breath.',
      status: 'completed',
      bloodGroup: 'A+'
    }
  ]);

  const markStatus = (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSlotTime.trim() && !availableSlots.includes(newSlotTime.trim())) {
      setAvailableSlots([...availableSlots, newSlotTime.trim()]);
      setNewSlotTime('');
    }
  };

  const handleSaveNotes = () => {
    if (selectedAppointment) {
      alert(`Clinical note and prescription for ${selectedAppointment.patientName} saved to EHR successfully.`);
      markStatus(selectedAppointment.id, 'completed');
      setSelectedAppointment(null);
      setClinicalNotes('');
      setPrescribedMed('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Doctor Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Licensed Practitioner Portal
            </span>
            <span className="px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold rounded-full">
              Apollo Specialty Hospital
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {currentUser?.fullName || 'Dr. Rajesh Sharma, MD'}
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Department of Cardiology & Internal Medicine • License #MCI-29481-DEL
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
          <div className="text-xs">
            <div className="font-bold text-white">Telehealth Line Active</div>
            <div className="text-slate-300">Ready for incoming video calls</div>
          </div>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Appointments</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{appointments.length} Consultations</div>
            <div className="text-xs text-teal-600 font-semibold mt-1">2 Video • 1 Chat</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Queue</div>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              {appointments.filter((a) => a.status === 'pending').length} Patients Waiting
            </div>
            <div className="text-xs text-slate-400 mt-1">Next: John Doe (09:00 AM)</div>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Rating</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">4.92 / 5.0</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">128 Verified Reviews</div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Consultation Fee</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">₹800 / session</div>
            <div className="text-xs text-slate-500 mt-1">Verified Digital Billing</div>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Appointment Queue & Slot Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Appointment Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Patient Consultation Queue</h2>
                <p className="text-xs text-slate-500">Live roster of authorized appointments for today</p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-full">
                {appointments.length} Total Bookings
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-5 hover:bg-slate-50/80 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                        {apt.patientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          {apt.patientName}
                          <span className="text-[11px] font-medium text-slate-400">
                            ({apt.patientAge}y, {apt.gender}, Blood: {apt.bloodGroup})
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.timeSlot}</span>
                          <span>•</span>
                          <span className="capitalize font-semibold text-teal-700">{apt.type} Visit</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${
                          apt.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : apt.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 mb-3">
                    <span className="font-bold text-slate-900">Reported Symptoms: </span>
                    {apt.symptoms}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {apt.type === 'video' && (
                      <button
                        type="button"
                        onClick={() => {
                          markStatus(apt.id, 'in-progress');
                          setActiveVideoCall({
                            id: apt.id,
                            doctorId: 'doc-me',
                            doctorName: currentUser?.fullName || 'Dr. Rajesh Sharma, MD',
                            doctorSpecialty: 'Cardiologist',
                            doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
                            hospital: 'Apollo Specialty Hospital',
                            patientName: apt.patientName,
                            date: new Date().toISOString().split('T')[0],
                            timeSlot: apt.timeSlot,
                            type: 'video',
                            status: 'confirmed',
                            fee: 800,
                            symptoms: apt.symptoms
                          });
                        }}
                        className="py-1.5 px-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Telehealth Video Call</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAppointment(apt);
                      }}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>Add Clinical Notes & Prescription</span>
                    </button>

                    {apt.status !== 'completed' && (
                      <button
                        type="button"
                        onClick={() => markStatus(apt.id, 'completed')}
                        className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Completed</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Slot Management & Clinical Profile */}
        <div className="space-y-6">
          {/* Availability Manager */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Consultation Slot Management</h3>
              <p className="text-xs text-slate-500">Configure bookable slots for online patients</p>
            </div>

            <form onSubmit={handleAddSlot} className="flex gap-2">
              <input
                type="text"
                value={newSlotTime}
                onChange={(e) => setNewSlotTime(e.target.value)}
                placeholder="e.g. 05:00 PM - 05:30 PM"
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </form>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Slot Schedule
              </div>
              <div className="space-y-1.5">
                {availableSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                  >
                    <span className="font-medium text-slate-700">{slot}</span>
                    <button
                      type="button"
                      onClick={() => setAvailableSlots(availableSlots.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-600 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Profile Summary */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Professional Verification</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Medical Council:</span>
                <span className="font-semibold text-slate-800">Medical Council of India</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Registration ID:</span>
                <span className="font-mono font-semibold text-slate-800">MCI-2010-09418</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Qualifications:</span>
                <span className="font-semibold text-slate-800">MBBS, MD (Cardiology), FACC</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Total Experience:</span>
                <span className="font-semibold text-slate-800">16 Years</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Telehealth Video Room Modal */}
      {activeVideoCall && (
        <VideoConsultationModal
          appointment={activeVideoCall}
          onClose={() => {
            setActiveVideoCall(null);
          }}
        />
      )}

      {/* Clinical Notes Drawer / Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add Clinical Consultation Note</h3>
                <p className="text-xs text-slate-500">Patient: {selectedAppointment.patientName}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Doctor Clinical Assessment / Diagnosis
                </label>
                <textarea
                  rows={3}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="e.g. Mild essential hypertension. Vitals stable. Advised low-sodium DASH diet and 30 min daily walking."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Prescription & Follow-up Instructions
                </label>
                <textarea
                  rows={2}
                  value={prescribedMed}
                  onChange={(e) => setPrescribedMed(e.target.value)}
                  placeholder="e.g. Tab Telmisartan 40 mg OD morning after food x 30 days. Repeat BP monitoring."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm"
              >
                Save to Medical Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
