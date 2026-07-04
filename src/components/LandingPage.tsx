import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TESTIMONIALS } from '../demoData';
import { Zap, ChevronRight, Brain, BarChart2, Target, Users, Award, Star, CheckCircle, ArrowRight, Play } from 'lucide-react';

const AnimCounter: React.FC<{ value: number; suffix?: string; prefix?: string }> = ({ value, suffix = '', prefix = '' }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
};

const FEATURES = [
  { icon: Brain, title: 'AI Personal Mentor', desc: 'Your 24/7 AI tutor understands your learning style and adapts every explanation in real-time.', color: '#7C3AED', emoji: '🧠' },
  { icon: BarChart2, title: 'Adaptive Skill Graph', desc: 'Interactive radar charts track your competency across 20+ skill dimensions with AI precision.', color: '#0EA5E9', emoji: '📊' },
  { icon: Target, title: 'Career Prediction AI', desc: 'Know exactly which skills you need and get a step-by-step plan to land your dream job.', color: '#10B981', emoji: '🎯' },
  { icon: Users, title: 'Recruiter Connect', desc: 'Your verified skill profile is visible to 500+ top companies actively hiring from VedAstra.', color: '#F59E0B', emoji: '💼' },
  { icon: Award, title: 'AI Interview Coach', desc: 'Practice realistic coding, HR, and system design interviews with instant AI feedback.', color: '#EC4899', emoji: '🎤' },
  { icon: Zap, title: 'Video Intelligence', desc: 'Every uploaded video automatically becomes notes, flashcards, quizzes, and mind maps in seconds.', color: '#6366F1', emoji: '⚡' },
];

const PRICING_PLANS = [
  {
    name: 'Free', price: '$0', period: '/month',
    features: ['5 AI-generated lesson notes/month', 'Basic skill tracking', 'Community access', '3 mock interview sessions', 'Basic roadmap'],
    cta: 'Get Started Free', primary: false,
  },
  {
    name: 'Pro', price: '$19', period: '/month',
    tag: '🔥 Most Popular',
    features: ['Unlimited AI notes & flashcards', 'Advanced skill radar & roadmap', 'Recruiter profile visibility', 'Unlimited mock interviews', 'Career trajectory AI', 'All 8 language support', 'Priority AI tutor access'],
    cta: 'Start Pro Trial', primary: true,
  },
  {
    name: 'Enterprise', price: '$99', period: '/month',
    features: ['Everything in Pro', 'Custom branded campus', 'API access & integrations', 'Analytics dashboard', 'Dedicated AI model fine-tuning', 'SLA & priority support', 'Unlimited educator seats'],
    cta: 'Contact Sales', primary: false,
  },
];

const FAQ = [
  { q: 'How does VedAstra\'s AI personalize my learning path?', a: 'After a short diagnostic assessment, our AI maps your skill gaps, goals, and learning pace. It then dynamically adjusts course recommendations, quiz difficulty, and daily goals to maximize your progress.' },
  { q: 'Can I upload my own course content?', a: 'Yes! Any educator can upload videos, PDFs, or presentations. Our AI automatically generates notes, quizzes, flashcards, mind maps, and coding challenges from your content within minutes.' },
  { q: 'How do recruiters see my profile?', a: 'Your AI-verified skill graph, certificate portfolio, and project showcases are visible to 500+ companies on the platform. Recruiters can filter by skill, score, and learning trajectory.' },
  { q: 'Is VedAstra available in multiple languages?', a: 'Yes! The platform supports 8 languages including English, Hindi, Telugu, Tamil, Kannada, Malayalam, Spanish, and Japanese. AI tutors can explain concepts in your preferred language.' },
  { q: 'What makes the AI Interview Coach different?', a: 'Our coach simulates realistic FAANG-style interviews, analyzes your confidence, technical accuracy, and communication — then provides a detailed improvement plan with targeted practice questions.' },
];

