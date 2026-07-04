import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_PROFILES } from '../demoData';
import { Target, TrendingUp, FileText, Mic, AlertCircle, CheckCircle } from 'lucide-react';

const ProgressRing: React.FC<{ value: number; size?: number; stroke?: number; color?: string }> = ({ value, size = 100, stroke = 8, color = '#7C3AED' }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-tertiary)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: size > 80 ? '1.2rem' : '0.9rem', color: 'var(--text-primary)' }}>{value}%</div>
      </div>
    </div>
  );
};

export const EmployabilityTracker: React.FC = () => {
  const { activeStudent } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'resume' | 'interview'>('overview');

  const profile = CAREER_PROFILES[activeStudent.goal as keyof typeof CAREER_PROFILES] || CAREER_PROFILES['AI Engineer'];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'skills', label: 'Skill Gap', icon: TrendingUp },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'interview', label: 'Interview', icon: Mic },
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 className="heading-lg">Career Engine</h2>
          <p className="body-sm">Your personalized employability dashboard — powered by AI</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--border-radius-md)', padding: '8px 16px' }}>
          <span style={{ fontSize: '1.4rem' }}>{activeStudent.goalIcon}</span>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-success)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Target Role</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeStudent.goal}</div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--bg-tertiary)', padding: 4, borderRadius: 'var(--border-radius-md)', width: 'fit-content', border: '1px solid var(--border-card)' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 'var(--border-radius-sm)', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-body)', transition: 'all 0.2s', background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent', color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)', boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none' }}>
              <Icon size={14} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* 4 Big Metrics */}
          <div className="grid-4">
            {[
              { label: 'Overall Readiness', value: profile.overallReadiness, color: '#7C3AED', icon: '🎯', desc: 'AI-assessed' },
              { label: 'Placement Probability', value: profile.placement, color: '#10B981', icon: '🏢', desc: 'Industry benchmark' },
              { label: 'Resume Score', value: profile.resumeScore, color: '#0EA5E9', icon: '📄', desc: 'AI optimized' },
              { label: 'Interview Score', value: profile.interviewScore, color: '#F59E0B', icon: '🎤', desc: 'Mock interview avg' },
            ].map(m => (
              <div key={m.label} className="stat-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                <ProgressRing value={m.value} size={90} color={m.color} />
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 8 }}>{m.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.desc}</div>
              </div>
            ))}
          </div>

          {/* Skill Gaps */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="chart-container">
              <h3 className="heading-sm" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={16} color="#EF4444" /> Skill Gaps to Close
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.skillGaps.map((gap, i) => (
                  <div key={gap} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(239,68,68,0.05)', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    <span style={{ fontSize: '1.1rem' }}>{['🌩️', '🏗️', '🐳'][i]}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{gap}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Required for {activeStudent.goal}</div>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', background: 'rgba(239,68,68,0.1)', color: '#DC2626', borderRadius: 99 }}>Gap</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(245,158,11,0.06)', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                🎯 Complete {profile.projectsNeeded} more projects to significantly boost your placement probability
              </div>
            </div>

            <div className="chart-container">
              <h3 className="heading-sm" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={16} color="#10B981" /> Internship Matches
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.internshipSuggestions.map((company, i) => (
                  <div key={company} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-card)', cursor: 'pointer', transition: '0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-card)'}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{['🔵', '🔴', '🟤'][i]}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{company}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AI Engineer Internship · Remote</div>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', background: 'rgba(16,185,129,0.1)', color: '#059669', borderRadius: 99 }}>Apply</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Companies Hiring Now:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {profile.companiesHiring.map(c => (
                    <span key={c} className="tag">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Career Timeline */}
          <div className="chart-container">
            <h3 className="heading-sm" style={{ marginBottom: 20 }}>Career Timeline</h3>
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, #7C3AED, #0EA5E9, rgba(14,165,233,0.1))' }} />
              {[
                { done: true,  icon: '✅', label: 'Python Foundations Completed', time: 'Jan 2024', color: '#10B981' },
                { done: true,  icon: '✅', label: 'ML Fundamentals Mastered', time: 'Mar 2024', color: '#10B981' },
                { done: false, icon: '🔄', label: 'Deep Learning Module', time: 'In Progress', color: '#F59E0B' },
                { done: false, icon: '🔒', label: 'Cloud & DevOps Certification', time: 'Est. Sep 2024', color: '#9CA3AF' },
                { done: false, icon: '🎯', label: 'AI Engineer Role Ready', time: 'Est. Nov 2024', color: '#7C3AED' },
              ].map((ev, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ position: 'absolute', left: -26, width: 20, height: 20, borderRadius: '50%', background: ev.done ? ev.color : 'var(--bg-card)', border: `2px solid ${ev.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>
                    {ev.done && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: ev.done ? 'var(--text-primary)' : 'var(--text-muted)' }}>{ev.label}</div>
                    <div style={{ fontSize: '0.72rem', color: ev.color, fontWeight: 600 }}>{ev.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SKILLS TAB ── */}
      {activeTab === 'skills' && (
        <div className="chart-container">
          <h3 className="heading-sm" style={{ marginBottom: 20 }}>Skill Gap Analysis — {activeStudent.goal}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {profile.skills.map((s, i) => {
              const gap = s.required - s.current;
              const isMet = gap <= 0;
              return (
                <div key={s.name} style={{ animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {isMet ? (
                        <span className="badge badge-green">✓ Met</span>
                      ) : (
                        <span className="badge badge-red">↑ +{gap}% needed</span>
                      )}
                    </div>
                  </div>
                  <div style={{ position: 'relative', height: 10, background: 'var(--bg-tertiary)', borderRadius: 5, overflow: 'visible' }}>
                    <div style={{ height: '100%', width: `${s.current}%`, background: isMet ? 'linear-gradient(90deg, #10B981, #059669)' : 'linear-gradient(90deg, #7C3AED, #0EA5E9)', borderRadius: 5, transition: `width 0.8s ease ${i * 0.1}s` }} />
                    {!isMet && (
                      <div style={{ position: 'absolute', top: '50%', left: `${s.required}%`, transform: 'translate(-50%, -50%)', width: 3, height: 18, background: '#EF4444', borderRadius: 2, zIndex: 2 }}>
                        <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: '#EF4444', fontWeight: 700, whiteSpace: 'nowrap' }}>Target: {s.required}%</div>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>Current: {s.current}%</span>
                    <span>Required: {s.required}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── RESUME TAB ── */}
      {activeTab === 'resume' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="chart-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 className="heading-sm">Resume Score</h3>
              <div style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 900, color: '#10B981' }}>{profile.resumeScore}</div>
            </div>
            {[
              { label: 'Work Experience', score: 90, color: '#10B981' },
              { label: 'Technical Skills', score: 95, color: '#7C3AED' },
              { label: 'Projects', score: 88, color: '#0EA5E9' },
              { label: 'Education', score: 92, color: '#F59E0B' },
              { label: 'Keywords (ATS)', score: 85, color: '#EC4899' },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{s.score}/100</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.score}%`, background: s.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
          <div className="chart-container">
            <h3 className="heading-sm" style={{ marginBottom: 14 }}>AI Suggestions</h3>
            {[
              { icon: '✅', text: 'Add "Transformer fine-tuning" as a key skill', priority: 'High', color: '#10B981' },
              { icon: '⚠️', text: 'Include Docker & Kubernetes experience', priority: 'Medium', color: '#F59E0B' },
              { icon: '💡', text: 'Quantify your project impact with metrics', priority: 'High', color: '#7C3AED' },
              { icon: '📊', text: 'Add GitHub link with 10+ repositories', priority: 'Medium', color: '#0EA5E9' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)', marginBottom: 8, border: '1px solid var(--border-card)' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>{s.text}</div>
                </div>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.priority}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── INTERVIEW TAB ── */}
      {activeTab === 'interview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="grid-4">
            {[
              { label: 'Confidence', value: 78, color: '#7C3AED' },
              { label: 'Technical', value: 83, color: '#0EA5E9' },
              { label: 'Communication', value: 74, color: '#10B981' },
              { label: 'Problem Solving', value: 88, color: '#F59E0B' },
            ].map(m => (
              <div key={m.label} className="stat-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                <ProgressRing value={m.value} size={80} color={m.color} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: 6 }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div className="chart-container">
            <h3 className="heading-sm" style={{ marginBottom: 14 }}>Recent Mock Interview Sessions</h3>
            {[
              { type: 'Coding Interview', date: '2 days ago', score: 88, topic: 'Binary Trees, DP', company: 'Google-style' },
              { type: 'System Design', date: '5 days ago', score: 72, topic: 'URL Shortener Design', company: 'Meta-style' },
              { type: 'Behavioral HR', date: '1 week ago', score: 91, topic: 'Leadership, Conflict', company: 'Amazon-style' },
            ].map((session, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)', marginBottom: 8, border: '1px solid var(--border-card)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--border-radius-sm)', background: 'linear-gradient(135deg, #7C3AED22, #0EA5E922)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mic size={18} color="#7C3AED" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{session.type}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{session.topic} · {session.company} · {session.date}</div>
                </div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', color: session.score >= 85 ? '#10B981' : session.score >= 70 ? '#F59E0B' : '#EF4444' }}>{session.score}%</div>
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
              <Mic size={15} /> Start New Mock Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
