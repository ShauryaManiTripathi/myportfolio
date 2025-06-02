import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCode, FiExternalLink, FiZap, FiHeart, FiGithub, FiArrowUpRight, FiDownload, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Button, ExternalLink, Section, SectionTitle, Card, Grid, fadeInUpVariants, staggerContainerVariants, TagsContainer, Tag } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';
import { FaFlutter } from "react-icons/fa6";
import { BsFiletypeExe } from "react-icons/bs";

import portfolioImage from '../../assets/images/portfoliov2.png';
import cartgenieimage from '../../assets/images/cartgenie.png';
import geminicoderimage from '../../assets/images/geminicoderv2.png';


const HeroSection = styled(motion.section)`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: ${({ theme }) => theme.secondary};
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ScrollDown = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  
  svg {
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FeatureCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${({ highlighted }) => highlighted ? `
    border: 3px solid;
    border-image: linear-gradient(45deg, 
      #ff0000 0%,
      #ff7300 14.3%, 
      #fffb00 28.6%, 
      #48ff00 42.9%, 
      #00ffd5 57.1%, 
      #002bff 71.4%, 
      #7a00ff 85.7%, 
      #ff00c8 100%
    ) 1;
    animation: gradientShift 3s ease-in-out infinite;
    background: linear-gradient(45deg, 
      #ff0000 0%,
      #ff7300 14.3%, 
      #fffb00 28.6%, 
      #48ff00 42.9%, 
      #00ffd5 57.1%, 
      #002bff 71.4%, 
      #7a00ff 85.7%, 
      #ff00c8 100%
    );
    background-size: 400% 400%;
    background-clip: border-box;
    -webkit-background-clip: border-box;
    
    &::before {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      right: 3px;
      bottom: 3px;
      background: ${({ theme }) => theme.cardBackground || theme.background};
      border-radius: calc(inherit - 3px);
      z-index: 0;
    }
    
    & > * {
      position: relative;
      z-index: 1;
    }
    
    @keyframes gradientShift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
  ` : ''}
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px ${({ theme }) => `${theme.text}20`};
  }
`;

const FeatureIcon = styled(motion.div)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.primary}15`};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  line-height: 1.6;
  opacity: 0.9;
`;

const ProjectsPreview = styled(motion.div)`
  margin-top: 2rem;
`;

const ViewAllButton = styled(motion.div)`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
  border: 2px solid ${({ theme }) => `${theme.primary}20`};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 15px 40px ${({ theme }) => `${theme.primary}15`};
  }
  
  &:hover .project-overlay {
    opacity: 1;
  }
`;

