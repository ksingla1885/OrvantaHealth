import React, { useState } from 'react';
import { 
  Activity, Calendar, CheckCircle2, Clock, FileText, 
  Heart, Pill, AlertTriangle, Shield, TestTube, 
  ChevronRight, PhoneCall, Video, RefreshCw, Sparkles, Check, Plus
} from 'lucide-react';

const HealthTimeline = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [medications, setMedications] = useState([
    { id: 1, name: 'Amoxicillin 500mg', dose: '1 Capsule', frequency: 'Twice Daily (8:00 AM, 8:00 PM)', doctor: 'Dr. Marcus Vance', takenToday: true, time: '8:00 AM', refillsLeft: 2 },
    { id: 2, name: 'Atorvastatin 20mg', dose: '1 Tablet', frequency: 'Once Daily (Night - 10:00 PM)', doctor: 'Dr. Sarah Jenkins', takenToday: false, time: '10:00 PM', refillsLeft: 4 },
    { id: 3, name: 'Vitamin D3 60,000 IU', dose: '1 Chewable', frequency: 'Weekly (Sundays)', doctor: 'Dr. Marcus Vance', takenToday: true, time: '1:00 PM', refillsLeft: 1 },
    { id: 4, name: 'Metformin 500mg', dose: '1 Tablet', frequency: 'Twice Daily with meals', doctor: 'Dr. Emily Watson', takenToday: false, time: '8:30 PM', refillsLeft: 0 },
  ]);

  const [vitals] = useState({
    bp: { sys: 118, dia: 78, status: 'Normal', unit: 'mmHg', lastUpdated: 'Today, 9:30 AM' },
    heartRate: { value: 72, status: 'Optimal', unit: 'bpm', lastUpdated: 'Today, 9:30 AM' },
    bloodSugar: { value: 95, status: 'Fasting Normal', unit: 'mg/dL', lastUpdated: 'Yesterday' },
    hba1c: { value: 5.6, status: 'Excellent', unit: '%', lastUpdated: '15 days ago' },
  });

  const timelineEvents = [
    {
      id: 1,
      date: 'Today, 10:30 AM',
      type: 'consultation',
      title: 'General Cardiology Checkup',
      doctor: 'Dr. Marcus Vance',
      facility: 'Orvanta Central Clinic • Room 402',
      status: 'Confirmed',
      icon: Calendar,
      color: 'text-brand-teal bg-brand-light border-brand-teal/20'
    },
    {
      id: 2,
      date: 'Yesterday, 4:15 PM',
      type: 'lab',
      title: 'Comprehensive Lipid & Blood Panel',
      doctor: 'Ordered by Dr. Vance',
      facility: 'Orvanta BioLabs • Report #LAB-8821',
      status: 'Completed (Normal)',
      icon: TestTube,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      id: 3,
      date: '18 Jul 2026',
      type: 'prescription',
      title: 'Prescription Renewal Issued',
      doctor: 'Dr. Sarah Jenkins',
      facility: 'Orvanta Digital Rx Hub',
      status: 'Dispensed',
      icon: Pill,
      color: 'text-violet-600 bg-violet-50 border-violet-200'
    },
    {
      id: 4,
      date: '10 Jul 2026',
      type: 'triage',
      title: 'Symptom Triage Assessment',
      doctor: 'AI Clinical Assistant',
      facility: 'Risk Index: Low (2.1/10)',
      status: 'Archived',
      icon: Sparkles,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    }
  ];

  const toggleMedication = (id) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, takenToday: !med.takenToday } : med
    ));
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-premium relative overflow-hidden space-y-8">
      {/* Decorative Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-teal via-emerald-400 to-blue-500"></div>

      {/* Header & Section Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4 w-4 text-brand-teal" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Telemetry & Records</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-dark font-display">Personal Health Journey</h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
          {[
            { id: 'timeline', label: 'Timeline', icon: Calendar },
            { id: 'meds', label: 'Daily Meds', icon: Pill },
            { id: 'vitals', label: 'Vitals Gauge', icon: Heart },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-brand-dark shadow-md scale-105'
                  : 'text-slate-500 hover:text-brand-dark'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB 1: VISUAL HEALTH TIMELINE ── */}
      {activeTab === 'timeline' && (
        <div className="space-y-6 animate-fade-in">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-100 space-y-8 my-2">
            {timelineEvents.map((event) => (
              <div key={event.id} className="relative group">
                {/* Timeline Point */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1 p-2 rounded-xl border ${event.color} shadow-sm group-hover:scale-110 transition-transform`}>
                  <event.icon className="h-4 w-4" />
                </div>

                <div className="bg-slate-50/70 hover:bg-white p-6 rounded-[2rem] border border-slate-200/60 transition-all hover:shadow-xl hover:-translate-y-0.5 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{event.date}</span>
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase text-brand-teal tracking-wider shadow-xs">
                      {event.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-brand-dark font-display">{event.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{event.doctor} • <span className="italic">{event.facility}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: DAILY MEDICATION TRACKER ── */}
      {activeTab === 'meds' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between bg-brand-light/60 p-4 rounded-2xl border border-brand-teal/20">
            <div className="flex items-center gap-3">
              <Pill className="h-5 w-5 text-brand-teal" />
              <div>
                <p className="text-xs font-black text-brand-dark">Prescription Schedule Tracker</p>
                <p className="text-[10px] text-slate-500 font-medium">Check off doses taken today to keep your medical record synchronized.</p>
              </div>
            </div>
            <span className="text-xs font-black text-brand-teal bg-white px-3 py-1.5 rounded-xl border border-brand-teal/30 shadow-xs">
              {medications.filter(m => m.takenToday).length}/{medications.length} Taken Today
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medications.map((med) => (
              <div 
                key={med.id}
                onClick={() => toggleMedication(med.id)}
                className={`p-6 rounded-[2.25rem] border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  med.takenToday
                    ? 'bg-emerald-50/40 border-emerald-200 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-brand-teal/40 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-base font-black font-display ${med.takenToday ? 'line-through text-slate-400' : 'text-brand-dark'}`}>
                        {med.name}
                      </h4>
                      {med.refillsLeft === 0 && (
                        <span className="px-2 py-0.5 bg-rose-100 text-rose-600 rounded text-[9px] font-black uppercase">Refill Due</span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-500">{med.dose} • {med.frequency}</p>
                    <p className="text-[10px] text-slate-400">Prescribed by {med.doctor}</p>
                  </div>

                  <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    med.takenToday ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-brand-teal hover:text-white'
                  }`}>
                    {med.takenToday ? <Check className="h-5 w-5 stroke-[3]" /> : <Plus className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider pt-2 border-t border-slate-100/60">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Scheduled: {med.time}
                  </span>
                  <span className={med.refillsLeft > 0 ? 'text-brand-teal' : 'text-rose-500'}>
                    {med.refillsLeft} Refills Remaining
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: VITALS GAUGE ── */}
      {activeTab === 'vitals' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* BP Gauge */}
            <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/30 p-6 rounded-[2.25rem] border border-emerald-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Blood Pressure</span>
                <span className="px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase">🟢 {vitals.bp.status}</span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 font-display">{vitals.bp.sys}/{vitals.bp.dia}</p>
                <p className="text-[10px] text-slate-400 font-mono">{vitals.bp.unit} • Updated {vitals.bp.lastUpdated}</p>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[70%]"></div>
              </div>
            </div>

            {/* Heart Rate */}
            <div className="bg-gradient-to-br from-rose-50/70 to-pink-50/30 p-6 rounded-[2.25rem] border border-rose-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Resting Heart Rate</span>
                <span className="px-2.5 py-0.5 bg-rose-500 text-white rounded-full text-[9px] font-black uppercase">🟢 {vitals.heartRate.status}</span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 font-display">{vitals.heartRate.value}</p>
                <p className="text-[10px] text-slate-400 font-mono">{vitals.heartRate.unit} • Updated {vitals.heartRate.lastUpdated}</p>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full w-[65%]"></div>
              </div>
            </div>

            {/* Blood Sugar */}
            <div className="bg-gradient-to-br from-blue-50/70 to-cyan-50/30 p-6 rounded-[2.25rem] border border-blue-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Blood Glucose</span>
                <span className="px-2.5 py-0.5 bg-blue-500 text-white rounded-full text-[9px] font-black uppercase">🟢 {vitals.bloodSugar.status}</span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 font-display">{vitals.bloodSugar.value}</p>
                <p className="text-[10px] text-slate-400 font-mono">{vitals.bloodSugar.unit} • {vitals.bloodSugar.lastUpdated}</p>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[55%]"></div>
              </div>
            </div>

            {/* HbA1c */}
            <div className="bg-gradient-to-br from-violet-50/70 to-purple-50/30 p-6 rounded-[2.25rem] border border-violet-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-violet-700 uppercase tracking-widest">HbA1c Level</span>
                <span className="px-2.5 py-0.5 bg-violet-500 text-white rounded-full text-[9px] font-black uppercase">🟢 {vitals.hba1c.status}</span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 font-display">{vitals.hba1c.value}</p>
                <p className="text-[10px] text-slate-400 font-mono">{vitals.hba1c.unit} • {vitals.hba1c.lastUpdated}</p>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-violet-500 h-full w-[45%]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SOS EMERGENCY & TELEHEALTH DOCK ── */}
      <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
          <Shield className="h-4 w-4 text-emerald-500" />
          <span>Encrypted HIPAA Telehealth Endpoint • 24/7 Clinical Guard</span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => window.location.href = 'tel:911'}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-rose-200 transition-all shadow-xs"
          >
            <PhoneCall className="h-4 w-4" /> SOS Emergency
          </button>
          <button 
            onClick={() => window.location.href = '/patient/book-appointment'}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal hover:bg-brand-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-md transition-all hover:scale-105"
          >
            <Video className="h-4 w-4" /> Virtual Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthTimeline;
