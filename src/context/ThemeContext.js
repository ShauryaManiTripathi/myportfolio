import React, { createContext, useState, useContext, useEffect } from 'react';

// Define theme colors
const lightTheme = {
  background: '#f8f9fa',
  text: '#212529',
  primary: '#0d6efd',
  secondary: '#6c757d',
  accent: '#fd7e14',
  surface: '#ffffff',
  error: '#dc3545',
  success: '#198754',
};

const darkTheme = {
  background: '#121212',
  text: '#e0e0e0',
  primary: '#90caf9',
  secondary: '#b0bec5',
  accent: '#ff9e80',
  surface: '#1e1e1e',
  error: '#f44336',
  success: '#4caf50',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Function to detect system preference
  const getSystemPreference = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true; // System prefers dark mode
    }
    return false; // System prefers light mode
  };

  // Initialize theme based on saved preference or system preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // No saved preference, use system preference
    return getSystemPreference();
  };

  const [isDarkMode, setIsDarkMode] = useState(initializeTheme);
  const [theme, setTheme] = useState(initializeTheme() ? darkTheme : lightTheme);

  // Effect to load theme preference from localStorage or system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    let shouldUseDark = false;
    
    if (savedTheme) {
      // Use saved preference
      shouldUseDark = savedTheme === 'dark';
    } else {
      // No saved preference, detect system preference
      shouldUseDark = getSystemPreference();
    }
    
    setIsDarkMode(shouldUseDark);
    setTheme(shouldUseDark ? darkTheme : lightTheme);

    // Listen for system theme changes only if no manual preference is saved
    if (!savedTheme && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e) => {
        // Only update if user hasn't manually set a preference
        const currentSavedTheme = localStorage.getItem('theme');
        if (!currentSavedTheme) {
          setIsDarkMode(e.matches);
          setTheme(e.matches ? darkTheme : lightTheme);
        }
      };

      mediaQuery.addListener(handleSystemThemeChange);
      
      // Cleanup listener on unmount
      return () => {
        mediaQuery.removeListener(handleSystemThemeChange);
      };
    }
  }, []);

  // Effect to update theme when isDarkMode changes
  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Update body background for a smoother experience
    document.body.style.backgroundColor = isDarkMode ? darkTheme.background : lightTheme.background;
    document.body.style.color = isDarkMode ? darkTheme.text : lightTheme.text;
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const resetToSystemTheme = () => {
    localStorage.removeItem('theme');
    const systemPreference = getSystemPreference();
    setIsDarkMode(systemPreference);
    setTheme(systemPreference ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, resetToSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
