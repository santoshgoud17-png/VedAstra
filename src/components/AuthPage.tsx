import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Mail, Lock, User, Phone, Image, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

type AuthTab = 'signin' | 'signup' | 'forgot' | 'verify' | 'reset';

export const AuthPage: React.FC = () => {
  const { login, register, verifyEmail, requestPasswordReset, resetPassword, socialLogin, showToast, setCurrentView } = useApp();

  const [tab, setTab] = useState<AuthTab>('signin');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'educator' | 'recruiter'>('student');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Verification & reset code states
  const [verificationCode, setVerificationCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  // Password strength check
  const checkPasswordStrength = (pass: string) => {
    const checks = {
      length: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass),
    };
    return checks;
  };

  const strength = checkPasswordStrength(password);
  const isPasswordStrong = Object.values(strength).every(Boolean);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      if (err.message === 'Email Not Verified') {
        setTab('verify');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (!isPasswordStrong) {
      showToast('Please meet all password strength requirements', 'error');
      return;
    }

    setLoading(true);
    try {
      await register({
        name,
        email,
        role,
        profilePicture: avatarUrl || undefined,
        phoneNumber: phone || undefined,
      }, password);
      setTab('verify');
    } catch {
      // Handled by register context method toast
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      showToast('Please enter the verification code', 'error');
      return;
    }
    setLoading(true);
    try {
      await verifyEmail(email || resetEmail, verificationCode);
    } catch {
      // Handled by verifyEmail context toast
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter your email', 'error');
      return;
    }
    setLoading(true);
    try {
      setResetEmail(email);
      await requestPasswordReset(email);
      setTab('reset');
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetToken.trim() || !password.trim() || !confirmPassword.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (!isPasswordStrong) {
      showToast('Please choose a stronger password', 'error');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(resetEmail, resetToken, password);
      setTab('signin');
      setPassword('');
      setConfirmPassword('');
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = async (provider: string) => {
    setLoading(true);
    try {
      await socialLogin(provider);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', top: '10%', left: '5%', zIndex: 0 }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)', bottom: '10%', right: '5%', zIndex: 0 }} />

      <div className="auth-glass-panel animate-fade-in">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="auth-logo-wrap" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('landing')}>
            <Sparkles size={22} color="white" />
          </div>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
            {tab === 'signin' && 'Welcome to VedAstra'}
            {tab === 'signup' && 'Create Account'}
            {tab === 'forgot' && 'Reset Password'}
            {tab === 'verify' && 'Verify Email'}
            {tab === 'reset' && 'Set New Password'}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>
            {tab === 'signin' && 'Sign in to access your AI Learning Dashboard'}
            {tab === 'signup' && 'Get started with your personalized learning journey'}
            {tab === 'forgot' && "Enter your email and we'll send you a reset code"}
            {tab === 'verify' && `We've sent a 6-digit code to ${email || resetEmail}`}
            {tab === 'reset' && 'Enter the reset code sent to your email and your new password'}
          </p>
        </div>

        {/* Form Container */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Mail size={16} /></span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, width: '100%', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, paddingRight: 40, width: '100%', boxSizing: 'border-box' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => setTab('forgot')}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px 0', marginTop: 8 }} disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" style={{ margin: '0 auto' }} /> : 'Sign In'}
            </button>

            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border-card)' }} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Auto-Fill</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border-card)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => { setEmail('aarav@vedaastra.ai'); setPassword('Password123!'); }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <span>🤖</span> Student: Aarav Sharma
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('meera@vedaastra.ai'); setPassword('Password123!'); }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <span>🎓</span> Educator: Dr. Meera Iyer
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('talent@microsoft.com'); setPassword('Password123!'); }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <span>💼</span> Recruiter: Microsoft Talent
                </button>
              </div>
            </div>
          </form>
        )}

        {tab === 'signup' && (
          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><User size={16} /></span>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, width: '100%', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Mail size={16} /></span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, width: '100%', boxSizing: 'border-box' }}
                required
              />
            </div>

            {/* Optional Phone Number */}
            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Phone size={16} /></span>
              <input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            {/* Optional Avatar Link */}
            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Image size={16} /></span>
              <input
                type="url"
                placeholder="Profile Image URL (Optional)"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            {/* Role Switcher */}
            <div>
              <span className="input-label" style={{ marginBottom: 6 }}>Select Account Role</span>
              <div style={{ display: 'flex', gap: 6, background: 'var(--bg-tertiary)', padding: 3, borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-card)' }}>
                {(['student', 'educator', 'recruiter'] as const).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: 'var(--border-radius-xs)',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: role === r ? 'linear-gradient(135deg, #7C3AED, #0EA5E9)' : 'transparent',
                      color: role === r ? 'white' : 'var(--text-secondary)',
                      transition: 'all 0.15s ease',
                      textTransform: 'capitalize',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, paddingRight: 40, width: '100%', boxSizing: 'border-box' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password strength details */}
            {password.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px 8px', fontSize: '0.68rem', padding: '4px 6px', background: 'var(--bg-tertiary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-card)' }}>
                <span style={{ color: strength.length ? 'var(--accent-success)' : 'var(--text-muted)' }}>{strength.length ? '✓' : '✗'} Min 8 characters</span>
                <span style={{ color: strength.upper ? 'var(--accent-success)' : 'var(--text-muted)' }}>{strength.upper ? '✓' : '✗'} 1 Uppercase letter</span>
                <span style={{ color: strength.lower ? 'var(--accent-success)' : 'var(--text-muted)' }}>{strength.lower ? '✓' : '✗'} 1 Lowercase letter</span>
                <span style={{ color: strength.number ? 'var(--accent-success)' : 'var(--text-muted)' }}>{strength.number ? '✓' : '✗'} 1 Number digit</span>
                <span style={{ color: strength.special ? 'var(--accent-success)' : 'var(--text-muted)' }}>{strength.special ? '✓' : '✗'} 1 Special char</span>
              </div>
            )}

            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></span>
              <input
                type={showConfirmPass ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, paddingRight: 40, width: '100%', boxSizing: 'border-box' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px 0', marginTop: 8 }} disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" style={{ margin: '0 auto' }} /> : 'Sign Up'}
            </button>
          </form>
        )}

        {tab === 'forgot' && (
          <form onSubmit={handleForgot} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Mail size={16} /></span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, width: '100%', boxSizing: 'border-box' }}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px 0', marginTop: 8 }} disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" style={{ margin: '0 auto' }} /> : 'Send Reset Code'}
            </button>

            <button
              type="button"
              onClick={() => setTab('signin')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, margin: '8px auto 0', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
            >
              <ArrowLeft size={14} /> Back to Sign In
            </button>
          </form>
        )}

        {tab === 'verify' && (
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></span>
              <input
                type="text"
                maxLength={6}
                placeholder="6-Digit Verification Code (e.g. 123456)"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, letterSpacing: '0.1em', textAlign: 'center', fontWeight: 700, width: '100%', boxSizing: 'border-box' }}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px 0', marginTop: 8 }} disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" style={{ margin: '0 auto' }} /> : 'Verify & Log In'}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 8 }}>
              Didn't receive code?{' '}
              <button
                type="button"
                onClick={() => showToast('Verification code resent! (Hint: use 123456)', 'info')}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
              >
                Resend Code
              </button>
            </div>
          </form>
        )}

        {tab === 'reset' && (
          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></span>
              <input
                type="text"
                placeholder="6-Character Reset Code"
                value={resetToken}
                onChange={e => setResetToken(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, textTransform: 'uppercase', fontWeight: 700, width: '100%', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="New Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, paddingRight: 40, width: '100%', boxSizing: 'border-box' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="input-group" style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></span>
              <input
                type={showConfirmPass ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 42, paddingRight: 40, width: '100%', boxSizing: 'border-box' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px 0', marginTop: 8 }} disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" style={{ margin: '0 auto' }} /> : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Social Logins (Google, GitHub, Microsoft, LinkedIn) */}
        {(tab === 'signin' || tab === 'signup') && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-card)' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-card)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              <button type="button" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => handleSocialClick('Google')}>
                <span>🌐</span> Google
              </button>
              <button type="button" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => handleSocialClick('GitHub')}>
                <span>🐙</span> GitHub
              </button>
              <button type="button" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => handleSocialClick('Microsoft')}>
                <span>🪟</span> Microsoft
              </button>
              <button type="button" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => handleSocialClick('LinkedIn')}>
                <span>🔗</span> LinkedIn
              </button>
            </div>
          </div>
        )}

        {/* Tab Swappers */}
        <div style={{ borderTop: '1px solid var(--border-card)', marginTop: 24, paddingTop: 18, textAlign: 'center', fontSize: '0.8rem' }}>
          {tab === 'signin' && (
            <span style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button
                onClick={() => setTab('signup')}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
              >
                Sign Up
              </button>
            </span>
          )}
          {tab === 'signup' && (
            <span style={{ color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <button
                onClick={() => setTab('signin')}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
