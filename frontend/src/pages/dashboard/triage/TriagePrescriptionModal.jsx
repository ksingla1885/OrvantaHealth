import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
    X, Plus, Trash2, Pill, Activity, AlertCircle, Save, Clipboard, 
    Calendar, FileText, Sparkles, Clock, Beaker, ArrowLeft, Stethoscope,
    ShieldCheck, HeartPulse
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../../services/api';

const COMMON_MEDICINES = [
    "Paracetamol (Dolo 650)",
    "Amoxicillin + Clavulanate (Augmentin 625 Duo)",
    "Ibuprofen + Paracetamol (Combiflam)",
    "Cetirizine 10mg (Okacet)",
    "Omeprazole 20mg (Omez)",
    "Pantoprazole 40mg (Pan 40)",
    "Azithromycin 500mg (Azee 500)",
    "Metformin 500mg (Glycomet)",
    "Atorvastatin 10mg (Lipvas)",
    "Montelukast + Levocetirizine (Montek LC)",
    "Amlodipine 5mg (Amlong)",
    "Telmisartan 40mg (Telma 40)",
    "Domperidone (Domstal)",
    "Ciprofloxacin 500mg (Ciplox)",
    "Vitamin C (Limcee)",
    "Multivitamin + Minerals (Zincovit)",
    "ORS (Oral Rehydration Solution)",
    "Other"
];

const COMMON_DOSAGE_UNITS = [
    "mg",
    "ml",
    "tab",
    "cap",
    "drops",
    "mcg",
    "unit",
    "pieces"
];

const COMMON_DURATION_UNITS = [
    "Days",
    "Weeks",
    "Months"
];

const FREQUENCY_PRESETS = [
    { label: '1-0-0', desc: 'Morning only' },
    { label: '0-1-0', desc: 'Afternoon only' },
    { label: '0-0-1', desc: 'Night only' },
    { label: '1-0-1', desc: 'Twice daily' },
    { label: '1-1-1', desc: 'Thrice daily' },
    { label: 'SOS', desc: 'As needed' }
];

const TIMING_PRESETS = [
    'After Food (PC)',
    'Before Food (AC)',
    'With Meals',
    'At Bedtime (HS)'
];

const DURATION_PRESETS = [
    { val: '3', unit: 'Days' },
    { val: '5', unit: 'Days' },
    { val: '7', unit: 'Days' },
    { val: '10', unit: 'Days' },
    { val: '14', unit: 'Days' },
    { val: '1', unit: 'Months' }
];

const DIAGNOSIS_PRESETS = [
    "Acute Upper Respiratory Infection",
    "Essential Hypertension",
    "Type 2 Diabetes Mellitus",
    "Acute Gastritis / Acid Reflux",
    "Allergic Rhinitis",
    "Migraine / Tension Headache",
    "Musculoskeletal Back Pain",
    "Viral Pyrexia"
];

const COMMON_TESTS_PRESETS = [
    "Complete Blood Count (CBC)",
    "Lipid Profile",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT)",
    "HbA1c (Glycated Hemoglobin)",
    "Thyroid Profile (TSH, T3, T4)",
    "Urine Routine & Microscopic",
    "Chest X-Ray (PA View)",
    "12-Lead ECG",
    "Blood Sugar (Fasting & PP)"
];

