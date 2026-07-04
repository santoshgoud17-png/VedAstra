// ============================================================
// VEDASTRA AUTHENTICATION SERVICE (MODULAR ABSTRACT LAYER)
// ============================================================

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'educator' | 'recruiter' | 'admin';
  verified: boolean;
  phoneNumber?: string;
  createdAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'educator' | 'recruiter' | 'admin';
  profilePicture?: string;
  phoneNumber?: string;
}

const LOCAL_USERS_KEY = 'va_auth_users';
const SESSION_TOKEN_KEY = 'va_auth_token';

// Initial Seed Users (corresponding to DEMO Data)
const SEED_USERS: AuthUser[] = [
  {
    id: 's1',
    name: 'Aarav Sharma',
    email: 'aarav@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'student',
    verified: true,
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 's2',
    name: 'Priya Reddy',
    email: 'priya@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'student',
    verified: true,
    createdAt: new Date('2024-01-02').toISOString(),
  },
  {
    id: 's3',
    name: 'John Anderson',
    email: 'john@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    role: 'student',
    verified: true,
    createdAt: new Date('2024-01-03').toISOString(),
  },
  {
    id: 'e1',
    name: 'Dr. Meera Iyer',
    email: 'meera@vedaastra.ai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    role: 'educator',
    verified: true,
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'r1',
    name: 'Microsoft Talent',
    email: 'talent@microsoft.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'recruiter',
    verified: true,
    createdAt: new Date('2024-01-01').toISOString(),
  },
];

// In a real application, passwords would be hashed on the backend.
// We maintain a map of email to password for simulation in LocalStorage.
const PASSWORDS_KEY = 'va_auth_passwords';
const DEFAULT_MOCK_PASSWORD = 'Password123!';

class AuthService {
  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    if (!localStorage.getItem(LOCAL_USERS_KEY)) {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(PASSWORDS_KEY)) {
      const initialPasswords: Record<string, string> = {};
      SEED_USERS.forEach(user => {
        initialPasswords[user.email.toLowerCase()] = DEFAULT_MOCK_PASSWORD;
      });
      localStorage.setItem(PASSWORDS_KEY, JSON.stringify(initialPasswords));
    }
  }

  private getUsers(): AuthUser[] {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
  }

  private getPasswords(): Record<string, string> {
    return JSON.parse(localStorage.getItem(PASSWORDS_KEY) || '{}');
  }

  private generateToken(user: AuthUser): string {
    // Return a base64 encoded JSON web token mock
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    };
    return btoa(JSON.stringify(payload));
  }

  async login(email: string, password: string): Promise<AuthUser> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const passwords = this.getPasswords();

    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      throw new Error('User Not Found');
    }

    if (passwords[normalizedEmail] !== password) {
      throw new Error('Wrong Password');
    }

    if (!user.verified) {
      throw new Error('Email Not Verified');
    }

    const token = this.generateToken(user);
    localStorage.setItem(SESSION_TOKEN_KEY, token);

    return user;
  }

  async register(data: RegisterData, password?: string): Promise<AuthUser> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const normalizedEmail = data.email.trim().toLowerCase();
    const users = this.getUsers();

    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error('Email Already Exists');
    }

    const newUser: AuthUser = {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      avatar: data.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
      role: data.role,
      verified: false, // Must verify email
      phoneNumber: data.phoneNumber,
      createdAt: new Date().toISOString(),
    };

    // Save user
    users.push(newUser);
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));

    // Save mock password
    const passwords = this.getPasswords();
    passwords[normalizedEmail] = password || DEFAULT_MOCK_PASSWORD;
    localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));

    // Seed temporary verification code
    localStorage.setItem(`va_verify_code_${normalizedEmail}`, '123456');

    return newUser;
  }

  async verifyEmail(email: string, code: string): Promise<AuthUser> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const normalizedEmail = email.trim().toLowerCase();
    const storedCode = localStorage.getItem(`va_verify_code_${normalizedEmail}`);

    if (code !== storedCode && code !== '123456') { // Allow 123456 as general mock fallback
      throw new Error('Invalid Verification Code');
    }

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);

    if (userIndex === -1) {
      throw new Error('User Not Found');
    }

    users[userIndex].verified = true;
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));

    localStorage.removeItem(`va_verify_code_${normalizedEmail}`);

    const token = this.generateToken(users[userIndex]);
    localStorage.setItem(SESSION_TOKEN_KEY, token);

    return users[userIndex];
  }

  async requestPasswordReset(email: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 700));

    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getUsers();

    if (!users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error('User Not Found');
    }

    // Seed mock reset token
    const token = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem(`va_reset_token_${normalizedEmail}`, token);

    return token;
  }

  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const normalizedEmail = email.trim().toLowerCase();
    const storedToken = localStorage.getItem(`va_reset_token_${normalizedEmail}`);

    if (!storedToken || token !== storedToken) {
      throw new Error('Invalid or Expired Reset Token');
    }

    const passwords = this.getPasswords();
    passwords[normalizedEmail] = newPassword;
    localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));

    localStorage.removeItem(`va_reset_token_${normalizedEmail}`);
  }

  async socialLogin(provider: string): Promise<AuthUser> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Google, GitHub, Microsoft, LinkedIn simulation
    console.log(`Simulating OAuth login flow for provider: ${provider}`);
    // We log in as Aarav Sharma by default or generate a custom user based on the provider
    const users = this.getUsers();
    let user = users.find(u => u.email.toLowerCase() === 'aarav@vedaastra.ai');

    if (!user) {
      user = {
        id: 's1',
        name: 'Aarav Sharma',
        email: 'aarav@vedaastra.ai',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        role: 'student',
        verified: true,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    }

    const token = this.generateToken(user);
    localStorage.setItem(SESSION_TOKEN_KEY, token);

    return user;
  }

  logout(): void {
    localStorage.removeItem(SESSION_TOKEN_KEY);
  }

  getCurrentUser(): AuthUser | null {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp && Date.now() > payload.exp) {
        this.logout();
        return null;
      }

      const users = this.getUsers();
      return users.find(u => u.id === payload.sub) || null;
    } catch {
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();
