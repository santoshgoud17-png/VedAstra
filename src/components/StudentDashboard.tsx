import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LEADERBOARD, DEMO_COURSES } from '../demoData';
import { BookOpen, Clock, Award, Target, ChevronRight, Play, Sparkles, Trophy } from 'lucide-react';

// ──────────────────────────────────────────────────────
// Mini SVG Bar Chart Component
// ──────────────────────────────────────────────────────
const BarChart: React.FC<{ data: number[]; labels?: string[]; color?: string; height?: number }> = ({
  data, labels, color = '#7C3AED', height = 80
}) => {
  const max = Math.max(...data, 1);
  const barW = 32;
  const gap = 10;
  const totalW = data.length * (barW + gap) - gap;

  return (
    <svg width="100%" viewBox={`0 0 ${totalW} ${height + 24}`} style={{ overflow: 'visible' }}>
      {data.map((val, i) => {
        const barH = (val / max) * height;
        const x = i * (barW + gap);
        const y = height - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx={6} fill={color} opacity={0.15} />
            <rect x={x} y={y + barH * 0.5} width={barW} height={barH * 0.5} rx={6} fill={color} opacity={0.6} />
            <rect x={x} y={y + barH * 0.8} width={barW} height={barH * 0.2} rx={6} fill={color} />
            {labels && <text x={x + barW / 2} y={height + 16} textAnchor="middle" fontSize="9" fill="var(--text-muted)">{labels[i]}</text>}
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontWeight="600">
              {val}h
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ──────────────────────────────────────────────────────
// Mini Line Chart Component
// ──────────────────────────────────────────────────────
const LineChart: React.FC<{ data: { month: string; programming: number; ai: number; problemSolving: number }[]; height?: number }> = ({ data, height = 100 }) => {
  const months = data.map(d => d.month);
  const totalW = 400;
  const pW = totalW / (data.length - 1);

  const pathFor = (key: keyof typeof data[0], color: string, _label: string) => {
    const vals = data.map(d => d[key] as number);
    const max = 100;
    const points = vals.map((v, i) => [i * pW, height - (v / max) * height]);
    const d = 'M ' + points.map(p => p.join(',')).join(' L ');
    const areaD = `${d} L ${(data.length - 1) * pW},${height} L 0,${height} Z`;
    return (
      <g key={key as string}>
        <defs>
          <linearGradient id={`grad-${key as string}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${key as string})`} />
        <path d={d} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={3} fill={color} />
        ))}
      </g>
    );
  };

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${totalW} ${height + 20}`} style={{ overflow: 'visible' }}>
        {pathFor('programming', '#7C3AED', 'Programming')}
        {pathFor('ai', '#0EA5E9', 'AI')}
        {pathFor('problemSolving', '#10B981', 'Problem Solving')}
        {months.map((m, i) => (
          <text key={m} x={i * pW} y={height + 16} textAnchor="middle" fontSize="9" fill="var(--text-muted)">{m}</text>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        {[['#7C3AED', 'Programming'], ['#0EA5E9', 'AI & ML'], ['#10B981', 'Problem Solving']].map(([c, l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────
// Animated Counter
// ──────────────────────────────────────────────────────
const AnimCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ value, suffix = '', duration = 1000 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{display.toLocaleString()}{suffix}</span>;
};

// ──────────────────────────────────────────────────────
// Progress Ring
// ──────────────────────────────────────────────────────
const ProgressRing: React.FC<{ value: number; size?: number; stroke?: number; color?: string; label?: string }> = ({ value, size = 80, stroke = 7, color = '#7C3AED', label }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} className="progress-ring" style={{ position: 'absolute' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-tertiary)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} className="progress-ring-circle" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: size > 70 ? '1rem' : '0.8rem', fontWeight: 800, fontFamily: 'Outfit', color: 'var(--text-primary)' }}>{value}%</div>
        {label && <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.2, maxWidth: size - 20, textAlign: 'center' }}>{label}</div>}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────
// Streak Calendar
// ──────────────────────────────────────────────────────
const StreakCalendar: React.FC<{ streak: number }> = ({ streak }) => {
  const days = Array.from({ length: 70 }, (_, i) => {
    const daysAgo = 69 - i;
    if (daysAgo < streak) return daysAgo < streak * 0.3 ? 'active' : daysAgo < streak * 0.7 ? 'medium' : 'light';
    return '';
  });

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div>
      <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
        {weekdays.map((d, i) => (
          <div key={i} style={{ flex: 1, fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 600 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 3 }}>
        {days.map((type, i) => (
          <div key={i} className={`streak-dot ${type}`} />
        ))}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────
export const StudentDashboard: React.FC = () => {
  const { activeStudent, xp, streak, skills, setCurrentView, setActiveCourseId } = useApp();

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const selfRank = activeStudent.leaderboardRank;

  const enrolledCourses = activeStudent.enrolledCourses
    .map(id => DEMO_COURSES.find(c => c.id === id))
    .filter(Boolean) as typeof DEMO_COURSES;

  const MOTIVATIONS = [
    'Every expert was once a beginner. Keep pushing! 💪',
    'Consistency beats talent every single day. 🔥',
    'Your future self is grateful for today\'s effort. 🚀',
    'You\'re in the top 3% of learners on VedAstra! 🏆',
    '128 days and counting — you\'re unstoppable! ⚡',
  ];
  const motivation = MOTIVATIONS[Math.floor(Date.now() / 86400000) % MOTIVATIONS.length];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeInUp 0.4s ease both' }}>

      {/* ── Welcome Banner ── */}
      <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)', borderRadius: 'var(--border-radius-xl)', padding: '28px 32px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(124,58,237,0.3)' }}>
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -20, right: 80, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, marginBottom: 4 }}>Welcome back 👋</div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>
              {activeStudent.name}
            </h1>
            <p style={{ opacity: 0.85, marginTop: 6, fontSize: '0.9rem', maxWidth: 400 }}>{motivation}</p>
          </div>

          {/* Streak + Level badges */}
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 'var(--border-radius-md)', padding: '12px 20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '1.6rem' }}>🔥</div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.4rem' }}>{streak}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Day Streak</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 'var(--border-radius-md)', padding: '12px 20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '1.6rem' }}>⚡</div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.4rem' }}>Lv.{activeStudent.level}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>{xp.toLocaleString()} XP</div>
            </div>
          </div>
        </div>

        {/* Goal progress bar */}
        <div style={{ marginTop: 20, background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', height: 6 }}>
          <div style={{ height: '100%', width: `${activeStudent.placementProbability}%`, background: 'rgba(255,255,255,0.8)', borderRadius: 'var(--border-radius-sm)', transition: '1s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.72rem', opacity: 0.8 }}>
          <span>{activeStudent.goalIcon} Goal: {activeStudent.goal}</span>
          <span>{activeStudent.placementProbability}% Placement Probability</span>
        </div>
      </div>

      {/* ── Key Stats Row ── */}
      <div className="grid-4">
        {[
          { icon: Clock,    color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', label: 'Hours Learned',   value: activeStudent.hoursStudied, suffix: 'h', change: '+23h this week' },
          { icon: BookOpen, color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)',  label: 'Courses Active',  value: enrolledCourses.length, suffix: '', change: `${activeStudent.enrolledCourses.length} enrolled` },
          { icon: Award,    color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: 'Certificates',     value: activeStudent.certificates, suffix: '', change: '2 in progress' },
          { icon: Trophy,   color: '#10B981', bg: 'rgba(16,185,129,0.1)', label: 'Leaderboard',      value: `#${selfRank}`, suffix: '', change: 'Top 1% globally', isString: true },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="stat-icon" style={{ background: s.bg }}>
                <Icon size={20} color={s.color} />
              </div>
              <div className="stat-value" style={{ color: s.color }}>
                {(s as any).isString ? s.value : <AnimCounter value={s.value as number} suffix={s.suffix} />}
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-change positive">{s.change}</div>
            </div>
          );
        })}
      </div>

      {/* ── Main Content Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Weekly Study Chart */}
          <div className="chart-container">
            <div className="section-header">
              <div>
                <h3 className="heading-sm">Weekly Learning Hours</h3>
                <p className="body-sm" style={{ marginTop: 2 }}>Total: {activeStudent.weeklyHours}h this week</p>
              </div>
              <span className="badge badge-purple">This Week</span>
            </div>
            <BarChart data={activeStudent.weeklyData} labels={dayLabels} color="#7C3AED" height={90} />
          </div>

          {/* Skill Growth Chart */}
          <div className="chart-container">
            <div className="section-header">
              <div>
                <h3 className="heading-sm">Monthly Skill Growth</h3>
                <p className="body-sm" style={{ marginTop: 2 }}>6-month progress across core skills</p>
              </div>
              <span className="badge badge-blue">Last 6 Months</span>
            </div>
            <LineChart data={activeStudent.monthlySkillData} height={100} />
          </div>

          {/* Continue Learning */}
          <div>
            <div className="section-header">
              <h3 className="heading-sm">Continue Learning</h3>
              <button className="btn-ghost btn-sm" onClick={() => setCurrentView('learn')}>View All <ChevronRight size={13} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {enrolledCourses.slice(0, 3).map((course, i) => (
                <div key={course.id} className="card-flat animate-fade-up" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', animationDelay: `${i * 0.08}s`, transition: 'all 0.2s' }}
                  onClick={() => { setActiveCourseId(course.id); setCurrentView('learn'); }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-card)')}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 'var(--border-radius-sm)', background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(14,165,233,0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Play size={18} color="#7C3AED" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.title}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ flex: 1, height: 5, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${course.progress || 10}%`, background: 'linear-gradient(90deg, #7C3AED, #0EA5E9)', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-primary)', flexShrink: 0 }}>{course.progress || 10}%</span>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="chart-container" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(14,165,233,0.04) 100%)', border: '1px solid rgba(124,58,237,0.12)' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={15} color="white" />
              </div>
              <div>
                <h3 className="heading-sm" style={{ margin: 0 }}>AI Recommendations</h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>Based on your skill gap analysis</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: '🌩️', title: 'Cloud Fundamentals', why: 'Gap detected — required for AI Engineer role', badge: 'Priority', color: '#EF4444' },
                { icon: '🎯', title: 'System Design Interviews', why: 'Improve from 55% to 85% for FAANG interviews', badge: 'Recommended', color: '#F59E0B' },
                { icon: '🤖', title: 'Advanced LLM Engineering', why: 'Aligns with your AI Engineer career goal', badge: 'Popular', color: '#10B981' },
              ].map((rec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--bg-card)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-card)', cursor: 'pointer' }}>
                  <span style={{ fontSize: '1.4rem' }}>{rec.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{rec.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rec.why}</div>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: 99, background: `${rec.color}15`, color: rec.color, border: `1px solid ${rec.color}30`, flexShrink: 0 }}>{rec.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Readiness Rings */}
          <div className="chart-container">
            <h3 className="heading-sm" style={{ marginBottom: 16 }}>Readiness Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, justifyItems: 'center' }}>
              <ProgressRing value={activeStudent.placementProbability} color="#7C3AED" label="Placement" />
              <ProgressRing value={activeStudent.interviewReadiness} color="#0EA5E9" label="Interview" />
              <ProgressRing value={activeStudent.resumeScore} color="#10B981" label="Resume" />
              <ProgressRing value={Math.round(Object.values(skills).reduce((a, b) => a + b, 0) / Object.values(skills).length)} color="#F59E0B" label="Avg Skill" />
            </div>
            <button className="btn btn-primary w-full" style={{ marginTop: 16 }} onClick={() => setCurrentView('employability')}>
              <Target size={15} /> View Career Engine
            </button>
          </div>

          {/* Skill Bars */}
          <div className="chart-container">
            <div className="section-header">
              <h3 className="heading-sm">Skills</h3>
              <button className="btn-ghost btn-sm" onClick={() => setCurrentView('skill-graph')} style={{ fontSize: '0.72rem', padding: '4px 8px' }}>Radar View</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activeStudent.skills.map((skill) => (
                <div key={skill.name} className="skill-bar-wrap">
                  <div className="skill-bar-header">
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: skill.color }}>{skill.value}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${skill.value}%`, background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Calendar */}
          <div className="chart-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <h3 className="heading-sm" style={{ margin: 0 }}>Learning Streak</h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>🔥 {streak} days active</p>
              </div>
              <span className="badge badge-amber">🔥 {streak}d</span>
            </div>
            <StreakCalendar streak={streak} />
          </div>

          {/* Badges */}
          <div className="chart-container">
            <h3 className="heading-sm" style={{ marginBottom: 12 }}>Badges Earned</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {activeStudent.badges.map(badge => (
                <div key={badge.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '12px 8px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-card)', cursor: 'default' }}>
                  <span style={{ fontSize: '1.6rem' }}>{badge.icon}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.3 }}>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="chart-container">
            <div className="section-header" style={{ marginBottom: 12 }}>
              <h3 className="heading-sm">Leaderboard</h3>
              <button className="btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '4px 8px' }} onClick={() => setCurrentView('leaderboard')}>Full</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {LEADERBOARD.slice(0, 5).map((user) => (
                <div key={user.rank} className="leaderboard-row" style={user.name === activeStudent.name ? { background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 'var(--border-radius-sm)' } : {}}>
                  <div style={{ width: 22, fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.875rem', color: user.rank <= 3 ? ['#F59E0B', '#9CA3AF', '#CD7F32'][user.rank - 1] : 'var(--text-muted)', textAlign: 'center', flexShrink: 0 }}>
                    {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>{user.initials}</div>
                  <div style={{ flex: 1, fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 }}>{(user.xp / 1000).toFixed(1)}K</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
