import { useState, useEffect } from 'react';
export default function useDarkMode() {
  const matchDark = '(prefers-color-scheme: dark)';
  //window.matchMedia(matchDark).matches
  const [isDark, setIsDark] = useState(false);
  const colorTheme = isDark ? 'dark' : 'light';
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add(colorTheme);
  }, [isDark]);
  return [isDark, setIsDark];
}
