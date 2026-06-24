import React from 'react';
import Icon from './Icon.jsx';
import { siteInfo } from '../data/siteInfo.js';

export default function Navbar({ route, setRoute, isDark, toggleDark }) {
  const links = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'lectures', label: 'المحاضرات' },
    { id: 'code', label: 'الكود' },
    { id: 'study-guide', label: 'طريقة الدراسة' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <button onClick={() => setRoute({ page: 'home' })} className="flex items-center gap-3 text-right">
          <Icon name="book" />
          <div>
            <div className="text-sm font-extrabold text-slate-950 dark:text-white">{siteInfo.subjectName}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{siteInfo.department} · {siteInfo.team}</div>
          </div>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => setRoute({ page: link.id })}
              className={`rounded-2xl px-4 py-2 text-sm font-bold transition ${route.page === link.id ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleDark}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          aria-label="toggle dark mode"
        >
          {isDark ? '☀ الوضع الفاتح' : '☾ الوضع الداكن'}
        </button>
      </nav>
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setRoute({ page: link.id })}
            className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-bold ${route.page === link.id ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
}
