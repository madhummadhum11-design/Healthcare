// MediCore AI - Authentication & User Management Service
// Full REST API integration with FastAPI backend + local persistent fallback

import { AuthUser, UserRole } from '../types';

const API_BASE = 'http://localhost:8000/api';

// Seed demo users for immediate testing if backend is offline
const DEMO_USERS: Record<string, { pass: string; user: AuthUser }> = {
  'patient@medicore.ai': {
    pass: 'Password123!',
    user: {
      id: 'usr-patient-1001',
      fullName: 'John Doe',
      email: 'patient@medicore.ai',
      phone: '+91 98450 12345',
      dateOfBirth: '1984-05-12',
      gender: 'Male',
      role: 'patient',
      emailVerified: true,
      isActive: true,
      createdAt: '2026-01-15T08:00:00Z'
    }
  },
  'doctor@medicore.ai': {
    pass: 'DoctorPass123!',
    user: {
      id: 'usr-doctor-2001',
      fullName: 'Dr. Rajesh Sharma, MD',
      email: 'doctor@medicore.ai',
      phone: '+91 99012 34567',
      dateOfBirth: '1978-08-20',
      gender: 'Male',
      role: 'doctor',
      emailVerified: true,
      isActive: true,
      createdAt: '2025-11-10T10:30:00Z'
    }
  },
  'admin@medicore.ai': {
    pass: 'AdminSecure2026!',
    user: {
      id: 'usr-admin-3001',
      fullName: 'System Administrator',
      email: 'admin@medicore.ai',
      phone: '+91 98800 99999',
      dateOfBirth: '1980-01-01',
      gender: 'Other',
      role: 'admin',
      emailVerified: true,
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z'
    }
  }
};

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
}

export interface RegisterResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
}

export interface ForgotPasswordResult {
  success: boolean;
  message: string;
  demoResetToken?: string;
}

export interface ResetPasswordResult {
  success: boolean;
  message: string;
  error?: string;
}

class AuthService {
  private getToken(): string | null {
    return localStorage.getItem('medicore_access_token');
  }

  private setToken(token: string) {
    localStorage.setItem('medicore_access_token', token);
  }

  private clearToken() {
    localStorage.removeItem('medicore_access_token');
    localStorage.removeItem('medicore_refresh_token');
  }

  // Helper for persistent offline registered users
  private getLocalUsers(): Record<string, { pass: string; user: AuthUser }> {
    const saved = localStorage.getItem('medicore_registered_users');
    return saved ? { ...DEMO_USERS, ...JSON.parse(saved) } : DEMO_USERS;
  }

  private saveLocalUser(user: AuthUser, pass: string) {
    const current = this.getLocalUsers();
    current[user.email.toLowerCase()] = { pass, user };
    localStorage.setItem('medicore_registered_users', JSON.stringify(current));
  }

