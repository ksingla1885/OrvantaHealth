import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  TestTube, Download, Calendar, Activity, CheckCircle, 
  Clock, Plus, Search, FileText, Bookmark, 
  ChevronRight, TrendingUp, FlaskConical, ShieldCheck,
  Eye, Printer, X, Stethoscope, AlertCircle,
  FileCheck, UploadCloud
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

/* ── STATUS & CATEGORY CONFIG ────────────────────────────────────────── */
const CATEGORY_COLORS = {
  'Biochemistry': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'Radiology': { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  'Radiology & Imaging': { bg: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  'Nuclear Medicine': { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  'Pathology': { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  'Hematology': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  'General': { bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' }
};

const getCategoryStyle = (cat) => {
  if (!cat) return CATEGORY_COLORS['General'];
  const match = Object.keys(CATEGORY_COLORS).find(k => cat.toLowerCase().includes(k.toLowerCase()));
  return match ? CATEGORY_COLORS[match] : CATEGORY_COLORS['General'];
};

const formatDateSafe = (dateVal, formatStr = 'dd MMM yyyy') => {
  if (!dateVal) return '—';
  try {
    return format(new Date(dateVal), formatStr);
  } catch {
    return String(dateVal);
  }
};

/* ── MAIN COMPONENT ─────────────────────────────────────────────────── */
const LabReports = () => {
  const { user: currentUser } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Modals
  const [selectedReport, setSelectedReport] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const endpoint = currentUser.role === 'patient' ? '/patient/lab-reports' : '/receptionist/lab-reports';
      const response = await api.get(endpoint);
      if (response.data.success) {
        setReports(response.data.data.labReports || []);
      }
    } catch (error) {
      console.error('Failed to fetch lab reports:', error);
      toast.error('Failed to load lab reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (report) => {
    try {
      setDownloadingId(report.id);
      const response = await api.get(`/documents/download/lab-report/${report.id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `lab_report_${report.id.slice(0, 8)}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download report PDF');
    } finally {
      setDownloadingId(null);
    }
  };

  // Unique categories for filter
  const categories = ['all', ...Array.from(new Set(reports.map(r => r.testType).filter(Boolean)))];

  // Filtering
  const filteredReports = reports.filter(r => {
    const term = searchTerm.toLowerCase().trim();
    
    // Name matching
    const testMatch = r.testName?.toLowerCase().includes(term);
    const patUser = r.patient?.user || r.patient?.userId || r.patientId?.user || r.patientId?.userId;
    const patName = `${patUser?.profile?.firstName || ''} ${patUser?.profile?.lastName || ''}`.toLowerCase();
    const patMatch = patName.includes(term);
    const mrn = (r.patient?.medicalRecordNumber || r.patientId?.medicalRecordNumber || '').toLowerCase();
    const mrnMatch = mrn.includes(term);
    
    const docUser = r.doctor?.user || r.doctor?.userId || r.doctorId?.user || r.doctorId?.userId;
    const docName = `${docUser?.profile?.firstName || ''} ${docUser?.profile?.lastName || ''}`.toLowerCase();
    const docMatch = docName.includes(term);
    
    const catMatch = r.testType?.toLowerCase().includes(term);

    const matchesSearch = !term || testMatch || patMatch || mrnMatch || docMatch || catMatch;

    // Status filter
    const status = (r.status || 'completed').toLowerCase();
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'completed' && status === 'completed') || 
      (statusFilter === 'pending' && status !== 'completed');

    // Category filter
    const matchesCategory = categoryFilter === 'all' || r.testType === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: reports.length,
    completed: reports.filter(r => (r.status || 'completed') === 'completed').length,
    pending: reports.filter(r => (r.status || 'completed') !== 'completed').length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="h-10 w-10 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-semibold text-xs tracking-wide">Loading diagnostic records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-7xl mx-auto">
      {/* ── TOP BANNER & ACTION HEADER ── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800 text-xs font-semibold">
            <FlaskConical className="h-3.5 w-3.5 text-teal-600" />
            <span>Pathology & Diagnostic Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Diagnostic & Lab Reports
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Review detailed biochemical and radiological findings, download authenticated test documents, and track clinical evaluations.
          </p>
        </div>

        {/* Quick Stats Summary */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-w-[100px]">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Tests</p>
            <p className="text-2xl font-bold text-slate-800 mt-0.5">{stats.total}</p>
          </div>
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl px-4 py-3 min-w-[100px]">
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Verified</p>
            <p className="text-2xl font-bold text-emerald-700 mt-0.5">{stats.completed}</p>
          </div>
          {stats.pending > 0 && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl px-4 py-3 min-w-[100px]">
              <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">In Progress</p>
              <p className="text-2xl font-bold text-amber-700 mt-0.5">{stats.pending}</p>
            </div>
          )}

          {currentUser?.role === 'receptionist' && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Upload Report</span>
            </button>
          )}
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search test name, patient, MRN, doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 outline-none text-sm text-slate-800 placeholder-slate-400 transition-all"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
            {['all', 'completed', 'pending'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${statusFilter === st ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {st === 'all' ? 'All Status' : st}
              </button>
            ))}
          </div>

          {/* Category Dropdown if multiple */}
          {categories.length > 2 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none focus:border-teal-500"
            >
              <option value="all">All Departments</option>
              {categories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* ── REPORTS GRID ── */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredReports.map((report) => {
            const patUser = report.patient?.user || report.patient?.userId || report.patientId?.user || report.patientId?.userId;
            const patFirst = patUser?.profile?.firstName || 'Patient';
            const patLast = patUser?.profile?.lastName || '';
            const mrn = report.patient?.medicalRecordNumber || report.patientId?.medicalRecordNumber || '';

            const docUser = report.doctor?.user || report.doctor?.userId || report.doctorId?.user || report.doctorId?.userId;
            const docName = docUser?.profile ? `Dr. ${docUser.profile.firstName || ''} ${docUser.profile.lastName || ''}`.trim() : 'Referring Clinician';
            const docDept = report.doctor?.department || report.doctorId?.department || 'Department';

            const catStyle = getCategoryStyle(report.testType);
            const isCompleted = (report.status || 'completed') === 'completed';
            const resultsList = Array.isArray(report.results) ? report.results : [];

            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500/40 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* ── Card Header ── */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                        <TestTube className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${catStyle.bg}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${catStyle.dot}`}></span>
                            {report.testType || 'Clinical Test'}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            #{report.id.slice(-6).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug group-hover:text-teal-900 transition-colors">
                          {report.testName}
                        </h3>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold whitespace-nowrap">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold whitespace-nowrap">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Processing</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Patient & Physician Clinical Metadata ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    {/* Patient block */}
                    <div className="flex items-center gap-2.5 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                      <div className="h-8 w-8 rounded-lg bg-teal-600/10 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {patFirst[0]}{patLast[0] || ''}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{patFirst} {patLast}</p>
                        <p className="text-[11px] text-slate-400">{mrn ? `#${mrn}` : 'Registered Patient'}</p>
                      </div>
                    </div>

                    {/* Clinician & Date block */}
                    <div className="flex items-center gap-2.5 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                      <div className="h-8 w-8 rounded-lg bg-slate-200/70 text-slate-600 flex items-center justify-center shrink-0">
                        <Stethoscope className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{docName}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span className="capitalize">{docDept}</span>
                          <span>•</span>
                          <span>{formatDateSafe(report.reportDate, 'dd MMM yyyy')}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── Clinical Findings Preview Snippet (Top Parameters) ── */}
                  {resultsList.length > 0 && (
                    <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Parameters</span>
                        <span className="text-[10px] font-semibold text-teal-600">{resultsList.length} Tested Items</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {resultsList.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                            <span className="text-slate-600 truncate mr-2">{item.parameter}</span>
                            <span className="font-bold text-slate-900 shrink-0">
                              {item.value} {item.unit && item.unit !== '-' ? item.unit : ''}
                            </span>
                          </div>
                        ))}
                      </div>
                      {report.conclusion && (
                        <p className="text-[11px] text-slate-500 italic mt-2 line-clamp-1 border-t border-slate-100 pt-1.5">
                          <span className="font-semibold not-italic text-slate-700">Impression:</span> {report.conclusion}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Card Footer Action Toolbar ── */}
                <div className="px-5 py-3.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
                  >
                    <Eye className="h-3.5 w-3.5 text-slate-500" />
                    <span>View Findings</span>
                  </button>

                  <button
                    onClick={() => handleDownload(report)}
                    disabled={downloadingId === report.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-2xs disabled:opacity-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{downloadingId === report.id ? 'Preparing...' : 'Download PDF'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <div className="h-14 w-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-4">
            <FlaskConical className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Diagnostic Reports Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            {searchTerm 
              ? `No laboratory records match "${searchTerm}". Check the spelling or clear the filter.` 
              : 'There are currently no diagnostic reports uploaded in this category.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStatusFilter('all'); }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* ── REFINED CLINICAL ADVISORY NOTE ── */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
            <Bookmark className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Clinical Interpretation Advisory</h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
              Laboratory markers represent biological states at the exact moment of specimen extraction. Correlation with clinical symptoms and attending physician review is required.
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-600">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Accredited Diagnostics Vault</span>
        </div>
      </div>

      {/* ── REPORT DETAIL MODAL ── */}
      {selectedReport && (
        <ReportDetailsModal 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
          onDownload={() => handleDownload(selectedReport)}
        />
      )}

      {/* ── UPLOAD MODAL (Receptionist Only) ── */}
      {showUploadModal && (
        <UploadLabReportModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
            fetchReports();
          }}
        />
      )}
    </div>
  );
};

/* ── MODAL: CLINICAL REPORT DETAILS VIEWER ────────────────────────────── */
const ReportDetailsModal = ({ report, onClose, onDownload }) => {
  const patUser = report.patient?.user || report.patient?.userId || report.patientId?.user || report.patientId?.userId;
  const patName = `${patUser?.profile?.firstName || ''} ${patUser?.profile?.lastName || ''}`.trim() || 'Patient';
  const mrn = report.patient?.medicalRecordNumber || report.patientId?.medicalRecordNumber || 'N/A';
  const bloodGroup = report.patient?.bloodGroup || report.patientId?.bloodGroup || '—';
  
  const docUser = report.doctor?.user || report.doctor?.userId || report.doctorId?.user || report.doctorId?.userId;
  const docName = docUser?.profile ? `Dr. ${docUser.profile.firstName || ''} ${docUser.profile.lastName || ''}`.trim() : 'Attending Clinician';
  const docDept = report.doctor?.department || report.doctorId?.department || 'Diagnostic Medicine';

  const results = Array.isArray(report.results) ? report.results : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider">Official Laboratory Record</p>
              <h3 className="text-base font-bold text-white leading-tight">{report.testName}</h3>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800">
          {/* Patient & Clinic Metadata Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold block mb-0.5">Patient Name</span>
              <span className="font-bold text-slate-900 text-sm block">{patName}</span>
              <span className="text-slate-500 text-[11px]">MRN: {mrn}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold block mb-0.5">Blood Group</span>
              <span className="font-bold text-slate-900 text-sm block">{bloodGroup}</span>
              <span className="text-slate-500 text-[11px]">Specimen Verified</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold block mb-0.5">Referring Physician</span>
              <span className="font-bold text-slate-900 text-sm block">{docName}</span>
              <span className="text-slate-500 text-[11px] capitalize">{docDept}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold block mb-0.5">Report Date</span>
              <span className="font-bold text-slate-900 text-sm block">{formatDateSafe(report.reportDate)}</span>
              <span className="text-emerald-700 text-[11px] font-semibold">Status: Verified</span>
            </div>
          </div>

          {/* Diagnostic Parameters Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Tested Biomarkers & Quantitative Parameters
            </h4>
            {results.length > 0 ? (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="px-4 py-3">Parameter</th>
                      <th className="px-4 py-3">Observed Value</th>
                      <th className="px-4 py-3">Reference Range</th>
                      <th className="px-4 py-3 text-right">Evaluation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.map((res, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-2.5 font-semibold text-slate-800">{res.parameter}</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900">
                          {res.value} {res.unit && res.unit !== '-' ? <span className="text-slate-500 font-normal">{res.unit}</span> : ''}
                        </td>
                        <td className="px-4 py-2.5 text-slate-600">{res.referenceRange || '—'}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            (res.status || '').toLowerCase().includes('optimal') || (res.status || '').toLowerCase().includes('normal') || (res.status || '').toLowerCase().includes('clear')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : (res.status || '').toLowerCase().includes('borderline')
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {res.status || 'Normal'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic p-4 bg-slate-50 rounded-xl border border-slate-100">
                Detailed structured parameters were processed directly in the attached radiological image/document.
              </p>
            )}
          </div>

          {/* Conclusion */}
          {report.conclusion && (
            <div className="bg-teal-50/60 border border-teal-200/80 rounded-xl p-4">
              <h5 className="text-[11px] font-bold text-teal-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-teal-600" />
                <span>Clinical Impression & Conclusion</span>
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {report.conclusion}
              </p>
            </div>
          )}

          {/* Recommendations */}
          {report.recommendations && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>Physician Recommendations</span>
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {report.recommendations}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Toolbar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>Print Sheet</span>
            </button>
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-xs transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── MODAL: UPLOAD NEW LAB REPORT (RECEPTIONIST) ──────────────────────── */
const UploadLabReportModal = ({ onClose, onSuccess }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    testName: '',
    testType: 'Biochemistry',
    reportDate: new Date().toISOString().split('T')[0],
    conclusion: '',
    recommendations: '',
    file: null
  });

  useEffect(() => {
    // Fetch available patients & doctors
    const loadMetadata = async () => {
      try {
        const [patRes, docRes] = await Promise.all([
          api.get('/receptionist/patients').catch(() => ({ data: { success: false } })),
          api.get('/receptionist/doctors/availability').catch(() => ({ data: { success: false } }))
        ]);
        if (patRes.data.success) {
          setPatients(patRes.data.data.patients || []);
        }
        if (docRes.data.success) {
          setDoctors(docRes.data.data.doctors || []);
        }
      } catch (e) {
        console.error('Error fetching modal metadata:', e);
      }
    };
    loadMetadata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientId) return toast.error('Please select a patient');
    if (!formData.testName) return toast.error('Please enter a test name');
    if (!formData.file) return toast.error('Please attach a diagnostic file (PDF/Image)');

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('patientId', formData.patientId);
      if (formData.doctorId) data.append('doctorId', formData.doctorId);
      data.append('testName', formData.testName);
      data.append('testType', formData.testType);
      data.append('reportDate', formData.reportDate);
      data.append('conclusion', formData.conclusion);
      data.append('recommendations', formData.recommendations);
      data.append('reportFile', formData.file);

      const res = await api.post('/receptionist/lab-report', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        toast.success('Lab report uploaded successfully');
        onSuccess();
      }
    } catch (err) {
      console.error('Upload failure:', err);
      toast.error(err.response?.data?.message || 'Failed to upload report');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 my-8 overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <UploadCloud className="h-5 w-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Upload Diagnostic Record</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Patient Select */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Select Patient *</label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-medium outline-none focus:border-teal-500"
              required
            >
              <option value="">-- Choose Patient --</option>
              {patients.map(p => {
                const name = `${p.user?.profile?.firstName || ''} ${p.user?.profile?.lastName || ''}`.trim();
                return (
                  <option key={p.id} value={p.id}>
                    {name} ({p.medicalRecordNumber})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Doctor Select */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Referring Clinician</label>
            <select
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-medium outline-none focus:border-teal-500"
            >
              <option value="">-- Optional Clinician --</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name || `Dr. ${d.user?.profile?.firstName || ''} ${d.user?.profile?.lastName || ''}`} ({d.department})
                </option>
              ))}
            </select>
          </div>

          {/* Test Name & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Test Name *</label>
              <input
                type="text"
                placeholder="e.g. Comprehensive Metabolic Panel"
                value={formData.testName}
                onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Test Category *</label>
              <select
                value={formData.testType}
                onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-medium outline-none focus:border-teal-500"
              >
                <option value="Biochemistry">Biochemistry</option>
                <option value="Radiology & Imaging">Radiology & Imaging</option>
                <option value="Nuclear Medicine">Nuclear Medicine</option>
                <option value="Pathology">Pathology</option>
                <option value="Hematology">Hematology</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Report Date *</label>
            <input
              type="date"
              value={formData.reportDate}
              onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-teal-500"
              required
            />
          </div>

          {/* File input */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Attach Lab PDF / Scan *</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              className="w-full p-2 rounded-xl border border-dashed border-slate-300 text-slate-700 text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              required
            />
          </div>

          {/* Conclusion */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Clinical Impression / Summary</label>
            <textarea
              rows="2"
              placeholder="e.g. Findings indicate adequate recovery and normal lipid profile."
              value={formData.conclusion}
              onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-medium outline-none focus:border-teal-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs disabled:opacity-50 transition-all text-xs"
            >
              {submitting ? 'Uploading...' : 'Save & Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabReports;
