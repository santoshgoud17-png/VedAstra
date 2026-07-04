import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DIAGNOSTIC_QUESTIONS } from '../demoData';
import { Brain, CheckCircle, ChevronRight, Zap, Target } from 'lucide-react';

export const DiagnosticQuiz: React.FC = () => {
  const { setDiagnosticCompleted, setCurrentView, addXp, updateSkill, activeStudent } = useApp();
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplain, setShowExplain] = useState(false);

  const questions = DIAGNOSTIC_QUESTIONS;
  const totalQ = questions.length;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplain(true);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (current < totalQ - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplain(false);
    } else {
      // Score and finish
      newAnswers.forEach((ans, qi) => {
        const q = questions[qi];
        if (ans === q.correctIndex) {
          Object.entries(q.skillImpact).forEach(([skill, delta]) => updateSkill(skill, delta * 0.05));
        }
      });
      addXp(250);
      setDiagnosticCompleted(true);
      setStep('result');
    }
  };

  const score = answers.filter((ans, qi) => ans === questions[qi]?.correctIndex).length;
  const progress = ((current + (selected !== null ? 1 : 0)) / totalQ) * 100;

  // Intro Screen
  if (step === 'intro') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ maxWidth: 600, width: '100%', textAlign: 'center', animation: 'fadeInUp 0.5s ease' }}>
          {/* Hero icon */}
          <div style={{ width: 96, height: 96, borderRadius: 24, background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 40px rgba(124,58,237,0.35)', animation: 'float 4s ease-in-out infinite' }}>
            <Brain size={46} color="white" />
          </div>

          <div className="badge badge-purple" style={{ margin: '0 auto 16px', display: 'inline-flex' }}>🤖 AI-Powered Assessment</div>
          <h1 className="display-lg" style={{ marginBottom: 12 }}>
            Know Your <span className="text-gradient">Learning Profile</span>
          </h1>
          <p className="body-lg" style={{ marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            A quick {totalQ}-question diagnostic to map your current knowledge. Our AI will build a personalized learning roadmap just for you.
          </p>

          {/* Feature chips */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {[
              { icon: '⏱️', text: `~${totalQ * 0.5} minutes` },
              { icon: '🧠', text: 'AI-adaptive questions' },
              { icon: '🗺️', text: 'Personalized roadmap' },
              { icon: '⚡', text: '+250 XP on completion' },
            ].map(f => (
              <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 20, fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500, boxShadow: 'var(--shadow-sm)' }}>
                <span>{f.icon}</span> {f.text}
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-primary-lg" onClick={() => setStep('quiz')} style={{ margin: '0 auto', display: 'inline-flex' }}>
            Start Diagnostic Assessment <ChevronRight size={18} />
          </button>
          <p style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Don't worry about scores — this helps AI understand your starting point.
          </p>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (step === 'quiz') {
    const q = questions[current];
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 40 }}>
        <div style={{ maxWidth: 680, width: '100%', animation: 'fadeInUp 0.4s ease' }}>
          {/* Progress Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Question {current + 1} of {totalQ}</span>
              <div className="badge badge-purple">{q.domain}</div>
            </div>
            <div style={{ height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7C3AED, #0EA5E9)', borderRadius: 4, transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Question Card */}
          <div className="card-flat" style={{ padding: '32px', marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 28 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Brain size={20} color="white" />
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.45, flex: 1, margin: 0 }}>{q.question}</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === q.correctIndex;
                const showResult = showExplain;

                let borderColor = 'var(--border-card)';
                let bg = 'var(--bg-card)';
                let textColor = 'var(--text-secondary)';

                if (showResult) {
                  if (isCorrect) { borderColor = '#10B981'; bg = 'rgba(16,185,129,0.06)'; textColor = '#059669'; }
                  else if (isSelected) { borderColor = '#EF4444'; bg = 'rgba(239,68,68,0.06)'; textColor = '#DC2626'; }
                } else if (isSelected) {
                  borderColor = '#7C3AED'; bg = 'rgba(124,58,237,0.06)'; textColor = '#7C3AED';
                }

                return (
                  <button key={i} onClick={() => handleAnswer(i)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 'var(--border-radius-md)', border: `2px solid ${borderColor}`, background: bg, cursor: selected !== null ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
                    onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--border-card)'; }}
                  >
                    <div style={{ width: 30, height: 30, borderRadius: '50%', border: `2px solid ${isSelected || (showResult && isCorrect) ? borderColor : 'var(--border-card)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.78rem', fontWeight: 800, fontFamily: 'Outfit', color: isSelected || (showResult && isCorrect) ? borderColor : 'var(--text-muted)', background: showResult && isCorrect ? 'rgba(16,185,129,0.1)' : 'transparent' }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span style={{ fontSize: '0.925rem', fontWeight: 500, color: textColor, flex: 1 }}>{opt}</span>
                    {showResult && isCorrect && <CheckCircle size={18} color="#10B981" />}
                  </button>
                );
              })}
            </div>
          </div>

          {showExplain && (
            <div style={{ padding: '14px 18px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 'var(--border-radius-md)', marginBottom: 20, animation: 'fadeInUp 0.3s ease' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                <Zap size={14} color="#7C3AED" style={{ flexShrink: 0, marginTop: 2 }} />
                <span><strong>AI Insight:</strong> {selected === q.correctIndex ? '✅ Correct! ' : '❌ The correct answer is "' + q.options[q.correctIndex] + '". '} This question maps to your <strong>{q.domain}</strong> skill area.</span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={handleNext} disabled={selected === null} style={{ opacity: selected === null ? 0.5 : 1 }}>
              {current < totalQ - 1 ? 'Next Question' : 'Complete Assessment'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  const pct = Math.round((score / totalQ) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ maxWidth: 700, width: '100%', textAlign: 'center', animation: 'bounceIn 0.6s ease' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
        <h1 className="display-lg" style={{ marginBottom: 8 }}>Assessment Complete!</h1>
        <p className="body-lg" style={{ marginBottom: 32 }}>Your AI-powered learning profile is ready. You scored <strong>{score}/{totalQ}</strong> ({pct}%).</p>

        {/* Score breakdown */}
        <div className="grid-4" style={{ marginBottom: 32, textAlign: 'center' }}>
          {[
            { label: 'Questions', value: `${score}/${totalQ}`, color: '#7C3AED', emoji: '📝' },
            { label: 'Score', value: `${pct}%`, color: pct >= 70 ? '#10B981' : '#F59E0B', emoji: '🎯' },
            { label: 'XP Earned', value: '+250', color: '#F59E0B', emoji: '⚡' },
            { label: 'Profile', value: 'Built!', color: '#0EA5E9', emoji: '🗺️' },
          ].map(s => (
            <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{s.emoji}</div>
              <div style={{ fontFamily: 'Outfit', fontSize: '1.6rem', fontWeight: 900, color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Skill Profile */}
        <div className="chart-container" style={{ marginBottom: 24, textAlign: 'left' }}>
          <h3 className="heading-sm" style={{ marginBottom: 16 }}>Your Knowledge Profile</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activeStudent.skills.map(skill => (
              <div key={skill.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
                  <span style={{ fontWeight: 800, color: skill.color }}>{skill.value}%</span>
                </div>
                <div style={{ height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${skill.value}%`, background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={() => setCurrentView('student-dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            View Dashboard
          </button>
          <button className="btn btn-primary btn-primary-lg" onClick={() => setCurrentView('student-dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={16} /> Start Your Roadmap <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
