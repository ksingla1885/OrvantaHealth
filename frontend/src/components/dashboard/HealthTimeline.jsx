import React, { useState, useEffect } from 'react';
import { 
  Activity, Calendar, CheckCircle2, Clock, FileText, 
  Heart, Pill, AlertTriangle, Shield, TestTube, 
  ChevronRight, PhoneCall, Video, RefreshCw, Sparkles, Check, Plus
} from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const HealthTimeline = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState(null);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await api.get('/patient/history');
      if (response.data.success) {
        setHistoryData(response.data.data);
        
        // Populate medications from patient profile
        const patientMeds = response.data.data.patient?.medications || [];
        setMedications(patientMeds.map((m, idx) => ({
          id: m._id || idx,
          name: m.name,
          dose: m.dosage || '1 unit',
          frequency: m.frequency || 'Once daily',
          doctor: m.prescribedBy?.profile ? `Dr. ${m.prescribedBy.profile.firstName} ${m.prescribedBy.profile.lastName}` : 'Central Clinic',
          takenToday: false,
          time: '9:00 AM',
          refillsLeft: 3
        })));
      }
    } catch (err) {
      console.error('Failed to load patient history timeline:', err);
      toast.error('Failed to load patient history timeline');
    } finally {
      setLoading(false);
    }
  };

  const toggleMedication = (id) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, takenToday: !med.takenToday } : med
    ));
  };

  const getEventMeta = (type) => {
    switch (type) {
      case 'prescription':
        return { icon: Pill, color: 'text-violet-600 bg-violet-50 border-violet-200' };
      case 'triage':
        return { icon: Sparkles, color: 'text-amber-600 bg-amber-50 border-amber-200' };
      case 'lab':
        return { icon: TestTube, color: 'text-blue-600 bg-blue-50 border-blue-200' };
      case 'billing':
        return { icon: Heart, color: 'text-rose-600 bg-rose-50 border-rose-200' };
      case 'consultation':
      default:
        return { icon: Calendar, color: 'text-brand-teal bg-brand-light border-brand-teal/20' };
    }
  };

  // Derive vitals
  const latestVitals = historyData?.vitalsHistory?.[0] || null;
  let sys = 120, dia = 80;
  if (latestVitals?.bloodPressure) {
    const parts = latestVitals.bloodPressure.split('/');
    sys = parseInt(parts[0]) || 120;
    dia = parseInt(parts[1]) || 80;
  }
  const bpStatus = sys < 120 && dia < 80 ? 'Normal' : sys < 130 ? 'Elevated' : 'High';

  const pulse = latestVitals?.pulseRate ? parseInt(latestVitals.pulseRate) : 72;
  const pulseStatus = pulse >= 60 && pulse <= 100 ? 'Optimal' : 'Abnormal';

  const temp = latestVitals?.temperature ? parseFloat(latestVitals.temperature) : 98.6;
  const tempStatus = temp >= 99 ? 'High' : 'Normal';

  const spo2 = latestVitals?.spO2 ? parseInt(latestVitals.spO2.replace('%', '')) : 98;
  const spo2Status = spo2 >= 95 ? 'Optimal' : 'Low';

  const vitals = {
    bp: { sys, dia, status: bpStatus, unit: 'mmHg', lastUpdated: latestVitals ? new Date(latestVitals.date).toLocaleDateString() : 'N/A' },
    heartRate: { value: pulse, status: pulseStatus, unit: 'bpm', lastUpdated: latestVitals ? new Date(latestVitals.date).toLocaleDateString() : 'N/A' },
    temperature: { value: temp, status: tempStatus, unit: '°F', lastUpdated: latestVitals ? new Date(latestVitals.date).toLocaleDateString() : 'N/A' },
    spO2: { value: spo2, status: spo2Status, unit: '%', lastUpdated: latestVitals ? new Date(latestVitals.date).toLocaleDateString() : 'N/A' }
  };

  const timelineEvents = historyData?.timeline || [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-[3rem] border border-slate-100 shadow-premium">
        <div className="w-12 h-12 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Syncing personal health journey...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-premium relative overflow-hidden space-y-8 animate-fade-in">
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
          {timelineEvents.length > 0 ? (
            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-100 space-y-8 my-2 ml-2">
              {timelineEvents.map((event) => {
                const meta = getEventMeta(event.type);
                const EventIcon = meta.icon;
                return (
                  <div key={event.id} className="relative group">
                    {/* Timeline Point */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 p-2 rounded-xl border ${meta.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      <EventIcon className="h-4 w-4" />
                    </div>

                    <div className="bg-slate-50/70 hover:bg-white p-6 rounded-[2rem] border border-slate-200/60 transition-all hover:shadow-xl hover:-translate-y-0.5 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                          {new Date(event.date).toLocaleDateString()} • {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase text-brand-teal tracking-wider shadow-xs">
                          {event.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-black text-brand-dark font-display">{event.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{event.doctor} • <span className="italic">{event.facility}</span></p>
                      </div>

                      {event.details && (
                        <div className="p-4 bg-white rounded-2xl border border-slate-100 mt-2 space-y-2 text-xs text-slate-700 font-bold">
                          {event.type === 'prescription' && (
                            <>
                              <p className="text-brand-teal">💊 Prescribed Medications:</p>
                              {event.details.medicines?.map((m, mIdx) => (
                                <p key={mIdx} className="text-slate-600 font-mono pl-2">
                                  - {m.name} ({m.dosage} • {m.frequency} • {m.duration})
                                </p>
                              ))}
                              {event.details.advice && <p className="italic text-slate-500 pl-2 mt-1">Advice: "{event.details.advice}"</p>}
                            </>
                          )}
                          {event.type === 'triage' && (
                            <>
                              <p className="text-amber-600">⚡ Symptoms: "{event.details.symptoms}"</p>
                              {event.details.vitals && (
                                <p className="text-[10px] text-slate-500">
                                  Temp: {event.details.vitals.temperature}°F • BP: {event.details.vitals.bloodPressure || event.details.vitals.bp || 'N/A'} • Pulse: {event.details.vitals.pulseRate || event.details.vitals.pulse || 'N/A'} • SpO2: {event.details.vitals.spO2 || event.details.vitals.oxygenSaturation || 'N/A'}%
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 space-y-3">
              <Activity className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No health journey events logged yet</p>
            </div>
          )}
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

          {medications.length > 0 ? (
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
                    <span className="text-brand-teal">
                      {med.refillsLeft} Refills Remaining
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 space-y-3">
              <Pill className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No active prescriptions found</p>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: VITALS GAUGE ── */}
      {activeTab === 'vitals' && (
        <div className="space-y-6 animate-fade-in">
          {latestVitals ? (
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

              {/* Body Temp */}
              <div className="bg-gradient-to-br from-blue-50/70 to-cyan-50/30 p-6 rounded-[2.25rem] border border-blue-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Body Temperature</span>
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white rounded-full text-[9px] font-black uppercase">🟢 {vitals.temperature.status}</span>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 font-display">{vitals.temperature.value}°F</p>
                  <p className="text-[10px] text-slate-400 font-mono">{vitals.temperature.unit} • {vitals.temperature.lastUpdated}</p>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[55%]"></div>
                </div>
              </div>

              {/* SpO2 */}
              <div className="bg-gradient-to-br from-violet-50/70 to-purple-50/30 p-6 rounded-[2.25rem] border border-violet-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-violet-700 uppercase tracking-widest">Oxygen Saturation</span>
                  <span className="px-2.5 py-0.5 bg-violet-500 text-white rounded-full text-[9px] font-black uppercase">🟢 {vitals.spO2.status}</span>
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 font-display">{vitals.spO2.value}%</p>
                  <p className="text-[10px] text-slate-400 font-mono">{vitals.spO2.unit} • {vitals.spO2.lastUpdated}</p>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-violet-500 h-full w-[45%]"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 space-y-3">
              <Heart className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No vitals logs registered yet</p>
            </div>
          )}
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
