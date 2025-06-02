import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: ${({ theme }) => `${theme.surface}99`};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  /* Ensure MobileNav overlays the whole screen above header */
  & + div[role='dialog'] {
    z-index: 2000 !important;
  }
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(motion.div)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.surface};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 2000;
  padding: 2rem;
  overflow-y: auto;
  overscroll-behavior: contain;

  @media (max-height: 500px) {
    justify-content: flex-start;
    padding-top: 4rem;
    gap: 1.5rem;
  }

  @media (max-width: 320px) {
    gap: 1.5rem;
  }
`;

const NavLink = styled(motion(Link))`
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  
  &:hover {
    background-color: ${({ theme }) => `${theme.primary}20`};
  }
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const Header = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const menuLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <HeaderContainer
      theme={theme}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ 
        height: isScrolled ? '70px' : '80px',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Logo
        theme={theme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/">is_a_Dev</Link>
      </Logo>
      
      <Nav>
        {menuLinks.map((link) => (
          <NavLink 
            key={link.path}
            to={link.path}
            theme={theme}
            active={location.pathname === link.path ? 1 : 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.name}
          </NavLink>
        ))}
        
        <IconButton 
          theme={theme}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </IconButton>
      </Nav>
      
      <MobileMenuButton
        theme={theme}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </MobileMenuButton>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav
            theme={theme}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {menuLinks.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path}
                theme={theme}
                active={location.pathname === link.path ? 1 : 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </NavLink>
            ))}
            
            <IconButton 
              theme={theme}
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </IconButton>
          </MobileNav>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
