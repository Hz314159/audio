import React from 'react';
import { InfoList } from './InfoList.jsx';

export default function SummaryBlock({ summary }) {
  if (!summary) return null;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <InfoList title="Definitions" items={summary.definitions} />
        <InfoList title="Rules" items={summary.rules} />
        <InfoList title="Important formulas or syntax" items={summary.formulas} />
        <InfoList title="Common mistakes" items={summary.commonMistakes} />
        <InfoList title="Exam notes" items={summary.examNotes} />
      </div>
      {summary.comparisons?.length > 0 && (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h4 className="font-black text-slate-950 dark:text-white">Comparisons</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                <tr>
                  <th className="px-5 py-3 text-right">Item 1</th>
                  <th className="px-5 py-3 text-right">Item 2</th>
                  <th className="px-5 py-3 text-right">Point</th>
                </tr>
              </thead>
              <tbody>
                {summary.comparisons.map((row, index) => (
                  <tr key={index} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-5 py-3 font-bold text-slate-800 dark:text-slate-100">{row.left}</td>
                    <td className="px-5 py-3 font-bold text-slate-800 dark:text-slate-100">{row.right}</td>
                    <td className="px-5 py-3 leading-7 text-slate-600 dark:text-slate-300">{row.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
