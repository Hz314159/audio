import React, { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 left-5 z-50 h-12 w-12 rounded-2xl bg-sky-600 text-xl font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-sky-700"
      aria-label="back to top"
    >
      ↑
    </button>
  );
}
