import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiSend, FiMapPin, FiPhone, FiMail, FiGithub, FiLinkedin, FiCheck, FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { Section, SectionTitle, Card, fadeInUpVariants } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';
import { EMAILJS_CONFIG, createEmailTemplate, validateEmailJSConfig } from '../../config/emailjs';

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

const StatusMessage = styled(motion.div)`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  
  ${({ type, theme }) => 
    type === 'success' 
      ? `
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      `
      : `
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      `
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
  
  const [status, setStatus] = useState({
    loading: false,
    message: '',
    type: '', // 'success' or 'error'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set loading state
    setStatus({ loading: true, message: '', type: '' });
    
    try {
      // Validate EmailJS configuration
      validateEmailJSConfig();
      // Initialize EmailJS
      emailjs.init(EMAILJS_CONFIG.USER_ID);
      
      // Prepare template parameters
      const templateParams = createEmailTemplate(formData);
      
      // Send email
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      // Success - email sent
      setStatus({
        loading: false,
        message: '✨ Message sent successfully! I\'ll get back to you soon.',
        type: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ loading: false, message: '', type: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      
      setStatus({
        loading: false,
        message: error.message || 'Failed to send message. Please try again or contact me directly at shaurya.deoria@gmail.com',
        type: 'error'
      });
      
      // Clear error message after 7 seconds
      setTimeout(() => {
        setStatus({ loading: false, message: '', type: '' });
      }, 7000);
    }
  };
  
  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: 'Current Location',
      text: 'Guwahati, Assam, India',
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      text: '+91 9454604042',
    },
    {
      icon: <FiMail />,
      title: 'Email',
      text: 'shaurya.deoria@gmail.com',
    },
  ];
  
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/shauryamanitripathi', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/shaurya-mani-tripathi-117553271/', label: 'LinkedIn' },
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
          <ContactForm theme={theme}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            
            {/* Status Message */}
            {status.message && (
              <StatusMessage
                type={status.type}
                theme={theme}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {status.type === 'success' ? <FiCheck /> : <FiX />}
                {status.message}
              </StatusMessage>
            )}
            
            {/* Contact form submit button */}
            <button
              type="submit"
              disabled={status.loading}
              style={{
                width: '100%',
                backgroundColor: theme.primary,
                color: '#fff',
                border: `2px solid ${theme.primary}`,
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: status.loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: status.loading ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                if (!status.loading) {
                  e.target.style.transform = 'scale(1.02)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              {status.loading ? (
                <>
                  <LoadingSpinner /> Sending...
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </button>
            </form>
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
