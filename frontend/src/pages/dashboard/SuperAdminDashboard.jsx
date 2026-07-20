import React, { useState, useEffect } from 'react';
import {
  Users, UserPlus, Calendar, DollarSign, TrendingUp,
  Activity, ArrowRight, Shield, Zap, Bell, Clock,
  ChevronRight, Database, Globe, Lock, Download, Search, BedDouble, FileText,
  PieChart as PieIcon, BarChart2, Filter, RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import CommandPalette from '../../components/CommandPalette';
import BedTelemetry from '../../components/dashboard/BedTelemetry';

const SuperAdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [systemOverview, setSystemOverview] = useState(null);
  const [deptStats, setDeptStats] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [timeRange, setTimeRange] = useState('7');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchAllDashboardData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [timeRange]);

  const fetchAllDashboardData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, overviewRes, deptRes, logsRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get(`/admin/system-overview?days=${timeRange}`),
        api.get('/admin/department-stats'),
        api.get('/admin/audit-logs?limit=5')
      ]);

      if (analyticsRes.data.success) setAnalytics(analyticsRes.data.data);
      if (overviewRes.data.success) setSystemOverview(overviewRes.data.data);
      if (deptRes.data.success) setDeptStats(deptRes.data.data.departmentStats || []);
      if (logsRes.data.success) setRecentLogs(logsRes.data.data.logs || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await api.get('/admin/export?type=audit&format=pdf', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `system_audit_${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Audit report downloaded successfully');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download audit report');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-brand-dark uppercase tracking-tighter">
            Orvanta
          </div>
        </div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Initializing Analytics Engine...</p>
      </div>
    );
  }

  // Generate real date slots for selected time horizon (e.g. past 7 days)
  const rangeDays = parseInt(timeRange) || 7;
  const dateList = [];
  for (let i = rangeDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dateList.push({ dateStr, label });
  }

  // Map real database revenue and appointment totals onto date timeline
  const dbRevenueMap = {};
  (systemOverview?.revenueTrends || []).forEach(r => {
    dbRevenueMap[r._id] = r.total || 0;
  });

  const dbAptMap = {};
  (systemOverview?.appointmentTrends || []).forEach(a => {
    dbAptMap[a._id] = a.count || 0;
  });

  const displayChartData = dateList.map(({ dateStr, label }) => ({
    date: label,
    Revenue: dbRevenueMap[dateStr] || (analytics?.totalRevenue && dateStr === new Date().toISOString().split('T')[0] ? analytics.totalRevenue : 0),
    Appointments: dbAptMap[dateStr] || 0
  }));

  // User Role Distribution Data from Database
  const totalPatientsCount = analytics?.totalPatients || 0;
  const totalDoctorsCount = analytics?.totalDoctors || 0;
  const totalReceptionistsCount = analytics?.totalReceptionists || 0;

  const roleDistributionData = [
    { name: 'Patients', value: totalPatientsCount, color: '#0d9488' },
    { name: 'Doctors', value: totalDoctorsCount, color: '#2563eb' },
    { name: 'Receptionists', value: totalReceptionistsCount, color: '#d97706' },
  ].filter(item => item.value > 0);

  // Color palette for distinct department lines
  const DEPARTMENT_COLORS = ['#0d9488', '#8b5cf6', '#e11d48', '#2563eb', '#d97706', '#4f46e5', '#10b981'];

  // Extract list of unique departments with color mapping from real DB doctor records
  const departmentSeries = deptStats.map((d, index) => ({
    name: (d._id || 'Unassigned').charAt(0).toUpperCase() + (d._id || 'Unassigned').slice(1),
    key: d._id || 'Unassigned',
    count: d.count || 0,
    color: DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]
  })).filter(d => d.count > 0);

  // Build multi-line dataset mapping each department across date timeline
  const departmentLineData = dateList.map(({ label }) => {
    const entry = { date: label };
    departmentSeries.forEach(dept => {
      entry[dept.name] = dept.count;
    });
    return entry;
  });

  const stats = [
    {
      name: 'Total Patients',
      value: analytics?.totalPatients || 0,
      icon: Users,
      color: 'from-emerald-400 to-emerald-600',
      shadow: 'shadow-emerald-200',
      label: 'registered profiles'
    },
    {
      name: 'Total Doctors',
      value: analytics?.totalDoctors || 0,
      icon: UserPlus,
      color: 'from-blue-400 to-blue-600',
      shadow: 'shadow-blue-200',
      label: 'medical staff'
    },
    {
      name: "Today's Appointments",
      value: analytics?.todayAppointments || 0,
      icon: Calendar,
      color: 'from-amber-400 to-amber-600',
      shadow: 'shadow-amber-200',
      label: 'active queue'
    },
    {
      name: 'Total Revenue',
      value: `₹${(analytics?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-rose-400 to-rose-600',
      shadow: 'shadow-rose-200',
      label: 'gross billing'
    },
    {
      name: 'System Health',
      value: '99.9%',
      icon: Activity,
      color: 'from-brand-teal to-brand-dark',
      shadow: 'shadow-teal-100',
      label: 'uptime metrics'
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Command Palette Modal */}
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />

      {/* Compact Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-dark p-5 md:py-6 md:px-8 max-w-5xl mx-auto text-white shadow-xl group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal opacity-10 rounded-full -mr-20 -mt-20 blur-2xl transition-transform duration-1000 group-hover:scale-110"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              <Zap className="h-3 w-3 text-brand-teal fill-brand-teal" />
              <span className="text-[9px] font-black uppercase tracking-widest text-teal-100">SuperAdmin Command Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight leading-tight">
              Welcome Back, <span className="text-brand-teal italic">{(user?.profile?.lastName || 'Admin')}</span>
            </h1>

            {/* Universal Search & Command Palette Button */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-xs font-bold transition-all text-white group/btn"
            >
              <Search className="h-3.5 w-3.5 text-brand-teal" />
              <span>Universal Command Search</span>
              <kbd className="px-1.5 py-0.5 bg-black/40 rounded text-[9px] font-mono text-teal-200 border border-white/10 group-hover/btn:bg-brand-teal group-hover/btn:text-white transition-colors">
                Ctrl + K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-4 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-teal-100/40 mb-0.5">Cluster Time</p>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand-teal" />
                <span className="text-lg font-black font-display tabular-nums">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 self-center"></div>
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-teal-100/40 mb-0.5">Date</p>
              <p className="text-xs font-bold">
                {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className={`relative group bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-premium transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-[4rem] group-hover:opacity-10 transition-opacity`}></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} ${stat.shadow} shadow-lg text-white`}>
                    <Icon className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Growth</span>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-black">+14%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-black text-brand-dark font-display leading-none">{stat.value}</p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 italic mt-2">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- ANALYTICS COMMAND CENTER SECTION --- */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-brand-dark font-display">Executive Analytics Suite</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Revenue, Patient Flow & Staff Inflow Telemetry</p>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm">
            <Filter className="h-4 w-4 text-brand-teal ml-2" />
            <span className="text-[10px] font-black uppercase text-slate-400 mr-2">Time Horizon:</span>
            {[
              { label: '7 Days', val: '7' },
              { label: '30 Days', val: '30' },
              { label: '90 Days', val: '90' }
            ].map((t) => (
              <button
                key={t.val}
                onClick={() => setTimeRange(t.val)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timeRange === t.val
                    ? 'bg-brand-teal text-white shadow-md'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics Visual Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue & Appointment Growth Area Chart (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 border border-slate-100 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-brand-dark font-display">Revenue & Appointment Inflow</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Financial & Appointment Queue Trajectory</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-brand-teal"></div>
                  <span className="text-slate-600">Revenue (₹)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-slate-600">Appointments</span>
                </div>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorApt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '1rem', color: '#fff', border: 'none' }}
                    itemStyle={{ color: '#5eead4', fontSize: '12px' }}
                  />
                  <Area yAxisId="left" type="natural" dataKey="Revenue" stroke="#0d9488" strokeWidth={3.5} fillOpacity={1} fill="url(#colorRev)" dot={{ r: 4, fill: '#0d9488' }} />
                  <Area yAxisId="right" type="natural" dataKey="Appointments" stroke="#2563eb" strokeWidth={3.5} fillOpacity={1} fill="url(#colorApt)" dot={{ r: 4, fill: '#2563eb' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Roles & Population Donut Chart (1 Col) */}
          <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-premium flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-brand-dark font-display">User Role Demographics</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Account Distribution</p>
                </div>
                <PieIcon className="h-5 w-5 text-brand-teal" />
              </div>

              <div className="h-56 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {roleDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '1rem', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-brand-dark">{analytics?.totalUsers || roleDistributionData.reduce((a, b) => a + b.value, 0)}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Accounts</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              {roleDistributionData.map((r) => (
                <div key={r.name} className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }}></div>
                    <span className="text-slate-700">{r.name}</span>
                  </div>
                  <span className="text-brand-dark font-mono">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Visual Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Multi-Department Wavy Line Chart (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 border border-slate-100 shadow-premium">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-brand-dark font-display">Departmental Staff & Activity Lines</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Separate Wavy Line Telemetry Per Department</p>
              </div>

              {/* Department Color Legend Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {departmentSeries.map((dept) => (
                  <div key={dept.name} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/60 rounded-full text-[10px] font-bold text-slate-700">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }}></div>
                    <span>{dept.name} ({dept.count})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-64 w-full">
              {departmentSeries.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                  <TrendingUp className="h-8 w-8 text-slate-300" />
                  <p className="text-xs font-bold">No active department doctor data recorded.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={departmentLineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '1rem', color: '#fff', border: 'none' }} />
                    <Legend />
                    {departmentSeries.map((dept) => (
                      <Line
                        key={dept.name}
                        type="natural"
                        dataKey={dept.name}
                        stroke={dept.color}
                        strokeWidth={3.5}
                        dot={{ r: 4, fill: dept.color, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 7 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Quick Action Navigation Launcher (1 Col) */}
          <div className="bg-gradient-to-br from-brand-dark to-slate-900 text-white rounded-[3rem] p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full -mr-12 -mt-12 blur-xl"></div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-teal-200 mb-4">
                <Shield className="h-3.5 w-3.5 text-brand-teal" />
                Administrative Access
              </div>
              <h3 className="text-2xl font-black font-display mb-2">Deep Data Analytics</h3>
              <p className="text-xs text-teal-100/70 leading-relaxed mb-6">
                Export custom PDF/CSV financial statements, departmental reports, or detailed patient enrollment statistics.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard/analytics')}
                className="w-full py-3.5 bg-brand-teal hover:bg-teal-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Open Detailed Analytics Hub
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all"
              >
                <Download className="h-4 w-4" />
                {downloading ? 'Generating PDF...' : 'Download Executive Report'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- TELEMETRY & SYSTEM OPERATIONS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Launchpad Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal to-brand-dark"></div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-brand-dark font-display">Mission Control Operations</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Core Administrative Modules</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Staff Deployment',
                  desc: 'Onboard new medical personnel to the facility cluster.',
                  icon: UserPlus,
                  path: '/dashboard/create-staff',
                  color: 'text-brand-teal'
                },
                {
                  title: 'Personnel Matrix',
                  desc: 'Manage existing medical and administrative teams.',
                  icon: Users,
                  path: '/dashboard/staff',
                  color: 'text-brand-dark'
                },
                {
                  title: 'HIPAA Audit Logs',
                  desc: 'Inspect complete system audit trail & administrative events.',
                  icon: FileText,
                  path: '/dashboard/audit-logs',
                  color: 'text-amber-500'
                },
                {
                  title: 'Security & Lockdown',
                  desc: 'Session management and emergency system lockdown.',
                  icon: Lock,
                  path: '/dashboard/security',
                  color: 'text-rose-500'
                },
                {
                  title: 'Clinical Database',
                  desc: 'Access encrypted patient records and histories.',
                  icon: Activity,
                  path: '/dashboard/patients',
                  color: 'text-emerald-500'
                },
                {
                  title: 'Archived Dossiers',
                  desc: 'Inspect offboarded doctor and staff records.',
                  icon: Shield,
                  path: '/dashboard/archive',
                  color: 'text-purple-500'
                },
              ].map((action) => (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="group relative flex flex-col items-start p-8 bg-white hover:bg-brand-dark border border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 text-left"
                >
                  <div className={`p-4 rounded-2xl bg-slate-50 group-hover:bg-white/10 transition-colors mb-6`}>
                    <action.icon className={`h-6 w-6 ${action.color} group-hover:text-brand-teal`} />
                  </div>
                  <h4 className="text-lg font-black text-brand-dark group-hover:text-white transition-colors font-display mb-2">{action.title}</h4>
                  <p className="text-xs text-slate-400 group-hover:text-teal-100/60 leading-relaxed transition-colors mb-6">{action.desc}</p>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-brand-teal group-hover:text-white uppercase tracking-widest">
                    Initialize Module
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Embedded Ward & ICU Bed Telemetry */}
          <BedTelemetry />
        </div>

        {/* Live System Audit Stream Sidebar (1 Col) */}
        <div className="space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-premium h-full flex flex-col relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-brand-dark font-display">System Audit Logs</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Live Event Stream</p>
                </div>
                <button
                  onClick={() => navigate('/dashboard/audit-logs')}
                  className="p-2 hover:bg-slate-100 rounded-xl text-brand-teal transition-colors"
                  title="View Full Audit Logs"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {recentLogs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No recent audit logs available.</p>
                ) : (
                  recentLogs.map((log, i) => (
                    <div key={log._id || i} className="flex gap-4 group relative">
                      {i !== recentLogs.length - 1 && <div className="absolute left-5 top-10 bottom-[-1.5rem] w-px bg-slate-100"></div>}
                      <div className={`h-10 w-10 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-[10px] ${
                        log.severity === 'critical' ? 'bg-rose-50 text-rose-600' :
                        log.severity === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-teal-50 text-brand-teal'
                      } transition-transform group-hover:scale-110`}>
                        <Shield className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5 overflow-hidden">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-black text-brand-dark truncate">{log.action}</p>
                          <span className="text-[9px] font-bold text-slate-300 uppercase whitespace-nowrap">
                            {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">{log.details}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-auto pt-10">
              <div className="p-8 bg-brand-light/50 rounded-[2.5rem] border border-teal-50 text-center relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full -mr-8 -mt-8 rotate-12 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <p className="text-xs font-black text-brand-dark mb-4 tracking-tight uppercase">System Audit Engine</p>
                  <p className="text-[10px] text-slate-500 mb-6 leading-relaxed">Generate a comprehensive forensic audit report of all system interactions.</p>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                    className="w-full py-4 bg-brand-dark text-white rounded-2xl shadow-xl hover:shadow-brand-dark/20 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {downloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Finalizing PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download PDF Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
