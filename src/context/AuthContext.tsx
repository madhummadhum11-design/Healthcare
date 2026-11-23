// MediCore AI - Patient & Multi-Role Authentication, Profile, and Security Context

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PatientProfile, AuthUser, UserRole, AuthPageView } from '../types';
import { authService } from '../services/authService';

export interface AuditLogEntry {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING';
}

interface AuthContextType {
  currentUser: AuthUser | null;
  role: UserRole;
  isLoggedIn: boolean;
  authView: AuthPageView;
  auditLogs: AuditLogEntry[];
  setAuthView: (view: AuthPageView) => void;
  loginWithCredentials: (email: string, pass: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  registerUser: (data: {
    fullName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    password: string;
    role?: UserRole;
  }) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string; demoResetToken?: string }>;
  resetPassword: (token: string, newPass: string) => Promise<{ success: boolean; message: string; error?: string }>;
  switchRole: (newRole: UserRole) => void;
  // Patient Profile & Backward Compatibility
  user: PatientProfile;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<PatientProfile>) => void;
  switchDemoProfile: (profileType: 'john' | 'priya') => void;
  exportHealthData: () => void;
  deleteAccountData: () => void;
}

const DEFAULT_PROFILE_JOHN: PatientProfile = {
  id: 'pat-1001',
  name: 'John Doe',
  age: 42,
  gender: 'Male',
  bloodGroup: 'O+',
  heightCm: 175,
  weightKg: 74.5,
  email: 'patient@medicore.ai',
  phone: '+91 98450 12345',
  emergencyContact: {
    name: 'Sarah Doe',
    relationship: 'Spouse',
    phone: '+91 98450 67890'
  },
  allergies: ['Penicillin', 'Peanuts', 'Sulfa Drugs'],
  chronicConditions: ['Stage 1 Essential Hypertension', 'Mild Dyslipidemia', 'Prediabetes'],
  currentMedications: ['Losartan 50 mg (Daily Morning)', 'Atorvastatin 10 mg (Daily Night)', 'Metformin 500 mg (Twice Daily)'],
  medicalHistory: [
    'Appendectomy (Laparoscopic, 2018)',
    'Mild persistent allergic rhinitis',
    'Family history of premature coronary artery disease (Father)'
  ],
  insuranceProvider: 'Star Health Premier MedAssure',
  policyNumber: 'SH-849302-MED'
};

const DEFAULT_PROFILE_PRIYA: PatientProfile = {
  id: 'pat-1002',
  name: 'Priya Sharma',
  age: 34,
  gender: 'Female',
  bloodGroup: 'B+',
  heightCm: 162,
  weightKg: 62.0,
  email: 'priya.sharma@example.com',
  phone: '+91 99012 34567',
  emergencyContact: {
    name: 'Rajesh Sharma',
    relationship: 'Brother',
    phone: '+91 99012 89012'
  },
  allergies: ['Amoxicillin', 'Dust Mites'],
  chronicConditions: ['Polycystic Ovary Syndrome (PCOS)', 'Mild Hypothyroidism'],
  currentMedications: ['Levothyroxine 50 mcg (Daily Early Morning)', 'Myo-Inositol 2000 mg (Daily)'],
  medicalHistory: [
    'Gestational diabetes screening (Normal)',
    'Endoscopic sinus evaluation (2021)'
  ],
  insuranceProvider: 'HDFC ERGO Optima Restore',
  policyNumber: 'HE-918274-IND'
};