  // 1. User Login
  async login(email: string, pass: string, rememberMe = false): Promise<LoginResult> {
    const cleanEmail = email.trim().toLowerCase();
    
    // Try FastAPI Backend first
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: pass, rememberMe }),
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const data = await response.json();
        this.setToken(data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('medicore_refresh_token', data.refreshToken);
        }
        return {
          success: true,
          user: { ...data.user, token: data.accessToken },
          token: data.accessToken
        };
      } else {
        const errData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errData.detail || 'Invalid email or password.'
        };
      }
    } catch (e) {
      // Graceful offline simulated login
      const allUsers = this.getLocalUsers();
      const account = allUsers[cleanEmail];
      if (account) {
        if (account.pass === pass) {
          const fakeToken = `simulated-jwt-${account.user.id}-${Date.now()}`;
          this.setToken(fakeToken);
          return {
            success: true,
            user: { ...account.user, token: fakeToken },
            token: fakeToken
          };
        } else {
          return { success: false, error: 'Invalid password. Please check your credentials.' };
        }
      }
      return { success: false, error: 'No account found with this email address. Please register.' };
    }
  }

  // 2. Patient Registration
  async register(data: {
    fullName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    password: string;
    role?: UserRole;
  }): Promise<RegisterResult> {
    const cleanEmail = data.email.trim().toLowerCase();

    // Try FastAPI Backend
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: cleanEmail,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          password: data.password,
          role: data.role || 'patient'
        }),
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const resData = await response.json();
        this.setToken(resData.accessToken);
        return {
          success: true,
          user: { ...resData.user, token: resData.accessToken },
          token: resData.accessToken
        };
      } else {
        const errData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errData.detail || 'Registration failed. Please check inputs.'
        };
      }
    } catch (e) {
      // Graceful offline simulated registration
      const allUsers = this.getLocalUsers();
      if (allUsers[cleanEmail]) {
        return { success: false, error: 'An account with this email address already exists.' };
      }

      const newUser: AuthUser = {
        id: `usr-${Date.now()}`,
        fullName: data.fullName,
        email: cleanEmail,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        role: data.role || 'patient',
        emailVerified: false,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      this.saveLocalUser(newUser, data.password);
      const fakeToken = `simulated-jwt-${newUser.id}-${Date.now()}`;
      this.setToken(fakeToken);

      return {
        success: true,
        user: { ...newUser, token: fakeToken },
        token: fakeToken
      };
    }
  }

  // 3. Google OAuth Login
  async loginWithGoogle(mockGoogleUser?: { email: string; name: string }): Promise<LoginResult> {
    const userToLogin = mockGoogleUser || {
      email: 'alex.chen.patient@gmail.com',
      name: 'Alex Chen'
    };

    try {
      const response = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userToLogin.email,
          name: userToLogin.name
        }),
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const data = await response.json();
        this.setToken(data.accessToken);
        return {
          success: true,
          user: { ...data.user, token: data.accessToken },
          token: data.accessToken
        };
      }
    } catch (e) {
      // Fallback
    }

    // Offline Google user provisioning
    const fakeUser: AuthUser = {
      id: `usr-google-${Date.now()}`,
      fullName: userToLogin.name,
      email: userToLogin.email,
      role: 'patient',
      emailVerified: true,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    const fakeToken = `simulated-google-jwt-${Date.now()}`;
    this.setToken(fakeToken);
    return {
      success: true,
      user: { ...fakeUser, token: fakeToken },
      token: fakeToken
    };
  }

  // 4. Forgot Password
  async forgotPassword(email: string): Promise<ForgotPasswordResult> {
    const cleanEmail = email.trim().toLowerCase();

    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: data.message,
          demoResetToken: data.demoResetToken
        };
      }
    } catch (e) {
      // Fallback
    }

    const demoToken = `reset-sec-${Math.random().toString(36).substring(2, 10)}`;
    localStorage.setItem(`reset_token_${demoToken}`, cleanEmail);

    return {
      success: true,
      message: 'If your email is registered in MediCore AI, password reset instructions have been sent.',
      demoResetToken: demoToken
    };
  }

  // 5. Reset Password
  async resetPassword(token: string, newPass: string): Promise<ResetPasswordResult> {
    try {
      const response = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.trim(), newPassword: newPass }),
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, message: data.message };
      } else {
        const err = await response.json().catch(() => ({}));
        return { success: false, message: '', error: err.detail || 'Reset failed.' };
      }
    } catch (e) {
      // Fallback
      const linkedEmail = localStorage.getItem(`reset_token_${token.trim()}`);
      if (linkedEmail) {
        const users = this.getLocalUsers();
        if (users[linkedEmail]) {
          users[linkedEmail].pass = newPass;
          localStorage.setItem('medicore_registered_users', JSON.stringify(users));
        }
        localStorage.removeItem(`reset_token_${token.trim()}`);
        return { success: true, message: 'Password has been successfully reset! You can now log in.' };
      }
      return { success: false, message: '', error: 'Invalid or expired password reset token.' };
    }
  }

  // 6. Logout
  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          signal: AbortSignal.timeout(2000)
        });
      } catch (e) {
        // Continue logout locally
      }
    }
    this.clearToken();
  }

  // 7. Admin Fetch Users
  async getAdminUsers(): Promise<AuthUser[]> {
    const token = this.getToken();
    try {
      const response = await fetch(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(3000)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      // Fallback
    }
    // Return all local users
    const allUsers = this.getLocalUsers();
    return Object.values(allUsers).map((u) => u.user);
  }
}

export const authService = new AuthService();
