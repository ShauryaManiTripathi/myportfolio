import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  margin-bottom: 1rem;
`;

const LoadingText = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  }
`;

const Loader = () => {
  const { theme } = useTheme();
  
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5,
        when: 'afterChildren'
      }
    }
  };
  
  const logoVariants = {
    initial: { scale: 0.8, rotate: -20 },
    animate: { 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8,
        ease: 'easeOut',
        yoyo: Infinity,
        repeatDelay: 0.5
      }
    }
  };
  
  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  };
  
  return (
    <LoaderContainer
      theme={theme}
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <LogoContainer>
        <Logo 
          theme={theme}
          variants={logoVariants}
          initial="initial"
          animate="animate"
        />
        <LoadingText 
          theme={theme}
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          Loading...
        </LoadingText>
      </LogoContainer>
    </LoaderContainer>
  );
};

export default Loader;
