import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Pill, Activity, AlertCircle, Save, Clipboard, Calendar, FileText, Sparkles, Clock, Beaker } from 'lucide-react';
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
                // Only update name. otherModes[index] is cleared by handleBackToSelect
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

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[8px] animate-fade-in transition-all duration-500" 
                onClick={onClose}
            ></div>
            
            <div className="bg-white w-full max-w-3xl h-full relative animate-slide-in-right shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-slate-100 flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="relative shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-premium-gradient" />
                    <div className="relative z-10 px-8 py-8 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                                <Clipboard className="h-8 w-8 text-brand-teal" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="h-4 w-4 text-brand-teal animate-pulse" />
                                    <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.25em]">Immediate Care Module</span>
                                </div>
                                <h2 className="text-3xl font-black font-display text-white tracking-tight leading-none">
                                    Clinical Prescription
                                </h2>
                                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                                    Patient: <span className="text-white">{record.patientName}</span>
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-8 md:p-10 space-y-12">
                        
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
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pharmaceutical Name*</label>
                                                <div className="relative">
                                                    {otherModes[index] ? (
                                                        <div className="flex gap-2">
                                                            <div className="relative flex-1">
                                                                <input
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
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dosage*</label>
                                                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-[1.25rem] h-[58px] overflow-hidden focus-within:bg-white focus-within:border-brand-teal transition-all">
                                                    <input type="number" value={med.dosageValue} onChange={(e) => handleMedicineChange(index, 'dosageValue', e.target.value)} placeholder="Qty" className="flex-[1.5] min-w-0 bg-transparent px-5 text-xl font-black text-brand-dark outline-none" required />
                                                    <div className="w-px h-8 bg-slate-200/50" />
                                                    <select value={med.dosageUnit} onChange={(e) => handleMedicineChange(index, 'dosageUnit', e.target.value)} className="flex-1 min-w-0 bg-transparent text-[10px] font-black uppercase tracking-[0.1em] outline-none text-center cursor-pointer text-brand-dark" required>
                                                        {COMMON_DOSAGE_UNITS.map(u => <option key={u} value={u} className="bg-white text-brand-dark">{u}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="md:col-span-6 space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequency*</label>
                                                <div className="relative">
                                                    <input type="text" value={med.frequency} onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)} placeholder="e.g. 1-0-1" className="input bg-slate-50 border-slate-100 !h-[58px] pl-11 font-bold text-brand-dark" required />
                                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400" />
                                                </div>
                                            </div>

                                            <div className="md:col-span-6 space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration*</label>
                                                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-[1.25rem] h-[58px] overflow-hidden focus-within:bg-white focus-within:border-brand-teal transition-all">
                                                    <input type="number" value={med.durationValue} onChange={(e) => handleMedicineChange(index, 'durationValue', e.target.value)} placeholder="Val" className="flex-[1.5] min-w-0 bg-transparent px-5 text-xl font-black text-brand-dark outline-none" required />
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                            </section>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="shrink-0 p-8 bg-slate-50/80 backdrop-blur-md border-t border-slate-100 flex gap-4">
                    <button type="button" onClick={onClose} className="flex-1 py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl font-black text-[10px] text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">Discard</button>
                    <button type="button" onClick={handleSubmit} disabled={loading} className="flex-[2.5] py-4 px-8 bg-brand-dark text-white rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-[#0c4038] hover:-translate-y-1 transition-all active:scale-95">
                        {loading ? <div className="loading-spinner h-5 w-5 border-white/30 border-t-white" /> : <><Save className="h-4 w-4" /> Finalize & Issue Prescription</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TriagePrescriptionModal;
