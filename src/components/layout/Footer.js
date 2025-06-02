import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 2rem 0;
  margin-top: 4rem;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
`;

const SocialIcon = styled(motion.a)`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Year = styled.span`
  font-weight: 600;
`;

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FiTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FiMail />, url: 'mailto:your.email@example.com', label: 'Email' },
  ];
  
  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <SocialLinks>
          {socialLinks.map((link, index) => (
            <SocialIcon
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              theme={theme}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {link.icon}
            </SocialIcon>
          ))}
        </SocialLinks>
        
        <FooterText>
          © <Year>{currentYear}</Year> Shaurya Mani Tripathi. All rights reserved
        </FooterText>
        
        <FooterText>
          This portfolio is Built with assistance of self developed GenAI <a href="https://github.com/shauryamanitripathi/gemini-coder-cli" target="_blank" rel="noopener noreferrer">agentic tool in 2 days. (click for github link)</a><br></br>
          using React, Emotion CSS, and Framer Motion.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
