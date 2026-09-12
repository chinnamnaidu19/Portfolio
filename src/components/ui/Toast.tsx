import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 4000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    info: <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/40 bg-emerald-950/20',
    error: 'border-rose-500/40 bg-rose-950/20',
    info: 'border-indigo-500/40 bg-indigo-950/20'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl backdrop-blur-md bg-white dark:bg-slate-900 border ${borderColors[type]} text-slate-900 dark:text-white max-w-md`}
      >
        {icons[type]}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
