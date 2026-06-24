import React from 'react';

const icons = {
  book: '📘',
  warning: '⚠️',
  code: '⌘',
  quiz: '؟',
  road: '↳',
  search: '⌕',
  moon: '☾',
  sun: '☀',
  check: '✓',
  top: '↑',
};

export default function Icon({ name, className = '' }) {
  return (
    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sm text-sky-700 dark:bg-sky-950 dark:text-sky-200 ${className}`}>
      {icons[name] || '•'}
    </span>
  );
}
