import React, { useState, useRef, useEffect } from 'react';
import {
  Mic, MicOff, Video as Cam, VideoOff, Monitor, Pen, Hand, MessageSquare,
  Smile, BarChart2, Download, Maximize, X, LogOut, Sparkles, Users,
  ChevronRight, Send, BookOpen, CheckCircle, Award, Zap, Volume2,
} from 'lucide-react';
import type { LiveClass } from '../demoData';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';

interface ChatMsg { id: number; user: string; text: string; isAI?: boolean; time: string; }

const INIT_MSGS: ChatMsg[] = [
  { id: 1, user: 'Dr. Meera Iyer', text: 'Welcome everyone! Starting shortly.', time: '6:00 PM' },
  { id: 2, user: 'Aarav Sharma', text: 'Ready and excited!', time: '6:01 PM' },
  { id: 3, user: '🤖 Veda AI', text: 'Recording + AI notes will be available after class.', time: '6:01 PM', isAI: true },
];

const AI_NOTES = [
  'Key Insight: Self-attention computes relationships between all tokens simultaneously',
  'Formula: Attention(Q,K,V) = softmax(Q*K_T/sqrt(d_k)) * V',
  'Multi-head attention runs h parallel attention heads, then concatenates outputs',
  'Positional Encoding uses sine/cosine functions to inject token order information',
  'Transformer achieves O(1) path length between positions, ideal for long sequences',
  'Feed-Forward layer: two linear transforms with ReLU activation between them',
  'BERT uses bidirectional encoder; GPT-style models use unidirectional decoder',
];

const POLL_OPTS = [
  { id: 'a', text: 'Self-Attention Mechanism', votes: 42 },
  { id: 'b', text: 'Positional Encoding', votes: 27 },
  { id: 'c', text: 'Multi-Head Attention', votes: 31 },
  { id: 'd', text: 'Feed-Forward Layer', votes: 18 },
];

