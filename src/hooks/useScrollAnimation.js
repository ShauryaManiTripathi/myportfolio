import { useEffect, useState } from 'react';

// A hook that tracks scroll position and returns a value based on the scroll position
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateScroll = () => {
      // Calculate how far the user has scrolled through the page
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      
      if (totalHeight > 0) {
        setProgress(Math.min(scrolled / totalHeight, 1));
      } else {
        setProgress(0);
      }
    };
    
    // Add event listener
    window.addEventListener('scroll', updateScroll);
    
    // Initial calculation
    updateScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  
  return progress;
};

// A hook that provides animation values based on scroll position within an element
export const useScrollAnimation = (ref, options = {}) => {
  const [animationValues, setAnimationValues] = useState({
    progress: 0,
    isInView: false,
  });
  
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const calculateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Element is below the viewport
      if (rect.top >= windowHeight) {
        return { progress: 0, isInView: false };
      }
      
      // Element is above the viewport
      if (rect.bottom <= 0) {
        return { progress: 1, isInView: false };
      }
      
      // Calculate how far the element is through the viewport
      const elementHeight = rect.height;
      const viewportProgress = (windowHeight - rect.top) / (windowHeight + elementHeight);
      
      return { 
        progress: Math.min(Math.max(viewportProgress, 0), 1),
        isInView: true 
      };
    };
    
    const handleScroll = () => {
      setAnimationValues(calculateProgress());
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);
  
  return animationValues;
};

export default {
  useScrollProgress,
  useScrollAnimation
};
