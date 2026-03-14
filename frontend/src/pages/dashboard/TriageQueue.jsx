import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldAlert, AlertTriangle, CheckCircle, Clock,
  RefreshCw, Stethoscope, Building2, Eye,
  Filter, TrendingUp, Activity, Pill, Plus, Trash2,
  FlaskConical, FileText, X, CalendarDays, DollarSign
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import BillUploadModal from '../../components/BillUploadModal';

// ─── Urgency config ────────────────────────────────────────────────────────
const URGENCY_META = {
  HIGH: {
    icon: ShieldAlert,
    bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200',
    badge: 'bg-red-600 text-white', dot: 'bg-red-500', label: 'HIGH'
  },
  MEDIUM: {
    icon: AlertTriangle,
    bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200',
    badge: 'bg-amber-500 text-white', dot: 'bg-amber-500', label: 'MEDIUM'
  },
  LOW: {
    icon: CheckCircle,
    bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200',
    badge: 'bg-emerald-600 text-white', dot: 'bg-emerald-500', label: 'LOW'
  }
};

const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-700',
  reviewed: 'bg-blue-100 text-blue-700',
  escalated: 'bg-red-100 text-red-700',
  resolved: 'bg-emerald-100 text-emerald-700'
};

const formatTime = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - d) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return d.toLocaleDateString('en-IN');
};

// ─── Summary cards ─────────────────────────────────────────────────────────
const SummaryCard = ({ label, count, icon: Icon, bg, text, onClick, active }) => (
  <button onClick={onClick}
    className={`card flex items-center gap-4 transition-all duration-200 text-left w-full
      ${active ? 'ring-2 ring-brand-dark shadow-premium-hover scale-[1.02]' : 'hover:shadow-premium-hover hover:-translate-y-0.5'}`}>
    <div className={`p-3 rounded-xl ${bg}`}>
      <Icon className={`w-6 h-6 ${text}`} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black text-brand-dark">{count}</p>
    </div>
  </button>
);

// ─── Empty medicine row ────────────────────────────────────────────────────
const emptyMed = () => ({ name: '', dosage: '', frequency: '', duration: '', instructions: '' });