const TB: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; danger?: boolean; onClick?: () => void }> = ({ icon, label, active, danger, onClick }) => (
  <button onClick={onClick} title={label} style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
    padding: '8px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
    background: danger ? 'rgba(239,68,68,0.15)' : active ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)',
    color: danger ? '#EF4444' : active ? '#A78BFA' : '#CBD5E1',
    transition: 'all 0.15s', minWidth: 54,
  }}>
    {icon}
    <span style={{ fontSize: '0.62rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
  </button>
);

export const LiveClassroom: React.FC = () => {
  const { setCurrentView } = useApp();
  const { t } = useTranslation();
  const [cls] = useState<LiveClass | null>(() => {
    try {
      return JSON.parse(sessionStorage.getItem('vc_active_class') || 'null');
    } catch {
      return null;
    }
  });

  const [mic, setMic] = useState(false);
  const [cam, setCam] = useState(false);
  const [panel, setPanel] = useState<'chat' | 'notes' | 'people' | 'poll' | null>('notes');
  const [msgs, setMsgs] = useState<ChatMsg[]>(INIT_MSGS);
  const [inp, setInp] = useState('');
  const [notes, setNotes] = useState(1);
  const [voted, setVoted] = useState<string | null>(null);
  const [hand, setHand] = useState(false);
  const [board, setBoard] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [summary, setSummary] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const mid = useRef(200);

  const isRec = cls?.status === 'completed';

  useEffect(() => {
    if (isRec || elapsed > 0) return;
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [isRec, elapsed]);

  useEffect(() => {
    if (isRec) {
      setNotes(AI_NOTES.length);
      return;
    }
    if (panel !== 'notes') return;
    if (notes >= AI_NOTES.length) return;
    const t = setTimeout(() => setNotes(n => n + 1), 3500);
    return () => clearTimeout(t);
  }, [notes, panel, isRec]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const fmt = (s: number) =>
    String(Math.floor(s / 3600)).padStart(2, '0') + ':' +
    String(Math.floor((s % 3600) / 60)).padStart(2, '0') + ':' +
    String(s % 60).padStart(2, '0');

  const send = () => {
    if (!inp.trim()) return;
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMsgs(p => [...p, { id: ++mid.current, user: 'You', text: inp, time: t }]);
    setInp('');
    setTimeout(() => {
      setMsgs(p => [...p, {
        id: ++mid.current,
        user: '🤖 Veda AI',
        text: 'Great question! In the Transformer architecture, attention maps input vectors to key-value pairs. Live notes contain structural details.',
        time: t,
        isAI: true,
      }]);
    }, 1200);
  };

  const leave = () => {
    if (isRec) {
      setCurrentView('live-classes');
      return;
    }
    setSummary(true);
  };

  const tv = POLL_OPTS.reduce((acc, curr) => acc + curr.votes, 0) + (voted ? 1 : 0);
  const c = cls || {
    title: 'Live Class',
    subject: 'Subject',
    subjectIcon: '🎓',
    subjectColor: '#7C3AED',
    teacher: 'Instructor',
    teacherInitials: 'T',
    status: 'live',
    time: 'Now',
    duration: '90 min',
  };

  if (summary) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ maxWidth: 600, width: '100%', background: 'var(--bg-card)', borderRadius: 20, padding: '36px 32px', border: '1px solid var(--border-card)', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Sparkles size={28} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px' }}>Class Ended — AI Summary Ready!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 24px' }}>Duration: {fmt(elapsed)} · 347 students attended</p>
          <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 14, padding: '18px 20px', textAlign: 'left', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontWeight: 700, color: '#7C3AED', fontSize: '0.9rem' }}><Sparkles size={15} /> AI-Generated Summary</div>
            <p style={{ margin: '0 0 10px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>The session explored Transformer architecture including self-attention, multi-head attention, and positional encoding. Students developed intuition for why attention outperforms recurrence on long sequences.</p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {AI_NOTES.slice(0, 4).map((n, i) => (
                <li key={i} style={{ marginBottom: 5 }}>{n}</li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
            {([
              { icon: <BookOpen size={16} />, label: 'Notes', color: '#0EA5E9' },
              { icon: <Award size={16} />, label: 'Quiz', color: '#10B981' },
              { icon: <Zap size={16} />, label: 'Flashcards', color: '#F59E0B' },
            ] as const).map((a, i) => (
              <button key={i} style={{ padding: '10px 8px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: a.color, fontSize: '0.78rem', fontWeight: 600 }}>{a.icon}{a.label}</button>
            ))}
          </div>
          <button onClick={() => setCurrentView('live-classes')} style={{ width: '100%', padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}>
            <ChevronRight size={16} /> Back to Live Classes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0F1117', color: '#E2E8F0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: '#161B26', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#7C3AED,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{c.subjectIcon}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>{c.title}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{c.teacher} - {c.subject}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {!isRec && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: c.status === 'live' ? 'rgba(239,68,68,0.15)' : 'rgba(14,165,233,0.1)', border: '1px solid ' + (c.status === 'live' ? 'rgba(239,68,68,0.3)' : 'rgba(14,165,233,0.2)') }}>
              {c.status === 'live' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', display: 'inline-block', animation: 'lp 1.4s infinite' }} />}
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: c.status === 'live' ? '#EF4444' : '#0EA5E9' }}>{c.status === 'live' ? fmt(elapsed) : c.time}</span>
            </div>
          )}
          {isRec && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', padding: '5px 12px', borderRadius: 8, background: 'rgba(100,116,139,0.1)' }}>RECORDING - {c.duration}</span>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: '#64748B' }}><Users size={13} /> 347</div>
          <button onClick={leave} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
            {isRec ? <><X size={14} /> {t('action.close')}</> : <><LogOut size={14} /> {t('live.leaveStream')}</>}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {board ? (
            <div style={{ flex: 1, background: '#1A1F2E', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                {['#7C3AED', '#EF4444', '#10B981', '#F59E0B', '#0EA5E9', '#F8FAFC'].map(col => (
                  <button key={col} style={{ width: 22, height: 22, borderRadius: '50%', background: col, border: '2px solid rgba(255,255,255,0.2)', cursor: 'pointer' }} />
                ))}
                <button style={{ padding: '2px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '0.72rem', cursor: 'pointer' }}>Clear</button>
              </div>
              <div style={{ width: '80%', height: '70%', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                <Pen size={32} color="rgba(124,58,237,0.5)" />
                <span style={{ color: '#475569', fontSize: '0.85rem' }}>Digital Whiteboard</span>
              </div>
              <button onClick={() => setBoard(false)} style={{ position: 'absolute', top: 12, right: 12, padding: '5px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '0.75rem', cursor: 'pointer' }}>Back to Video</button>
            </div>
          ) : (
            <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(135deg,#0D1117,#161B26)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%,rgba(124,58,237,0.08),transparent 60%),radial-gradient(ellipse at 70% 60%,rgba(14,165,233,0.06),transparent 60%)' }} />
              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: (c.subjectColor || '#7C3AED') + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '2rem', border: '2px solid ' + (c.subjectColor || '#7C3AED') + '40' }}>
                  {(c as LiveClass).teacherInitials || 'T'}
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: 4 }}>{c.teacher}</div>
                <div style={{ fontSize: '0.78rem', color: '#475569' }}>{isRec ? 'Recording Playback' : 'Live - Presenting'}</div>
                {!isRec && (
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '6px 14px', justifyContent: 'center' }}>
                    <Volume2 size={14} color="#10B981" />
                    <div style={{ display: 'flex', gap: 2, alignItems: 'center', height: 20 }}>
                      {[4, 8, 6, 12, 5, 9, 7, 11, 4, 8].map((h, i) => (
                        <div key={i} style={{ width: 3, borderRadius: 99, background: '#10B981', height: h, opacity: 0.8 }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 8 }}>
                {['A', 'P', 'R', 'J'].map((init, i) => (
                  <div key={i} style={{ width: 80, height: 52, borderRadius: 8, background: 'rgba(100,100,100,0.15)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#CBD5E1', position: 'relative' }}>
                    {init}
                    {i === 0 && <span style={{ position: 'absolute', bottom: 3, left: 3, fontSize: '0.55rem', background: 'rgba(16,185,129,0.3)', color: '#10B981', padding: '1px 4px', borderRadius: 3 }}>You</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ background: '#161B26', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap', flexShrink: 0 }}>
            <TB icon={mic ? <Mic size={16} /> : <MicOff size={16} />} label={mic ? 'Mute' : 'Unmute'} active={mic} onClick={() => setMic(p => !p)} />
            <TB icon={cam ? <Cam size={16} /> : <VideoOff size={16} />} label={cam ? 'Stop Cam' : 'Start Cam'} active={cam} onClick={() => setCam(p => !p)} />
            <TB icon={<Monitor size={16} />} label="Share" />
            <TB icon={<Pen size={16} />} label="Whiteboard" active={board} onClick={() => setBoard(p => !p)} />
            <TB icon={<Hand size={16} />} label={hand ? '✋ Raised' : 'Raise Hand'} active={hand} onClick={() => setHand(p => !p)} />
            <TB icon={<Smile size={16} />} label="React" />
            <TB icon={<BarChart2 size={16} />} label="Poll" active={panel === 'poll'} onClick={() => setPanel(p => p === 'poll' ? null : 'poll')} />
            <TB icon={<MessageSquare size={16} />} label="Chat" active={panel === 'chat'} onClick={() => setPanel(p => p === 'chat' ? null : 'chat')} />
            <TB icon={<Sparkles size={16} />} label={t('live.notes')} active={panel === 'notes'} onClick={() => setPanel(p => p === 'notes' ? null : 'notes')} />
            <TB icon={<Users size={16} />} label="People" active={panel === 'people'} onClick={() => setPanel(p => p === 'people' ? null : 'people')} />
            <TB icon={<Download size={16} />} label="Notes" />
            <TB icon={<Maximize size={16} />} label="Fullscreen" />
            {!isRec && <TB icon={<LogOut size={16} />} label={t('live.leaveStream')} danger onClick={leave} />}
          </div>
        </div>

        {panel && (
          <div style={{ width: 320, background: '#161B26', borderLeft: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
              {(['notes', 'chat', 'people', 'poll'] as const).map(p => (
                <button key={p} onClick={() => setPanel(p)} style={{ flex: 1, padding: '10px 4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: panel === p ? '#A78BFA' : '#475569', borderBottom: '2px solid ' + (panel === p ? '#7C3AED' : 'transparent'), transition: 'all 0.15s' }}>
                  {p === 'notes' ? 'AI' : p === 'chat' ? t('live.chatPlaceholder').substring(0, 4) : p === 'people' ? 'People' : 'Poll'}
                </button>
              ))}
            </div>

            {panel === 'notes' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12, color: '#A78BFA', fontWeight: 700, fontSize: '0.82rem' }}>
                  <Sparkles size={14} /> AI Live Notes
                  {!isRec && <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: '#475569' }}>Auto-generating...</span>}
                </div>
                {AI_NOTES.slice(0, notes).map((n, i) => (
                  <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)', fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: 8 }}>{n}</div>
                ))}
                {!isRec && notes < AI_NOTES.length && (
                  <div style={{ display: 'flex', gap: 4, padding: '8px 12px' }}>
                    {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }} />)}
                  </div>
                )}
                {isRec && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#A78BFA', marginBottom: 8 }}>Practice Questions</div>
                    {['Explain self-attention vs cross-attention.', 'Why do Transformers outperform RNNs on long sequences?', 'Describe Q, K, V matrices.'].map((q, i) => (
                      <div key={i} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.15)', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: 6 }}>Q{i + 1}: {q}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {panel === 'chat' && (
              <>
                <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {msgs.map(m => (
                    <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: m.isAI ? '#A78BFA' : m.user === 'You' ? '#10B981' : '#64748B' }}>{m.user}</span>
                        <span style={{ fontSize: '0.62rem', color: '#334155' }}>{m.time}</span>
                      </div>
                      <div style={{ padding: '8px 10px', borderRadius: 8, background: m.isAI ? 'rgba(124,58,237,0.1)' : m.user === 'You' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)', border: '1px solid ' + (m.isAI ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)'), fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5 }}>{m.text}</div>
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>
                <div style={{ padding: 10, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 8, flexShrink: 0 }}>
                  <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={t('live.chatPlaceholder')} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', fontSize: '0.8rem', outline: 'none' }} />
                  <button onClick={send} style={{ padding: '8px 12px', borderRadius: 8, background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={14} color="#fff" /></button>
                </div>
              </>
            )}

            {panel === 'people' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#A78BFA', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}><Users size={14} /> 347 Attendees - AI Tracking active</div>
                {['Aarav Sharma', 'Priya Patel', 'Rahul Kumar', 'John Davis', 'Ananya Singh', 'Vikram Nair', 'Sneha Reddy', 'Arjun Mehta'].map((name, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'hsl(' + (i * 40 + 200) + ',60%,35%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>{name}</div>
                      <div style={{ fontSize: '0.68rem', color: '#475569' }}>Student</div>
                    </div>
                    <CheckCircle size={13} color="#10B981" />
                  </div>
                ))}
              </div>
            )}

            {panel === 'poll' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#A78BFA', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 7 }}><BarChart2 size={14} /> Live Poll</div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginBottom: 14, lineHeight: 1.5 }}>Which Transformer component do you find most challenging?</div>
                {POLL_OPTS.map(opt => {
                  const v = opt.votes + (voted === opt.id ? 1 : 0);
                  const pct = Math.round((v / tv) * 100);
                  return (
                    <button key={opt.id} onClick={() => !voted && setVoted(opt.id)} disabled={!!voted} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: voted === opt.id ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)', border: '1px solid ' + (voted === opt.id ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'), cursor: voted ? 'default' : 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden', marginBottom: 8 }}>
                      {voted && <div style={{ position: 'absolute', inset: 0, left: 0, width: pct + '%', background: 'rgba(124,58,237,0.12)', transition: 'width 0.5s ease' }} />}
                      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>{opt.text}</span>
                        {voted && <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A78BFA' }}>{pct}%</span>}
                      </div>
                    </button>
                  );
                })}
                {!voted && <p style={{ fontSize: '0.72rem', color: '#475569', marginTop: 8 }}>Click an option to vote</p>}
                {voted && <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.78rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={13} /> Vote submitted! Total: {tv} votes</div>}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes lp{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}`}</style>
    </div>
  );
};