import React, { useState } from 'react';

export const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  const toggle = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition-colors"
    >
      {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};
