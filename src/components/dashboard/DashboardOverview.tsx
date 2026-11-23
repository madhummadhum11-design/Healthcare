import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Droplet,
  Thermometer,
  Wind,
  Scale,
  Calendar,
  Pill,
  FileText,
  MapPin,
  Bot,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  Video,
  ChevronRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { NavSection } from '../layout/Sidebar';
import { VitalSign } from '../../types';
import { FACILITIES_DATA } from '../../data/facilities';

interface DashboardOverviewProps {
  onNavigate: (section: NavSection) => void;
  onOpenAddVital: (type?: VitalSign['type']) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  onOpenAddVital
}) => {
  const { user } = useAuth();
  const {
    vitals,
    getLatestVital,
    appointments,
    medications,
    toggleMedicationTaken,
    adherenceRate,
    reports,
    startVideoConsultation,
    setEmergencyModalOpen
  } = useHealthcare();

  const [trendMetric, setTrendMetric] = useState<'bp' | 'heart_rate' | 'glucose'>('bp');

  // Latest Vital Signs
  const latestBp = getLatestVital('bp');
  const latestHr = getLatestVital('heart_rate');
  const latestGlucose = getLatestVital('glucose');
  const latestSpo2 = getLatestVital('spo2');
  const latestTemp = getLatestVital('temperature');
  const latestBmi = getLatestVital('bmi');

  // Prepare 7-day trend chart data
  const trendData = [
    { day: 'Nov 17', bpSys: 125, bpDia: 82, hr: 73, glucose: 106 },
    { day: 'Nov 18', bpSys: 120, bpDia: 80, hr: 71, glucose: 99 },
    { day: 'Nov 19', bpSys: 126, bpDia: 82, hr: 75, glucose: 115 },
    { day: 'Nov 20', bpSys: 119, bpDia: 78, hr: 70, glucose: 102 },
    { day: 'Nov 21', bpSys: 128, bpDia: 84, hr: 76, glucose: 112 },
    { day: 'Nov 22', bpSys: 122, bpDia: 80, hr: 74, glucose: 108 },
    { day: 'Nov 23', bpSys: latestBp?.value || 124, bpDia: latestBp?.secondaryValue || 82, hr: latestHr?.value || 72, glucose: latestGlucose?.value || 104 }
  ];

  const upcomingAppointments = appointments
    .filter((a) => a.status === 'confirmed')
    .slice(0, 2);

  const nearbyEmergencyHospitals = FACILITIES_DATA.filter((f) => f.emergencyServices).slice(0, 2);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* 1. Welcome Header Banner & Health Overview Status */}
      <div className="bg-gradient-to-r from-[#12304A] via-[#1a4468] to-[#0D9488] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Activity className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-teal-200 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time Health Monitoring Active</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good morning, {user.name} 👋
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
              Your overall health score is stable. Your resting blood pressure and fasting glucose show mild elevations; follow recommended DASH dietary adjustments.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Blood Group: {user.bloodGroup}
              </span>
              <span className="text-xs bg-white/10 text-white font-medium px-2.5 py-1 rounded-lg">
                Height: {user.heightCm} cm
              </span>
              <span className="text-xs bg-white/10 text-white font-medium px-2.5 py-1 rounded-lg">
                Weight: {user.weightKg} kg
              </span>
              <span className="text-xs bg-white/10 text-white font-medium px-2.5 py-1 rounded-lg">
                BMI: 24.3 (Normal)
              </span>
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('chat')}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-white text-blue-900 font-bold text-xs shadow-lg hover:bg-blue-50 transition transform active:scale-95"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span>Ask AI Health Assistant</span>
            </button>

            <button
              onClick={() => onOpenAddVital()}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-teal-500/30 hover:bg-teal-500/40 text-teal-100 font-bold text-xs border border-teal-400/40 backdrop-blur-md transition transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Log Health Reading</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Health Parameters Summary Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">Health Parameter Summary</h2>
            <p className="text-xs text-slate-500">Real-time physiological vital readings</p>
          </div>
          <button
            onClick={() => onNavigate('vitals')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>View Detailed Charts</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Blood Pressure */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Activity className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                Elevated
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[11px] font-medium text-slate-500">Blood Pressure</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-0.5">
                {latestBp?.value || 124}/{latestBp?.secondaryValue || 82}
                <span className="text-[10px] font-normal text-slate-400 ml-1">mmHg</span>
              </div>
            </div>
            <button
              onClick={() => onOpenAddVital('bp')}
              className="mt-3 w-full py-1 text-[11px] font-semibold text-blue-600 bg-blue-50/60 hover:bg-blue-100/60 rounded-lg transition"
            >
              + Log BP
            </button>
          </div>

          {/* Heart Rate */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
                <Heart className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Normal
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[11px] font-medium text-slate-500">Heart Rate</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-0.5">
                {latestHr?.value || 72}
                <span className="text-[10px] font-normal text-slate-400 ml-1">bpm</span>
              </div>
            </div>
            <button
              onClick={() => onOpenAddVital('heart_rate')}
              className="mt-3 w-full py-1 text-[11px] font-semibold text-rose-600 bg-rose-50/60 hover:bg-rose-100/60 rounded-lg transition"
            >
              + Log Pulse
            </button>
          </div>

          {/* Blood Glucose */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Droplet className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                Fasting
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[11px] font-medium text-slate-500">Blood Glucose</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-0.5">
                {latestGlucose?.value || 104}
                <span className="text-[10px] font-normal text-slate-400 ml-1">mg/dL</span>
              </div>
            </div>
            <button
              onClick={() => onOpenAddVital('glucose')}
              className="mt-3 w-full py-1 text-[11px] font-semibold text-amber-600 bg-amber-50/60 hover:bg-amber-100/60 rounded-lg transition"
            >
              + Log Glucose
            </button>
          </div>

          {/* Oxygen Saturation (SpO2) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-teal-50 text-teal-600">
                <Wind className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Normal
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[11px] font-medium text-slate-500">SpO2 Level</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-0.5">
                {latestSpo2?.value || 98}
                <span className="text-[10px] font-normal text-slate-400 ml-1">%</span>
              </div>
            </div>
            <button
              onClick={() => onOpenAddVital('spo2')}
              className="mt-3 w-full py-1 text-[11px] font-semibold text-teal-600 bg-teal-50/60 hover:bg-teal-100/60 rounded-lg transition"
            >
              + Log SpO2
            </button>
          </div>

          {/* Body Temperature */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <Thermometer className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Normal
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[11px] font-medium text-slate-500">Body Temp</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-0.5">
                {latestTemp?.value || 98.4}
                <span className="text-[10px] font-normal text-slate-400 ml-1">°F</span>
              </div>
            </div>
            <button
              onClick={() => onOpenAddVital('temperature')}
              className="mt-3 w-full py-1 text-[11px] font-semibold text-orange-600 bg-orange-50/60 hover:bg-orange-100/60 rounded-lg transition"
            >
              + Log Temp
            </button>
          </div>

          {/* BMI */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Scale className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Normal
              </span>
            </div>
            <div className="mt-3">
              <div className="text-[11px] font-medium text-slate-500">BMI Index</div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-0.5">
                {latestBmi?.value || 24.3}
                <span className="text-[10px] font-normal text-slate-400 ml-1">kg/m²</span>
              </div>
            </div>
            <button
              onClick={() => onOpenAddVital('weight')}
              className="mt-3 w-full py-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50/60 hover:bg-indigo-100/60 rounded-lg transition"
            >
              + Log Weight
            </button>
          </div>
        </div>
      </div>

      {/* 3. Interactive Charts & Real-Time Trend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Recharts Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800">7-Day Vitals Trend Analytics</h3>
              <p className="text-xs text-slate-500">Continuous telemetry and daily averages</p>
            </div>

            {/* Metric Toggle Tabs */}
            <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto text-xs font-semibold">
              <button
                onClick={() => setTrendMetric('bp')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  trendMetric === 'bp'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Blood Pressure
              </button>
              <button
                onClick={() => setTrendMetric('heart_rate')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  trendMetric === 'heart_rate'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Heart Rate
              </button>
              <button
                onClick={() => setTrendMetric('glucose')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  trendMetric === 'glucose'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Blood Glucose
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E11D48" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#E11D48" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
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
                {trendMetric === 'bp' && (
                  <>
                    <Area
                      type="monotone"
                      dataKey="bpSys"
                      name="Systolic (mmHg)"
                      stroke="#2563EB"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorBp)"
                    />
                    <Area
                      type="monotone"
                      dataKey="bpDia"
                      name="Diastolic (mmHg)"
                      stroke="#0D9488"
                      strokeWidth={2}
                      fillOpacity={0}
                    />
                  </>
                )}
                {trendMetric === 'heart_rate' && (
                  <Area
                    type="monotone"
                    dataKey="hr"
                    name="Pulse (bpm)"
                    stroke="#E11D48"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorHr)"
                  />
                )}
                {trendMetric === 'glucose' && (
                  <Area
                    type="monotone"
                    dataKey="glucose"
                    name="Fasting Glucose (mg/dL)"
                    stroke="#D97706"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorGlucose)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Target Systolic: &lt; 120 mmHg</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <span>Target Diastolic: &lt; 80 mmHg</span>
            </span>
            <span className="text-slate-400">Values are resting measurements</span>
          </div>
        </div>

        {/* Right 1 Col: AI Health Assistant Quick Launch Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-6 border border-blue-100 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Multilingual AI
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-4">MediCore AI Assistant</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Have questions about your health, lab reports, or symptoms? Ask in English or regional Indian languages.
            </p>

            <div className="mt-4 space-y-2">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Suggested Prompts
              </div>
              <button
                onClick={() => onNavigate('chat')}
                className="w-full text-left p-2.5 rounded-xl bg-white border border-blue-100 hover:border-blue-300 text-xs text-slate-700 transition flex items-center justify-between shadow-xs"
              >
                <span className="truncate">"What does my BP reading 124/82 mmHg mean?"</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              </button>
              <button
                onClick={() => onNavigate('chat')}
                className="w-full text-left p-2.5 rounded-xl bg-white border border-blue-100 hover:border-blue-300 text-xs text-slate-700 transition flex items-center justify-between shadow-xs"
              >
                <span className="truncate">"Explain common side effects of Metformin"</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              </button>
            </div>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center justify-center space-x-2"
          >
            <span>Start Conversation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Upcoming Appointments & Medication Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Upcoming Appointments</h3>
            </div>
            <button
              onClick={() => onNavigate('doctors')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              + Book New
            </button>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No upcoming appointments. Schedule a consultation with a specialist.
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={app.doctorAvatar}
                      alt={app.doctorName}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-100 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-xs text-slate-900">{app.doctorName}</div>
                      <div className="text-[11px] font-semibold text-blue-600">{app.doctorSpecialty}</div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-2">
                        <span>📅 {app.date}</span>
                        <span>•</span>
                        <span>⏰ {app.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    {app.type === 'video' ? (
                      <button
                        onClick={() => startVideoConsultation(app)}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Call</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-600 px-2 py-1 bg-white rounded-lg border border-slate-200">
                        In-Clinic
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Medication Reminders & Compliance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Pill className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-800">Today's Medication Schedule</h3>
            </div>
            <div className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              {adherenceRate}% Adherence
            </div>
          </div>

          <div className="space-y-2.5">
            {medications.slice(0, 4).map((med) => (
              <div
                key={med.id}
                onClick={() => toggleMedicationTaken(med.id)}
                className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                  med.takenToday
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                      med.takenToday
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        med.takenToday ? 'line-through text-slate-500' : 'text-slate-800'
                      }`}
                    >
                      {med.medicineName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {med.dosage} • {med.time} ({med.foodRelation})
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {med.takenToday ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Taken at {med.takenAt}
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Click row to mark taken/pending</span>
            <button
              onClick={() => onNavigate('notifications')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage Reminders
            </button>
          </div>
        </div>
      </div>

      {/* 5. Recent Lab Reports & Nearby Emergency Facilities Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Lab Reports Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Recent Medical Reports</h3>
            </div>
            <button
              onClick={() => onNavigate('reports')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Analyze New Report
            </button>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">No medical reports uploaded yet.</div>
          ) : (
            <div className="space-y-3">
              {reports.slice(0, 2).map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => onNavigate('reports')}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/40 cursor-pointer transition flex items-start justify-between"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{rep.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{rep.labName} • {rep.date}</p>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-1 italic">
                        "{rep.aiSummary.slice(0, 90)}..."
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full shrink-0">
                    {rep.biomarkers.length} Tests
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nearby Emergency Care Centers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <h3 className="text-sm font-bold text-slate-800">Nearby Emergency Care</h3>
            </div>
            <button
              onClick={() => onNavigate('nearby')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View Map
            </button>
          </div>

          <div className="space-y-3">
            {nearbyEmergencyHospitals.map((fac) => (
              <div
                key={fac.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{fac.name}</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                      24/7 ER
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{fac.address}</p>
                  <p className="text-[11px] text-teal-700 font-semibold mt-0.5">
                    📍 {fac.distanceKm} km away • ⭐ {fac.rating} ({fac.reviewCount} reviews)
                  </p>
                </div>

                <a
                  href={`tel:${fac.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition shrink-0"
                >
                  Call ER
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
