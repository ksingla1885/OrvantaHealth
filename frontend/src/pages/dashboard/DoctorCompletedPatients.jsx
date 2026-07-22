import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, Calendar, FileText, Search, Pill, Activity, 
  Heart, Thermometer, Clock, ShieldCheck, ClipboardCheck, ArrowLeft, ArrowUpRight
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const DoctorCompletedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCompletedPatients();
  }, []);

  const fetchCompletedPatients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/triage/queue?status=resolved');
      
      if (response.data.success) {
        const dbPatients = response.data.data.queue || [];
        setPatients(dbPatients);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error('Failed to fetch completed patients:', error);
      setPatients([]);
      toast.error('Failed to load database patients');
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => {
    const search = searchQuery.toLowerCase();
    return (
      p.patientName?.toLowerCase().includes(search) ||
      p.triageId?.toLowerCase().includes(search) ||
      p.diagnosis?.toLowerCase().includes(search)
    );
  });

  const totalCount = patients.length;
  const highRiskCount = patients.filter(p => p.aiAnalysis?.riskScore >= 7).length;
  const urgentCount = patients.filter(p => p.aiAnalysis?.urgencyLevel === 'Urgent' || p.aiAnalysis?.urgencyLevel === 'Emergency').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Loading examined patients history...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-light border border-brand-teal/20 mb-3">
            <ClipboardCheck className="h-3.5 w-3.5 text-brand-teal" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Clinical Records Vault</span>
          </div>
          <h1 className="text-4xl font-black text-brand-dark font-display tracking-tight leading-none mb-2">
            Examined & Completed Patients
          </h1>
          <p className="text-slate-500 font-medium">
            Confidential history of all patients successfully triaged, examined, and completed by you.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, ID, or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-brand-teal outline-none w-full text-xs font-bold text-brand-dark transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-brand-dark/5 rounded-bl-[3rem]" />
          <div className="h-10 w-10 rounded-xl bg-brand-dark flex items-center justify-center mb-4 text-white shadow-lg shadow-brand-dark/20">
            <Users className="h-5 w-5" />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Examined By You</p>
          <p className="text-3xl font-black text-brand-dark font-display">{totalCount}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-bl-[3rem]" />
          <div className="h-10 w-10 rounded-xl bg-rose-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-rose-500/20">
            <Heart className="h-5 w-5 animate-pulse" />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">High Risk Profiles Resolved</p>
          <p className="text-3xl font-black text-rose-500 font-display">{highRiskCount}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-bl-[3rem]" />
          <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-amber-500/20">
            <Activity className="h-5 w-5" />
          </div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Urgent/Emergency Interventions</p>
          <p className="text-3xl font-black text-amber-500 font-display">{urgentCount}</p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="space-y-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((p, idx) => (
            <div 
              key={p._id} 
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-dark via-brand-teal to-emerald-400" />
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-brand-light text-brand-teal flex items-center justify-center font-black text-lg shadow-inner shrink-0">
                      {p.patientName ? p.patientName[0] : 'P'}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-brand-dark font-display leading-tight">{p.patientName}</h3>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {p.age}Y • {p.gender} • Contact: {p.contactNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-[10px] font-black uppercase tracking-wider rounded-lg font-mono">
                      #{p.triageId}
                    </span>
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Exam Completed
                    </span>
                  </div>
                </div>

                {/* Grid info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left info column: vitals and symptoms */}
                  <div className="lg:col-span-4 space-y-4 border-r border-slate-100 pr-0 lg:pr-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Intake Symptoms</p>
                      <p className="text-xs text-slate-600 font-medium italic">"{p.symptoms}"</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged Vitals</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2">
                          <Thermometer className="h-3.5 w-3.5 text-rose-500" />
                          <span className="text-slate-500">Temp:</span>
                          <span className="text-slate-900 font-mono">{p.vitals?.temperature || '98.6'}°F</span>
                        </div>
                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2">
                          <Activity className="h-3.5 w-3.5 text-blue-500" />
                          <span className="text-slate-500">BP:</span>
                          <span className="text-slate-900 font-mono">{p.vitals?.bloodPressure || '120/80'}</span>
                        </div>
                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2">
                          <Heart className="h-3.5 w-3.5 text-brand-teal" />
                          <span className="text-slate-500">HR:</span>
                          <span className="text-slate-900 font-mono">{p.vitals?.pulseRate || '72'} bpm</span>
                        </div>
                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-slate-500">SpO2:</span>
                          <span className="text-slate-900 font-mono">{p.vitals?.spO2 || '98'}%</span>
                        </div>
                      </div>
                    </div>

                    {p.resolvedAt && (
                      <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-500">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>Completed {formatDistanceToNow(new Date(p.resolvedAt))} ago ({format(new Date(p.resolvedAt), 'PPP p')})</span>
                      </div>
                    )}
                  </div>

                  {/* Right info column: diagnosis, prescriptions, advice */}
                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Diagnosis (SOAP Assessment)</p>
                      <div className="p-4 bg-brand-light/35 border border-brand-teal/10 rounded-2xl">
                        <p className="text-sm font-black text-brand-dark">{p.diagnosis || 'Clinical Investigation Completed'}</p>
                      </div>
                    </div>

                    {p.prescribedMedicines && p.prescribedMedicines.length > 0 && (
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Prescribed Regimen</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {p.prescribedMedicines.map((med, mIdx) => (
                            <div key={mIdx} className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl flex items-start gap-3">
                              <div className="p-2 bg-white rounded-xl shadow-xs text-brand-teal text-center flex items-center justify-center shrink-0">
                                <Pill className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-black text-slate-900 truncate">{med.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                                  {med.dosage || 'N/A'} • {med.frequency || 'N/A'} • {med.duration || 'N/A'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {p.advice && (
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Advice & Instructions</p>
                        <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-500 leading-relaxed italic">
                          "{p.advice}"
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 space-y-4">
            <ClipboardCheck className="h-12 w-12 text-slate-300 mx-auto" />
            <p className="text-base font-black text-slate-700">No Examined Patients Found</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Any patients you check-in, diagnose, and sign will be securely logged and shown here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCompletedPatients;
