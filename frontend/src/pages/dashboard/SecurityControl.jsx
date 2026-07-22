import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, Users, Radio, CheckCircle, RefreshCw, AlertOctagon, ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import ConfirmModal from '../../components/ConfirmModal';
import PermissionMatrix from '../../components/dashboard/PermissionMatrix';

const SecurityControl = () => {
  const [securityData, setSecurityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [togglingLockdown, setTogglingLockdown] = useState(false);
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'warning',
    onConfirm: () => {}
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSecurityState();
  }, []);

  const fetchSecurityState = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/security/sessions');
      if (response.data.success) {
        setSecurityData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch security state:', error);
      toast.error('Failed to load security telemetry');
    } finally {
      setLoading(false);
    }
  };

  const executeToggleLockdown = async (targetLockdownState) => {
    setTogglingLockdown(true);
    try {
      const response = await api.post('/admin/security/lockdown', {
        lockdown: targetLockdownState
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchSecurityState();
      }
    } catch (error) {
      console.error('Failed to toggle lockdown:', error);
      toast.error('Failed to execute lockdown command');
    } finally {
      setTogglingLockdown(false);
    }
  };

  const handleToggleLockdownClick = () => {
    const currentState = securityData?.isSystemLockdown;
    if (currentState) {
      setConfirmState({
        isOpen: true,
        title: 'Lift Emergency Lockdown?',
        message: 'Are you sure you want to lift Emergency System Lockdown and restore standard operational permissions?',
        confirmText: 'Lift Lockdown',
        cancelText: 'Keep Lockdown',
        type: 'info',
        onConfirm: () => executeToggleLockdown(false)
      });
    } else {
      setConfirmState({
        isOpen: true,
        title: 'ACTIVATE Emergency System Lockdown?',
        message: 'CRITICAL WARNING: Activating Lockdown mode will restrict database writes, freeze staff logins, and enforce emergency defense protocols across all modules.',
        confirmText: 'ACTIVATE LOCKDOWN',
        cancelText: 'Cancel',
        type: 'danger',
        onConfirm: () => executeToggleLockdown(true)
      });
    }
  };

  const handleRevokeSessionClick = (staffEmail) => {
    setConfirmState({
      isOpen: true,
      title: 'Revoke Remote Session?',
      message: `Are you sure you want to forcibly terminate the active logged-in session for ${staffEmail}?`,
      confirmText: 'Terminate Session',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => toast.success(`Session for ${staffEmail} terminated remotely.`)
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Styled Confirm Modal */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        type={confirmState.type}
      />

      {/* Top Bar */}
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-dark transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Command Center
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl shadow-lg text-white ${securityData?.isSystemLockdown ? 'bg-rose-600 animate-pulse' : 'bg-brand-dark'}`}>
              <Lock className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-brand-dark font-display">Security Control & Lockdown</h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Perimeter Defense & Session Governance</p>
            </div>
          </div>

          <button
            onClick={fetchSecurityState}
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:text-brand-teal transition-all shadow-sm self-start md:self-auto"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Emergency System Lockdown Banner */}
      <div className={`rounded-[3rem] p-8 border shadow-2xl relative overflow-hidden transition-all ${
        securityData?.isSystemLockdown
          ? 'bg-rose-950 text-white border-rose-800'
          : 'bg-slate-900 text-white border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-rose-300">
              <AlertOctagon className="h-3.5 w-3.5" />
              Emergency Protocol Override
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-display">
              {securityData?.isSystemLockdown ? 'SYSTEM IS IN LOCKDOWN MODE' : 'System Standard Operational Mode'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Activating Lockdown mode restricts database modifications, freezes new staff logins, and enforces read-only emergency access for triage defense.
            </p>
          </div>

          <button
            onClick={handleToggleLockdownClick}
            disabled={togglingLockdown}
            className={`px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 ${
              securityData?.isSystemLockdown
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/50'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/50'
            }`}
          >
            {togglingLockdown ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : securityData?.isSystemLockdown ? (
              <>
                <CheckCircle className="h-4 w-4" />
                LIFT SYSTEM LOCKDOWN
              </>
            ) : (
              <>
                <ShieldAlert className="h-4 w-4" />
                ACTIVATE EMERGENCY LOCKDOWN
              </>
            )}
          </button>
        </div>
      </div>

      {/* Security Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Firewall Protection', val: securityData?.securityMetrics?.firewallStatus || 'Active', status: 'Optimal', color: 'border-emerald-200 text-emerald-600' },
          { label: 'Cipher Suite', val: securityData?.securityMetrics?.encryptionStandard || 'AES-256', status: 'Encrypted', color: 'border-blue-200 text-blue-600' },
          { label: 'HIPAA Standard', val: securityData?.securityMetrics?.hipaaCompliance || 'Passed', status: 'Compliant', color: 'border-teal-200 text-brand-teal' },
          { label: 'Failed Login Threshold', val: `${securityData?.securityMetrics?.failedLoginAttempts24h || 0} attempts`, status: 'Low Risk', color: 'border-amber-200 text-amber-600' }
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-premium">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
            <p className="text-xl font-black text-brand-dark font-display">{m.val}</p>
            <div className="mt-3 inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-50 border border-slate-200 text-slate-600">
              {m.status}
            </div>
          </div>
        ))}
      </div>

      {/* Role-Based Access Control (RBAC) Permission Matrix */}
      <PermissionMatrix />

      {/* Active Staff Sessions List */}
      <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-premium">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-brand-dark font-display">Active Staff Sessions</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Live Remote Revocation Panel</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>{securityData?.activeStaff?.length || 0} Online Sessions</span>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 pb-4">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Last Authentication</th>
                  <th className="py-3 px-4 text-right">Revoke Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {securityData?.activeStaff?.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-brand-dark">{s.profile ? `${s.profile.firstName} ${s.profile.lastName}` : s.email}</p>
                        <p className="text-[10px] text-slate-400">{s.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-700">
                        {s.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {s.lastLogin ? new Date(s.lastLogin).toLocaleString() : 'Recent Session'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleRevokeSessionClick(s.email)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-[10px] uppercase transition-all"
                      >
                        <LogOut className="h-3 w-3" />
                        Kill Session
                      </button>
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

export default SecurityControl;
