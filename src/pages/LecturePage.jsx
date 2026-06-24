import React, { useMemo } from 'react';
import Accordion from '../components/Accordion.jsx';
import { InfoList, PillList } from '../components/InfoList.jsx';
import LectureSection from '../components/LectureSection.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import Quiz from '../components/Quiz.jsx';
import SummaryBlock from '../components/SummaryBlock.jsx';
import CheatSheet from '../components/CheatSheet.jsx';
import ExamQuestions from '../components/ExamQuestions.jsx';
import PracticalExercises from '../components/PracticalExercises.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

export default function LecturePage({ lecture, progress = 0, completedSections, toggleSection, goHome }) {
  const completionKeys = useMemo(() => lecture.sections?.map((section) => section.id) || [], [lecture]);

  if (!lecture) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950">
          <h1 className="text-2xl font-black text-slate-950 dark:text-white">المحاضرة غير موجودة</h1>
          <button onClick={goHome} className="mt-5 rounded-2xl bg-sky-600 px-5 py-3 font-bold text-white">ارجع للرئيسية</button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      <button onClick={goHome} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
        ← رجوع للرئيسية
      </button>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-300">Lecture {lecture.number}</p>
            <h1 className="text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl">{lecture.title}</h1>
            <p className="leading-8 text-slate-600 dark:text-slate-300">{lecture.sourceNote}</p>
            <PillList items={lecture.topics} />
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
            <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white p-3 dark:bg-slate-950">
                <p className="font-bold text-slate-500 dark:text-slate-400">الصعوبة</p>
                <p className="font-black text-slate-950 dark:text-white">{lecture.difficulty}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 dark:bg-slate-950">
                <p className="font-bold text-slate-500 dark:text-slate-400">الوقت</p>
                <p className="font-black text-slate-950 dark:text-white">{lecture.estimatedTime}</p>
              </div>
            </div>
            <ProgressBar value={progress} label="تقدم المحاضرة" />
          </div>
        </div>
      </section>

      <Accordion title="A. Lecture overview" defaultOpen badge="ابدأ هنا">
        <div className="grid gap-4 lg:grid-cols-2">
          <InfoList title="Main objectives" items={lecture.objectives} />
          <InfoList title="Prerequisites" items={lecture.prerequisites} />
          <InfoList title="Key terms" items={lecture.keyTerms} />
          <InfoList title="What you should understand after finishing" items={lecture.outcomes} />
        </div>
      </Accordion>

      <Accordion title="B. Original lecture explanation" defaultOpen>
        <div className="space-y-5">
          {lecture.sections?.map((section) => (
            <div key={section.id} className="space-y-3">
              <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-50 p-3 dark:bg-slate-900">
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">علّم هذا الجزء كمكتمل عند مراجعته.</p>
                <button
                  onClick={() => toggleSection(lecture.id, section.id, completionKeys)}
                  className={`rounded-2xl px-4 py-2 text-sm font-black ${completedSections.includes(section.id) ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-200'}`}
                >
                  {completedSections.includes(section.id) ? 'مكتمل ✓' : 'Mark complete'}
                </button>
              </div>
              <LectureSection section={section} />
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion title="C. Detailed examples">
        {lecture.detailedExamples?.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {lecture.detailedExamples.map((example, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <h4 className="text-lg font-black text-slate-950 dark:text-white">{example.title}</h4>
                <p className="mt-3 leading-8 text-slate-700 dark:text-slate-300"><strong>المشكلة:</strong> {example.problem}</p>
                <InfoList title="الخطوات" items={example.steps} ordered />
                <p className="mt-3 rounded-2xl bg-sky-50 p-4 leading-8 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100"><strong>النتيجة:</strong> {example.result}</p>
                <p className="mt-3 rounded-2xl bg-slate-100 p-4 leading-8 text-slate-700 dark:bg-slate-900 dark:text-slate-200"><strong>وصف الرسم/diagram:</strong> {example.diagramDescription}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyBlock text="لا توجد أمثلة تفصيلية بعد. أضف examples الأصلية من المحاضرة هنا." />
        )}
      </Accordion>

      <Accordion title="Code / Examples section">
        <div className="space-y-5">
          {lecture.codeExamples?.length > 0 ? lecture.codeExamples.map((example) => <CodeBlock key={example.id} example={example} />) : <EmptyBlock text="لا يوجد كود لهذه المحاضرة بعد." />}
        </div>
      </Accordion>

      <Accordion title="D. Organized summary">
        <SummaryBlock summary={lecture.summary} />
      </Accordion>

      <Accordion title="E. Interactive MCQ quiz">
        <Quiz questions={lecture.quiz} />
      </Accordion>

      <Accordion title="F. Theoretical exam questions">
        <ExamQuestions questions={lecture.examQuestions} />
      </Accordion>

      <Accordion title="G. Practical exercises">
        <PracticalExercises exercises={lecture.practicalExercises} />
      </Accordion>

      <Accordion title="H. Cheat sheet" defaultOpen>
        <CheatSheet sheet={lecture.cheatSheet} />
      </Accordion>
    </main>
  );
}

function EmptyBlock({ text }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 leading-8 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
      {text}
    </div>
  );
}
