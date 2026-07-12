import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_STUDENTS } from '../demoData';
import { useTranslation } from '../i18n';
import { User, Bell, Lock, Palette, Globe, Brain, Shield, Link, ChevronRight } from 'lucide-react';

// Section IDs are stable; labels translated at render time
const SETTING_SECTION_DEFS = [
  { id: 'profile', labelKey: 'settings.profile', icon: User },
  { id: 'notifications', labelKey: 'settings.notifications', icon: Bell },
  { id: 'appearance', labelKey: 'settings.appearance', icon: Palette },
  { id: 'language', labelKey: 'settings.language', icon: Globe },
  { id: 'ai', labelKey: 'settings.aiPreferences', icon: Brain },
  { id: 'privacy', labelKey: 'settings.privacy', icon: Shield },
  { id: 'accounts', labelKey: 'settings.connectedAccounts', icon: Link },
  { id: 'security', labelKey: 'settings.security', icon: Lock },
];

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, activeStudent, setActiveStudentId, language, setLanguage } = useApp();
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
      {/* Settings Nav */}
      <div className="card-flat" style={{ padding: '8px', height: 'fit-content' }}>
        {SETTING_SECTION_DEFS.map(s => {
          const Icon = s.icon;
          return (
            <button key={s.id} onClick={() => setActiveSection(s.id)} className={`nav-item ${activeSection === s.id ? 'active' : ''}`}>
              <Icon size={15} /> {t(s.labelKey as any)}
              {activeSection === s.id && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="card-flat" style={{ padding: 28 }}>
        {activeSection === 'profile' && (
          <div>
            <h3 className="heading-md" style={{ marginBottom: 20 }}>Profile Settings</h3>
            <div style={{ display: 'flex', gap: 20, marginBottom: 24, alignItems: 'flex-start' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, color: 'white', fontFamily: 'Outfit', flexShrink: 0 }}>
                {activeStudent.initials}
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>{activeStudent.name}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 10px' }}>{activeStudent.email}</p>
                <button className="btn btn-secondary btn-sm">{t('settings.changeAvatar')}</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="input-label">{t('settings.fullName')}</label>
                <input className="input-field" defaultValue={activeStudent.name} />
              </div>
              <div>
                <label className="input-label">{t('settings.email')}</label>
                <input className="input-field" defaultValue={activeStudent.email} />
              </div>
              <div>
                <label className="input-label">{t('settings.bio')}</label>
                <textarea className="input-field" rows={3} defaultValue={activeStudent.bio} />
              </div>
              <div>
                <label className="input-label">{t('settings.careerGoal')}</label>
                <input className="input-field" defaultValue={activeStudent.goal} />
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12 }}>Switch Demo Student</h4>
              <div style={{ display: 'flex', gap: 10 }}>
                {DEMO_STUDENTS.map(s => (
                  <button key={s.id} onClick={() => setActiveStudentId(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: activeStudent.id === s.id ? 'rgba(124,58,237,0.08)' : 'var(--bg-tertiary)', border: `1.5px solid ${activeStudent.id === s.id ? 'var(--accent-primary)' : 'var(--border-card)'}`, borderRadius: 'var(--border-radius-sm)', cursor: 'pointer', transition: '0.15s' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, color: 'white' }}>{s.initials}</div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: 20 }}>{t('settings.saveChanges')}</button>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div>
            <h3 className="heading-md" style={{ marginBottom: 20 }}>Appearance</h3>
            <div>
              <label className="input-label">Theme</label>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                {['light', 'dark'].map(themeOption => (
                  <button key={themeOption} onClick={() => { if (theme !== themeOption) toggleTheme(); }} style={{ flex: 1, padding: '16px', borderRadius: 'var(--border-radius-md)', border: `2px solid ${theme === themeOption ? 'var(--accent-primary)' : 'var(--border-card)'}`, background: themeOption === 'dark' ? '#0D0E1A' : '#FAF8F5', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transition: '0.2s' }}>
                    <div style={{ fontSize: '1.4rem' }}>{themeOption === 'dark' ? '🌙' : '☀️'}</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: themeOption === 'dark' ? '#E2E8F0' : '#1A1523' }}>{themeOption === 'dark' ? t('settings.darkMode') : t('settings.lightMode')}</div>
                    {theme === themeOption && <div style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{t('settings.active')}</div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'language' && (
          <div>
            <h3 className="heading-md" style={{ marginBottom: 20 }}>Language</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { code: 'en', label: 'English', flag: '🇺🇸', native: 'English' },
                { code: 'hi', label: 'Hindi', flag: '🇮🇳', native: 'हिंदी' },
                { code: 'te', label: 'Telugu', flag: '🇮🇳', native: 'తెలుగు' },
                { code: 'ta', label: 'Tamil', flag: '🇮🇳', native: 'தமிழ்' },
                { code: 'kn', label: 'Kannada', flag: '🇮🇳', native: 'ಕನ್ನಡ' },
                { code: 'ml', label: 'Malayalam', flag: '🇮🇳', native: 'മലയാളം' },
                { code: 'es', label: 'Spanish', flag: '🇪🇸', native: 'Español' },
                { code: 'ja', label: 'Japanese', flag: '🇯🇵', native: '日本語' },
              ].map(l => (
                <button key={l.code} onClick={() => setLanguage(l.code as any)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', border: `2px solid ${language === l.code ? 'var(--accent-primary)' : 'var(--border-card)'}`, borderRadius: 'var(--border-radius-md)', background: language === l.code ? 'rgba(124,58,237,0.06)' : 'var(--bg-card)', cursor: 'pointer', transition: '0.15s' }}>
                  <span style={{ fontSize: '1.4rem' }}>{l.flag}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{l.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{l.native}</div>
                  </div>
                  {language === l.code && <div style={{ marginLeft: 'auto', color: 'var(--accent-primary)', fontWeight: 800 }}>✓</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {(activeSection === 'notifications' || activeSection === 'ai' || activeSection === 'privacy' || activeSection === 'security' || activeSection === 'accounts') && (
          <div>
            <h3 className="heading-md" style={{ marginBottom: 20, textTransform: 'capitalize' }}>{activeSection} Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Email notifications for new courses', 'Push notifications for assignments', 'Weekly digest email',
                'AI recommendation alerts', 'Recruiter view notifications', 'Community mentions',
              ].map((setting, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-card)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{setting}</span>
                  <div style={{ width: 42, height: 22, borderRadius: 11, background: i % 3 !== 2 ? 'var(--accent-primary)' : 'var(--bg-hover)', cursor: 'pointer', position: 'relative', transition: '0.2s' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: i % 3 !== 2 ? 22 : 2, transition: '0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
