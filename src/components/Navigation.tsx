import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { LanguageCode, UserRole, View } from '../context/AppContext';
import { DEMO_STUDENTS } from '../demoData';
import { useTranslation } from '../i18n';
import {
  LayoutDashboard, BookOpen, Target, Users, Brain,
  BarChart2, Award, Bell, Settings, Sun, Moon,
  Languages, ChevronDown, Zap, Search,
  ChevronRight, Trophy, LogOut, Menu, X, Video
} from 'lucide-react';

// Nav section IDs stay stable; labels are translated at render time
const NAV_SECTION_DEFS: { labelKey: string; roles: UserRole[]; items: { id: View; labelKey: string; icon: React.FC<any>; badge?: string | number }[] }[] = [
  {
    labelKey: 'nav.learn',
    roles: ['student'],
    items: [
      { id: 'student-dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
      { id: 'learn',             labelKey: 'nav.courses',   icon: BookOpen },
      { id: 'live-classes',      labelKey: 'nav.liveClasses', icon: Video },
      { id: 'ai-tutor',         labelKey: 'nav.aiTutor',  icon: Brain },
      { id: 'skill-graph',      labelKey: 'nav.skillGraph', icon: BarChart2 },
    ],
  },
  {
    labelKey: 'nav.grow',
    roles: ['student'],
    items: [
      { id: 'employability',    labelKey: 'nav.careerEngine',   icon: Target },
      { id: 'leaderboard',     labelKey: 'nav.leaderboard',     icon: Trophy },
      { id: 'certificates',    labelKey: 'nav.certificates',    icon: Award },
    ],
  },
  {
    labelKey: 'nav.connect',
    roles: ['student', 'educator'],
    items: [
      { id: 'community', labelKey: 'nav.community', icon: Users },
    ],
  },
  {
    labelKey: 'nav.teach',
    roles: ['educator'],
    items: [
      { id: 'educator-dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
      { id: 'live-classes',       labelKey: 'nav.liveClasses', icon: Video },
      { id: 'community',          labelKey: 'nav.community', icon: Users },
    ],
  },
  {
    labelKey: 'nav.recruit',
    roles: ['recruiter'],
    items: [
      { id: 'recruiter-dashboard', labelKey: 'nav.talentBoard', icon: Users },
    ],
  },
  {
    labelKey: 'Admin',
    roles: ['admin'],
    items: [
      { id: 'admin-dashboard', labelKey: 'nav.platformAnalytics', icon: BarChart2 },
    ],
  },
];

const LANG_OPTIONS: { code: LanguageCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'हिंदी',   flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు',  flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்',  flag: '🇮🇳' },
  { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export interface NavigationProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<NavigationProps> = ({ mobileOpen, setMobileOpen }) => {
  const {
    currentView, setCurrentView,
    userRole, setUserRole,
    activeStudent, setActiveStudentId,
    activeEducator: _activeEducator, setActiveEducatorId,
    xp, streak,
    diagnosticCompleted,
    resetAll,
    isAuthenticated,
    logout,
  } = useApp();
  const { t } = useTranslation();

  const [showStudentPicker, setShowStudentPicker] = useState(false);

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setMobileOpen(false);
  };

  const filteredSections = NAV_SECTION_DEFS.filter(s => s.roles.includes(userRole));
  const xpToNextLevel = activeStudent.level * 500;
  const xpPercent = Math.min(100, (xp / xpToNextLevel) * 100);

  const SidebarContent = () => (
    <>
      {/* Brand Logo */}
      <button
        onClick={() => handleNavClick('landing')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 20px 0', background: 'transparent', border: 'none', cursor: 'pointer', width: '100%' }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(124,58,237,0.35)', flexShrink: 0,
        }}>
          <Zap size={18} color="white" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            VedAstra
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>AI Learning Ecosystem</div>
        </div>
      </button>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-card)', margin: '16px 16px 0' }} />

      {/* User Profile Card */}
      {userRole === 'student' && (
        <div style={{ margin: '12px 12px 0', padding: '14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }} onClick={() => setShowStudentPicker(!showStudentPicker)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar-initials sm" style={{ background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', color: 'white', fontSize: '0.75rem', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontWeight: 800, flexShrink: 0 }}>
              {activeStudent.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeStudent.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Level {activeStudent.level} · {activeStudent.goalIcon} {activeStudent.goal}</div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, transition: '0.2s', transform: showStudentPicker ? 'rotate(180deg)' : 'rotate(0)' }} />
          </div>

          {/* XP Progress */}
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 4 }}>
              <span>🔥 {streak} day streak</span>
              <span>{xp.toLocaleString()} XP</span>
            </div>
            <div style={{ height: 5, background: 'var(--border-card)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${xpPercent}%`, background: 'linear-gradient(90deg, #7C3AED, #0EA5E9)', borderRadius: 3, transition: '0.5s ease' }} />
            </div>
          </div>
        </div>
      )}

      {/* Student picker dropdown */}
      {showStudentPicker && userRole === 'student' && (
        <div style={{ margin: '4px 12px 0', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', animation: 'fadeInUp 0.2s ease' }}>
          {DEMO_STUDENTS.map(s => (
            <button key={s.id} onClick={() => { setActiveStudentId(s.id); setShowStudentPicker(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', background: activeStudent.id === s.id ? 'rgba(124,58,237,0.06)' : 'transparent', border: 'none', cursor: 'pointer', transition: '0.15s', borderBottom: '1px solid var(--border-card)' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>{s.initials}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.goalIcon} {s.goal} · Lv.{s.level}</div>
              </div>
              {activeStudent.id === s.id && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)' }} />}
            </button>
          ))}
          <button onClick={() => { setUserRole('educator'); setActiveEducatorId('e1'); handleNavClick('educator-dashboard'); setShowStudentPicker(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>MI</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Dr. Meera Iyer</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>🎓 Educator · 84K followers</div>
            </div>
          </button>
        </div>
      )}

      {/* Navigation Sections */}
      <div style={{ padding: '12px 12px 0', flex: 1 }}>
        {filteredSections.map(section => (
          <div key={section.labelKey} style={{ marginBottom: 4 }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 6px 4px' }}>
              {t(section.labelKey as any)}
            </div>
            {section.items.map(item => {
              const Icon = item.icon;
              const active = currentView === item.id;
              return (
                <button key={item.id} onClick={() => handleNavClick(item.id)} className={`nav-item ${active ? 'active' : ''}`}>
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{t(item.labelKey as any)}</span>
                  {item.badge !== undefined && (
                    <span style={{ background: 'var(--accent-primary)', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px', borderRadius: '99px', minWidth: 18, textAlign: 'center' }}>
                      {item.badge}
                    </span>
                  )}
                  {active && <ChevronRight size={12} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom utility buttons */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--border-card)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {!diagnosticCompleted && userRole === 'student' && (
          <button onClick={() => handleNavClick('diagnostic')} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 12px', background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', marginBottom: 4, color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: 600 }}>
            <Brain size={14} />
            {t('nav.startDiagnostic')}
          </button>
        )}
        <button className="nav-item" onClick={() => handleNavClick('settings')}>
          <Settings size={15} /> {t('nav.settings')}
        </button>
        <button className="nav-item" onClick={isAuthenticated ? logout : resetAll} style={{ color: 'var(--text-muted)' }}>
          <LogOut size={15} /> {isAuthenticated ? t('nav.signOut') : t('nav.resetDemo')}
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
          <aside style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 280, background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-xl)', animation: 'slideInLeft 0.25s ease' }}>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

export const Topbar: React.FC<NavigationProps> = ({ mobileOpen, setMobileOpen }) => {
  const {
    userRole, setUserRole,
    activeStudent,
    activeEducator,
    theme, toggleTheme,
    language, setLanguage,
    unreadCount,
    setCurrentView,
    setCurrentView: nav,
  } = useApp();
  const { t } = useTranslation();

  const [showLangPicker, setShowLangPicker] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'educator') nav('educator-dashboard');
    else if (role === 'recruiter') nav('recruiter-dashboard');
    else if (role === 'admin') nav('admin-dashboard');
    else nav('student-dashboard');
    setMobileOpen(false);
  };

  const currentLang = LANG_OPTIONS.find(l => l.code === language) || LANG_OPTIONS[0];

  return (
    <header className="topbar" style={{ position: 'sticky', top: 0, zIndex: 15 }}>
      {/* Mobile hamburger */}
      <button className="btn-icon" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Search Bar */}
      <div style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder={t('topbar.searchPlaceholder')}
          className="input-field"
          style={{ paddingLeft: 36, background: 'var(--bg-tertiary)', border: '1px solid var(--border-card)', fontSize: '0.875rem', padding: '8px 12px 8px 36px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
        {/* Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'var(--bg-tertiary)', padding: 3, borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-card)' }}>
          {(['student', 'educator', 'recruiter'] as UserRole[]).map(role => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--border-radius-xs)',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: userRole === role ? 'linear-gradient(135deg, #7C3AED, #0EA5E9)' : 'transparent',
                color: userRole === role ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Language Picker */}
        <div style={{ position: 'relative' }}>
          <button className="btn-icon btn-sm" onClick={() => setShowLangPicker(!showLangPicker)} style={{ gap: 6, display: 'flex', alignItems: 'center', padding: '0 10px', width: 'auto', fontWeight: 600, fontSize: '0.78rem' }}>
            <Languages size={14} /> {currentLang.flag}
          </button>
          {showLangPicker && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', zIndex: 100, minWidth: 160, animation: 'fadeInUp 0.2s ease' }}>
              {LANG_OPTIONS.map(l => (
                <button key={l.code} onClick={() => { setLanguage(l.code); setShowLangPicker(false); }} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 14px', background: language === l.code ? 'rgba(124,58,237,0.06)' : 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-card)' }}>
                  <span>{l.flag}</span> {l.label}
                  {language === l.code && <span style={{ marginLeft: 'auto', color: 'var(--accent-primary)', fontWeight: 700 }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="btn-icon" onClick={() => setCurrentView('notifications')} style={{ position: 'relative' }}>
          <Bell size={16} />
          {unreadCount > 0 && (
            <span style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', fontSize: '0.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-card)' }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button className="btn-icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* User Avatar */}
        <button onClick={() => setCurrentView('settings')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit' }}>
            {userRole === 'student' ? activeStudent.initials : userRole === 'educator' ? activeEducator.initials : 'MS'}
          </div>
        </button>
      </div>
    </header>
  );
};

export const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Topbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </>
  );
};
