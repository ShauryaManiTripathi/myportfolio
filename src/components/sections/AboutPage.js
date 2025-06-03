import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiDownload, FiUser, FiCode, FiBook } from 'react-icons/fi';
import { Section, SectionTitle, Avatar, Card, ExternalLink, TagsContainer, Tag, fadeInUpVariants } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';

const ResponsiveContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const AboutGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0 1rem;
  }
`;

const ProfileSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: sticky;
  top: 2rem;
  height: fit-content;
  margin: 2rem 0;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    position: static;
    margin: 1rem 0;
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
`;

const Name = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 1.5rem 0 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin: 1rem 0 0.5rem;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondary};
  font-weight: 500;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const InfoCard = styled(Card)`
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: left;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
    padding: 1rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 1rem 0;
  align-items: center;
  
  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    margin: 0.75rem 0;
    
    svg {
      font-size: 1rem;
    }
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  min-width: 80px;
  
  @media (max-width: 480px) {
    min-width: 60px;
    font-size: 0.9rem;
  }
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.secondary};
  word-break: break-word;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const BioContent = styled.div`
  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const BioText = styled.p`
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const GradientHello = styled.span`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 1.2em;
`;

const SubtleEmphasis = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const ProjectName = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-style: italic;
`;

const ExperienceSection = styled(motion.div)`
  margin-top: 2rem;
`;

const ExperienceCard = styled(Card)`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  border-left: 4px solid ${({ theme }) => theme.primary};
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ExperienceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
`;

const ExperienceCompany = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
`;

const ExperiencePeriod = styled.div`
  background-color: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ExperienceDescription = styled.p`
  line-height: 1.6;
  margin-top: 0.5rem;
`;

