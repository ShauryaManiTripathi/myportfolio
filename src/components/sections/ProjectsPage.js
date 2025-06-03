import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFilter, FiDownload } from 'react-icons/fi';
import { Section, SectionTitle, TagsContainer, Tag, staggerContainerVariants, fadeInUpVariants } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';
import ShimmerCard from '../effects/ShimmerCard';

import portfolioImage from '../../assets/images/portfoliov2.png'; // You already have this one!
import cartgenieimage from '../../assets/images/cartgenie.png'; // Placeholder for CartGenie image
import geminicoderimage from '../../assets/images/geminicoderv2.png'; // Placeholder for GeminiCoder image
import fourierimage from '../../assets/images/fourier.png'; // Placeholder for Fourier image
import fileterminalimage from '../../assets/images/fileterminal.png'; // Placeholder for File Terminal image
import authimage from '../../assets/images/auth.png'; // Placeholder for IIITG auth app image
import pilgrimimage from '../../assets/images/pilgrim.png'; // Placeholder for PilgrimAI image
import gitAskimage from '../../assets/images/gitAsk.png'; // Placeholder for GitAsk image
const FilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  justify-content: center;
`;

const FilterButton = styled(motion.button)`
  background-color: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.text};
  border: 2px solid ${({ active, theme }) => active ? theme.primary : theme.secondary};
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.primary : `${theme.primary}20`};
    border-color: ${({ theme }) => theme.primary};
    color: ${({ active, theme }) => active ? '#fff' : theme.primary};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(ShimmerCard)`
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

const SectionDescription = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const ProjectsPage = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'design', name: 'Basic UI/UX' },
    {id: 'agentic', name: 'Agentic AI' },
    { id: 'algorithmic', name: 'Algorithmic/Maths' }
    , { id: 'systemutility', name: 'System Utility' }
  ];
  
  const projectsData = [
    {
      id: 1,
      title: 'CartGenie',
      description: 'AI-powered e-commerce platform delivering an intuitive shopping experience with complete speech-to-speech functionality and a real-time shopping assistant.',
      image: cartgenieimage,
      categories: ['web', 'agentic'],
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
      categories: ['agentic','systemutility'],
      technologies: ['Python','Google GenAI', 'Agentic System', 'SDE', 'RAG'],
      liveLink: '#',
      githubLink: 'https://github.com/shauryamanitripathi/gemini-coder-cli',
      downloadUrl: 'https://github.com/shauryamanitripathi/gemini-coder-cli',
      featured: true
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A personal portfolio website showcasing projects and skills with smooth animations and responsive design.',
      image: portfolioImage,
      categories: ['web', 'design'],
      technologies: ['React', 'Framer Motion', 'Emotion CSS', 'React Router'],
      liveLink: 'https://myportfolio-khaki-pi.vercel.app/',
      githubLink: 'https://github.com/ShauryaManiTripathi/myportfolio',
      downloadUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'GitAsk',
      description: 'A codeBase search Tool with semantic search for analysis of pretty large codebases.Done as Software Engineering Project.',
      image: gitAskimage,
      categories: ['web'],
      technologies: ['NextJs', 'Gemini AI', 'Emotion CSS', 'Framer Motion','Postgres'],
      liveLink: 'https://gitask.vercel.app/',
      githubLink: 'https://github.com/ShauryaManiTripathi/gitchat-labProject',
      downloadUrl: '#',
      featured: true
    },
    {
      id: 5,
      title: 'Draw With Fourier',
      description: 'A artist that can replicate your one stroke drawing with help of Maths and Circles 😉. Containerized in Docker for Cross-platform deployment.',
      image: fourierimage,
      categories: ['web','algorithmic'],
      technologies: ['Go', 'HTML5 canvas', 'Docker', 'Git CI/CD'],
      liveLink: '#',
      githubLink: 'https://github.com/shauryamanitripathi/draw-with-fourier',
      downloadUrl: 'https://github.com/ShauryaManiTripathi/Draw-with-Fourier/blob/main/download.md',
      featured: true
    },
    {
      id: 6,
      title: 'File and Terminal Agentic API',
      description: 'RESTful API toolkit enabling AI agents with full file system and terminal access. Build autonomous agents that can create their own tools, execute commands, and perform complex tasks with unrestricted access to your computing environment. Built with Go and the Gin/Echo web framework..',
      image: fileterminalimage,
      categories: ['systemutility','agentic',],
      technologies: ['Go', 'HTML5 Canvas', 'MultiThreaded Backend', 'Gin/Echo'],
      liveLink: '#',
      githubLink: 'https://github.com/ShauryaManiTripathi/File-and-Terminal-Access-APIs',
      downloadUrl: '#',
      featured: true
    },
    {
      id: 7,
      title: 'IIITG auto firewall auth',
      description: 'This Application automates firewall authentication for IIITG networks. By basic API reverse engineering, and faking the request, it allows users to bypass manual login steps.',
      image: authimage,
      categories: ['systemutility'],
      technologies: ['Rust', 'Systemd', 'systemctl', 'linux'],
      liveLink: '#',
      githubLink: 'https://github.com/ShauryaManiTripathi/IIITG-auto-firewall-auth',
      downloadUrl: '#',
      featured: false
    },
    {
      id: 8,
      title: 'PilgrimAI - Mobile/Web App',
      description: 'Mental Health Assistant on the go, providing personalized support and resources for mental well-being.',
      image: pilgrimimage,
      categories: ['mobile','web'],
      technologies: ['Flutter', 'Dart','Python','Flask'],
      liveLink: 'https://pilgrimai.vercel.app/',
      githubLink: 'https://github.com/ShauryaManiTripathi/PILGRIMAI',
      downloadUrl: 'https://github.com/ShauryaManiTripathi/PILGRIMAI/releases/download/Appv3/app-release.apk',
      featured: true
    },
  ];
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.categories.includes(filter));
  
  return (
    <Section>
      <SectionTitle>My Projects</SectionTitle>
      <SectionDescription>
        A collection of projects that showcase my skills and passion for creating 
        meaningful digital experiences.
      </SectionDescription>
      
      <FilterContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FiFilter style={{ fontSize: '1.2rem', marginRight: '0.5rem', color: theme.primary }} />
        {categories.map(category => (
          <FilterButton
            key={category.id}
            active={filter === category.id}
            theme={theme}
            onClick={() => setFilter(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <AnimatePresence mode="wait">
        <ProjectsGrid
          key={filter}
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              theme={theme}
              as={motion.div}
              variants={fadeInUpVariants}
              custom={index}
              layout
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              shimmerOptions={{
                gap: 10,
                fadeSpeed: 0.08,
                pixelSize: 1.5,
                density: 0.2
              }}
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
                {/* <FiArrowUpRight size={24} />
                <span>Project Preview</span> */}
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
        </ProjectsGrid>
      </AnimatePresence>
    </Section>
  );
};

export default ProjectsPage;
