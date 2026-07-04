import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { DemoStudent, DemoEducator, DemoRecruiter } from '../demoData';
import { DEMO_STUDENTS, DEMO_EDUCATORS, DEMO_RECRUITERS, PERSONALIZED_ROADMAP } from '../demoData';
import { authService } from '../services/authService';
import type { AuthUser, RegisterData } from '../services/authService';
import type { ToastMessage } from '../components/Toast';

export type UserRole = 'student' | 'educator' | 'recruiter' | 'admin';
export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml' | 'es' | 'ja';
export type View =
  | 'landing' | 'login' | 'diagnostic'
  | 'student-dashboard' | 'learn' | 'employability' | 'community' | 'ai-tutor' | 'skill-graph'
  | 'live-classes' | 'live-classroom'
  | 'educator-dashboard' | 'recruiter-dashboard' | 'admin-dashboard'
  | 'certificates' | 'notifications' | 'settings' | 'leaderboard';

export interface RoadmapNode {
  id: string;
  label: string;
  category: string;
  status: 'locked' | 'unlocked' | 'completed';
  x: number;
  y: number;
}

interface AppContextType {
  // Theme & Locale
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;

  // Navigation
  currentView: View;
  setCurrentView: (v: View) => void;

  // Active User
  userRole: UserRole;
  setUserRole: (r: UserRole) => void;
  activeStudent: DemoStudent;
  setActiveStudentId: (id: string) => void;
  activeEducator: DemoEducator;
  setActiveEducatorId: (id: string) => void;
  activeRecruiter: DemoRecruiter;

  // Onboarding
  diagnosticCompleted: boolean;
  setDiagnosticCompleted: (v: boolean) => void;

  // Gamification (writable on top of active student)
  xp: number;
  addXp: (n: number) => void;
  streak: number;
  skills: { [key: string]: number };
  updateSkill: (name: string, delta: number) => void;

  // Roadmap
  roadmap: RoadmapNode[];
  completeRoadmapNode: (id: string) => void;

  // Notifications badge
  unreadCount: number;
  markAllRead: () => void;

  // Course navigation
  activeCourseId: string;
  setActiveCourseId: (id: string) => void;

  // Utility
  resetAll: () => void;

  // Authentication & Session
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData, password?: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<string>;
  resetPassword: (email: string, token: string, newPassword: string) => Promise<void>;
  socialLogin: (provider: string) => Promise<void>;
  logout: () => void;

