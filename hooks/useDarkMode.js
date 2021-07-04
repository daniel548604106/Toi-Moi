import { useState, useEffect } from 'react';
export default function useDarkMode() {
  const matchDark = '(prefers-color-scheme: dark)';
  const [isDark, setIsDark] = useState(window.matchMedia(matchDark).matches);
  const colorTheme = isDark ? 'dark' : 'light';
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add(colorTheme);
  }, [isDark]);
  return [isDark, setIsDark];
}
