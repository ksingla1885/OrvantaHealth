import React, { useState, useEffect } from 'react';
import { X, User, Stethoscope, Search, CheckCircle, ArrowRight, ShieldCheck, MapPin, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../../services/api';

const TriageReferralModal = ({ isOpen, onClose, record, onSuccess }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [referring, setReferring] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchDoctors();
        }
    }, [isOpen]);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const res = await api.get('/receptionist/doctors/availability');
            if (res.data.success) {
                setDoctors(res.data.data.doctors);
            }
        } catch (err) {
            toast.error('Failed to load available clinicians');
        } finally {
            setLoading(false);
        }
    };

    const handleRefer = async () => {
        if (!selectedDoctorId) return toast.error('Please select a doctor');

        setReferring(true);
        try {
            const res = await api.post(`/triage/refer/${record._id}`, { doctorId: selectedDoctorId });
            if (res.data.success) {
                toast.success(`Patient referred to clinical staff`);
                onSuccess && onSuccess();
                onClose();
            }
        } catch (err) {
            toast.error('Clinical referral failed');
        } finally {
            setReferring(false);
        }
    };

    if (!isOpen) return null;

    const filteredDoctors = doctors.filter(doc => 
        `${doc.userId?.profile?.firstName} ${doc.userId?.profile?.lastName} ${doc.specialization}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
            
            <div className="bg-white rounded-[3rem] shadow-premium w-full max-w-4xl relative animate-slide-up overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="px-10 py-8 bg-brand-dark flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center border border-white/10">
                            <Stethoscope className="h-7 w-7 text-brand-teal" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black font-display text-white">Clinical Referral</h2>
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1">Assigning Specialist for: <span className="text-brand-teal italic">{record.patientName}</span></p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Sub-Header / Search */}
                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input 
                            type="text"
                            placeholder="Find clinician by name or specialization..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-brand-teal/10 outline-none transition-all placeholder:text-slate-300"
                            aria-label="Find clinician by name or specialization"
                        />
                    </div>
                </div>

                {/* Doctor Grid */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar pt-2">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-3">
                            <div className="loading-spinner border-brand-teal h-10 w-10"></div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Availability...</p>
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                                <Users className="h-8 w-8 text-slate-200" />
                            </div>
                            <h3 className="text-lg font-black text-brand-dark">No Specialists Found</h3>
                            <p className="text-xs text-slate-400 font-medium">Try adjusting your search criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {filteredDoctors.map((doc) => (
                                <button
                                    key={doc._id}
                                    onClick={() => setSelectedDoctorId(doc.userId._id)}
                                    className={`group relative flex items-start gap-4 p-6 rounded-[2rem] border transition-all duration-300 text-left ${
                                        selectedDoctorId === doc.userId._id 
                                        ? 'bg-brand-dark border-brand-dark shadow-xl -translate-y-1' 
                                        : 'bg-white border-slate-100 hover:border-brand-teal/30 hover:shadow-lg'
                                    }`}
                                >
                                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 transition-transform group-hover:scale-105 ${
                                        selectedDoctorId === doc.userId._id ? 'bg-brand-teal text-white' : 'bg-slate-100 text-brand-dark'
                                    }`}>
                                        {doc.userId?.profile?.firstName[0]}{doc.userId?.profile?.lastName[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h4 className={`font-black text-sm transition-colors truncate ${
                                                selectedDoctorId === doc.userId._id ? 'text-white' : 'text-brand-dark'
                                            }`}>Dr. {doc.userId?.profile?.firstName} {doc.userId?.profile?.lastName}</h4>
                                            {selectedDoctorId === doc.userId._id && <CheckCircle className="h-4 w-4 text-brand-teal shrink-0" />}
                                        </div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest transition-colors mb-3 ${
                                            selectedDoctorId === doc.userId._id ? 'text-teal-100/50' : 'text-brand-teal'
                                        }`}>{doc.specialization}</p>
                                        
                                        <div className="flex gap-2">
                                            <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter ${
                                                selectedDoctorId === doc.userId._id ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-500'
                                            }`}>₹{doc.consultationFee} Fee</span>
                                            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-tighter flex items-center gap-1">
                                                <Star className="h-2 w-2 fill-emerald-500" /> 4.9
                                            </span>
                                        </div>
                                    </div>
                                    {selectedDoctorId === doc.userId._id && (
                                        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-10 border-t border-slate-50 bg-slate-50/30 flex gap-4 shrink-0">
                    <button onClick={onClose} className="flex-1 py-5 rounded-2xl border-2 border-slate-100 bg-white font-black text-xs text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">
                        Cancel
                    </button>
                    <button 
                        onClick={handleRefer}
                        disabled={!selectedDoctorId || referring}
                        className="flex-[2] py-5 bg-brand-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-slate-800 hover:-translate-y-1 transition-all disabled:opacity-50"
                    >
                        {referring ? <div className="loading-spinner border-brand-teal h-5 w-5"></div> : (
                            <>
                                <ArrowRight className="h-5 w-5" /> 
                                CONFIRM CLINICAL HANDOVER
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TriageReferralModal;
