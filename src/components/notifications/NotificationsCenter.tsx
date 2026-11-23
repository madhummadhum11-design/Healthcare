import React, { useState } from 'react';
import {
  Bell,
  Pill,
  Calendar,
  Activity,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useHealthcare } from '../../context/HealthcareContext';
import { MedicationReminder } from '../../types';

export const NotificationsCenter: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    medications,
    toggleMedicationTaken,
    addMedicationReminder,
    adherenceRate
  } = useHealthcare();

  const [filterType, setFilterType] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // New medication reminder state
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('1 Tablet');
  const [time, setTime] = useState('08:00 AM');
  const [timeOfDay, setTimeOfDay] = useState<MedicationReminder['timeOfDay']>('Morning');
  const [foodRelation, setFoodRelation] = useState<MedicationReminder['foodRelation']>('After Food');
  const [frequency, setFrequency] = useState('Once Daily');

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    addMedicationReminder({
      medicineName,
      dosage,
      time,
      timeOfDay,
      foodRelation,
      frequency
    });

    setMedicineName('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Notifications & Medication Reminders</h1>
              <p className="text-xs text-slate-500">
                Pill adherence tracking, clinical appointment alerts, and health parameter checkup prompts
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={markAllNotificationsAsRead}
            className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            Mark All as Read
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Pill Reminder</span>
          </button>
        </div>
      </div>

      {/* Medication Adherence Tracker Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Pill className="w-4 h-4 text-teal-600" />
              <span>Today's Pill Adherence Tracker</span>
            </h2>
            <p className="text-xs text-slate-500">Click a reminder to toggle taken/pending state</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-600">Compliance Rate:</span>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              {adherenceRate}% Adherent Today
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {medications.map((med) => (
            <div
              key={med.id}
              onClick={() => toggleMedicationTaken(med.id)}
              className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                med.takenToday
                  ? 'border-emerald-300 bg-emerald-50/50'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  {med.timeOfDay}
                </span>

                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                    med.takenToday
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h4 className={`text-xs font-extrabold ${med.takenToday ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {med.medicineName}
                </h4>
                <p className="text-[11px] text-slate-500">{med.dosage}</p>
              </div>

              <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span>⏰ {med.time}</span>
                <span className="font-semibold text-teal-700">{med.foodRelation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Filter & Feed */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800">System Alerts & Notifications</h3>
            <p className="text-xs text-slate-500">Chronological feed of your health events</p>
          </div>

          <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            {['all', 'medication', 'appointment', 'vitals', 'report'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-lg capitalize transition ${
                  filterType === f
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`py-4 px-3 rounded-xl transition cursor-pointer flex items-start space-x-3.5 ${
                !notif.read ? 'bg-blue-50/40' : 'hover:bg-slate-50'
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  notif.type === 'medication'
                    ? 'bg-teal-100 text-teal-700'
                    : notif.type === 'appointment'
                    ? 'bg-blue-100 text-blue-700'
                    : notif.type === 'vitals'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {notif.type === 'medication' && <Pill className="w-4 h-4" />}
                {notif.type === 'appointment' && <Calendar className="w-4 h-4" />}
                {notif.type === 'vitals' && <Activity className="w-4 h-4" />}
                {notif.type === 'report' && <FileText className="w-4 h-4" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                  <span className="text-[11px] text-slate-400 font-medium">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
              </div>

              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Medication Reminder Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Add New Medication Reminder</h3>

            <form onSubmit={handleAddMedication} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  required
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g. Atorvastatin or Amoxicillin"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    required
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 50 mg Tablet"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 08:30 AM"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time of Day
                  </label>
                  <select
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Food Relation
                  </label>
                  <select
                    value={foodRelation}
                    onChange={(e) => setFoodRelation(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="After Food">After Food</option>
                    <option value="Before Food">Before Food</option>
                    <option value="With Food">With Food</option>
                    <option value="Anytime">Anytime</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Add Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
