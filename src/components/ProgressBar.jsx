import React from 'react';

export default function ProgressBar({ value = 0, label = 'التقدم' }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="h-full rounded-full bg-sky-500 transition-all duration-500" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
