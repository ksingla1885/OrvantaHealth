import React from 'react';
import { ClipboardList, Pill, Plus } from 'lucide-react';

const RecentPrescriptionsSidebar = ({ prescriptions, prescriptionsLoading, onAddMedicine }) => {
    return (
        <div className="lg:col-span-4 bg-slate-50 overflow-y-auto p-8 custom-scrollbar border-l border-slate-100">
            <div className="flex items-center gap-2 text-brand-dark mb-6">
                <ClipboardList className="h-5 w-5" />
                <h3 className="font-black font-display text-lg tracking-tight">Recent Prescriptions</h3>
            </div>

            {prescriptionsLoading ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-400">
                    <div className="loading-spinner h-8 w-8 border-brand-teal" />
                    <p className="text-[8px] font-black uppercase tracking-widest">Loading Records...</p>
                </div>
            ) : prescriptions.length > 0 ? (
                <div className="space-y-6">
                    {prescriptions.map((p) => (
                        <div key={p._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 animate-fade-in group hover:border-brand-teal/30 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal font-black text-xs">
                                        Dr.
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-brand-dark">Dr. {p.doctorId.userId.profile.lastName}</p>
                                        <p className="text-[8px] font-bold text-slate-400">{new Date(p.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Medicines Prescribed:</p>
                                {p.medicines.map((m, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => onAddMedicine(m)}
                                        className="w-full flex items-center justify-between text-left p-3 rounded-xl bg-slate-50 hover:bg-brand-teal/5 hover:border-brand-teal/20 border border-transparent transition-all group/item"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Pill className="h-4 w-4 text-brand-teal" />
                                            <div>
                                                <p className="text-[10px] font-black text-brand-dark">{m.name}</p>
                                                <p className="text-[8px] font-bold text-slate-400">{m.dosage} | {m.duration}</p>
                                            </div>
                                        </div>
                                        <Plus className="h-3 w-3 text-slate-300 group-hover/item:text-brand-teal group-hover/item:scale-125 transition-all" />
                                    </button>
                                ))}
                            </div>

                            {p.tests?.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-slate-50">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Tests Requested:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {p.tests.map((t, tidx) => (
                                            <span key={tidx} className="px-2 py-1 rounded-lg bg-rose-50 text-rose-500 text-[8px] font-black uppercase tracking-widest border border-rose-100">
                                                {t.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                    <ClipboardList className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">No Recent Prescriptions</p>
                </div>
            )}
        </div>
    );
};

export default RecentPrescriptionsSidebar;
