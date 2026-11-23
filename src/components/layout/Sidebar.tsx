import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Stethoscope,
  Activity,
  MapPin,
  BookOpen,
  FileText,
  Pill,
  Calendar,
  FolderHeart,
  Bell,
  User,
  ShieldAlert,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';

export type NavSection =
  | 'dashboard'
  | 'chat'
  | 'doctors'
  | 'vitals'
  | 'nearby'
  | 'encyclopedia'
  | 'reports'
  | 'medicines'
  | 'appointments'
  | 'records'
  | 'notifications'
  | 'profile';

interface SidebarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  isOpenMobile,
  onToggleMobile
}) => {
  const { user, currentUser, role } = useAuth();
  const { unreadNotificationsCount, setEmergencyModalOpen } = useHealthcare();

  const navItems = [
    {
      id: 'dashboard',
      label:
        role === 'doctor'
          ? 'Doctor Workstation'
          : role === 'admin'
          ? 'Admin Console'
          : 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: role === 'doctor' ? 'Doc' : role === 'admin' ? 'Admin' : undefined
    },
    { id: 'chat', label: 'AI Health Assistant', icon: Bot, badge: 'AI' },
    { id: 'doctors', label: 'Doctor Consultation', icon: Stethoscope },
    { id: 'vitals', label: 'Health Parameters', icon: Activity },
    { id: 'nearby', label: 'Nearby Medical Facilities', icon: MapPin },
    { id: 'encyclopedia', label: 'Medical Knowledge Center', icon: BookOpen },
    { id: 'reports', label: 'Medical Report Analyzer', icon: FileText, badge: 'OCR' },
    { id: 'medicines', label: 'Medicine Information', icon: Pill },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'records', label: 'Health Records', icon: FolderHeart },
    {
      id: 'notifications',
      label: 'Notifications & Reminders',
      icon: Bell,
      count: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined
    },
    { id: 'profile', label: 'Profile & Settings', icon: User }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onToggleMobile}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#12304A] text-slate-100 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 px-6 py-5 flex items-center justify-between border-b border-slate-700/60 bg-[#0E273D]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">MediCore</span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide">Intelligent Healthcare</p>
            </div>
          </div>
          <button
            onClick={onToggleMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency SOS Button in Sidebar */}
        <div className="px-4 pt-4">
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs tracking-wide shadow-md shadow-red-900/30 transition transform active:scale-98 animate-pulse"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>EMERGENCY SOS (108 / 112)</span>
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Main Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectSection(item.id as NavSection);
                  if (isOpenMobile) onToggleMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && (
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Patient / Doctor / Admin Profile Card */}
        <div className="p-3 border-t border-slate-700/60 bg-[#0E273D]/90">
          <button
            onClick={() => onSelectSection('profile')}
            className="w-full flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-800 transition text-left cursor-pointer"
          >
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ring-2 ${
                  role === 'admin'
                    ? 'bg-purple-950 text-purple-300 ring-purple-500/40'
                    : role === 'doctor'
                    ? 'bg-blue-950 text-blue-300 ring-blue-500/40'
                    : 'bg-slate-700 text-teal-300 ring-teal-500/30'
                }`}
              >
                {(currentUser?.fullName || user.name)
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0E273D] rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {currentUser?.fullName || user.name}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                <span className="capitalize font-bold text-teal-400">{role}</span>
                <span>•</span>
                <span className="text-slate-300 truncate font-mono text-[10px]">
                  {currentUser?.email || user.email}
                </span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </aside>
    </>
  );
};
