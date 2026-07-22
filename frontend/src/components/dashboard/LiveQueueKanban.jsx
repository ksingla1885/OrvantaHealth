import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Clock, ChevronRight, ArrowRight, Printer, 
  CheckCircle2, Plus, Search, AlertCircle, Stethoscope, UserCheck, 
  Building, RefreshCw, QrCode, Sparkles, MoveRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const LiveQueueKanban = () => {
  const [doctors, setDoctors] = useState([]);
  const [dbQueue, setDbQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(null);
  const [referralTarget, setReferralTarget] = useState(null);
  const [editingDoctorStatus, setEditingDoctorStatus] = useState(null);

  const [walkinForm, setWalkinForm] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    doctor: '',
    priority: 'Standard'
  });

  const columns = [
    { id: 'checkin', title: '1. Arrived & Check-In', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200' },
    { id: 'waiting', title: '2. Waiting Lounge', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
    { id: 'incabin', title: '3. Inside Doctor Cabin', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
    { id: 'completed', title: '4. Completed & Billing', color: 'bg-violet-500/10 text-violet-600 border-violet-200' },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const [doctorsRes, queueRes] = await Promise.all([
        api.get('/receptionist/doctors/availability'),
        api.get('/triage/queue')
      ]);
      if (doctorsRes.data.success) {
        setDoctors(doctorsRes.data.data.doctors || []);
      }
      if (queueRes.data.success) {
        setDbQueue(queueRes.data.data.queue || []);
      }
    } catch (error) {
      console.error('Failed to fetch telemetry data:', error);
      toast.error('Failed to synchronize telemetry data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (doctors.length > 0 && !walkinForm.doctor) {
      setWalkinForm(prev => ({ ...prev, doctor: doctors[0].userId?._id || '' }));
    }
  }, [doctors, walkinForm.doctor]);

  const cabins = doctors.map((doc, idx) => {
    const activePatient = dbQueue.find(p => p.status === 'in-consultation' && p.doctorReferred?._id === doc.userId?._id);
    const doctorName = `Dr. ${doc.userId?.profile?.firstName || ''} ${doc.userId?.profile?.lastName || ''}`.trim();
    let status = 'available';
    let patient = 'None';
    
    if (doc.dutyStatus === 'busy') {
      status = 'busy';
      patient = 'Emergency / DND';
    } else if (doc.dutyStatus === 'rounds') {
      status = 'break';
      patient = 'On Round Break';
    } else if (activePatient) {
      status = 'busy';
      patient = `${activePatient.patientName} (#${activePatient.triageId})`;
    } else if (!doc.isAvailable) {
      status = 'break';
      patient = 'Not Available';
    }

    return {
      id: doc.userId?._id,
      name: `Cabin ${idx + 1} - ${doc.specialization || doc.department || 'General'}`,
      doctor: doctorName,
      status: status,
      patient: patient,
      elapsed: activePatient && activePatient.checkedInAt ? `${Math.floor((Date.now() - new Date(activePatient.checkedInAt).getTime()) / 60000)} min` : '0 min',
      rawDoctor: doc
    };
  });

  const mappedQueue = dbQueue.map(p => {
    const doctorName = p.doctorReferred?.profile
      ? `Dr. ${p.doctorReferred.profile.firstName || ''} ${p.doctorReferred.profile.lastName || ''}`.trim()
      : 'Not Referred';
    const docIndex = doctors.findIndex(doc => doc.userId?._id === p.doctorReferred?._id);
    const cabinName = docIndex !== -1 ? `Cabin ${docIndex + 1}` : 'General Lobby';
    
    let stage = 'checkin';
    if (p.status === 'referred') stage = 'waiting';
    else if (p.status === 'in-consultation') stage = 'incabin';
    else if (p.status === 'completed') stage = 'completed';

    return {
      _id: p._id,
      id: p.triageId,
      name: p.patientName,
      age: p.age,
      gender: p.gender === 'male' ? 'Male' : p.gender === 'female' ? 'Female' : 'Other',
      doctor: doctorName,
      cabin: cabinName,
      stage: stage,
      priority: p.aiAnalysis?.urgencyLevel === 'Routine' ? 'Standard' : p.aiAnalysis?.urgencyLevel || 'Standard',
      time: p.createdAt ? new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '09:00 AM',
      rawRecord: p
    };
  });

  const handleCheckIn = async (recordId) => {
    try {
      const res = await api.post(`/triage/check-in/${recordId}`);
      if (res.data.success) {
        toast.success('Patient checked-in to cabin');
        fetchData();
      }
    } catch {
      toast.error('Check-in failed');
    }
  };

  const handleCheckOut = async (recordId) => {
    try {
      const res = await api.post(`/triage/check-out/${recordId}`);
      if (res.data.success) {
        toast.success('Consultation completed successfully');
        fetchData();
      }
    } catch {
      toast.error('Check-out failed');
    }
  };

  const handleSelectClinician = async (doctorId) => {
    try {
      const res = await api.post(`/triage/refer/${referralTarget._id}`, { doctorId });
      if (res.data.success) {
        toast.success(`Patient referred to clinical staff`);
        setReferralTarget(null);
        fetchData();
      }
    } catch {
      toast.error('Clinical referral failed');
    }
  };

  const moveNext = (patient) => {
    if (patient.stage === 'checkin') {
      setReferralTarget(patient.rawRecord);
    } else if (patient.stage === 'waiting') {
      handleCheckIn(patient._id);
    } else if (patient.stage === 'incabin') {
      handleCheckOut(patient._id);
    }
  };

  const handleRegisterWalkin = async (e) => {
    e.preventDefault();
    if (!walkinForm.name || !walkinForm.phone) {
      toast.error('Please enter patient name and contact phone!');
      return;
    }
    try {
      const res = await api.post('/triage/intake', {
        patientName: walkinForm.name,
        age: Number(walkinForm.age || 30),
        gender: walkinForm.gender.toLowerCase(),
        contactNumber: walkinForm.phone,
        symptoms: walkinForm.priority === 'Urgent' ? 'Priority/Urgent walk-in consultation requested.' : 'Standard walk-in consultation requested.',
        vitals: {
          temperature: '98.6',
          bloodPressure: '120/80',
          pulseRate: '72',
          spO2: '98%'
        }
      });
      if (res.data.success) {
        const newRecord = res.data.data.triage;
        if (walkinForm.doctor) {
          await api.post(`/triage/refer/${newRecord._id}`, { doctorId: walkinForm.doctor });
        }
        toast.success(`Walk-in Token ${newRecord.triageId} issued for ${newRecord.patientName}!`);
        setShowWalkinModal(false);
        const docObj = doctors.find(d => d.userId?._id === walkinForm.doctor);
        const printPatientInfo = {
          id: newRecord.triageId,
          name: newRecord.patientName,
          doctor: docObj ? `Dr. ${docObj.userId.profile.firstName} ${docObj.userId.profile.lastName}` : 'Not Assigned',
          cabin: docObj ? `Cabin ${doctors.indexOf(docObj) + 1}` : 'General Lobby',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setShowPrintModal(printPatientInfo);
        setWalkinForm({ name: '', phone: '', age: '', gender: 'Male', doctor: doctors[0]?.userId?._id || '', priority: 'Standard' });
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error('Intake registration failed');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-premium flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-4">Loading central clinic queue...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-premium space-y-8 animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-500" />

      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building className="h-4 w-4 text-brand-teal" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Front-Desk Operational Control</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark font-display">Live Patient Queue Kanban</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWalkinModal(true)}
            className="px-6 py-3.5 bg-brand-teal hover:bg-brand-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4 stroke-[3]" /> Express Walk-In Registration
          </button>
        </div>
      </div>

      {/* ── DOCTOR CABIN AVAILABILITY GRID ── */}
      <div className="space-y-3">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Doctor Cabin Telemetry</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cabins.length === 0 ? (
            <div className="col-span-3 text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-[2rem]">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Active Clinician Cabins Telemetry Detected</p>
            </div>
          ) : (
            cabins.map(cabin => (
              <div 
                key={cabin.name} 
                onClick={() => setEditingDoctorStatus(cabin.rawDoctor)}
                className="p-5 rounded-[2rem] bg-slate-50 hover:bg-slate-100/75 border-2 border-slate-200/50 hover:border-brand-teal/40 flex items-center justify-between cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
                title="Click to update clinician availability status"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      cabin.status === 'available' ? 'bg-emerald-500 animate-pulse' :
                      cabin.status === 'busy' ? 'bg-rose-500' : 'bg-amber-500'
                    }`} />
                    <h4 className="text-xs font-black text-brand-dark group-hover:text-brand-teal transition-colors">{cabin.name}</h4>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500">{cabin.doctor}</p>
                  <p className="text-[10px] text-slate-400">Current: <span className="font-bold text-slate-700">{cabin.patient}</span></p>
                </div>

                <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors ${
                  cabin.status === 'available' ? 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white' :
                  cabin.status === 'busy' ? 'bg-rose-100 text-rose-700 group-hover:bg-rose-500 group-hover:text-white' : 
                  'bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white'
                }`}>
                  {cabin.status.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── KANBAN BOARD SWIMLANES ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
        {columns.map(col => {
          const colPatients = mappedQueue.filter(p => p.stage === col.id);
          return (
            <div key={col.id} className="bg-slate-50/70 rounded-[2.5rem] p-5 border border-slate-200/60 space-y-4 min-h-[380px] flex flex-col">
              
              {/* Column Badge Header */}
              <div className={`p-3.5 rounded-2xl border ${col.color} flex items-center justify-between font-black text-xs uppercase tracking-wider`}>
                <span>{col.title}</span>
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[11px] shadow-xs">
                  {colPatients.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colPatients.length > 0 ? (
                  colPatients.map(patient => (
                    <div key={patient._id} className="bg-white p-5 rounded-[2rem] border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3 group relative">
                      
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 bg-brand-light text-brand-teal font-mono text-[10px] font-black rounded-lg">
                          {patient.id}
                        </span>
                        {patient.priority === 'Urgent' && (
                          <span className="px-2 py-0.5 bg-rose-500 text-white rounded text-[8px] font-black uppercase animate-pulse">
                            ⚡ URGENT
                          </span>
                        )}
                        {patient.priority === 'Emergency' && (
                          <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[8px] font-black uppercase animate-pulse">
                            🚨 EMERGENCY
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-brand-dark">{patient.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold">{patient.age}Y • {patient.gender} • {patient.doctor}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[9px] font-bold text-slate-400 uppercase">
                        <span>{patient.time}</span>
                        <span className="text-slate-600">{patient.cabin}</span>
                      </div>

                      {/* Action Button */}
                      {col.id !== 'completed' && (
                        <button
                          onClick={() => moveNext(patient)}
                          className="w-full mt-2 py-2 bg-slate-100 hover:bg-brand-teal hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-700 transition-all flex items-center justify-center gap-1 group-hover:shadow-xs"
                        >
                          <span>Move Next</span>
                          <MoveRight className="h-3 w-3" />
                        </button>
                      )}

                      <button
                        onClick={() => setShowPrintModal(patient)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-brand-dark transition-colors"
                        title="Print Thermal Receipt Slip"
                      >
                        <Printer className="h-4 w-4" />
                      </button>

                    </div>
                  ))
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Patients in Stage</p>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* ── WALK-IN REGISTRATION MODAL ── */}
      {showWalkinModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-8 max-w-md w-full border border-slate-100 shadow-2xl space-y-6 animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-light text-brand-teal rounded-xl">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black text-brand-dark font-display">Express Walk-In Register</h3>
              </div>
              <button onClick={() => setShowWalkinModal(false)} className="text-slate-400 hover:text-rose-500 text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleRegisterWalkin} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={walkinForm.name}
                  onChange={(e) => setWalkinForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-brand-dark outline-none focus:border-brand-teal mt-1 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555-0192"
                    value={walkinForm.phone}
                    onChange={(e) => setWalkinForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-brand-dark outline-none focus:border-brand-teal mt-1 font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Age & Gender</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="number"
                      placeholder="Age"
                      value={walkinForm.age}
                      onChange={(e) => setWalkinForm(prev => ({ ...prev, age: e.target.value }))}
                      className="w-16 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-brand-dark outline-none focus:border-brand-teal font-bold"
                    />
                    <select
                      value={walkinForm.gender}
                      onChange={(e) => setWalkinForm(prev => ({ ...prev, gender: e.target.value }))}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-brand-dark outline-none font-bold"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Assigned Practitioner</label>
                <select
                  value={walkinForm.doctor}
                  onChange={(e) => setWalkinForm(prev => ({ ...prev, doctor: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-brand-dark outline-none font-bold mt-1"
                >
                  {doctors.length === 0 ? (
                    <option value="">No available clinicians</option>
                  ) : (
                    doctors.map((doc, idx) => (
                      <option key={doc._id} value={doc.userId?._id}>
                        Dr. {doc.userId?.profile?.firstName} {doc.userId?.profile?.lastName} ({doc.specialization || doc.department} - Cabin {idx + 1})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase">Priority Triage Level</label>
                <select
                  value={walkinForm.priority}
                  onChange={(e) => setWalkinForm(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-brand-dark outline-none font-bold mt-1"
                >
                  <option value="Standard">🟢 Standard Walk-In</option>
                  <option value="Urgent">⚡ Priority / Urgent</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-teal hover:bg-brand-dark text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md mt-2"
              >
                Generate Desk Token & Receipt
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── DOCTOR STATUS EDIT MODAL ── */}
      {editingDoctorStatus && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-8 max-w-md w-full border border-slate-100 shadow-2xl space-y-6 animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-light text-brand-teal rounded-xl">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black text-brand-dark font-display">Update Duty Status</h3>
              </div>
              <button onClick={() => setEditingDoctorStatus(null)} className="text-slate-400 hover:text-rose-500 text-lg font-bold">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Practitioner</p>
                <p className="text-sm font-black text-brand-dark mt-1">
                  Dr. {editingDoctorStatus.userId?.profile?.firstName} {editingDoctorStatus.userId?.profile?.lastName}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{editingDoctorStatus.specialization || editingDoctorStatus.department}</p>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Select Shift Status</label>
                <select
                  value={editingDoctorStatus.dutyStatus || 'available'}
                  onChange={async (e) => {
                    const newStatus = e.target.value;
                    try {
                      const res = await api.patch(`/receptionist/doctors/${editingDoctorStatus._id}/duty-status`, { dutyStatus: newStatus });
                      if (res.data.success) {
                        toast.success('Duty status updated successfully');
                        setEditingDoctorStatus(null);
                        fetchData(); // Reload stats and cabins grid
                      }
                    } catch (err) {
                      toast.error('Failed to update duty status');
                    }
                  }}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xs text-brand-dark outline-none font-bold mt-1 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 transition-all shadow-sm"
                >
                  <option value="available">🟢 Available for Consults</option>
                  <option value="rounds">🟡 On Ward Rounds / Surgery</option>
                  <option value="busy">🔴 Emergency / Do Not Disturb</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CLINICIAN REFERRAL MODAL ── */}
      {referralTarget && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-8 max-w-md w-full border border-slate-100 shadow-2xl space-y-6 animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-light text-brand-teal rounded-xl">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black text-brand-dark font-display">Clinician Handover</h3>
              </div>
              <button onClick={() => setReferralTarget(null)} className="text-slate-400 hover:text-rose-500 text-lg font-bold">✕</button>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500">Select practitioner for <span className="text-brand-dark font-black">{referralTarget.patientName}</span>:</p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {doctors.map((doc, idx) => (
                  <button
                    key={doc._id}
                    onClick={() => handleSelectClinician(doc.userId?._id)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-brand-teal/30 hover:bg-slate-50 transition-all flex items-center justify-between font-bold text-xs"
                  >
                    <div>
                      <p className="text-brand-dark font-black">Dr. {doc.userId?.profile?.firstName} {doc.userId?.profile?.lastName}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{doc.specialization} - Cabin {idx + 1}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── THERMAL RECEIPT PRINT PREVIEW MODAL ── */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full border border-slate-200 shadow-2xl space-y-4 font-mono text-center animate-scale-in">
            <div className="border-b border-dashed border-slate-300 pb-3 space-y-1">
              <h4 className="font-black text-base text-slate-900 uppercase">ORVANTA HEALTHCARE</h4>
              <p className="text-[10px] text-slate-500">Central Clinic Intake Counter #1</p>
              <p className="text-[9px] text-slate-400">{new Date().toLocaleString()}</p>
            </div>

            <div className="py-2 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">TOKEN NUMBER</span>
              <p className="text-4xl font-black text-slate-900 tracking-tight">{showPrintModal.id}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl text-left text-[11px] space-y-1 border border-slate-200/60">
              <p><strong>Patient:</strong> {showPrintModal.name}</p>
              <p><strong>Doctor:</strong> {showPrintModal.doctor}</p>
              <p><strong>Cabin:</strong> {showPrintModal.cabin}</p>
              <p><strong>Time Issued:</strong> {showPrintModal.time}</p>
            </div>

            <div className="flex flex-col items-center justify-center p-2 bg-slate-100 rounded-xl space-y-1">
              <QrCode className="h-16 w-16 text-slate-800" />
              <span className="text-[8px] text-slate-400">Scan at Room Door Scanner</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setShowPrintModal(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  toast.success('Thermal Print command dispatched to Desk Receipt Printer!');
                  setShowPrintModal(null);
                }}
                className="flex-1 py-2.5 bg-brand-dark text-white font-sans font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Printer className="h-3.5 w-3.5" /> Print
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LiveQueueKanban;
