import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiLayers, FiDatabase, FiTool, FiCloud, FiCpu, FiSmartphone } from 'react-icons/fi';
import { Section, SectionTitle, Card, fadeInUpVariants, staggerContainerVariants } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SkillCard = styled(Card)`
  padding: 2rem;
  height: 100%;
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled(motion.li)`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillName = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const SkillLevel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
  font-weight: 400;
`;

const ProgressBarContainer = styled.div`
  height: 8px;
  background-color: ${({ theme }) => `${theme.text}15`};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  border-radius: 4px;
  width: ${({ value }) => `${value}%`};
`;

const ExperienceContainer = styled.div`
  margin-top: 4rem;
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const Timeline = styled.div`
  position: relative;
  margin-top: 3rem;
  padding-left: 38px; /* match center of dot */

  &:before {
    content: '';
    position: absolute;
    left: 8px; /* center of dot (16px/2) */
    top: 0;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => `${theme.primary}50`};
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: -30px;
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary};
    border: 3px solid ${({ theme }) => theme.background};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}30`};
  }
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
`;

const TimelineCompany = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  margin: 0.25rem 0 0;
`;

const TimelinePeriod = styled.div`
  background-color: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const TimelineContent = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const TimelineDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const AchievementsList = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 0;
`;

const AchievementItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.5;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillsPage = () => {
  const { theme } = useTheme();
  
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <FiCpu />,
      skills: [
        { name: 'Python', level: 'Advanced', percentage: 100 },
        { name: 'JavaScript', level: 'Advanced', percentage: 80 },
        { name: 'TypeScript', level: 'Beginner', percentage: 30 },
        { name: 'Go', level: 'Beginner', percentage: 30 },
        { name: 'C++', level: 'Advanced', percentage: 90 },
        { name: 'Java', level: 'Intermediate', percentage: 60 },
        { name: 'Rust', level: 'Beginner', percentage: 30 },
        { name: 'Dart', level: 'Intermediate', percentage: 70 },
      ],
    },
    {
      title: 'Frontend, Web, Backend & APIs',
      icon: <FiLayers />,
      skills: [
        { name: 'React.js', level: 'Intermediate', percentage: 70 },
        { name: 'HTML/CSS', level: 'Intermediate', percentage: 70 },
        { name: 'Node.js', level: 'Intermediate', percentage: 70 },
        { name: 'Express.js', level: 'Advanced', percentage: 85 },
        { name: 'Flask', level: 'Advanced', percentage: 90 },
        { name: 'FastAPI', level: 'Intermediate', percentage: 70 },
        { name: 'Firebase', level: 'Intermediate', percentage: 60 },
        { name: 'RESTful APIs', level: 'Advanced', percentage: 90 },
        { name: 'GraphQL', level: 'Beginner', percentage: 20 },
      ],
    },
    {
      title: 'Databases',
      icon: <FiDatabase />,
      skills: [
        { name: 'PostgreSQL', level: 'Advanced', percentage: 85 },
        { name: 'MongoDB', level: 'Advanced', percentage: 80 },
        { name: 'SQL', level: 'Advanced', percentage: 90 },
        { name: 'Vector Databases', level: 'Intermediate', percentage: 75 },
      ],
    },
    {
      title: 'AI & Machine Learning',
      icon: <FiCpu />,
      skills: [
        { name: 'LangChain', level: 'Intermediate', percentage: 70 },
        { name: 'Agentic Systems', level: 'Advanced', percentage: 90 },
        { name: 'RAG (Retrieval Augmented Generation)', level: 'Advanced', percentage: 85 },
        { name: 'Google GenAI', level: 'Advanced', percentage: 80 },
        { name: 'Ollama', level: 'Advanced', percentage: 75 },
        { name: 'TensorFlow', level: 'Intermediate', percentage: 50 },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: <FiCloud />,
      skills: [
        { name: 'AWS EC2', level: 'Advanced', percentage: 85 },
        { name: 'AWS S3', level: 'Advanced', percentage: 80 },
        { name: 'AWS RDS', level: 'Intermediate', percentage: 75 },
        { name: 'AWS Elastic Beanstalk', level: 'Intermediate', percentage: 70 },
        { name: 'Docker', level: 'Advanced', percentage: 85 },
        { name: 'Nginx', level: 'Intermediate', percentage: 75 },
        { name: 'Git CI/CD', level: 'Beginner', percentage: 30 },
        { name: 'Auto Scaling', level: 'Intermediate', percentage: 70 },
      ],
    },
    {
      title: 'Mobile Development',
      icon: <FiSmartphone />,
      skills: [
        { name: 'Flutter', level: 'Beginner', percentage: 30 },
      ],
    },
    {
      title: 'Big Data & Analytics',
      icon: <FiDatabase />,
      skills: [
        { name: 'Hadoop', level: 'Intermediate', percentage: 70 },
        { name: 'Apache Spark', level: 'Intermediate', percentage: 70 },
      ],
    },
    {
      title: 'Tools & Other',
      icon: <FiTool />,
      skills: [
        { name: 'Git', level: 'Advanced', percentage: 95 },
        { name: 'UI/UX Design', level: 'Intermediate', percentage: 80 },
        { name: 'Performance Optimization', level: 'Intermediate', percentage: 70 },
        { name: 'System Architecture', level: 'Intermediate', percentage: 70 },
        { name: 'Problem Solving', level: 'Advanced', percentage: 95 },
      ],
    },
  ];
  
  const experiences = [
    // {
    //   title: 'None So Far',
    //   company: 'None',
    //   period: 'Present',
    //   description: 'Leading the frontend development team in creating modern web applications using React and TypeScript.',
    //   achievements: [
    //     'Redesigned the main product interface, improving user engagement by 40%',
    //     'Implemented a component library that reduced development time by 30%',
    //     'Mentored junior developers and conducted code reviews',
    //     'Optimized application performance, reducing load time by 45%',
    //   ],
    // },
    // {
    //   title: 'Frontend Developer',
    //   company: 'Digital Agency',
    //   period: '2020 - 2022',
    //   description: 'Developed responsive websites and web applications for various clients across different industries.',
    //   achievements: [
    //     'Built 15+ client websites using modern JavaScript frameworks',
    //     'Integrated third-party APIs and services into client applications',
    //     'Collaborated with designers to implement pixel-perfect interfaces',
    //     'Created custom animations using CSS and JavaScript libraries',
    //   ],
    // },
    // {
    //   title: 'Web Developer Intern',
    //   company: 'Startup',
    //   period: '2019 - 2020',
    //   description: 'Assisted in the development of the company website and internal tools.',
    //   achievements: [
    //     'Developed and maintained company website using HTML, CSS, and JavaScript',
    //     'Created internal dashboard for tracking company metrics',
    //     'Participated in daily standup meetings and sprint planning',
    //     'Gained experience with version control systems and agile methodologies',
    //   ],
    // },
  ];
  
  return (
    <>
      <Section>
        <SectionTitle>My Skills & Technologies</SectionTitle>
        
        <SectionDescription>
          From crafting lightning-fast backend systems with Go and Python to building intuitive React interfaces, 
          I bring both technical depth and creative problem-solving to every project. Here's my comprehensive 
          technology stack across full-stack development,Agents, cloud infrastructure, and mobile development.
        </SectionDescription>
        
        <SkillsGrid
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map((category, categoryIndex) => (
            <SkillCard
              key={categoryIndex}
              theme={theme}
              as={motion.div}
              variants={fadeInUpVariants}
              custom={categoryIndex}
            >
              <SkillHeader>
                <SkillIcon theme={theme}>{category.icon}</SkillIcon>
                <SkillTitle>{category.title}</SkillTitle>
              </SkillHeader>
              
              <SkillList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skillIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: skillIndex * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <SkillName>
                      {skill.name}
                      <SkillLevel theme={theme}>{skill.level}</SkillLevel>
                    </SkillName>
                    <ProgressBarContainer theme={theme}>
                      <ProgressBar
                        theme={theme}
                        value={skill.percentage}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </ProgressBarContainer>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCard>
          ))}
        </SkillsGrid>
      </Section>
      
      <ExperienceContainer>
        <SectionTitle>Work Experience</SectionTitle>
        
        <Timeline theme={theme}>
          {experiences.map((experience, index) => (
            <TimelineItem
              key={index}
              theme={theme}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <TimelineHeader>
                <div>
                  <TimelineTitle>{experience.title}</TimelineTitle>
                  <TimelineCompany theme={theme}>{experience.company}</TimelineCompany>
                </div>
                <TimelinePeriod theme={theme}>{experience.period}</TimelinePeriod>
              </TimelineHeader>
              
              <TimelineContent theme={theme}>
                <TimelineDescription>{experience.description}</TimelineDescription>
                
                <AchievementsList>
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <AchievementItem key={achievementIndex}>
                      {achievement}
                    </AchievementItem>
                  ))}
                </AchievementsList>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </ExperienceContainer>
    </>
  );
};

export default SkillsPage;
