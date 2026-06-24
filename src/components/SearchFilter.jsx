import React from 'react';
import Icon from './Icon.jsx';

export default function SearchFilter({ search, setSearch, topic, setTopic, topics }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-3 md:grid-cols-[1fr_260px]">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 right-3 flex items-center"><Icon name="search" className="h-7 w-7" /></span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث باسم المحاضرة أو الموضوع..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-14 pl-4 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-500"
          />
        </label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-700 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          <option value="all">كل المواضيع</option>
          {topics.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
