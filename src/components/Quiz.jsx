import React, { useMemo, useState } from 'react';

export default function Quiz({ questions = [] }) {
  const [answers, setAnswers] = useState({});

  const score = useMemo(() => {
    return questions.reduce((total, q, index) => total + (answers[index] === q.answerIndex ? 1 : 0), 0);
  }, [answers, questions]);

  if (!questions.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
        لا توجد أسئلة MCQ بعد. أضف 10 أسئلة على الأقل داخل quiz في ملف lecture data.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-slate-950 p-5 text-white dark:bg-sky-950">
        <p className="text-sm font-bold text-slate-300">نتيجتك الحالية</p>
        <p className="text-3xl font-black">{score} / {questions.length}</p>
      </div>
      {questions.map((q, qIndex) => {
        const selected = answers[qIndex];
        const answered = selected !== undefined;
        return (
          <div key={q.question} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h4 className="mb-4 text-lg font-black leading-8 text-slate-950 dark:text-white">{qIndex + 1}. {q.question}</h4>
            <div className="grid gap-3 md:grid-cols-2">
              {q.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === q.answerIndex;
                const isSelected = selected === optionIndex;
                const stateClass = !answered
                  ? 'border-slate-200 bg-slate-50 hover:border-sky-300 dark:border-slate-700 dark:bg-slate-900'
                  : isCorrect
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-100'
                    : isSelected
                      ? 'border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500 dark:bg-rose-950/40 dark:text-rose-100'
                      : 'border-slate-200 bg-slate-50 opacity-70 dark:border-slate-700 dark:bg-slate-900';
                return (
                  <button
                    key={option}
                    onClick={() => setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }))}
                    className={`rounded-2xl border px-4 py-3 text-right text-sm font-bold transition ${stateClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm font-bold leading-7 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                {selected === q.answerIndex ? 'إجابة صحيحة. ' : 'إجابة غير صحيحة. '}{q.explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
