import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  User,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  RotateCcw,
  Plus
} from 'lucide-react';
import { Appointment } from '../../types';
import { useHealthcare } from '../../context/HealthcareContext';

interface AppointmentsManagerProps {
  onNavigateToDoctors: () => void;
}

export const AppointmentsManager: React.FC<AppointmentsManagerProps> = ({
  onNavigateToDoctors
}) => {
  const { appointments, cancelAppointment, startVideoConsultation } = useHealthcare();

  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [cancellingAppId, setCancellingAppId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('Schedule conflict');

  const filteredAppointments = appointments.filter((a) => {
    if (activeTab === 'all') return true;
    return a.status === activeTab;
  });

  const handleConfirmCancel = () => {
    if (cancellingAppId) {
      cancelAppointment(cancellingAppId, cancelReason);
      setCancellingAppId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">My Medical Appointments</h1>
              <p className="text-xs text-slate-500">
                Track upcoming tele-health visits, clinic consultations, and doctor notes
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToDoctors}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Consultation</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        {(['all', 'confirmed', 'completed', 'cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab === 'confirmed' ? 'Upcoming / Active' : tab}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No appointments in this view</h3>
            <p className="text-xs text-slate-500">Schedule a visit with any doctor from our directory.</p>
            <button
              onClick={onNavigateToDoctors}
              className="mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Browse Doctor Directory
            </button>
          </div>
        ) : (
          filteredAppointments.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={app.doctorAvatar}
                  alt={app.doctorName}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-50 shrink-0"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-slate-900">{app.doctorName}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        app.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-blue-600">{app.doctorSpecialty} • {app.hospital}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center space-x-1 font-semibold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{app.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 font-semibold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{app.timeSlot}</span>
                    </span>
                    <span>•</span>
                    <span className="capitalize font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {app.type === 'video' ? '📹 Tele-health Video' : '🏥 In-Clinic'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    <strong>Chief Complaint:</strong> {app.symptoms}
                  </p>

                  {app.notes && (
                    <div className="mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                      <strong>Doctor Notes:</strong> {app.notes}
                    </div>
                  )}

                  {app.cancelReason && (
                    <p className="text-xs text-rose-600 mt-1">
                      <strong>Cancellation Reason:</strong> {app.cancelReason}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                {app.status === 'confirmed' && app.type === 'video' && (
                  <button
                    onClick={() => startVideoConsultation(app)}
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Video Room</span>
                  </button>
                )}

                {app.status === 'confirmed' && (
                  <button
                    onClick={() => setCancellingAppId(app.id)}
                    className="px-4 py-2 border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-semibold rounded-xl transition"
                  >
                    Cancel Appointment
                  </button>
                )}

                {app.status === 'completed' && (
                  <button
                    onClick={onNavigateToDoctors}
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition"
                  >
                    Book Follow-up
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {cancellingAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-2 text-rose-600 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <span>Cancel Appointment?</span>
            </div>

            <p className="text-xs text-slate-600">
              Are you sure you want to cancel this consultation? If a consultation fee was charged, a full refund will be processed to your source account within 24 hours.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Cancellation
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              >
                <option value="Schedule conflict">Schedule conflict</option>
                <option value="Symptoms improved">Symptoms improved</option>
                <option value="Visited another clinic">Visited another clinic</option>
                <option value="Emergency resolved">Emergency resolved</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setCancellingAppId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
