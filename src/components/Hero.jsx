import React from 'react';
import { siteInfo } from '../data/siteInfo.js';
import WarningBox from './WarningBox.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-6 shadow-soft dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-sky-950 md:p-10">
      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-500/10" />
      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-extrabold text-sky-700 dark:border-sky-800 dark:bg-slate-900/70 dark:text-sky-200">
            Department {siteInfo.department} · Team {siteInfo.team}
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black leading-tight text-slate-950 dark:text-white md:text-6xl">
              {siteInfo.subjectName}
            </h1>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-200">{siteInfo.shortDescription}</p>
            <p className="max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
              الموقع منظم حسب ترتيب المحاضرات الأصلية، مع شرح مبسّط، أمثلة، كود، أسئلة امتحانية، وملخص سريع للمراجعة قبل الاختبار.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#lectures" className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-sky-700">
              ابدأ من المحاضرات
            </a>
            <a href="#study-guide" className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
              كيف أذاكر؟
            </a>
          </div>
        </div>
        <WarningBox />
      </div>
    </section>
  );
}
