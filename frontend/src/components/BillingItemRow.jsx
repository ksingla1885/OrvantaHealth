import React from 'react';
import { X } from 'lucide-react';

const BillingItemRow = ({ item, index, onChange, onRemove, isRemoveDisabled }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 relative group animate-fade-in">
            <div className="md:col-span-6 space-y-1">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Description*</label>
                <input
                    type="text"
                    value={item.description}
                    onChange={(e) => onChange(index, 'description', e.target.value)}
                    placeholder="e.g. Consultation Fee, Lab Test"
                    className="input bg-white"
                    required
                />
            </div>
            <div className="md:col-span-2 space-y-1">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Qty*</label>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onChange(index, 'quantity', e.target.value)}
                    min="1"
                    className="input bg-white"
                    required
                />
            </div>
            <div className="md:col-span-3 space-y-1">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Unit Price (₹)*</label>
                <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => onChange(index, 'unitPrice', e.target.value)}
                    min="0"
                    className="input bg-white"
                    required
                />
            </div>
            <div className="md:col-span-1 flex items-end justify-end pb-1">
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                    disabled={isRemoveDisabled}
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default BillingItemRow;
