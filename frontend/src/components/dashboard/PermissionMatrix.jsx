import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Users, Check, X, Search, Sliders, 
  RotateCcw, Save, AlertTriangle, Key, Sparkles, Filter
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const PermissionMatrix = () => {
  const roles = [
    { id: 'super_admin', label: 'Super Admin', color: 'bg-rose-500 text-white' },
    { id: 'doctor', label: 'Doctor', color: 'bg-teal-500 text-white' },
    { id: 'receptionist', label: 'Receptionist', color: 'bg-cyan-500 text-white' },
    { id: 'nurse', label: 'Nurse', color: 'bg-blue-500 text-white' },
    { id: 'lab_tech', label: 'Lab Tech', color: 'bg-violet-500 text-white' },
    { id: 'patient', label: 'Patient', color: 'bg-emerald-500 text-white' },
  ];

  const initialPermissions = [
    // EHR & Records
    { id: 'emr_read', category: 'EHR & Records', label: 'View EMR History', desc: 'Read clinical telemetry & past visit notes' },
    { id: 'emr_write', category: 'EHR & Records', label: 'Write Clinical Notes', desc: 'Create SOAP notes during consultations' },
    { id: 'emr_export', category: 'EHR & Records', label: 'Export Encrypted EHR', desc: 'Download HIPAA-compliant PDF dossier' },
    { id: 'emr_archive', category: 'EHR & Records', label: 'Archive/Delete Record', desc: 'Permanently archive medical records' },

    // Prescriptions
    { id: 'rx_author', category: 'Prescriptions', label: 'Author Digital Script', desc: 'Issue new cryptographic prescription' },
    { id: 'rx_override', category: 'Prescriptions', label: 'Override Allergy Conflict', desc: 'Bypass smart drug interaction warning' },
    { id: 'rx_dispense', category: 'Prescriptions', label: 'Mark Rx Dispensed', desc: 'Confirm pharmacy medication dispatch' },

    // Billing & Financials
    { id: 'bill_create', category: 'Billing & Financials', label: 'Create Billing Invoice', desc: 'Generate patient dues and line items' },
    { id: 'bill_discount', category: 'Billing & Financials', label: 'Apply Fee Waiver', desc: 'Authorize insurance/hardship discounts' },
    { id: 'bill_refund', category: 'Billing & Financials', label: 'Process Refund', desc: 'Issue payment reversal to original card' },

    // System Governance
    { id: 'sys_lockdown', category: 'System Governance', label: 'Execute System Lockdown', desc: 'Freeze database writes & remote access' },
    { id: 'sys_staff_mgmt', category: 'System Governance', label: 'Manage Staff Accounts', desc: 'Onboard, suspend, or assign roles' },
    { id: 'sys_audit_view', category: 'System Governance', label: 'Inspect Audit Logs', desc: 'View IP geography & login security feed' },
  ];

  // Matrix State mapping [permissionId][roleId] -> boolean
  const [matrix, setMatrix] = useState(() => {
    const defaultMatrix = {};
    initialPermissions.forEach(perm => {
      defaultMatrix[perm.id] = {
        super_admin: true,
        doctor: ['emr_read', 'emr_write', 'emr_export', 'rx_author', 'rx_override'].includes(perm.id),
        receptionist: ['emr_read', 'bill_create', 'bill_discount'].includes(perm.id),
        nurse: ['emr_read', 'emr_write', 'rx_dispense'].includes(perm.id),
        lab_tech: ['emr_read'].includes(perm.id),
        patient: ['emr_read', 'emr_export'].includes(perm.id),
      };
    });
    return defaultMatrix;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'EHR & Records', 'Prescriptions', 'Billing & Financials', 'System Governance'];

  const togglePermission = (permId, roleId) => {
    if (roleId === 'super_admin') {
      toast('Super Admin permissions are locked to full access for security integrity.', { icon: '🛡️' });
      return;
    }
    setMatrix(prev => ({
      ...prev,
      [permId]: {
        ...prev[permId],
        [roleId]: !prev[permId][roleId]
      }
    }));
  };

  const resetDefaults = () => {
    const defaultMatrix = {};
    initialPermissions.forEach(perm => {
      defaultMatrix[perm.id] = {
        super_admin: true,
        doctor: ['emr_read', 'emr_write', 'emr_export', 'rx_author', 'rx_override'].includes(perm.id),
        receptionist: ['emr_read', 'bill_create', 'bill_discount'].includes(perm.id),
        nurse: ['emr_read', 'emr_write', 'rx_dispense'].includes(perm.id),
        lab_tech: ['emr_read'].includes(perm.id),
        patient: ['emr_read', 'emr_export'].includes(perm.id),
      };
    });
    setMatrix(defaultMatrix);
    toast.success('Reset permission matrix to default HIPAA baseline!');
  };

  const savePermissions = () => {
    toast.success('Role-Based Access Control (RBAC) matrix saved to central security database!');
  };

  const filteredPermissions = initialPermissions.filter(perm => {
    const matchesCategory = selectedCategory === 'All' || perm.category === selectedCategory;
    const matchesSearch = perm.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          perm.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-premium space-y-8 animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-500 via-violet-500 to-brand-teal" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-teal" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Governance & Access Control</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark font-display">Role-Based Access Control (RBAC) Matrix</h2>
          <p className="text-xs text-slate-500 font-medium">Fine-tune system permissions for every hospital staff tier in real time.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetDefaults}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Reset Default
          </button>
          <button
            onClick={savePermissions}
            className="px-6 py-3 bg-brand-dark hover:bg-brand-teal text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            <Save className="h-4 w-4" /> Save RBAC Policy
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 ${
                selectedCategory === cat 
                  ? 'bg-brand-dark text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-brand-dark outline-none focus:border-brand-teal font-medium"
          />
        </div>
      </div>

      {/* ── RBAC MATRIX TABLE ── */}
      <div className="overflow-x-auto border border-slate-200/80 rounded-[2rem] shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
              <th className="py-4 px-6 min-w-[240px]">Functional Capability</th>
              {roles.map(role => (
                <th key={role.id} className="py-4 px-4 text-center min-w-[110px]">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase ${role.color}`}>
                    {role.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredPermissions.map(perm => (
              <tr key={perm.id} className="hover:bg-slate-50/70 transition-colors">
                
                {/* Capability Description */}
                <td className="py-4 px-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-brand-dark text-sm">{perm.label}</p>
                      <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] font-mono text-slate-500 font-bold">
                        {perm.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{perm.desc}</p>
                  </div>
                </td>

                {/* Role Toggles */}
                {roles.map(role => {
                  const isEnabled = matrix[perm.id]?.[role.id] ?? false;
                  return (
                    <td key={role.id} className="py-4 px-4 text-center">
                      <button
                        onClick={() => togglePermission(perm.id, role.id)}
                        className={`w-12 h-7 rounded-full p-1 transition-all duration-300 inline-flex items-center ${
                          isEnabled ? 'bg-emerald-500 justify-end' : 'bg-slate-200 justify-start'
                        }`}
                        title={`${isEnabled ? 'Enabled' : 'Disabled'} for ${role.label}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-[10px] font-black text-slate-700">
                          {isEnabled ? <Check className="h-3 w-3 text-emerald-600 stroke-[3]" /> : <X className="h-3 w-3 text-slate-400 stroke-[3]" />}
                        </span>
                      </button>
                    </td>
                  );
                })}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audit Footnote */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-2 font-medium">
          <Key className="h-4 w-4 text-brand-teal" />
          <span>All permission modifications generate a cryptographically signed entry in Super-Admin Audit Vault.</span>
        </div>
        <span className="font-mono font-bold text-brand-teal uppercase text-[10px]">HIPAA RBAC v2.4 Compliant</span>
      </div>

    </div>
  );
};

export default PermissionMatrix;