const AboutPage = () => {
  const { theme } = useTheme();
  
  const personalInfo = [
    { label: 'Age', value: '22' },
    { label: 'Email', value: 'shaurya.deoria@gmail.com' },
    { label: 'Phone', value: '+91 9454604042' },
    { label: 'Location', value: 'Gorakhpur , Uttar Pradesh' },
  ];
  
const skills = [
  'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Go',
  'HTML', 'CSS', 'React', 'Node.js', 'Express', 
  'MongoDB', 'GraphQL', 'Flask',
  'Flutter', 'TensorFlow','Docker',
  'Git'
];
  
  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Developed and maintained complex web applications using React and TypeScript. Collaborated with cross-functional teams to implement new features and improve user experience.',
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Built responsive websites and web applications for various clients. Worked with designers to implement pixel-perfect interfaces and smooth animations.',
    },
    {
      title: 'Web Developer Intern',
      company: 'Startup',
      period: '2019 - 2020',
      description: 'Assisted in the development of the company website and internal tools. Learned modern web development techniques and best practices.',
    },
  ];
  
  return (
    <>
      <Section>
        <SectionTitle>About Me</SectionTitle>
        
        <AboutGrid
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <ProfileSection variants={fadeInUpVariants}>
            <Avatar 
              theme={theme}
              size="180px"
              src="/assets/pic.jpeg"
              alt="Shaurya Mani Tripathi"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
            
            <Name>Shaurya Mani Tripathi</Name>
            <Title theme={theme}>Full-Stack Developer</Title>
            
            <ExternalLink primary href="/assets/resume_shauryamanitripathi.pdf">
              <FiDownload /> Download Resume
            </ExternalLink>
            
            <InfoCard theme={theme} style={{ marginTop: '2rem' }}>
              {personalInfo.map((info, index) => (
                <InfoItem key={index} theme={theme}>
                  <FiUser />
                  <InfoLabel>{info.label}:</InfoLabel>
                  <InfoValue theme={theme}>{info.value}</InfoValue>
                </InfoItem>
              ))}
            </InfoCard>
          </ProfileSection>
          
          <BioContent as={motion.div} variants={fadeInUpVariants} custom={1}>
            <BioText>
              <GradientHello theme={theme}>What if I told you</GradientHello> that the developer you're looking for has already built <SubtleEmphasis theme={theme}>Agentic/Speech-to-speech powered e-commerce solutions,WebApps,Mobile Apps,CLI Agentic Assistants, mental health chatbots, and low level system applications</SubtleEmphasis> – all while maintaining a passion for clean, scalable code? I'm Shaurya Mani Tripathi, and I don't just write code; <SubtleEmphasis theme={theme}>I solve problems that matter</SubtleEmphasis>.
            </BioText>
            
            <BioText>
              In today's rapidly evolving tech landscape, you need someone who can <SubtleEmphasis theme={theme}>adapt, innovate, and deliver</SubtleEmphasis>. As a <SubtleEmphasis theme={theme}>quick learner with an insatiable curiosity</SubtleEmphasis>, I am mastering diverse technologies across the full stack – from crafting lightning-fast backend systems with Go and Python to building intuitive React interfaces that users actually love. Whether it's architecting robust APIs or creating interactive web experiences, I bring both <em>technical depth and creative problem-solving</em> to every project.
            </BioText>
            
            <BioText>
              Here's what sets me apart: I'm not just riding the AI wave – <SubtleEmphasis theme={theme}>I'm actively shaping it</SubtleEmphasis>. From developing <ProjectName theme={theme}>Gemini Coder</ProjectName> (an intelligent operating system agent) to building <ProjectName theme={theme}>CartGenie</ProjectName> (an LLM-powered e-commerce transformer), I'm creating solutions that push boundaries. My experience with Agentic System / WebD / AppD / system programs isn't just theoretical – it's <em>production-ready and impactful</em>.
            </BioText>

            <BioText>
              But I believe great technology should serve humanity. That's why I've built accessible mobile solutions like the <ProjectName theme={theme}>PilgrimAI mental health chatbot</ProjectName> using Flutter and Dart, and why I create tools like my Rust-based College's internet's auto-firewall authenticator – <SubtleEmphasis theme={theme}>solving real problems for real people</SubtleEmphasis>. Every line of code I write is driven by the question: <em>"How can this make someone's life better?"</em>
            </BioText>
            
            <BioText>
              My foundation is rock-solid: enterprise-grade databases (SQL, PostgreSQL, Vector DBs), cloud infrastructure <SubtleEmphasis theme={theme}>(Docker, AWS, Nginx, EC2, S3, Autoscaling, RDS, BeanStalk, Hadoop, Spark)</SubtleEmphasis>, and DevOps practices (Git CI/CD) that ensure your products scale seamlessly. I don't just build features – <SubtleEmphasis theme={theme}>I build systems that grow with your business</SubtleEmphasis>.
            </BioText>

            <BioText>
              What excites me most? <SubtleEmphasis theme={theme}>The intersection of cutting-edge technology and meaningful impact</SubtleEmphasis>. Whether it's making Fourier transforms dance on screen or designing database schemas for complex management systems, I approach every challenge with curiosity, precision, and an unwavering commitment to excellence.
            </BioText>
            
            <BioText>
              You're not just hiring a developer – you're bringing on someone who <SubtleEmphasis theme={theme}>transforms ideas into scalable, maintainable solutions</SubtleEmphasis> that users love and businesses depend on.
            </BioText>

            <BioText>
            Ready to see what we can build together? 🚀
            </BioText>
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <FiCode style={{ marginRight: '0.5rem', color: theme.primary }} /> Skills & Technologies
              </h3>
              
              <TagsContainer>
                {skills.map((skill, index) => (
                  <Tag key={index}>{skill}</Tag>
                ))}
              </TagsContainer>
            </div>
            
            {/* <ExperienceSection>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                <FiBook style={{ marginRight: '0.5rem', color: theme.primary }} /> Experience
              </h3>
              
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} theme={theme}>
                  <ExperienceHeader>
                    <div>
                      <ExperienceTitle>{exp.title}</ExperienceTitle>
                      <ExperienceCompany theme={theme}>{exp.company}</ExperienceCompany>
                    </div>
                    <ExperiencePeriod theme={theme}>{exp.period}</ExperiencePeriod>
                  </ExperienceHeader>
                  <ExperienceDescription>{exp.description}</ExperienceDescription>
                </ExperienceCard>
              ))}
            </ExperienceSection> */}
          </BioContent>
        </AboutGrid>
      </Section>
    </>
  );
};

export default AboutPage;
