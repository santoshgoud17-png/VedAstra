import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar, Topbar } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { EducatorDashboard } from './components/EducatorDashboard';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { DiagnosticQuiz } from './components/DiagnosticQuiz';
import { AITutor } from './components/AITutor';
import { VideoPlayer } from './components/VideoPlayer';
import { SkillGraph } from './components/SkillGraph';
import { EmployabilityTracker } from './components/EmployabilityTracker';
import { Community } from './components/Community';
import { NotificationsPage } from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { AuthPage } from './components/AuthPage';
import { ToastContainer } from './components/Toast';
import { LiveClasses } from './components/LiveClasses';
import { LiveClassroom } from './components/LiveClassroom';
import { LEADERBOARD } from './demoData';
import { Brain, Zap, Trophy } from 'lucide-react';

// ──────────────────────────────────────────────────────
// AI Floating Button
// ──────────────────────────────────────────────────────
const FloatingAI: React.FC = () => {
  const { setCurrentView, currentView } = useApp();
  if (currentView === 'landing' || currentView === 'ai-tutor') return null;
  return (
    <button
      className="fab animate-pulse-ring"
      onClick={() => setCurrentView('ai-tutor')}
      title="Open AI Tutor"
    >
      <Brain size={22} />
    </button>
  );
};

