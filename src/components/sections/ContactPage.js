import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiSend, FiMapPin, FiPhone, FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Section, SectionTitle, Card, Button, fadeInUpVariants } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(Card)`
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => `${theme.text}20`};
  border-radius: 8px;
  background-color: ${({ theme }) => `${theme.text}05`};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => `${theme.text}20`};
  border-radius: 8px;
  background-color: ${({ theme }) => `${theme.text}05`};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.secondary};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    alert('Thanks for your message! This is a demo form, so no message was actually sent.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };
  
  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: 'Location',
      text: 'New York, NY, United States',
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      text: '(123) 456-7890',
    },
    {
      icon: <FiMail />,
      title: 'Email',
      text: 'your.email@example.com',
    },
  ];
  
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FiTwitter />, url: 'https://twitter.com', label: 'Twitter' },
  ];
  
  return (
    <Section>
      <SectionTitle>Get In Touch</SectionTitle>
      
      <ContactGrid>
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <ContactForm theme={theme} as="form" onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Your Name</Label>
              <Input
                theme={theme}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Your Email</Label>
              <Input
                theme={theme}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                theme={theme}
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <Textarea
                theme={theme}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <Button
              primary
              type="submit"
              style={{ width: '100%' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiSend /> Send Message
            </Button>
          </ContactForm>
        </motion.div>
        
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <ContactInfo>
            {contactInfo.map((info, index) => (
              <InfoCard key={index} theme={theme} as={motion.div} whileHover={{ y: -5 }}>
                <InfoIcon theme={theme}>{info.icon}</InfoIcon>
                <InfoContent>
                  <InfoTitle>{info.title}</InfoTitle>
                  <InfoText theme={theme}>{info.text}</InfoText>
                </InfoContent>
              </InfoCard>
            ))}
            
            <InfoCard theme={theme}>
              <InfoContent style={{ width: '100%' }}>
                <InfoTitle style={{ marginBottom: '1rem' }}>Find Me On</InfoTitle>
                <SocialLinks>
                  {socialLinks.map((link, index) => (
                    <SocialLink
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      theme={theme}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {link.icon}
                    </SocialLink>
                  ))}
                </SocialLinks>
              </InfoContent>
            </InfoCard>
          </ContactInfo>
        </motion.div>
      </ContactGrid>
    </Section>
  );
};

export default ContactPage;
