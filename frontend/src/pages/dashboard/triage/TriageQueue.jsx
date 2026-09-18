import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Clock, User, AlertTriangle, ShieldCheck, 
  ArrowRight, Heart, Pill, ExternalLink, RefreshCw,
  Search, Filter, ChevronRight, Zap, Target, Thermometer,
  DollarSign, Stethoscope, CheckCircle, Play, LogOut, CheckCircle2,
  Sparkles, AlertCircle, UserCheck, Check, Users, ShieldAlert, UserPlus,
  Flame, FileText, ArrowUpRight
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
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
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
        setQueue(data || []);
        
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

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'Emergency': 
        return { 
          bg: 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-lg shadow-rose-500/30 border border-rose-400/30 animate-pulse', 
          text: 'EMERGENCY', 
          icon: '🚨',
          stripe: 'bg-gradient-to-r from-rose-600 via-red-500 to-rose-600'
        };
      case 'Urgent': 
        return { 
          bg: 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 border border-amber-300', 
          text: 'URGENT', 
          icon: '⚡',
          stripe: 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400'
        };
      default: 
        return { 
          bg: 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 border border-emerald-400/30', 
          text: 'STANDARD', 
          icon: '🟢',
          stripe: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500'
        };
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

  // Filter queue by search & urgency
  const filteredQueue = queue.filter((item) => {
    const matchesSearch = 
      item.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptoms?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.triageId?.toString().includes(searchQuery);

    const matchesUrgency = 
      urgencyFilter === 'all' || 
      item.aiAnalysis?.urgencyLevel?.toLowerCase() === urgencyFilter.toLowerCase();

    return matchesSearch && matchesUrgency;
  });

  // Calculate live telemetry metrics
  const totalCount = queue.length;
  const emergencyCount = queue.filter(i => i.aiAnalysis?.urgencyLevel === 'Emergency').length;
  const urgentCount = queue.filter(i => i.aiAnalysis?.urgencyLevel === 'Urgent').length;
  const inConsultCount = queue.filter(i => i.status === 'in-consultation').length;
  const pendingHandoverCount = queue.filter(i => i.status === 'pending').length;

  const isDoctor = user?.role === 'doctor';
  const isReceptionist = user?.role === 'receptionist';

  return (
    <div className="space-y-8 pb-20 animate-fade-in px-4 md:px-8 max-w-[1600px] mx-auto">
      
      {/* ── TOP TELEMETRY METRICS SUMMARY BAR ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Total Patients */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-slate-200/80 shadow-premium hover:shadow-xl transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Stream</p>
            <p className="text-3xl font-black text-brand-dark font-display">{totalCount}</p>
            <p className="text-[10px] font-semibold text-slate-400">Active Lobby Assessments</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 2: Emergency Alerts */}
        <div className={`backdrop-blur-xl rounded-3xl p-5 border transition-all flex items-center justify-between group ${
          emergencyCount > 0 
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-950 shadow-rose-100' 
            : 'bg-white/80 border-slate-200/80 shadow-premium'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Emergency Alerts</span>
              {emergencyCount > 0 && <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />}
            </div>
            <p className="text-3xl font-black text-rose-600 font-display">{emergencyCount}</p>
            <p className="text-[10px] font-semibold text-slate-500">Require Critical Priority</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
            <ShieldAlert className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 3: Urgent / In-Consultation */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-slate-200/80 shadow-premium hover:shadow-xl transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">
              {isDoctor ? 'Active Consultations' : 'Urgent Cases'}
            </p>
            <p className="text-3xl font-black text-amber-500 font-display">
              {isDoctor ? inConsultCount : urgentCount}
            </p>
            <p className="text-[10px] font-semibold text-slate-400">
              {isDoctor ? 'In Progress Sessions' : 'High Priority Intake'}
            </p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 4: Role Focus (My Referrals / Pending Handover) */}
        <div className="bg-gradient-to-br from-brand-dark to-[#08332b] text-white rounded-3xl p-5 border border-teal-500/20 shadow-xl flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-teal-300">
              {isDoctor ? 'Assigned to Me' : 'Pending Referral'}
            </p>
            <p className="text-3xl font-black text-white font-display">
              {isDoctor ? (filter === 'my-referrals' ? totalCount : referredToMeCount) : pendingHandoverCount}
            </p>
            <p className="text-[10px] font-semibold text-teal-200/70">
              {isDoctor ? 'Direct Patient Referrals' : 'Awaiting Doctor Assignment'}
            </p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md text-teal-300 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
            <Stethoscope className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER & WORKFLOW CONTROL BAR ── */}
      <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6 relative overflow-hidden">
        
        {/* Glow decorative background pill */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-medium border border-teal-100">
                <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                Live Telemetry Stream
              </span>

              {/* Role Context Pill */}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDoctor 
                  ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                  : 'bg-blue-50 text-blue-700 border border-blue-100'
              }`}>
                {isDoctor ? '👨‍⚕️ Doctor Desk' : '📋 Receptionist Control'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight leading-tight">
              Triage Lobby
            </h1>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Real-time telemetry stream of AI-assessed patient intake. Prioritize clinical interventions by risk score & urgency level.
            </p>
          </div>

          {/* Right Top Area: Status Tab Selector & Receptionist Quick Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            
            {isReceptionist && (
              <button 
                onClick={() => navigate('/receptionist/triage/intake')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <UserPlus className="h-4 w-4 text-brand-teal" />
                New Intake Assessment
              </button>
            )}

            {/* Status Tab Selector */}
            <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex-wrap gap-1">
              <button 
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'pending' 
                  ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Pending Queue
              </button>
              
              {isDoctor && (
                <button 
                  onClick={() => setFilter('my-referrals')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    filter === 'my-referrals' 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  My Referrals
                  {referredToMeCount > 0 && filter !== 'my-referrals' && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white shadow-sm animate-bounce">
                      {referredToMeCount}
                    </span>
                  )}
                </button>
              )}

              {user?.role !== 'receptionist' && (
                <button 
                  onClick={() => setFilter('resolved')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === 'resolved' 
                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Resolved Cases
                </button>
              )}

              <button 
                onClick={fetchQueue}
                className="p-2 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm ml-1"
                title="Refresh Stream"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

          </div>

        </div>

        {/* Search & Urgency Filter Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 relative z-10">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient name, ID, or symptoms..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition-all shadow-sm"
            />
            {searchQuery ? (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold hover:text-slate-600 p-1">
                ✕
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                /
              </span>
            )}
          </div>

          {/* Urgency Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            <span className="text-xs font-medium text-slate-500 mr-1">Urgency Level:</span>
            {[
              { id: 'all', label: 'All Cases' },
              { id: 'emergency', label: '🚨 Emergency' },
              { id: 'urgent', label: '⚡ Urgent' },
              { id: 'standard', label: '🟢 Standard' }
            ].map((u) => (
              <button
                key={u.id}
                onClick={() => setUrgencyFilter(u.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  urgencyFilter === u.id
                  ? 'bg-brand-teal text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ── QUEUE DISPLAY ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-[2.5rem] p-8 border border-slate-200/80 shadow-premium animate-pulse space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                    <div className="h-3 w-20 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="h-6 w-24 bg-slate-200 rounded-xl" />
              </div>
              <div className="h-20 bg-slate-100 rounded-2xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-slate-200 rounded-2xl" />
                <div className="h-20 bg-slate-200 rounded-2xl" />
              </div>
              <div className="h-12 bg-slate-200 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : filteredQueue.length === 0 ? (
        <div className="py-24 bg-white/80 backdrop-blur-xl rounded-[3rem] border-2 border-dashed border-slate-200/80 flex flex-col items-center justify-center text-slate-400 gap-5 shadow-premium">
          <div className="p-6 bg-slate-50 rounded-3xl shadow-inner">
            <Activity className="h-12 w-12 text-brand-teal/40 animate-pulse stroke-[1.5]" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-black font-display text-slate-800">Lobby Clear</p>
            <p className="text-xs font-semibold text-slate-400 max-w-sm">
              No triage assessments match your selected filter criteria ({filter} queue, {urgencyFilter} urgency).
            </p>
          </div>
          {isReceptionist && (
            <button 
              onClick={() => navigate('/receptionist/triage/intake')}
              className="mt-2 px-8 py-4 bg-gradient-to-r from-brand-teal to-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:from-teal-600 hover:to-brand-dark transition-all shadow-xl shadow-brand-teal/20 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              + Start New Patient Intake
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQueue.map((item) => {
            const urgency = getUrgencyBadge(item.aiAnalysis?.urgencyLevel);
            const isFever = parseFloat(item.vitals?.temperature) >= 100;
            const riskScore = item.aiAnalysis?.riskScore || 5.0;

            return (
              <div 
                key={item._id} 
                className="group relative bg-white rounded-[2.5rem] p-7 md:p-8 border border-slate-200/80 shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Urgency Color Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-2.5 ${urgency.stripe}`} />

                <div>
                  {/* Card Header Row */}
                  <div className="flex justify-between items-start mb-6 pt-2">
                    <div className="flex items-center gap-3.5">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-dark to-[#08332b] text-white flex items-center justify-center text-xl font-black shadow-lg shadow-brand-dark/20 shrink-0 group-hover:scale-105 transition-transform border border-white/10">
                        {item.patientName?.[0] || 'P'}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-brand-dark font-display leading-tight group-hover:text-brand-teal transition-colors">
                          {item.patientName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.age}Y • {item.gender}</span>
                          <span className="text-[9px] font-black text-brand-teal bg-brand-light px-2 py-0.5 rounded-full border border-brand-teal/20 font-mono">
                            #{item.triageId}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm ${urgency.bg}`}>
                      <span>{urgency.icon}</span>
                      <span>{urgency.text}</span>
                    </span>
                  </div>

                  {/* Assigned Doctor Pill (If Referred) */}
                  {item.status === 'referred' && item.doctorReferred?.profile && (
                    <div className="mb-6 flex items-center gap-3 p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl shadow-sm">
                      <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md">
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-black text-emerald-800 uppercase tracking-widest">Handed Over Clinician</p>
                        <p className="text-xs font-bold text-slate-900 truncate">
                          Dr. {item.doctorReferred.profile.firstName || ''} {item.doctorReferred.profile.lastName || ''}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Symptoms Card */}
                  <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-100 space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-brand-teal" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chief Symptoms</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 italic leading-relaxed line-clamp-3">
                      "{item.symptoms}"
                    </p>
                  </div>

                  {/* Dual Metric Box: Risk Score & Vitals Sync */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    
                    {/* Risk Score */}
                    <div className="p-4 bg-gradient-to-br from-brand-dark to-[#08332b] rounded-2xl text-white space-y-1 shadow-md border border-white/10">
                      <p className="text-[9px] font-black text-teal-200/70 uppercase tracking-widest">Risk Score</p>
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-black font-display leading-none">{riskScore}</span>
                        <span className="text-[10px] font-bold text-teal-200/40 uppercase">/10</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            riskScore >= 7 ? 'bg-rose-500' : riskScore >= 4 ? 'bg-amber-400' : 'bg-emerald-400'
                          }`} 
                          style={{ width: `${(riskScore / 10) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Vitals Sync Box */}
                    <div className={`p-4 rounded-2xl border shadow-sm space-y-1 transition-all ${
                      isFever 
                        ? 'bg-rose-50/90 border-rose-200 shadow-rose-100/50' 
                        : 'bg-white border-slate-200/80'
                    }`}>
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Vitals Sync</p>
                        {isFever && (
                          <span className="text-[8px] font-black uppercase text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                            <Flame className="h-2.5 w-2.5" /> FEVER
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <Thermometer className={`h-4 w-4 ${isFever ? 'text-rose-600 animate-bounce' : 'text-emerald-500'}`} />
                        <span className={`text-base font-black ${isFever ? 'text-rose-600 font-mono' : 'text-brand-dark'}`}>
                          {item.vitals?.temperature || '--'}°F
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-medium truncate">
                        BP: {item.vitals?.bp || item.vitals?.bloodPressure || 'N/A'} • Pulse: {item.vitals?.pulse || item.vitals?.pulseRate || 'N/A'}
                      </p>
                    </div>

                  </div>

                  {/* AI Conditions Tags */}
                  <div className="space-y-2 mb-6">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">AI Diagnostic Scan</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.aiAnalysis?.possibleConditions?.map((cond, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-[9px] font-black uppercase tracking-wider rounded-xl border border-brand-teal/20"
                        >
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── CARD FOOTER & ACTIONS ── */}
                <div className="pt-5 border-t border-slate-100 mt-2">
                  
                  {/* Receptionist View: REFER */}
                  {isReceptionist && (
                    <button 
                      onClick={() => openReferModal(item)}
                      disabled={item.status !== 'pending'}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
                        item.status !== 'pending'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                        : 'bg-brand-dark text-white hover:bg-brand-teal hover:shadow-brand-teal/20 hover:-translate-y-0.5 active:scale-95'
                      }`}
                    >
                      <Stethoscope className="h-4 w-4" />
                      {item.status !== 'pending' ? 'HANDED OVER' : 'REFER TO CLINICIAN'}
                    </button>
                  )}

                  {/* Doctor View: Sequential CHECK-IN -> PRESCRIBE */}
                  {isDoctor && (
                    <div className="flex gap-2">
                      {item.status === 'referred' && (
                        <button 
                          onClick={() => handleCheckIn(item._id)}
                          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl bg-gradient-to-r from-brand-teal to-teal-600 text-white hover:from-teal-600 hover:to-brand-dark hover:-translate-y-0.5 active:scale-95"
                        >
                          <Play className="h-4 w-4" />
                          CHECK-IN PATIENT
                        </button>
                      )}

                      {(item.status === 'in-consultation' || item.status === 'completed') && (
                        <>
                          {item.status === 'in-consultation' ? (
                            <button 
                              onClick={() => handleCheckOut(item._id)}
                              className="px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md bg-amber-500 text-white hover:bg-amber-600 active:scale-95"
                              title="Complete Consultation Session"
                            >
                              <LogOut className="h-4 w-4" />
                            </button>
                          ) : (
                            <div className="px-4 py-4 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase border border-emerald-200 flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" /> DONE
                            </div>
                          )}

                          <button 
                            onClick={() => openPrescribeModal(item)}
                            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl bg-brand-dark text-white hover:bg-brand-teal hover:-translate-y-0.5 active:scale-95"
                          >
                            <Pill className="h-4 w-4" />
                            PRESCRIBE
                          </button>
                        </>
                      )}

                      {item.status === 'resolved' && (
                        <div className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200 text-xs font-black uppercase tracking-widest">
                          <CheckCircle2 className="h-4 w-4" /> Session Resolved
                        </div>
                      )}
                    </div>
                  )}

                  {/* Receptionist Bill Upload Button for Resolved Cases */}
                  {item.status === 'resolved' && isReceptionist && (
                    <button 
                      onClick={() => openBillModal(item)}
                      className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:from-teal-600 hover:to-brand-dark transition-all shadow-md active:scale-95"
                    >
                      <DollarSign className="h-4 w-4" /> Generate Walk-In Bill
                    </button>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ── MODALS ── */}
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
