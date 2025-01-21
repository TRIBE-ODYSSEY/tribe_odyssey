import { useCallback } from 'react';
import { useUIStore } from '../store';

export const useTheme = () => {
  const { theme, toggleTheme } = useUIStore();

  const isDarkMode = useCallback(() => {
    return theme === 'dark';
  }, [theme]);

  return {
    theme,
    isDarkMode,
    toggleTheme
  };
}; 