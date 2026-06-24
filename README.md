# Audio Processing Study Guide

Modern Arabic interactive study-guide website for **Audio Processing** / Department **AI** / Team **Help Me I am failing**.

## What is included

- React + Vite + Tailwind CSS.
- Arabic RTL layout.
- Dark/light mode toggle with localStorage.
- Home page with hero, warning box, roadmap, lecture cards, search/filter, code preview, and study instructions.
- Dedicated lecture pages with:
  - Lecture overview.
  - Original lecture explanation.
  - Detailed examples.
  - Code blocks with copy buttons.
  - Organized summary.
  - Interactive MCQ quiz.
  - Theoretical exam questions.
  - Practical exercises clearly labeled as AI-generated extras.
  - Cheat sheet.
- Progress indicator per lecture, stored locally in the browser.
- Floating back-to-top button.
- Netlify-ready config.

## How to run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## How to build

```bash
npm run build
npm run preview
```

## Deploy to Netlify

1. Push this folder to GitHub.
2. In Netlify, create a new site from the repository.
3. Build command: `npm run build`
4. Publish directory: `dist`

`netlify.toml` is already included.

## Where to paste your real lecture content

Edit this file:

```text
src/data/lectures.js
```

Each lecture object uses this structure:

```js
{
  id: 'unique-lecture-id',
  number: 1,
  title: 'Lecture title',
  topics: ['topic 1', 'topic 2'],
  difficulty: 'سهل / متوسط / صعب',
  estimatedTime: '90 دقيقة',
  objectives: [],
  prerequisites: [],
  keyTerms: [],
  outcomes: [],
  sections: [
    {
      id: 'topic-id',
      title: 'Topic title',
      original: 'النص الأصلي يقول: ...',
      simple: 'الشرح المبسّط: ...',
      examples: [],
      whyImportant: 'لماذا هذا مهم؟ ...',
      commonMistake: 'خطأ شائع: ...',
      examNote: 'ملاحظة امتحانية: ...'
    }
  ],
  detailedExamples: [],
  codeExamples: [],
  summary: {},
  quiz: [],
  examQuestions: [],
  practicalExercises: [],
  cheatSheet: {}
}
```

## Current content status

- `Lab 1: Python Audio Basics` contains a full sample lecture page based on your uploaded notebook.
- `Lab 2+3+4` and `Lab 5+6` contain lecture cards and placeholders based on their notebook outlines. Fill their `sections`, `codeExamples`, `quiz`, `summary`, and `cheatSheet` arrays before using them as final exam material.

## Important content rule

Do not paste AI-added exercises or explanations as if they were original lecture material. Use these labels:

- `شرح زيادة للفهم`
- `إضافة من الذكاء الاصطناعي`
- `تمرين إضافي من إعداد الذكاء الاصطناعي`
# audio
