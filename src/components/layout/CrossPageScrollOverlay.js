import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const OverlayContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => `linear-gradient(180deg, transparent 0%, ${theme.surface}95 30%, ${theme.surface} 100%)`};
  backdrop-filter: blur(10px);
  border-top: 2px solid ${({ theme }) => `${theme.primary}40`};
  padding: 1.5rem 2rem 2rem;
  z-index: 999;
  user-select: none;
  pointer-events: none;
`;

const OverlayContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const NextPageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
  
  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    gap: 0.5rem;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => `${theme.secondary}30`};
  border-radius: 50px;
  height: 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => `${theme.primary}20`};
  
  @media (max-width: 768px) {
    max-width: 300px;
    height: 6px;
  }
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`};
  border-radius: 50px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
    border-radius: 50px;
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondary};
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    max-width: 300px;
    font-size: 0.8rem;
  }
`;

const ScrollInstruction = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PulsingArrow = styled(motion.div)`
  color: ${({ theme }) => theme.primary};
  
  svg {
    font-size: 1.1rem;
  }
`;

const CrossPageScrollOverlay = ({ 
  showOverlay, 
  progress, 
  nextPageName, 
  isScrollingToNext 
}) => {
  const { theme } = useTheme();

  // Don't show overlay if there's no next page
  if (!nextPageName || nextPageName === 'Unknown') {
    return null;
  }

  return (
    <AnimatePresence>
      {showOverlay && (
        <OverlayContainer
          theme={theme}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            duration: 0.4 
          }}
        >
          <OverlayContent>
            <NextPageInfo theme={theme}>
              <FiArrowRight />
              <span>Continue to {nextPageName}</span>
            </NextPageInfo>
            
            <ProgressContainer theme={theme}>
              <ProgressBar
                theme={theme}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              />
            </ProgressContainer>
            
            <ProgressLabel theme={theme}>
              <span>Keep scrolling</span>
              <span>{Math.round(Math.max(0, Math.min(100, progress)))}%</span>
            </ProgressLabel>
            
            {progress < 100 && !isScrollingToNext && (
              <ScrollInstruction theme={theme}>
                <PulsingArrow
                  theme={theme}
                  animate={{ 
                    y: [0, 3, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <FiArrowDown />
                </PulsingArrow>
                <span>Scroll down to navigate</span>
              </ScrollInstruction>
            )}
            
            {isScrollingToNext && (
              <ScrollInstruction theme={theme}>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  Navigating to {nextPageName}...
                </motion.span>
              </ScrollInstruction>
            )}
          </OverlayContent>
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
};

export default CrossPageScrollOverlay;
