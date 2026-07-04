import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const SKILLS_RADAR = [
  { name: 'Programming', key: 'Programming' },
  { name: 'AI & ML', key: 'AI & ML' },
  { name: 'Problem Solving', key: 'Problem Solving' },
  { name: 'Communication', key: 'Communication' },
  { name: 'Cloud & DevOps', key: 'Cloud & DevOps' },
  { name: 'Machine Learning', key: 'Machine Learning' },
];

const SkillRadar: React.FC<{ skills: { [k: string]: number }; studentName: string }> = ({ skills, studentName: _studentName }) => {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
  const n = SKILLS_RADAR.length;

  const angleStep = (Math.PI * 2) / n;

  const getPoint = (i: number, value: number, radius: number) => {
    const angle = angleStep * i - Math.PI / 2;
    return {
      x: cx + radius * (value / 100) * Math.cos(angle),
      y: cy + radius * (value / 100) * Math.sin(angle),
    };
  };

  const getLabelPoint = (i: number) => {
    const angle = angleStep * i - Math.PI / 2;
    const labelR = r + 28;
    return { x: cx + labelR * Math.cos(angle), y: cy + labelR * Math.sin(angle) };
  };

  const getAxisPoint = (i: number) => {
    const angle = angleStep * i - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const skillPoints = SKILLS_RADAR.map((s, i) => getPoint(i, skills[s.key] || 50, r));
  const polyPoints = skillPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Concentric rings at 25%, 50%, 75%, 100%
  const rings = [25, 50, 75, 100];

  return (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible', maxWidth: 340 }}>
      <defs>
        <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Concentric rings */}
      {rings.map(pct => {
        const ringPoints = Array.from({ length: n }, (_, i) => {
          const angle = angleStep * i - Math.PI / 2;
          return `${cx + r * (pct / 100) * Math.cos(angle)},${cy + r * (pct / 100) * Math.sin(angle)}`;
        });
        return (
          <g key={pct}>
            <polygon points={ringPoints.join(' ')} fill="none" stroke="var(--border-color)" strokeWidth="1" />
            <text x={cx + 2} y={cy - r * (pct / 100)} fontSize="8" fill="var(--text-muted)" textAnchor="start">{pct}%</text>
          </g>
        );
      })}

      {/* Axis lines */}
      {SKILLS_RADAR.map((_, i) => {
        const axPt = getAxisPoint(i);
        return <line key={i} x1={cx} y1={cy} x2={axPt.x} y2={axPt.y} stroke="var(--border-color)" strokeWidth="1" />;
      })}

      {/* Filled area */}
      <polygon points={polyPoints} fill="url(#radarGrad)" stroke="#7C3AED" strokeWidth="2" strokeLinejoin="round" />

      {/* Data points */}
      {skillPoints.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={5} fill="#7C3AED" stroke="white" strokeWidth="2">
          <title>{SKILLS_RADAR[i].name}: {skills[SKILLS_RADAR[i].key] || 50}%</title>
        </circle>
      ))}

      {/* Labels */}
      {SKILLS_RADAR.map((s, i) => {
        const lp = getLabelPoint(i);
        const value = skills[s.key] || 50;
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9.5" fontWeight="700" fill="var(--text-secondary)" fontFamily="Outfit">
            <tspan x={lp.x} dy="-6">{s.name}</tspan>
            <tspan x={lp.x} dy="13" fill="#7C3AED" fontWeight="800">{value}%</tspan>
          </text>
        );
      })}
    </svg>
  );
};

export const SkillGraph: React.FC = () => {
  const { activeStudent, skills } = useApp();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const avgSkill = Math.round(Object.values(skills).reduce((a, b) => a + b, 0) / Math.max(Object.values(skills).length, 1));
  const topSkill = activeStudent.skills.reduce((best, s) => s.value > best.value ? s : best, activeStudent.skills[0]);
  const weakSkill = activeStudent.skills.reduce((weak, s) => s.value < weak.value ? s : weak, activeStudent.skills[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="heading-lg">Skill Graph</h2>
          <p className="body-sm">Your real-time skill profile — tracked by AI</p>
        </div>
        <div className="badge badge-purple">🤖 AI-Tracked</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Radar Chart */}
        <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <h3 className="heading-sm">Skills Radar</h3>
          <div style={{ opacity: animated ? 1 : 0, transform: animated ? 'scale(1)' : 'scale(0.8)', transition: 'all 0.5s ease' }}>
            <SkillRadar skills={skills} studentName={activeStudent.name} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{avgSkill}%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Overall Skill Score</div>
          </div>
        </div>

        {/* Skill Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {[
              { label: 'Strongest Skill', value: topSkill.name, sub: `${topSkill.value}%`, emoji: '💪', color: '#10B981' },
              { label: 'Focus Area', value: weakSkill.name, sub: `${weakSkill.value}%`, emoji: '🎯', color: '#F59E0B' },
              { label: 'Avg Score', value: `${avgSkill}%`, sub: 'All skills', emoji: '📊', color: '#7C3AED' },
              { label: 'Goal Ready', value: `${activeStudent.interviewReadiness}%`, sub: activeStudent.goal, emoji: '🚀', color: '#0EA5E9' },
            ].map(card => (
              <div key={card.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--border-radius-md)', padding: '14px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{card.emoji}</div>
                <div style={{ fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 800, color: card.color }}>{card.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{card.label}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Individual Skill Bars */}
          <div className="chart-container" style={{ flex: 1 }}>
            <h3 className="heading-sm" style={{ marginBottom: 14 }}>Skill Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {activeStudent.skills.map((skill, i) => (
                <div key={skill.name} style={{ animation: `fadeInUp 0.4s ease ${i * 0.07}s both` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {skill.value >= 85 ? '🏆 Expert' : skill.value >= 70 ? '⭐ Advanced' : skill.value >= 50 ? '📚 Intermediate' : '🌱 Beginner'}
                      </span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: skill.color, minWidth: 35, textAlign: 'right' }}>{skill.value}%</span>
                    </div>
                  </div>
                  <div style={{ height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: animated ? `${skill.value}%` : '0%', background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`, borderRadius: 4, transition: `width 0.8s ease ${i * 0.1}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="chart-container">
        <h3 className="heading-sm" style={{ marginBottom: 16 }}>Skill Improvement Timeline</h3>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
          {activeStudent.monthlySkillData.map((d, i) => (
            <div key={d.month} style={{ flex: '0 0 auto', width: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative' }}>
              {i < activeStudent.monthlySkillData.length - 1 && (
                <div style={{ position: 'absolute', top: 14, left: '70%', width: '60%', height: 2, background: 'var(--border-card)', zIndex: 0 }} />
              )}
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === activeStudent.monthlySkillData.length - 1 ? 'linear-gradient(135deg, #7C3AED, #0EA5E9)' : 'var(--bg-tertiary)', border: '2px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, position: 'relative' }}>
                {i === activeStudent.monthlySkillData.length - 1 ? (
                  <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'white' }}>NOW</span>
                ) : (
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)' }}>{i + 1}</span>
                )}
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: i === activeStudent.monthlySkillData.length - 1 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{d.month}</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{d.programming}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
