import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Bell,
  Search,
  Globe,
  ShieldAlert,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronDown,
  Shield,
  Stethoscope,
  LogOut,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { NavSection } from './Sidebar';

interface HeaderProps {
  currentSection: NavSection;
  onToggleMobile: () => void;
  onNavigate: (section: NavSection) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onToggleMobile,
  onNavigate,
  selectedLanguage,
  onSelectLanguage,
  searchQuery,
  onSearchChange
}) => {
  const { user, currentUser, role, switchRole, switchDemoProfile, logout } = useAuth();
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setEmergencyModalOpen
  } = useHealthcare();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sectionTitles: Record<NavSection, string> = {
    dashboard:
      role === 'doctor'
        ? 'Doctor Clinical Workstation'
        : role === 'admin'
        ? 'Platform Administration & Governance'
        : 'Clinical Dashboard Overview',
    chat: 'MediCore AI Health Assistant',
    doctors: 'Doctor Consultation & Telehealth',
    vitals: 'Personal Health Parameters & Vitals',
    nearby: 'Nearby Medical Facilities & Care Centers',
    encyclopedia: 'Medical Knowledge Center (Encyclopedia)',
    reports: 'Clinical Medical Report Analyzer (OCR)',
    medicines: 'Pharmaceutical Drug Reference Directory',
    appointments: 'Appointment Schedules & Telehealth',
    records: 'Personal Health Records & Documents',
    notifications: 'Notifications & Medication Reminders',
    profile: 'Patient Profile & Clinical Settings'
  };

  const languages = ['English', 'Kannada (ಕನ್ನಡ)', 'Hindi (हिन्दी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Spanish (Español)'];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-base font-bold text-slate-800 tracking-tight">
            {sectionTitles[currentSection] || 'MediCore AI Platform'}
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">Official Healthcare Management System</p>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search symptoms, medicines, doctors, diseases..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* Emergency SOS Button */}
        <button
          onClick={() => setEmergencyModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition transform active:scale-95"
        >
          <ShieldAlert className="w-4 h-4" />
          <span className="hidden sm:inline">SOS 108</span>
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden xl:inline">{selectedLanguage.split(' ')[0]}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-fadeIn">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                Choose Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onSelectLanguage(lang.split(' ')[0]);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition ${
                    selectedLanguage.startsWith(lang.split(' ')[0])
                      ? 'text-blue-600 font-semibold bg-blue-50/50'
                      : 'text-slate-700'
                  }`}
                >
                  <span>{lang}</span>
                  {selectedLanguage.startsWith(lang.split(' ')[0]) && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-ping" />
            )}
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/80 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xs font-bold text-slate-800">Notifications</h3>
                  {unreadNotificationsCount > 0 && (
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded-full">
                      {unreadNotificationsCount} new
                    </span>
                  )}
                </div>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">No active notifications</div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3.5 text-xs hover:bg-slate-50 transition cursor-pointer flex items-start space-x-3 ${
                        !n.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          !n.read ? 'bg-blue-600' : 'bg-transparent'
                        }`}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800 flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                <button
                  onClick={() => {
                    onNavigate('notifications');
                    setNotifDropdownOpen(false);
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All Reminders & Alerts
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Role Badge Indicator */}
        <div className="hidden sm:flex items-center">
          {role === 'admin' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-800 text-xs font-bold rounded-full border border-purple-200 shadow-xs">
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>Admin Mode</span>
            </span>
          )}
          {role === 'doctor' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-full border border-blue-200 shadow-xs">
              <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
              <span>Doctor Portal</span>
            </span>
          )}
          {role === 'patient' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-full border border-teal-200 shadow-xs">
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Patient Portal</span>
            </span>
          )}
        </div>

        {/* Demo Patient Profile Switcher & User Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center ring-2 ${
                role === 'admin'
                  ? 'bg-purple-600 ring-purple-100'
                  : role === 'doctor'
                  ? 'bg-blue-600 ring-blue-100'
                  : 'bg-teal-600 ring-teal-100'
              }`}
            >
              {(currentUser?.fullName || user.name)[0]}
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-slate-700">
              {(currentUser?.fullName || user.name).split(' ')[0]}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">{currentUser?.fullName || user.name}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    {role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{currentUser?.email || user.email}</p>
                {role === 'patient' && (
                  <div className="mt-1 flex items-center space-x-2 text-[10px] text-teal-700 font-semibold">
                    <span className="px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200">
                      Blood: {user.bloodGroup}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200">
                      Age: {user.age}
                    </span>
                  </div>
                )}
              </div>

              {/* RBAC Role Switcher (For Instant Evaluation) */}
              <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>Switch RBAC Role View</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      switchRole('patient');
                      setProfileMenuOpen(false);
                    }}
                    className={`py-1 text-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                      role === 'patient' ? 'bg-teal-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      switchRole('doctor');
                      setProfileMenuOpen(false);
                    }}
                    className={`py-1 text-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                      role === 'doctor' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Doctor
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      switchRole('admin');
                      setProfileMenuOpen(false);
                    }}
                    className={`py-1 text-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                      role === 'admin' ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {/* Patient Demo Profile Switcher Section */}
              {role === 'patient' && (
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/40">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Demo Medical Persona
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        switchDemoProfile('john');
                        setProfileMenuOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded-lg text-xs transition flex items-center justify-between ${
                        user.name.includes('John')
                          ? 'bg-teal-600 text-white font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>John Doe (HTN / Prediabetes)</span>
                      {user.name.includes('John') && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </button>
                    <button
                      onClick={() => {
                        switchDemoProfile('priya');
                        setProfileMenuOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded-lg text-xs transition flex items-center justify-between ${
                        user.name.includes('Priya')
                          ? 'bg-teal-600 text-white font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Priya Sharma (PCOS / Thyroid)</span>
                      {user.name.includes('Priya') && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-1">
                <button
                  onClick={() => {
                    onNavigate('profile');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Full Profile & Clinical Settings</span>
                </button>

                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2 border-t border-slate-100 font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
