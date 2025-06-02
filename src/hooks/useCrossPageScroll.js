import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useCrossPageScroll = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrollingToNext, setIsScrollingToNext] = useState(false);
  const [targetPageName, setTargetPageName] = useState(''); // Store the target page name
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use refs to persist values across renders
  const overScrollProgressRef = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const decayIntervalRef = useRef(null);
  const isDecayingRef = useRef(false);
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
    isDecayingRef.current = false;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    if (decayIntervalRef.current) {
      clearInterval(decayIntervalRef.current);
      decayIntervalRef.current = null;
    }
  }, []);

  // Function to start progress decay
  const startProgressDecay = useCallback(() => {
    // Clear any existing decay interval
    if (decayIntervalRef.current) {
      clearInterval(decayIntervalRef.current);
    }
    
    isDecayingRef.current = true;
    
    // Start decay animation - reduce progress gradually
    decayIntervalRef.current = setInterval(() => {
      if (overScrollProgressRef.current > 0) {
        // Variable decay rate: faster for higher percentages
        const currentProgress = overScrollProgressRef.current;
        let decayAmount;
        
        if (currentProgress > 80) {
          decayAmount = 4; // Faster decay for high progress
        } else if (currentProgress > 50) {
          decayAmount = 3; // Medium decay for medium progress
        } else {
          decayAmount = 2; // Slower decay for low progress
        }
        
        overScrollProgressRef.current = Math.max(0, overScrollProgressRef.current - decayAmount);
        setProgress(overScrollProgressRef.current);
        
        // Hide overlay when progress reaches 0
        if (overScrollProgressRef.current === 0) {
          setShowOverlay(false);
          isDecayingRef.current = false;
          clearInterval(decayIntervalRef.current);
          decayIntervalRef.current = null;
        }
      } else {
        // Cleanup if progress is already 0
        setShowOverlay(false);
        isDecayingRef.current = false;
        clearInterval(decayIntervalRef.current);
        decayIntervalRef.current = null;
      }
    }, 40); // 40ms intervals for smooth animation
  }, []);

  // Function to navigate to next page
  const navigateToNextPage = useCallback((nextPage) => {
    if (isNavigatingRef.current) return;
    
    isNavigatingRef.current = true;
    setIsScrollingToNext(true);
    
    // Store the target page name to prevent it from changing during navigation
    const targetName = getPageName(nextPage);
    setTargetPageName(targetName);
    
    // Increased delay for better visual feedback (800ms total)
    setTimeout(() => {
      navigate(nextPage);
      // Reset everything after navigation
      setTimeout(() => {
        resetProgress();
        setIsScrollingToNext(false);
        setTargetPageName('');
        isNavigatingRef.current = false;
        window.scrollTo(0, 0);
      }, 100);
    }, 800);
  }, [navigate, resetProgress, getPageName]);

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
          // If we have any progress and are at bottom, show overlay
          if (overScrollProgressRef.current > 0) {
            setShowOverlay(true);
          }
          
          // Clear any existing timeout and decay since user is at bottom
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
          }
          if (decayIntervalRef.current) {
            clearInterval(decayIntervalRef.current);
            decayIntervalRef.current = null;
            isDecayingRef.current = false;
          }
          
          // Start timeout to trigger decay if user stops scrolling
          scrollTimeoutRef.current = setTimeout(() => {
            if (overScrollProgressRef.current > 0 && overScrollProgressRef.current < 100 && !isNavigatingRef.current) {
              startProgressDecay();
            }
          }, 800); // Start decay after 800ms of no activity
        }
      } else if (!isNearBottom) {
        // User scrolled away from bottom - reset everything immediately
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
          
          // If decay is active, stop it and allow user to continue building progress
          if (isDecayingRef.current) {
            if (decayIntervalRef.current) {
              clearInterval(decayIntervalRef.current);
              decayIntervalRef.current = null;
            }
            isDecayingRef.current = false;
          }
          
          // Increase progress based on scroll intensity
          const scrollIntensity = Math.min(e.deltaY * 0.3, 8); // Cap the intensity
          overScrollProgressRef.current = Math.min(100, overScrollProgressRef.current + scrollIntensity);
          setProgress(overScrollProgressRef.current);
          setShowOverlay(true);
          
          // Navigate when progress reaches 100%
          if (overScrollProgressRef.current >= 100) {
            navigateToNextPage(nextPage);
            return; // Exit early if navigating
          }
          
          // Clear timeout since user is actively scrolling
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
          }
          
          // Start new timeout for decay
          scrollTimeoutRef.current = setTimeout(() => {
            if (overScrollProgressRef.current > 0 && overScrollProgressRef.current < 100 && !isNavigatingRef.current) {
              startProgressDecay();
            }
          }, 800); // Start decay after 800ms of inactivity
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
      // Start decay animation for incomplete progress
      if (overScrollProgressRef.current > 0 && overScrollProgressRef.current < 100) {
        setTimeout(() => {
          if (!isNavigatingRef.current && overScrollProgressRef.current > 0 && overScrollProgressRef.current < 100) {
            startProgressDecay();
          }
        }, 800); // Same timeout as other handlers
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
      if (decayIntervalRef.current) {
        clearInterval(decayIntervalRef.current);
      }
    };
  }, [getNextPage, navigateToNextPage, resetProgress, startProgressDecay]);

  // Reset when location changes
  useEffect(() => {
    resetProgress();
    setIsScrollingToNext(false);
    setTargetPageName('');
    isNavigatingRef.current = false;
  }, [location.pathname, resetProgress]);

  return {
    showOverlay,
    progress,
    nextPage: getNextPage(),
    nextPageName: isScrollingToNext ? targetPageName : getPageName(getNextPage()),
    isScrollingToNext,
    getCurrentPageIndex,
    getPageName
  };
};

export default useCrossPageScroll;
