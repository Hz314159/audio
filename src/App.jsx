import React, { useEffect, useMemo, useState } from 'react';
import { lectures } from './data/lectures.js';
import { getStoredJson, setStoredJson } from './utils/storage.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import LecturePage from './pages/LecturePage.jsx';
import CodePage from './pages/CodePage.jsx';
import StudyGuidePage from './pages/StudyGuidePage.jsx';

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { page: 'home' };
  const parts = hash.split('/');
  if (parts[0] === 'lecture' && parts[1]) return { page: 'lecture', lectureId: parts[1] };
  if (['home', 'lectures', 'code', 'study-guide'].includes(parts[0])) return { page: parts[0] };
  return { page: 'home' };
}

function routeToHash(route) {
  if (route.page === 'lecture') return `#/lecture/${route.lectureId}`;
  if (route.page === 'home') return '#/';
  return `#/${route.page}`;
}

export default function App() {
  const [route, setRouteState] = useState(parseHash);
  const [isDark, setIsDark] = useState(() => getStoredJson('ap-dark-mode', false));
  const [completed, setCompleted] = useState(() => getStoredJson('ap-completed-sections', {}));

  useEffect(() => {
    const onHashChange = () => setRouteState(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    setStoredJson('ap-dark-mode', isDark);
  }, [isDark]);

  useEffect(() => {
    setStoredJson('ap-completed-sections', completed);
  }, [completed]);

  const setRoute = (nextRoute) => {
    const hash = routeToHash(nextRoute);
    if (window.location.hash !== hash) window.location.hash = hash;
    setRouteState(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressMap = useMemo(() => {
    return Object.fromEntries(lectures.map((lecture) => {
      const total = lecture.sections?.length || 0;
      const done = completed[lecture.id]?.length || 0;
      return [lecture.id, total ? Math.round((done / total) * 100) : 0];
    }));
  }, [completed]);

  const toggleSection = (lectureId, sectionId, allSectionIds) => {
    setCompleted((prev) => {
      const current = new Set(prev[lectureId] || []);
      if (current.has(sectionId)) current.delete(sectionId);
      else current.add(sectionId);
      const normalized = [...current].filter((id) => allSectionIds.includes(id));
      return { ...prev, [lectureId]: normalized };
    });
  };

  const openLecture = (lectureId) => setRoute({ page: 'lecture', lectureId });
  const selectedLecture = lectures.find((lecture) => lecture.id === route.lectureId);

  let page;
  if (route.page === 'lecture') {
    page = (
      <LecturePage
        lecture={selectedLecture}
        progress={selectedLecture ? progressMap[selectedLecture.id] : 0}
        completedSections={selectedLecture ? completed[selectedLecture.id] || [] : []}
        toggleSection={toggleSection}
        goHome={() => setRoute({ page: 'home' })}
      />
    );
  } else if (route.page === 'code') {
    page = <CodePage lectures={lectures} />;
  } else if (route.page === 'study-guide') {
    page = <StudyGuidePage />;
  } else {
    page = <HomePage lectures={lectures} progressMap={progressMap} onOpenLecture={openLecture} setRoute={setRoute} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar route={route} setRoute={setRoute} isDark={isDark} toggleDark={() => setIsDark((value) => !value)} />
      {page}
      <Footer />
      <BackToTop />
    </div>
  );
}
