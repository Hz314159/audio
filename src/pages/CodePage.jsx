import React, { useMemo, useState } from 'react';
import SearchFilter from '../components/SearchFilter.jsx';
import CodeBlock from '../components/CodeBlock.jsx';

export default function CodePage({ lectures }) {
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('all');

  const examples = useMemo(() => lectures.flatMap((lecture) =>
    (lecture.codeExamples || []).map((example) => ({ ...example, lectureTitle: lecture.title, topics: lecture.topics }))
  ), [lectures]);

  const topics = useMemo(() => [...new Set(examples.flatMap((example) => example.topics || []))].sort(), [examples]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return examples.filter((example) => {
      const matchesSearch = !q || [example.title, example.lectureTitle, example.code, example.whenToUse].join(' ').toLowerCase().includes(q);
      const matchesTopic = topic === 'all' || example.topics?.includes(topic);
      return matchesSearch && matchesTopic;
    });
  }, [examples, search, topic]);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div>
        <p className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-300">Code library</p>
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">كود وأمثلة المادة</h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
          كل مثال يحتوي copy button، شرح line-by-line، أخطاء شائعة، expected output، ومتى تستخدم هذا النمط.
        </p>
      </div>
      <SearchFilter search={search} setSearch={setSearch} topic={topic} setTopic={setTopic} topics={topics} />
      <div className="space-y-5">
        {filtered.map((example) => (
          <div key={`${example.lectureTitle}-${example.id}`} className="space-y-2">
            <p className="text-sm font-extrabold text-slate-500 dark:text-slate-400">{example.lectureTitle}</p>
            <CodeBlock example={example} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            لا توجد أمثلة مطابقة للبحث الحالي.
          </div>
        )}
      </div>
    </main>
  );
}
