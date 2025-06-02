import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import profileImage from '../assets/images/bhaskar.jpg';
import AnimatedText from './AnimatedText';
import AnimatedCharacters from './AnimatedCharacters';

const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  
  @media (max-width: 992px) {
    padding-top: 6rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  gap: 4rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 16px;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 35px rgba(255, 87, 34, 0.3);
  }
  
  @media (max-width: 992px) {
    max-width: 300px;
  }
`;

const TextContainer = styled(motion.div)`
  flex: 1.5;
  display: flex;
  flex-direction: column;
`;

const SkillsContainer = styled(motion.div)`
  margin-top: 2rem;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

// Enhanced image container with decorative elements
const EnhancedImageContainer = styled(motion.div)`
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 12px;
    background-color: rgba(255, 87, 34, 0.1);
    z-index: -1;
    transition: all 0.5s ease;
  }
  
  &::before {
    top: -15px;
    left: -15px;
    width: 80%;
    height: 80%;
    transform: translateZ(-50px);
  }
  
  &::after {
    bottom: -15px;
    right: -15px;
    width: 60%;
    height: 60%;
    transform: translateZ(-100px);
  }
  
  &:hover::before {
    transform: translate(-5px, -5px);
    background-color: rgba(255, 87, 34, 0.15);
  }
  
  &:hover::after {
    transform: translate(5px, 5px);
    background-color: rgba(255, 87, 34, 0.15);
  }
`;

// Animated skill progress bar
const SkillProgressBar = styled(motion.div)`
  height: 5px;
  width: 0;
  background: linear-gradient(90deg, #FF5722, #FF9800);
  border-radius: 3px;
  margin-top: 4px;
`;

// Skill level indicator
const SkillLevel = styled(motion.span)`
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 5px;
  display: block;
  text-align: right;
`;

// Enhanced skill item
const EnhancedSkillItem = styled(motion.div)`
  background-color: rgba(255, 87, 34, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #FF5722;
    opacity: 0.6;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 87, 34, 0.3);
    background-color: rgba(255, 87, 34, 0.15);
  }
`;

// Section title with animated underline
const SectionTitle = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #FF5722, #FF9800);
  }
`;

const About: React.FC = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true, amount: 0.3 });
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  // Enhanced image animation variants
  const enhancedImageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      rotateY: -15 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Animated underline variants
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "80px",
      transition: { delay: 0.5, duration: 0.8, ease: "easeOut" }
    }
  };

  // Enhanced staggered animation for skills
  const enhancedSkillsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  // Skill progress bar variants
  const progressVariants = {
    hidden: { width: 0 },
    visible: (percent: number) => ({ 
      width: `${percent}%`,
      transition: { 
        delay: 0.5, 
        duration: 1, 
        ease: "easeOut" 
      }
    })
  };

  // Skill data with proficiency levels
  const skillsData = [
    { name: "Python", level: 85 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "HTML/CSS", level: 95 },
    { name: "Git", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "SQL", level: 70 },
    { name: "MongoDB", level: 65 }
  ];

  // About me text paragraphs
  const aboutMeText = [
    "I'm Bhaskar Saikia, a student from Assam, India with a passion for coding and software development. I enjoy creating websites and applications that solve real problems.",
    "My journey in programming began with learning Python, and I've since expanded my skills to include JavaScript, HTML, CSS, and frameworks like React. I'm particularly interested in web development and creating elegant user interfaces.",
    "When I'm not coding, I enjoy exploring new technologies and challenging myself with creative projects. I believe in continuous learning and pushing the boundaries of what I can create."
  ];

  return (
    <AboutContainer id="about">
      <ContentContainer>
        <EnhancedImageContainer>
          <ImageContainer
            ref={imageRef}
            variants={enhancedImageVariants}
            initial="hidden"
            animate={isImageInView ? "visible" : "hidden"}
          >
            <StyledImage 
              src={profileImage} 
              alt="Bhaskar Saikia" 
              variants={imageVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 87, 34, 0.3)",
                transition: { duration: 0.3 }
              }}
            />
          </ImageContainer>
        </EnhancedImageContainer>
        
        <TextContainer
          ref={textRef}
          variants={containerVariants}
          initial="hidden"
          animate={isTextInView ? "visible" : "hidden"}
        >
          <SectionTitle>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedCharacters 
                text="About Me" 
                delay={0.3}
                style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}
              />
            </motion.div>
            <motion.div
              variants={underlineVariants}
              initial="hidden"
              animate={isTextInView ? "visible" : "hidden"}
              style={{ position: 'absolute', left: 0, bottom: -10, height: '3px' }}
            />
          </SectionTitle>
          
          {aboutMeText.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
            >
              <AnimatedText 
                key={index} 
                text={text} 
                elementType="p" 
                className="paragraph"
                delay={index + 2}
              />
            </motion.div>
          ))}
          
          <SkillsContainer 
            ref={skillsRef}
            variants={enhancedSkillsVariants}
            initial="hidden"
            animate={isSkillsInView ? "visible" : "hidden"}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedCharacters 
                text="Skills" 
                delay={0.3}
                style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}
              />
            </motion.div>
            
            <SkillsGrid>
              {skillsData.map((skill, index) => (
                <EnhancedSkillItem 
                  key={index}
                  variants={skillItemVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 10 
                    }
                  }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <motion.span style={{ color: '#FF5722', fontWeight: 500 }}>
                      {skill.name}
                    </motion.span>
                  </motion.div>
                  
                  <SkillProgressBar 
                    variants={progressVariants}
                    custom={skill.level}
                    initial="hidden"
                    animate={isSkillsInView ? "visible" : "hidden"}
                  />
                  
                  <SkillLevel
                    initial={{ opacity: 0 }}
                    animate={isSkillsInView ? 
                      { opacity: 1, transition: { delay: 1.2 + (index * 0.1) } } : 
                      { opacity: 0 }
                    }
                  >
                    {skill.level}%
                  </SkillLevel>
                </EnhancedSkillItem>
              ))}
            </SkillsGrid>
          </SkillsContainer>
        </TextContainer>
      </ContentContainer>
    </AboutContainer>
  );
};

export default About; 