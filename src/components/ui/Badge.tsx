import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'indigo' | 'slate' | 'emerald' | 'amber' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'indigo',
  size = 'sm',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs sm:text-sm';

  const variantClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
    primary: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    outline: 'bg-transparent text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-medium tracking-wide font-mono transition-colors ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
