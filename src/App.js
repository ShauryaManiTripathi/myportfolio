import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './components/sections/HomePage';
import AboutPage from './components/sections/AboutPage';
import ProjectsPage from './components/sections/ProjectsPage';
import SkillsPage from './components/sections/SkillsPage';
import ContactPage from './components/sections/ContactPage';
import NotFoundPage from './components/sections/NotFoundPage';
import Loader from './components/layout/Loader';
import { useTheme } from './context/ThemeContext';
import { usePageMetadata } from './hooks/usePageMetadata';
import { Global, css } from '@emotion/react';
import './App.css';

function App() {
  const location = useLocation();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  
  // Use the metadata hook
  usePageMetadata();
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
            background-color: ${theme.background};
            color: ${theme.text};
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          
          * {
            box-sizing: border-box;
          }
          
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${`${theme.secondary}20`};
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${theme.primary};
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: ${theme.accent};
          }
        `}
      />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <Layout key="layout">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
