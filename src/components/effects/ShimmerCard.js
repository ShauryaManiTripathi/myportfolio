// Enhanced Card component with shimmer effect
import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ShimmerCanvas from '../effects/ShimmerCanvas';

const CardContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  /* Ensure content stays above shimmer */
  & > *:not(.shimmer-canvas) {
    position: relative;
    z-index: 2;
  }
`;

const ShimmerCard = ({ 
  children, 
  shimmerOptions = {}, 
  enableShimmer = true,
  className = '',
  ...props 
}) => {
  const { theme } = useTheme();

  const defaultShimmerOptions = {
    gap: 10,
    fadeSpeed: 0.05,
    pixelSize: 5.5,
    density: 0.2,
    ...shimmerOptions
  };

  return (
    <CardContainer
      theme={theme}
      className={className}
      {...props}
    >
      {enableShimmer && (
        <ShimmerCanvas
          {...defaultShimmerOptions}
          className="shimmer-canvas"
        />
      )}
      {children}
    </CardContainer>
  );
};

export default ShimmerCard;
