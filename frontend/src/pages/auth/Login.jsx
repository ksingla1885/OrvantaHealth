import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Heart, Activity } from 'lucide-react';

import BackButton from '../../components/BackButton';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Welcome back!');
        const user = JSON.parse(localStorage.getItem('user'));
        switch (user.role) {
          case 'superadmin': navigate('/dashboard'); break;
          case 'doctor': navigate('/doctor/dashboard'); break;
          case 'receptionist': navigate('/receptionist/dashboard'); break;
          case 'patient': navigate('/patient/dashboard'); break;
          default: navigate('/dashboard');
        }
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Left branded panel ── */}
      <div style={{
        flex: '0 0 45%',
        background: 'linear-gradient(145deg, #0a3d35 0%, #0e5548 40%, #0a7b68 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
        className="auth-left-panel"
      >
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-60px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px', height: '48px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              <Heart size={24} color="#6ee7b7" strokeWidth={2} />
            </div>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              OrvantaHealth
            </span>
          </div>
        </div>

        {/* Main copy */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(110,231,183,0.15)',
            border: '1px solid rgba(110,231,183,0.3)',
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '1.5rem',
          }}>
            <ShieldCheck size={14} color="#6ee7b7" />
            <span style={{ color: '#6ee7b7', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Secure Portal
            </span>
          </div>

          <h1 style={{
            color: '#fff', fontSize: '2.8rem', fontWeight: 800,
            lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1rem',
          }}>
            Your Health,<br />
            <span style={{ color: '#6ee7b7' }}>Our Priority.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '340px' }}>
            Manage appointments, access records, and collaborate with your care team — all in one place.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
            {[
              { val: '10K+', label: 'Patients' },
              { val: '500+', label: 'Doctors' },
              { val: '99.9%', label: 'Uptime' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ color: '#6ee7b7', fontSize: '1.5rem', fontWeight: 800 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { icon: <Activity size={16} color="#6ee7b7" />, text: 'Real-time health monitoring & AI triage' },
            { icon: <ShieldCheck size={16} color="#6ee7b7" />, text: 'HIPAA-compliant & end-to-end encrypted' },
          ].map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '12px 16px',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}>
              {f.icon}
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div style={{
        flex: 1,
        background: '#f8fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          <BackButton variant="inline" customClass="mb-4" />

          {/* Heading */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '2rem', fontWeight: 800, color: '#0a3d35',
              letterSpacing: '-0.03em', marginBottom: '0.5rem',
            }}>
              Welcome back
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Sign in to your OrvantaHealth account
            </p>
          </div>

          {/* Form card */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 4px 40px rgba(10,61,53,0.08)',
            border: '1px solid rgba(10,61,53,0.06)',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Email */}
              <div>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={17} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    id="email" name="email" type="email" autoComplete="email" required
                    placeholder="name@company.com"
                    value={formData.email} onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft: '42px' }}
                    onFocus={e => e.target.style.borderColor = '#0a7b68'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={17} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    id="password" name="password" type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password" required
                    placeholder="••••••••"
                    value={formData.password} onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft: '42px', paddingRight: '44px' }}
                    onFocus={e => e.target.style.borderColor = '#0a7b68'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#94a3b8', display: 'flex', padding: '4px',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    id="remember-me" name="remember-me" type="checkbox"
                    style={{ accentColor: '#0a7b68', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>Keep me signed in</span>
                </label>
                <button
                  type="button"
                  onClick={() => toast.error('Forgot password not implemented yet')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0a7b68', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: loading ? '#64748b' : 'linear-gradient(135deg, #0a3d35 0%, #0a7b68 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginTop: '0.5rem',
                  transition: 'opacity 0.2s, transform 0.1s',
                  boxShadow: '0 4px 20px rgba(10,61,53,0.3)',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.92'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                onMouseDown={e => { if (!loading) e.currentTarget.style.transform = 'scale(0.98)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {loading ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>Sign in <ArrowRight size={18} /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '1.75rem 0 1.25rem' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                New here?
              </span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            <Link
              to="/register"
              style={{
                display: 'block', textAlign: 'center',
                padding: '13px',
                border: '2px solid #0a3d35',
                borderRadius: '14px',
                color: '#0a3d35',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a3d35'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a3d35'; }}
            >
              Create a new account
            </Link>
          </div>


        </div>
      </div>

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .auth-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  border: '1.5px solid #e2e8f0',
  borderRadius: '12px',
  fontSize: '0.95rem',
  color: '#0f172a',
  background: '#f8fafb',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 700,
  color: '#374151',
  marginBottom: '6px',
  letterSpacing: '0.01em',
};

export default Login;
