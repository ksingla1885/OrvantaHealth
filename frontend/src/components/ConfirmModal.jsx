import React from 'react';
import { X, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Proceed",
  cancelText = "Cancel",
  type = "warning" // 'warning' | 'danger' | 'info'
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: ShieldAlert,
          iconColor: 'text-rose-500',
          bgColor: 'bg-rose-50',
          borderColor: 'border-rose-100',
          btnColor: 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
        };
      case 'info':
        return {
          icon: CheckCircle2,
          iconColor: 'text-brand-teal',
          bgColor: 'bg-brand-light',
          borderColor: 'border-brand-teal/20',
          btnColor: 'bg-brand-teal hover:bg-teal-600 shadow-teal-200'
        };
      default: // warning
        return {
          icon: AlertTriangle,
          iconColor: 'text-amber-500',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100',
          btnColor: 'bg-amber-500 hover:bg-amber-600 shadow-amber-200'
        };
    }
  };

  const styles = getTypeStyles();
  const Icon = styles.icon;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-slide-up border border-slate-100">
        <div className="p-8">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className={`h-20 w-20 rounded-[2rem] ${styles.bgColor} border ${styles.borderColor} flex items-center justify-center shadow-inner`}>
              <Icon className={`h-10 w-10 ${styles.iconColor}`} />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3 mb-10">
            <h3 className="text-2xl font-black text-brand-dark font-display tracking-tight">
              {title}
            </h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed px-2">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onClose}
              className="py-4 rounded-2xl border-2 border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:text-brand-dark transition-all"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`py-4 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-lg hover:scale-[1.02] active:scale-95 ${styles.btnColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>

        {/* Visual Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-50 rounded-bl-[4rem] -z-0" />
      </div>
    </div>
  );
};

export default ConfirmModal;
