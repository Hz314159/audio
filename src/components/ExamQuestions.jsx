import React from 'react';

export default function ExamQuestions({ questions = [] }) {
  if (!questions.length) {
    return <Empty message="لا توجد أسئلة نظرية بعد. أضف short/explain/compare/output questions داخل examQuestions." />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {questions.map((item, index) => (
        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-slate-900 dark:text-slate-300">{item.type}</span>
          <h4 className="mt-3 text-lg font-black leading-8 text-slate-950 dark:text-white">{item.question}</h4>
          <div className="mt-4 rounded-2xl bg-sky-50 p-4 text-sm leading-7 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100">
            <strong>Model answer:</strong> {item.modelAnswer}
          </div>
        </div>
      ))}
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 leading-8 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
      {message}
    </div>
  );
}
