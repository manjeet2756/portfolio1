import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types';

const themes: Record<string, Theme> = {
  white: {
    name: 'Professional White',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#0ea5e9',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
    },
    font: 'IBM Plex Sans',
    gradients: {
      primary: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
      secondary: 'linear-gradient(135deg, #64748b, #94a3b8)',
      accent: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    },
  },
  black: {
    name: 'Developer Black',
    colors: {
      primary: '#00ff88',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#94a3b8',
      border: '#2a2a2a',
    },
    font: 'JetBrains Mono',
    gradients: {
      primary: 'linear-gradient(135deg, #00ff88, #06b6d4)',
      secondary: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
      accent: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    },
  },
  neo: {
    name: 'Neo Gradient',
    colors: {
      primary: '#8b5cf6',
      secondary: '#f97316',
      accent: '#06b6d4',
      background: '#0f0f23',
      surface: '#1a1a3a',
      text: '#ffffff',
      textSecondary: '#c4b5fd',
      border: '#3730a3',
    },
    font: 'Orbitron',
    gradients: {
      primary: 'linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)',
      secondary: 'linear-gradient(135deg, #f97316, #ef4444)',
      accent: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
    },
  },
};

interface ThemeContextType {
  currentTheme: string;
  theme: Theme;
  setTheme: (themeName: string) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('white');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'white';
    setCurrentTheme(savedTheme);
  }, []);

  const setTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    localStorage.setItem('portfolio-theme', themeName);
  };

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      theme: themes[currentTheme],
      setTheme,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};