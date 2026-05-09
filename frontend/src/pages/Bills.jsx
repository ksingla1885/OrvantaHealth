import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  FileText, Download, CheckCircle, Clock, AlertCircle, Plus,
  Info, ShieldCheck, X, Search, TrendingUp, IndianRupee,
  Banknote, ReceiptText, Filter, Sparkles
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

/* ── STATUS CONFIG ─────────────────────────────────────────────────── */
const STATUS_CONFIG = {
  paid:            { label: 'Paid',            icon: <CheckCircle className="h-3 w-3" />, dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100', bar: 'from-emerald-400 to-emerald-600', glow: 'shadow-emerald-500/20' },
  unpaid:          { label: 'Unpaid',          icon: <Clock className="h-3 w-3" />,       dot: 'bg-rose-500',    badge: 'bg-rose-50 text-rose-700 border-rose-100',       bar: 'from-rose-400 to-rose-600',       glow: 'shadow-rose-500/20' },
  overdue:         { label: 'Overdue',         icon: <AlertCircle className="h-3 w-3" />, dot: 'bg-red-600',     badge: 'bg-red-50 text-red-700 border-red-100',           bar: 'from-red-400 to-red-600',        glow: 'shadow-red-600/20' },
  partially_paid:  { label: 'Partial',         icon: <TrendingUp className="h-3 w-3" />,  dot: 'bg-amber-500',   badge: 'bg-amber-50 text-amber-700 border-amber-100',     bar: 'from-amber-400 to-amber-600',     glow: 'shadow-amber-500/20' },
  draft:           { label: 'Draft',           icon: <FileText className="h-3 w-3" />,    dot: 'bg-slate-400',   badge: 'bg-slate-50 text-slate-600 border-slate-200',     bar: 'from-slate-300 to-slate-500',     glow: 'shadow-slate-400/20' },
  sent:            { label: 'Sent',            icon: <ShieldCheck className="h-3 w-3" />, dot: 'bg-blue-500',    badge: 'bg-blue-50 text-blue-700 border-blue-100',        bar: 'from-blue-400 to-blue-600',       glow: 'shadow-blue-500/20' },
  pending_payment: { label: 'Pending',         icon: <Clock className="h-3 w-3" />,       dot: 'bg-yellow-500',  badge: 'bg-yellow-50 text-yellow-700 border-yellow-100',  bar: 'from-yellow-400 to-yellow-500',   glow: 'shadow-yellow-500/20' },
  refunded:        { label: 'Refunded',        icon: <TrendingUp className="h-3 w-3" />,  dot: 'bg-violet-500',  badge: 'bg-violet-50 text-violet-700 border-violet-100',  bar: 'from-violet-400 to-violet-600',    glow: 'shadow-violet-500/20' },
};
const getStatusCfg = (status) => STATUS_CONFIG[status] || { label: status, dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-700', bar: 'from-gray-300 to-gray-500' };

/* ── STAT CARD ─────────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, color, hint }) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
    <div className={`absolute -top-6 -right-6 w-24 h-24 ${color} opacity-5 rounded-full transition-transform duration-700`} />
    <div className={`h-12 w-12 rounded-2xl ${color} flex items-center justify-center mb-5 shadow-lg shadow-current/10`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
      <p className="text-3xl font-black text-brand-dark font-display tracking-tight">{value}</p>
      {hint && <p className="text-[11px] text-slate-500 font-bold flex items-center gap-1.5 pt-1">
        <Sparkles className="h-3 w-3 text-brand-teal/40" />
        {hint}
      </p>}
    </div>
  </div>
);

/* ── MAIN COMPONENT ────────────────────────────────────────────────── */
const Bills = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMockModal, setShowMockModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [mockLoading, setMockLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const isReceptionist = currentUser?.role === 'receptionist';

  useEffect(() => { fetchBills(); }, []);

  const fetchBills = async () => {
    try {
      const endpoint = currentUser.role === 'patient' ? '/patient/bills' : '/receptionist/bills';
      const response = await api.get(endpoint);
      if (response.data.success) setBills(response.data.data.bills);
    } catch {
      toast.error('Failed to load bills');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (billId) => {
    try {
      const response = await api.get(`/documents/download/bill/${billId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bill_${billId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      toast.error('Failed to download bill');
    }
  };

  const handleMarkAsPaid = async (billId) => {
    try {
      const response = await api.patch(`/receptionist/bill/${billId}/mark-paid`);
      if (response.data.success) { toast.success('Bill marked as paid'); fetchBills(); }
    } catch {
      toast.error('Failed to update bill status');
    }
  };

  const loadRazorpay = () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePayNow = async (bill) => {
    try {
      const orderResponse = await api.post('/payments/create-bill-order', { billId: bill._id });
      if (!orderResponse.data.success) { toast.error(orderResponse.data.message); return; }
      const { orderId, amount, currency, keyId } = orderResponse.data.data;
      if (orderResponse.data.isMock) {
        setSelectedBill({ ...bill, mockOrder: orderResponse.data.data });
        setShowMockModal(true);
        return;
      }
      const isLoaded = await loadRazorpay();
      if (!isLoaded) { toast.error('Razorpay SDK failed to load.'); return; }
      const options = {
        key: keyId, amount, currency,
        name: 'OrvantaHealth',
        description: `Payment for Invoice #${bill.billNumber || bill._id.slice(-6).toUpperCase()}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyRes = await api.post('/payments/verify-bill', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              billId: bill._id
            });
            if (verifyRes.data.success) {
              toast.success('Payment successful!');
              navigate('/patient/payment-success', { state: { bill, paymentId: response.razorpay_payment_id } });
            } else { toast.error('Payment verification failed'); }
          } catch { toast.error('Error verifying payment'); }
        },
        prefill: {
          name: `${currentUser?.profile?.firstName || ''} ${currentUser?.profile?.lastName || ''}`,
          email: currentUser?.email || '',
          contact: currentUser?.profile?.phone || '',
        },
        theme: { color: '#0d9488' },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment');
    }
  };

  const handleMockPayment = async () => {
    if (!selectedBill?.mockOrder) return;
    setMockLoading(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      const verifyRes = await api.post('/payments/verify-bill', {
        razorpay_order_id: selectedBill.mockOrder.orderId,
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_signature: 'mock_signature',
        billId: selectedBill._id
      });
      if (verifyRes.data.success) {
        toast.success('Payment successful (Demo Mode)!');
        setShowMockModal(false);
        navigate('/patient/payment-success', { state: { bill: selectedBill, paymentId: `pay_mock_${Date.now()}` } });
      } else { toast.error('Payment verification failed'); }
    } catch { toast.error('Error processing mock payment'); }
    finally { setMockLoading(false); }
  };

  /* Derived stats */
  const totalBilled  = bills.reduce((s, b) => s + Number(b.total || 0), 0);
  const totalPaid    = bills.filter(b => b.status === 'paid').reduce((s, b) => s + Number(b.total || 0), 0);
  const totalUnpaid  = bills.filter(b => !['paid','refunded','cancelled'].includes(b.status)).length;

  /* Filters */
  const STATUSES = ['all', ...Object.keys(STATUS_CONFIG)];
  const filteredBills = bills.filter(b => {
    const name = `${b.patientId?.userId?.profile?.firstName || ''} ${b.patientId?.userId?.profile?.lastName || ''} ${b.billNumber || b._id}`.toLowerCase();
    const matchSearch = name.includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="loading-spinner" />
      <p className="text-slate-400 font-black text-xs uppercase tracking-widest animate-pulse">Loading billing records...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">

      {/* ── PAGE HEADER ── */}
      <div className="relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 -left-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm mb-5">
              <div className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                {isReceptionist ? 'Financial Management' : 'Billing History'}
              </span>
            </div>
            <h1 className="text-5xl font-black text-brand-dark font-display tracking-tight leading-[0.9] mb-3">
              Invoices <span className="text-brand-teal">&amp;</span> Receipts
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              {isReceptionist ? 'Monitor and manage clinic revenue streams' : 'Secure access to your medical financial records'}
            </p>
          </div>

        {isReceptionist && (
          <Link
            to="/dashboard/patients"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-brand-teal text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand-teal/30 hover:bg-teal-600 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="h-4 w-4" />
            Create New Bill
          </Link>
        )}
      </div>
    </div>

      {/* ── SUMMARY STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={IndianRupee}  label="Total Billed"    value={`₹${Number(totalBilled).toLocaleString('en-IN')}`}  color="bg-brand-teal"   hint={`${bills.length} invoice${bills.length !== 1 ? 's' : ''}`} />
        <StatCard icon={CheckCircle}  label="Total Collected" value={`₹${Number(totalPaid).toLocaleString('en-IN')}`}    color="bg-emerald-500"  hint="Paid invoices" />
        <StatCard icon={Banknote}     label="Pending Dues"    value={totalUnpaid}                                          color="bg-rose-500"     hint="Awaiting payment" />
      </div>

      {/* ── SEARCH + FILTER BAR ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={isReceptionist ? 'Search by patient name or invoice number...' : 'Search invoices...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-slate-100 focus:border-brand-teal outline-none text-sm font-semibold text-brand-dark bg-slate-50 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border-2 border-slate-100 focus:border-brand-teal outline-none text-xs font-black text-brand-dark bg-slate-50 focus:bg-white transition-all uppercase tracking-widest"
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>{s === 'all' ? 'All Statuses' : getStatusCfg(s).label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── BILL CARDS ── */}
      <div className="space-y-4">
        {filteredBills.length > 0 ? filteredBills.map((bill) => {
          const cfg = getStatusCfg(bill.status);
          const patientName = bill.patientId?.userId?.profile
            ? `${bill.patientId.userId.profile.firstName} ${bill.patientId.userId.profile.lastName}`
            : null;

          const doctor = bill.appointmentId?.doctorId;
          const drName = doctor?.userId?.profile ? `Dr. ${doctor.userId.profile.firstName} ${doctor.userId.profile.lastName}` : null;
          const drDept = doctor?.department;

          return (
            <div key={bill._id}
              className="bg-white rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 overflow-hidden relative"
            >
              {/* Premium Glow & Accent */}
              <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${cfg.bar}`} />
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cfg.bar} opacity-20`} />

              <div className="p-7 flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Icon Wrapper */}
                <div className="relative shrink-0">
                  <div className={`h-16 w-16 rounded-[1.25rem] bg-gradient-to-br ${cfg.bar} flex items-center justify-center text-white shadow-xl ${cfg.glow} transition-transform duration-500`}>
                    <IndianRupee className="h-7 w-7" />
                  </div>
                  {bill.status === 'paid' && (
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Main Info Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2.5">
                    <h3 className="text-xl font-black text-brand-dark font-display tracking-tight transition-colors">
                      Invoice #{bill.billNumber || bill._id.slice(-6).toUpperCase()}
                    </h3>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${cfg.badge} shadow-sm`}>
                      {cfg.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{cfg.label}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-5">
                    {/* Role Specific Info */}
                    {isReceptionist && patientName ? (
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-brand-light flex items-center justify-center border border-brand-teal/10">
                          <span className="text-brand-teal font-black text-xs uppercase">
                            {patientName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">Patient</p>
                          <p className="text-sm font-black text-brand-dark tracking-tight">{patientName}</p>
                        </div>
                      </div>
                    ) : (
                      drName && (
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center border border-teal-100">
                            <span className="text-brand-teal font-black text-xs">Dr</span>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">{drDept || 'Practitioner'}</p>
                            <p className="text-sm font-black text-brand-dark tracking-tight">{drName}</p>
                          </div>
                        </div>
                      )
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 border-l border-slate-100 pl-5">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">Issued On</p>
                        <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {format(new Date(bill.createdAt), 'dd MMM, yyyy')}
                        </p>
                      </div>
                      {bill.status === 'paid' && bill.paymentMethod && (
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">Payment</p>
                          <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5 capitalize">
                            {bill.paymentMethod === 'cash' ? <Banknote className="h-3 w-3 text-emerald-500" /> : <Sparkles className="h-3 w-3 text-brand-teal" />}
                            {bill.paymentMethod}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amount & CTA Section */}
                <div className="flex flex-row lg:flex-col lg:items-end lg:justify-center justify-between items-center gap-4 lg:pl-6 lg:border-l lg:border-slate-100 min-w-[140px]">
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-1">Total Due</p>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-sm font-black text-brand-teal font-display">₹</span>
                      <p className="text-4xl font-black text-brand-dark font-display tracking-tighter leading-none">
                        {Number(bill.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!['paid', 'refunded'].includes(bill.status) && currentUser?.role === 'patient' && (
                      <button
                        onClick={() => handlePayNow(bill)}
                        className="px-6 py-2.5 bg-brand-teal text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-brand-teal/25 hover:-translate-y-1 active:scale-95"
                      >
                        Pay Now
                      </button>
                    )}

                    {!['paid', 'refunded'].includes(bill.status) && isReceptionist && (
                      <button
                        onClick={() => handleMarkAsPaid(bill._id)}
                        className="flex items-center gap-2.5 px-6 py-2.5 bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-1 active:scale-95"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        Mark Paid
                      </button>
                    )}

                    <button
                      onClick={() => handleDownload(bill._id)}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-brand-teal hover:border-brand-teal/30 hover:bg-white hover:shadow-lg transition-all active:scale-90"
                      title="Download PDF Receipt"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          /* ── EMPTY STATE ── */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
            <div className="h-16 w-16 rounded-2xl bg-brand-light flex items-center justify-center mb-4">
              <ReceiptText className="h-8 w-8 text-brand-teal/50" />
            </div>
            <h3 className="text-lg font-black text-brand-dark mb-2">No Bills Found</h3>
            <p className="text-sm text-slate-400 font-medium text-center max-w-xs">
              {search || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : isReceptionist
                  ? 'Create a bill from the Patients registry.'
                  : "You don't have any medical bills yet."}
            </p>
            {(search || statusFilter !== 'all') && (
              <button onClick={() => { setSearch(''); setStatusFilter('all'); }}
                className="mt-4 px-5 py-2 rounded-xl bg-brand-light text-brand-teal text-xs font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all">
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── INFO BANNER ── */}
      <div className="flex items-start gap-4 p-5 bg-brand-light rounded-2xl border border-brand-teal/10">
        <div className="h-9 w-9 rounded-xl bg-brand-teal/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="h-4 w-4 text-brand-teal" />
        </div>
        <div>
          <p className="text-sm font-black text-brand-dark">Secure Billing Environment</p>
          <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
            All transactions are encrypted and secure. For billing queries, contact the hospital billing department at{' '}
            <span className="font-bold text-brand-dark">+91 98765 43210</span>.
          </p>
        </div>
      </div>

      {/* ── MOCK PAYMENT MODAL ── */}
      {showMockModal && selectedBill && (
        <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-lg flex items-center justify-center z-[200] p-4" onClick={() => setShowMockModal(false)}>
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden animate-slide-up" onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="relative px-8 py-8 bg-brand-teal text-white overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-dark/20 rounded-full blur-3xl" />
              <button onClick={() => setShowMockModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10">
                <X className="h-5 w-5" />
              </button>
              <div className="relative z-10 flex items-center gap-4">
                <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black font-display tracking-wide">Secure Payment</h2>
                  <p className="text-white/70 text-sm font-medium">OrvantaHealth Demo Portal</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference</span>
                  <span className="text-sm font-black text-brand-dark font-display">#{selectedBill.billNumber || selectedBill._id.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Amount</span>
                    <span className="text-4xl font-black text-brand-dark font-display">₹{selectedBill.total}</span>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-emerald-100">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Demo Mode</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="h-9 w-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-black text-xs text-blue-600">VISA</div>
                  <span className="text-sm font-bold">•••• •••• •••• 4242</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="h-9 w-12 bg-white border border-slate-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium">Auto-testing enabled for this transaction</span>
                </div>
              </div>

              <button
                disabled={mockLoading}
                onClick={handleMockPayment}
                className="w-full py-4 rounded-2xl text-white font-black font-display uppercase tracking-widest text-sm shadow-xl transition-all active:scale-[0.98] bg-brand-dark hover:bg-slate-800 disabled:bg-slate-300"
              >
                {mockLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : 'Complete Demo Payment'}
              </button>

              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] leading-relaxed">
                Simulated transaction · No real money charged
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;
