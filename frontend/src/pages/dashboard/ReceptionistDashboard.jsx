import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, DollarSign, FileText, AlertCircle, 
  ChevronRight, ArrowRight, Activity, CreditCard, Clipboard,
  Stethoscope, Zap, Target
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LiveQueueKanban from '../../components/dashboard/LiveQueueKanban';

const ReceptionistDashboard = () => {
  const [stats, setStats] = useState({
    todaysAppointments: 0,
    newPatients: 0,
    pendingBills: 0,
    labReports: 0,
    triageQueue: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];

      // Fetch data in parallel for efficiency
      const [appointmentsRes, billsRes, labReportsRes, triageRes] = await Promise.all([
        api.get('/receptionist/appointments', { params: { date: today } }),
        api.get('/receptionist/bills'),
        api.get('/receptionist/lab-reports'),
        api.get('/triage/queue')
      ]);

      const todaysAppointments = appointmentsRes.data.data?.appointments?.length || 0;
      const pendingBills = billsRes.data.data?.bills?.filter(b => b.status === 'pending')?.length || 0;
      const labReports = labReportsRes.data.data?.labReports?.length || 0;
      const triageQueue = triageRes.data.data?.queue?.length || 0;

      setStats({
        todaysAppointments,
        newPatients: 0, // Simplified for now
        pendingBills,
        labReports,
        triageQueue
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="loading-spinner"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Initializing Controller...</p>
      </div>
    );
  }

  const metrics = [
    { label: "Today's Queue", value: stats.todaysAppointments, icon: Calendar, color: "text-brand-teal", bg: "bg-brand-light", border: "border-brand-teal/20" },
    { label: "Triage Lobby", value: stats.triageQueue, icon: Target, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { label: "Pending Dues", value: stats.pendingBills, icon: DollarSign, iconColor: "text-rose-500", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
    { label: "Lab Analytics", value: stats.labReports, icon: Activity, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Front Desk Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-[1px] w-8 bg-brand-teal"></span>
            <span className="text-[11px] font-black text-brand-teal uppercase tracking-widest">Front Desk Operations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark font-display tracking-tight leading-none mb-2">
            Reception <span className="italic text-brand-teal">Portal</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md">
            Management of patient intake, billing, and clinical scheduling.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-premium border border-slate-50">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Operational Integrity: 98%</span>
        </div>
      </div>

      {/* Reception Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric, i) => (
          <div key={i} className="relative group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 overflow-hidden">
            <div className={`absolute top-0 right-0 w-20 h-20 ${metric.bg} opacity-40 rounded-bl-3xl`}></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bg} ${metric.color} border border-black/5`}>
                  <metric.icon className="h-5 w-5 stroke-[2.2]" />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold ${metric.color} font-display leading-tight`}>{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Patient Queue Kanban Board */}
      <LiveQueueKanban />

      {/* Action Center & Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-slate-900 opacity-60"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Front Desk Command Center</h2>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Real-time facility operations & intake</p>
              </div>
              <button 
                onClick={fetchDashboardStats}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 rounded-xl text-xs font-bold transition-all text-slate-600"
              >
                <span>Synchronize</span>
                <Activity className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: 'Appointments', desc: 'Secure patient bookings and scheduling.', icon: Calendar, path: '/receptionist/appointments', color: 'text-teal-600', bg: 'bg-teal-50' },
                { title: 'Triage Lobby', desc: 'Monitor the clinical queue and AI analysis.', icon: Target, path: '/receptionist/triage/queue', color: 'text-amber-600', bg: 'bg-amber-50' },
                { title: 'Billing Center', desc: 'Process invoices and revenue collection.', icon: DollarSign, path: '/receptionist/bills', color: 'text-rose-600', bg: 'bg-rose-50' },
                { title: 'Lab Reports', desc: 'Clinical result distribution and tracking.', icon: FileText, path: '/receptionist/lab-reports', color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Staff Mapping', desc: 'Clinician availability and ward shifts.', icon: Users, path: '/receptionist/doctor-availability', color: 'text-violet-600', bg: 'bg-violet-50' },
                { title: 'Fast-track Intake', desc: 'Quickly admit walk-ins with AI analysis.', icon: Zap, path: '/receptionist/triage/intake', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((action) => (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="group relative flex flex-col items-start p-5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-all duration-200 hover:border-teal-500/40 hover:shadow-sm text-left"
                >
                  <div className={`p-2.5 rounded-lg ${action.bg} mb-3.5 border border-black/5`}>
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors mb-1">{action.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{action.desc}</p>
                  <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-teal-600 group-hover:text-teal-700">
                    <span>Open Module</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Launch & Status Sidebar */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-xl border border-slate-800 relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500 opacity-10 rounded-full blur-2xl -mr-20 -mt-20"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                <Zap className="h-4 w-4 text-teal-400" />
                <span>Rapid Actions</span>
              </h3>
              
              <div className="space-y-2.5">
                <button 
                  onClick={() => navigate('/receptionist/triage/intake')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500 rounded-lg text-slate-950">
                      <Stethoscope className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">Triage Intake</p>
                      <p className="text-[10px] text-teal-300/60 uppercase tracking-wider font-semibold">AI Assessment</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>

                <button 
                  onClick={() => navigate('/dashboard/patients')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-600/40 rounded-lg text-white">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">Find Patient</p>
                      <p className="text-[10px] text-teal-300/60 uppercase tracking-wider font-semibold">Search Records</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>

                <button 
                  onClick={() => navigate('/receptionist/bills')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500 rounded-lg text-white">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">New Invoice</p>
                      <p className="text-[10px] text-teal-300/60 uppercase tracking-wider font-semibold">Billing Desk</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>

                <button 
                  onClick={() => navigate('/receptionist/appointments')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg text-white">
                      <Clipboard className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">Doctor Schedule</p>
                      <p className="text-[10px] text-teal-300/60 uppercase tracking-wider font-semibold">Shift Roster</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/30" />
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="p-3.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Front Desk Memo</p>
                  </div>
                  <p className="text-xs text-teal-100/70 leading-relaxed">
                    Prioritize urgent triage referrals and walk-ins during morning peak admission hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;

