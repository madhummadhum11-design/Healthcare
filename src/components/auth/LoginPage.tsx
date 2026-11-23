import React, { useState } from 'react';
import {
  Activity, Shield, Lock, Mail, Eye, EyeOff, ArrowRight,
  CheckCircle2, AlertCircle, Loader2, UserCheck, Stethoscope, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { loginWithCredentials, loginWithGoogle, setAuthView } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithCredentials(email, password, rememberMe);
      if (!result.success) {
        setError(result.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to connect to authentication service.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const success = await loginWithGoogle();
      if (!success) {
        setError('Google authentication could not be completed.');
      }
    } catch (err) {
      setError('Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickPreset = (roleType: 'patient' | 'doctor' | 'admin') => {
    setError(null);
    if (roleType === 'patient') {
      setEmail('patient@medicore.ai');
      setPassword('Password123!');
    } else if (roleType === 'doctor') {
      setEmail('doctor@medicore.ai');
      setPassword('DoctorPass123!');
    } else if (roleType === 'admin') {
      setEmail('admin@medicore.ai');
      setPassword('AdminSecure2026!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 bg-teal-600 rounded-2xl shadow-lg shadow-teal-700/20 mb-3 text-white">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          MediCore <span className="text-teal-600">AI</span>
        </h2>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          Intelligent Healthcare Management & Voice Assistant Portal
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-2xl sm:px-10 border border-slate-100">
          
          {/* Medical Trust Badge */}
          <div className="mb-6 bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span className="text-xs font-semibold text-teal-900">
                Encrypted Medical Cloud Portal (HIPAA & FIPS-140 Compliant)
              </span>
            </div>
            <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">
              TLS 1.3
            </span>
          </div>

          {error && (
            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-start gap-3 text-sm animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Hospital Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. patient@medicore.ai"
                  className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setAuthView('forgot_password')}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-11 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:bg-white transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-600">Keep me logged in on this clinical workstation</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to MediCore</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Sign In Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                  Or authenticate with
                </span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google Workspace</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Logins for Reviewers */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 text-center">
              1-Click Test Role Accounts
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillQuickPreset('patient')}
                className="flex flex-col items-center p-2 rounded-lg border border-teal-200 bg-teal-50/50 hover:bg-teal-100/50 transition-all text-teal-800 text-xs font-medium cursor-pointer"
              >
                <UserCheck className="w-4 h-4 mb-1 text-teal-600" />
                <span>Patient</span>
                <span className="text-[9px] text-teal-600/80">John Doe</span>
              </button>
              <button
                type="button"
                onClick={() => fillQuickPreset('doctor')}
                className="flex flex-col items-center p-2 rounded-lg border border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 transition-all text-blue-800 text-xs font-medium cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 mb-1 text-blue-600" />
                <span>Doctor</span>
                <span className="text-[9px] text-blue-600/80">Dr. Sharma</span>
              </button>
              <button
                type="button"
                onClick={() => fillQuickPreset('admin')}
                className="flex flex-col items-center p-2 rounded-lg border border-purple-200 bg-purple-50/50 hover:bg-purple-100/50 transition-all text-purple-800 text-xs font-medium cursor-pointer"
              >
                <Shield className="w-4 h-4 mb-1 text-purple-600" />
                <span>Admin</span>
                <span className="text-[9px] text-purple-600/80">Hospital Admin</span>
              </button>
            </div>
          </div>

          {/* Registration link */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={() => setAuthView('register')}
              className="font-bold text-teal-600 hover:text-teal-700 hover:underline"
            >
              Create Patient Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
