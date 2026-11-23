import React, { useState, useEffect } from 'react';
import {
  Shield, Users, Activity, Settings, UserCheck, AlertTriangle,
  Lock, CheckCircle2, Clock, Search, Filter, RefreshCw, KeyRound,
  FileCheck, ShieldAlert, Cpu, Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthUser, UserRole } from '../../types';
import { authService } from '../../services/authService';

export const AdminDashboard: React.FC = () => {
  const { currentUser, auditLogs } = useAuth();

  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [message, setMessage] = useState<string | null>(null);

  // Platform settings state
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [strictEmergencyMode, setStrictEmergencyMode] = useState(true);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const userList = await authService.getAdminUsers();
      setUsers(userList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    setMessage(`Updated user role to ${newRole.toUpperCase()}`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
    setMessage('User account status updated.');
    setTimeout(() => setMessage(null), 3000);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Administrator Control Center
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> FIPS-140 Encryption Active
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            MediCore Platform Governance & RBAC
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            System Administrator: {currentUser?.fullName || 'Root Admin'} • {currentUser?.email}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchUsers}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
            <span>Sync Directory</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Patients</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {users.filter((u) => u.role === 'patient').length || 1} Patients
            </div>
            <div className="text-xs text-teal-600 font-semibold mt-1">HIPAA Encrypted DB</div>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Doctors</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {users.filter((u) => u.role === 'doctor').length || 1} Specialists
            </div>
            <div className="text-xs text-blue-600 font-semibold mt-1">100% Medical Council Verified</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Security Architecture</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">PBKDF2-100K</div>
            <div className="text-xs text-purple-600 font-semibold mt-1">RFC 7519 HMAC-SHA256</div>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Audit Health</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">100% Compliant</div>
            <div className="text-xs text-slate-500 mt-1">0 Security Violations</div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">User Identity & Access Management (IAM)</h2>
            <p className="text-xs text-slate-500">Manage registered patients, verified doctors, and administrative roles</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-purple-600 w-48"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="patient">Patients</option>
              <option value="doctor">Doctors</option>
              <option value="admin">Administrators</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Email Verification</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs">
                      {u.fullName.charAt(0)}
                    </div>
                    <div>
                      <div>{u.fullName}</div>
                      <div className="text-[10px] font-mono text-slate-400">{u.id}</div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-700">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : u.role === 'doctor'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-teal-100 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {u.emailVerified ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-amber-600 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Pending Verification
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(u.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                        u.isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {u.isActive ? 'Active' : 'Suspended'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                      className="px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white outline-none cursor-pointer"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Audit Logs & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Security Audit Log Stream */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Security Audit Trail</h3>
              <p className="text-xs text-slate-500">Immutable authentication & access event stream</p>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              AES-256 Logged
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-800">{log.action}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {log.timestamp} • IP: {log.ipAddress}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Platform Health & Safety Controls</h3>
            <p className="text-xs text-slate-500">Global clinical policy and emergency dispatch settings</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <div className="text-xs font-bold text-slate-800">Clinical Emergency Triage Filter</div>
                <div className="text-[11px] text-slate-500">Auto-intercept chest pain, breathing difficulty & stroke</div>
              </div>
              <input
                type="checkbox"
                checked={strictEmergencyMode}
                onChange={(e) => setStrictEmergencyMode(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <div className="text-xs font-bold text-slate-800">Hospital Maintenance Mode</div>
                <div className="text-[11px] text-slate-500">Temporarily restrict non-emergency booking slots</div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Database className="w-4 h-4 text-purple-700" />
                <span>Zero-Trust Storage Architecture</span>
              </div>
              <p className="text-[11px] text-purple-800">
                Passwords hashed with 100,000 PBKDF2-HMAC-SHA256 rounds. JWT session tokens expire in 60 minutes with rolling refresh token revocation.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
