import React, { useState } from 'react';
import {
  Activity, Thermometer, Heart, Wind, Droplets,
  AlertTriangle, CheckCircle, ShieldAlert, Zap,
  Loader, RotateCcw, Stethoscope, Building2, Info,
  User, Phone, Clock, Calendar, ChevronRight, ChevronLeft,
  ClipboardList
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

// ─── Symptom suggestions ──────────────────────────────────────────────────────
const SYMPTOM_SUGGESTIONS = [
  'Fever', 'Cough', 'Headache', 'Chest pain', 'Shortness of breath',
  'Nausea', 'Vomiting', 'Abdominal pain', 'Dizziness', 'Fatigue',
  'Back pain', 'Joint pain', 'Sore throat', 'Rash', 'Swelling',
  'Blurred vision', 'Numbness', 'Palpitations', 'Loss of appetite',
  'Diarrhea', 'Constipation', 'Muscle weakness', 'Seizure', 'Fainting',
  'Difficulty walking', 'High blood pressure', 'Low blood pressure',
  'Rapid breathing', 'Confusion', 'Loss of consciousness'
];

// ─── Urgency display config ───────────────────────────────────────────────────
const URGENCY_CONFIG = {
  HIGH: {
    label: 'HIGH — EMERGENCY',
    bg: 'bg-red-50', border: 'border-red-400 border-2',
    text: 'text-red-700', badge: 'bg-red-600 text-white',
    icon: ShieldAlert, barColor: 'bg-red-500',
    action: 'Rush to Emergency Department IMMEDIATELY',
    pulseDot: true
  },
  MEDIUM: {
    label: 'MEDIUM — URGENT',
    bg: 'bg-amber-50', border: 'border-amber-300 border-2',
    text: 'text-amber-700', badge: 'bg-amber-500 text-white',
    icon: AlertTriangle, barColor: 'bg-amber-500',
    action: 'Consult a specialist within the next few hours',
    pulseDot: false
  },
  LOW: {
    label: 'LOW — STABLE',
    bg: 'bg-emerald-50', border: 'border-emerald-300 border-2',
    text: 'text-emerald-700', badge: 'bg-emerald-600 text-white',
    icon: CheckCircle, barColor: 'bg-emerald-500',
    action: 'Register for General OPD queue',
    pulseDot: false
  }
};

const PROB_COLOR = {
  HIGH: 'bg-red-100 text-red-700',
  MEDIUM: 'bg-amber-100 text-amber-700',
  LOW: 'bg-emerald-100 text-emerald-700'
};

// ─── Risk Score Ring ──────────────────────────────────────────────────────────
const RiskRing = ({ score, urgency }) => {
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = urgency === 'HIGH' ? '#ef4444' : urgency === 'MEDIUM' ? '#f59e0b' : '#10b981';
  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle cx="60" cy="60" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.4s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-brand-dark">{score}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Score</span>
      </div>
    </div>
  );
};

