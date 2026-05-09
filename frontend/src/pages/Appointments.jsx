import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  Calendar, Clock, User, XCircle, CheckCircle,
  FileText, Stethoscope, Activity, RefreshCw,
  LogIn, LogOut, ClipboardList, Ban, ChevronDown, CreditCard, Banknote
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import PrescriptionModal from '../components/PrescriptionModal';
import ConfirmDialog from '../components/ConfirmDialog';

/* ─── Status config ─────────────────────────────────────────────────────── */
const STATUS_CONFIG = {
  pending:     { label: 'Pending',     color: '#d97706', bg: '#fef3c7', dot: '#fbbf24' },
  confirmed:   { label: 'Confirmed',   color: '#059669', bg: '#d1fae5', dot: '#10b981' },
  checked_in:  { label: 'In Service',  color: '#2563eb', bg: '#dbeafe', dot: '#3b82f6' },
  checked_out: { label: 'Checked Out', color: '#7c3aed', bg: '#ede9fe', dot: '#8b5cf6' },
  completed:   { label: 'Completed',   color: '#4338ca', bg: '#e0e7ff', dot: '#6366f1' },
  cancelled:   { label: 'Cancelled',   color: '#dc2626', bg: '#fee2e2', dot: '#f87171' },
};

const FILTER_TABS = [
  { value: 'all',         label: 'All' },
  { value: 'pending',     label: 'Pending' },
  { value: 'confirmed',   label: 'Confirmed' },
  { value: 'checked_in',  label: 'In Service' },
  { value: 'checked_out', label: 'Checked Out' },
  { value: 'completed',   label: 'Completed' },
  { value: 'cancelled',   label: 'Cancelled' },
];

/* ─── Status Badge ──────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || { label: status, color: '#64748b', bg: '#f1f5f9', dot: '#94a3b8' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '3px 10px', borderRadius: '999px',
      fontSize: '11px', fontWeight: 700,
      color: cfg.color, background: cfg.bg,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
      {cfg.label}
    </span>
  );
};

/* ─── Payment Badge ─────────────────────────────────────────────────────── */
const PAYMENT_BADGE = {
  online_paid:       { label: 'Online Paid',        color: '#059669', bg: '#d1fae5', dot: '#10b981' },
  online_pending:    { label: 'Online (Unpaid)',     color: '#d97706', bg: '#fef3c7', dot: '#fbbf24' },
  reception_paid:    { label: 'Paid at Reception',  color: '#2563eb', bg: '#dbeafe', dot: '#3b82f6' },
  reception_pending: { label: 'Pay at Reception',   color: '#7c3aed', bg: '#ede9fe', dot: '#8b5cf6' },
  refunded:          { label: 'Refunded',            color: '#dc2626', bg: '#fee2e2', dot: '#f87171' },
};

const PaymentBadge = ({ appointment }) => {
  const { paymentMode, paymentStatus } = appointment;
  let key = 'reception_pending';
  if (paymentStatus === 'refunded') key = 'refunded';
  else if (paymentStatus === 'paid' && paymentMode === 'online') key = 'online_paid';
  else if (paymentStatus === 'paid' && paymentMode === 'at_reception') key = 'reception_paid';
  else if (paymentStatus === 'pending' && paymentMode === 'online') key = 'online_pending';
  else key = 'reception_pending';

  const cfg = PAYMENT_BADGE[key];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 999,
      fontSize: 10, fontWeight: 700,
      color: cfg.color, background: cfg.bg, marginLeft: 4,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
      {cfg.label}
    </span>
  );
};

