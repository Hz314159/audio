import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const statusLabels = {
  'sample-from-uploaded-notebook': 'نموذج مكتمل جزئياً من ملفك',
  'placeholder-from-uploaded-notebook-outline': 'Placeholder من outline الملف',
};

export default function LectureCard({ lecture, progress = 0, onOpen }) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-sky-600 dark:text-sky-300">Lecture {lecture.number}</p>
            <h3 className="mt-2 text-xl font-black leading-8 text-slate-950 dark:text-white">{lecture.title}</h3>
          </div>
          <span className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            {lecture.difficulty}
          </span>
        </div>

        <p className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-bold leading-7 text-sky-800 dark:bg-sky-950/40 dark:text-sky-100">
          {statusLabels[lecture.sourceStatus] || lecture.sourceStatus}
        </p>

        <div className="flex flex-wrap gap-2">
          {lecture.topics.slice(0, 5).map((topic) => (
            <span key={topic} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              {topic}
            </span>
          ))}
        </div>

        <div className="text-sm font-bold text-slate-500 dark:text-slate-400">وقت الدراسة المتوقع: {lecture.estimatedTime}</div>
        <ProgressBar value={progress} label="تقدمك في هذه المحاضرة" />
      </div>

      <button
        onClick={onOpen}
        className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition group-hover:bg-sky-600 dark:bg-white dark:text-slate-950 dark:group-hover:bg-sky-300"
      >
        افتح المحاضرة
      </button>
    </article>
  );
}
