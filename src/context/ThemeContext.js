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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  // Effect to load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      setTheme(darkTheme);
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

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
