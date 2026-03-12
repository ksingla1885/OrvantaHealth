import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, Users, Calendar, DollarSign, Activity,
  Download, Filter, ChevronDown, X
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const DetailedAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportType, setExportType] = useState('users');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [overviewRes, statsRes, deptRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/admin/system-overview'),
        api.get('/admin/department-stats')
      ]);

      if (overviewRes.data.success) {
        setAnalytics(overviewRes.data.data);
      }

      if (statsRes.data.success) {
        const trends = statsRes.data.data.appointmentTrends || [];
        const revenue = statsRes.data.data.revenueTrends || [];

        // Merge or format trends for the charts
        const formattedData = trends.map(t => {
          const rev = revenue.find(r => r._id === t._id);
          return {
            day: new Date(t._id).toLocaleDateString('en-US', { weekday: 'short' }),
            appointments: t.count,
            revenue: rev ? rev.total : 0,
            patients: t.count // Fallback or placeholder for real patient trend if separate
          };
        });
        setChartData(formattedData);
      }

      if (deptRes.data.success) {
        const deptStats = deptRes.data.data.departmentStats || [];
        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];
        const formattedDeptData = deptStats.map((dept, index) => ({
          name: dept._id || 'General',
          value: dept.count,
          color: colors[index % colors.length]
        }));
        setDepartmentData(formattedDeptData);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to fetch real-time analytics data');
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = () => {
    // No longer needed as we fetch real data
  };

  const appointmentStatusData = analytics?.appointmentStats?.map(stat => ({
    name: stat._id,
    value: stat.count,
    color: stat._id === 'completed' ? '#10b981' :
      stat._id === 'pending' ? '#f59e0b' :
        stat._id === 'cancelled' ? '#ef4444' : '#6b7280'
  })) || [];

  const [departmentData, setDepartmentData] = useState([]);

  const handleExport = async (e) => {
    e.preventDefault();
    setExporting(true);
    try {
      const response = await api.get(`/admin/export?type=${exportType}&format=${exportFormat}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${exportType}_report_${new Date().toISOString().split('T')[0]}.${exportFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setShowExportModal(false);
      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export report');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detailed Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into hospital operations</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input appearance-none pr-10"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className="btn btn-secondary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="card group">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
              <p className="text-3xl font-black text-brand-dark font-display leading-none">
                <span className="text-sm font-bold text-slate-300 mr-1 italic">₹</span>
                {(analytics?.totalRevenue || 0).toLocaleString()}
              </p>
              <div className="flex items-center mt-3 gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Syncing Live</span>
              </div>
            </div>
            <div className="bg-brand-light p-4 rounded-2xl group-hover:rotate-12 transition-transform">
              <DollarSign className="h-6 w-6 text-brand-teal" />
            </div>
          </div>
        </div>

        <div className="card group">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Patients</p>
              <p className="text-3xl font-black text-brand-dark font-display">
                {analytics?.totalPatients || 0}
              </p>
              <div className="flex items-center mt-3 gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse"></div>
                <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Active Records</span>
              </div>
            </div>
            <div className="bg-brand-light p-4 rounded-2xl group-hover:-rotate-12 transition-transform">
              <Users className="h-6 w-6 text-brand-teal" />
            </div>
          </div>
        </div>

        <div className="card group">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Today's Load</p>
              <p className="text-3xl font-black text-brand-dark font-display">
                {analytics?.todayAppointments || 0}
              </p>
              <div className="flex items-center mt-3 gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Daily Queue</span>
              </div>
            </div>
            <div className="bg-brand-light p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6 text-brand-teal" />
            </div>
          </div>
        </div>

        <div className="card group">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Receptionists</p>
              <p className="text-3xl font-black text-brand-dark font-display">
                {analytics?.totalReceptionists || 0}
              </p>
              <div className="flex items-center mt-3 gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest">Reception Team</span>
              </div>
            </div>
            <div className="bg-brand-light p-4 rounded-2xl group-hover:translate-y-1 transition-transform">
              <Activity className="h-6 w-6 text-brand-teal" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointments Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="appointments"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Appointments"
              />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#10b981"
                strokeWidth={2}
                name="New Patients"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {appointmentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Doctor</h3>
        {analytics?.mostConsultedDoctor?.userId?.profile ? (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-lg font-medium text-blue-600">
                  {analytics.mostConsultedDoctor.userId.profile.firstName?.charAt(0)}
                  {analytics.mostConsultedDoctor.userId.profile.lastName?.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900">
                  Dr. {analytics.mostConsultedDoctor.userId.profile.firstName} {analytics.mostConsultedDoctor.userId.profile.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {analytics.mostConsultedDoctor.specialization}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-600">
                {analytics.mostConsultedDoctor.consultationFee || 0}
              </p>
              <p className="text-sm text-gray-500">Consultations this month</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No data available</p>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-scale-in">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-brand-dark font-display">Export Report</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="h-6 w-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleExport} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
                    Report Category
                  </label>
                  <select
                    value={exportType}
                    onChange={(e) => setExportType(e.target.value)}
                    className="input w-full"
                  >
                    <option value="users">System Users</option>
                    <option value="patients">Patient Records</option>
                    <option value="doctors">Doctor Directory</option>
                    <option value="receptionists">Receptionist Team</option>
                    <option value="appointments">Appointment History</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
                    File Format
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setExportFormat('csv')}
                      className={`flex-1 p-4 rounded-2xl border-2 transition-all font-bold ${
                        exportFormat === 'csv'
                          ? 'border-brand-teal bg-brand-light text-brand-teal shadow-lg'
                          : 'border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => setExportFormat('pdf')}
                      className={`flex-1 p-4 rounded-2xl border-2 transition-all font-bold ${
                        exportFormat === 'pdf'
                          ? 'border-brand-teal bg-brand-light text-brand-teal shadow-lg'
                          : 'border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setExportFormat('json')}
                      className={`flex-1 p-4 rounded-2xl border-2 transition-all font-bold ${
                        exportFormat === 'json'
                          ? 'border-brand-teal bg-brand-light text-brand-teal shadow-lg'
                          : 'border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      JSON
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={exporting}
                    className="btn btn-primary w-full py-4 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center"
                  >
                    {exporting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        <span>Download {exportType} Report</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedAnalytics;
