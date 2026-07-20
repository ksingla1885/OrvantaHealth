import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Plus, Trash2, Pill, Activity, AlertCircle, Save, Clipboard, Calendar, FileText, Sparkles, Clock, Beaker, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../../services/api';

const COMMON_MEDICINES = [
    "Paracetamol (Dolo 650)",
    "Amoxicillin (Augmentin 625 Duo)",
    "Ibuprofen (Combiflam)",
    "Cetirizine (Okacet)",
    "Omeprazole (Omez)",
    "Azithromycin (Azee 500)",
    "Metformin (Glycomet)",
    "Atorvastatin (Lipvas)",
    "Pantoprazole (Pan 40)",
    "Montelukast (Montek LC)",
    "Amlodipine (Amlong)",
    "Telmisartan (Telma 40)",
    "Domperidone (Domstal)",
    "Vitamin C (Limcee)",
    "Multivitamin (Zincovit)",
    "Other"
];

const COMMON_DOSAGE_UNITS = [
    "mg",
    "pieces",
    "drops",
    "ml",
    "mcg",
    "tab",
    "cap",
    "unit"
];

const COMMON_DURATION_UNITS = [
    "Days",
    "Weeks",
    "Months",
    "Years"
];

const parseDosage = (dosageStr) => {
    if (!dosageStr) return { value: '', unit: 'mg' };
    const match = dosageStr.match(/^(\d*(?:\.\d+)?)\s*(.*)$/);
    if (match) {
        const value = match[1] || '';
        const unit = match[2]?.trim() || 'mg';
        return { 
            value, 
            unit: COMMON_DOSAGE_UNITS.includes(unit) ? unit : (unit ? unit : 'mg') 
        };
    }
    return { value: dosageStr, unit: 'mg' };
};

const parseDuration = (durationStr) => {
    if (!durationStr) return { value: '', unit: 'Days' };
    const match = durationStr.match(/^(\d*(?:\.\d+)?)\s*(.*)$/);
    if (match) {
        const value = match[1] || '';
        const unit = match[2]?.trim() || 'Days';
        const capUnit = unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase();
        return { 
            value, 
            unit: COMMON_DURATION_UNITS.includes(capUnit) ? capUnit : (capUnit ? capUnit : 'Days')
        };
    }
    return { value: durationStr, unit: 'Days' };
};