// ──────────────────────────────────────────────────────
// Leaderboard Page (simple)
// ──────────────────────────────────────────────────────
const LeaderboardPage: React.FC = () => {
  const { activeStudent } = useApp();
  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
        <Trophy size={28} color="#F59E0B" />
        <div>
          <h2 className="heading-lg" style={{ margin: 0 }}>Global Leaderboard</h2>
          <p className="body-sm">Your rank: #{activeStudent.leaderboardRank} — Top 1% of learners</p>
        </div>
      </div>
      <div className="chart-container">
        {LEADERBOARD.map((user, i) => (
          <div key={user.rank} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < LEADERBOARD.length - 1 ? '1px solid var(--border-card)' : 'none', animation: `fadeInUp 0.4s ease ${i * 0.05}s both` }}>
            <div style={{ width: 32, fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.1rem', textAlign: 'center', flexShrink: 0, color: user.rank <= 3 ? ['#F59E0B', '#9CA3AF', '#CD7F32'][user.rank - 1] : 'var(--text-muted)' }}>
              {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
            </div>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>{user.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: user.name === activeStudent.name ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{user.name} {user.name === activeStudent.name && '(You)'}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Level {user.level} · 🔥 {user.streak} day streak</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>{user.xp.toLocaleString()}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────
// Certificates Page (simple)
// ──────────────────────────────────────────────────────
const CertificatesPage: React.FC = () => {
  const { activeStudent } = useApp();
  const certs = [
    { title: 'Machine Learning Masterclass', date: 'Jun 15, 2024', id: 'VA-2024-ML-00841', grade: 'A+', score: 94 },
    { title: 'Python for Data Science', date: 'Apr 28, 2024', id: 'VA-2024-PY-00612', grade: 'A', score: 91 },
    { title: 'AI Prompt Engineering', date: 'Mar 10, 2024', id: 'VA-2024-AI-00389', grade: 'A+', score: 96 },
    { title: 'React Full Stack Bootcamp', date: 'Jan 22, 2024', id: 'VA-2024-RS-00201', grade: 'A', score: 88 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 className="heading-lg">My Certificates</h2>
        <p className="body-sm">{activeStudent.certificates} certificates earned · Blockchain-verified</p>
      </div>
      <div className="grid-2">
        {certs.map((cert, i) => (
          <div key={i} className="card-flat" style={{ padding: 0, overflow: 'hidden', animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }}>
            {/* Certificate top bar */}
            <div style={{ height: 6, background: 'linear-gradient(90deg, #7C3AED, #0EA5E9)' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(14,165,233,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.4rem' }}>🎓</span>
                </div>
                <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', color: '#10B981' }}>{cert.grade}</span>
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{cert.title}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{activeStudent.name} · {cert.date}</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <span className="badge badge-purple">Score: {cert.score}%</span>
                <span className="badge badge-green">✓ Verified</span>
              </div>
              <div style={{ padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-xs)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{cert.id}</span>
                <div style={{ width: 28, height: 28, background: 'var(--bg-card)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>QR</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Download PDF</button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>Share</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────
// Page title map
// ──────────────────────────────────────────────────────
const PAGE_TITLES: Record<string, string> = {
  'live-classes': 'Live Classes',
  'live-classroom': 'Live Classroom',
  'student-dashboard': 'Dashboard',
  'learn': 'Learning Hub',
  'ai-tutor': 'AI Tutor — Veda',
  'skill-graph': 'Skill Graph',
  'employability': 'Career Engine',
  'community': 'Community',
  'educator-dashboard': 'Educator Dashboard',
  'recruiter-dashboard': 'Talent Board',
  'admin-dashboard': 'Admin Dashboard',
  'leaderboard': 'Global Leaderboard',
  'certificates': 'My Certificates',
  'notifications': 'Notifications',
  'settings': 'Settings',
  'diagnostic': 'AI Diagnostic',
};

// ──────────────────────────────────────────────────────
// Inner App (uses context)
// ──────────────────────────────────────────────────────
const AppInner: React.FC = () => {
  const { currentView, toasts, removeToast } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Full-page views without sidebar
  if (currentView === 'landing') {
    return (
      <div className="animate-fade-in">
        <LandingPage />
        <FloatingAI />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <div className="animate-fade-in">
        <AuthPage />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  // Full-page diagnostic (no sidebar layout)
  const isFullPage = currentView === 'diagnostic';

  if (isFullPage) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: 28 }}>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>VedAstra</span>
        </div>
        <DiagnosticQuiz />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  // LiveClassroom is a full-viewport experience (no sidebar)
  if (currentView === 'live-classroom') {
    return (
      <>
        <LiveClassroom />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  // Layouts with sidebar
  const title = PAGE_TITLES[currentView] || '';

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div className="main-area">
        <Topbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Page title (for pages other than learn which has its own header) */}
        {currentView !== 'learn' && (
          <div style={{ padding: '0 32px', height: 48, display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-card)', background: 'var(--bg-card)', flexShrink: 0 }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              VedAstra &rsaquo; <span style={{ color: 'var(--text-primary)' }}>{title}</span>
            </span>
          </div>
        )}

        <main className="page-content animate-fade-in" style={{ padding: currentView === 'learn' ? 0 : undefined }}>
          <div className={currentView === 'learn' ? '' : 'content-container'}>
            {currentView === 'student-dashboard' && <StudentDashboard />}
            {currentView === 'learn' && <VideoPlayer />}
            {currentView === 'live-classes' && <LiveClasses />}
            {currentView === 'ai-tutor' && <AITutor />}
            {currentView === 'skill-graph' && <SkillGraph />}
            {currentView === 'employability' && <EmployabilityTracker />}
            {currentView === 'community' && <Community />}
            {currentView === 'educator-dashboard' && <EducatorDashboard />}
            {currentView === 'recruiter-dashboard' && <RecruiterDashboard />}
            {currentView === 'leaderboard' && <LeaderboardPage />}
            {currentView === 'certificates' && <CertificatesPage />}
            {currentView === 'notifications' && <NotificationsPage />}
            {currentView === 'settings' && <SettingsPage />}
            {currentView === 'admin-dashboard' && (
              <div style={{ textAlign: 'center', paddingTop: 60 }}>
                <div style={{ fontSize: '3rem' }}>🏗️</div>
                <h2 className="heading-lg" style={{ marginTop: 12 }}>Admin Dashboard</h2>
                <p className="body-md">Platform analytics & moderation tools</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <FloatingAI />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

// ──────────────────────────────────────────────────────
// Root App
// ──────────────────────────────────────────────────────
function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;
