import React from 'react';
import { InfoList, PillList } from './InfoList.jsx';

export default function CheatSheet({ sheet }) {
  if (!sheet) return null;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <InfoList title="Most important points" items={sheet.mostImportant} />
      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
        <h4 className="mb-3 text-base font-black text-slate-950 dark:text-white">Keywords</h4>
        <PillList items={sheet.keywords} />
      </div>
      <InfoList title="Mini examples" items={sheet.miniExamples} />
      <InfoList title="Warnings" items={sheet.warnings} />
      <InfoList title="Things likely to appear in the exam" items={sheet.likelyExam} />
    </div>
  );
}