const ADVICE_PRESETS = [
    "Drink 2.5-3L water daily & maintain hydration.",
    "Low sodium, low oil diet. Avoid spicy & processed food.",
    "Adequate bed rest for 3 to 5 days.",
    "Avoid cold drinks, dairy, and oily foods for 1 week.",
    "Monitor BP and pulse twice daily and record readings.",
    "Emergency: Visit ER immediately if severe breathlessness or chest pain occurs."
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

const TriagePrescriptionModal = ({ isOpen, onClose, record = {}, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [otherModes, setOtherModes] = useState({});
    
    // Tab and history states for clinical timeline optimization
    const [historyTab, setHistoryTab] = useState('tests'); // 'tests' | 'emr'
    const [historyData, setHistoryData] = useState(null);
    const [historyLoading, setHistoryLoading] = useState(false);

    const [formData, setFormData] = useState({
        diagnosis: '',
        medicines: [{ name: '', dosageValue: '', dosageUnit: 'mg', frequency: '1-0-1', durationValue: '5', durationUnit: 'Days', instructions: 'After Food (PC)' }],
        tests: [],
        advice: '',
        followUpDate: ''
    });

    useEffect(() => {
        const fetchHistory = async () => {
            const pId = record?.patientId?.id || record?.patientId;
            if (!pId) return;

            setHistoryLoading(true);
            try {
                const response = await api.get(`/doctor/patient/${pId}/history`);
                if (response.data.success) {
                    setHistoryData(response.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch patient history:', err);
            } finally {
                setHistoryLoading(false);
            }
        };

        if (isOpen && record) {
            fetchHistory();
        }
    }, [isOpen, record]);

    useEffect(() => {
        if (isOpen && record) {
            if (record.prescribedMedicines?.length > 0) {
                const initialMeds = record.prescribedMedicines.map(m => {
                    const { value: dVal, unit: dUnit } = parseDosage(m.dosage || '');
                    const { value: durVal, unit: durUnit } = parseDuration(m.duration || '');
                    return {
                        ...m,
                        dosageValue: dVal,
                        dosageUnit: dUnit,
                        durationValue: durVal,
                        durationUnit: durUnit,
                        instructions: m.instructions || ''
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
                    diagnosis: record.symptoms ? `Assessed for: ${record.symptoms}` : '',
                    medicines: [{ name: '', dosageValue: '', dosageUnit: 'mg', frequency: '1-0-1', durationValue: '5', durationUnit: 'Days', instructions: 'After Food (PC)' }],
                    tests: [],
                    advice: '',
                    followUpDate: ''
                });
                setOtherModes({});
            }
        }
    }, [isOpen, record]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleAddMedicine = () => {
        setFormData({
            ...formData,
            medicines: [...formData.medicines, { name: '', dosageValue: '', dosageUnit: 'mg', frequency: '1-0-1', durationValue: '5', durationUnit: 'Days', instructions: 'After Food (PC)' }]
        });
    };

    const handleRemoveMedicine = (index) => {
        if (formData.medicines.length <= 1) {
            toast.error('At least one medication is required');
            return;
        }
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

    const handleAddTest = (testName = '') => {
        if (testName && formData.tests.some(t => t.name.toLowerCase() === testName.toLowerCase())) {
            toast('Test already in orders', { icon: 'ℹ️' });
            return;
        }
        setFormData({
            ...formData,
            tests: [...formData.tests, { name: testName, instructions: '' }]
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

    const handleSelectDiagnosisChip = (condition) => {
        if (!formData.diagnosis.trim()) {
            setFormData({ ...formData, diagnosis: condition });
        } else if (!formData.diagnosis.includes(condition)) {
            setFormData({ ...formData, diagnosis: `${formData.diagnosis.trim()}; ${condition}` });
        }
    };

    const handleAppendAdviceChip = (adviceText) => {
        if (!formData.advice.trim()) {
            setFormData({ ...formData, advice: `• ${adviceText}` });
        } else if (!formData.advice.includes(adviceText)) {
            setFormData({ ...formData, advice: `${formData.advice.trim()}\n• ${adviceText}` });
        }
    };

    const handleSetFollowUpDays = (days) => {
        if (days === 0) {
            setFormData({ ...formData, followUpDate: '' });
            return;
        }
        const d = new Date();
        d.setDate(d.getDate() + days);
        setFormData({ ...formData, followUpDate: d.toISOString().split('T')[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.diagnosis.trim()) {
            return toast.error('Diagnosis is required');
        }

        const validMedicines = formData.medicines
            .filter(m => m.name && m.name.trim())
            .map(m => ({
                name: m.name.trim(),
                dosage: `${m.dosageValue || ''} ${m.dosageUnit || 'mg'}`.trim(),
                frequency: m.frequency ? m.frequency.trim() : '1-0-1',
                duration: `${m.durationValue || ''} ${m.durationUnit || 'Days'}`.trim(),
                instructions: m.instructions ? m.instructions.trim() : ''
            }));

        if (validMedicines.length === 0) {
            return toast.error('At least one medication is required');
        }

        try {
            setLoading(true);
            const payload = {
                diagnosis: formData.diagnosis.trim(),
                medicines: validMedicines,
                tests: formData.tests.filter(t => t.name && t.name.trim()).map(t => ({
                    name: t.name.trim(),
                    instructions: t.instructions ? t.instructions.trim() : ''
                })),
                advice: formData.advice.trim(),
                followUpDate: formData.followUpDate || undefined
            };

            const response = await api.post(`/triage/prescribe/${record.id}`, payload);

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
        <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-xs flex flex-col overflow-hidden animate-fade-in font-sans">
            
            {/* ── TOP CLINICAL WORKSTATION COMMAND BAR ── */}
            <header className="shrink-0 bg-slate-900 text-white border-b border-slate-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
                    
                    {/* Left: Close & Encounter Title */}
                    <div className="flex items-center gap-4 min-w-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 transition-all active:scale-95"
                            title="Back to Triage Queue (Esc)"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back to Queue</span>
                        </button>

                        <div className="h-5 w-px bg-slate-700 hidden sm:block" />

                        <div className="flex items-center gap-3 min-w-0">
                            <div className="h-9 w-9 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
                                <Stethoscope className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-sm font-bold text-white tracking-tight truncate">
                                        Triage Clinical Encounter & Prescription Order
                                    </h1>
                                    <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                        Direct Triage Response
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium">
                                    Triage Ref #{record.triageId || record.id?.slice(-8).toUpperCase()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Patient Demographics Strip */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                            <div className="flex items-center gap-2 justify-end">
                                <span className="text-xs font-bold text-white">
                                    {record.patientName}
                                </span>
                                {(record.age || record.gender) && (
                                    <span className="text-[11px] text-slate-400">
                                        ({record.age}Y • {record.gender})
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 justify-end text-[10px] text-slate-400 font-mono">
                                <span className="text-teal-400 font-semibold">MRN #{record.triageId}</span>
                                {record.vitals?.temperature && <span>• Temp: {record.vitals.temperature}°F</span>}
                            </div>
                        </div>

                        <div className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-black text-xs font-mono shadow-inner">
                            Rx
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                </div>
            </header>

            {/* ── SCROLLABLE CLINICAL WORKSPACE ── */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto bg-slate-50/70 custom-scrollbar">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* ── LEFT COLUMN (COL 7): DIAGNOSIS & MEDICATION PLAN ── */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            {/* 1. CLINICAL DIAGNOSIS CARD */}
                            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                                            <Activity className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-bold text-slate-900">
                                                Clinical Diagnosis & Assessment <span className="text-rose-500">*</span>
                                            </h2>
                                            <p className="text-xs text-slate-500">
                                                Chief symptoms: <span className="font-medium text-slate-700 italic">"{record.symptoms || 'General consult'}"</span>
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-medium text-slate-400">Section 1 of 4</span>
                                </div>

                                {/* Quick Diagnosis Chips */}
                                <div className="space-y-1.5">
                                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                        Frequent Clinical Indications:
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {DIAGNOSIS_PRESETS.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => handleSelectDiagnosisChip(item)}
                                                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                                                    formData.diagnosis.includes(item)
                                                        ? 'bg-teal-700 text-white shadow-xs'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-800 border border-slate-200/60'
                                                }`}
                                            >
                                                + {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Diagnosis Input Area */}
                                <div className="space-y-1">
                                    <textarea
                                        value={formData.diagnosis}
                                        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                                        className="w-full min-h-[96px] rounded-lg bg-white border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 p-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all font-medium leading-relaxed"
                                        placeholder="Document clinical diagnosis, assessment findings, or click presets above..."
                                        required
                                    />
                                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                                        <span>Recorded into patient triage EMR record</span>
                                        <span>{formData.diagnosis.length} characters</span>
                                    </div>
                                </div>
                            </div>

                            {/* 2. MEDICATION PLAN (Rx) CARD */}
                            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                                            <Pill className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-sm font-bold text-slate-900">
                                                    Medication Regimen (Rx) <span className="text-rose-500">*</span>
                                                </h2>
                                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[10px]">
                                                    {formData.medicines.length} Drug{formData.medicines.length !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                Prescribe therapeutic drugs, timing, schedule, and duration
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleAddMedicine}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-all active:scale-95"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        <span>Add Drug</span>
                                    </button>
                                </div>

                                {/* Medicines List */}
                                <div className="space-y-4">
                                    {formData.medicines.map((med, index) => (
                                        <div 
                                            key={index} 
                                            className="relative rounded-lg border border-slate-200 bg-slate-50/50 p-4 hover:border-slate-300 transition-all space-y-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-5 w-5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center font-mono">
                                                        #{index + 1}
                                                    </span>
                                                    <span className="text-xs font-bold text-slate-700">
                                                        Pharmaceutical Formulation
                                                    </span>
                                                </div>

                                                {formData.medicines.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveMedicine(index)}
                                                        className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors"
                                                        title="Remove this drug"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Line 1: Drug Name & Strength */}
                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                                
                                                <div className="sm:col-span-7 space-y-1">
                                                    <label className="text-[11px] font-semibold text-slate-600">
                                                        Drug / Molecule Name <span className="text-rose-500">*</span>
                                                    </label>
                                                    
                                                    {otherModes[index] ? (
                                                        <div className="flex gap-1.5">
                                                            <div className="relative flex-1">
                                                                <input
                                                                    type="text"
                                                                    value={med.name}
                                                                    onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                                                                    placeholder="e.g. Cefixime 200mg..."
                                                                    className="w-full h-9 rounded-md bg-white border border-slate-300 px-3 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                                                                    autoFocus
                                                                    required
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleBackToSelect(index)}
                                                                className="px-2.5 h-9 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs rounded-md font-medium transition-colors"
                                                            >
                                                                Select list
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <select
                                                            value={med.name}
                                                            onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                                                            className="w-full h-9 rounded-md bg-white border border-slate-300 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 cursor-pointer"
                                                            required
                                                        >
                                                            <option value="" disabled>-- Select Pharmaceutical --</option>
                                                            {COMMON_MEDICINES.map((m) => (
                                                                <option key={m} value={m}>{m}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>

                                                <div className="sm:col-span-5 space-y-1">
                                                    <label className="text-[11px] font-semibold text-slate-600">
                                                        Dosage Strength <span className="text-rose-500">*</span>
                                                    </label>
                                                    <div className="flex h-9 rounded-md bg-white border border-slate-300 focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600 overflow-hidden">
                                                        <input
                                                            type="text"
                                                            value={med.dosageValue}
                                                            onChange={(e) => handleMedicineChange(index, 'dosageValue', e.target.value)}
                                                            placeholder="e.g. 500"
                                                            className="w-3/5 px-2.5 text-xs font-semibold text-slate-800 outline-none"
                                                            required
                                                        />
                                                        <div className="w-px bg-slate-200" />
                                                        <select
                                                            value={med.dosageUnit}
                                                            onChange={(e) => handleMedicineChange(index, 'dosageUnit', e.target.value)}
                                                            className="w-2/5 px-1 bg-slate-50 text-[11px] font-semibold text-slate-700 outline-none cursor-pointer text-center"
                                                        >
                                                            {COMMON_DOSAGE_UNITS.map(u => (
                                                                <option key={u} value={u}>{u}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Line 2: Frequency & Duration */}
                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                                                
                                                <div className="sm:col-span-7 space-y-1.5">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-[11px] font-semibold text-slate-600">
                                                            Frequency Schedule <span className="text-rose-500">*</span>
                                                        </label>
                                                        <span className="text-[10px] text-slate-400">Click preset below</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={med.frequency}
                                                        onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                                                        placeholder="e.g. 1-0-1 or Twice daily"
                                                        className="w-full h-8 rounded-md bg-white border border-slate-300 px-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                                                        required
                                                    />

                                                    <div className="flex flex-wrap gap-1 pt-0.5">
                                                        {FREQUENCY_PRESETS.map((f) => (
                                                            <button
                                                                key={f.label}
                                                                type="button"
                                                                onClick={() => handleMedicineChange(index, 'frequency', f.label)}
                                                                className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold transition-all ${
                                                                    med.frequency === f.label
                                                                        ? 'bg-slate-900 text-white'
                                                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                                title={f.desc}
                                                            >
                                                                {f.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-5 space-y-1.5">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-[11px] font-semibold text-slate-600">
                                                            Duration <span className="text-rose-500">*</span>
                                                        </label>
                                                        <span className="text-[10px] text-slate-400">Quick days</span>
                                                    </div>
                                                    <div className="flex h-8 rounded-md bg-white border border-slate-300 focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600 overflow-hidden">
                                                        <input
                                                            type="text"
                                                            value={med.durationValue}
                                                            onChange={(e) => handleMedicineChange(index, 'durationValue', e.target.value)}
                                                            placeholder="5"
                                                            className="w-3/5 px-2.5 text-xs font-semibold text-slate-800 outline-none"
                                                            required
                                                        />
                                                        <div className="w-px bg-slate-200" />
                                                        <select
                                                            value={med.durationUnit}
                                                            onChange={(e) => handleMedicineChange(index, 'durationUnit', e.target.value)}
                                                            className="w-2/5 px-1 bg-slate-50 text-[11px] font-semibold text-slate-700 outline-none cursor-pointer text-center"
                                                        >
                                                            {COMMON_DURATION_UNITS.map(u => (
                                                                <option key={u} value={u}>{u}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="flex flex-wrap gap-1 pt-0.5">
                                                        {DURATION_PRESETS.map((dur) => (
                                                            <button
                                                                key={`${dur.val}-${dur.unit}`}
                                                                type="button"
                                                                onClick={() => {
                                                                    handleMedicineChange(index, 'durationValue', dur.val);
                                                                    handleMedicineChange(index, 'durationUnit', dur.unit);
                                                                }}
                                                                className={`text-[10px] px-1.5 py-0.5 rounded font-semibold transition-all ${
                                                                    med.durationValue === dur.val && med.durationUnit === dur.unit
                                                                        ? 'bg-slate-900 text-white'
                                                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                            >
                                                                {dur.val}{dur.unit === 'Days' ? 'd' : dur.unit === 'Weeks' ? 'w' : 'm'}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Line 3: Administration Instructions & Food Timing */}
                                            <div className="pt-1 border-t border-slate-200/60 space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[11px] font-semibold text-slate-600">
                                                        Administration Timing & Food Instructions
                                                    </label>
                                                    <div className="flex gap-1">
                                                        {TIMING_PRESETS.map((t) => (
                                                            <button
                                                                key={t}
                                                                type="button"
                                                                onClick={() => handleMedicineChange(index, 'instructions', t)}
                                                                className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-all ${
                                                                    med.instructions === t
                                                                        ? 'bg-teal-700 text-white'
                                                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-teal-50 hover:text-teal-800'
                                                                }`}
                                                            >
                                                                {t.split(' ')[0]}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <input
                                                    type="text"
                                                    value={med.instructions}
                                                    onChange={(e) => handleMedicineChange(index, 'instructions', e.target.value)}
                                                    placeholder="e.g. Take after meals with lukewarm water..."
                                                    className="w-full h-8 rounded-md bg-white border border-slate-300 px-2.5 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                                                />
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* ── RIGHT COLUMN (COL 5): TESTS/ADVICE TABS OR PATIENT EMR ── */}
                        <div className="lg:col-span-5 space-y-6">
                            
                            {/* Tab Switcher */}
                            <div className="flex items-center p-1 bg-slate-200/70 rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setHistoryTab('tests')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${
                                        historyTab === 'tests'
                                            ? 'bg-white text-slate-900 shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <FileText className="h-3.5 w-3.5 text-teal-600" />
                                    <span>Tests & Advice</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setHistoryTab('emr')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${
                                        historyTab === 'emr'
                                            ? 'bg-white text-slate-900 shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <Activity className="h-3.5 w-3.5 text-indigo-600" />
                                    <span>Patient EMR Dossier</span>
                                    {historyData?.timeline?.length > 0 && (
                                        <span className="px-1.5 py-0.2 bg-teal-600 text-white text-[10px] rounded-full">
                                            {historyData.timeline.length}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {historyTab === 'tests' ? (
                                <div className="space-y-6">
                                    
                                    {/* 3. DIAGNOSTIC LAB TESTS CARD */}
                                    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2.5">
                                                <div className="h-8 w-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                                                    <Beaker className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h2 className="text-sm font-bold text-slate-900">
                                                            Clinical Tests & Labs
                                                        </h2>
                                                        {formData.tests.length > 0 && (
                                                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold text-[10px]">
                                                                {formData.tests.length} Ordered
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        Order diagnostic lab investigations or imaging
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleAddTest('')}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all active:scale-95"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                <span>Custom Test</span>
                                            </button>
                                        </div>

                                        {/* Quick-Order Lab Test Chips */}
                                        <div className="space-y-1.5">
                                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                                1-Click Standard Investigations:
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {COMMON_TESTS_PRESETS.map((testName) => {
                                                    const isSelected = formData.tests.some(t => t.name.toLowerCase() === testName.toLowerCase());
                                                    return (
                                                        <button
                                                            key={testName}
                                                            type="button"
                                                            onClick={() => handleAddTest(testName)}
                                                            className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                                                                isSelected
                                                                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                                                                    : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800 border border-slate-200/60'
                                                            }`}
                                                        >
                                                            {isSelected ? '✓ ' : '+ '}{testName}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Active Ordered Tests */}
                                        {formData.tests.length > 0 ? (
                                            <div className="space-y-2 pt-2 border-t border-slate-100">
                                                {formData.tests.map((test, index) => (
                                                    <div 
                                                        key={index} 
                                                        className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50/40 border border-amber-200/60"
                                                    >
                                                        <div className="flex-1 space-y-1 min-w-0">
                                                            <input
                                                                type="text"
                                                                value={test.name}
                                                                onChange={(e) => handleTestChange(index, 'name', e.target.value)}
                                                                placeholder="Test Name (e.g. Fasting Blood Sugar)..."
                                                                className="w-full text-xs font-bold text-slate-900 bg-transparent outline-none placeholder-slate-400"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={test.instructions}
                                                                onChange={(e) => handleTestChange(index, 'instructions', e.target.value)}
                                                                placeholder="Instructions (e.g. 12hr fasting required, Stat)..."
                                                                className="w-full text-[11px] text-slate-600 bg-transparent outline-none placeholder-slate-400"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveTest(index)}
                                                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded transition-colors"
                                                            title="Remove investigation"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-5 text-center bg-slate-50/60 rounded-lg border border-dashed border-slate-200">
                                                <Beaker className="h-6 w-6 text-slate-300 mx-auto mb-1.5" />
                                                <p className="text-xs font-semibold text-slate-600">No diagnostic investigations selected</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Click any 1-click test badge above or add custom</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* 4. CLINICAL ADVICE & DIETARY GUIDELINES */}
                                    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2.5">
                                                <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-bold text-slate-900">
                                                        Clinical Advice & Lifestyle
                                                    </h2>
                                                    <p className="text-xs text-slate-500">
                                                        Dietary guidelines, activity, or warning signs
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                                Quick Recommendations:
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {ADVICE_PRESETS.map((item, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => handleAppendAdviceChip(item)}
                                                        className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200/60 font-medium transition-all text-left"
                                                    >
                                                        + {item.split('.')[0]}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <textarea
                                            value={formData.advice}
                                            onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                                            className="w-full min-h-[90px] rounded-lg bg-white border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 p-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium leading-relaxed"
                                            placeholder="Enter dietary restrictions, hydration, or activity directions..."
                                        />
                                    </div>

                                    {/* 5. FOLLOW-UP APPOINTMENT CARD */}
                                    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                            <div className="flex items-center gap-2.5">
                                                <div className="h-8 w-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700">
                                                    <Calendar className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-bold text-slate-900">
                                                        Follow-Up Review
                                                    </h2>
                                                    <p className="text-xs text-slate-500">
                                                        Schedule review consultation or mark SOS
                                                    </p>
                                                </div>
                                            </div>

                                            {formData.followUpDate && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleSetFollowUpDays(0)}
                                                    className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                                                >
                                                    Clear date
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-1.5">
                                            {[
                                                { label: '3 Days', days: 3 },
                                                { label: '5 Days', days: 5 },
                                                { label: '1 Week', days: 7 },
                                                { label: '2 Weeks', days: 14 },
                                                { label: '1 Month', days: 30 }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.label}
                                                    type="button"
                                                    onClick={() => handleSetFollowUpDays(opt.days)}
                                                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-sky-50 hover:text-sky-800 text-slate-700 border border-slate-200/60 font-semibold transition-all"
                                                >
                                                    In {opt.label}
                                                </button>
                                            ))}
                                        </div>

                                        <input
                                            type="date"
                                            value={formData.followUpDate}
                                            onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                                            className="w-full h-9 rounded-md bg-white border border-slate-300 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 cursor-pointer"
                                            min={new Date().toISOString().split('T')[0]}
                                        />

                                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                                            <ShieldCheck className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                                            <p className="text-[11px] text-slate-500 leading-normal">
                                                Issuing this prescription will formally complete this triage interaction and update medical history.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                /* Patient EMR Dossier View */
                                <div className="space-y-4">
                                    {historyLoading ? (
                                        <div className="flex flex-col items-center justify-center py-12 gap-2">
                                            <div className="w-8 h-8 border-3 border-teal-600/20 border-t-teal-600 rounded-full animate-spin"></div>
                                            <p className="text-xs font-semibold text-slate-500">Loading historical patient EMR records...</p>
                                        </div>
                                    ) : !historyData ? (
                                        <div className="text-center py-10 bg-white rounded-xl border border-slate-200 p-6 space-y-2">
                                            <AlertCircle className="h-8 w-8 text-slate-400 mx-auto" />
                                            <p className="text-xs font-bold text-slate-700">No patient history found</p>
                                            <p className="text-[11px] text-slate-500">This patient does not yet have prior archived records.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar pr-1">
                                            {/* Allergies & Chronic Conditions */}
                                            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
                                                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                                    <Sparkles className="h-3.5 w-3.5 text-teal-600" /> Patient Clinical Profile
                                                </h4>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">Allergies</span>
                                                        <span className="font-bold text-slate-800">
                                                            {historyData.patient?.allergies?.length > 0 
                                                                ? historyData.patient.allergies.join(', ') 
                                                                : 'None Recorded'}
                                                        </span>
                                                    </div>
                                                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">Chronic Conditions</span>
                                                        <span className="font-bold text-slate-800">
                                                            {historyData.patient?.medicalHistory?.length > 0
                                                                ? historyData.patient.medicalHistory.map(h => h.condition).join(', ')
                                                                : 'None Recorded'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Prior Timeline Events */}
                                            <div className="space-y-2.5">
                                                {historyData.timeline?.map((event, idx) => (
                                                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs text-xs space-y-1.5">
                                                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                                            <span className="px-2 py-0.5 bg-teal-50 text-teal-700 font-semibold rounded-full uppercase text-[9px]">
                                                                {event.type}
                                                            </span>
                                                        </div>
                                                        <h5 className="font-bold text-slate-900">{event.title}</h5>
                                                        <p className="text-[11px] text-slate-500">{event.doctor} • {event.facility}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </form>

            {/* ── DOCKED BOTTOM ACTION WORKSTATION BAR ── */}
            <footer className="shrink-0 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-md">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Left: Summary Metrics */}
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-teal-500" />
                            <span><strong className="text-slate-800">{formData.medicines.filter(m => m.name.trim()).length}</strong> Rx Drug(s)</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span><strong className="text-slate-800">{formData.tests.filter(t => t.name.trim()).length}</strong> Lab Test(s)</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div>
                            <span>Follow-up: <strong className="text-slate-800">{formData.followUpDate ? formData.followUpDate : 'SOS / As Needed'}</strong></span>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all active:scale-95"
                        >
                            Discard Changes
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs hover:shadow-teal-700/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="loading-spinner h-4 w-4 border-white/30 border-t-white" />
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    <span>AUTHORIZE & ISSUE PRESCRIPTION</span>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </footer>

        </div>,
        document.body
    );
};

export default TriagePrescriptionModal;
