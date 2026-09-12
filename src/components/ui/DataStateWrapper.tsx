import React from 'react';
import { AlertCircle, RefreshCw, FolderSearch } from 'lucide-react';

interface DataStateWrapperProps {
  isLoading: boolean;
  error: string | null;
  isEmpty?: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
  skeletonType?: 'card' | 'timeline' | 'grid' | 'chip';
  loadingCount?: number;
  children: React.ReactNode;
}

export const DataStateWrapper: React.FC<DataStateWrapperProps> = ({
  isLoading,
  error,
  isEmpty = false,
  onRetry,
  emptyTitle = 'No Items Available',
  emptyMessage = 'There are currently no records found in the database.',
  skeletonType = 'card',
  loadingCount = 3,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="w-full space-y-6 animate-pulse">
        {skeletonType === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: loadingCount }).map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-200/40 dark:border-slate-800/40"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700/60 rounded w-1/4" />
                  <div className="h-4 bg-slate-300 dark:bg-slate-700/60 rounded w-1/6" />
                </div>
                <div className="h-6 bg-slate-300 dark:bg-slate-700/60 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3.5 bg-slate-200 dark:bg-slate-800/70 rounded w-full" />
                  <div className="h-3.5 bg-slate-200 dark:bg-slate-800/70 rounded w-5/6" />
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800/60 rounded-full w-16" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800/60 rounded-full w-20" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800/60 rounded-full w-14" />
                </div>
              </div>
            ))}
          </div>
        )}

        {skeletonType === 'timeline' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {Array.from({ length: loadingCount }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700/60 flex-shrink-0" />
                <div className="flex-1 glass-card rounded-2xl p-6 space-y-3">
                  <div className="h-5 bg-slate-300 dark:bg-slate-700/60 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800/70 rounded w-1/4" />
                  <div className="h-3.5 bg-slate-200 dark:bg-slate-800/70 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {skeletonType === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: loadingCount }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 space-y-4">
                <div className="h-8 w-8 bg-slate-300 dark:bg-slate-700/60 rounded-lg" />
                <div className="h-5 bg-slate-300 dark:bg-slate-700/60 rounded w-2/3" />
                <div className="h-3.5 bg-slate-200 dark:bg-slate-800/70 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {skeletonType === 'chip' && (
          <div className="flex flex-wrap gap-2.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-9 w-24 bg-slate-300 dark:bg-slate-700/60 rounded-xl" />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center max-w-lg mx-auto border border-rose-500/30 bg-rose-950/10 dark:bg-rose-950/20 my-6">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Unable to Load Live Data
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 font-mono">
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Fetch</span>
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center max-w-md mx-auto my-6 border border-slate-200/60 dark:border-slate-800/60">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <FolderSearch className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
          {emptyTitle}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
