import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const OverlayContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => `linear-gradient(180deg, transparent 0%, ${theme.surface}95 30%, ${theme.surface} 100%)`};
  backdrop-filter: blur(10px);
  padding: 0 0 1.5rem 0;
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
  gap: 0.75rem;
  padding: 1rem 2rem 0;
`;

const NextPageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
  
  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    gap: 0.5rem;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => `${theme.secondary}30`};
  height: 6px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => `${theme.primary}20`};
  
  @media (max-width: 768px) {
    height: 5px;
  }
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
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

  // Calculate animation speed based on progress (faster as progress increases)
  const validProgress = Math.max(0, Math.min(100, progress || 0));
  const animationSpeed = Math.max(0.4, 1.5 - (validProgress / 100) * 1.1);

  return (
    <AnimatePresence>
      {showOverlay && validProgress > 0 && (
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
          <ProgressContainer theme={theme}>
            <ProgressBar
              theme={theme}
              initial={{ width: '0%' }}
              animate={{ width: `${validProgress}%` }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            />
          </ProgressContainer>
          
          <OverlayContent>
            {!isScrollingToNext ? (
              <NextPageInfo theme={theme}>
                <motion.div
                  key="arrow-wobble"
                  animate={{ 
                    rotate: [-5, 5, -5],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: animationSpeed,
                    ease: "easeInOut",
                    repeatType: "loop"
                  }}
                >
                  <FiArrowRight />
                </motion.div>
                <span>Continue to {nextPageName} • {Math.round(validProgress)}% • Keep scrolling</span>
              </NextPageInfo>
            ) : (
              <NextPageInfo theme={theme}>
                <motion.span
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  Navigating to {nextPageName}...
                </motion.span>
              </NextPageInfo>
            )}
          </OverlayContent>
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
};

export default CrossPageScrollOverlay;