/* ─── Main Component ────────────────────────────────────────────────────── */
const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState(user?.role === 'receptionist' ? 'pending' : 'all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, appointmentId: null });
  const [markPaidDialog, setMarkPaidDialog] = useState({ open: false, appt: null, amount: '' });

  useEffect(() => { fetchAppointments(); }, [filter]);

  const fetchAppointments = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const res = await api.get('/appointments', { params });
      if (res.data.success) setAppointments(res.data.data.appointments);
    } catch {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCancel = (appointmentId) => setConfirmDialog({ open: true, appointmentId });

  const confirmCancel = async () => {
    const { appointmentId } = confirmDialog;
    setConfirmDialog({ open: false, appointmentId: null });
    try {
      const res = await api.patch(`/appointments/${appointmentId}/cancel`, { reason: 'Cancelled by patient' });
      if (res.data.success) { toast.success('Appointment cancelled'); fetchAppointments(); }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  const handleUpdateStatus = async (status) => {
    if (!selectedAppointment) return;
    try {
      const res = await api.patch(`/appointments/${selectedAppointment._id}/status`, { status });
      if (res.data.success) {
        toast.success(`Status updated to ${status}`);
        setShowStatusModal(false);
        setSelectedAppointment(null);
        fetchAppointments();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  // Open the Mark Paid dialog — pre-fill doctor's consultation fee
  const openMarkPaidDialog = (appt) => {
    const fee = appt.doctorId?.consultationFee ?? '';
    setMarkPaidDialog({ open: true, appt, amount: String(fee) });
  };

  const confirmMarkPaid = async () => {
    const { appt } = markPaidDialog;
    const amount = appt.doctorId?.consultationFee || 0;
    setMarkPaidDialog({ open: false, appt: null, amount: '' });
    try {
      const res = await api.patch(`/payments/mark-paid/${appt._id}`, { amount });
      if (res.data.success) {
        toast.success(`₹${Number(amount).toLocaleString('en-IN')} collected — payment recorded ✓`);
        fetchAppointments();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to mark payment');
    }
  };


  // Inline direct update (doctor check-in/out)
  const handleUpdateStatusDirect = async (appointment, status) => {
    try {
      const res = await api.patch(`/appointments/${appointment._id}/status`, { status });
      if (res.data.success) {
        toast.success(status === 'checked_in' ? 'Patient checked in ✓' : 'Patient checked out ✓');
        fetchAppointments();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const openStatusModal = (appt) => { setSelectedAppointment(appt); setShowStatusModal(true); };
  const openPrescriptionModal = (appt) => { setSelectedAppointment(appt); setShowPrescriptionModal(true); };

  const getAvailableStatuses = (appt) => {
    if (user.role === 'receptionist' || user.role === 'superadmin') {
      if (appt.status === 'pending')    return ['confirmed', 'cancelled'];
      if (appt.status === 'confirmed')  return ['cancelled'];
      if (appt.status === 'checked_in') return ['cancelled'];
    }
    return [];
  };

  const isReceptionist = user.role === 'receptionist' || user.role === 'superadmin';
  const isDoctor       = user.role === 'doctor';
  const isPatient      = user.role === 'patient';

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 12 }}>
        <div className="loading-spinner" />
        <p style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading…</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 0 60px', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
            {isPatient ? 'My Appointments' : isDoctor ? 'Patient Queue' : 'Appointments'}
          </h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            {isReceptionist ? 'Confirm or cancel pending bookings' : isDoctor ? 'Your confirmed patient queue' : 'Your scheduled consultations'}
          </p>
        </div>
        <button
          onClick={() => fetchAppointments(true)}
          disabled={refreshing}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 8,
            border: '1px solid #e2e8f0', background: '#fff',
            fontSize: 12, fontWeight: 600, color: '#475569',
            cursor: 'pointer', transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
        >
          <RefreshCw size={13} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
          Refresh
        </button>
      </div>

      {/* ── Filter Tabs ── */}
      <div style={{
        display: 'flex', gap: 4, flexWrap: 'wrap',
        background: '#f1f5f9', borderRadius: 10,
        padding: 4, marginBottom: 20,
      }}>
        {FILTER_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            style={{
              padding: '6px 14px', borderRadius: 7, border: 'none',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.15s',
              background: filter === tab.value ? '#fff' : 'transparent',
              color: filter === tab.value ? '#0f172a' : '#64748b',
              boxShadow: filter === tab.value ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Appointment List ── */}
      {appointments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {appointments.map((appt) => {
            const primaryName = isPatient
              ? `Dr. ${appt.doctorId?.userId?.profile?.firstName || ''} ${appt.doctorId?.userId?.profile?.lastName || 'Unknown'}`
              : `${appt.patientId?.userId?.profile?.firstName || ''} ${appt.patientId?.userId?.profile?.lastName || 'Unknown Patient'}`;

            const availableStatuses = getAvailableStatuses(appt);
            const dateStr = appt.date ? format(new Date(appt.date), 'dd MMM yyyy') : '—';
            const timeStr = appt.timeSlot ? `${appt.timeSlot.start} – ${appt.timeSlot.end}` : '—';
            const type    = appt.consultationType || 'In-person';

            return (
              <div
                key={appt._id}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  transition: 'box-shadow 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Avatar */}
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Stethoscope size={18} color="#059669" />
                </div>

                {/* Main info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {primaryName}
                    </span>
                    <StatusBadge status={appt.status} />
                    {(!isPatient || appt.paymentMode) && (
                      <PaymentBadge appointment={appt} />
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
                      <Calendar size={12} /> {dateStr}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
                      <Clock size={12} /> {timeStr}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
                      <Activity size={12} /> {type}
                    </span>
                    {!isPatient && appt.patientId?.medicalRecordNumber && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 800, color: '#0f766e', background: '#f0fdf9', border: '1px solid #ccfbf1', borderRadius: 999, padding: '2px 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        # {appt.patientId.medicalRecordNumber}
                      </span>
                    )}
                    {!isPatient && appt.patientId?.userId?.profile?.email && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94a3b8' }}>
                        <User size={12} /> {appt.patientId.userId.profile.email}
                      </span>
                    )}
                  </div>
                  {appt.symptoms && (
                    <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4, fontStyle: 'italic' }}>
                      {appt.symptoms}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>

                  {/* Patient: Cancel */}
                  {isPatient && ['pending', 'confirmed'].includes(appt.status) && (
                    <SmallBtn
                      onClick={() => handleCancel(appt._id)}
                      color="#dc2626" bg="#fee2e2" hoverBg="#fecaca"
                      icon={<XCircle size={13} />}
                    >
                      Cancel
                    </SmallBtn>
                  )}

                  {/* Doctor actions */}
                  {isDoctor && appt.status === 'confirmed' && (
                    <SmallBtn onClick={() => handleUpdateStatusDirect(appt, 'checked_in')} color="#2563eb" bg="#dbeafe" hoverBg="#bfdbfe" icon={<LogIn size={13} />}>Check In</SmallBtn>
                  )}
                  {isDoctor && appt.status === 'checked_in' && (
                    <SmallBtn onClick={() => handleUpdateStatusDirect(appt, 'checked_out')} color="#d97706" bg="#fef3c7" hoverBg="#fde68a" icon={<LogOut size={13} />}>Check Out</SmallBtn>
                  )}
                  {isDoctor && ['checked_out', 'completed'].includes(appt.status) && (
                    <SmallBtn onClick={() => openPrescriptionModal(appt)} color="#0f172a" bg="#f1f5f9" hoverBg="#e2e8f0" icon={<FileText size={13} />}>
                      {appt.prescription ? 'Update Rx' : 'Prescribe'}
                    </SmallBtn>
                  )}

                  {/* Receptionist: Confirm + Cancel + Mark Paid as inline buttons */}
                  {isReceptionist && appt.status === 'pending' && (() => {
                    const needsPayment = appt.paymentMode === 'at_reception' && appt.paymentStatus !== 'paid';
                    return (
                      <>
                        {needsPayment ? (
                          // Locked Confirm — payment not yet collected
                          <span
                            title="Collect payment first before confirming"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 5,
                              padding: '6px 12px', borderRadius: 7,
                              fontSize: 12, fontWeight: 700,
                              background: '#f1f5f9', color: '#94a3b8',
                              cursor: 'not-allowed', whiteSpace: 'nowrap',
                              border: '1px dashed #cbd5e1',
                            }}
                          >
                            🔒 Confirm
                          </span>
                        ) : (
                          <SmallBtn
                            onClick={() => { setSelectedAppointment(appt); handleUpdateStatus_inline(appt, 'confirmed'); }}
                            color="#059669" bg="#d1fae5" hoverBg="#a7f3d0"
                            icon={<CheckCircle size={13} />}
                          >
                            Confirm
                          </SmallBtn>
                        )}
                        <SmallBtn
                          onClick={() => { setSelectedAppointment(appt); handleUpdateStatus_inline(appt, 'cancelled'); }}
                          color="#dc2626" bg="#fee2e2" hoverBg="#fecaca"
                          icon={<Ban size={13} />}
                        >
                          Cancel
                        </SmallBtn>
                      </>
                    );
                  })()}
                  {/* Mark Paid button: show for at_reception + unpaid appointments for receptionist */}
                  {isReceptionist
                    && appt.paymentStatus !== 'paid'
                    && appt.paymentMode === 'at_reception'
                    && ['pending', 'confirmed', 'checked_in'].includes(appt.status) && (
                    <SmallBtn
                      onClick={() => openMarkPaidDialog(appt)}
                      color="#0369a1" bg="#e0f2fe" hoverBg="#bae6fd"
                      icon={<Banknote size={13} />}
                    >
                      Mark Paid
                    </SmallBtn>
                  )}
                </div>
              </div>
            );

            // Inline status update without modal (receptionist only)
            async function handleUpdateStatus_inline(appt, status) {
              try {
                const res = await api.patch(`/appointments/${appt._id}/status`, { status });
                if (res.data.success) {
                  toast.success(status === 'confirmed' ? '✓ Appointment confirmed' : 'Appointment cancelled');
                  fetchAppointments();
                }
              } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to update');
              }
            }
          })}
        </div>
      ) : (
        /* ── Empty state ── */
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0',
        }}>
          <div style={{ width: 48, height: 48, background: '#f0fdf9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <ClipboardList size={22} color="#059669" />
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>No appointments found</h3>
          <p style={{ fontSize: 13, color: '#94a3b8' }}>
            {filter !== 'all' ? `No ${filter} appointments right now.` : "No appointments yet."}
          </p>
          {isPatient && (
            <a
              href="/patient/book-appointment"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 20, padding: '9px 20px',
                background: '#0f172a', color: '#fff',
                borderRadius: 8, fontSize: 13, fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Calendar size={14} /> Book Appointment
            </a>
          )}
        </div>
      )}

      {/* ── Status Update Modal (superadmin fallback) ── */}
      {showStatusModal && selectedAppointment && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16,
        }}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: 28,
            maxWidth: 360, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Update Status</h2>
            <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: 10, marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                {selectedAppointment.patientId?.userId?.profile?.firstName} {selectedAppointment.patientId?.userId?.profile?.lastName}
              </p>
              <StatusBadge status={selectedAppointment.status} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              {getAvailableStatuses(selectedAppointment).map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(status)}
                  style={{
                    padding: '11px', borderRadius: 10, border: 'none',
                    fontWeight: 700, fontSize: 13, cursor: 'pointer',
                    background: status === 'confirmed' ? '#d1fae5' : '#fee2e2',
                    color: status === 'confirmed' ? '#059669' : '#dc2626',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  {status === 'confirmed' ? <CheckCircle size={15} /> : <Ban size={15} />}
                  <span style={{ textTransform: 'capitalize' }}>{status}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => { setShowStatusModal(false); setSelectedAppointment(null); }}
              style={{
                width: '100%', padding: 10, border: '1px solid #e2e8f0',
                borderRadius: 10, background: 'transparent',
                fontSize: 13, color: '#64748b', cursor: 'pointer', fontWeight: 600,
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── Prescription Modal ── */}
      {showPrescriptionModal && selectedAppointment && (
        <PrescriptionModal
          isOpen={showPrescriptionModal}
          onClose={() => { setShowPrescriptionModal(false); setSelectedAppointment(null); }}
          appointment={selectedAppointment}
          onSuccess={fetchAppointments}
        />
      )}

      {/* ── Cancel Confirmation ── */}
      <ConfirmDialog
        isOpen={confirmDialog.open}
        title="Cancel Appointment?"
        message="Are you sure you want to cancel this appointment? This action cannot be undone."
        confirmLabel="Yes, Cancel It"
        cancelLabel="Keep Appointment"
        variant="danger"
        onConfirm={confirmCancel}
        onCancel={() => setConfirmDialog({ open: false, appointmentId: null })}
      />


      {/* ── Mark Paid Dialog ── */}
      {markPaidDialog.open && markPaidDialog.appt && (() => {
        const a = markPaidDialog.appt;
        const drFirst = a.doctorId?.userId?.profile?.firstName || '';
        const drLast  = a.doctorId?.userId?.profile?.lastName  || '';
        const ptFirst = a.patientId?.userId?.profile?.firstName || a.patientId?.name || 'Patient';
        const ptLast  = a.patientId?.userId?.profile?.lastName  || '';
        const fee     = a.doctorId?.consultationFee || 0;
        const dept    = a.doctorId?.department || '';
        const date    = a.date ? new Date(a.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
        return (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(10,20,40,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}>
            <div style={{
              background: '#fff', borderRadius: 20,
              width: '100%', maxWidth: 480,
              boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>

              {/* ── Compact Top Banner ── */}
              <div style={{
                background: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)',
                padding: '18px 24px',
                position: 'relative',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{
                    width:42, height:42, borderRadius:12,
                    background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
                  }}>💵</div>
                  <div>
                    <p style={{ margin:0, fontWeight:800, fontSize:18, color:'#fff' }}>Collect Payment</p>
                    <p style={{ margin:0, fontSize:12, color:'rgba(255,255,255,0.8)' }}>Recorded for analytics</p>
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div style={{ padding: '20px 24px', display:'flex', flexDirection:'column', gap:16 }}>

                {/* Patient & Doctor info grid (Tight) */}
                <div style={{
                  display:'grid', gridTemplateColumns:'1fr 1fr', gap:10,
                }}>
                  {[{
                    icon:'👤', label:'Patient', value:`${ptFirst} ${ptLast}`,
                  },{
                    icon:'🩺', label:'Doctor', value:`Dr. ${drFirst}`,
                    sub: dept,
                  },{
                    icon:'📅', label:'Date', value: date,
                  },{
                    icon:'⏰', label:'Slot', value:`${a.timeSlot?.start} – ${a.timeSlot?.end}`,
                  }].map(({ icon, label, value, sub }) => (
                    <div key={label} style={{
                      background:'#f8fafc', borderRadius:10,
                      padding:'10px 12px', border:'1px solid #e2e8f0',
                    }}>
                      <p style={{ margin:0, fontSize:10, fontWeight:600, color:'#94a3b8', textTransform:'uppercase' }}>
                        {icon} {label}
                      </p>
                      <p style={{ margin:'2px 0 0', fontSize:13, fontWeight:700, color:'#0f172a', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Fee display (Compact) */}
                <div style={{
                  background:'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                  border:'1px solid #bae6fd', borderRadius:12,
                  padding:'14px 20px',
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                  <div>
                    <p style={{ margin:0, fontSize:10, fontWeight:700, color:'#0369a1', textTransform:'uppercase' }}>Consultation Fee</p>
                    <p style={{ margin:0, fontSize:28, fontWeight:900, color:'#0369a1' }}>
                      ₹{Number(fee).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <span style={{ background:'#0369a1', color:'#fff', padding:'3px 8px', borderRadius:6, fontSize:10, fontWeight:800 }}>CASH ONLY</span>
                  </div>
                </div>

                {/* Notice (1-line if possible) */}
                <div style={{
                  display:'flex', alignItems:'center', gap:8,
                  background:'#fffbeb', border:'1px solid #fde68a',
                  borderRadius:8, padding:'10px 12px', fontSize:11, color:'#92400e',
                }}>
                  <span>⚠️</span>
                  <span>Verify cash collection. This action is permanent.</span>
                </div>

                {/* Buttons */}
                <div style={{ display:'flex', gap:10 }}>
                  <button
                    onClick={() => setMarkPaidDialog({ open: false, appt: null, amount: '' })}
                    style={{
                      padding:'11px 20px', borderRadius:10,
                      border:'1.5px solid #e2e8f0', background:'#fff',
                      color:'#64748b', fontWeight:700, fontSize:13, cursor:'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmMarkPaid}
                    style={{
                      flex:1, padding:'11px 0', borderRadius:10, border:'none',
                      background:'linear-gradient(135deg, #0369a1, #0284c7)',
                      color:'#fff', fontWeight:800, fontSize:14, cursor:'pointer',
                      boxShadow:'0 4px 12px rgba(3,105,161,0.25)',
                    }}
                  >
                    ✓ Confirm Receipt
                  </button>
                </div>

              </div>
            </div>
          </div>
        );
      })()}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

/* ─── Small action button ───────────────────────────────────────────────── */
const SmallBtn = ({ onClick, color, bg, hoverBg, icon, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '6px 12px', borderRadius: 7, border: 'none',
        fontSize: 12, fontWeight: 700, cursor: 'pointer',
        background: hovered ? hoverBg : bg,
        color, transition: 'background 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {icon}{children}
    </button>
  );
};

export default Appointments;
