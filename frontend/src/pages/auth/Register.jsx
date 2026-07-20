import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Eye, EyeOff, Mail, Lock, Phone, User, Calendar, MapPin,
  ArrowRight, Heart, ShieldCheck, Activity, CheckCircle2
} from 'lucide-react';
import BackButton from '../../components/BackButton';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    password: '', confirmPassword: '',
    phone: '', dateOfBirth: '', gender: '', address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // multi-step: 1 = account, 2 = profile

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone?.trim() || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        gender: formData.gender || undefined,
        address: formData.address?.trim() || undefined,
      };
      const result = await register(userData);
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/patient/dashboard');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Left branded panel ── */}
      <div style={{
        flex: '0 0 40%',
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
        {/* Blobs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

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
            borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem',
          }}>
            <ShieldCheck size={14} color="#6ee7b7" />
            <span style={{ color: '#6ee7b7', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Free to Join
            </span>
          </div>

          <h1 style={{ color: '#fff', fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Start your<br />
            <span style={{ color: '#6ee7b7' }}>health journey.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '320px' }}>
            Create your patient account in under 2 minutes and get instant access to your care team.
          </p>

          {/* Progress stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
            {['Account Setup', 'Your Profile'].map((label, i) => {
              const idx = i + 1;
              const done = step > idx;
              const active = step === idx;
              return (
                <React.Fragment key={label}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: done ? '#6ee7b7' : active ? 'rgba(110,231,183,0.2)' : 'rgba(255,255,255,0.1)',
                      border: done ? 'none' : active ? '2px solid #6ee7b7' : '2px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}>
                      {done
                        ? <CheckCircle2 size={18} color="#0a3d35" />
                        : <span style={{ color: active ? '#6ee7b7' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 700 }}>{idx}</span>
                      }
                    </div>
                    <span style={{ color: active ? '#fff' : done ? '#6ee7b7' : 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 600 }}>
                      {label}
                    </span>
                  </div>
                  {i < 1 && <div style={{ flex: 1, height: '2px', background: step > 1 ? '#6ee7b7' : 'rgba(255,255,255,0.15)', borderRadius: '1px', transition: 'background 0.4s' }} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: <Activity size={15} color="#6ee7b7" />, text: 'AI-powered triage & symptom checker' },
            { icon: <ShieldCheck size={15} color="#6ee7b7" />, text: '100% private & HIPAA compliant' },
            { icon: <Heart size={15} color="#6ee7b7" />, text: 'Instant access to specialists' },
          ].map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '11px 14px',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}>
              {f.icon}
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem' }}>{f.text}</span>
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
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '460px' }}>

          <BackButton variant="inline" customClass="mb-4" />

          {/* Heading */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0a3d35', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
              {step === 1 ? 'Create your account' : 'Complete your profile'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              {step === 1 ? 'Step 1 of 2 — account credentials' : 'Step 2 of 2 — optional details'}
            </p>
          </div>

          {/* Form card */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '2.25rem',
            boxShadow: '0 4px 40px rgba(10,61,53,0.08)',
            border: '1px solid rgba(10,61,53,0.06)',
          }}>

            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label htmlFor="firstName" style={labelStyle}>First Name *</label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input
                        id="firstName" name="firstName" type="text" required
                        placeholder="First name"
                        value={formData.firstName} onChange={handleChange}
                        style={{ ...inputStyle, paddingLeft: '36px', fontSize: '0.88rem' }}
                        onFocus={e => e.target.style.borderColor = '#0a7b68'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" style={labelStyle}>Last Name *</label>
                    <input
                      id="lastName" name="lastName" type="text" required
                      placeholder="Last name"
                      value={formData.lastName} onChange={handleChange}
                      style={{ ...inputStyle, fontSize: '0.88rem' }}
                      onFocus={e => e.target.style.borderColor = '#0a7b68'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={labelStyle}>Email Address *</label>
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
                  <label htmlFor="password" style={labelStyle}>Password *</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={17} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                      id="password" name="password" type={showPassword ? 'text' : 'password'}
                      required placeholder="Create a password (min 6 chars)"
                      value={formData.password} onChange={handleChange} minLength={6}
                      style={{ ...inputStyle, paddingLeft: '42px', paddingRight: '44px' }}
                      onFocus={e => e.target.style.borderColor = '#0a7b68'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: '4px' }}>
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {/* Password strength bar */}
                  {formData.password && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: '2px', transition: 'width 0.3s, background 0.3s',
                          width: formData.password.length >= 10 ? '100%' : formData.password.length >= 6 ? '60%' : '30%',
                          background: formData.password.length >= 10 ? '#10b981' : formData.password.length >= 6 ? '#f59e0b' : '#ef4444',
                        }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                        {formData.password.length >= 10 ? '✓ Strong password' : formData.password.length >= 6 ? '⚠ Moderate — add more characters' : '✗ Too short'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password *</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={17} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                      id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'}
                      required placeholder="Repeat your password"
                      value={formData.confirmPassword} onChange={handleChange} minLength={6}
                      style={{
                        ...inputStyle, paddingLeft: '42px', paddingRight: '44px',
                        borderColor: formData.confirmPassword
                          ? formData.confirmPassword === formData.password ? '#10b981' : '#ef4444'
                          : '#e2e8f0',
                      }}
                      onFocus={e => e.target.style.borderColor = '#0a7b68'}
                      onBlur={e => {
                        e.target.style.borderColor = formData.confirmPassword
                          ? formData.confirmPassword === formData.password ? '#10b981' : '#ef4444'
                          : '#e2e8f0';
                      }}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: '4px' }}>
                      {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    ...submitBtnStyle,
                    marginTop: '0.5rem',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.92'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Continue to Profile <ArrowRight size={18} />
                </button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Phone */}
                <div>
                  <label htmlFor="phone" style={labelStyle}>Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={17} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="Phone number (optional)"
                      value={formData.phone} onChange={handleChange}
                      style={{ ...inputStyle, paddingLeft: '42px' }}
                      onFocus={e => e.target.style.borderColor = '#0a7b68'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                {/* DOB + Gender */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label htmlFor="dateOfBirth" style={labelStyle}>Date of Birth</label>
                    <div style={{ position: 'relative' }}>
                      <Calendar size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input
                        id="dateOfBirth" name="dateOfBirth" type="date"
                        value={formData.dateOfBirth} onChange={handleChange}
                        style={{ ...inputStyle, paddingLeft: '36px', fontSize: '0.88rem' }}
                        onFocus={e => e.target.style.borderColor = '#0a7b68'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="gender" style={labelStyle}>Gender</label>
                    <select
                      id="gender" name="gender"
                      value={formData.gender} onChange={handleChange}
                      style={{ ...inputStyle, fontSize: '0.88rem', cursor: 'pointer', color: formData.gender ? '#0f172a' : '#94a3b8' }}
                      onFocus={e => e.target.style.borderColor = '#0a7b68'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" style={labelStyle}>Address</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={17} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '14px', pointerEvents: 'none' }} />
                    <textarea
                      id="address" name="address" rows={3}
                      placeholder="Your address (optional)"
                      value={formData.address} onChange={handleChange}
                      style={{ ...inputStyle, paddingLeft: '42px', resize: 'none', lineHeight: 1.6 }}
                      onFocus={e => e.target.style.borderColor = '#0a7b68'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: '0 0 auto',
                      padding: '13px 20px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '14px',
                      background: 'transparent',
                      color: '#64748b',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#0a3d35'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit" disabled={loading}
                    style={{ ...submitBtnStyle, flex: 1 }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.92'; }}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    onMouseDown={e => { if (!loading) e.currentTarget.style.transform = 'scale(0.98)'; }}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {loading ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        Registering...
                      </>
                    ) : (
                      <>Create Account <ArrowRight size={18} /></>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Divider + Login link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '1.5rem 0 1.25rem' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Already registered?
              </span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            <Link
              to="/login"
              style={{
                display: 'block', textAlign: 'center', padding: '13px',
                border: '2px solid #0a3d35', borderRadius: '14px',
                color: '#0a3d35', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a3d35'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a3d35'; }}
            >
              Sign in to existing account
            </Link>
          </div>

          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem', marginTop: '1.5rem', lineHeight: 1.6 }}>
            By registering you agree to our{' '}
            <span style={{ color: '#0a7b68', cursor: 'pointer', fontWeight: 600 }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: '#0a7b68', cursor: 'pointer', fontWeight: 600 }}>Privacy Policy</span>.
          </p>
        </div>
      </div>

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

const submitBtnStyle = {
  width: '100%',
  padding: '14px',
  background: 'linear-gradient(135deg, #0a3d35 0%, #0a7b68 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '14px',
  fontSize: '1rem',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  transition: 'opacity 0.2s, transform 0.1s',
  boxShadow: '0 4px 20px rgba(10,61,53,0.3)',
};

export default Register;
