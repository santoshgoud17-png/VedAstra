import React, { useState } from 'react';
import {
  Video, Clock, Users, Bell, BellOff, Download, Play,
  Radio, Calendar, CheckCircle, XCircle, ChevronRight,
  BookOpen, Sparkles, Activity, Filter,
} from 'lucide-react';
import { LIVE_CLASSES } from '../demoData';
import type { LiveClass } from '../demoData';
import { useApp } from '../context/AppContext';

// ── helpers ─────────────────────────────────────────
const attendanceBg = (a?: string | null) =>
  a === 'present' ? 'rgba(16,185,129,0.12)' : a === 'absent' ? 'rgba(239,68,68,0.12)' : 'rgba(107,114,128,0.08)';
const attendanceColor = (a?: string | null) =>
  a === 'present' ? '#10B981' : a === 'absent' ? '#EF4444' : '#6B7280';

// ── Live badge ───────────────────────────────────────
const LiveBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '3px 10px', borderRadius: 20,
    background: 'rgba(239,68,68,0.15)', color: '#EF4444',
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
    border: '1px solid rgba(239,68,68,0.3)', flexShrink: 0,
  }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', animation: 'livePulse 1.4s infinite', display: 'inline-block' }} />
    LIVE
  </span>
);

// ── Class Card ───────────────────────────────────────
const ClassCard: React.FC<{ cls: LiveClass; onJoin: (cls: LiveClass) => void }> = ({ cls, onJoin }) => {
  const [reminded, setReminded] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const pct = Math.round((cls.attendees / cls.maxAttendees) * 100);

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${cls.status === 'live' ? 'rgba(239,68,68,0.3)' : 'var(--border-card)'}`,
        borderRadius: 16, padding: '20px 22px',
        display: 'flex', flexDirection: 'column', gap: 14,
        transition: 'transform 0.18s, box-shadow 0.18s',
        boxShadow: cls.status === 'live' ? '0 0 0 2px rgba(239,68,68,0.12),0 4px 24px rgba(0,0,0,0.18)' : '0 2px 12px rgba(0,0,0,0.10)',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = cls.status === 'live' ? '0 0 0 2px rgba(239,68,68,0.2),0 8px 32px rgba(0,0,0,0.22)' : '0 8px 32px rgba(0,0,0,0.16)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = cls.status === 'live' ? '0 0 0 2px rgba(239,68,68,0.12),0 4px 24px rgba(0,0,0,0.18)' : '0 2px 12px rgba(0,0,0,0.10)';
      }}
    >
      {/* Top color accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: cls.subjectColor, borderRadius: '16px 16px 0 0' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginTop: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, fontSize: '1.4rem', background: `${cls.subjectColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {cls.subjectIcon}
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 2 }}>{cls.subject}</div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, margin: 0 }}>{cls.title}</h3>
          </div>
        </div>
        {cls.status === 'live' && <LiveBadge />}
        {cls.status === 'upcoming' && (
          <span style={{ padding: '3px 10px', borderRadius: 20, background: 'rgba(14,165,233,0.12)', color: '#0EA5E9', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(14,165,233,0.25)', whiteSpace: 'nowrap', flexShrink: 0 }}>UPCOMING</span>
        )}
        {cls.status === 'completed' && (
          <span style={{ padding: '3px 10px', borderRadius: 20, background: 'rgba(107,114,128,0.12)', color: '#9CA3AF', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(107,114,128,0.2)', whiteSpace: 'nowrap', flexShrink: 0 }}>RECORDED</span>
        )}
      </div>

      {/* Teacher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${cls.subjectColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: cls.subjectColor, flexShrink: 0, border: '2px solid var(--border-card)' }}>
          {cls.teacherInitials}
        </div>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.teacher}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cls.teacherRole}</div>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={13} /> {cls.date} · {cls.time}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={13} /> {cls.duration}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Users size={13} /> {cls.attendees.toLocaleString()} joined</span>
      </div>

      {/* Capacity bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>
          <span>Capacity</span>
          <span style={{ color: pct > 80 ? '#EF4444' : 'var(--text-muted)' }}>{pct}%</span>
        </div>
        <div style={{ height: 4, background: 'var(--border-card)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? '#EF4444' : cls.subjectColor, borderRadius: 99, transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {/* Attendance badge */}
      {cls.status === 'completed' && cls.attendanceTracked && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 8, background: attendanceBg(cls.myAttendance), alignSelf: 'flex-start', fontSize: '0.78rem', fontWeight: 600, color: attendanceColor(cls.myAttendance) }}>
          {cls.myAttendance === 'present' ? <CheckCircle size={13} /> : <XCircle size={13} />}
          {cls.myAttendance ? `Attendance: ${cls.myAttendance.charAt(0).toUpperCase() + cls.myAttendance.slice(1)}` : 'Not tracked'}
        </div>
      )}

      {/* Topics */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {cls.topicsCovered.map(t => (
          <span key={t} style={{ padding: '3px 9px', borderRadius: 6, background: `${cls.subjectColor}10`, color: cls.subjectColor, fontSize: '0.72rem', fontWeight: 500, border: `1px solid ${cls.subjectColor}22` }}>{t}</span>
        ))}
      </div>

      {/* AI Summary (completed) */}
      {cls.status === 'completed' && cls.aiSummary && (
        <div>
          <button onClick={() => setShowAI(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#7C3AED', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, padding: 0 }}>
            <Sparkles size={13} /> AI Summary {showAI ? '▲' : '▼'}
          </button>
          {showAI && (
            <div style={{ marginTop: 8, padding: 12, borderRadius: 8, background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 8px' }}>{cls.aiSummary}</p>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {cls.aiKeyPoints?.map((kp, i) => <li key={i} style={{ marginBottom: 4 }}>{kp}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 2 }}>
        {cls.status === 'live' && (
          <button onClick={() => onJoin(cls)} style={{ flex: 1, minWidth: 110, padding: '9px 16px', borderRadius: 10, background: 'linear-gradient(135deg,#EF4444,#DC2626)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 4px 14px rgba(239,68,68,0.35)' }}>
            <Video size={15} /> Join Now
          </button>
        )}
        {cls.status === 'upcoming' && (
          <>
            <button onClick={() => onJoin(cls)} style={{ flex: 1, minWidth: 110, padding: '9px 16px', borderRadius: 10, background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 4px 14px rgba(124,58,237,0.3)' }}>
              <ChevronRight size={15} /> Preview Room
            </button>
            <button onClick={() => setReminded(p => !p)} style={{ padding: '9px 14px', borderRadius: 10, cursor: 'pointer', border: `1px solid ${reminded ? '#F59E0B' : 'var(--border-card)'}`, background: reminded ? 'rgba(245,158,11,0.1)' : 'var(--bg-secondary)', color: reminded ? '#F59E0B' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 600 }}>
              {reminded ? <Bell size={14} /> : <BellOff size={14} />}
              {reminded ? 'Reminded' : 'Remind Me'}
            </button>
          </>
        )}
        {cls.status === 'completed' && (
          <button onClick={() => onJoin(cls)} style={{ flex: 1, minWidth: 110, padding: '9px 16px', borderRadius: 10, background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem', border: '1px solid var(--border-card)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <Play size={15} /> Watch Recording
          </button>
        )}
        <button onClick={() => alert(`Downloading ${cls.notes}...`)} style={{ padding: '9px 14px', borderRadius: 10, cursor: 'pointer', border: '1px solid var(--border-card)', background: 'var(--bg-secondary)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 600 }}>
          <Download size={14} /> Notes
        </button>
      </div>
    </div>
  );
};

// ── Stats Bar ────────────────────────────────────────
const StatsBar = () => {
  const liveCount = LIVE_CLASSES.filter(c => c.status === 'live').length;
  const upcomingCount = LIVE_CLASSES.filter(c => c.status === 'upcoming').length;
  const completedCount = LIVE_CLASSES.filter(c => c.status === 'completed').length;
  const presentCount = LIVE_CLASSES.filter(c => c.myAttendance === 'present').length;
  const trackedCount = LIVE_CLASSES.filter(c => c.attendanceTracked).length;
  const attendancePct = trackedCount > 0 ? Math.round((presentCount / trackedCount) * 100) : 0;
  const stats = [
    { label: 'Live Now', value: liveCount, icon: <Radio size={16} />, color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
    { label: 'Upcoming', value: upcomingCount, icon: <Calendar size={16} />, color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)' },
    { label: 'Completed', value: completedCount, icon: <CheckCircle size={16} />, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
    { label: 'Attendance', value: `${attendancePct}%`, icon: <Activity size={16} />, color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 14, marginBottom: 24 }}>
      {stats.map(s => (
        <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Educator Panel ────────────────────────────────────
const EducatorPanel = ({ onStart }: { onStart: (cls: LiveClass) => void }) => (
  <div>
    <div style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.08),rgba(14,165,233,0.08))', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: '20px 22px', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--text-primary)' }}>Educator Controls</h3>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Schedule, start, and manage your live sessions</p>
        </div>
        <button style={{ padding: '10px 20px', borderRadius: 10, background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}>
          <Calendar size={15} /> Schedule New Class
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 10, marginTop: 16 }}>
        {[{ label: 'Total Students', value: '1,847', color: '#7C3AED' }, { label: 'Classes This Week', value: '4', color: '#0EA5E9' }, { label: 'Avg Attendance', value: '73%', color: '#10B981' }, { label: 'Materials Shared', value: '12', color: '#F59E0B' }].map(s => (
          <div key={s.label} style={{ padding: '10px 12px', background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 16 }}>
      {LIVE_CLASSES.map(cls => (
        <div key={cls.id} style={{ background: 'var(--bg-card)', border: `1px solid ${cls.status === 'live' ? 'rgba(239,68,68,0.3)' : 'var(--border-card)'}`, borderRadius: 14, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1.4rem' }}>{cls.subjectIcon}</span>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cls.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cls.date} · {cls.time} · {cls.duration}</div>
              </div>
            </div>
            {cls.status === 'live' && <LiveBadge />}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {cls.status === 'completed' ? (
              <button style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontWeight: 600, border: '1px solid var(--border-card)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <BookOpen size={13} /> View Report
              </button>
            ) : (
              <button onClick={() => onStart(cls)} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: cls.status === 'live' ? 'linear-gradient(135deg,#EF4444,#DC2626)' : 'linear-gradient(135deg,#7C3AED,#6D28D9)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                {cls.status === 'live' ? <><Radio size={13} /> Manage Session</> : <><Video size={13} /> Start Class</>}
              </button>
            )}
            <button style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-card)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Users size={13} /> {cls.attendees}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────
export const LiveClasses: React.FC = () => {
  const { setCurrentView, userRole } = useApp();
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');

  const handleJoin = (cls: LiveClass) => {
    sessionStorage.setItem('vc_active_class', JSON.stringify(cls));
    setCurrentView('live-classroom');
  };

  const filtered = filter === 'all' ? LIVE_CLASSES : LIVE_CLASSES.filter(c => c.status === filter);

  const filterBtns: { key: typeof filter; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All Classes', icon: <Filter size={13} /> },
    { key: 'live', label: 'Live Now', icon: <Radio size={13} /> },
    { key: 'upcoming', label: 'Upcoming', icon: <Calendar size={13} /> },
    { key: 'completed', label: 'Recorded', icon: <Play size={13} /> },
  ];

  return (
    <div style={{ padding: '0 0 32px' }}>
      {/* Hero header */}
      <div style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.12) 0%,rgba(14,165,233,0.08) 100%)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 18, padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -20, width: 180, height: 180, borderRadius: '50%', background: 'rgba(124,58,237,0.05)', pointerEvents: 'none' }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#7C3AED,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Video size={18} color="#fff" />
            </div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>Live Classes</h1>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {userRole === 'educator' ? 'Schedule, host, and manage your interactive live sessions' : 'Join live, upcoming, and recorded AI-powered learning sessions'}
          </p>
        </div>
        {userRole !== 'educator' && (
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', animation: 'livePulse 1.4s infinite', display: 'inline-block' }} />
              {LIVE_CLASSES.filter(c => c.status === 'live').length} Live Now
            </div>
          </div>
        )}
      </div>

      <StatsBar />

      {userRole === 'educator' ? (
        <EducatorPanel onStart={handleJoin} />
      ) : (
        <>
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {filterBtns.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 20,
                border: filter === f.key ? 'none' : '1px solid var(--border-card)', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.15s',
                background: filter === f.key ? 'linear-gradient(135deg,#7C3AED,#6D28D9)' : 'var(--bg-card)',
                color: filter === f.key ? '#fff' : 'var(--text-muted)',
                boxShadow: filter === f.key ? '0 4px 12px rgba(124,58,237,0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                {f.icon} {f.label}
                <span style={{ padding: '1px 7px', borderRadius: 99, fontSize: '0.7rem', background: filter === f.key ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)' }}>
                  {f.key === 'all' ? LIVE_CLASSES.length : LIVE_CLASSES.filter(c => c.status === f.key).length}
                </span>
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 18 }}>
            {filtered.map(cls => <ClassCard key={cls.id} cls={cls} onJoin={handleJoin} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <Video size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p style={{ fontSize: '0.9rem' }}>No classes in this category yet.</p>
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
      `}</style>
    </div>
  );
};
