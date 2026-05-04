import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
    UserPlus, Eye, EyeOff, ShieldCheck, Mail, Phone,
    Stethoscope, Briefcase, Award, CreditCard, Landmark,
    ChevronRight, ArrowLeft, Save, Sparkles, UserCircle,
    ChevronDown, Activity, Zap, Fingerprint, Lock
} from 'lucide-react';
import api from '../../services/api';

const CreateStaff = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isOtherDept, setIsOtherDept] = useState(false);
    const [isOtherQual, setIsOtherQual] = useState(false);
    const [newDeptName, setNewDeptName] = useState('');
    const [newDeptValue, setNewDeptValue] = useState('');
    const [newQualName, setNewQualName] = useState('');

    const [deptGroups, setDeptGroups] = useState({
        "Clinical Units": [
            { value: "cardiology", label: "Cardiology Unit" },
            { value: "neurology", label: "Neurology Ward" },
            { value: "orthopedics", label: "Orthopedics Dept" },
            { value: "pediatrics", label: "Pediatrics Wing" },
            { value: "gynecology", label: "Gynecology Dept" },
            { value: "dermatology", label: "Dermatology Unit" },
            { value: "oncology", label: "Oncology Center" },
            { value: "psychiatry", label: "Psychiatry Dept" },
        ],
        "Diagnostic & Support": [
            { value: "general", label: "General Medicine" },
            { value: "radiology", label: "Radiology & Imaging" },
            { value: "pathology", label: "Pathology Lab" },
            { value: "physiotherapy", label: "Physiotherapy" },
            { value: "emergency", label: "Emergency Medicine" },
        ],
        "Surgical Units": [
            { value: "general_surgery", label: "General Surgery" },
            { value: "plastic_surgery", label: "Plastic Surgery" },
            { value: "urology", label: "Urology Dept" },
        ]
    });

    const [qualOptions, setQualOptions] = useState([
        "MBBS", "MD", "MS", "BDS", "MDS", "BPT", "MPT", "B.Sc Nursing", "PhD", "Diploma"
    ]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            role: 'doctor',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            phone: ''
        }
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const editId = searchParams.get('edit');
    const isEditMode = !!editId;

    useEffect(() => {
        if (isEditMode) {
            fetchStaffDetails();
        }
    }, [editId]);

    const fetchStaffDetails = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/admin/staff/${editId}`);
            if (response.data.success) {
                const staff = response.data.data;
                reset({
                    role: staff.role,
                    email: staff.email,
                    firstName: staff.profile.firstName,
                    lastName: staff.profile.lastName,
                    phone: staff.profile.phone || '',
                    specialization: staff.specialization || '',
                    qualifications: staff.qualifications || '',
                    experience: staff.experience || '',
                    licenseNumber: staff.licenseNumber || '',
                    consultationFee: staff.consultationFee || '',
                    department: staff.department || ''
                });
            }
        } catch (error) {
            toast.error('Failed to fetch staff details');
        } finally {
            setLoading(false);
        }
    };

    const role = watch('role');
    const deptValue = watch('department');
    const qualValue = watch('qualifications');

    useEffect(() => {
        setIsOtherDept(deptValue === 'others');
    }, [deptValue]);

    useEffect(() => {
        setIsOtherQual(qualValue === 'others');
    }, [qualValue]);

    const handleAddNewDept = () => {
        if (!newDeptName.trim()) return toast.error('Enter department name');
        if (!newDeptValue.trim()) return toast.error('Enter department identifier (value)');
        
        const newValue = newDeptValue.toLowerCase().replace(/\s+/g, '_');
        const groupKey = newDeptName;
        
        setDeptGroups(prev => ({
            ...prev,
            [groupKey]: [
                { value: newValue, label: newValue }
            ]
        }));
        
        setValue('department', newValue);
        setNewDeptName('');
        setNewDeptValue('');
        setIsOtherDept(false);
        toast.success('Department unit initialized');
    };

    const handleAddNewQual = () => {
        if (!newQualName.trim()) return toast.error('Enter credential name');
        
        setQualOptions(prev => [...prev, newQualName]);
        setValue('qualifications', newQualName);
        setNewQualName('');
        setIsOtherQual(false);
        toast.success('Credential added to registry');
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const endpoint = isEditMode ? `/admin/staff/${editId}` : '/admin/staff';
            const method = isEditMode ? 'put' : 'post';
            
            const response = await api[method](endpoint, data);
            if (response.data.success) {
                toast.success(isEditMode ? 'Staff profile updated' : 'Staff onboarded successfully');
                navigate('/dashboard/staff');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-dark/5 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-brand-teal font-black text-[10px] uppercase tracking-[0.3em]">
                            <Zap className="h-3 w-3 fill-current" />
                            <span>Administrative System</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-brand-dark font-display tracking-tight leading-none">
                            {isEditMode ? 'Edit Professional' : 'Onboard Staff'}
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Initialize clinical accounts and security credentials</p>
                    </div>

                    <button 
                        onClick={() => navigate('/dashboard/staff')}
                        className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-brand-dark hover:border-brand-teal/30 transition-all shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Directory</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-4 space-y-8 sticky top-10">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-premium overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-light/50 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                            
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="relative mb-8">
                                    <div className="w-28 h-28 rounded-[2rem] bg-brand-dark flex items-center justify-center shadow-2xl shadow-brand-dark/20 text-brand-teal transform group-hover:rotate-6 transition-transform">
                                        <UserCircle className="h-14 w-14" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center text-white shadow-lg">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-brand-dark font-display leading-tight mb-1">
                                    {watch('firstName') || 'System'} {watch('lastName') || 'Node'}
                                </h3>
                                <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 mb-8">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Security Level: {role?.toUpperCase()}</span>
                                </div>

                                <div className="w-full space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-left ml-1">Assign Core Role</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { id: 'doctor', icon: Stethoscope, label: 'Medical Doctor', desc: 'Full Clinical Access' },
                                            { id: 'receptionist', icon: Briefcase, label: 'Receptionist', desc: 'Administrative Access' }
                                        ].map((r) => (
                                            <button
                                                key={r.id}
                                                type="button"
                                                disabled={isEditMode}
                                                onClick={() => setValue('role', r.id)}
                                                className={`flex items-center gap-4 p-5 rounded-[1.5rem] border-2 transition-all text-left group ${
                                                    role === r.id 
                                                    ? 'bg-brand-dark border-brand-dark text-white shadow-xl shadow-brand-dark/20' 
                                                    : 'bg-white border-slate-50 text-slate-400 hover:border-brand-teal/20 hover:bg-slate-50'
                                                }`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                                    role === r.id ? 'bg-brand-teal/20 text-brand-teal' : 'bg-slate-50 text-slate-300'
                                                }`}>
                                                    <r.icon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{r.label}</p>
                                                    <p className={`text-[10px] font-medium opacity-60 ${role === r.id ? 'text-teal-50' : 'text-slate-400'}`}>{r.desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-gradient-to-br from-brand-dark to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Fingerprint className="h-20 w-20" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <Lock className="h-4 w-4 text-brand-teal" />
                                    </div>
                                    <h4 className="text-sm font-black uppercase tracking-widest">Protocol Check</h4>
                                </div>
                                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6">
                                    System accounts are encrypted via <span className="text-brand-teal">Orvanta Sentinel</span>. 
                                    By proceeding, you authorize the creation of a secure clinical node.
                                </p>
                                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-brand-dark flex items-center justify-center text-[8px] font-bold">A{i}</div>
                                        ))}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Active Verifiers: 03</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Sections */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Section 1: Identities */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium p-8 lg:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-teal to-brand-dark opacity-20"></div>
                            
                            <div className="space-y-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-teal shadow-inner">
                                            <Fingerprint className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-brand-dark font-display leading-none mb-1">Identities & Access</h3>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Primary Security Credentials</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-brand-light text-brand-teal text-[9px] font-black rounded-lg uppercase tracking-widest">Required</div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Legal First Name</label>
                                        <div className="relative group/input">
                                            <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                            <input
                                                type="text"
                                                {...register('firstName', { required: 'Required' })}
                                                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all placeholder:text-slate-300 outline-none"
                                                placeholder="Enter name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Legal Last Name</label>
                                        <div className="relative group/input">
                                            <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                            <input
                                                type="text"
                                                {...register('lastName', { required: 'Required' })}
                                                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all placeholder:text-slate-300 outline-none"
                                                placeholder="Enter name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Corporate Email</label>
                                        <div className="relative group/input">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                            <input
                                                type="email"
                                                {...register('email', {
                                                    required: 'Required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@orvanta\.com$/i,
                                                        message: 'Must end with @orvanta.com'
                                                    }
                                                })}
                                                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all placeholder:text-slate-300 outline-none"
                                                placeholder="name@orvanta.com"
                                                readOnly={isEditMode}
                                            />
                                        </div>
                                        {errors.email && <p className="text-[9px] text-rose-500 font-black mt-1 ml-1 uppercase">{errors.email.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Authentication Key</label>
                                        <div className="relative group/input">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                {...register('password', {
                                                    required: !isEditMode && 'Password required',
                                                    minLength: { value: 6, message: 'Min 6 characters' }
                                                })}
                                                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all placeholder:text-slate-300 font-mono outline-none"
                                                placeholder={isEditMode ? '••••••••' : 'Set password'}
                                                disabled={isEditMode}
                                            />
                                            {!isEditMode && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-teal transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-2 pt-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Mobile Communications Uplink</label>
                                        <div className="relative group/input">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                            <input
                                                type="tel"
                                                {...register('phone')}
                                                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all placeholder:text-slate-300 outline-none"
                                                placeholder="+91 00000 00000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Clinical Data */}
                        {role === 'doctor' && (
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium p-8 lg:p-12 relative overflow-hidden animate-slide-up">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-teal shadow-inner">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-brand-dark font-display leading-none mb-1">Clinical Specialization</h3>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Medical Registry & Unit Allocation</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Specialization Focus</label>
                                            <div className="relative group/input">
                                                <Stethoscope className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                                <input
                                                    type="text"
                                                    {...register('specialization', { required: role === 'doctor' })}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all placeholder:text-slate-300 outline-none"
                                                    placeholder="e.g. Cardiology"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Academic Credentials</label>
                                            <div className="relative group/input">
                                                <Award className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                                <select
                                                    {...register('qualifications', { required: role === 'doctor' })}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all appearance-none cursor-pointer outline-none"
                                                >
                                                    <option value="">Select Credentials</option>
                                                    {qualOptions.map(q => (
                                                        <option key={q} value={q}>{q}</option>
                                                    ))}
                                                    <option value="others" className="text-brand-teal font-bold">+ Add New Credential</option>
                                                </select>
                                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none group-focus-within/input:text-brand-teal transition-colors" />
                                            </div>
                                        </div>

                                        {isOtherQual && (
                                            <div className="md:col-span-2 space-y-2 animate-fade-in">
                                                <div className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        value={newQualName}
                                                        onChange={(e) => setNewQualName(e.target.value)}
                                                        className="flex-1 bg-white border-2 border-brand-teal/20 rounded-2xl px-5 py-4 text-sm font-bold text-brand-dark focus:border-brand-teal outline-none transition-all"
                                                        placeholder="Enter custom credential..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddNewQual}
                                                        className="px-8 bg-brand-teal text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark transition-all"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Experience (Yrs)</label>
                                            <div className="relative group/input">
                                                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                                <input
                                                    type="number"
                                                    min="0"
                                                    onWheel={(e) => e.target.blur()}
                                                    {...register('experience', { required: role === 'doctor' })}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all outline-none appearance-none"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Consultation Fee (₹)</label>
                                            <div className="relative group/input">
                                                <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                                <input
                                                    type="number"
                                                    min="0"
                                                    onWheel={(e) => e.target.blur()}
                                                    {...register('consultationFee', { required: role === 'doctor' })}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all outline-none appearance-none"
                                                    placeholder="500"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Medical License ID</label>
                                            <div className="relative group/input">
                                                <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                                <input
                                                    type="text"
                                                    {...register('licenseNumber', { required: role === 'doctor' })}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all placeholder:text-slate-300 outline-none"
                                                    placeholder="LIC-000000"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-2 pt-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Diagnostic Unit Allocation</label>
                                            <div className="relative group/input">
                                                <Landmark className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within/input:text-brand-teal transition-colors" />
                                                <select
                                                    {...register('department', { required: role === 'doctor' })}
                                                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-brand-dark focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all appearance-none cursor-pointer outline-none"
                                                >
                                                    <option value="">Select Unit Node</option>
                                                    {Object.entries(deptGroups).map(([group, depts]) => (
                                                        <optgroup key={group} label={group} className="font-black text-[10px] uppercase tracking-widest bg-slate-50 text-slate-400">
                                                            {depts.map(d => (
                                                                <option key={d.value} value={d.value} className="font-bold text-sm text-brand-dark bg-white uppercase">{d.label}</option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                    <option value="others" className="text-brand-teal font-bold">+ Initialize New Unit</option>
                                                </select>
                                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none group-focus-within/input:text-brand-teal transition-colors" />
                                            </div>
                                        </div>

                                        {isOtherDept && (
                                            <div className="md:col-span-2 space-y-6 animate-fade-in bg-brand-light/20 p-8 rounded-[2rem] border border-dashed border-brand-teal/30 mt-4">
                                                <div className="flex items-center gap-3">
                                                    <Sparkles className="h-5 w-5 text-brand-teal" />
                                                    <h4 className="text-xs font-black text-brand-teal uppercase tracking-widest">Deploy New Clinical Node</h4>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Node Display Name</p>
                                                        <input
                                                            type="text"
                                                            value={newDeptName}
                                                            onChange={(e) => setNewDeptName(e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-brand-dark focus:border-brand-teal outline-none transition-all"
                                                            placeholder="e.g. Critical Care"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Node Value (ID)</p>
                                                        <input
                                                            type="text"
                                                            value={newDeptValue}
                                                            onChange={(e) => setNewDeptValue(e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-brand-dark focus:border-brand-teal outline-none transition-all"
                                                            placeholder="e.g. critical_care"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleAddNewDept}
                                                    className="w-full py-4 bg-brand-teal text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-teal/20"
                                                >
                                                    Authorize & Initialize Node
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submission Area */}
                        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200/60">
                            <div className="flex items-center gap-4 max-w-sm">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                                    Finalizing this entry will synchronize the clinical credentials with the Orvanta cluster. 
                                </p>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="px-8 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-rose-500 transition-colors"
                                >
                                    Purge Data
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-12 py-5 bg-brand-dark text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand-dark/30 hover:bg-brand-teal hover:shadow-brand-teal/40 transition-all hover:-translate-y-1 flex items-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {isEditMode ? <Save className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                                            {isEditMode ? 'Commit Changes' : 'Initialize Onboarding'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStaff;
