import React, { useState, useEffect } from 'react';

/**
 * Dark Mode Toggle Component
 * Resolves Issue #5 ([Free] Add dark mode toggle)
 */
export const DarkModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('myzubster_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('myzubster_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 14px',
        borderRadius: '20px',
        border: '1px solid #475569',
        backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
        color: theme === 'dark' ? '#f8fafc' : '#0f172a',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default DarkModeToggle;
