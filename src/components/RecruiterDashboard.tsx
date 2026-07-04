import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_RECRUITERS, DEMO_STUDENTS } from '../demoData';
import { Search, Filter, GraduationCap, Briefcase, ChevronRight, Award } from 'lucide-react';

const MiniRadar: React.FC<{ skills: { name: string; value: number }[]; size?: number }> = ({ skills, size = 60 }) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const n = skills.length;
  const step = (Math.PI * 2) / n;

  const getPoint = (i: number, val: number) => ({
    x: cx + r * (val / 100) * Math.cos(step * i - Math.PI / 2),
    y: cy + r * (val / 100) * Math.sin(step * i - Math.PI / 2),
  });

  const ring = Array.from({ length: n }, (_, i) => {
    const pt = { x: cx + r * Math.cos(step * i - Math.PI / 2), y: cy + r * Math.sin(step * i - Math.PI / 2) };
    return `${pt.x},${pt.y}`;
  }).join(' ');

  const poly = skills.map((s, i) => {
    const pt = getPoint(i, s.value);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={ring} fill="none" stroke="var(--border-color)" strokeWidth="0.8" />
      <polygon points={poly} fill="rgba(124,58,237,0.2)" stroke="#7C3AED" strokeWidth="1.5" />
    </svg>
  );
};

export const RecruiterDashboard: React.FC = () => {
  const { activeRecruiter: _activeRecruiter } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const SKILL_FILTERS = ['All', 'AI Engineer', 'Data Scientist', 'Cybersecurity', 'Full Stack', 'Cloud'];

  const candidates = DEMO_STUDENTS.map(s => ({
    ...s,
    score: Math.round(s.skills.reduce((a, b) => a + b.value, 0) / s.skills.length),
  }));

  const filtered = candidates.filter(c =>
    (searchTerm === '' || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.goal.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterSkill === 'All' || c.goal.toLowerCase().includes(filterSkill.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Recruiter Header */}
      <div style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)', borderRadius: 'var(--border-radius-xl)', padding: '24px 32px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(14,165,233,0.3)' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ width: 60, height: 60, borderRadius: 'var(--border-radius-md)', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '2px solid rgba(255,255,255,0.3)' }}>
            {DEMO_RECRUITERS.find(r => r.id === 'r1')?.companyLogo}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800, color: 'white', margin: 0 }}>Microsoft Talent Team</h1>
            <p style={{ opacity: 0.8, margin: '4px 0 0', fontSize: '0.875rem' }}>Hiring for AI Engineers · 24 Open Positions</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {DEMO_RECRUITERS.map(r => (
              <div key={r.id} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: 'var(--border-radius-md)', padding: '10px 16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}>
                <div style={{ fontSize: '1.2rem' }}>{r.companyLogo}</div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.95rem' }}>{r.openPositions}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{r.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid-4">
        {[
          { label: 'Active Openings', value: '102', sub: 'Across 3 companies', color: '#7C3AED' },
          { label: 'Interested Candidates', value: '310', sub: 'VedAstra matched', color: '#0EA5E9' },
          { label: 'Avg Skill Score', value: '88%', sub: 'Platform benchmark', color: '#10B981' },
          { label: 'Interviews Scheduled', value: '18', sub: 'This week', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change positive">{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
        {/* Candidate Search */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Search & Filters */}
          <div className="card-flat" style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search by name, skill, or goal..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: 36, fontSize: '0.875rem', padding: '9px 12px 9px 36px' }}
                />
              </div>
              <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Filter size={14} /> Filters
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {SKILL_FILTERS.map(f => (
                <button key={f} onClick={() => setFilterSkill(f)} style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${filterSkill === f ? 'var(--accent-primary)' : 'var(--border-card)'}`, background: filterSkill === f ? 'rgba(124,58,237,0.08)' : 'transparent', color: filterSkill === f ? 'var(--accent-primary)' : 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: '0.15s' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((candidate, i) => (
              <div key={candidate.id} className="card-flat" style={{ padding: 20, cursor: 'pointer', transition: 'all 0.2s', borderColor: selectedCandidate === candidate.id ? 'rgba(124,58,237,0.35)' : 'var(--border-card)', animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }}
                onClick={() => setSelectedCandidate(candidate.id === selectedCandidate ? null : candidate.id)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', color: 'white', flexShrink: 0, boxShadow: '0 4px 12px rgba(124,58,237,0.25)' }}>
                    {candidate.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{candidate.name}</h3>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <span className="badge badge-purple">{candidate.score}% avg</span>
                        <span className="badge badge-green">{candidate.placementProbability}% match</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}><Briefcase size={12} /> {candidate.goalIcon} {candidate.goal}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}><GraduationCap size={12} /> Level {candidate.level}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}><Award size={12} /> {candidate.certificates} Certs</span>
                    </div>

                    {/* Skill bars */}
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <MiniRadar skills={candidate.skills.slice(0, 6)} size={56} />
                      <div style={{ flex: 1 }}>
                        {candidate.skills.slice(0, 3).map(skill => (
                          <div key={skill.name} style={{ marginBottom: 5 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>
                              <span>{skill.name}</span>
                              <span style={{ fontWeight: 700, color: skill.color }}>{skill.value}%</span>
                            </div>
                            <div style={{ height: 4, background: 'var(--bg-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${skill.value}%`, background: skill.color, borderRadius: 2 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 10 }}>
                      {candidate.badges.map(b => (
                        <span key={b.id} className="tag" style={{ fontSize: '0.68rem', padding: '2px 7px' }}>{b.icon} {b.name}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedCandidate === candidate.id && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-card)', display: 'flex', gap: 10, animation: 'fadeInUp 0.3s ease' }}>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>📩 Send Interview Invite</button>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>👁️ View Full Profile</button>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>💾 Save Candidate</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Company Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {DEMO_RECRUITERS.map(r => (
            <div key={r.id} className="card-flat" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--border-radius-sm)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{r.companyLogo}</div>
                <div>
                  <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-primary)' }}>{r.company}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Hiring {r.hiringFor}</div>
                </div>
              </div>
              {[
                { label: 'Open Positions', value: r.openPositions, color: '#7C3AED' },
                { label: 'Interested Candidates', value: r.interestedStudents, color: '#0EA5E9' },
                { label: 'Avg Skill Match', value: `${r.avgSkillScore}%`, color: '#10B981' },
                { label: 'Avg Interview Score', value: `${r.avgInterviewScore}%`, color: '#F59E0B' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-card)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{s.label}</span>
                  <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.95rem', color: s.color }}>{s.value}</span>
                </div>
              ))}
              <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 12 }}>
                View All Candidates <ChevronRight size={13} />
              </button>
            </div>
          ))}

          {/* Leaderboard of matches */}
          <div className="chart-container">
            <h3 className="heading-sm" style={{ marginBottom: 12 }}>Top Skill Matches</h3>
            {candidates.slice(0, 3).map((c, i) => (
              <div key={c.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border-card)' : 'none' }}>
                <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', color: ['#F59E0B', '#9CA3AF', '#CD7F32'][i], width: 20 }}>#{i + 1}</span>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>{c.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{c.goal}</div>
                </div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, color: '#10B981', fontSize: '0.95rem' }}>{c.placementProbability}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
