import React, { useState, useEffect } from 'react';
import {
  Calendar, DollarSign, FileText, TestTube, User, Clock,
  ChevronRight, ArrowRight, Activity, Shield, Heart, Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    totalBills: 0,
    prescriptions: 0,
    labReports: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientStats();
  }, []);

  const fetchPatientStats = async () => {
    try {
      const [appointmentsRes, billsRes, prescriptionsRes, labReportsRes] = await Promise.all([
        api.get('/patient/appointments'),
        api.get('/patient/bills'),
        api.get('/patient/prescriptions'),
        api.get('/patient/lab-reports'),
      ]);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      setStats({
        upcomingAppointments: appointmentsRes.data.data.appointments.filter(
          apt => new Date(apt.date) >= today && apt.status !== 'cancelled'
        ).length,
        totalBills: billsRes.data.data.bills.filter(
          bill => !['paid', 'refunded', 'cancelled'].includes(bill.status)
        ).length,
        prescriptions: prescriptionsRes.data.data.prescriptions.length,
        labReports: labReportsRes.data.data.labReports.length,
      });
    } catch (error) {
      console.error('Failed to fetch patient stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      name: 'Book Appointment',
      description: 'Schedule a new clinical consultation',
      icon: Calendar,
      href: '/patient/book-appointment',
      color: 'text-brand-teal',
      bg: 'bg-brand-light'
    },
    {
      name: 'My Appointments',
      description: 'Manage your active medical queue',
      icon: Clock,
      href: '/patient/appointments',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      name: 'Bills & Payments',
      description: 'Review and settle pending dues',
      icon: DollarSign,
      href: '/patient/bills',
      color: 'text-rose-500',
      bg: 'bg-rose-50'
    },
    {
      name: 'Prescriptions',
      description: 'Access your issued digital scripts',
      icon: FileText,
      href: '/patient/prescriptions',
      color: 'text-violet-500',
      bg: 'bg-violet-50'
    },
    {
      name: 'Lab Reports',
      description: 'Review your laboratory diagnostics',
      icon: TestTube,
      href: '/patient/lab-reports',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      name: 'Profile',
      description: 'Manage clinical identity & records',
      icon: User,
      href: '/patient/profile',
      color: 'text-brand-dark',
      bg: 'bg-slate-100'
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="loading-spinner"></div>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Personalizing Your Health Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Patient Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Personal Health Hub</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight leading-tight mb-2">
            Hello, <span className="text-brand-teal">{user?.profile?.firstName || 'Back'}</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-md">
            Your comprehensive medical journey, centralized and secure.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
          <Shield className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-semibold text-slate-700">Data Privacy: Encrypted</span>
        </div>
      </div>

      {/* Vital Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Queue", value: stats.upcomingAppointments, icon: Calendar, color: "text-brand-teal", bg: "bg-brand-light" },
          { label: "Pending Bills", value: stats.totalBills, icon: DollarSign, color: "text-rose-500", bg: "bg-rose-50" },
          { label: "Digital Scripts", value: stats.prescriptions, icon: FileText, color: "text-violet-500", bg: "bg-violet-50" },
          { label: "Lab Reports", value: stats.labReports, icon: TestTube, color: "text-blue-500", bg: "bg-blue-50" },
        ].map((metric, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 ${metric.bg} opacity-30 rounded-bl-full`}></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className={`p-3 rounded-xl ${metric.bg} ${metric.color} w-fit shadow-sm`}>
                <metric.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{metric.label}</p>
                <p className={`text-3xl font-bold ${metric.color} leading-none`}>{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Quick Launchpad */}
      <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Medical Actions</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Navigate your clinical workspace</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="group relative flex flex-col items-start p-6 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-all duration-300 hover:border-brand-teal/30 hover:shadow-md"
            >
              <div className={`p-3 rounded-xl ${action.bg} mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">{action.name}</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">{action.description}</p>

              <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-brand-teal group-hover:text-teal-700">
                Initialize Action
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Wellness Insight Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 md:p-10 text-white shadow-lg group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              <Shield className="h-3.5 w-3.5 text-brand-teal fill-brand-teal" />
              <span className="text-xs font-semibold text-teal-100">Integrated Wellness Shield</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Empowering Your <span className="text-brand-teal">Health Journey</span>
            </h2>
            <p className="text-teal-100/70 font-medium max-w-xl text-sm leading-relaxed">
              Your health isn't just a priority—it's our obsession. Access and manage your medical records,
              consult with the world's best clinicians, and let our AI-powered diagnostics assist you
              every step of the way. All within a secured, high-fidelity environment.
            </p>
          </div>

          <div className="flex-shrink-0 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/patient/book-appointment')}
              className="px-8 py-3.5 bg-brand-teal hover:bg-teal-500 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Book Consultation Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

