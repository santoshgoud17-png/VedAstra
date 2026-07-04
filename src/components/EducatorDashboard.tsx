import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Users, DollarSign, Star, BookOpen } from 'lucide-react';

const MiniLineChart: React.FC<{ data: number[]; color?: string; height?: number }> = ({ data, color = '#7C3AED', height = 60 }) => {
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 280;
  const stepX = w / (data.length - 1);

  const points = data.map((v, i) => ({
    x: i * stepX,
    y: height - ((v - min) / range) * height * 0.85 - 4,
  }));
  const d = 'M ' + points.map(p => `${p.x},${p.y}`).join(' L ');
  const area = `${d} L ${w},${height} L 0,${height} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${height + 4}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="lgEd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lgEd)" />
      <path d={d} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
      ))}
    </svg>
  );
};

export const EducatorDashboard: React.FC = () => {
  const { activeEducator } = useApp();
  const [tab, setTab] = useState<'overview' | 'courses' | 'analytics' | 'students'>('overview');

  const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Profile Header */}
      <div style={{ background: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)', borderRadius: 'var(--border-radius-xl)', padding: '28px 32px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(236,72,153,0.3)' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.8rem', border: '3px solid rgba(255,255,255,0.4)', flexShrink: 0 }}>
            {activeEducator.initials}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 800, color: 'white', margin: 0 }}>{activeEducator.name}</h1>
            <p style={{ opacity: 0.85, margin: '4px 0 0', fontSize: '0.875rem' }}>{activeEducator.title}</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {['Top Educator 2024', 'AI Pioneer', '4.9 Rating'].map(b => (
                <span key={b} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)' }}>{b}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Students', value: activeEducator.totalStudents.toLocaleString() },
              { label: 'Followers', value: `${(activeEducator.followers / 1000).toFixed(0)}K` },
              { label: 'Rating', value: `⭐ ${activeEducator.avgRating}` },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 'var(--border-radius-md)', padding: '10px 16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem' }}>{s.value}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--bg-tertiary)', padding: 4, borderRadius: 'var(--border-radius-md)', width: 'fit-content', border: '1px solid var(--border-card)' }}>
        {['overview', 'courses', 'analytics', 'students'].map(t => (
          <button key={t} onClick={() => setTab(t as any)} style={{ padding: '8px 18px', borderRadius: 'var(--border-radius-sm)', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-body)', transition: '0.2s', background: tab === t ? 'var(--bg-card)' : 'transparent', color: tab === t ? 'var(--accent-primary)' : 'var(--text-secondary)', boxShadow: tab === t ? 'var(--shadow-sm)' : 'none', textTransform: 'capitalize' }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="grid-4">
            {[
              { icon: Users,    color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', label: 'Total Students',   value: activeEducator.totalStudents.toLocaleString(), sub: '+2,350 this month' },
              { icon: DollarSign, color: '#10B981', bg: 'rgba(16,185,129,0.1)', label: 'Total Revenue',   value: `$${activeEducator.revenue.toLocaleString()}`, sub: '+$6.2K this month' },
              { icon: Star,     color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: 'Avg Rating',       value: `${activeEducator.avgRating}/5.0`, sub: '2,840 reviews' },
              { icon: TrendingUp, color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', label: 'Completion Rate', value: `${activeEducator.completionRate}%`, sub: 'Industry avg: 67%' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="stat-card">
                  <div className="stat-icon" style={{ background: s.bg }}><Icon size={20} color={s.color} /></div>
                  <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-change positive">{s.sub}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
            <div className="chart-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 className="heading-sm">Monthly Revenue</h3>
                <span className="badge badge-green">$48.7K total</span>
              </div>
              <MiniLineChart data={activeEducator.monthlyRevenue} color="#10B981" height={80} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                {MONTH_LABELS.slice(0, 12).map((m, _i) => (
                  <span key={m} style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{m}</span>
                ))}
              </div>
            </div>
            <div className="chart-container">
              <h3 className="heading-sm" style={{ marginBottom: 12 }}>AI Performance</h3>
              {[
                { label: 'AI Notes Usage', value: activeEducator.aiNotesRate, color: '#7C3AED' },
                { label: 'Completion Rate', value: activeEducator.completionRate, color: '#10B981' },
                { label: 'Student Satisfaction', value: 97, color: '#F59E0B' },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{s.label}</span>
                    <span style={{ fontWeight: 800, color: s.color }}>{s.value}%</span>
                  </div>
                  <div style={{ height: 7, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.value}%`, background: s.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="chart-container">
              <h3 className="heading-sm" style={{ marginBottom: 14 }}>Recent Reviews</h3>
              {[
                { name: 'Aarav S.', rating: 5, text: 'Best ML course I\'ve ever taken. The AI-generated notes are incredible!', time: '2 days ago' },
                { name: 'Priya R.', rating: 5, text: 'Dr. Meera explains complex concepts beautifully. 10/10 would recommend.', time: '4 days ago' },
                { name: 'John A.', rating: 4, text: 'Very in-depth. The project assignments are challenging but rewarding.', time: '1 week ago' },
              ].map((r, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-card)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</span>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={10} color="#F59E0B" fill="#F59E0B" />)}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{r.text}</p>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{r.time}</span>
                </div>
              ))}
            </div>

            <div className="chart-container">
              <h3 className="heading-sm" style={{ marginBottom: 14 }}>AI Content Stats</h3>
              {[
                { icon: '📝', label: 'AI Notes Generated', value: '18,400' },
                { icon: '🃏', label: 'Flashcards Created', value: '84,200' },
                { icon: '❓', label: 'Quiz Questions', value: '42,100' },
                { icon: '🗺️', label: 'Mind Maps', value: '9,800' },
                { icon: '💻', label: 'Coding Problems', value: '6,200' },
                { icon: '📋', label: 'Assignments', value: `${activeEducator.assignmentsCreated}` },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-card)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}><span>{s.icon}</span>{s.label}</span>
                  <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent-primary)' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ANALYTICS ── */}
      {tab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="chart-container">
            <h3 className="heading-sm" style={{ marginBottom: 16 }}>Student Growth (Monthly)</h3>
            <MiniLineChart data={activeEducator.monthlyStudents} color="#7C3AED" height={100} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              {MONTH_LABELS.map(m => <span key={m} style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m}</span>)}
            </div>
          </div>
          <div className="grid-4">
            {[
              { label: 'Avg Watch Time', value: `${(activeEducator.watchHours / 1000).toFixed(0)}K hrs`, icon: '⏱️' },
              { label: 'Assignments', value: activeEducator.assignmentsCreated, icon: '📋' },
              { label: 'Followers', value: `${(activeEducator.followers / 1000).toFixed(0)}K`, icon: '👥' },
              { label: 'AI Notes Rate', value: `${activeEducator.aiNotesRate}%`, icon: '🤖' },
            ].map(s => (
              <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── COURSES ── */}
      {tab === 'courses' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {[
            { title: 'Machine Learning Masterclass', students: 21420, revenue: '$48,700', rating: 4.9, completion: 91 },
            { title: 'AI Engineering with LLMs & RAG', students: 9800, revenue: '$22,100', rating: 4.95, completion: 88 },
          ].map((course, i) => (
            <div key={i} className="card-flat" style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 54, height: 54, borderRadius: 'var(--border-radius-sm)', background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(245,158,11,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BookOpen size={22} color="#EC4899" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{course.title}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                    {[
                      { label: 'Students', value: course.students.toLocaleString() },
                      { label: 'Revenue', value: course.revenue },
                      { label: 'Rating', value: `⭐ ${course.rating}` },
                      { label: 'Completion', value: `${course.completion}%` },
                    ].map(m => (
                      <div key={m.label} style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-xs)', padding: '6px 8px' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{m.label}</div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── STUDENTS ── */}
      {tab === 'students' && (
        <div className="chart-container">
          <h3 className="heading-sm" style={{ marginBottom: 16 }}>Top Performing Students</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { name: 'Priya Reddy', level: 52, completion: 95, grade: 'A+', streak: 214 },
              { name: 'Aarav Sharma', level: 41, completion: 68, grade: 'A', streak: 128 },
              { name: 'Riya Kapoor', level: 47, completion: 88, grade: 'A+', streak: 189 },
              { name: 'Vikram Nair', level: 39, completion: 82, grade: 'A', streak: 102 },
              { name: 'Chen Wei', level: 38, completion: 76, grade: 'B+', streak: 97 },
            ].map((s, i) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--border-card)' : 'none' }}>
                <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', color: 'var(--text-muted)', width: 20, textAlign: 'center' }}>#{i + 1}</span>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `hsl(${i * 55}, 70%, 55%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Level {s.level} · 🔥 {s.streak} days</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{s.completion}%</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Completion</div>
                </div>
                <span style={{ padding: '3px 10px', background: 'rgba(16,185,129,0.1)', color: '#059669', borderRadius: 99, fontSize: '0.78rem', fontWeight: 700 }}>{s.grade}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
