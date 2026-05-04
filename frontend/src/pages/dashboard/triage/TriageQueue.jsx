import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Clock, User, AlertTriangle, ShieldCheck, 
  ArrowRight, Heart, Pill, ExternalLink, RefreshCw,
  Search, Filter, ChevronRight, Zap, Target, Thermometer,
  DollarSign, Stethoscope, CheckCircle, Play, LogOut, CheckCircle2
} from 'lucide-react';
import api from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import TriagePrescriptionModal from './TriagePrescriptionModal';
import TriageReferralModal from './TriageReferralModal';
import BillUploadModal from '../../../components/BillUploadModal';

const TriageQueue = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [filter, setFilter] = useState(user?.role === 'doctor' ? 'my-referrals' : 'pending');
  const [referredToMeCount, setReferredToMeCount] = useState(0);

  useEffect(() => {
    fetchQueue();
  }, [filter]);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const endpoint = filter === 'my-referrals' 
        ? `/triage/doctor/referred` 
        : `/triage/queue?status=${filter}`;
        
      const response = await api.get(endpoint);
      if (response.data.success) {
        const data = filter === 'my-referrals' ? response.data.data.referred : response.data.data.queue;
        setQueue(data);
        
        // Also fetch count if not in my-referrals
        if (filter !== 'my-referrals' && user?.role === 'doctor') {
            const countRes = await api.get('/triage/doctor/referred');
            if (countRes.data.success) setReferredToMeCount(countRes.data.data.referred.length);
        }
      }
    } catch (error) {
      console.error('Fetch queue failed:', error);
      toast.error('Failed to load triage queue');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Emergency': return 'bg-rose-500 text-white';
      case 'Urgent': return 'bg-amber-400 text-brand-dark';
      default: return 'bg-emerald-500 text-white';
    }
  };

  const openPrescribeModal = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const openBillModal = (record) => {
    setSelectedRecord(record);
    setShowBillModal(true);
  };

  const openReferModal = (record) => {
    setSelectedRecord(record);
    setShowReferModal(true);
  };

  const handlePrescriptionSuccess = () => {
    fetchQueue();
    toast.success('Patient status updated to RESOLVED');
  };

  const handleCheckIn = async (id) => {
    try {
      const res = await api.post(`/triage/check-in/${id}`);
      if (res.data.success) {
        toast.success('Consultation STARTED');
        fetchQueue();
      }
    } catch { toast.error('Check-in failed'); }
  };

  const handleCheckOut = async (id) => {
    try {
      const res = await api.post(`/triage/check-out/${id}`);
      if (res.data.success) {
        toast.success('Consultation COMPLETED');
        fetchQueue();
      }
    } catch { toast.error('Check-out failed'); }
  };

  return (
    <div className="space-y-12 pb-20 animate-fade-in px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-5 w-5 text-brand-teal" />
            <span className="text-[11px] font-black text-brand-teal uppercase tracking-[0.4em]">Active Queue Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark font-display tracking-tight leading-none mb-2">
            Triage <span className="italic text-brand-teal">Lobby</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-lg">
            Real-time monitoring of AI-analyzed patient intake. Prioritize care based on urgency levels and clinical risk factors.
          </p>
        </div>

        <div className="flex bg-slate-50 p-1.5 rounded-[2rem] border border-slate-100 shadow-sm">
          {user?.role !== 'receptionist' && (
            <button 
              onClick={() => setFilter('resolved')}
              className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'resolved' ? 'bg-white text-brand-dark shadow-md' : 'text-slate-400 hover:text-brand-dark'}`}
            >
              Resolved Cases
            </button>
          )}
          {user?.role === 'doctor' && (
            <button 
                onClick={() => setFilter('my-referrals')}
                className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all relative ${filter === 'my-referrals' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-400 hover:text-brand-dark'}`}
            >
                My Referrals
                {referredToMeCount > 0 && filter !== 'my-referrals' && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[8px] text-white animate-bounce">
                        {referredToMeCount}
                    </span>
                )}
            </button>
          )}
          <button 
            onClick={fetchQueue}
            className="p-3 ml-2 bg-brand-dark text-white rounded-full hover:rotate-180 transition-transform duration-700 active:scale-95 shadow-lg"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <div className="loading-spinner"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Medical Flow...</p>
        </div>
      ) : queue.length === 0 ? (
        <div className="py-40 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400 gap-6">
          <Activity className="h-16 w-16 opacity-10" />
          <div className="text-center">
            <p className="text-2xl font-black font-display text-slate-300">Lobby Cleared</p>
            <p className="text-[10px] font-black uppercase tracking-widest mt-2">Zero pending assessments found</p>
          </div>
          <button 
            onClick={() => navigate('/receptionist/triage/intake')}
            className="mt-4 px-10 py-5 bg-brand-teal text-white rounded-[1.75rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Start New Intake
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {queue.map((item) => (
            <div key={item._id} className="relative group perspective-1000">
              <div className="absolute inset-0 bg-brand-teal/5 rounded-[3.5rem] rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              
              <div className="relative bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-premium hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-2 h-full opacity-0 group-hover:opacity-100 transition-opacity ${getUrgencyColor(item.aiAnalysis.urgencyLevel).split(' ')[0]}`}></div>
                
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-50 shadow-inner group-hover:scale-110 transition-transform">
                      <User className="h-6 w-6 text-brand-dark" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-brand-dark font-display leading-none">{item.patientName}</h3>
                      <div className="flex items-center gap-2 mt-1.5 ">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.age}y • {item.gender}</p>
                        {item.status === 'referred' && (
                          <span className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                             <CheckCircle size={10} /> Handed Over
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter shadow-sm ${getUrgencyColor(item.aiAnalysis.urgencyLevel)}`}>
                    {item.aiAnalysis.urgencyLevel}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-3.5 w-3.5 text-brand-teal" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Symptoms</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 line-clamp-3 italic">"{item.symptoms}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-brand-dark rounded-[2.25rem] text-white">
                      <p className="text-[9px] font-black text-teal-100/40 uppercase tracking-widest mb-1.5">Risk Score</p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-black font-display leading-none">{item.aiAnalysis.riskScore}</span>
                        <span className="text-[10px] font-bold text-teal-100/20 uppercase">/10.0</span>
                      </div>
                    </div>
                    <div className="p-6 bg-white border border-slate-100 rounded-[2.25rem] shadow-inner">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Vitals Sync</p>
                      <div className="flex gap-2">
                        <Thermometer className="h-3.5 w-3.5 text-rose-500" />
                        <span className="text-xs font-black text-brand-dark">{item.vitals?.temperature || '--'}°F</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3">AI Condition Scan</p>
                    <div className="flex flex-wrap gap-2">
                      {item.aiAnalysis.possibleConditions?.map((cond, idx) => (
                        <span key={idx} className="px-3.5 py-1.5 bg-brand-light text-brand-teal text-[9px] font-black uppercase tracking-wider rounded-lg border border-brand-teal/5">
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {item.status === 'referred' && item.doctorReferred?.profile && (
                   <div className="mt-6 flex items-center gap-3 p-4 bg-brand-light rounded-2xl border border-brand-teal/10">
                      <div className="h-8 w-8 rounded-lg bg-brand-teal flex items-center justify-center text-white font-black text-[10px]">
                         {item.doctorReferred.profile.firstName?.[0] || 'D'}{item.doctorReferred.profile.lastName?.[0] || 'C'}
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Assigned Clinician</p>
                         <p className="text-[10px] font-bold text-brand-dark">
                           Dr. {item.doctorReferred.profile.firstName || 'Medical'} {item.doctorReferred.profile.lastName || 'Practitioner'}
                         </p>
                      </div>
                   </div>
                )}

                <div className="mt-10 pt-8 border-t border-slate-50 flex gap-4">
                  {/* Receptionist View: Only REFER */}
                  {user?.role === 'receptionist' && (
                    <button 
                      onClick={() => openReferModal(item)}
                      disabled={item.status !== 'pending'}
                      className={`flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl ${
                        item.status !== 'pending'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50' 
                        : 'bg-white border-2 border-slate-100 text-brand-dark hover:border-brand-teal hover:text-brand-teal hover:-translate-y-1'
                      }`}
                    >
                      <Stethoscope className="h-4 w-4" />
                      REFER
                    </button>
                  )}

                  {/* Doctor View: Sequential Check-In -> (Check-Out & Prescribe) */}
                  {user?.role === 'doctor' && (
                    <>
                      {item.status === 'referred' && (
                        <button 
                          onClick={() => handleCheckIn(item._id)}
                          className="flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl bg-brand-teal text-white hover:bg-teal-600 hover:-translate-y-1"
                        >
                          <Play className="h-4 w-4" />
                          CHECK-IN
                        </button>
                      )}
                      
                      {(item.status === 'in-consultation' || item.status === 'completed') && (
                        <div className="flex-1 flex gap-3">
                          {item.status === 'in-consultation' ? (
                            <button 
                              onClick={() => handleCheckOut(item._id)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl bg-amber-500 text-white hover:bg-amber-600 hover:-translate-y-1"
                            >
                              <LogOut className="h-4 w-4" />
                              CHECK-OUT
                            </button>
                          ) : (
                            <div className="flex-1 flex items-center justify-center gap-2 px-4 py-5 bg-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-200">
                               <CheckCircle className="h-4 w-4" /> DONE
                            </div>
                          )}
                          
                          <button 
                            onClick={() => openPrescribeModal(item)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl bg-brand-dark text-white hover:bg-brand-teal hover:-translate-y-1"
                          >
                            <Pill className="h-4 w-4" />
                            PRESCRIBE
                          </button>
                        </div>
                      )}

                      {item.status === 'resolved' && (
                        <div className="flex-1 flex items-center justify-center gap-2 p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle2 className="h-4 w-4" /> Session Resolved
                        </div>
                      )}
                    </>
                  )}

                  {item.status === 'resolved' && user?.role === 'receptionist' && (
                    <button 
                      onClick={() => openBillModal(item)}
                      className="h-14 w-14 flex items-center justify-center bg-brand-teal text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg group/bill"
                      title="Generate Walk-in bill"
                    >
                      <DollarSign className="h-5 w-5 group-hover/bill:rotate-12" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedRecord && (
        <TriagePrescriptionModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          record={selectedRecord}
          onSuccess={handlePrescriptionSuccess}
        />
      )}
      {showBillModal && selectedRecord && (
        <BillUploadModal 
          isOpen={showBillModal} 
          onClose={() => setShowBillModal(false)}
          triageRecord={selectedRecord}
          onSuccess={fetchQueue}
        />
      )}
      {showReferModal && selectedRecord && (
        <TriageReferralModal 
          isOpen={showReferModal} 
          onClose={() => setShowReferModal(false)}
          record={selectedRecord}
          onSuccess={fetchQueue}
        />
      )}
    </div>
  );
};

export default TriageQueue;
