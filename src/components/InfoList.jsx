import React from 'react';

export function InfoList({ title, items = [], ordered = false }) {
  if (!items?.length) return null;
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
      <h4 className="mb-3 text-base font-black text-slate-950 dark:text-white">{title}</h4>
      <Tag className={`space-y-2 text-slate-700 dark:text-slate-300 ${ordered ? 'list-decimal pr-5' : ''}`}>
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="leading-8">
            {!ordered && <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-sky-500" />}
            {item}
          </li>
        ))}
      </Tag>
    </div>
  );
}

export function PillList({ items = [] }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
          {item}
        </span>
      ))}
    </div>
  );
}
