import React, { useState, useEffect } from 'react';
import {
  Users, Search, Eye, FileUp, DollarSign, MapPin, User2,
  ShieldCheck, X, Stethoscope, Activity, Hash, LayoutGrid, LayoutList,
  Phone, Mail, Filter, UserCheck, UserX, ChevronRight, TrendingUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LabReportUploadModal from '../../components/LabReportUploadModal';
import BillUploadModal from '../../components/BillUploadModal';

const PatientManagement = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { fetchPatients(); }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/admin/patients');
      if (response.data.success) setPatients(response.data.data.patients);
    } catch { toast.error('Failed to fetch patients data'); }
    finally { setLoading(false); }
  };

  const getAge = (dob) => {
    if (!dob) return '?';
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() - birth.getMonth() < 0 || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    return (age < 0 || isNaN(age) || age > 150) ? '?' : age;
  };

  const filteredPatients = patients.filter(p => {
    const q = searchTerm.toLowerCase();
    const nameMatch = `${p.userId.profile.firstName} ${p.userId.profile.lastName} ${p.userId.email} ${p.medicalRecordNumber || ''}`.toLowerCase().includes(q);
    const statusMatch = statusFilter === 'all' || (statusFilter === 'active' ? p.userId.isActive : !p.userId.isActive);
    return nameMatch && statusMatch;
  });

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.userId.isActive).length,
    inactive: patients.filter(p => !p.userId.isActive).length,
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="loading-spinner" />
      <p className="text-slate-400 font-black text-xs uppercase tracking-widest animate-pulse">Loading patient registry...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">

      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light border border-brand-teal/10 mb-3">
            <Users className="h-3.5 w-3.5 text-brand-teal" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Patient Registry</span>
          </div>
          <h1 className="text-4xl font-black text-brand-dark font-display tracking-tight leading-none mb-2">
            Patient Management
          </h1>
          <p className="text-slate-500 font-medium">View, manage, and take actions on registered patients</p>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: Users,     label: 'Total Patients', value: stats.total,    color: 'bg-brand-teal',  text: 'text-white', bg: 'from-brand-teal to-teal-600' },
          { icon: UserCheck, label: 'Active',          value: stats.active,   color: 'bg-emerald-500', text: 'text-white', bg: 'from-emerald-400 to-emerald-600' },
          { icon: UserX,     label: 'Inactive',        value: stats.inactive, color: 'bg-rose-500',    text: 'text-white', bg: 'from-rose-400 to-rose-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${s.bg} opacity-10 rounded-bl-[2rem]`} />
            <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className="h-4.5 w-4.5 text-white" size={18} />
            </div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black text-brand-dark font-display mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── TOOLBAR ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or MRN..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-brand-teal outline-none text-sm font-semibold text-brand-dark bg-white transition-all placeholder:text-slate-400 shadow-sm"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="h-4 w-4 text-slate-400" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-brand-teal outline-none text-xs font-black text-brand-dark bg-white transition-all uppercase tracking-widest shadow-sm">
            <option value="all">All Patients</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 shrink-0">
          <button onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-brand-teal' : 'text-slate-400 hover:text-brand-dark'}`}>
            <LayoutList className="h-4 w-4" />
          </button>
          <button onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-teal' : 'text-slate-400 hover:text-brand-dark'}`}>
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── RESULTS COUNT ── */}
      <p className="text-xs font-bold text-slate-400 -mt-4">
        Showing <span className="text-brand-dark">{filteredPatients.length}</span> of <span className="text-brand-dark">{patients.length}</span> patients
      </p>

      {filteredPatients.length === 0 ? (
        /* ── EMPTY STATE ── */
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
          <div className="h-16 w-16 rounded-2xl bg-brand-light flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-brand-teal/40" />
          </div>
          <h3 className="text-base font-black text-brand-dark mb-1">No Patients Found</h3>
          <p className="text-sm text-slate-400 font-medium text-center max-w-xs">
            {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filter criteria.' : 'No patients are registered yet.'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
              className="mt-4 px-5 py-2 rounded-xl bg-brand-light text-brand-teal text-xs font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all">
              Clear Filters
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        /* ── CARD GRID VIEW ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map(patient => (
            <button key={patient._id}
              onClick={() => { setSelectedPatient(patient); setShowPatientModal(true); }}
              className="group bg-white rounded-[1.75rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Card accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${patient.userId.isActive ? 'from-brand-teal to-teal-500' : 'from-slate-300 to-slate-400'}`} />

              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar */}
                  <div className="h-12 w-12 rounded-xl bg-brand-dark flex items-center justify-center text-white font-black text-sm shrink-0 group-hover:scale-105 transition-transform">
                    {patient.userId.profile.firstName[0]}{patient.userId.profile.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-brand-dark text-sm leading-tight truncate">
                      {patient.userId.profile.firstName} {patient.userId.profile.lastName}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{patient.userId.email}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full shrink-0 mt-1.5 ${patient.userId.isActive ? 'bg-emerald-500' : 'bg-rose-400'}`} />
                </div>

                {/* Info pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {patient.medicalRecordNumber && (
                    <span className="text-[9px] font-black px-2 py-1 rounded-lg bg-brand-teal/10 text-brand-teal tracking-widest uppercase font-mono">
                      #{patient.medicalRecordNumber}
                    </span>
                  )}
                  <span className="text-[9px] font-bold px-2 py-1 rounded-lg bg-slate-50 text-slate-500 capitalize">
                    {getAge(patient.userId.profile.dateOfBirth)}y · {patient.userId.profile.gender || '—'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {patient.userId.profile.phone || 'No phone'}
                  </p>
                  <div className="flex items-center gap-1 text-brand-teal transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest">View</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* ── TABLE VIEW ── */
        <div className="bg-white rounded-[1.75rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  {['Patient Identity', 'MRN', 'Contact', 'Profile', 'Status', ''].map((h, i) => (
                    <th key={i} className={`px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ${i === 5 ? 'text-right' : 'text-left'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPatients.map(patient => (
                  <tr key={patient._id} className="group hover:bg-brand-light/50 transition-colors">
                    {/* Identity */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-brand-dark flex items-center justify-center text-white font-black text-xs shadow-sm group-hover:scale-105 transition-transform shrink-0">
                          {patient.userId.profile.firstName[0]}{patient.userId.profile.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-brand-dark leading-tight">
                            {patient.userId.profile.firstName} {patient.userId.profile.lastName}
                          </p>
                          <p className="text-[10px] font-medium text-slate-400 mt-0.5">{patient.userId.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* MRN */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[10px] font-black font-mono text-brand-teal bg-brand-teal/5 px-2.5 py-1 rounded-lg">
                        {patient.medicalRecordNumber || '—'}
                      </span>
                    </td>
                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-xs font-bold text-slate-600">{patient.userId.profile.phone || '—'}</p>
                    </td>
                    {/* Profile */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-xs font-bold text-slate-600 capitalize">
                        {getAge(patient.userId.profile.dateOfBirth)}y · {patient.userId.profile.gender || '—'}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${patient.userId.isActive ? 'bg-emerald-500' : 'bg-rose-400'}`} />
                        <span className={`text-[9px] font-black uppercase tracking-widest ${patient.userId.isActive ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {patient.userId.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    {/* Action */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => { setSelectedPatient(patient); setShowPatientModal(true); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-teal hover:border-brand-teal/30 transition-all"
                      >
                        <Eye className="h-3.5 w-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PATIENT PROFILE MODAL ── */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-fade-in" onClick={() => setShowPatientModal(false)} />

          <div className="relative bg-white rounded-[2rem] shadow-xl w-full max-w-md animate-slide-up flex flex-col">
            
            {/* Header Area */}
            <div className="p-8 pb-6 relative">
              <button onClick={() => setShowPatientModal(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="h-20 w-20 rounded-full bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center text-2xl font-light tracking-tight mb-4 shadow-sm">
                  {selectedPatient.userId.profile.firstName[0]}{selectedPatient.userId.profile.lastName[0]}
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 tracking-tight mb-1">
                  {selectedPatient.userId.profile.firstName} {selectedPatient.userId.profile.lastName}
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <span>#{selectedPatient.medicalRecordNumber || 'Unassigned'}</span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${selectedPatient.userId.isActive ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    <span>{selectedPatient.userId.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Area */}
            <div className="px-8 pb-8 space-y-6">
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Age</p>
                  <p className="text-sm font-medium text-slate-700">{getAge(selectedPatient.userId.profile.dateOfBirth)} years</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Gender</p>
                  <p className="text-sm font-medium text-slate-700 capitalize">{selectedPatient.userId.profile.gender || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-sm font-medium text-slate-700">{selectedPatient.userId.profile.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm font-medium text-slate-700 break-all" title={selectedPatient.userId.email}>{selectedPatient.userId.email || '—'}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-100/80">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Residential Address</p>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">
                    {selectedPatient.userId.profile.address || 'No address on file'}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              {user?.role !== 'superadmin' && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { setShowPatientModal(false); setShowLabModal(true); }}
                    className="flex-1 py-3 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-all shadow-sm flex justify-center items-center gap-2"
                  >
                    <FileUp className="h-4 w-4 text-slate-400" /> Lab Report
                  </button>
                  <button
                    onClick={() => { setShowPatientModal(false); setShowBillModal(true); }}
                    className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-all shadow-sm flex justify-center items-center gap-2"
                  >
                    <Activity className="h-4 w-4 text-slate-400" /> Generate Bill
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Modals */}
      <LabReportUploadModal isOpen={showLabModal} onClose={() => setShowLabModal(false)} patient={selectedPatient} onSuccess={fetchPatients} />
      <BillUploadModal isOpen={showBillModal} onClose={() => setShowBillModal(false)} patient={selectedPatient} onSuccess={fetchPatients} />
    </div>
  );
};

export default PatientManagement;