const ProjectImage = styled(motion.div)`
  height: 200px;
  background: linear-gradient(135deg, ${({ theme }) => `${theme.primary}20`}, ${({ theme }) => `${theme.accent}20`});
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  margin: -1.5rem -1.5rem 1.5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  gap: 10px;
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => `${theme.primary}90`};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ProjectOverlayLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectOverlayLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.background};
  border-radius: 50%;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  transition: all 0.3s ease;
  transform: scale(0.8);
  
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.background};
    transform: scale(1);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ProjectDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  opacity: 0.9;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const EnhancedProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid;
  
  ${({ primary, theme }) => primary ? `
    background: ${theme.primary};
    color: ${theme.background};
    border-color: ${theme.primary};
    
    &:hover {
      background: ${theme.accent};
      border-color: ${theme.accent};
      transform: translateY(-2px);
      box-shadow: 0 5px 15px ${theme.primary}30;
    }
  ` : `
    background: transparent;
    color: ${theme.primary};
    border-color: ${theme.primary};
    
    &:hover {
      background: ${theme.primary};
      color: ${theme.background};
      transform: translateY(-2px);
      box-shadow: 0 5px 15px ${theme.primary}30;
    }
  `}
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  color: ${({ theme }) => theme.background};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const HomePage = () => {
  const { theme } = useTheme();
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const scrollToFeatures = () => {
    document.getElementById('test').scrollIntoView({ behavior: 'smooth' });
  };
  
  const featuredProjects = [
    {
      id: 1,
      title: 'CartGenie',
      description: 'AI-powered e-commerce platform delivering an intuitive shopping experience with complete speech-to-speech functionality and a real-time shopping assistant.',
      image: cartgenieimage,
      category: 'web',
      technologies: ['Ollama','Flask', 'LangChain','Agentic', 'RAG', 'OpenVoice'],
      liveLink: 'https://92c3-14-139-197-66.ngrok-free.app/',
      githubLink: 'https://github.com/ShauryaManiTripathi/CartGenie---Final',
      downloadUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Gemini Coder',
      description: 'A sophisticated Claude-Coder alternative powered by Google Gemini, built entirely from scratch with zero external frameworks. Features an intelligent file-context system , CLI based AI assitant.',
      image: geminicoderimage,
      category: 'mobile',
      technologies: ['Python','Google GenAI', 'Agentic System', 'SDE', 'RAG'],
      liveLink: '#',
      githubLink: 'https://github.com/ShauryaManiTripathi/Gemini-Coder-CLI',
      downloadUrl: 'https://github.com/ShauryaManiTripathi/Gemini-Coder-CLI/archive/refs/heads/main.zip',
      featured: true
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A personal portfolio website showcasing projects and skills with smooth animations and responsive design.',
      image: portfolioImage,
      category: 'web',
      technologies: ['React', 'Framer Motion', 'Emotion CSS', 'React Router'],
      liveLink: 'https://myportfolio-khaki-pi.vercel.app/',
      githubLink: 'https://github.com/ShauryaManiTripathi/myportfolio',
      downloadUrl: '#',
      featured: false
    },
  ];
  
  const features = [
    {
      icon: <FiCode />,
      title: 'WebD - backend/frontend',
      description: 'Creating responsive, user-friendly websites with modern technologies.',
    },
    {
      icon: <BsFiletypeExe />,
      title: 'Software Development',
      description: 'Designing Desktop CLI/GUI apps.',
    },
    {
      icon: <FaFlutter />,
      title: 'Mobile Development',
      description: 'Building Cross Platform App with Flutter.',
    },
    {
      icon: <FiCpu />,
      title: 'Agentic Framework',
      description: 'Rapidly learning and implementing ML models and APIs in applications. Building intelligent AI agents using existing frameworks.',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Quick Learner',
      description: 'Exceptional ability to quickly grasp new technologies, frameworks, and concepts. From zero to implementation in record time.',
    },
    {
      icon: <FiCode />,
      title: 'Clean Code',
      description: 'I write maintainable, scalable code that follows best practices and industry standards.',
    },
    {
      icon: <FaPalette />,
      title: 'Creative Design',
      description: 'Bringing ideas to life with thoughtful design and attention to user experience.',
    },
    {
      icon: <FiZap />,
      title: 'Performance',
      description: 'Optimized applications that load fast and provide smooth user interactions.',
    },
    {
      icon: <FiHeart />,
      title: 'Passionate',
      description: 'Genuinely excited about technology and creating solutions that make a difference.',
    },
  ];
  
  return (
    <>
      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroContent>
          <Title 
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shaurya Mani Tripathi
          </Title>
          
          <Subtitle 
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Computer Science and Programming enthusiast
          </Subtitle>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I create elegant solutions to complex problems. Passionate about building 
            user-friendly applications with modern technologies.
          </Description>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Button primary as={Link} to="/contact">
              Get in Touch
            </Button>
            <Button as={Link} to="/projects">
              View Projects
            </Button>
            <Button as={Link} to="/about">
              About Me
            </Button> 
            <ExternalLink href="/assets/resume_shauryamanitripathi.pdf">
              Download Resume
            </ExternalLink>
          </motion.div>
        </HeroContent>
        
        <ScrollDown id="test"
          theme={theme}
          onClick={scrollToFeatures}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ y: 5, x: '-50%' }}
          whileTap={{ scale: 0.9 }}
          style={{ x: '-50%' }}
        >
          Scroll Down
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FiArrowDown />
          </motion.div>
        </ScrollDown>
      </HeroSection>
      
      <Section id="features" ref={featuresRef}>
        <SectionTitle>What I Do</SectionTitle>
        
        <Grid
          as={motion.div}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={featuresInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              theme={theme}
              highlighted={feature.highlighted}
              as={motion.div}
              variants={fadeInUpVariants}
              custom={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <FeatureIcon
                theme={theme}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </Grid>
      </Section>
      
      <Section>
        <SectionTitle>Featured Projects</SectionTitle>
        
        <ProjectsPreview
          as={motion.div}
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid>
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                theme={theme}
                as={motion.div}
                variants={fadeInUpVariants}
                custom={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {project.featured && (
                  <FeaturedBadge theme={theme}>
                    Featured
                  </FeaturedBadge>
                )}
                <ProjectImage 
                  theme={theme}
                  image={project.image}
                >
                  <ProjectOverlay theme={theme} className="project-overlay">
                    <ProjectOverlayLinks>
                      {project.liveLink && project.liveLink !== '#' && (
                        <ProjectOverlayLink 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          theme={theme}
                        >
                          <FiExternalLink size={18} />
                        </ProjectOverlayLink>
                      )}
                      {project.githubLink && project.githubLink !== '#' && (
                        <ProjectOverlayLink 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          theme={theme}
                        >
                          <FiGithub size={18} />
                        </ProjectOverlayLink>
                      )}
                      {project.downloadUrl && project.downloadUrl !== '#' && (
                        <ProjectOverlayLink 
                          href={project.downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          theme={theme}
                        >
                          <FiDownload size={18} />
                        </ProjectOverlayLink>
                      )}
                    </ProjectOverlayLinks>
                  </ProjectOverlay>
                </ProjectImage>
                
                <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TagsContainer>
                  {project.technologies.map((tech, techIndex) => (
                    <Tag key={techIndex}>{tech}</Tag>
                  ))}
                </TagsContainer>
                
                <ProjectLinks>
                  {project.liveLink && project.liveLink !== '#' && (
                    <EnhancedProjectLink
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      primary="true"
                      theme={theme}
                    >
                      <FiExternalLink size={16} /> Live Demo
                    </EnhancedProjectLink>
                  )}
                  {project.githubLink && project.githubLink !== '#' && (
                    <EnhancedProjectLink
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      theme={theme}
                    >
                      <FiGithub size={16} /> Code
                    </EnhancedProjectLink>
                  )}
                  {project.downloadUrl && project.downloadUrl !== '#' && (
                    <EnhancedProjectLink
                      href={project.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      theme={theme}
                    >
                      <FiDownload size={16} /> Download
                    </EnhancedProjectLink>
                  )}
                </ProjectLinks>
              </ProjectCard>
            ))}
          </Grid>
          
          <ViewAllButton>
            <Button as={Link} to="/projects">
              View All Projects
            </Button>
          </ViewAllButton>
        </ProjectsPreview>
      </Section>
    </>
  );
};

export default HomePage;
