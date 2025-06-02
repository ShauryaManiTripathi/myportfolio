import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const CursorOuter = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9000;
  mix-blend-mode: difference;
  opacity: ${({ visible }) => (visible ? 0.6 : 0)};
  transition: opacity 0.3s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorInner = styled(motion.div)`
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9000;
  mix-blend-mode: difference;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Only show cursor after it moves, to prevent it appearing at (0,0) initially
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => {
      removeEventListeners();
    };
  }, []);

  const variants = {
    default: {
      x: position.x - 20,
      y: position.y - 20,
      transition: {
        type: 'spring',
        mass: 0.6,
      },
    },
    click: {
      width: 36,
      height: 36,
      x: position.x - 18,
      y: position.y - 18,
      transition: {
        type: 'spring',
        mass: 0.6,
      },
    },
    hover: {
      width: 60,
      height: 60,
      x: position.x - 30,
      y: position.y - 30,
      transition: {
        type: 'spring',
        mass: 0.6,
      },
    },
  };

  const innerVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      transition: {
        type: 'spring',
        mass: 0.2,
      },
    },
    click: {
      width: 14,
      height: 14,
      x: position.x - 7,
      y: position.y - 7,
      transition: {
        type: 'spring',
        mass: 0.2,
      },
    },
  };

  return (
    <>
      <CursorOuter
        theme={theme}
        visible={visible}
        variants={variants}
        animate={linkHovered ? 'hover' : clicked ? 'click' : 'default'}
      />
      <CursorInner
        theme={theme}
        visible={visible}
        variants={innerVariants}
        animate={clicked ? 'click' : 'default'}
      />
    </>
  );
};

export default CustomCursor;
