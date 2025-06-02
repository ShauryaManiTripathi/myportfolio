import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCode, FiExternalLink, FiZap, FiHeart, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Button, ExternalLink, Section, SectionTitle, Card, Grid, fadeInUpVariants, staggerContainerVariants } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';
import { FaFlutter } from "react-icons/fa6";
import { BsFiletypeExe } from "react-icons/bs";


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
  
  &::before {
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
  
  &:hover::before {
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

const EnhancedProjectCard = styled(Card)`
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
  margin: -1.5rem -1.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  gap: 10px;
  position: relative;
  overflow: hidden;
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

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
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

const ProjectContent = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ProjectDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => `${theme.primary}15`};
  color: ${({ theme }) => theme.primary};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid ${({ theme }) => `${theme.primary}30`};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    transform: translateY(-2px);
  }
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
      technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      technologies: ['React', 'Chart.js', 'OpenWeather API', 'SCSS'],
      liveUrl: '#',
      githubUrl: '#',
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
              <EnhancedProjectCard
                key={project.id}
                theme={theme}
                as={motion.div}
                variants={fadeInUpVariants}
                custom={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectImage theme={theme}>
                  <FiArrowUpRight size={24} />
                  <span>Project Preview</span>
                  <ProjectOverlay theme={theme} className="project-overlay">
                    <ProjectLinks>
                      <ProjectLink 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        theme={theme}
                      >
                        <FiExternalLink size={18} />
                      </ProjectLink>
                      <ProjectLink 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        theme={theme}
                      >
                        <FiGithub size={18} />
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectOverlay>
                </ProjectImage>

                <ProjectContent>
                  <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <ProjectTech>
                    {project.technologies.map((tech, techIndex) => (
                      <TechTag key={techIndex} theme={theme}>
                        {tech}
                      </TechTag>
                    ))}
                  </ProjectTech>

                  <ProjectActions>
                    <EnhancedProjectLink 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      primary="true"
                      theme={theme}
                    >
                      <FiExternalLink size={16} />
                      Live Demo
                    </EnhancedProjectLink>
                    <EnhancedProjectLink 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      theme={theme}
                    >
                      <FiGithub size={16} />
                      Code
                    </EnhancedProjectLink>
                  </ProjectActions>
                </ProjectContent>
              </EnhancedProjectCard>
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
