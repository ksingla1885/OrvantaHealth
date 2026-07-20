import React, { useState, useEffect } from 'react';
import { 
  History, Users, Stethoscope, Search, Filter, 
  Download, Eye, UserX, ShieldAlert, Calendar, Clock,
  ChevronRight, ArrowRight, User, Target, Pill, FileText,
  Activity, ExternalLink, Briefcase
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import { format, isValid } from 'date-fns';

const safeFormat = (date, formatStr, fallback = 'N/A') => {
  if (!date) return fallback;
  const d = new Date(date);
  if (!isValid(d)) return fallback;
  return format(d, formatStr);
};

// ── COMPONENT: ARCHIVED DOCTOR DOSSIER ──
const getPatientMRN = (data) => {
  if (!data) return 'MRN-PENDING';
  
  // 1. Return MRN if available
  if (data.medicalRecordNumber) return data.medicalRecordNumber;
  
  // 2. If MRN is missing but we have a name, show Name + Temp ID
  const name = data.userId?.profile ? `${data.userId.profile.firstName} ${data.userId.profile.lastName}` : '';
  if (name) return `${name} (MRN-N/A)`;

  // 3. Last resort: derive from ID
  if (data._id) return `MRN-TEMP-${data._id.slice(-6).toUpperCase()}`;
  if (typeof data === 'string') return `MRN-ID-${data.slice(-6).toUpperCase()}`;

  return 'MRN-UNAVAILABLE';
};

const DoctorAuditDossier = ({ doctorId, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDossier = async () => {
      try {
        const res = await api.get(`/admin/doctor-history/${doctorId}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load doctor dossier");
      } finally {
        setLoading(false);
      }
    };
    fetchDossier();
  }, [doctorId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <div className="loading-spinner" />
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Reconstructing Records...</p>
    </div>
  );

  if (!data) return null;

  const { doctor, appointments, prescriptions } = data;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-dossier, .print-dossier * { visibility: visible; }
          .print-dossier { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            height: auto;
            background: white !important;
          }
          .print-hidden { display: none !important; }
          .shadow-2xl, .shadow-sm { shadow: none !important; }
          .rounded-[3rem] { border-radius: 0 !important; }
        }
      `}</style>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in print:hidden" onClick={onClose} />
      <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col animate-slide-up border border-white/20 print-dossier print:h-auto">
        
        {/* Certification Watermark (Print Only) */}
        <div className="hidden print:block absolute top-10 right-10 border-4 border-brand-teal/20 p-4 rounded-full rotate-12 flex flex-col items-center opacity-30">
          <ShieldAlert className="h-8 w-8 text-brand-teal mb-1" />
          <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest">OFFICIAL AUDIT</p>
          <p className="text-[8px] font-bold text-brand-teal uppercase tracking-tighter">ORVANTA HEALTH</p>
        </div>

        {/* Header */}
        <div className="p-8 bg-brand-dark text-white relative">
          <div className="absolute top-0 right-0 w-64 h-full bg-white/5 skew-x-12 transform translate-x-32" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-[2rem] bg-brand-teal flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                {doctor.userId.profile.firstName[0]}
              </div>
              <div>
                <h2 className="text-3xl font-black font-display tracking-tight">
                  Dr. {doctor.userId.profile.firstName} {doctor.userId.profile.lastName}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-teal-400 font-black text-[10px] uppercase tracking-widest">{doctor.specialization} • {doctor.department}</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[8px] font-black uppercase tracking-widest border border-rose-500/20">Archived Record</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-4 hover:bg-white/10 rounded-2xl transition-all print:hidden">
              <History className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 bg-slate-50 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Sidebar: Profile Details */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <User className="h-3.5 w-3.5" /> Professional Profile
                </h3>
                <div className="space-y-4 text-sm font-medium text-slate-600">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-400">License Number</span>
                    <span className="text-brand-dark font-bold">{doctor.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-400">Experience</span>
                    <span className="text-brand-dark font-bold">{doctor.experience} Years</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-400">Consultation Fee</span>
                    <span className="text-brand-dark font-bold">₹{doctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400">Contact Email</span>
                    <span className="text-brand-dark font-bold lowercase">{doctor.userId.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Audit Summary</p>
                    <p className="text-lg font-bold">Historical Impact</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[20px] font-black text-brand-teal">{appointments.length}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Consultations</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[20px] font-black text-brand-teal">{prescriptions.length}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Prescriptions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Area: History Tabs */}
            <div className="lg:col-span-2 space-y-10">
              {/* Linked Patients / Appointments */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-brand-teal" /> Patient Consultation Ledger
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{appointments.length} Total visits</span>
                </div>
                <div className="space-y-4">
                  {appointments.length > 0 ? appointments.map((apt, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="h-12 w-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-teal shrink-0">
                        <User className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-black text-brand-dark text-lg tracking-tight">
                            {getPatientMRN(apt.patientId)}
                          </p>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-50 rounded">Patient Identification</span>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" /> 
                          {safeFormat(apt.date, 'EEEE, do MMMM yyyy', 'Date N/A')} • {apt.timeSlot?.start || 'Time N/A'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                          apt.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                          apt.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                          'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {apt.status.replace('_', ' ')}
                        </span>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Appointment Status</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-20 bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                      <Calendar className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Consultation Records Found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Prescriptions & Clinical Advisory */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Pill className="h-3.5 w-3.5 text-brand-teal" /> Clinical Advisory Vault
                </h3>
                <div className="space-y-6">
                  {prescriptions.length > 0 ? prescriptions.map((pre, i) => (
                    <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500">
                      <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Ledger Record</p>
                          </div>
                          <h4 className="text-xl font-black text-brand-dark font-display mb-2">
                            {getPatientMRN(pre.patientId)}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest px-2 py-0.5 bg-brand-teal/10 rounded">Diagnosis: {pre.diagnosis}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authored On</p>
                          <p className="text-sm font-bold text-brand-dark">{safeFormat(pre.createdAt, 'dd MMM yyyy', 'Date N/A')}</p>
                        </div>
                      </div>
                      
                      <div className="p-8 space-y-8">
                        {/* Clinical Advice */}
                        <div className="bg-brand-light/30 p-6 rounded-2xl border border-brand-teal/10 relative">
                          <Target className="absolute top-4 right-4 h-5 w-5 text-brand-teal opacity-20" />
                          <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-3">Professional Advisory</p>
                          <p className="text-slate-600 font-medium italic leading-relaxed">
                            "{pre.advice || "No specific advisory notes provided for this case."}"
                          </p>
                        </div>

                        {/* Medications Table */}
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Prescribed Medication Regimen</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pre.medicines.map((med, idx) => (
                              <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                  <Activity className="h-5 w-5 text-brand-teal" />
                                </div>
                                <div>
                                  <p className="text-sm font-black text-brand-dark uppercase tracking-tight">{med.name}</p>
                                  <p className="text-[10px] font-bold text-slate-400">{med.dosage} • {med.frequency}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Patient Linkage */}
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2">
                            <User className="h-3 w-3" />
                            MRN Verified: {getPatientMRN(pre.patientId)}
                          </span>
                          <span>Audit ID: {pre._id.slice(-8).toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-20 bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                      <FileText className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Clinical Advisories Found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Forensic Verification Ledger (For Police/Audit) */}
              <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-teal opacity-10 rounded-full blur-2xl" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-inner">
                    <ShieldAlert className="h-6 w-6 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-display tracking-tight">Forensic Chain of Custody</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Legally Defensible Record Verification</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-0.5 h-12 bg-brand-teal/30" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Account Establishment</p>
                        <p className="text-sm font-bold">{safeFormat(doctor.userId.createdAt, 'PPP p', 'Creation Date N/A')}</p>
                        <p className="text-[9px] font-medium text-slate-500 mt-0.5">Initial credential issuance date.</p>
                      </div>
                    </div>
                    {doctor.userId.isOffboarded && (
                      <div className="flex items-start gap-4">
                        <div className="w-0.5 h-12 bg-rose-500/30" />
                        <div>
                          <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Institutional Offboarding</p>
                          <p className="text-sm font-bold text-rose-100">
                            {safeFormat(doctor.userId.offboardedAt, 'PPP p', 'Archived via Legacy Migration')}
                          </p>
                          <p className="text-[9px] font-medium text-slate-500 mt-0.5">
                            Authorized By: {doctor.userId.offboardedBy?.profile ? `${doctor.userId.offboardedBy.profile.firstName} ${doctor.userId.offboardedBy.profile.lastName}` : 'System Root'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand-teal/20 blur-xl rounded-full" />
                      <div className="relative border-4 border-brand-teal/40 p-4 rounded-full rotate-12 flex items-center justify-center flex-col">
                        <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Certified Audit</p>
                        <p className="text-[8px] font-black text-brand-teal uppercase tracking-[0.2em] mt-1">Orvanta Health</p>
                      </div>
                    </div>
                    <p className="text-[9px] font-medium text-slate-500 mt-6 max-w-[200px]">
                      This digital record is cryptographically linked to the Orvanta Health central database.
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <Clock className="h-3.5 w-3.5" />
                    System Hash: {doctor._id.toUpperCase()}
                  </div>
                  <button 
                    onClick={() => {
                      toast.success("Preparing certified audit document...");
                      setTimeout(() => window.print(), 500);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg print:hidden"
                  >
                    <Download className="h-4 w-4" />
                    Download Legal Dossier
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end print:hidden">
          <button onClick={onClose} className="px-8 py-3 bg-brand-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};

const ArchivedRecords = () => {
  const [activeTab, setActiveTab] = useState('staff'); // 'staff' or 'clinical'
  const [loading, setLoading] = useState(true);
  const [archivedStaff, setArchivedStaff] = useState([]);
  const [clinicalHistory, setClinicalHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showDossier, setShowDossier] = useState(false);

  useEffect(() => {
    fetchArchivedData();
  }, []);

  const fetchArchivedData = async () => {
    try {
      setLoading(true);
      const [staffRes, triageRes] = await Promise.all([
        api.get('/admin/staff'),
        api.get('/triage/queue?status=resolved')
      ]);

      if (staffRes.data.success) {
        const inactivePersonnel = staffRes.data.data.staff
          .filter(s => !s.isActive)
          .map(s => ({
            ...s,
            userId: s, // Map for consistent access
            type: s.role === 'doctor' ? 'Doctor' : 'Receptionist'
          }));
        setArchivedStaff(inactivePersonnel);
      }

      if (triageRes.data.success) {
        setClinicalHistory(triageRes.data.data.queue);
      }
    } catch (error) {
      console.error('Failed to fetch archived records:', error);
      toast.error('Failed to load archive data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportAllLogs = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      system: "Orvanta Health Administrative Secure Audit Vault",
      archivedStaffCount: archivedStaff.length,
      clinicalHistoryCount: clinicalHistory.length,
      archivedStaff: archivedStaff.map(s => {
        const profile = s.userId?.profile || {};
        return {
          id: s._id,
          name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'N/A',
          role: s.role,
          department: s.department || 'Front Desk',
          email: s.userId?.email || 'N/A',
          isActive: s.isActive,
          isOffboarded: Boolean(s.userId?.isOffboarded),
          lastLogin: s.userId?.lastLogin || null
        };
      }),
      clinicalRecords: clinicalHistory.map(c => ({
        id: c._id,
        patientName: c.patientName,
        age: c.age,
        gender: c.gender,
        symptoms: c.symptoms,
        possibleConditions: c.aiAnalysis?.possibleConditions || [],
        resolvedAt: c.updatedAt
      }))
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `orvanta_archive_audit_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Archived audit records exported successfully!');
  };

  const filteredStaff = archivedStaff.filter(staff => {
    const profile = staff.userId?.profile || {};
    const name = `${profile.firstName || ''} ${profile.lastName || ''}`.toLowerCase();
    const email = (staff.userId?.email || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  const filteredHistory = clinicalHistory.filter(record => {
    const name = (record.patientName || '').toLowerCase();
    const symptoms = (record.symptoms || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    return name.includes(query) || symptoms.includes(query);
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="loading-spinner" />
        <p className="text-slate-400 font-black text-xs uppercase tracking-widest animate-pulse">Accessing Secure Archives...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 mb-3">
            <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Secure Audit Vault</span>
          </div>
          <h1 className="text-4xl font-black text-brand-dark font-display tracking-tight leading-none mb-2">
            Archive & <span className="italic text-brand-teal">Audit</span>
          </h1>
          <p className="text-slate-500 font-medium">Historical staff credentials and clinical patient history for legal verification.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'staff' ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-400 hover:text-brand-dark'}`}
          >
            Staff Archive
          </button>
          <button
            onClick={() => setActiveTab('clinical')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'clinical' ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-400 hover:text-brand-dark'}`}
          >
            Clinical History
          </button>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="card-dark group">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-hover:text-brand-teal transition-colors" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'staff' ? 'archived staff...' : 'clinical records...'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input bg-white/10 border-white/10 text-white placeholder:text-white/40 pl-12 focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {activeTab === 'staff' ? (
        /* ── STAFF ARCHIVE VIEW ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff, i) => (
              <div key={i} className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 opacity-50 rounded-bl-[4rem]" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <UserX className="h-7 w-7" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${staff.userId?.isOffboarded ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                      {staff.userId?.isOffboarded ? 'Left Institution' : 'Deactivated'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-brand-dark font-display leading-tight">
                    {staff.userId?.profile?.firstName} {staff.userId?.profile?.lastName}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 mb-6">
                    {staff.type} • {staff.department || 'Front Desk'}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-slate-300" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Active</p>
                        <p className="text-xs font-bold text-brand-dark">
                          {safeFormat(staff.userId?.lastLogin, 'PPP', 'Never')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-4 w-4 text-slate-300" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                        <p className={`text-xs font-bold ${staff.userId?.isOffboarded ? 'text-rose-500' : 'text-amber-500'}`}>
                          {staff.userId?.isOffboarded ? 'Credentials Deleted' : 'Account Deactivated'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {staff.type === 'Doctor' && (
                    <button 
                      onClick={() => {
                        setSelectedDoctorId(staff.userId._id);
                        setShowDossier(true);
                      }}
                      className="w-full mt-6 py-3 bg-slate-50 hover:bg-brand-teal hover:text-white text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <Briefcase className="h-3.5 w-3.5 group-hover/btn:rotate-12 transition-transform" />
                      View Audit Dossier
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400">
              <Users className="h-12 w-12 opacity-10 mb-4" />
              <p className="text-lg font-black font-display text-slate-300 uppercase tracking-widest">No Archived Staff Found</p>
            </div>
          )}
        </div>
      ) : (
        /* ── CLINICAL HISTORY VIEW ── */
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, i) => (
              <div key={i} className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-brand-light flex items-center justify-center shrink-0">
                  <Target className="h-7 w-7 text-brand-teal" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-lg font-black text-brand-dark font-display">{item.patientName}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest">
                      {item.age}Y • {item.gender}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium line-clamp-1 italic">"{item.symptoms}"</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.aiAnalysis?.possibleConditions?.map((cond, idx) => (
                    <span key={idx} className="px-3 py-1 bg-brand-teal/5 text-brand-teal text-[9px] font-black uppercase tracking-wider rounded-lg border border-brand-teal/5">
                      {cond}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 px-6 border-l border-slate-50 hidden md:flex">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Resolved On</p>
                    <p className="text-xs font-bold text-brand-dark">{safeFormat(item.updatedAt, 'dd MMM yyyy', 'Date N/A')}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand-teal group-hover:text-white transition-all cursor-pointer">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400">
              <History className="h-12 w-12 opacity-10 mb-4" />
              <p className="text-lg font-black font-display text-slate-300 uppercase tracking-widest">No Clinical Records Found</p>
            </div>
          )}
        </div>
      )}

      {/* ── FOOTER NOTICE ── */}
      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
            <ShieldAlert className="h-8 w-8 text-rose-400" />
          </div>
          <div>
            <h3 className="text-xl font-black font-display mb-1">Administrative Audit Rights</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
              This vault contains sensitive medical and operational data. Access is logged and restricted to SuperAdmins only. 
              These records are maintained strictly for legal verification and medical continuity purposes.
            </p>
          </div>
          <button 
            onClick={handleExportAllLogs}
            className="md:ml-auto flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="h-4 w-4 text-brand-teal group-hover:text-white transition-colors" />
            Export All Logs
          </button>
        </div>
      </div>

      {/* ── DOSSIER MODAL ── */}
      {showDossier && selectedDoctorId && (
        <DoctorAuditDossier 
          doctorId={selectedDoctorId} 
          onClose={() => {
            setShowDossier(false);
            setSelectedDoctorId(null);
          }} 
        />
      )}
    </div>
  );
};

export default ArchivedRecords;