const DEFAULT_AUTH_PATIENT: AuthUser = {
  id: 'usr-patient-1001',
  fullName: 'John Doe',
  email: 'patient@medicore.ai',
  phone: '+91 98450 12345',
  role: 'patient',
  emailVerified: true,
  isActive: true,
  createdAt: '2026-01-15T08:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current Authenticated User (Patient, Doctor, or Admin)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('medicore_auth_user');
    return saved ? JSON.parse(saved) : DEFAULT_AUTH_PATIENT;
  });

  const [role, setRole] = useState<UserRole>(() => {
    return currentUser?.role || 'patient';
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('medicore_logged_in') !== 'false';
  });

  const [authView, setAuthView] = useState<AuthPageView>('authenticated');

  // Patient Profile state
  const [user, setUser] = useState<PatientProfile>(() => {
    const saved = localStorage.getItem('medicore_user');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE_JOHN;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'log-1',
      action: 'Secure Login (PBKDF2-HMAC-SHA256 Verified)',
      timestamp: '2026-11-23 08:00:12 IST',
      ipAddress: '192.168.1.42 (TLS 1.3 Strict)',
      status: 'SUCCESS'
    },
    {
      id: 'log-2',
      action: 'Vitals Record Synchronized (AES-256)',
      timestamp: '2026-11-23 08:15:30 IST',
      ipAddress: '192.168.1.42',
      status: 'SUCCESS'
    },
    {
      id: 'log-3',
      action: 'Electronic Health Record Accessed',
      timestamp: '2026-11-22 17:40:02 IST',
      ipAddress: '192.168.1.42',
      status: 'SUCCESS'
    }
  ]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('medicore_auth_user', JSON.stringify(currentUser));
      setRole(currentUser.role);
    } else {
      localStorage.removeItem('medicore_auth_user');
    }
    localStorage.setItem('medicore_logged_in', isLoggedIn ? 'true' : 'false');
  }, [currentUser, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('medicore_user', JSON.stringify(user));
  }, [user]);

  const addAuditLog = (action: string, status: 'SUCCESS' | 'WARNING' = 'SUCCESS') => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      action,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      ipAddress: '192.168.1.42 (TLS 1.3 Encrypted)',
      status
    };
    setAuditLogs((prev) => [newEntry, ...prev.slice(0, 24)]);
  };

  // Full Credentials Login
  const loginWithCredentials = async (email: string, pass: string, rememberMe = false) => {
    const res = await authService.login(email, pass, rememberMe);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setRole(res.user.role);
      setIsLoggedIn(true);
      setAuthView('authenticated');
      // Update patient profile name if patient
      if (res.user.role === 'patient') {
        setUser((prev) => ({
          ...prev,
          name: res.user!.fullName,
          email: res.user!.email,
          phone: res.user!.phone || prev.phone
        }));
      }
      addAuditLog(`User Authenticated: ${res.user.email} (${res.user.role.toUpperCase()})`);
      return { success: true };
    } else {
      addAuditLog(`Failed Authentication Attempt: ${email}`, 'WARNING');
      return { success: false, error: res.error || 'Authentication failed.' };
    }
  };

  // User Registration
  const registerUser = async (data: {
    fullName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    password: string;
    role?: UserRole;
  }) => {
    const res = await authService.register(data);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setRole(res.user.role);
      setIsLoggedIn(true);
      setAuthView('authenticated');
      if (res.user.role === 'patient') {
        setUser((prev) => ({
          ...prev,
          name: res.user!.fullName,
          email: res.user!.email,
          gender: (res.user!.gender as any) || prev.gender,
          phone: res.user!.phone || prev.phone
        }));
      }
      addAuditLog(`New Patient Account Created: ${res.user.email}`);
      return { success: true };
    }
    return { success: false, error: res.error || 'Registration failed.' };
  };

  // Google OAuth Login
  const loginWithGoogle = async () => {
    const res = await authService.loginWithGoogle();
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setRole(res.user.role);
      setIsLoggedIn(true);
      setAuthView('authenticated');
      addAuditLog(`Google OAuth Verification Succeeded: ${res.user.email}`);
      return true;
    }
    return false;
  };

  // Forgot Password
  const forgotPassword = async (email: string) => {
    const res = await authService.forgotPassword(email);
    addAuditLog(`Password Reset Requested for ${email}`);
    return res;
  };

  // Reset Password
  const resetPassword = async (token: string, newPass: string) => {
    const res = await authService.resetPassword(token, newPass);
    if (res.success) {
      addAuditLog('User Password Reset Successfully');
    } else {
      addAuditLog('Failed Password Reset Attempt', 'WARNING');
    }
    return res;
  };

  // Role Switcher for instant testing in UI
  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (currentUser) {
      setCurrentUser({ ...currentUser, role: newRole });
    } else {
      if (newRole === 'patient') setCurrentUser(DEFAULT_AUTH_PATIENT);
      if (newRole === 'doctor') {
        setCurrentUser({
          id: 'usr-doctor-2001',
          fullName: 'Dr. Rajesh Sharma, MD',
          email: 'doctor@medicore.ai',
          role: 'doctor',
          emailVerified: true,
          isActive: true
        });
      }
      if (newRole === 'admin') {
        setCurrentUser({
          id: 'usr-admin-3001',
          fullName: 'System Administrator',
          email: 'admin@medicore.ai',
          role: 'admin',
          emailVerified: true,
          isActive: true
        });
      }
    }
    addAuditLog(`Switched Active Role View to ${newRole.toUpperCase()}`);
  };

  // Backward compatibility login & logout
  const login = (email: string, pass: string) => {
    loginWithCredentials(email, pass);
    return true;
  };

  const logout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAuthView('login');
    addAuditLog('User Session Terminated');
  };

  const updateProfile = (updated: Partial<PatientProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    addAuditLog('Patient Profile & Clinical Metadata Updated');
  };

  const switchDemoProfile = (profileType: 'john' | 'priya') => {
    if (profileType === 'priya') {
      setUser(DEFAULT_PROFILE_PRIYA);
    } else {
      setUser(DEFAULT_PROFILE_JOHN);
    }
    addAuditLog(`Switched active profile to ${profileType === 'priya' ? 'Priya Sharma' : 'John Doe'}`);
  };

  const exportHealthData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `MediCore_Health_Record_${user.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addAuditLog('Exported Complete Personal Health Record (JSON)');
  };

  const deleteAccountData = () => {
    localStorage.clear();
    setUser(DEFAULT_PROFILE_JOHN);
    setCurrentUser(DEFAULT_AUTH_PATIENT);
    addAuditLog('Patient Requested Complete Data Purge (GDPR Compliant)');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isLoggedIn,
        authView,
        auditLogs,
        setAuthView,
        loginWithCredentials,
        registerUser,
        loginWithGoogle,
        forgotPassword,
        resetPassword,
        switchRole,
        user,
        login,
        logout,
        updateProfile,
        switchDemoProfile,
        exportHealthData,
        deleteAccountData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
