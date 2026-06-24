import React from 'react';
import WarningBox from '../components/WarningBox.jsx';

export default function StudyGuidePage() {
  const blocks = [
    {
      title: '1. لا تبدأ بالـ cheat sheet',
      text: 'الـ cheat sheet للمراجعة النهائية فقط. ابدأ بالـ overview ثم الشرح الأصلي والمبسط، وبعدها ارجع للملخص.',
    },
    {
      title: '2. تعامل مع كل topic كجزء امتحاني محتمل',
      text: 'أي definition أو table أو formula أو code snippet قد يتحول إلى سؤال مباشر أو output question.',
    },
    {
      title: '3. الكود لا يُحفظ فقط، بل يُفهم',
      text: 'اقرأ line-by-line explanation ثم غطّ الشرح وحاول تفسر كل سطر بنفسك.',
    },
    {
      title: '4. استخدم MCQ للكشف عن الثغرات',
      text: 'إذا أخطأت في سؤال، ارجع إلى section المرتبط به مباشرة، لا تكتفِ بحفظ الإجابة.',
    },
    {
      title: '5. التمارين الإضافية ليست من المحاضرة',
      text: 'أي تمرين موسوم بـ “تمرين إضافي من إعداد الذكاء الاصطناعي” هو تدريب إضافي وليس نصاً أصلياً.',
    },
    {
      title: '6. قبل الامتحان',
      text: 'راجع definitions، formulas، common mistakes، وexam notes. هذه أكثر أجزاء تتحول إلى أسئلة قصيرة.',
    },
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-300">Study guide</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">طريقة استخدام الموقع للمذاكرة</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
          الهدف ليس تلخيص المادة عشوائياً. الهدف أن تتحرك حسب ترتيب المحاضرة الأصلية، تفهم كل نقطة مهمة، ثم تختبر نفسك بأسئلة تشبه الامتحان.
        </p>
      </div>
      <WarningBox compact />
      <div className="grid gap-4 md:grid-cols-2">
        {blocks.map((block) => (
          <div key={block.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">{block.title}</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">{block.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
