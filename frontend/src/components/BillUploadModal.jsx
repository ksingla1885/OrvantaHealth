import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { X, Upload, DollarSign, Plus, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import BillingItemRow from './BillingItemRow';
import RecentPrescriptionsSidebar from './RecentPrescriptionsSidebar';

const INITIAL_DUE_DATE = new Date().toISOString().split('T')[0];

const formInitialState = {
    loading: false,
    file: null,
    items: [
        { description: '', quantity: 1, unitPrice: 0 }
    ],
    paymentMethod: 'online',
};

function billFormReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_FILE':
            return { ...state, file: action.payload };
        case 'SET_ITEMS':
            return { ...state, items: action.payload };
        case 'SET_PAYMENT_METHOD':
            return { ...state, paymentMethod: action.payload };
        default:
            return state;
    }
}

const BillUploadModal = ({ isOpen, onClose, patient, triageRecord, onSuccess }) => {
    const [formState, dispatch] = useReducer(billFormReducer, formInitialState);
    const { loading, file, items, paymentMethod } = formState;

    const [prescriptions, setPrescriptions] = useState([]);
    const [prescriptionsLoading, setPrescriptionsLoading] = useState(false);

    const fetchPrescriptions = useCallback(async () => {
        if (!patient?._id) return;
        try {
            setPrescriptionsLoading(true);
            const res = await api.get(`/receptionist/patient/${patient._id}/prescriptions`);
            if (res.data.success) {
                setPrescriptions(res.data.data.prescriptions);
            }
        } catch (err) {
            console.error('Failed to fetch prescriptions:', err);
        } finally {
            setPrescriptionsLoading(false);
        }
    }, [patient?._id]);

    const fetchTriagePrescriptions = useCallback(async () => {
        if (!triageRecord?.triageId) return;
        try {
            setPrescriptionsLoading(true);
            const res = await api.get(`/triage/walk-in/${triageRecord.triageId}/prescriptions`);
            if (res.data.success) {
                // Formatting triage prescription correctly for the sidebar
                setPrescriptions([{
                    _id: triageRecord._id,
                    doctorId: { userId: { profile: { lastName: 'Triage' } } },
                    createdAt: triageRecord.resolvedAt,
                    medicines: res.data.data.medicines || []
                }]);
            }
        } catch (err) {
            console.error('Failed to fetch triage prescriptions:', err);
        } finally {
            setPrescriptionsLoading(false);
        }
    }, [triageRecord]);

    useEffect(() => {
        if (isOpen) {
            if (patient?._id) {
                fetchPrescriptions();
            } else if (triageRecord?.triageId) {
                fetchTriagePrescriptions();
            }
        }
    }, [isOpen, patient?._id, triageRecord?.triageId, fetchPrescriptions, fetchTriagePrescriptions]);

    const addMedicineToBill = (medicine) => {
        const newItem = { description: `Medicine: ${medicine.name}`, quantity: 1, unitPrice: 0 };
        // If the first item is empty, replace it
        if (items.length === 1 && !items[0].description) {
            dispatch({ type: 'SET_ITEMS', payload: [newItem] });
        } else {
            dispatch({ type: 'SET_ITEMS', payload: [...items, newItem] });
        }
        toast.success(`${medicine.name} added to bill. Set the price.`);
    };

    const calculateTotal = () => {
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        const tax = subtotal * 0.18;
        return (subtotal + tax).toFixed(2);
    };

    const addItem = () => {
        dispatch({ type: 'SET_ITEMS', payload: [...items, { description: '', quantity: 1, unitPrice: 0 }] });
    };

    const removeItem = (index) => {
        if (items.length > 1) {
            dispatch({ type: 'SET_ITEMS', payload: items.filter((_, i) => i !== index) });
        }
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [field]: field === 'description' ? value : parseFloat(value) || 0
        };
        dispatch({ type: 'SET_ITEMS', payload: newItems });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                toast.error('File size exceeds 10MB limit');
                return;
            }
            dispatch({ type: 'SET_FILE', payload: selectedFile });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate items
        const validItems = items.filter(item => item.description.trim());
        if (validItems.length === 0) {
            return toast.error('Please add at least one line item');
        }

        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            // 1. Create the bill entry
            const billData = {
                patientId: patient?._id || undefined,
                triageId: triageRecord?.triageId || undefined,
                items: validItems,
                dueDate: INITIAL_DUE_DATE,
                status: paymentMethod === 'cash' ? 'paid' : 'pending_payment'
            };
            if (paymentMethod === 'cash') billData.paymentMethod = 'cash';

            const billResponse = await api.post('/receptionist/bill', billData);

            if (billResponse.data.success) {
                const billId = billResponse.data.data.bill._id;

                // 2. If a file is selected, upload it as receipt
                if (file) {
                    const fileData = new FormData();
                    fileData.append('receipt', file);
                    await api.post(`/receptionist/bill/${billId}/receipt`, fileData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                }

                toast.success(file ? 'Bill created and receipt uploaded' : 'Bill created successfully');
                onSuccess && onSuccess();
                onClose();
            }
        } catch (error) {
            console.error('Bill generation error:', error);
            toast.error(error.response?.data?.message || 'Failed to process bill');
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
            <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-6xl relative animate-slide-up overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-8 py-6 bg-brand-dark flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-2xl font-black font-display text-white">Generate Invoice & Bill</h2>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">
                            For: {patient ? `${patient.userId.profile.firstName} ${patient.userId.profile.lastName}` : (triageRecord?.patientName || 'Walk-in Patient')}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                    {/* Left Column: Billing Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-8 overflow-y-auto p-8 border-r border-slate-100 space-y-8 custom-scrollbar">
                        {/* Bill Items Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-brand-dark">
                                    <DollarSign className="h-5 w-5" />
                                    <h3 className="font-black font-display text-lg">Billing Line Items</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand-light text-brand-dark rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-teal/10 transition-colors"
                                >
                                    <Plus className="h-4 w-4" /> Add Item
                                </button>
                            </div>

                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <BillingItemRow
                                        key={index}
                                        item={item}
                                        index={index}
                                        onChange={handleItemChange}
                                        onRemove={removeItem}
                                        isRemoveDisabled={items.length === 1}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                            {/* Upload Receipt */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-dark">
                                    <Upload className="h-5 w-5" />
                                    <h3 className="font-black font-display text-lg tracking-tight">PDF Receipt</h3>
                                </div>
                                <div className={`relative border-2 border-dashed rounded-3xl p-6 transition-all group ${file ? 'border-brand-teal bg-brand-teal/5' : 'border-slate-200 hover:border-brand-teal hover:bg-slate-50'
                                    }`}>
                                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                                    <div className="flex flex-col items-center text-center">
                                        {file ? (
                                            <>
                                                <CheckCircle className="h-8 w-8 text-brand-teal mb-2" />
                                                <p className="text-brand-dark text-[10px] font-black truncate max-w-full px-4">{file.name}</p>
                                            </>
                                        ) : (
                                            <>
                                                <FileText className="h-8 w-8 text-slate-300 mb-2" />
                                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px]">Upload Invoice</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Totals Section */}
                            <div className="bg-brand-dark rounded-3xl p-8 text-white space-y-4 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <DollarSign className="h-20 w-20" />
                                </div>
                                <div className="space-y-3 relative z-10 text-sm">
                                    <div className="flex justify-between items-center text-white/60">
                                        <span className="font-bold uppercase tracking-widest text-[8px]">Selection Total</span>
                                        <span className="font-bold">₹{(calculateTotal() / 1.18).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-white/60 border-b border-white/10 pb-3">
                                        <span className="font-bold uppercase tracking-widest text-[8px]">Tax (GST 18%)</span>
                                        <span className="font-bold">₹{(calculateTotal() * 0.18 / 1.18).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="font-black uppercase tracking-[0.2em] text-brand-teal text-[10px]">Net Payable</span>
                                        <span className="text-2xl font-black font-display">₹{calculateTotal()}</span>
                                    </div>

                                    <div className="pt-2">
                                        <label className="text-[8px] font-black text-white/40 uppercase tracking-widest block mb-1">Payment Option</label>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => dispatch({ type: 'SET_PAYMENT_METHOD', payload: 'online' })}
                                                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors ${paymentMethod === 'online' ? 'bg-brand-teal border-brand-teal text-white' : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'}`}
                                            >
                                                Online (Later)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => dispatch({ type: 'SET_PAYMENT_METHOD', payload: 'cash' })}
                                                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors ${paymentMethod === 'cash' ? 'bg-brand-teal border-brand-teal text-white' : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'}`}
                                            >
                                                Cash (Paid Now)
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex gap-4 pt-6 sticky bottom-0 bg-white pb-2 shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.05)] z-20">
                            <button type="button" onClick={onClose} className="flex-1 py-4 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] py-4 bg-brand-dark text-white rounded-2xl font-black font-display flex items-center justify-center gap-3 shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50"
                            >
                                {loading ? <div className="loading-spinner h-5 w-5 border-white/30 border-t-white"></div> : <><DollarSign className="h-5 w-5" /> GENERATE INVOICE</>}
                            </button>
                        </div>
                    </form>

                    {/* Right Column: Prescriptions Sidebar */}
                    <RecentPrescriptionsSidebar
                        prescriptions={prescriptions}
                        prescriptionsLoading={prescriptionsLoading}
                        onAddMedicine={addMedicineToBill}
                    />
                </div>
            </div>
        </div>
    );
};

export default BillUploadModal;
