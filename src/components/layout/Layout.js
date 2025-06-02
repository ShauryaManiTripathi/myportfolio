import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import CustomCursor from './CustomCursor';
import { useTheme } from '../../context/ThemeContext';

const Main = styled(motion.main)`
  min-height: 100vh;
  padding-top: 80px; /* Matches header height */
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const PageContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px - 200px); /* Subtracting header and footer heights */
`;

const Layout = ({ children }) => {
  const { theme } = useTheme();
  
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };
  
  return (
    <>
      <Header />
      <Main theme={theme}>
        <PageContainer
          initial="initial"
          animate="in"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </PageContainer>
      </Main>
      <Footer />
      <BackToTop />
      <CustomCursor />
    </>
  );
};

export default Layout;
