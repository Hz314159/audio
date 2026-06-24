import React from 'react';
import WarningBox from './WarningBox.jsx';
import { siteInfo } from '../data/siteInfo.js';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-6 px-4">
        <WarningBox compact />
        <div className="flex flex-col justify-between gap-3 text-sm text-slate-500 dark:text-slate-400 md:flex-row">
          <p>{siteInfo.subjectName} · Department {siteInfo.department}</p>
          <p>Team: {siteInfo.team}</p>
        </div>
      </div>
    </footer>
  );
}
