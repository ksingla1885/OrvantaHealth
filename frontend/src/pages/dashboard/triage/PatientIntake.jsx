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
    <div className="max-w-[1600px] px-4 md:px-8 mx-auto pb-20 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-slate-100 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-brand-teal animate-pulse" />
            <span className="text-[11px] font-bold text-brand-teal uppercase tracking-widest">Medical Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight leading-tight mb-2">
            Patient Intake
          </h1>
          <p className="text-slate-500 text-sm max-w-md">
            Digital enrollment and automated triage analysis for incoming walk-in patients.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        
        {/* Column 1: Personal Identity */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col h-full">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-brand-teal" /> Personal Identity
          </h3>

          <div className="space-y-6">
            {/* Auto-suggest dropdown to search existing patients */}
            <div className="relative z-30">
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Search Registered Patients</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-800 focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all shadow-sm"
                  placeholder="Name, email, or MRN..."
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedPatientId(null);
                      setFormData(prev => ({ ...prev, patientName: '', age: '', gender: 'male', contactNumber: '' }));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold hover:text-slate-600 p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              {showDropdown && searchQuery.trim() && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto custom-scrollbar">
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
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-700 border-b border-slate-100 last:border-b-0 flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <p className="font-medium text-slate-800">{p.userId?.profile?.firstName || ''} {p.userId?.profile?.lastName || ''}</p>
                          <p className="text-xs text-slate-500">{p.userId?.email || ''}</p>
                        </div>
                        <span className="text-[10px] font-medium text-brand-teal bg-brand-light px-2 py-0.5 rounded border border-brand-teal/20">
                          {p.medicalRecordNumber ? `#${p.medicalRecordNumber}` : 'No MRN'}
                        </span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 block">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all shadow-sm"
                  placeholder="Enter patient's name"
                  required
                />
                <Clipboard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 block">Contact Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all shadow-sm"
                  placeholder="+91-XXXXX-XXXXX"
                  required
                />
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 block">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-800 focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all shadow-sm"
                  placeholder="Age"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 block">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-800 focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all shadow-sm appearance-none"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Symptoms */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col h-full">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-rose-500" /> Sensation & Symptoms
          </h3>
          
          <div className="flex-1 flex flex-col gap-4">
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="w-full flex-1 min-h-[250px] bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-800 focus:bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all shadow-sm resize-none"
              placeholder="Describe current medical complaints and symptoms in detail for AI analysis..."
              required
            />
            
            <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 border-dashed">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> Intelligence Note
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                System processes symptoms using Large Biological Models to calculate risk scores and urgency levels automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Column 3: Vitals & Action */}
        <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
            <Zap className="h-5 w-5 text-brand-teal" /> Vital Status
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-auto relative z-10">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Thermometer className="h-3.5 w-3.5" /> Temp (°F)
              </label>
              <input
                type="text"
                name="vitals.temperature"
                value={formData.vitals.temperature}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all shadow-inner"
                placeholder="98.6"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Droplets className="h-3.5 w-3.5" /> BP
              </label>
              <input
                type="text"
                name="vitals.bloodPressure"
                value={formData.vitals.bloodPressure}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all shadow-inner"
                placeholder="120/80"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" /> HR (BPM)
              </label>
              <input
                type="text"
                name="vitals.pulseRate"
                value={formData.vitals.pulseRate}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all shadow-inner"
                placeholder="72"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-emerald-400" /> SpO2 (%)
              </label>
              <input
                type="text"
                name="vitals.spO2"
                value={formData.vitals.spO2}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all shadow-inner"
                placeholder="98"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-3.5 bg-brand-teal text-white rounded-xl text-sm font-bold shadow-md hover:bg-teal-500 active:scale-95 transition-all flex items-center justify-center gap-2 relative z-10"
          >
            {loading ? (
              <div className="loading-spinner border-white/30 border-t-white h-4 w-4"></div>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Initialize Triage
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientIntake;
