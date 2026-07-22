import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User, Phone, Clipboard, Sparkles, Send, Heart, Thermometer, Droplets, Zap, Search } from 'lucide-react';
import api from '../../../services/api';
import { toast } from 'react-hot-toast';

const PatientIntake = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'male',
    contactNumber: '',
    symptoms: '',
    vitals: {
      temperature: '',
      bloodPressure: '',
      pulseRate: '',
      spO2: ''
    }
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/admin/patients');
        if (response.data.success) {
          setPatients(response.data.data.patients || []);
        }
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      }
    };
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/triage/intake', {
        ...formData,
        patientId: selectedPatientId
      });
      if (response.data.success) {
        toast.success('Patient intake successful! Analyzing symptoms...');
        setTimeout(() => {
          navigate('/receptionist/triage/queue');
        }, 1500);
      }
    } catch (error) {
      console.error('Intake failed:', error);
      toast.error(error.response?.data?.message || 'Intake failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-slate-100 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-brand-teal animate-pulse" />
            <span className="text-[11px] font-black text-brand-teal uppercase tracking-widest">Medical Intelligence</span>
          </div>
          <h1 className="text-5xl font-black text-brand-dark font-display tracking-tight leading-none mb-2">
            Patient <span className="italic text-brand-teal">Intake</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-md">
            Digital enrollment and automated triage analysis for incoming walk-in patients.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Personal Info & Symptoms */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal to-blue-500 opacity-50"></div>
            
            <h3 className="text-xl font-black text-brand-dark font-display mb-8 flex items-center gap-3">
              <User className="h-5 w-5 text-brand-teal" /> Personal Identity
            </h3>

            {/* Auto-suggest dropdown to search existing patients */}
            <div className="relative mb-8 p-6 bg-slate-50/70 border border-slate-200/60 rounded-[1.75rem] z-30">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Search Registered Patients</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full bg-white border-2 border-slate-100 hover:border-slate-200 rounded-[1.25rem] h-[58px] pl-11 pr-10 font-bold text-slate-800 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10 outline-none transition-all shadow-sm text-sm"
                  placeholder="Type name, email, or MRN to autocomplete..."
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedPatientId(null);
                      setFormData(prev => ({
                        ...prev,
                        patientName: '',
                        age: '',
                        gender: 'male',
                        contactNumber: ''
                      }));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold hover:text-slate-600 p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {showDropdown && searchQuery.trim() && (
                <div className="absolute left-6 right-6 mt-1.5 bg-white border-2 border-slate-100 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto custom-scrollbar">
                  {patients
                    .filter(p => {
                      const name = `${p.userId?.profile?.firstName || ''} ${p.userId?.profile?.lastName || ''}`.toLowerCase();
                      const email = (p.userId?.email || '').toLowerCase();
                      const mrn = (p.medicalRecordNumber || '').toLowerCase();
                      const query = searchQuery.toLowerCase();
                      return name.includes(query) || email.includes(query) || mrn.includes(query);
                    })
                    .map(p => (
                      <button
                        key={p._id}
                        type="button"
                        onClick={() => {
                          const fullName = `${p.userId?.profile?.firstName || ''} ${p.userId?.profile?.lastName || ''}`.trim();
                          const dob = p.userId?.profile?.dateOfBirth;
                          let calculatedAge = '';
                          if (dob) {
                            const birthDate = new Date(dob);
                            const today = new Date();
                            calculatedAge = today.getFullYear() - birthDate.getFullYear();
                            const m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                              calculatedAge--;
                            }
                          }
                          
                          setFormData(prev => ({
                            ...prev,
                            patientName: fullName,
                            age: calculatedAge,
                            gender: p.userId?.profile?.gender || 'male',
                            contactNumber: p.userId?.profile?.phone || ''
                          }));
                          setSearchQuery(fullName);
                          setSelectedPatientId(p._id);
                          setShowDropdown(false);
                          toast.success(`Selected: ${fullName}`);
                        }}
                        className="w-full text-left px-5 py-3 hover:bg-slate-50 font-bold text-xs text-slate-700 border-b border-slate-100 last:border-b-0 flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <p className="text-brand-dark text-sm">{p.userId?.profile?.firstName || ''} {p.userId?.profile?.lastName || ''}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{p.userId?.email || ''}</p>
                        </div>
                        <span className="text-[9px] font-black font-mono text-brand-teal bg-brand-light px-2 py-0.5 rounded-full border border-brand-teal/20">
                          {p.medicalRecordNumber ? `#${p.medicalRecordNumber}` : 'No MRN'}
                        </span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="input pl-11 bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-bold"
                    placeholder="Enter patient's name"
                    required
                  />
                  <Clipboard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="input pl-11 bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-bold"
                    placeholder="+91-XXXXX-XXXXX"
                    required
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age & Gender</label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="input bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-bold w-24"
                    placeholder="Age"
                    required
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input flex-1 bg-slate-50/50 border-slate-100 focus:bg-white transition-all font-bold appearance-none px-6"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-black text-brand-dark font-display mb-6 flex items-center gap-3">
              <Activity className="h-5 w-5 text-rose-500" /> Sensation & Symptoms
            </h3>
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-teal/5 rounded-[2.5rem] -m-1.5 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                rows={6}
                className="input min-h-[200px] rounded-[2rem] bg-slate-50/50 border-2 border-slate-100 focus:bg-white focus:shadow-2xl transition-all relative z-10 p-8 text-lg font-medium leading-relaxed"
                placeholder="Describe current medical complaints and symptoms in detail for AI analysis..."
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column: Vitals & Action */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-dark rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <h3 className="text-xl font-black font-display mb-10 flex items-center gap-3">
              <Zap className="h-5 w-5 text-brand-teal" /> Vital Status
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-100/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Thermometer className="h-3 w-3" /> Body Temp (°F)
                </label>
                <input
                  type="text"
                  name="vitals.temperature"
                  value={formData.vitals.temperature}
                  onChange={handleChange}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-brand-teal transition-all"
                  placeholder="98.6"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-100/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Droplets className="h-3 w-3" /> Blood Pressure
                </label>
                <input
                  type="text"
                  name="vitals.bloodPressure"
                  value={formData.vitals.bloodPressure}
                  onChange={handleChange}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-brand-teal transition-all"
                  placeholder="120/80"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-100/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Heart className="h-3 w-3" /> Heart Rate (BPM)
                </label>
                <input
                  type="text"
                  name="vitals.pulseRate"
                  value={formData.vitals.pulseRate}
                  onChange={handleChange}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-brand-teal transition-all"
                  placeholder="72"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-teal-100/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Zap className="h-3 w-3 text-emerald-400" /> SpO2 (%)
                </label>
                <input
                  type="text"
                  name="vitals.spO2"
                  value={formData.vitals.spO2}
                  onChange={handleChange}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-brand-teal transition-all"
                  placeholder="98"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-12 py-6 bg-brand-teal rounded-[2rem] text-sm font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(13,148,136,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="loading-spinner border-white/30 border-t-white h-5 w-5"></div>
              ) : (
                <>
                  <Send className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  INITIALIZE TRIAGE
                </>
              )}
            </button>
          </div>

          <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 border-dashed">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" /> Intelligence Note
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              "System will process symptoms using Large Biological Models to calculate risk scores and urgency levels."
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientIntake;