export const LandingPage: React.FC = () => {
  const { setCurrentView, theme: _theme } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [_videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div style={{ background: 'var(--bg-primary)', overflowX: 'hidden' }}>
      {/* ═══ NAV BAR ═══ */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--glass-border)', padding: '0 clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(124,58,237,0.35)' }}>
              <Zap size={18} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>VedAstra</span>
            <span className="badge badge-purple" style={{ marginLeft: 4 }}>Beta</span>
          </div>

          {/* Nav Links (desktop) */}
          <div style={{ display: 'flex', gap: 4 }}>
            {['Features', 'Pricing', 'Testimonials', 'Educators'].map(link => (
              <button key={link} style={{ padding: '8px 14px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', borderRadius: 'var(--border-radius-sm)', transition: '0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
              >{link}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('login')}>Log In</button>
            <button className="btn btn-primary btn-sm" onClick={() => setCurrentView('student-dashboard')}>Launch Dashboard →</button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        {/* Animated Background Orbs */}
        <div className="ai-orb ai-orb-1" />
        <div className="ai-orb ai-orb-2" />
        <div className="ai-orb ai-orb-3" />

        {/* Dot grid */}
        <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Announcement chip */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 20, marginBottom: 24, animation: 'fadeInUp 0.4s ease' }}>
            <span style={{ fontSize: '0.8rem' }}>🎉</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-primary)' }}>Trusted by 1.2M+ learners across 127 countries</span>
            <ArrowRight size={13} color="var(--accent-primary)" />
          </div>

          <h1 className="display-xl" style={{ marginBottom: 20, animation: 'fadeInUp 0.5s ease 0.1s both' }}>
            Personalized AI Learning<br />
            <span className="text-gradient">For The World</span>
          </h1>

          <p className="body-lg" style={{ maxWidth: 600, margin: '0 auto 36px', animation: 'fadeInUp 0.5s ease 0.2s both' }}>
            Learn smarter. Teach globally. Get hired faster.<br />
            VedAstra's AI adapts to your pace, maps your skills, and accelerates your career.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56, animation: 'fadeInUp 0.5s ease 0.3s both' }}>
            <button className="btn btn-primary btn-primary-lg" onClick={() => setCurrentView('diagnostic')}>
              <Brain size={18} /> Start Learning Free
            </button>
            <button className="btn btn-secondary btn-primary-lg" onClick={() => setCurrentView('educator-dashboard')}>
              🎓 Become an Educator
            </button>
            <button onClick={() => setVideoPlaying(true)} className="btn btn-ghost btn-primary-lg" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={14} color="white" style={{ marginLeft: 2 }} />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Animated Stats */}
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap', background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-xl)', padding: '24px 40px', maxWidth: 700, margin: '0 auto', boxShadow: 'var(--shadow-lg)', animation: 'fadeInUp 0.5s ease 0.4s both' }}>
            {[
              { value: 1200000, suffix: '+', label: 'Active Students', prefix: '' },
              { value: 94000, suffix: '+', label: 'Educators', prefix: '' },
              { value: 127, suffix: '', label: 'Countries', prefix: '🌍 ' },
              { value: 9800000, suffix: '+', label: 'AI Notes Generated', prefix: '' },
            ].map((s, i) => (
              <div key={s.label} style={{ flex: '1 0 140px', textAlign: 'center', padding: '0 20px', borderRight: i < 3 ? '1px solid var(--border-card)' : 'none' }}>
                <div style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--accent-primary)', letterSpacing: '-0.02em' }}>
                  <AnimCounter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ padding: 'clamp(60px, 8vh, 100px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="badge badge-blue" style={{ margin: '0 auto 12px', display: 'inline-flex' }}>🤖 AI-Powered Platform</div>
            <h2 className="heading-xl">Everything You Need to</h2>
            <h2 className="heading-xl"><span className="text-gradient">Learn, Teach & Get Hired</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card" style={{ padding: '28px', animationDelay: `${i * 0.08}s` }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: `1px solid ${f.color}25` }}>
                    <Icon size={24} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: 'clamp(60px, 8vh, 100px) clamp(20px, 5vw, 80px)', background: 'var(--bg-tertiary)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge badge-amber" style={{ margin: '0 auto 12px', display: 'inline-flex' }}>⭐ Success Stories</div>
            <h2 className="heading-xl">Learners Who <span className="text-gradient-warm">Changed Their Lives</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id} className="card-flat" style={{ padding: 24, animationDelay: `${i * 0.08}s` }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} color="#F59E0B" fill="#F59E0B" />)}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, color: 'white', flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.role} @ {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section style={{ padding: 'clamp(60px, 8vh, 100px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge badge-green" style={{ margin: '0 auto 12px', display: 'inline-flex' }}>💳 Flexible Pricing</div>
            <h2 className="heading-xl">Start Free. <span className="text-gradient">Scale As You Grow.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PRICING_PLANS.map((plan, _i) => (
              <div key={plan.name} className={plan.primary ? '' : 'card-flat'} style={{ padding: '28px', border: plan.primary ? '2px solid var(--accent-primary)' : '1px solid var(--border-card)', borderRadius: 'var(--border-radius-xl)', background: plan.primary ? 'linear-gradient(145deg, rgba(124,58,237,0.06) 0%, rgba(14,165,233,0.04) 100%)' : 'var(--bg-card)', boxShadow: plan.primary ? '0 8px 32px rgba(124,58,237,0.15)' : 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
                {plan.primary && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #7C3AED, #0EA5E9)' }} />
                )}
                {plan.tag && <div className="badge badge-purple" style={{ marginBottom: 12 }}>{plan.tag}</div>}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: 8 }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.5rem', color: plan.primary ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{plan.price}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{plan.period}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <CheckCircle size={15} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button className={`btn ${plan.primary ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }} onClick={() => setCurrentView('diagnostic')}>
                  {plan.cta} {plan.primary ? <ChevronRight size={14} /> : ''}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ padding: 'clamp(40px, 6vh, 80px) clamp(20px, 5vw, 80px)', background: 'var(--bg-tertiary)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="heading-xl">Frequently Asked <span className="text-gradient">Questions</span></h2>
          </div>
          {FAQ.map((faq, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--border-radius-md)', marginBottom: 10, overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 14 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>{faq.q}</span>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0)', transition: '0.2s' }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 20px 18px', animation: 'fadeIn 0.2s ease' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section style={{ padding: 'clamp(60px, 8vh, 100px) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', background: 'linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)', borderRadius: 'var(--border-radius-xl)', padding: 'clamp(40px, 5vw, 64px)', position: 'relative', overflow: 'hidden', boxShadow: '0 16px 60px rgba(124,58,237,0.4)' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white', marginBottom: 12, letterSpacing: '-0.02em', position: 'relative' }}>
            Start Your AI Learning Journey Today
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', marginBottom: 28, position: 'relative' }}>
            Join 1.2M+ learners from 127 countries. Free forever, no credit card required.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <button className="btn btn-primary-lg" style={{ background: 'white', color: '#7C3AED', borderRadius: 'var(--border-radius-lg)', padding: '14px 32px', fontFamily: 'Outfit', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: '0.2s', display: 'inline-flex', alignItems: 'center', gap: 8 }} onClick={() => setCurrentView('diagnostic')}>
              <Brain size={18} /> Start Learning Free
            </button>
            <button className="btn btn-primary-lg" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 'var(--border-radius-lg)', padding: '14px 32px', fontFamily: 'Outfit', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: '0.2s', display: 'inline-flex', alignItems: 'center', gap: 8 }} onClick={() => setCurrentView('educator-dashboard')}>
              🎓 Become an Educator
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: 'clamp(40px, 5vh, 60px) clamp(20px, 5vw, 80px)', borderTop: '1px solid var(--border-card)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={15} color="white" /></div>
                <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>VedAstra</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>The world's first AI-adaptive learning ecosystem. Learn, teach, and get hired.</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
                {['🌍 127 countries', '⭐ 4.9/5 rating'].map(s => (
                  <span key={s} style={{ fontSize: '0.68rem', padding: '3px 8px', background: 'var(--bg-tertiary)', borderRadius: 20, color: 'var(--text-muted)' }}>{s}</span>
                ))}
              </div>
            </div>
            {[
              { title: 'Platform', links: ['Features', 'Pricing', 'Testimonials', 'Blog', 'Changelog'] },
              { title: 'Learn', links: ['Browse Courses', 'AI Tutor', 'Skill Graph', 'Certifications', 'Leaderboard'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 7, cursor: 'pointer', transition: '0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>© 2024 VedAstra AI. Built for the next billion learners.</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>🌏 Making world-class education accessible to everyone.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
