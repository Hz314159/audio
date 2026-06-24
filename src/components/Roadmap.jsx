import React from 'react';
import LectureCard from './LectureCard.jsx';

export default function Roadmap({ lectures, progressMap, onOpenLecture }) {
  return (
    <section id="roadmap" className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-300">Roadmap</p>
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">خريطة المحاضرات</h2>
        </div>
        <p className="max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
          ادرس بالترتيب. كل بطاقة تعرض رقم المحاضرة، عنوانها، أهم المواضيع، الصعوبة، ووقت الدراسة المتوقع.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lectures.map((lecture) => (
          <LectureCard
            key={lecture.id}
            lecture={lecture}
            progress={progressMap[lecture.id] || 0}
            onOpen={() => onOpenLecture(lecture.id)}
          />
        ))}
      </div>
    </section>
  );
}
