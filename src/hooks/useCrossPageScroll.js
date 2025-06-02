import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useCrossPageScroll = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrollingToNext, setIsScrollingToNext] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use refs to persist values across renders
  const overScrollProgressRef = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const isNavigatingRef = useRef(false);

  // Define page order for navigation using useMemo to prevent re-creation
  const pageOrder = useMemo(() => ['/', '/about', '/projects', '/skills', '/contact'], []);
  
  const getCurrentPageIndex = useCallback(() => {
    return pageOrder.indexOf(location.pathname);
  }, [location.pathname, pageOrder]);

  const getNextPage = useCallback(() => {
    const currentIndex = getCurrentPageIndex();
    if (currentIndex >= 0 && currentIndex < pageOrder.length - 1) {
      return pageOrder[currentIndex + 1];
    }
    return null;
  }, [getCurrentPageIndex, pageOrder]);

  const getPageName = useCallback((path) => {
    if (!path) return 'Unknown';
    const pageNames = {
      '/': 'Home',
      '/about': 'About',
      '/projects': 'Projects', 
      '/skills': 'Skills',
      '/contact': 'Contact'
    };
    return pageNames[path] || 'Unknown';
  }, []);

  // Function to reset all progress
  const resetProgress = useCallback(() => {
    overScrollProgressRef.current = 0;
    setProgress(0);
    setShowOverlay(false);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  // Function to navigate to next page
  const navigateToNextPage = useCallback((nextPage) => {
    if (isNavigatingRef.current) return;
    
    isNavigatingRef.current = true;
    setIsScrollingToNext(true);
    
    // Small delay for visual feedback
    setTimeout(() => {
      navigate(nextPage);
      // Reset everything after navigation
      setTimeout(() => {
        resetProgress();
        setIsScrollingToNext(false);
        isNavigatingRef.current = false;
        window.scrollTo(0, 0);
      }, 100);
    }, 300);
  }, [navigate, resetProgress]);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're near the bottom of the page (with some tolerance)
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 50;
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 10;
      
      if (isAtBottom) {
        const nextPage = getNextPage();
        if (nextPage) {
          setShowOverlay(true);
          
          // Clear any existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          // Start timeout to hide overlay if user stops scrolling
          scrollTimeoutRef.current = setTimeout(() => {
            if (overScrollProgressRef.current < 100) {
              resetProgress();
            }
          }, 2000);
        }
      } else if (!isNearBottom) {
        resetProgress();
      }
    };

    const handleWheel = (e) => {
      if (isNavigatingRef.current) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 10;
      
      if (isAtBottom && e.deltaY > 0) {
        const nextPage = getNextPage();
        if (nextPage) {
          e.preventDefault();
          
          // Increase progress based on scroll intensity
          const scrollIntensity = Math.min(e.deltaY * 0.3, 8); // Cap the intensity
          overScrollProgressRef.current = Math.min(100, overScrollProgressRef.current + scrollIntensity);
          setProgress(overScrollProgressRef.current);
          setShowOverlay(true);
          
          // Navigate when progress reaches 100%
          if (overScrollProgressRef.current >= 100) {
            navigateToNextPage(nextPage);
          }
          
          // Clear timeout since user is actively scrolling
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
          }
        }
      }
    };

    const handleTouchStart = (e) => {
      if (isNavigatingRef.current) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 10;
      
      if (isAtBottom) {
        const nextPage = getNextPage();
        if (nextPage) {
          // Store initial touch position
          const touch = e.touches[0];
          e.target.touchStartY = touch.clientY;
        }
      }
    };

    const handleTouchMove = (e) => {
      if (isNavigatingRef.current) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 10;
      
      if (isAtBottom && e.target.touchStartY) {
        const nextPage = getNextPage();
        if (nextPage) {
          const touch = e.touches[0];
          const touchDelta = e.target.touchStartY - touch.clientY;
          
          if (touchDelta > 0) { // Swiping up
            const swipeProgress = Math.min(touchDelta / 100 * 100, 100);
            overScrollProgressRef.current = swipeProgress;
            setProgress(overScrollProgressRef.current);
            setShowOverlay(true);
            
            if (overScrollProgressRef.current >= 100) {
              navigateToNextPage(nextPage);
            }
          }
        }
      }
    };

    const handleTouchEnd = () => {
      // Reset touch tracking
      if (overScrollProgressRef.current < 100) {
        setTimeout(() => {
          if (!isNavigatingRef.current && overScrollProgressRef.current < 100) {
            resetProgress();
          }
        }, 1000);
      }
    };

    // Add event listeners with proper options
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [getNextPage, navigateToNextPage, resetProgress]);

  // Reset when location changes
  useEffect(() => {
    resetProgress();
    setIsScrollingToNext(false);
    isNavigatingRef.current = false;
  }, [location.pathname, resetProgress]);

  return {
    showOverlay,
    progress,
    nextPage: getNextPage(),
    nextPageName: getPageName(getNextPage()),
    isScrollingToNext,
    getCurrentPageIndex,
    getPageName
  };
};

export default useCrossPageScroll;
