import React from 'react';
import Icon from './Icon.jsx';
import { siteInfo } from '../data/siteInfo.js';

export default function WarningBox({ compact = false }) {
  return (
    <div className={`rounded-3xl border border-amber-300/80 bg-amber-50 text-amber-950 shadow-sm dark:border-amber-500/40 dark:bg-amber-950/30 dark:text-amber-100 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-start gap-3">
        <Icon name="warning" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100" />
        <p className={`${compact ? 'text-sm' : 'text-base'} leading-8`}>{siteInfo.disclaimer}</p>
      </div>
    </div>
  );
}