// ─── Detail Modal ──────────────────────────────────────────────────────────
const DetailModal = ({ record, onClose, onStatusUpdate, userRole }) => {
  const [activeTab, setActiveTab] = useState('review');
  const [status, setStatus] = useState(record.status);
  const [notes, setNotes] = useState(record.reviewNotes || '');
  const [updating, setUpdating] = useState(false);
  const [prescribed, setPrescribed] = useState(!!record.prescription);

  const [rxForm, setRxForm] = useState({
    diagnosis: record.aiAnalysis?.possibleConditions?.[0]?.name || '',
    medicines: [emptyMed()],
    tests: [],
    advice: '',
    followUpDate: ''
  });
  const [submittingRx, setSubmittingRx] = useState(false);
  const [newTest, setNewTest] = useState('');

  const urgencyMeta = URGENCY_META[record.aiAnalysis?.urgencyLevel || 'LOW'];
  const UIcon = urgencyMeta.icon;

  const patientName = record.additionalInfo?.patientName ||
    (record.userId?.profile
      ? `${record.userId.profile.firstName || ''} ${record.userId.profile.lastName || ''}`.trim()
      : 'Anonymous Patient') || 'Anonymous Patient';

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await api.patch(`/symptom-check/${record._id}/review`, { status, reviewNotes: notes });
      toast.success(`Triage record marked as ${status}`);
      onStatusUpdate(record._id, status, notes);
      onClose();
    } catch {
      toast.error('Failed to update record');
    } finally {
      setUpdating(false);
    }
  };

  const updateMed = (idx, field, val) => setRxForm(f => ({
    ...f,
    medicines: f.medicines.map((m, i) => i === idx ? { ...m, [field]: val } : m)
  }));
  const addMed = () => setRxForm(f => ({ ...f, medicines: [...f.medicines, emptyMed()] }));
  const removeMed = (idx) => setRxForm(f => ({ ...f, medicines: f.medicines.filter((_, i) => i !== idx) }));

  const addTest = () => {
    if (!newTest.trim()) return;
    setRxForm(f => ({ ...f, tests: [...f.tests, { name: newTest.trim(), instructions: '' }] }));
    setNewTest('');
  };
  const removeTest = (idx) => setRxForm(f => ({ ...f, tests: f.tests.filter((_, i) => i !== idx) }));

  const handlePrescribe = async () => {
    if (!rxForm.diagnosis.trim()) { toast.error('Enter a diagnosis'); return; }
    const validMeds = rxForm.medicines.filter(m => m.name && m.dosage && m.frequency && m.duration);
    if (validMeds.length === 0) { toast.error('Add at least one complete medicine entry'); return; }

    setSubmittingRx(true);
    try {
      await api.post(`/symptom-check/${record._id}/prescribe`, {
        diagnosis: rxForm.diagnosis,
        medicines: validMeds,
        tests: rxForm.tests,
        advice: rxForm.advice,
        followUpDate: rxForm.followUpDate || undefined
      });
      toast.success('Prescription issued successfully!');
      setPrescribed(true);
      onStatusUpdate(record._id, 'resolved', `Prescription issued. Diagnosis: ${rxForm.diagnosis}`);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to issue prescription');
    } finally {
      setSubmittingRx(false);
    }
  };

  const canPrescribe = userRole === 'doctor' || userRole === 'superadmin';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={`p-5 rounded-t-3xl ${urgencyMeta.bg} border-b ${urgencyMeta.border} shrink-0`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${urgencyMeta.badge}`}>
              <UIcon className="w-3.5 h-3.5" /> {urgencyMeta.label} URGENCY
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50">×</button>
          </div>
          <h2 className="text-xl font-black text-brand-dark">{patientName}</h2>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
            {record.additionalInfo?.age && <span>{record.additionalInfo.age}y • {record.additionalInfo.gender || '?'}</span>}
            <span>{formatTime(record.createdAt)}</span>
            {prescribed && (
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                <Pill className="w-3 h-3" /> Prescribed
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 shrink-0">
          <button id="tab-review"
            onClick={() => setActiveTab('review')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors
              ${activeTab === 'review' ? 'border-b-2 border-brand-teal text-brand-dark' : 'text-slate-400 hover:text-slate-600'}`}>
            <Stethoscope className="w-4 h-4" /> Triage Review
          </button>
          {canPrescribe && (
            <button id="tab-prescribe"
              onClick={() => setActiveTab('prescribe')}
              className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors
                ${activeTab === 'prescribe' ? 'border-b-2 border-brand-teal text-brand-dark' : 'text-slate-400 hover:text-slate-600'}`}>
              <Pill className="w-4 h-4" /> Prescribe Medicine
              {prescribed && <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1" />}
            </button>
          )}
        </div>

        {/* Tab content — scrollable */}
        <div className="overflow-y-auto flex-1 p-5">

          {/* ── REVIEW TAB ──────────────────────────────────────────────── */}
          {activeTab === 'review' && (
            <div className="space-y-5">
              <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                <div className="text-center">
                  <p className="text-4xl font-black text-brand-dark">{record.aiAnalysis?.riskScore}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Risk Score</p>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className={`h-3 rounded-full transition-all ${
                      record.aiAnalysis?.urgencyLevel === 'HIGH' ? 'bg-red-500' :
                      record.aiAnalysis?.urgencyLevel === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} style={{ width: `${record.aiAnalysis?.riskScore}%` }} />
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{record.aiAnalysis?.urgencyReason}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Symptoms</p>
                <div className="flex flex-wrap gap-1.5">
                  {record.symptoms?.map(s => (
                    <span key={s} className="bg-brand-dark text-white text-xs px-2.5 py-1 rounded-full font-medium">{s}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 font-bold">Pain Level</p>
                  <p className="text-xl font-black text-brand-dark">{record.painLevel}/10</p>
                </div>
                {record.vitals?.temperature && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-400 font-bold">Temperature</p>
                    <p className="text-xl font-black text-brand-dark">{record.vitals.temperature}°F</p>
                  </div>
                )}
                {record.vitals?.heartRate && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-400 font-bold">Heart Rate</p>
                    <p className="text-xl font-black text-brand-dark">{record.vitals.heartRate} bpm</p>
                  </div>
                )}
                {record.vitals?.oxygenSaturation && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-400 font-bold">SpO₂</p>
                    <p className="text-xl font-black text-brand-dark">{record.vitals.oxygenSaturation}%</p>
                  </div>
                )}
                {record.vitals?.bloodPressure && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-400 font-bold">Blood Pressure</p>
                    <p className="text-xl font-black text-brand-dark">{record.vitals.bloodPressure}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5" /> Possible Conditions
                </p>
                <div className="space-y-2">
                  {record.aiAnalysis?.possibleConditions?.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-brand-dark">{c.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        c.probability === 'HIGH' ? 'bg-red-100 text-red-700' :
                        c.probability === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>{c.probability}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-dark rounded-2xl p-4 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-brand-teal shrink-0" />
                <div>
                  <p className="text-teal-300 text-xs font-bold uppercase tracking-widest">Recommended</p>
                  <p className="text-white font-black">{record.aiAnalysis?.recommendedDepartment}</p>
                </div>
              </div>

              {record.aiAnalysis?.warningFlags?.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-widest mb-2">⚠ Warning Flags</p>
                  <ul className="space-y-1">
                    {record.aiAnalysis.warningFlags.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-red-800 text-sm font-medium">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update Status</p>
                <select className="input bg-white" value={status} onChange={e => setStatus(e.target.value)}
                  id={`status-select-${record._id}`}>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="escalated">Escalated to Emergency</option>
                  <option value="resolved">Resolved</option>
                </select>
                <textarea rows={2} className="input resize-none" placeholder="Doctor's notes (optional)..."
                  value={notes} onChange={e => setNotes(e.target.value)} />
                <button id={`update-status-btn-${record._id}`} onClick={handleUpdate} disabled={updating}
                  className="btn btn-primary w-full flex items-center justify-center gap-2">
                  {updating ? 'Saving...' : 'Save Review'}
                </button>

                {(record.status === 'resolved' || status === 'resolved' || prescribed) && (userRole === 'receptionist' || userRole === 'superadmin') && (
                  <button
                    onClick={() => {
                      onClose();
                      window.dispatchEvent(new CustomEvent('open-billing', { detail: record }));
                    }}
                    className="btn w-full flex items-center justify-center gap-2 py-3 bg-brand-dark text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all mt-2"
                  >
                    <DollarSign className="w-4 h-4" /> Go to Generate Bill
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── PRESCRIBE TAB ───────────────────────────────────────────── */}
          {activeTab === 'prescribe' && canPrescribe && (
            <div className="space-y-5">
              {prescribed && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-sm font-bold text-emerald-800">A prescription has already been issued for this patient.</p>
                </div>
              )}

              <div className="bg-slate-50 rounded-2xl p-4 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prescribing for</p>
                <p className="text-lg font-black text-brand-dark">{patientName}</p>
                {record.additionalInfo?.age && (
                  <p className="text-sm text-slate-500">{record.additionalInfo.age}y • {record.additionalInfo.gender || '?'}</p>
                )}
                {record.additionalInfo?.medicalHistory && (
                  <p className="text-xs text-slate-400 mt-1">History: {record.additionalInfo.medicalHistory}</p>
                )}
              </div>

              <div>
                <label className="label flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" /> Diagnosis <span className="text-red-500">*</span>
                </label>
                <input id="rx-diagnosis" type="text" className="input"
                  placeholder="e.g. Acute Appendicitis, Viral Fever..."
                  value={rxForm.diagnosis}
                  onChange={e => setRxForm(f => ({ ...f, diagnosis: e.target.value }))} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="label m-0 flex items-center gap-2">
                    <Pill className="w-4 h-4 text-rose-500" /> Medicines <span className="text-red-500">*</span>
                  </label>
                  <button id="add-medicine-btn" onClick={addMed}
                    className="flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-dark transition-colors">
                    <Plus className="w-4 h-4" /> Add Medicine
                  </button>
                </div>
                <div className="space-y-3">
                  {rxForm.medicines.map((med, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Medicine #{idx + 1}</span>
                        {rxForm.medicines.length > 1 && (
                          <button onClick={() => removeMed(idx)}
                            className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <input type="text" className="input" placeholder="Medicine name *"
                            value={med.name} onChange={e => updateMed(idx, 'name', e.target.value)} />
                        </div>
                        <input type="text" className="input" placeholder="Dosage * (e.g. 500mg)"
                          value={med.dosage} onChange={e => updateMed(idx, 'dosage', e.target.value)} />
                        <select className="input bg-white"
                          value={med.frequency} onChange={e => updateMed(idx, 'frequency', e.target.value)}>
                          <option value="">Frequency *</option>
                          <option value="Once daily">Once daily</option>
                          <option value="Twice daily">Twice daily</option>
                          <option value="Three times daily">Three times daily</option>
                          <option value="Four times daily">Four times daily</option>
                          <option value="Every 4 hours">Every 4 hours</option>
                          <option value="Every 6 hours">Every 6 hours</option>
                          <option value="Every 8 hours">Every 8 hours</option>
                          <option value="Before meals">Before meals</option>
                          <option value="After meals">After meals</option>
                          <option value="At bedtime">At bedtime</option>
                          <option value="SOS / as needed">SOS / as needed</option>
                        </select>
                        <input type="text" className="input" placeholder="Duration * (e.g. 5 days)"
                          value={med.duration} onChange={e => updateMed(idx, 'duration', e.target.value)} />
                        <input type="text" className="input" placeholder="Special instructions (optional)"
                          value={med.instructions} onChange={e => updateMed(idx, 'instructions', e.target.value)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="label flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-500" /> Diagnostic Tests (optional)
                </label>
                <div className="flex gap-2 mb-2">
                  <input type="text" className="input flex-1" placeholder="e.g. CBC, X-ray Chest, ECG..."
                    value={newTest} onChange={e => setNewTest(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTest(); } }} />
                  <button onClick={addTest} className="btn btn-secondary px-4">Add</button>
                </div>
                {rxForm.tests.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {rxForm.tests.map((t, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full">
                        {t.name}
                        <button onClick={() => removeTest(i)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Doctor's Advice / Instructions</label>
                  <textarea rows={3} className="input resize-none"
                    placeholder="e.g. Rest for 3 days, avoid spicy food, drink lots of water..."
                    value={rxForm.advice} onChange={e => setRxForm(f => ({ ...f, advice: e.target.value }))} />
                </div>
                <div>
                  <label className="label flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-blue-500" /> Follow-up Date
                  </label>
                  <input type="date" className="input"
                    value={rxForm.followUpDate}
                    onChange={e => setRxForm(f => ({ ...f, followUpDate: e.target.value }))} />
                  <p className="text-xs text-slate-400 mt-1 ml-1">Leave blank if no follow-up needed</p>
                </div>
              </div>

              <button id="issue-prescription-btn" onClick={handlePrescribe} disabled={submittingRx || prescribed}
                className="btn w-full flex items-center justify-center gap-2 py-4 bg-brand-teal hover:bg-brand-dark text-white rounded-2xl font-black text-base transition-all disabled:opacity-50">
                {submittingRx
                  ? <><span className="loading-spinner w-5 h-5" /> Issuing Prescription...</>
                  : prescribed
                  ? <><CheckCircle className="w-5 h-5" /> Prescription Already Issued</>
                  : <><Pill className="w-5 h-5" /> Issue Prescription</>
                }
              </button>

              <p className="text-xs text-slate-400 text-center">
                Issuing a prescription will automatically mark this triage record as <strong>Resolved</strong>.
              </p>

              {(record.status === 'resolved' || prescribed) && (userRole === 'receptionist' || userRole === 'superadmin') && (
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                        onClose();
                        window.dispatchEvent(new CustomEvent('open-billing', { detail: record }));
                    }}
                    className="btn w-full flex items-center justify-center gap-2 py-3 bg-brand-dark text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all"
                  >
                    <DollarSign className="w-4 h-4" /> Go to Generate Bill
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Main Triage Queue Component
// ═══════════════════════════════════════════════════════════════════════════════
const TriageQueue = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ records: [], summary: { high: 0, medium: 0, low: 0, total: 0 } });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ urgency: '', status: 'pending' });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  // Billing states
  const [showBillModal, setShowBillModal] = useState(false);
  const [billingPatient, setBillingPatient] = useState(null);

  useEffect(() => {
    const handleOpenBilling = async (e) => {
      const record = e.detail;
      
      // We need a proper Patient object for the BillUploadModal
      // If the record has a userId, we fetch the Patient record
      if (record.userId) {
        try {
          const res = await api.get(`/admin/patients`); // Simplest way: find in all patients
          if (res.data.success) {
            const patient = res.data.data.patients.find(p => p.userId._id === (record.userId._id || record.userId));
            if (patient) {
              setBillingPatient(patient);
              setShowBillModal(true);
            } else {
              toast.error('Could not find registered patient profile');
            }
          }
        } catch (err) {
          toast.error('Failed to prepare billing information');
        }
      } else {
        const patientName = record.additionalInfo?.patientName || 'Anonymous Patient';
        const walkInPatient = {
          isWalkIn: true,
          triageRecordId: record._id,
          userId: { profile: { firstName: patientName, lastName: '' } }
        };
        setBillingPatient(walkInPatient);
        setShowBillModal(true);
      }
    };

    window.addEventListener('open-billing', handleOpenBilling);
    return () => window.removeEventListener('open-billing', handleOpenBilling);
  }, []);

  const fetchQueue = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.urgency) params.append('urgency', filter.urgency);
      if (filter.status) params.append('status', filter.status);
      params.append('limit', '100');

      const res = await api.get(`/symptom-check/queue?${params}`);
      if (res.data.success) setData(res.data.data);
    } catch {
      toast.error('Failed to load triage queue');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchQueue(); }, [fetchQueue]);

  const handleStatusUpdate = (recordId, newStatus, notes) => {
    setData(prev => ({
      ...prev,
      records: prev.records.map(r =>
        r._id === recordId ? { ...r, status: newStatus, reviewNotes: notes } : r
      )
    }));
  };

  const handleUrgencyFilter = (urgency) => {
    if (activeFilter === urgency) {
      setActiveFilter(null);
      setFilter(f => ({ ...f, urgency: '' }));
    } else {
      setActiveFilter(urgency);
      setFilter(f => ({ ...f, urgency }));
    }
  };

  const { summary, records } = data;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark font-display">Triage Queue</h1>
          <p className="text-slate-500 font-medium mt-1">AI-assessed patient risk queue, sorted by severity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
            <TrendingUp className="w-4 h-4 text-brand-teal" />
            <span className="text-sm font-bold text-slate-700">{summary.total} Pending</span>
          </div>
          <button onClick={fetchQueue} id="refresh-queue-btn"
            className="btn btn-secondary flex items-center gap-2 py-2.5">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard label="High Urgency" count={summary.high} icon={ShieldAlert}
          bg="bg-red-100" text="text-red-600"
          onClick={() => handleUrgencyFilter('HIGH')} active={activeFilter === 'HIGH'} />
        <SummaryCard label="Medium Urgency" count={summary.medium} icon={AlertTriangle}
          bg="bg-amber-100" text="text-amber-600"
          onClick={() => handleUrgencyFilter('MEDIUM')} active={activeFilter === 'MEDIUM'} />
        <SummaryCard label="Low Urgency" count={summary.low} icon={CheckCircle}
          bg="bg-emerald-100" text="text-emerald-600"
          onClick={() => handleUrgencyFilter('LOW')} active={activeFilter === 'LOW'} />
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
        <Filter className="w-4 h-4 text-slate-400" />
        <span className="text-sm font-bold text-slate-500">Status:</span>
        {['pending', 'reviewed', 'escalated', 'resolved'].map(s => (
          <button key={s} id={`filter-${s}`}
            onClick={() => setFilter(f => ({ ...f, status: f.status === s ? '' : s }))}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all capitalize
              ${filter.status === s ? 'bg-brand-dark text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner h-10 w-10 text-brand-teal" />
        </div>
      ) : records.length === 0 ? (
        <div className="card text-center py-16 bg-slate-50 border-dashed">
          <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-400 font-bold text-lg">No triage records found</p>
          <p className="text-slate-400 text-sm mt-1">Use "Patient Intake" to assess a walk-in patient</p>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-brand-light/60">
                  <th className="table-header">#</th>
                  <th className="table-header">Patient</th>
                  <th className="table-header">Symptoms</th>
                  <th className="table-header">Vitals</th>
                  <th className="table-header">Risk</th>
                  <th className="table-header">Urgency</th>
                  <th className="table-header">Department</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Time</th>
                  <th className="table-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, idx) => {
                  const meta = URGENCY_META[record.aiAnalysis?.urgencyLevel || 'LOW'];
                  const UrgIcon = meta.icon;
                  const patientName = record.additionalInfo?.patientName ||
                    (record.userId?.profile
                      ? `${record.userId.profile.firstName || ''} ${record.userId.profile.lastName || ''}`.trim()
                      : 'Anonymous') || 'Anonymous';

                  return (
                    <tr key={record._id} className={`table-row ${meta.bg} border-l-4 ${
                      record.aiAnalysis?.urgencyLevel === 'HIGH' ? 'border-l-red-500' :
                      record.aiAnalysis?.urgencyLevel === 'MEDIUM' ? 'border-l-amber-500' : 'border-l-emerald-500'
                    }`}>
                      <td className="table-cell font-bold text-slate-400">{idx + 1}</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-brand-dark flex items-center justify-center text-white text-xs font-black shrink-0">
                            {patientName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{patientName}</p>
                            {record.additionalInfo?.age && (
                              <p className="text-xs text-slate-400">{record.additionalInfo.age}y • {record.additionalInfo.gender || '?'}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {record.symptoms?.slice(0, 3).map(s => (
                            <span key={s} className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                          {record.symptoms?.length > 3 && (
                            <span className="text-xs text-slate-400">+{record.symptoms.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="table-cell text-sm">
                        <div className="space-y-0.5 text-slate-600">
                          {record.vitals?.temperature && <div>🌡️ {record.vitals.temperature}°F</div>}
                          {record.vitals?.heartRate && <div>💓 {record.vitals.heartRate}bpm</div>}
                          {!record.vitals?.temperature && !record.vitals?.heartRate && <span className="text-slate-300">—</span>}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shadow-sm ${
                          (record.aiAnalysis?.riskScore || 0) >= 75 ? 'bg-red-500' :
                          (record.aiAnalysis?.riskScore || 0) >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}>
                          {record.aiAnalysis?.riskScore || 0}
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${meta.badge}`}>
                          <UrgIcon className="w-3 h-3" /> {meta.label}
                        </span>
                      </td>
                      <td className="table-cell text-sm font-medium text-slate-700">
                        {record.aiAnalysis?.recommendedDepartment || '—'}
                      </td>
                      <td className="table-cell">
                        <span className={`status-badge ${STATUS_COLORS[record.status]}`}>{record.status}</span>
                      </td>
                      <td className="table-cell text-xs text-slate-400 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(record.createdAt)}
                        </div>
                      </td>
                      <td className="table-cell">
                        <button id={`view-triage-${record._id}`}
                          onClick={() => setSelectedRecord(record)}
                          className="btn btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {(user?.role === 'doctor' || user?.role === 'superadmin') ? 'Review & Rx' : 'Review'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedRecord && (
        <DetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onStatusUpdate={handleStatusUpdate}
          userRole={user?.role}
        />
      )}

      {showBillModal && billingPatient && (
        <BillUploadModal
          isOpen={showBillModal}
          onClose={() => setShowBillModal(false)}
          patient={billingPatient}
          onSuccess={() => fetchQueue()}
        />
      )}
    </div>
  );
};

export default TriageQueue;
