import React, { useState } from 'react';

export default function CodeBlock({ example }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/70">
        <div>
          <h4 className="font-black text-slate-950 dark:text-white">{example.title}</h4>
          <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{example.language}</p>
        </div>
        <button onClick={copyCode} className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-sky-700">
          {copied ? 'تم النسخ' : 'Copy'}
        </button>
      </div>
      <pre className="code-scroll overflow-x-auto bg-slate-950 p-5 text-left text-sm leading-7 text-slate-100" dir="ltr"><code>{example.code}</code></pre>

      <div className="grid gap-4 p-5 lg:grid-cols-2">
        <div>
          <h5 className="mb-3 font-black text-slate-950 dark:text-white">Line-by-line explanation</h5>
          <ol className="list-decimal space-y-2 pr-5 text-slate-700 dark:text-slate-300">
            {example.explanation?.map((line, index) => <li key={index} className="leading-7">{line}</li>)}
          </ol>
        </div>
        <div className="space-y-4">
          <div>
            <h5 className="mb-2 font-black text-slate-950 dark:text-white">Common mistakes</h5>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              {example.commonMistakes?.map((line, index) => <li key={index} className="leading-7">• {line}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <strong>Expected output:</strong> {example.expectedOutput}
          </div>
          <div className="rounded-2xl bg-sky-50 p-4 text-sm leading-7 text-sky-800 dark:bg-sky-950/40 dark:text-sky-100">
            <strong>When to use this pattern:</strong> {example.whenToUse}
          </div>
        </div>
      </div>
    </div>
  );
}
