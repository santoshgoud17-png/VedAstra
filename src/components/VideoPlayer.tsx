import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_COURSES, AI_LESSON_CONTENT } from '../demoData';
import { useTranslation } from '../i18n';
import { Play, Pause, SkipForward, Volume2, Maximize, Star, Users, Clock, ChevronDown, ChevronRight, Sparkles, Brain, BookOpen, Layers, FileText, Code2, CheckSquare, Download } from 'lucide-react';

// Tab definitions — labels translated at render time
const AI_TAB_DEFS = [
  { id: 'notes', labelKey: 'course.aiNotes', icon: FileText },
  { id: 'quiz', labelKey: 'course.quiz', icon: CheckSquare },
  { id: 'flashcards', labelKey: 'course.flashcards', icon: Layers },
  { id: 'mindmap', labelKey: 'course.mindMap', icon: Brain },
  { id: 'code', labelKey: 'course.coding', icon: Code2 },
  { id: 'formula', labelKey: 'course.formulas', icon: BookOpen },
];

const MODULES = [
  {
    title: 'Module 1: Introduction to ML',
    lessons: ['What is Machine Learning?', 'Types of ML: Supervised vs Unsupervised', 'The ML Workflow'],
    duration: '2h 15m',
    completed: true,
  },
  {
    title: 'Module 2: Neural Networks',
    lessons: ['Perceptrons & Layers', 'Activation Functions', 'Backpropagation Explained', 'Gradient Descent'],
    duration: '3h 40m',
    completed: true,
  },
  {
    title: 'Module 3: Transformer Architecture',
    lessons: ['Attention Mechanism Deep Dive', 'Multi-Head Attention', 'Positional Encodings', 'BERT vs GPT Design'],
    duration: '4h 20m',
    completed: false,
  },
  {
    title: 'Module 4: LLMs in Production',
    lessons: ['Fine-tuning Strategies', 'RLHF & Alignment', 'Prompt Engineering', 'RAG Pipelines'],
    duration: '3h 55m',
    completed: false,
  },
];

