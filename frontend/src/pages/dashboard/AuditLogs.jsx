import React, { useState, useEffect } from 'react';
import { Shield, Filter, Download, Search, AlertTriangle, Info, CheckCircle2, Clock, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuditLogs();
  }, [severityFilter]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const url = severityFilter ? `/admin/audit-logs?severity=${severityFilter}` : '/admin/audit-logs';
      const response = await api.get(url);
      if (response.data.success) {
        setLogs(response.data.data.logs || []);
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
      toast.error('Failed to load system audit trail');
    } finally {
      setLoading(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `hipaa_audit_log_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Audit log JSON exported');
  };

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.performedBy?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200">
            <AlertTriangle className="h-3 w-3" />
            CRITICAL
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-amber-50 text-amber-600 border border-amber-200">
            <Info className="h-3 w-3" />
            WARNING
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-teal-50 text-brand-teal border border-teal-200">
            <CheckCircle2 className="h-3 w-3" />
            INFO
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-dark transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Command Center
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-dark text-white rounded-2xl shadow-lg">
              <Shield className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-brand-dark font-display">HIPAA Forensic Audit Log</h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Complete Cryptographic Event Record</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAuditLogs}
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:text-brand-teal transition-all shadow-sm"
            title="Refresh Audit Feed"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-5 py-3 bg-brand-dark text-white hover:bg-brand-teal rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md"
          >
            <Download className="h-4 w-4" />
            Export Audit Trail
          </button>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-premium flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search action, details, or user email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/60 rounded-2xl text-xs font-medium focus:outline-none focus:border-brand-teal transition-all"
          />
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mr-2">Filter Severity:</span>
          {[
            { label: 'All Events', value: '' },
            { label: 'Info', value: 'info' },
            { label: 'Warning', value: 'warning' },
            { label: 'Critical', value: 'critical' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setSeverityFilter(item.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                severityFilter === item.value
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-premium overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Decrypting Audit Feed...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <Shield className="h-12 w-12 text-slate-200 mx-auto" />
            <p className="text-sm font-bold text-slate-500">No audit events match your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 pb-4">
                  <th className="py-4 px-4">Timestamp</th>
                  <th className="py-4 px-4">Action</th>
                  <th className="py-4 px-4">Performed By</th>
                  <th className="py-4 px-4">Target User</th>
                  <th className="py-4 px-4">Details</th>
                  <th className="py-4 px-4">Severity</th>
                  <th className="py-4 px-4">Origin IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{new Date(log.createdAt).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-brand-dark font-mono text-[11px]">
                      {log.action}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-slate-800">{log.performedBy?.profile ? `${log.performedBy.profile.firstName} ${log.performedBy.profile.lastName}` : 'System Admin'}</p>
                        <p className="text-[10px] text-slate-400">{log.performedBy?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {log.targetUser ? (
                        <div>
                          <p className="font-bold text-slate-800">{log.targetUser.profile ? `${log.targetUser.profile.firstName} ${log.targetUser.profile.lastName}` : 'User'}</p>
                          <p className="text-[10px] text-slate-400">{log.targetUser.email}</p>
                        </div>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 max-w-xs text-slate-600 leading-relaxed truncate" title={log.details}>
                      {log.details}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getSeverityBadge(log.severity)}
                    </td>
                    <td className="py-4 px-4 font-mono text-[10px] text-slate-400">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;
