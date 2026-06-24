import React from 'react';

export default function LectureSection({ section }) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <h4 className="text-xl font-black text-slate-950 dark:text-white">{section.title}</h4>

      <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
        <p className="mb-2 font-black text-slate-900 dark:text-white">النص الأصلي يقول:</p>
        <p className="leading-8 text-slate-700 dark:text-slate-300">{section.original}</p>
      </div>

      <div className="rounded-2xl bg-sky-50 p-4 dark:bg-sky-950/40">
        <p className="mb-2 font-black text-sky-900 dark:text-sky-100">الشرح المبسّط:</p>
        <p className="leading-8 text-sky-900 dark:text-sky-100">{section.simple}</p>
      </div>

      {section.examples?.length > 0 && (
        <div>
          <p className="mb-2 font-black text-slate-950 dark:text-white">أمثلة:</p>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            {section.examples.map((example, index) => <li key={index} className="leading-8">• {example}</li>)}
          </ul>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        {section.whyImportant && (
          <div className="rounded-2xl bg-emerald-50 p-4 text-sm leading-7 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
            <strong>لماذا هذا مهم؟</strong><br />{section.whyImportant}
          </div>
        )}
        {section.commonMistake && (
          <div className="rounded-2xl bg-rose-50 p-4 text-sm leading-7 text-rose-900 dark:bg-rose-950/30 dark:text-rose-100">
            <strong>خطأ شائع</strong><br />{section.commonMistake}
          </div>
        )}
        {section.examNote && (
          <div className="rounded-2xl bg-amber-50 p-4 text-sm leading-7 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
            <strong>ملاحظة امتحانية</strong><br />{section.examNote}
          </div>
        )}
      </div>
    </div>
  );
}
