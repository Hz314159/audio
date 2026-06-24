import React from 'react';

export default function PracticalExercises({ exercises = [] }) {
  if (!exercises.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 leading-8 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
        لا توجد تمارين عملية بعد. أضف تمارين وحددها بوضوح كـ “تمرين إضافي من إعداد الذكاء الاصطناعي”.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {exercises.map((exercise, index) => (
        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-900 dark:bg-amber-950 dark:text-amber-100">{exercise.label}</span>
          <p className="mt-4 text-lg font-black leading-8 text-slate-950 dark:text-white">{exercise.task}</p>
          {exercise.hint && (
            <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <strong>Hint:</strong> {exercise.hint}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
