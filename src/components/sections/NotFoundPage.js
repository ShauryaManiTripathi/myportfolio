import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { Button } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';

const NotFoundContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100vh - 300px);
  padding: 2rem;
`;

const ErrorCode = styled(motion.h1)`
  font-size: clamp(5rem, 20vw, 15rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
`;

const ErrorTitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: 1.5rem;
`;

const ErrorDescription = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 500px;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const NotFoundPage = () => {
  const { theme } = useTheme();
  
  return (
    <NotFoundContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ErrorCode
        theme={theme}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10, delay: 0.2 }}
      >
        404
      </ErrorCode>
      
      <ErrorTitle
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Page Not Found
      </ErrorTitle>
      
      <ErrorDescription
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to the homepage.
      </ErrorDescription>
      
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button primary as={Link} to="/">
          <FiHome /> Back to Home
        </Button>
      </motion.div>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