export const VideoPlayer: React.FC = () => {
  const { activeCourseId } = useApp();
  const { t } = useTranslation();
  const course = DEMO_COURSES.find(c => c.id === activeCourseId) || DEMO_COURSES[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(34);
  const [volume, setVolume] = useState(80);
  const [activeAiTab, setActiveAiTab] = useState('notes');
  const [expandedModule, setExpandedModule] = useState(2);
  const [activeLesson, setActiveLesson] = useState('Attention Mechanism Deep Dive');
  const [quizAnswers, setQuizAnswers] = useState<{ [k: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 0, height: 'calc(100vh - 120px)', minHeight: 0 }}>
      {/* ── Left: Video + Course Info + Module List ── */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Video Player */}
        <div style={{ background: '#0D0E1A', position: 'relative', aspectRatio: '16/9', flexShrink: 0, overflow: 'hidden' }}>
          {/* Fake Video Canvas */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1040 0%, #0e1a30 50%, #0D0E1A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Neural network decoration */}
            <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.12 }}>
              {[[50, 50], [200, 120], [350, 80], [500, 150], [650, 80], [780, 120]].map(([x, y], i, arr) => (
                i < arr.length - 1 ? <line key={i} x1={x} y1={y} x2={arr[i + 1][0]} y2={arr[i + 1][1]} stroke="#7C3AED" strokeWidth="1.5" /> : null
              ))}
              {[[50, 50], [200, 120], [350, 80], [500, 150], [650, 80], [780, 120]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={6} fill="#7C3AED" />
              ))}
            </svg>
            <div style={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6, fontFamily: 'Outfit' }}>Attention Mechanism Deep Dive</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{course.title} · Module 3</div>
            </div>
          </div>

          {/* Play/Pause center button */}
          <button onClick={() => setIsPlaying(!isPlaying)} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: '0.2s', zIndex: 5 }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: 3 }} />}
          </button>

          {/* Controls overlay */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
            {/* Progress bar */}
            <div
              style={{ height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 2, marginBottom: 10, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
              }}
            >
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7C3AED, #0EA5E9)', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'white' }}>
              <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}><SkipForward size={18} /></button>
              <Volume2 size={16} />
              <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(+e.target.value)} style={{ width: 70, accentColor: '#7C3AED' }} />
              <span style={{ fontSize: '0.78rem', opacity: 0.8, marginLeft: 4 }}>24:18 / 71:40</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 4, cursor: 'pointer' }}>1.0x</span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 4, cursor: 'pointer' }}>CC</span>
                <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}><Maximize size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Below Video: Info + Modules */}
        <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-primary)' }}>
          {/* Course Info Bar */}
          <div style={{ padding: '16px 20px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>{course.title}</h2>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}><Star size={13} color="#F59E0B" fill="#F59E0B" /> {course.rating} ({course.studentsCount.toLocaleString()} students)</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}><Users size={13} /> {course.educator}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}><Clock size={13} /> {course.duration}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm"><Download size={13} /> {t('action.download')}</button>
                <button className="btn btn-primary btn-sm">{t('course.completed')}</button>
              </div>
            </div>
          </div>

          {/* Module List */}
          <div style={{ padding: '16px' }}>
            {MODULES.map((mod, mi) => (
              <div key={mi} style={{ marginBottom: 8, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden' }}>
                <button onClick={() => setExpandedModule(expandedModule === mi ? -1 : mi)} style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', transition: '0.15s' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: mod.completed ? 'linear-gradient(135deg, #7C3AED, #0EA5E9)' : 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {mod.completed ? <CheckSquare size={12} color="white" /> : <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-muted)' }}>{mi + 1}</span>}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{mod.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{mod.lessons.length} lessons · {mod.duration}</div>
                  </div>
                  {expandedModule === mi ? <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />}
                </button>
                {expandedModule === mi && (
                  <div style={{ borderTop: '1px solid var(--border-card)' }}>
                    {mod.lessons.map((lesson, li) => (
                      <button key={li} onClick={() => setActiveLesson(lesson)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 20px', background: activeLesson === lesson ? 'rgba(124,58,237,0.06)' : 'transparent', border: 'none', cursor: 'pointer', borderBottom: li < mod.lessons.length - 1 ? '1px solid var(--border-card)' : 'none', transition: '0.15s' }}>
                        <Play size={12} color={activeLesson === lesson ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                        <span style={{ fontSize: '0.82rem', color: activeLesson === lesson ? 'var(--accent-primary)' : 'var(--text-secondary)', fontWeight: activeLesson === lesson ? 600 : 400 }}>{lesson}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: AI Sidebar ── */}
      <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', borderLeft: '1px solid var(--border-card)', overflow: 'hidden' }}>
        {/* AI Sidebar Header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(14,165,233,0.03))' }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={14} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>AI Learning Assistant</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--accent-success)', fontWeight: 600 }}>✓ Auto-generated from video</div>
          </div>
        </div>

        {/* Tab Strip */}
        <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--border-card)', flexShrink: 0 }}>
          {AI_TAB_DEFS.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveAiTab(tab.id)} style={{ display: 'flex', flex: '0 0 auto', alignItems: 'center', gap: 4, padding: '10px 12px', background: 'transparent', border: 'none', borderBottom: activeAiTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent', color: activeAiTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, transition: '0.15s', whiteSpace: 'nowrap' }}>
                <Icon size={13} /> {t(tab.labelKey as any)}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {/* ── NOTES ── */}
          {activeAiTab === 'notes' && (
            <div style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {AI_LESSON_CONTENT.notes.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h3 key={i} style={{ color: 'var(--text-primary)', fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 700, margin: '12px 0 6px' }}>{line.slice(3)}</h3>;
                if (line.startsWith('### ')) return <h4 key={i} style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.875rem', margin: '10px 0 4px' }}>{line.slice(4)}</h4>;
                if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0' }}>{line.slice(2, -2)}</p>;
                if (line.startsWith('|')) return <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '2px 8px', borderLeft: '2px solid var(--accent-primary)', marginBottom: 2, color: 'var(--text-secondary)' }}>{line}</div>;
                if (line.startsWith('`')) return <code key={i} style={{ display: 'block', background: '#1E1E2E', color: '#CDD6F4', padding: '8px 12px', borderRadius: 6, fontSize: '0.78rem', margin: '6px 0', fontFamily: 'monospace' }}>{line.slice(1, -1)}</code>;
                if (!line.trim()) return <br key={i} />;
                return <p key={i} style={{ margin: '3px 0' }}>{line}</p>;
              })}
            </div>
          )}

          {/* ── QUIZ ── */}
          {activeAiTab === 'quiz' && (
            <div>
              {AI_LESSON_CONTENT.quiz.map((q, qi) => (
                <div key={qi} style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.5 }}>{qi + 1}. {q.question}</p>
                  {q.options.map((opt, oi) => {
                    const isSelected = quizAnswers[qi] === oi;
                    const isCorrect = oi === q.correct;
                    const showResult = quizSubmitted;
                    return (
                      <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))} style={{ display: 'flex', gap: 8, width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 5, borderRadius: 'var(--border-radius-sm)', border: `1.5px solid ${showResult ? (isCorrect ? '#10B981' : isSelected ? '#EF4444' : 'var(--border-card)') : isSelected ? 'var(--accent-primary)' : 'var(--border-card)'}`, background: showResult ? (isCorrect ? 'rgba(16,185,129,0.07)' : isSelected ? 'rgba(239,68,68,0.07)' : 'transparent') : isSelected ? 'rgba(124,58,237,0.07)' : 'transparent', cursor: quizSubmitted ? 'default' : 'pointer', transition: '0.15s' }}>
                        <span style={{ width: 18, height: 18, borderRadius: 3, border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-card)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem', fontWeight: 800, color: isSelected ? 'var(--accent-primary)' : 'transparent' }}>✓</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{opt}</span>
                      </button>
                    );
                  })}
                  {quizSubmitted && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '6px 8px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-xs)', marginTop: 4 }}>
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              ))}
              {!quizSubmitted ? (
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setQuizSubmitted(true)}>Submit Quiz</button>
              ) : (
                <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(16,185,129,0.07)', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ fontSize: '1.4rem', fontFamily: 'Outfit', fontWeight: 900, color: '#10B981' }}>
                    {Math.round((Object.entries(quizAnswers).filter(([qi, ans]) => ans === AI_LESSON_CONTENT.quiz[+qi]?.correct).length / AI_LESSON_CONTENT.quiz.length) * 100)}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+30 XP earned</div>
                  <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }} onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}>Retry</button>
                </div>
              )}
            </div>
          )}

          {/* ── FLASHCARDS ── */}
          {activeAiTab === 'flashcards' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 12, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Card {currentCard + 1} of {AI_LESSON_CONTENT.flashcards.length}</div>
              <div onClick={() => setCardFlipped(!cardFlipped)} style={{ minHeight: 160, background: cardFlipped ? 'linear-gradient(135deg, #7C3AED, #0EA5E9)' : 'var(--bg-tertiary)', border: '1px solid var(--border-card)', borderRadius: 'var(--border-radius-md)', padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', transition: 'all 0.4s ease', gap: 8 }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: cardFlipped ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)' }}>{cardFlipped ? '✓ ANSWER' : 'QUESTION'}</div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: cardFlipped ? 'white' : 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
                  {cardFlipped ? AI_LESSON_CONTENT.flashcards[currentCard].back : AI_LESSON_CONTENT.flashcards[currentCard].front}
                </p>
                <div style={{ fontSize: '0.68rem', color: cardFlipped ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)' }}>Click to flip</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => { setCurrentCard(c => Math.max(0, c - 1)); setCardFlipped(false); }}>← Prev</button>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => { setCurrentCard(c => (c + 1) % AI_LESSON_CONTENT.flashcards.length); setCardFlipped(false); }}>Next →</button>
              </div>
            </div>
          )}

          {/* ── MINDMAP ── */}
          {activeAiTab === 'mindmap' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.75rem' }}>Transformer</span>
              </div>
              {AI_LESSON_CONTENT.mindmap.branches.map((branch, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'inline-block', padding: '5px 14px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 6 }}>{branch.label}</div>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {branch.children.map(child => (
                      <span key={child} style={{ padding: '3px 10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-card)', borderRadius: 20, fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{child}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── FORMULA SHEET ── */}
          {activeAiTab === 'formula' && (
            <div>
              {AI_LESSON_CONTENT.formulaSheet.map((f, i) => (
                <div key={i} style={{ marginBottom: 14, background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)', padding: '12px 14px', border: '1px solid var(--border-card)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{f.name}</div>
                  <code style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.82rem', background: '#1E1E2E', color: '#CDD6F4', padding: '6px 10px', borderRadius: 4 }}>{f.formula}</code>
                </div>
              ))}
            </div>
          )}

          {/* ── CODING ── */}
          {activeAiTab === 'code' && (
            <div>
              <div style={{ background: '#1E1E2E', borderRadius: 'var(--border-radius-md)', padding: '16px', marginBottom: 12 }}>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Python · Attention Mechanism</span>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.72rem', color: '#7C3AED' }}>Copy</button>
                </div>
                <pre style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#CDD6F4', margin: 0, overflowX: 'auto', lineHeight: 1.6 }}>
                  {`import torch
import torch.nn.functional as F
import math

def attention(Q, K, V):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2,-1))
    scores = scores / math.sqrt(d_k)
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, V), weights`}
                </pre>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)' }}>
                💡 Try extending this to implement Multi-Head Attention with 8 heads!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
