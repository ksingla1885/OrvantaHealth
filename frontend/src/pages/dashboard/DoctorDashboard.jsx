import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, FileText, Clock, AlertCircle, 
  ChevronRight, Activity, Clipboard, Stethoscope,
  Sparkles, Zap, Thermometer, Heart, Pill, ShieldCheck,
  Plus, Search, RefreshCw, CheckCircle2, User, ArrowRight,
  Sliders, Award, ArrowUpRight
} from 'lucide-react';
import api from '../../services/api';
import { formatDistanceToNow, format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import TriagePrescriptionModal from './triage/TriagePrescriptionModal';

const DoctorDashboard = () => {
  const [data, setData] = useState(null);
  const [triageReferrals, setTriageReferrals] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dutyStatus, setDutyStatus] = useState('available');
  const [currentTime, setCurrentTime] = useState(new Date());

  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [statsRes, triageRes] = await Promise.all([
        api.get('/doctor/dashboard-stats'),
        api.get('/triage/doctor/referred')
      ]);

      if (statsRes.data.success) {
        setData(statsRes.data.data);
      }
      if (triageRes.data.success) {
        setTriageReferrals(triageRes.data.data.referred || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to load clinical workspace data');
    } finally {
      setLoading(false);
    }
  };

  const handleTreat = (referral) => {
    setSelectedRecord(referral);
    setShowPrescribeModal(true);
  };

  const getDutyBadgeStyles = () => {
    switch (dutyStatus) {
      case 'rounds':
        return { bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-400', label: 'On Rounds / Surgery' };
      case 'busy':
        return { bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20', dot: 'bg-rose-400', label: 'Emergency / DND' };
      default:
        return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400', label: 'Available for Consults' };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-5">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin"></div>
          <Activity className="absolute inset-0 m-auto h-6 w-6 text-brand-teal animate-pulse" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-black text-brand-dark uppercase tracking-[0.2em] font-display">Initializing Medical Command Center</p>
          <p className="text-xs text-slate-400 font-medium">Synchronizing encrypted triage channels & patient telemetry...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[3rem] p-12 border border-rose-100 shadow-2xl text-center max-w-xl mx-auto space-y-6 my-12 animate-scale-in">
        <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mx-auto text-rose-500 shadow-inner">
          <AlertCircle className="h-10 w-10 stroke-[2]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 font-display">{error}</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Connection to central hospital database failed. Please verify network credentials or retry.
          </p>
        </div>
        <button 
          onClick={fetchStats}
          className="px-8 py-4 bg-brand-teal text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const { stats, recentInteractions } = data || { stats: { todayPatients: 0, totalNetwork: 0, activeScripts: 0 }, recentInteractions: [] };
  const doctorName = user?.profile?.firstName 
    ? `${user.profile.firstName} ${user.profile.lastName || ''}`.trim() 
    : (user?.profile?.lastName || 'Practitioner');

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      
      {/* ── CLINICIAN HERO COMMAND BANNER ── */}
      <div className="relative bg-gradient-to-br from-slate-950 via-[#0a2323] to-[#041a1a] rounded-[3rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden border border-teal-500/20">
        {/* Background Glass Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/15 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Column: Doctor Profile & Greeting */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-teal-300">
                <Sparkles className="h-3.5 w-3.5 text-brand-teal animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Clinical Decision Suite</span>
              </div>
              <span className="text-xs text-teal-200/50 font-mono font-medium">
                {format(currentTime, 'EEEE, MMM dd • hh:mm:ss a')}
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-200">Dr. {doctorName}</span>
              </h1>
              <div className="flex items-center gap-3 text-xs text-teal-100/70 font-medium flex-wrap pt-1">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-teal-200 font-bold">
                  <Stethoscope className="h-3.5 w-3.5 text-brand-teal" />
                  {user?.doctorProfile?.specialization || 'Cardiology & Internal Medicine'}
                </span>
                <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-teal-200/80 font-mono text-[11px]">
                  Wing: {user?.doctorProfile?.department || 'Main Clinical Operations'}
                </span>
                <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-teal-200/80 font-mono text-[11px]">
                  Lic. #{user?.doctorProfile?.licenseNumber || 'MD-84920'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Duty Switcher & Live Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            {/* Interactive Duty Selector */}
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-md border ${getDutyBadgeStyles().bg} shadow-lg transition-all`}>
              <div className={`w-3 h-3 rounded-full ${getDutyBadgeStyles().dot} animate-pulse shadow-sm`} />
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Shift Duty Status</span>
                <select
                  value={dutyStatus}
                  onChange={(e) => setDutyStatus(e.target.value)}
                  className="bg-transparent text-xs font-black uppercase tracking-wider outline-none cursor-pointer text-white"
                >
                  <option value="available" className="bg-slate-900 text-white">🟢 Available for Consults</option>
                  <option value="rounds" className="bg-slate-900 text-white">🟡 On Ward Rounds / Surgery</option>
                  <option value="busy" className="bg-slate-900 text-white">🔴 Emergency / Do Not Disturb</option>
                </select>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={fetchStats}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/10 transition-all shadow-md active:scale-95"
                title="Refresh Clinical Telemetry"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                onClick={() => window.location.href = '/receptionist/triage/queue'}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal hover:bg-teal-400 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <Zap className="h-4 w-4" /> Open Triage Lobby
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── FEATURED NEXT-UP PATIENT HIGHLIGHT CARD ── */}
      {triageReferrals.length > 0 && (
        <div className="relative group bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl overflow-hidden border-2 border-teal-500/30 animate-slide-up">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3.5 py-1.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-full animate-bounce flex items-center gap-1.5 shadow-md">
                  ⚡ PRIORITY PATIENT IN QUEUE
                </span>
                <span className="text-teal-200/70 font-mono text-xs bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  MRN / Triage ID: #{triageReferrals[0].triageId}
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight">
                  {triageReferrals[0].patientName}
                  <span className="text-lg font-medium text-teal-200/60 ml-3">
                    ({triageReferrals[0].age}Y • {triageReferrals[0].gender})
                  </span>
                </h2>
                <p className="text-base text-teal-100/80 italic font-medium max-w-2xl leading-relaxed">
                  "{triageReferrals[0].symptoms}"
                </p>
              </div>

              {/* Patient Vitals & Clinical AI Badges */}
              <div className="flex items-center gap-3 flex-wrap pt-2">
                {/* Fever warning badge */}
                <div className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border ${
                  parseFloat(triageReferrals[0].vitals?.temperature) >= 100
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg shadow-rose-900/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  <Thermometer className="h-4 w-4" />
                  <span>Temp: {triageReferrals[0].vitals?.temperature || '--'}°F</span>
                  {parseFloat(triageReferrals[0].vitals?.temperature) >= 100 && (
                    <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded text-[8px] font-black animate-pulse">HIGH FEVER</span>
                  )}
                </div>

                <div className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Risk Level: {triageReferrals[0].aiAnalysis?.riskScore || '7.5'}/10</span>
                </div>

                <div className="px-4 py-2 bg-brand-teal/30 text-teal-200 border border-brand-teal/40 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>AI: {triageReferrals[0].aiAnalysis?.possibleConditions?.[0] || 'Triage Assessment'}</span>
                </div>
              </div>
            </div>

            {/* Action Callout */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3 shrink-0">
              <button
                onClick={() => handleTreat(triageReferrals[0])}
                className="px-10 py-5 bg-gradient-to-r from-teal-400 to-brand-teal text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Stethoscope className="h-5 w-5 stroke-[2.5]" />
                TREAT PATIENT NOW
              </button>
              <p className="text-[10px] font-black text-teal-200/50 uppercase tracking-widest text-center lg:text-right">
                Referred directly by triage staff
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── CLINICAL METRICS ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Metric 1 */}
        <div className="relative group bg-white rounded-[2.75rem] p-8 border border-slate-100 shadow-premium transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-bl-[5rem] transition-all group-hover:scale-110" />
          
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="55" stroke="currentColor" strokeWidth="12" className="text-brand-teal" fill="transparent" strokeDasharray="345" strokeDashoffset="70" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between h-full">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Today's Schedule</p>
              <p className="text-5xl font-black text-brand-dark font-display tracking-tight">{stats.todayPatients}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Patients Awaiting Consult</span>
              </div>
            </div>
            <div className="p-5 bg-brand-light rounded-[2.25rem] text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all shadow-inner">
              <Calendar className="h-9 w-9 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="relative group bg-white rounded-[2.75rem] p-8 border border-slate-100 shadow-premium transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[5rem] transition-all group-hover:scale-110" />

          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="55" stroke="currentColor" strokeWidth="12" className="text-blue-500" fill="transparent" strokeDasharray="345" strokeDashoffset="95" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between h-full">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Network</p>
              <p className="text-5xl font-black text-brand-dark font-display tracking-tight">{stats.totalNetwork}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Biometric Profiles</span>
              </div>
            </div>
            <div className="p-5 bg-blue-50 rounded-[2.25rem] text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <Users className="h-9 w-9 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="relative group bg-white rounded-[2.75rem] p-8 border border-slate-100 shadow-premium transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-bl-[5rem] transition-all group-hover:scale-110" />

          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="55" stroke="currentColor" strokeWidth="12" className="text-violet-500" fill="transparent" strokeDasharray="345" strokeDashoffset="45" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between h-full">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Assets</p>
              <p className="text-5xl font-black text-brand-dark font-display tracking-tight">{stats.activeScripts}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest">Scripts Authorized</span>
              </div>
            </div>
            <div className="p-5 bg-violet-50 rounded-[2.25rem] text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-inner">
              <FileText className="h-9 w-9 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* ── ALL REFERRED TRIAGE TRANSFERS ── */}
      {triageReferrals.length > 1 && (
        <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-premium space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-dark text-white rounded-2xl shadow-md">
                <AlertCircle className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-brand-dark font-display">Triage Referrals Waiting Room</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">({triageReferrals.length}) Patients awaiting clinical response</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/receptionist/triage/queue'}
              className="hidden sm:flex items-center gap-2 text-xs font-black text-brand-teal hover:text-brand-dark transition-colors uppercase tracking-widest"
            >
              View Full Lobby <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {triageReferrals.slice(1).map((referral) => (
              <div 
                key={referral._id} 
                className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/70 rounded-[2.5rem] p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-brand-light text-brand-teal font-black flex items-center justify-center text-base shadow-inner">
                      {referral.patientName[0]}
                    </div>
                    <div>
                      <p className="font-black text-brand-dark text-base">{referral.patientName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{referral.age}y • {referral.gender}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                    referral.aiAnalysis?.urgencyLevel === 'Emergency' ? 'bg-rose-500 text-white' : 
                    referral.aiAnalysis?.urgencyLevel === 'Urgent' ? 'bg-amber-500 text-white' : 'bg-brand-teal text-white'
                  }`}>
                    {referral.aiAnalysis?.urgencyLevel || 'Standard'}
                  </span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1 text-brand-teal"><Activity className="h-3 w-3" /> AI Scan</span>
                    <span className="text-rose-500">Risk: {referral.aiAnalysis?.riskScore}/10</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 italic">"{referral.symptoms}"</p>
                </div>

                <button
                  onClick={() => handleTreat(referral)}
                  className="w-full py-3.5 bg-brand-dark hover:bg-brand-teal text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                >
                  <Stethoscope className="h-4 w-4" /> Start Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN WORKSPACE AREA ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Interaction Log / Clinical Timeline */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-premium overflow-hidden relative space-y-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal to-brand-dark opacity-50" />
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-brand-dark font-display">Recent Clinical Timeline</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Verified patient interaction logs</p>
            </div>
            <button 
              onClick={() => window.location.href = '/dashboard/archive'}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-brand-dark hover:text-white rounded-full text-[10px] font-black transition-all group border border-slate-100"
            >
              ARCHIVED VAULT
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-4">
            {recentInteractions.length > 0 ? (
              recentInteractions.map((interaction) => (
                <div key={interaction.id} className="flex items-center gap-6 p-6 rounded-[2.25rem] bg-slate-50/60 hover:bg-slate-50 border border-slate-100/70 hover:border-brand-teal/20 transition-all group relative">
                  <div className="h-14 w-14 rounded-2xl bg-brand-teal/10 text-brand-teal flex-shrink-0 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all shadow-inner font-black">
                    <Stethoscope className="h-7 w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-base font-black text-brand-dark">Patient Recovery Encounter</p>
                      <span className="px-3 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase rounded-full tracking-widest">Verified</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1 truncate">
                      Patient: <span className="text-brand-dark font-bold font-display">{interaction.patientName}</span>
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-wrap">
                      <span className="flex items-center gap-1 text-brand-teal"><Activity className="h-3 w-3" /> {interaction.procedure}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatDistanceToNow(new Date(interaction.time))} ago</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/doctor/appointments'}
                    className="p-3.5 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-400 group-hover:text-brand-teal group-hover:border-brand-teal/30 transition-all hover:scale-110"
                    title="View Encounters"
                  >
                    <Clipboard className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200 space-y-3">
                <Activity className="h-10 w-10 text-slate-300 mx-auto" />
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No recent clinical logs detected</p>
              </div>
            )}
          </div>
        </div>

        {/* ── QUICK LAUNCHPAD SIDEBAR ── */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-gradient-to-br from-brand-dark to-slate-900 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex-1 group border border-white/5 space-y-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-teal/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform duration-1000 group-hover:scale-150" />
            
            <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
              <div>
                <h3 className="text-2xl font-black font-display mb-6">Clinician Actions</h3>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => window.location.href = '/doctor/appointments'}
                    className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.75rem] transition-all group/btn"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-3 bg-brand-teal rounded-xl shadow-md">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Access Schedule</p>
                        <p className="text-[9px] text-teal-100/40 uppercase tracking-widest font-black">View Queue & Slots</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </button>

                  <button 
                    onClick={() => window.location.href = '/doctor/prescriptions'}
                    className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.75rem] transition-all group/btn"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-3 bg-blue-500 rounded-xl shadow-md">
                        <Clipboard className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Write Prescription</p>
                        <p className="text-[9px] text-teal-100/40 uppercase tracking-widest font-black">New Clinical Script</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </button>

                  <button 
                    onClick={() => window.location.href = '/dashboard/patients'}
                    className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[1.75rem] transition-all group/btn"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-3 bg-emerald-500 rounded-xl shadow-md">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Patient Directory</p>
                        <p className="text-[9px] text-teal-100/40 uppercase tracking-widest font-black">Encrypted Search</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-[2.25rem] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-teal-300">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Medical Compliance</span>
                </div>
                <p className="text-xs text-teal-100/60 leading-relaxed font-medium italic">
                  "All prescriptions authored within this portal undergo real-time cryptographic audit logging for HIPAA compliance."
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ── TRIAGE PRESCRIPTION MODAL ── */}
      {showPrescribeModal && selectedRecord && (
        <TriagePrescriptionModal 
          isOpen={showPrescribeModal} 
          onClose={() => setShowPrescribeModal(false)}
          record={selectedRecord}
          onSuccess={fetchStats}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