const TriagePrescriptionModal = ({ isOpen, onClose, record, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [otherModes, setOtherModes] = useState({});

    const [formData, setFormData] = useState({
        diagnosis: '',
        medicines: [{ name: '', dosageValue: '', dosageUnit: 'mg', frequency: '', durationValue: '', durationUnit: 'Days', instructions: '' }],
        tests: [],
        advice: '',
        followUpDate: ''
    });

    useEffect(() => {
        if (isOpen && record) {
            // If the record already has a prescription (unlikely for new triage, but good for edits)
            if (record.prescribedMedicines?.length > 0) {
                const initialMeds = record.prescribedMedicines.map(m => {
                    const { value: dVal, unit: dUnit } = parseDosage(m.dosage || '');
                    const { value: durVal, unit: durUnit } = parseDuration(m.duration || '');
                    return {
                        ...m,
                        dosageValue: dVal,
                        dosageUnit: dUnit,
                        durationValue: durVal,
                        durationUnit: durUnit
                    };
                });
                
                const initialOtherModes = {};
                initialMeds.forEach((m, idx) => {
                    if (m.name && !COMMON_MEDICINES.includes(m.name)) {
                        initialOtherModes[idx] = true;
                    }
                });
                setOtherModes(initialOtherModes);

                setFormData({
                    diagnosis: record.diagnosis || '',
                    medicines: initialMeds,
                    tests: record.tests || [],
                    advice: record.advice || '',
                    followUpDate: record.followUpDate ? new Date(record.followUpDate).toISOString().split('T')[0] : ''
                });
            } else {
                setFormData({
                    diagnosis: '',
                    medicines: [{ name: '', dosageValue: '', dosageUnit: 'mg', frequency: '', durationValue: '', durationUnit: 'Days', instructions: '' }],
                    tests: [],
                    advice: '',
                    followUpDate: ''
                });
                setOtherModes({});
            }
        }
    }, [isOpen, record]);

    const handleAddMedicine = () => {
        setFormData({
            ...formData,
            medicines: [...formData.medicines, { name: '', dosageValue: '', dosageUnit: 'mg', frequency: '', durationValue: '', durationUnit: 'Days', instructions: '' }]
        });
    };

    const handleRemoveMedicine = (index) => {
        const newMedicines = formData.medicines.filter((_, i) => i !== index);
        setFormData({ ...formData, medicines: newMedicines });
        
        const newOtherModes = {};
        Object.keys(otherModes).forEach(k => {
            const key = parseInt(k);
            if (key < index) newOtherModes[key] = otherModes[key];
            if (key > index) newOtherModes[key - 1] = otherModes[key];
        });
        setOtherModes(newOtherModes);
    };

    const handleMedicineChange = (index, field, value) => {
        const newMedicines = [...formData.medicines];
        if (field === 'name') {
            if (value === 'Other') {
                setOtherModes({ ...otherModes, [index]: true });
                newMedicines[index][field] = ''; 
            } else {
                newMedicines[index][field] = value;
            }
        } else {
            newMedicines[index][field] = value;
        }
        setFormData({ ...formData, medicines: newMedicines });
    };

    const handleBackToSelect = (index) => {
        const { [index]: removed, ...rest } = otherModes;
        setOtherModes(rest);
        const newMedicines = [...formData.medicines];
        newMedicines[index].name = '';
        setFormData({ ...formData, medicines: newMedicines });
    };

    const handleAddTest = () => {
        setFormData({
            ...formData,
            tests: [...formData.tests, { name: '', instructions: '' }]
        });
    };

    const handleRemoveTest = (index) => {
        setFormData({ ...formData, tests: formData.tests.filter((_, i) => i !== index) });
    };

    const handleTestChange = (index, field, value) => {
        const newTests = [...formData.tests];
        newTests[index][field] = value;
        setFormData({ ...formData, tests: newTests });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.diagnosis.trim()) {
            return toast.error('Diagnosis is required');
        }

        const validMedicines = formData.medicines
            .filter(m => m.name.trim())
            .map(m => ({
                ...m,
                dosage: `${m.dosageValue} ${m.dosageUnit}`.trim(),
                duration: `${m.durationValue} ${m.durationUnit}`.trim()
            }));

        if (validMedicines.length === 0) {
            return toast.error('At least one medicine is required');
        }

        try {
            setLoading(true);
            const payload = {
                diagnosis: formData.diagnosis,
                medicines: validMedicines,
                tests: formData.tests.filter(t => t.name.trim()),
                advice: formData.advice,
                followUpDate: formData.followUpDate || undefined
            };

            const response = await api.post(`/triage/prescribe/${record._id}`, payload);

            if (response.data.success) {
                toast.success('Clinical intervention recorded successfully');
                onSuccess && onSuccess();
                onClose();
            }
        } catch (error) {
            console.error('Triage prescription err:', error);
            toast.error(error.response?.data?.message || 'Failed to submit prescription');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[300] bg-white flex flex-col overflow-hidden animate-fade-in">
            {/* ── HEADER SECTION ── */}
            <div className="relative shrink-0 bg-brand-dark overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-premium-gradient opacity-90" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 px-6 lg:px-12 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={onClose}
                            className="group flex items-center gap-3 px-5 py-2.5 bg-white/5 text-white border border-white/10 rounded-2xl hover:bg-white/10 transition-all active:scale-95"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Back to Queue</span>
                        </button>

                        <div className="h-px w-12 bg-white/10" />

                        <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-2xl bg-brand-teal flex items-center justify-center shadow-xl shadow-brand-teal/20">
                                <Clipboard className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <Sparkles className="h-3 w-3 text-brand-teal animate-pulse" />
                                    <span className="text-[9px] font-black text-brand-teal uppercase tracking-[0.3em]">Immediate Care Module</span>
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-black font-display text-white tracking-tight leading-none">
                                    Clinical Prescription
                                </h2>
                                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                    <div className="flex items-center gap-2 px-2.5 py-1 bg-white/5 rounded-full border border-white/5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">
                                            Patient: {record.patientName}
                                        </span>
                                    </div>
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-[9px] font-black text-brand-teal uppercase tracking-widest">
                                        # {record.triageId}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <div className="text-right mr-4">
                            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Clinical Status</p>
                            <p className="text-xs font-bold text-brand-teal">Direct Triage Response</p>
                        </div>
                        <div className="h-10 w-10 rounded-full border-2 border-brand-teal/30 p-1">
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black text-brand-teal">
                                Rx
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto bg-[#f8fafc] custom-scrollbar" style={{ flex: '1 1 0', minHeight: 0 }}>
                <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Left Column */}
                        <div className="lg:col-span-7 space-y-12">
                        
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-dark relative">
                                    <Activity className="h-5 w-5" />
                                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-brand-dark text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">01</span>
                                </div>
                                <div>
                                    <h3 className="font-black font-display text-xl text-brand-dark">Clinical Investigation</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary complaints & Diagnosis</p>
                                </div>
                            </div>
                            <textarea
                                value={formData.diagnosis}
                                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                                className="input min-h-[120px] rounded-[1.5rem] bg-slate-50/50 border-2 border-slate-100 focus:bg-white transition-all p-6 text-lg font-medium"
                                placeholder="Precisely document clinical findings and diagnosis..."
                                required
                            />

                            {/* Quick AI Condition Chips */}
                            {record?.aiAnalysis?.possibleConditions?.length > 0 && (
                                <div className="space-y-1.5 pt-1">
                                    <span className="text-[9px] font-black text-brand-teal uppercase tracking-widest flex items-center gap-1">
                                        <Sparkles className="h-3 w-3" /> Tap to Insert AI Diagnosis:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {record.aiAnalysis.possibleConditions.map((cond, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => {
                                                    const current = formData.diagnosis ? `${formData.diagnosis}, ${cond}` : cond;
                                                    setFormData({ ...formData, diagnosis: current });
                                                }}
                                                className="px-3 py-1 bg-brand-teal/10 hover:bg-brand-teal hover:text-white text-brand-teal text-[10px] font-black uppercase tracking-wider rounded-lg border border-brand-teal/20 transition-all active:scale-95 cursor-pointer"
                                            >
                                                + {cond}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 relative">
                                        <Pill className="h-5 w-5" />
                                        <span className="absolute -top-2 -right-2 h-5 w-5 bg-violet-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">02</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black font-display text-xl text-brand-dark">Medication Plan</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prescribed Therapeutic Regimen</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddMedicine}
                                    className="group flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    <Plus className="h-4 w-4" /> <span>Add Medication</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {formData.medicines.map((med, index) => (
                                    <div key={index} className="relative group/card bg-white border-2 border-slate-50 rounded-[2rem] p-6 md:p-8 hover:border-brand-teal/20 transition-all">
                                        {formData.medicines.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveMedicine(index)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 rounded-xl transition-all">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                            <div className="md:col-span-12 lg:col-span-7 space-y-2">
                                                <label htmlFor={`med-name-${index}`} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pharmaceutical Name*</label>
                                                <div className="relative">
                                                    {otherModes[index] ? (
                                                        <div className="flex gap-2">
                                                            <div className="relative flex-1">
                                                                <input
                                                                    id={`med-name-${index}`}
                                                                    type="text"
                                                                    value={med.name}
                                                                    onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                                                                    placeholder="Enter custom medicine name..."
                                                                    className="input bg-slate-50 border-slate-100 !h-[58px] pl-11 font-bold"
                                                                    autoFocus required
                                                                />
                                                                <Beaker className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
                                                            </div>
                                                            <button type="button" onClick={() => handleBackToSelect(index)} className="px-3 bg-slate-100 text-slate-500 rounded-xl"><X className="h-4 w-4" /></button>
                                                        </div>
                                                    ) : (
                                                        <div className="relative">
                                                            <select
                                                                id={`med-name-${index}`}
                                                                value={med.name}
                                                                onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                                                                className="input bg-slate-50 border-slate-100 !h-[58px] pl-11 font-bold appearance-none cursor-pointer"
                                                                required
                                                            >
                                                                <option value="" disabled>Select medication...</option>
                                                                {COMMON_MEDICINES.map((m) => <option key={m} value={m}>{m}</option>)}
                                                            </select>
                                                            <Beaker className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="md:col-span-12 lg:col-span-5 space-y-2">
                                                <label htmlFor={`med-dosage-${index}`} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dosage*</label>
                                                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-[1.25rem] h-[58px] overflow-hidden focus-within:bg-white focus-within:border-brand-teal transition-all">
                                                    <input id={`med-dosage-${index}`} type="number" value={med.dosageValue} onChange={(e) => handleMedicineChange(index, 'dosageValue', e.target.value)} placeholder="Qty" className="flex-[1.5] min-w-0 bg-transparent px-5 text-xl font-black text-brand-dark outline-none" required />
                                                    <div className="w-px h-8 bg-slate-200/50" />
                                                    <select value={med.dosageUnit} onChange={(e) => handleMedicineChange(index, 'dosageUnit', e.target.value)} className="flex-1 min-w-0 bg-transparent text-[10px] font-black uppercase tracking-[0.1em] outline-none text-center cursor-pointer text-brand-dark" required>
                                                        {COMMON_DOSAGE_UNITS.map(u => <option key={u} value={u} className="bg-white text-brand-dark">{u}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="md:col-span-6 space-y-2">
                                                <label htmlFor={`med-freq-${index}`} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequency*</label>
                                                <div className="relative">
                                                    <input id={`med-freq-${index}`} type="text" value={med.frequency} onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)} placeholder="e.g. 1-0-1" className="input bg-slate-50 border-slate-100 !h-[58px] pl-11 font-bold text-brand-dark" required />
                                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400" />
                                                </div>
                                                {/* Quick Frequency Presets */}
                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {[
                                                        { label: '☀️ 1-0-0', val: '1-0-0' },
                                                        { label: '🌤️ 1-0-1', val: '1-0-1' },
                                                        { label: '🍽️ 1-1-1', val: '1-1-1' },
                                                        { label: '🌙 0-0-1', val: '0-0-1' },
                                                    ].map((f) => (
                                                        <button
                                                            key={f.val}
                                                            type="button"
                                                            onClick={() => handleMedicineChange(index, 'frequency', f.val)}
                                                            className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                                                                med.frequency === f.val 
                                                                ? 'bg-violet-600 text-white shadow-sm' 
                                                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                                            }`}
                                                        >
                                                            {f.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="md:col-span-6 space-y-2">
                                                <label htmlFor={`med-duration-${index}`} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration*</label>
                                                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-[1.25rem] h-[58px] overflow-hidden focus-within:bg-white focus-within:border-brand-teal transition-all">
                                                    <input id={`med-duration-${index}`} type="number" value={med.durationValue} onChange={(e) => handleMedicineChange(index, 'durationValue', e.target.value)} placeholder="Val" className="flex-[1.5] min-w-0 bg-transparent px-5 text-xl font-black text-brand-dark outline-none" required />
                                                    <div className="w-px h-8 bg-slate-200/50" />
                                                    <select value={med.durationUnit} onChange={(e) => handleMedicineChange(index, 'durationUnit', e.target.value)} className="flex-1 min-w-0 bg-transparent text-[10px] font-black uppercase tracking-[0.1em] outline-none text-center cursor-pointer text-brand-dark" required>
                                                        {COMMON_DURATION_UNITS.map(u => <option key={u} value={u} className="bg-white text-brand-dark">{u}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-5 space-y-12">
                            <section className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 relative">
                                            <FileText className="h-5 w-5" />
                                            <span className="absolute -top-2 -right-2 h-5 w-5 bg-amber-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">03</span>
                                        </div>
                                        <div>
                                            <h3 className="font-black font-display text-xl text-brand-dark">Clinical Tests</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Investigations</p>
                                        </div>
                                    </div>
                                    <button type="button" onClick={handleAddTest} className="h-9 px-4 bg-amber-50 text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition-all flex items-center gap-2"><Plus className="h-3.5 w-3.5" /> <span>Add</span></button>
                                </div>
                                <div className="space-y-4">
                                    {formData.tests.map((test, index) => (
                                        <div key={index} className="p-4 rounded-2xl bg-white border-2 border-slate-50 relative group/test">
                                            <button type="button" onClick={() => handleRemoveTest(index)} className="absolute -top-2 -right-2 h-7 w-7 bg-white text-rose-500 rounded-full shadow-md border flex items-center justify-center"><X className="h-3.5 w-3.5" /></button>
                                            <input type="text" value={test.name} onChange={(e) => handleTestChange(index, 'name', e.target.value)} placeholder="Test Name..." className="w-full bg-slate-50 rounded-xl px-4 py-2 text-sm font-bold focus:bg-white outline-none mb-2" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 relative">
                                            <AlertCircle className="h-5 w-5" />
                                            <span className="absolute -top-2 -right-2 h-5 w-5 bg-blue-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">04</span>
                                        </div>
                                        <h3 className="font-black font-display text-xl text-brand-dark">Clinical Advice</h3>
                                    </div>
                                    <textarea
                                        value={formData.advice}
                                        onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                                        className="input min-h-[120px] rounded-3xl bg-slate-50/50 border-2 border-slate-100 focus:bg-white transition-all p-5 text-sm font-medium"
                                        placeholder="Diet & lifestyle recommendations..."
                                    />
                                </div>

                                {/* Follow-up Date */}
                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-brand-teal" />
                                            <span className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Follow-up Due</span>
                                        </div>
                                        <input
                                            type="date"
                                            value={formData.followUpDate}
                                            onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                                            className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-xs font-black text-brand-dark outline-none focus:ring-2 focus:ring-brand-teal/20"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-brand-teal/5 rounded-2xl">
                                        <div className="h-4 w-4 rounded-full bg-brand-teal flex items-center justify-center shrink-0 mt-0.5">
                                            <Plus className="h-2.5 w-2.5 text-white" />
                                        </div>
                                        <p className="text-[9px] font-bold text-slate-500 leading-normal uppercase tracking-widest">
                                            Issuing this prescription will formally close this triage interaction.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </form>

            {/* Footer */}
            <div className="shrink-0 p-8 lg:px-12 bg-white border-t border-slate-100 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-50">
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <Activity size={18} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Encounter Integrity</p>
                            <p className="text-[10px] font-bold text-slate-600">Verified Clinical Data</p>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-100" />
                    <p className="text-[10px] font-bold text-slate-400 max-w-[200px]">
                        Finalizing this prescription will formally close this triage interaction.
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-10 py-4 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-100 hover:text-slate-600 transition-all active:scale-95"
                    >
                        Discard changes
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-12 py-4 bg-brand-dark text-white rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 shadow-[0_20px_40px_-12px_rgba(10,54,48,0.3)] hover:bg-[#0c4038] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 group"
                    >
                        {loading ? (
                            <div className="loading-spinner h-5 w-5 border-white/30 border-t-white"></div>
                        ) : (
                            <>
                                <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                <span>AUTHORIZE & ISSUE</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default TriagePrescriptionModal;
