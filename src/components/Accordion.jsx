import React, { useState } from 'react';

export default function Accordion({ title, defaultOpen = false, children, badge }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3>
          {badge && <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-200">{badge}</span>}
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-xl font-black text-slate-600 dark:bg-slate-900 dark:text-slate-200">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && <div className="border-t border-slate-100 px-5 py-5 dark:border-slate-800">{children}</div>}
    </section>
  );
}
