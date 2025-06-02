import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

// Section components
export const Section = styled(motion.section)`
  ${'' /* margin: 4rem 0; */}
  position: relative;
`;

export const SectionTitle = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <StyledSectionTitle
      theme={theme}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
      <TitleLine theme={theme} />
    </StyledSectionTitle>
  );
};

const StyledSectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  display: inline-block;
`;

const TitleLine = styled.div`
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: ${({ theme }) => theme.accent};
`;

// External link styled components
export const StyledExternalLink = styled(motion.a)`
  background-color: ${({ theme, primary }) => primary ? theme.primary : 'transparent'};
  color: ${({ theme, primary }) => primary ? '#fff' : theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  position: relative;
  z-index: 10;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme, primary }) => primary ? theme.primary : `${theme.primary}20`};
  }
`;

export const ExternalLink = ({ primary, children, href, ...props }) => {
  const { theme } = useTheme();
  
  return (
    <StyledExternalLink
      theme={theme}
      primary={primary}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </StyledExternalLink>
  );
};

// Card components
export const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

// Button components
export const Button = ({ primary, children, as, to, href, target, rel, ...props }) => {
  const { theme } = useTheme();
  
  const buttonStyles = {
    theme,
    primary,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 10 },
    ...props
  };
  
  // If "as" prop is Link and "to" prop is provided
  if (as === Link && to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <StyledButton as="div" {...buttonStyles}>
          {children}
        </StyledButton>
      </Link>
    );
  }
  
  // If "as" prop is "a" for regular anchor links
  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        style={{
          backgroundColor: primary ? theme.primary : 'transparent',
          color: primary ? '#fff' : theme.primary,
          border: `2px solid ${theme.primary}`,
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          position: 'relative',
          zIndex: 10,
          transition: 'background-color 0.3s ease, transform 0.3s ease',
          ...props.style
        }}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // Return regular button
  return (
    <StyledButton {...buttonStyles}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(motion.button)`
  background-color: ${({ theme, primary }) => primary ? theme.primary : 'transparent'};
  color: ${({ theme, primary }) => primary ? '#fff' : theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
  position: relative;
  z-index: 10;
  
  &:hover {
    background-color: ${({ theme, primary }) => primary ? theme.primary : `${theme.primary}20`};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Grid components
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Tag components
export const Tag = ({ children, ...props }) => {
  const { theme } = useTheme();
  
  return (
    <StyledTag
      theme={theme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {children}
    </StyledTag>
  );
};

const StyledTag = styled(motion.span)`
  background-color: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

// Group of tags
export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1rem 0;
`;

// Animation helpers
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
    },
  }),
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Avatar component
export const Avatar = styled(motion.img)`
  width: ${({ size }) => size || '120px'};
  height: ${({ size }) => size || '120px'};
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;
