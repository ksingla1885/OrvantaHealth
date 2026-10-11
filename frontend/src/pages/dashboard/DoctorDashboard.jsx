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

const DoctorDashboard = () => {
  const [data, setData] = useState(null);
  const [triageReferrals, setTriageReferrals] = useState([]);
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
      if (!data) {
        setLoading(true);
      }
      const [statsRes, triageRes] = await Promise.all([
        api.get('/doctor/dashboard-stats'),
        api.get('/triage/doctor/referred')
      ]);

      if (statsRes.data.success) {
        setData(statsRes.data.data);
        if (statsRes.data.data.stats?.dutyStatus) {
          setDutyStatus(statsRes.data.data.stats.dutyStatus);
        }
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

  const getDutyBadgeStyles = () => {
    switch (dutyStatus) {
      case 'rounds':
        return { bg: 'bg-amber-50 border-amber-200 text-amber-800', dot: 'bg-amber-500', label: 'On Rounds / Surgery' };
      case 'busy':
        return { bg: 'bg-rose-50 border-rose-200 text-rose-800', dot: 'bg-rose-500', label: 'Emergency / DND' };
      default:
        return { bg: 'bg-emerald-50 border-emerald-200 text-emerald-800', dot: 'bg-emerald-500', label: 'Available for Consults' };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-3 border-teal-500/20 border-t-teal-600 rounded-full animate-spin"></div>
          <Activity className="absolute inset-0 m-auto h-5 w-5 text-teal-600 animate-pulse" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">Initializing Clinical Workstation</p>
          <p className="text-xs text-slate-400">Loading patient queues and clinical telemetry...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-rose-200 shadow-sm text-center max-w-lg mx-auto space-y-4 my-12 animate-scale-in">
        <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center mx-auto text-rose-500">
          <AlertCircle className="h-7 w-7" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-slate-900">{error}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Connection to central hospital database failed. Please verify network credentials or retry.
          </p>
        </div>
        <button 
          onClick={fetchStats}
          className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
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
    <div className="space-y-8 animate-fade-in pb-16 font-sans">
      
      {/* ── CLINICIAN HERO COMMAND BANNER ── */}
      <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-slate-200/90 shadow-xs overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        {/* Left Column: Doctor Profile & Greeting */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800">
              <Sparkles className="h-3 w-3 text-teal-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Clinical Decision Suite</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {format(currentTime, 'EEEE, MMM dd • hh:mm a')}
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, <span className="text-teal-700">Dr. {doctorName}</span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap pt-0.5">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <Stethoscope className="h-3.5 w-3.5 text-teal-600" />
                {user?.doctorProfile?.specialization || 'General & Internal Medicine'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
                Department: {user?.doctorProfile?.department || 'Outpatient Consultations'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
                Lic: #{user?.doctorProfile?.licenseNumber || 'MD-84920'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Duty Switcher & Live Controls */}
        <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
          
          {/* Shift Duty Status Badge */}
          <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${getDutyBadgeStyles().bg} transition-all`}>
            <div className={`w-2 h-2 rounded-full ${getDutyBadgeStyles().dot}`} />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">Shift Status</span>
              <span className="text-xs font-bold leading-tight">
                {getDutyBadgeStyles().label}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={fetchStats}
              className="p-2.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-lg border border-slate-200 transition-colors shadow-xs"
              title="Refresh Workspace Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => window.location.href = '/receptionist/triage/queue'}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
            >
              <Zap className="h-3.5 w-3.5 text-teal-400" /> Open Triage Lobby
            </button>
          </div>
        </div>
      </div>

      {/* ── FEATURED NEXT-UP PATIENT HIGHLIGHT CARD ── */}
      {triageReferrals.length > 0 && (
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 md:p-8 text-white shadow-md overflow-hidden border border-slate-700/80 animate-slide-up">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-md flex items-center gap-1 shadow-xs">
                  ⚡ PRIORITY PATIENT IN QUEUE
                </span>
                <span className="text-teal-200/80 font-mono text-xs bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">
                  MRN #{triageReferrals[0].triageId}
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                  {triageReferrals[0].patientName}
                  <span className="text-sm font-normal text-teal-200/70 ml-2">
                    ({triageReferrals[0].age}Y • {triageReferrals[0].gender})
                  </span>
                </h2>
                <p className="text-sm text-teal-100/90 italic font-medium max-w-2xl leading-relaxed">
                  "{triageReferrals[0].symptoms}"
                </p>
              </div>

              {/* Patient Vitals & Clinical AI Badges */}
              <div className="flex items-center gap-2.5 flex-wrap pt-1">
                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                  parseFloat(triageReferrals[0].vitals?.temperature) >= 100
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  <Thermometer className="h-3.5 w-3.5" />
                  <span>Temp: {triageReferrals[0].vitals?.temperature || '--'}°F</span>
                  {parseFloat(triageReferrals[0].vitals?.temperature) >= 100 && (
                    <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded text-[8px] font-bold animate-pulse">FEVER</span>
                  )}
                </div>

                <div className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Risk Level: {triageReferrals[0].aiAnalysis?.riskScore || '7.5'}/10</span>
                </div>

                <div className="px-3 py-1.5 bg-teal-500/20 text-teal-200 border border-teal-500/30 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  <span>AI: {triageReferrals[0].aiAnalysis?.possibleConditions?.[0] || 'Triage Assessment'}</span>
                </div>
              </div>
            </div>

            {/* Action Callout */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2 shrink-0">
              <button
                onClick={() => window.location.href = '/receptionist/triage/queue'}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Stethoscope className="h-4 w-4 stroke-[2.5]" />
                Treat Patient Now
              </button>
              <p className="text-[10px] text-teal-200/60 uppercase tracking-wider text-center lg:text-right font-medium">
                Referred by triage intake
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── CLINICAL METRICS ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Today's Schedule</span>
            <div className="p-2.5 bg-teal-50 rounded-xl text-teal-700">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.todayPatients}</p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-semibold text-teal-700">Patients Awaiting Consult</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Patient Network</span>
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-700">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.totalNetwork}</p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-blue-700">Registered Patient Profiles</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Clinical Assets</span>
            <div className="p-2.5 bg-violet-50 rounded-xl text-violet-700">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{stats.activeScripts}</p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold text-violet-700">Issued Prescriptions</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ALL REFERRED TRIAGE TRANSFERS ── */}
      {triageReferrals.length > 1 && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-xs">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Triage Referrals Waiting Room</h2>
                <p className="text-xs text-slate-500">({triageReferrals.length}) Patients awaiting clinical response</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/receptionist/triage/queue'}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors uppercase tracking-wider"
            >
              View Full Lobby <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {triageReferrals.slice(1).map((referral) => (
              <div 
                key={referral.id} 
                className="bg-slate-50/70 hover:bg-white border border-slate-200 rounded-xl p-5 transition-all hover:shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-sm border border-teal-100">
                      {referral.patientName[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{referral.patientName}</p>
                      <p className="text-[11px] text-slate-400">{referral.age}y • {referral.gender}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    referral.aiAnalysis?.urgencyLevel === 'Emergency' ? 'bg-rose-500 text-white' : 
                    referral.aiAnalysis?.urgencyLevel === 'Urgent' ? 'bg-amber-500 text-white' : 'bg-teal-600 text-white'
                  }`}>
                    {referral.aiAnalysis?.urgencyLevel || 'Standard'}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span className="flex items-center gap-1 text-teal-700"><Activity className="h-3 w-3" /> AI Scan</span>
                    <span className="text-rose-600">Risk: {referral.aiAnalysis?.riskScore}/10</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 italic">"{referral.symptoms}"</p>
                </div>

                <button
                  onClick={() => window.location.href = '/receptionist/triage/queue'}
                  className="w-full py-2 bg-slate-900 hover:bg-teal-700 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Stethoscope className="h-3.5 w-3.5" /> Start Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN WORKSPACE AREA ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interaction Log / Clinical Timeline */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Clinical Timeline</h2>
              <p className="text-xs text-slate-500">Verified patient interaction logs</p>
            </div>
            <button 
              onClick={() => window.location.href = '/doctor/completed'}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors border border-slate-200"
            >
              Examined Patients
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentInteractions.length > 0 ? (
              recentInteractions.map((interaction) => (
                <div key={interaction.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 transition-all">
                  <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-700 shrink-0 flex items-center justify-center border border-teal-100">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{interaction.patientName}</p>
                      <span className="px-2 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold rounded-full">Verified</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1 text-teal-700 font-medium"><Activity className="h-3 w-3" /> {interaction.procedure}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-slate-400" /> {formatDistanceToNow(new Date(interaction.time))} ago</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/doctor/appointments'}
                    className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500 hover:text-teal-700 hover:border-teal-300 transition-colors shadow-xs"
                    title="View Encounters"
                  >
                    <Clipboard className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 space-y-2">
                <Activity className="h-8 w-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-500">No recent clinical encounters recorded today</p>
              </div>
            )}
          </div>
        </div>

        {/* ── QUICK LAUNCHPAD SIDEBAR ── */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden flex-1 border border-slate-800 space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Clinician Actions</h3>
              
              <div className="space-y-2.5">
                <button 
                  onClick={() => window.location.href = '/doctor/appointments'}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">Access Schedule</p>
                      <p className="text-[10px] text-slate-400">View Appointments & Queue</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>

                <button 
                  onClick={() => window.location.href = '/doctor/prescriptions'}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                      <Clipboard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">Prescription Pad</p>
                      <p className="text-[10px] text-slate-400">Issued Clinical Prescriptions</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>

                <button 
                  onClick={() => window.location.href = '/dashboard/patients'}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">Patient Directory</p>
                      <p className="text-[10px] text-slate-400">EMR Health Records</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-teal-400">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Clinical Standards</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                All prescriptions and medical records authored within this suite are cryptographically logged for audit compliance.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DoctorDashboard;
