import React from 'react';
import ReactDOM from 'react-dom';
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
          bgColor: 'bg-rose-50 dark:bg-rose-950/40',
          borderColor: 'border-rose-100 dark:border-rose-900/50',
          btnColor: 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/25'
        };
      case 'info':
        return {
          icon: CheckCircle2,
          iconColor: 'text-brand-teal',
          bgColor: 'bg-teal-50 dark:bg-teal-950/40',
          borderColor: 'border-teal-100 dark:border-teal-900/50',
          btnColor: 'bg-brand-teal hover:bg-teal-600 text-white shadow-lg shadow-teal-600/25'
        };
      default: // warning
        return {
          icon: AlertTriangle,
          iconColor: 'text-amber-500',
          bgColor: 'bg-amber-50 dark:bg-amber-950/40',
          borderColor: 'border-amber-100 dark:border-amber-900/50',
          btnColor: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25'
        };
    }
  };

  const styles = getTypeStyles();
  const Icon = styles.icon;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white dark:bg-slate-900 rounded-[2.25rem] shadow-2xl w-full max-w-md overflow-hidden animate-scale-in border border-slate-100 dark:border-slate-800 my-auto z-10">
        
        {/* Top-Right Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-7 sm:p-8">
          {/* Header Icon */}
          <div className="flex justify-center mb-5">
            <div className={`h-16 w-16 sm:h-20 sm:w-20 rounded-[1.75rem] ${styles.bgColor} border ${styles.borderColor} flex items-center justify-center shadow-inner`}>
              <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${styles.iconColor}`} />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-2.5 mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display leading-snug tracking-tight">
              {title}
            </h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed px-1">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm tracking-wide hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-95 ${styles.btnColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmModal;