  // Toast Notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const syncDemoDataWithUser = (user: AuthUser) => {
  if (user.role === 'student') {
    if (!DEMO_STUDENTS.some(s => s.id === user.id)) {
      DEMO_STUDENTS.push({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        role: 'student',
        bio: 'Artificial Intelligence Student',
        goal: 'AI Engineer',
        goalIcon: '🤖',
        streak: 128,
        xp: 18200,
        level: 41,
        hoursStudied: 384,
        weeklyHours: 23,
        certificates: 8,
        leaderboardRank: 3,
        placementProbability: 89,
        interviewReadiness: 83,
        resumeScore: 91,
        skills: [
          { name: 'Programming', value: 92, color: '#7C3AED' },
          { name: 'Machine Learning', value: 84, color: '#0EA5E9' },
          { name: 'AI & LLMs', value: 81, color: '#10B981' },
          { name: 'Communication', value: 74, color: '#F59E0B' },
          { name: 'Cloud & DevOps', value: 61, color: '#EC4899' },
          { name: 'Problem Solving', value: 88, color: '#6366F1' },
        ],
        badges: [
          { id: 'b1', name: 'Top Learner', icon: '🏆', color: '#F59E0B', earned: new Date('2024-06-01') },
          { id: 'b2', name: '100 Day Streak', icon: '🔥', color: '#EF4444', earned: new Date('2024-05-15') },
        ],
        enrolledCourses: ['c1', 'c2', 'c3', 'c4'],
        weeklyData: [3, 4, 2, 5, 6, 4, 3],
        monthlySkillData: [
          { month: 'Jan', programming: 65, ai: 45, problemSolving: 60 },
          { month: 'Feb', programming: 70, ai: 55, problemSolving: 68 },
          { month: 'Mar', programming: 78, ai: 63, problemSolving: 74 },
          { month: 'Apr', programming: 82, ai: 70, problemSolving: 79 },
          { month: 'May', programming: 87, ai: 76, problemSolving: 84 },
          { month: 'Jun', programming: 92, ai: 81, problemSolving: 88 },
        ],
      });
    }
  } else if (user.role === 'educator') {
    if (!DEMO_EDUCATORS.some(e => e.id === user.id)) {
      DEMO_EDUCATORS.push({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        role: 'educator',
        title: 'AI & ML Researcher',
        bio: 'Passionate AI educator and researcher.',
        totalStudents: 21420,
        revenue: 48700,
        followers: 84000,
        completionRate: 91,
        avgRating: 4.9,
        watchHours: 620000,
        aiNotesRate: 98,
        assignmentsCreated: 84,
        courses: ['c1', 'c3'],
        monthlyRevenue: [3200, 3600, 4100, 3900, 4400, 5000, 4800, 5200, 4700, 5500, 5800, 6200],
        monthlyStudents: [800, 950, 1200, 1100, 1400, 1600, 1500, 1800, 1700, 1900, 2100, 2350],
      });
    }
  } else if (user.role === 'recruiter') {
    if (!DEMO_RECRUITERS.some(r => r.id === user.id)) {
      DEMO_RECRUITERS.push({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        role: 'recruiter',
        company: 'VedaAstra AI Partner',
        companyLogo: '🌐',
        hiringFor: 'AI Engineers',
        openPositions: 5,
        interestedStudents: 28,
        avgSkillScore: 84,
        avgInterviewScore: 82,
      });
    }
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── Theme ──────────────────────────────────────
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('va_theme') as 'dark' | 'light') || 'light';
  });

  const toggleTheme = () => setTheme(t => {
    const next = t === 'dark' ? 'light' : 'dark';
    localStorage.setItem('va_theme', next);
    return next;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ── Locale ─────────────────────────────────────
  const [language, setLanguage] = useState<LanguageCode>('en');

  // ── Navigation ─────────────────────────────────
  const [currentView, setCurrentView] = useState<View>('landing');

  // ── User Role ──────────────────────────────────
  const [userRole, setUserRole] = useState<UserRole>('student');

  // ── Active Users ───────────────────────────────
  const [activeStudentId, setActiveStudentId] = useState('s1');
  const [activeEducatorId, setActiveEducatorId] = useState('e1');

  const activeStudent = DEMO_STUDENTS.find(s => s.id === activeStudentId) || DEMO_STUDENTS[0];
  const activeEducator = DEMO_EDUCATORS.find(e => e.id === activeEducatorId) || DEMO_EDUCATORS[0];
  const activeRecruiter = DEMO_RECRUITERS.find(r => r.role === 'recruiter') || DEMO_RECRUITERS[0];

  // ── Onboarding ─────────────────────────────────
  const [diagnosticCompleted, setDiagnosticCompleted] = useState(() => {
    return localStorage.getItem('va_diagnostic') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('va_diagnostic', String(diagnosticCompleted));
  }, [diagnosticCompleted]);

  // ── Gamification ───────────────────────────────
  const [xp, setXp] = useState(() => activeStudent.xp);
  const [streak] = useState(() => activeStudent.streak);
  const [skills, setSkills] = useState<{ [key: string]: number }>(() => {
    const map: { [key: string]: number } = {};
    activeStudent.skills.forEach(s => { map[s.name] = s.value; });
    return map;
  });

  // Sync when active student changes
  useEffect(() => {
    setXp(activeStudent.xp);
    const map: { [key: string]: number } = {};
    activeStudent.skills.forEach(s => { map[s.name] = s.value; });
    setSkills(map);
  }, [activeStudentId, activeStudent]);

  const addXp = useCallback((n: number) => setXp(prev => prev + n), []);
  const updateSkill = useCallback((name: string, delta: number) => {
    setSkills(prev => ({ ...prev, [name]: Math.min(100, (prev[name] || 0) + delta) }));
  }, []);

  // ── Roadmap ────────────────────────────────────
  const [roadmap, setRoadmap] = useState<RoadmapNode[]>(PERSONALIZED_ROADMAP);

  const completeRoadmapNode = useCallback((id: string) => {
    setRoadmap(prev => {
      const idx = prev.findIndex(n => n.id === id);
      return prev.map((n, i) => {
        if (n.id === id) return { ...n, status: 'completed' as const };
        if (i === idx + 1 && n.status === 'locked') return { ...n, status: 'unlocked' as const };
        return n;
      });
    });
    addXp(50);
  }, [addXp]);

  // ── Notifications ──────────────────────────────
  const [unreadCount, setUnreadCount] = useState(3);
  const markAllRead = () => setUnreadCount(0);

  // ── Course Nav ─────────────────────────────────
  const [activeCourseId, setActiveCourseId] = useState('c1');

  // ── Reset ──────────────────────────────────────
  const resetAll = () => {
    localStorage.removeItem('va_theme');
    localStorage.removeItem('va_diagnostic');
    setTheme('light');
    setCurrentView('landing');
    setDiagnosticCompleted(false);
    setActiveStudentId('s1');
    setRoadmap(PERSONALIZED_ROADMAP);
    logout();
  };

  // ── Toast Notifications state & handlers ───────
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // ── Authentication & Session state & handlers ──
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Sync state on load
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      syncDemoDataWithUser(user);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.role);
      if (user.role === 'student') {
        setActiveStudentId(user.id);
      } else if (user.role === 'educator') {
        setActiveEducatorId(user.id);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      syncDemoDataWithUser(user);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.role);
      if (user.role === 'student') {
        setActiveStudentId(user.id);
        setCurrentView('student-dashboard');
      } else if (user.role === 'educator') {
        setActiveEducatorId(user.id);
        setCurrentView('educator-dashboard');
      } else if (user.role === 'recruiter') {
        setCurrentView('recruiter-dashboard');
      } else if (user.role === 'admin') {
        setCurrentView('admin-dashboard');
      }
      showToast(`Welcome back, ${user.name}! 👋`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
      throw err;
    }
  };

  const register = async (data: RegisterData, password?: string) => {
    try {
      const user = await authService.register(data, password);
      showToast('Registration successful! Please verify your email.', 'success');
      // Set temporary state to complete verification
      setCurrentUser(user);
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
      throw err;
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      const user = await authService.verifyEmail(email, code);
      syncDemoDataWithUser(user);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.role);
      if (user.role === 'student') {
        setActiveStudentId(user.id);
        setCurrentView('student-dashboard');
      } else if (user.role === 'educator') {
        setActiveEducatorId(user.id);
        setCurrentView('educator-dashboard');
      } else if (user.role === 'recruiter') {
        setCurrentView('recruiter-dashboard');
      }
      showToast('Email verified successfully! 🎉', 'success');
    } catch (err: any) {
      showToast(err.message || 'Verification failed', 'error');
      throw err;
    }
  };

  const requestPasswordReset = async (email: string): Promise<string> => {
    try {
      const token = await authService.requestPasswordReset(email);
      showToast(`Reset code generated: ${token}`, 'success');
      return token;
    } catch (err: any) {
      showToast(err.message || 'Request failed', 'error');
      throw err;
    }
  };

  const resetPassword = async (email: string, token: string, newPassword: string) => {
    try {
      await authService.resetPassword(email, token, newPassword);
      showToast('Password reset successfully. You can now login!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Reset password failed', 'error');
      throw err;
    }
  };

  const socialLogin = async (provider: string) => {
    try {
      const user = await authService.socialLogin(provider);
      syncDemoDataWithUser(user);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.role);
      if (user.role === 'student') {
        setActiveStudentId(user.id);
        setCurrentView('student-dashboard');
      } else if (user.role === 'educator') {
        setActiveEducatorId(user.id);
        setCurrentView('educator-dashboard');
      } else if (user.role === 'recruiter') {
        setCurrentView('recruiter-dashboard');
      }
      showToast(`Logged in successfully with ${provider}! 🚀`, 'success');
    } catch (err: any) {
      showToast(`Failed to log in with ${provider}`, 'error');
      throw err;
    }
  };

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentView('landing');
    showToast('Signed out successfully. See you again! 👋', 'info');
  }, [showToast]);

  // ── Intercept view navigation for protected routes ──
  const navigateWithProtection = useCallback((view: View) => {
    const protectedViews: View[] = [
      'student-dashboard', 'learn', 'employability', 'community', 'ai-tutor', 'skill-graph',
      'educator-dashboard', 'recruiter-dashboard', 'admin-dashboard',
      'certificates', 'notifications', 'settings', 'leaderboard', 'diagnostic'
    ];
    if (protectedViews.includes(view) && !authService.getCurrentUser()) {
      showToast('Please sign in to access this page', 'info');
      setCurrentView('login');
    } else {
      setCurrentView(view);
    }
  }, [showToast]);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      language, setLanguage,
      currentView, setCurrentView: navigateWithProtection,
      userRole, setUserRole,
      activeStudent, setActiveStudentId,
      activeEducator, setActiveEducatorId,
      activeRecruiter,
      diagnosticCompleted, setDiagnosticCompleted,
      xp, addXp,
      streak,
      skills, updateSkill,
      roadmap, completeRoadmapNode,
      unreadCount, markAllRead,
      activeCourseId, setActiveCourseId,
      resetAll,
      // Auth System
      isAuthenticated,
      currentUser,
      login,
      register,
      verifyEmail,
      requestPasswordReset,
      resetPassword,
      socialLogin,
      logout,
      // Toast System
      toasts,
      showToast,
      removeToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
