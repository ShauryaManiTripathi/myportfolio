import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Default metadata
const defaultMetadata = {
  title: 'Portfolio - Creative Frontend Developer',
  description: 'Welcome to my portfolio website. I am a frontend developer specializing in creating beautiful and functional web applications.',
};

// Page-specific metadata
const pageMetadata = {
  '/': {
    title: 'Home - Shaurya | Portfolio',
    description: 'Welcome to my portfolio. I create elegant web solutions with modern technologies.',
  },
  '/about': {
    title: 'About Me - Shaurya | Portfolio',
    description: 'Learn more about my skills, experience, and journey as a web developer.',
  },
  '/projects': {
    title: 'Projects - Shaurya | Portfolio',
    description: 'Explore my recent web development projects and applications.',
  },
  '/skills': {
    title: 'Skills - Shaurya | Portfolio',
    description: 'Discover my technical skills and expertise in web development.',
  },
  '/contact': {
    title: 'Contact - Shaurya | Portfolio',
    description: 'Get in touch with me for collaboration, job opportunities, or just to say hello.',
  },
};

// Hook to update page metadata
export const usePageMetadata = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Get metadata for current path or use default
    const metadata = pageMetadata[location.pathname] || defaultMetadata;
    
    // Update document title
    document.title = metadata.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    } else {
      // Create meta description if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metadata.description;
      document.head.appendChild(meta);
    }
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname]);
};

export default usePageMetadata;