// ─── Step indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ current }) => {
  const steps = ['Patient Info', 'Symptoms', 'Vitals', 'Result'];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => {
        const idx = i + 1;
        const done = current > idx;
        const active = current === idx;
        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${done ? 'bg-brand-teal text-white' : active ? 'bg-brand-dark text-white scale-110 shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
                {done ? '✓' : idx}
              </div>
              <span className={`text-xs mt-1 font-semibold whitespace-nowrap ${active ? 'text-brand-dark' : 'text-slate-400'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-12 mb-5 transition-all duration-500 ${done ? 'bg-brand-teal' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Main Component — PatientIntakeForm (used by Receptionist / Super Admin)
// ═══════════════════════════════════════════════════════════════════════════════
const PatientIntakeForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [symptomInput, setSymptomInput] = useState('');

  const [form, setForm] = useState({
    // Patient identity (entered by receptionist)
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientPhone: '',
    // Clinical data
    symptoms: [],
    vitals: {
      bloodPressure: '',
      temperature: '',
      heartRate: '',
      oxygenSaturation: '',
      respiratoryRate: ''
    },
    painLevel: 5,
    duration: '',
    medicalHistory: ''
  });

  // ── Symptom management ─────────────────────────────────────────────────────
  const addSymptom = (s) => {
    const t = s.trim();
    if (!t || form.symptoms.includes(t)) return;
    setForm(f => ({ ...f, symptoms: [...f.symptoms, t] }));
    setSymptomInput('');
  };
  const removeSymptom = (s) => setForm(f => ({ ...f, symptoms: f.symptoms.filter(x => x !== s) }));

  const updateVital = (field, val) => setForm(f => ({ ...f, vitals: { ...f.vitals, [field]: val } }));

  // ── Validate step 1 ────────────────────────────────────────────────────────
  const validateStep1 = () => {
    if (!form.patientName.trim()) { toast.error('Patient name is required'); return false; }
    if (!form.patientAge || isNaN(form.patientAge)) { toast.error('Valid patient age is required'); return false; }
    return true;
  };

  // ── Submit to AI ───────────────────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (form.symptoms.length === 0) { toast.error('Add at least one symptom'); return; }
    setLoading(true);
    try {
      const payload = {
        symptoms: form.symptoms,
        painLevel: form.painLevel,
        vitals: {
          bloodPressure: form.vitals.bloodPressure || undefined,
          temperature: form.vitals.temperature ? parseFloat(form.vitals.temperature) : undefined,
          heartRate: form.vitals.heartRate ? parseInt(form.vitals.heartRate) : undefined,
          oxygenSaturation: form.vitals.oxygenSaturation ? parseInt(form.vitals.oxygenSaturation) : undefined,
          respiratoryRate: form.vitals.respiratoryRate ? parseInt(form.vitals.respiratoryRate) : undefined
        },
        additionalInfo: {
          age: parseInt(form.patientAge),
          gender: form.patientGender,
          duration: form.duration,
          medicalHistory: form.medicalHistory,
          // Store patient identity in additionalInfo for the triage record
          patientName: form.patientName,
          patientPhone: form.patientPhone
        }
      };

      const res = await api.post('/symptom-check/analyze', payload);
      if (res.data.success) {
        setResult(res.data.data);
        setStep(4);
        toast.success('Triage assessment complete!');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1); setResult(null); setSymptomInput('');
    setForm({
      patientName: '', patientAge: '', patientGender: '', patientPhone: '',
      symptoms: [],
      vitals: { bloodPressure: '', temperature: '', heartRate: '', oxygenSaturation: '', respiratoryRate: '' },
      painLevel: 5, duration: '', medicalHistory: ''
    });
  };

  const cfg = result ? URGENCY_CONFIG[result.analysis.urgencyLevel] : null;
  const UrgIcon = cfg?.icon;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2">
            <ShieldAlert className="w-3 h-3" /> Emergency Triage Tool
          </div>
          <h1 className="text-3xl font-black text-brand-dark font-display">Patient Intake & AI Triage</h1>
          <p className="text-slate-500 mt-1">
            For walk-in patients — fill this on behalf of the patient for instant AI-powered urgency assessment
          </p>
        </div>
        {result && (
          <button onClick={handleReset} id="new-triage-btn"
            className="btn btn-secondary flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> New Patient
          </button>
        )}
      </div>

      {/* Important notice banner */}
      {step < 4 && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-800">Receptionist / Admin: Fill this form for walk-in patients</p>
            <p className="text-xs text-blue-600 mt-0.5">
              Measure the patient's vitals at the front desk, ask about symptoms, then submit for instant AI triage assessment. The result will appear on the Doctor's Triage Queue automatically.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <StepIndicator current={step} />

        {/* ── STEP 1: Patient Identity ─────────────────────────────────────── */}
        {step === 1 && (
          <div className="card space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-100 rounded-xl">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-dark">Patient Information</h2>
                <p className="text-sm text-slate-500">Basic details of the arriving patient</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label" htmlFor="patient-name">Patient Full Name <span className="text-red-500">*</span></label>
                <input id="patient-name" type="text" className="input" placeholder="e.g. Rahul Kumar"
                  value={form.patientName}
                  onChange={e => setForm(f => ({ ...f, patientName: e.target.value }))} />
              </div>

              <div>
                <label className="label" htmlFor="patient-age">Age <span className="text-red-500">*</span></label>
                <input id="patient-age" type="number" className="input" placeholder="e.g. 45"
                  value={form.patientAge}
                  onChange={e => setForm(f => ({ ...f, patientAge: e.target.value }))} />
              </div>

              <div>
                <label className="label" htmlFor="patient-gender">Gender</label>
                <select id="patient-gender" className="input bg-white"
                  value={form.patientGender}
                  onChange={e => setForm(f => ({ ...f, patientGender: e.target.value }))}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="label" htmlFor="patient-phone">Contact / Emergency Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="patient-phone" type="tel" className="input pl-10" placeholder="+91 98765 43210"
                    value={form.patientPhone}
                    onChange={e => setForm(f => ({ ...f, patientPhone: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="duration-input">Symptom Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="duration-input" type="text" className="input pl-10" placeholder="e.g. 2 hours, since morning"
                    value={form.duration}
                    onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="history-input">Known Medical History</label>
                <input id="history-input" type="text" className="input" placeholder="e.g. Diabetes, Hypertension"
                  value={form.medicalHistory}
                  onChange={e => setForm(f => ({ ...f, medicalHistory: e.target.value }))} />
              </div>
            </div>

            <button id="next-step-1" onClick={() => { if (validateStep1()) setStep(2); }}
              className="btn btn-primary w-full flex items-center justify-center gap-2 py-3.5">
              Next: Record Symptoms <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── STEP 2: Symptoms & Pain ──────────────────────────────────────── */}
        {step === 2 && (
          <div className="card space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-100 rounded-xl">
                <Stethoscope className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-dark">Symptoms</h2>
                <p className="text-sm text-slate-500">Ask the patient what they are experiencing</p>
              </div>
            </div>

            {/* Symptom Input */}
            <div className="relative">
              <input id="symptom-input" type="text" className="input pr-24"
                placeholder="Type symptom and press Enter..."
                value={symptomInput}
                onChange={e => setSymptomInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSymptom(symptomInput); } }} />
              <button onClick={() => addSymptom(symptomInput)}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-teal text-xs py-1.5 px-3">
                Add
              </button>
            </div>

            {/* Tags */}
            {form.symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.symptoms.map(s => (
                  <span key={s} className="inline-flex items-center gap-1.5 bg-brand-dark text-white text-sm font-medium px-3 py-1.5 rounded-full">
                    {s}
                    <button onClick={() => removeSymptom(s)} className="hover:text-red-300 font-bold">×</button>
                  </span>
                ))}
              </div>
            )}

            {/* Quick suggestions */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Common Symptoms</p>
              <div className="flex flex-wrap gap-2">
                {SYMPTOM_SUGGESTIONS.filter(s => !form.symptoms.includes(s)).map(s => (
                  <button key={s} onClick={() => addSymptom(s)}
                    className="text-xs bg-slate-100 hover:bg-brand-dark hover:text-white text-slate-600 px-3 py-1.5 rounded-full font-medium transition-all duration-200">
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pain Level */}
            <div>
              <label className="label">
                Pain Level (Patient-reported):
                <span className={`ml-2 text-lg font-black ${form.painLevel >= 8 ? 'text-red-600' : form.painLevel >= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {form.painLevel}/10
                </span>
              </label>
              <input id="pain-slider" type="range" min="0" max="10" step="1"
                value={form.painLevel}
                onChange={e => setForm(f => ({ ...f, painLevel: parseInt(e.target.value) }))}
                className="w-full h-3 mt-2 bg-gradient-to-r from-emerald-300 via-amber-300 to-red-400 rounded-full appearance-none cursor-pointer accent-brand-dark" />
              <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                <span>0 — No pain</span><span>5 — Moderate</span><span>10 — Severe</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn btn-secondary flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button id="next-step-2" onClick={() => { if (form.symptoms.length === 0) { toast.error('Add at least one symptom'); return; } setStep(3); }}
                className="btn btn-primary flex-1 flex items-center justify-center gap-2 py-3.5">
                Next: Measure Vitals <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Vitals ───────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="card space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 rounded-xl">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-dark">Measure Vitals</h2>
                <p className="text-sm text-slate-500">Use front-desk equipment to record vitals. All optional but recommended.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'bp', icon: Heart, label: 'Blood Pressure', placeholder: 'e.g. 130/85', field: 'bloodPressure', unit: 'mmHg', color: 'text-red-500', ref: 'Sphygmomanometer' },
                { id: 'temp', icon: Thermometer, label: 'Temperature', placeholder: 'e.g. 101.4', field: 'temperature', unit: '°F', color: 'text-orange-500', ref: 'Thermometer' },
                { id: 'hr', icon: Activity, label: 'Heart Rate / Pulse', placeholder: 'e.g. 98', field: 'heartRate', unit: 'bpm', color: 'text-pink-500', ref: 'Pulse oximeter' },
                { id: 'spo2', icon: Droplets, label: 'Oxygen Saturation', placeholder: 'e.g. 94', field: 'oxygenSaturation', unit: '%', color: 'text-blue-500', ref: 'Pulse oximeter' },
                { id: 'rr', icon: Wind, label: 'Respiratory Rate', placeholder: 'e.g. 22', field: 'respiratoryRate', unit: 'breaths/min', color: 'text-teal-500', ref: 'Observe for 60s' },
              ].map(({ id, icon: Icon, label, placeholder, field, unit, color, ref }) => (
                <div key={field}>
                  <label className="label flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${color}`} /> {label}
                    <span className="text-xs text-slate-400 font-normal ml-auto">{unit}</span>
                  </label>
                  <input id={id} type="text" className="input" placeholder={placeholder}
                    value={form.vitals[field]}
                    onChange={e => updateVital(field, e.target.value)} />
                  <p className="text-[10px] text-slate-400 mt-1 ml-1">📋 {ref}</p>
                </div>
              ))}
            </div>

            {/* Confirmation summary */}
            <div className="bg-brand-dark/5 rounded-2xl p-4 border border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ready to submit for: <span className="text-brand-dark ml-1">{form.patientName}</span> — Age {form.patientAge}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.symptoms.map(s => (
                  <span key={s} className="text-xs bg-brand-dark text-white px-2.5 py-1 rounded-full">{s}</span>
                ))}
              </div>
              <p className="text-sm text-slate-600">Pain Level: <span className="font-bold">{form.painLevel}/10</span></p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn btn-secondary flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button id="submit-triage-btn" onClick={handleAnalyze} disabled={loading}
                className="btn flex-1 flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all disabled:opacity-50">
                {loading
                  ? <><Loader className="w-4 h-4 animate-spin" /> Analyzing with AI...</>
                  : <><ShieldAlert className="w-4 h-4" /> Run AI Triage Assessment</>
                }
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Result ───────────────────────────────────────────────── */}
        {step === 4 && result && cfg && (
          <div className="space-y-4">
            {/* Big urgency result */}
            <div className={`card ${cfg.bg} ${cfg.border} relative overflow-hidden`}>
              {cfg.pulseDot && (
                <div className="absolute top-4 right-4">
                  <span className="flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600"></span>
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <RiskRing score={result.analysis.riskScore} urgency={result.analysis.urgencyLevel} />
                <div className="text-center sm:text-left flex-1">
                  {/* Patient name */}
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Patient</p>
                  <p className="text-xl font-black text-brand-dark mb-3">{form.patientName}, {form.patientAge}y</p>

                  <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black ${cfg.badge} mb-3`}>
                    <UrgIcon className="w-4 h-4" /> {cfg.label}
                  </span>
                  <p className={`font-semibold ${cfg.text} text-sm`}>{result.analysis.urgencyReason}</p>
                </div>
              </div>
            </div>

            {/* Recommended action banner */}
            <div className="card bg-gradient-to-r from-brand-dark to-[#0d4a3e] text-white flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl shrink-0">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-teal-200 text-xs font-bold uppercase tracking-widest">Send Patient To</p>
                <h3 className="text-2xl font-black">{result.analysis.recommendedDepartment}</h3>
                <p className="text-teal-100 text-sm">{cfg.action}</p>
              </div>
            </div>

            {/* Possible conditions */}
            <div className="card">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Stethoscope className="w-4 h-4" /> Possible Conditions (AI Assessment)
              </h3>
              <div className="space-y-2.5">
                {result.analysis.possibleConditions?.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-lg font-black text-slate-300 w-6">#{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-brand-dark">{c.name}</p>
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${PROB_COLOR[c.probability]}`}>
                          {c.probability}
                        </span>
                      </div>
                      {c.description && <p className="text-xs text-slate-500 mt-0.5">{c.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning flags */}
            {result.analysis.warningFlags?.length > 0 && (
              <div className="card bg-red-50 border border-red-200">
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Warning Flags — Inform the Doctor
                </h3>
                <ul className="space-y-1.5">
                  {result.analysis.warningFlags.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-red-800 text-sm font-medium">
                      <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500">
                {result.analysis.disclaimer || 'This is an AI-assisted triage assessment only. Final clinical decision must be made by a qualified doctor. The patient\'s triage record has been added to the Doctor\'s Queue.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button id="new-patient-btn" onClick={handleReset}
                className="btn btn-primary flex-1 flex items-center justify-center gap-2 py-3.5">
                <User className="w-4 h-4" /> New Patient Intake
              </button>
              <a href="/doctor/triage-queue" id="view-queue-btn"
                className="btn btn-secondary flex-1 flex items-center justify-center gap-2">
                <ClipboardList className="w-4 h-4" /> View Triage Queue
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientIntakeForm;
