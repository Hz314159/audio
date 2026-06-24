import React, { useMemo, useState } from 'react';
import Hero from '../components/Hero.jsx';
import Roadmap from '../components/Roadmap.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import LectureCard from '../components/LectureCard.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import WarningBox from '../components/WarningBox.jsx';

export default function HomePage({ lectures, progressMap, onOpenLecture, setRoute }) {
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('all');

  const allTopics = useMemo(() => {
    return [...new Set(lectures.flatMap((lecture) => lecture.topics))].sort();
  }, [lectures]);

  const filteredLectures = useMemo(() => {
    const q = search.trim().toLowerCase();
    return lectures.filter((lecture) => {
      const matchesSearch = !q || [lecture.title, ...lecture.topics].join(' ').toLowerCase().includes(q);
      const matchesTopic = topic === 'all' || lecture.topics.includes(topic);
      return matchesSearch && matchesTopic;
    });
  }, [lectures, search, topic]);

  const codeExamples = lectures.flatMap((lecture) =>
    (lecture.codeExamples || []).map((example) => ({ ...example, lectureTitle: lecture.title }))
  );

  return (
    <main className="mx-auto max-w-7xl space-y-14 px-4 py-8">
      <Hero />
      <WarningBox compact />
      <Roadmap lectures={lectures} progressMap={progressMap} onOpenLecture={onOpenLecture} />

      <section id="lectures" className="space-y-5">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-300">Lectures</p>
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">كل المحاضرات</h2>
          <p className="mt-2 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
            استخدم البحث أو الفلتر للوصول السريع إلى المحاضرة أو الموضوع. كل محاضرة لها صفحة منفصلة بنفس الهيكل المطلوب.
          </p>
        </div>
        <SearchFilter search={search} setSearch={setSearch} topic={topic} setTopic={setTopic} topics={allTopics} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredLectures.map((lecture) => (
            <LectureCard
              key={lecture.id}
              lecture={lecture}
              progress={progressMap[lecture.id] || 0}
              onOpen={() => onOpenLecture(lecture.id)}
            />
          ))}
        </div>
      </section>

      <section id="code" className="space-y-5">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-300">Code / Examples</p>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white">كود المحاضرات</h2>
          </div>
          <button onClick={() => setRoute({ page: 'code' })} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white dark:bg-white dark:text-slate-950">
            افتح صفحة الكود الكاملة
          </button>
        </div>
        <div className="space-y-4">
          {codeExamples.slice(0, 2).map((example) => (
            <div key={example.id} className="space-y-2">
              <p className="text-sm font-extrabold text-slate-500 dark:text-slate-400">{example.lectureTitle}</p>
              <CodeBlock example={example} />
            </div>
          ))}
          {codeExamples.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
              لا توجد أمثلة كود بعد.
            </div>
          )}
        </div>
      </section>

      <section id="study-guide" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-300">Study guide</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">كيف تستخدم الموقع؟</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ['1', 'ابدأ بالترتيب', 'افتح المحاضرات حسب رقمها، لأن المفاهيم الصوتية تبنى فوق بعضها.'],
            ['2', 'اقرأ النص الأصلي ثم الشرح', 'لا تعتمد على الملخص وحده. كل نقطة تبدأ بمصدرها ثم تبسيطها.'],
            ['3', 'اختبر نفسك', 'حل MCQ والأسئلة النظرية، ثم راجع cheat sheet قبل الامتحان.'],
          ].map(([num, title, text]) => (
            <div key={num} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-lg font-black text-white">{num}</div>
              <h3 className="font-black text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
