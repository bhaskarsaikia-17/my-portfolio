import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';
import RotatingText from './RotatingText';
import profileImage from '../assets/images/bhaskar.jpg';
import useCursorInteraction from '../hooks/useCursorInteraction';
import AnimatedCharacters from './AnimatedCharacters';

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    padding-top: 6rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const TitleContainer = styled.div`
  flex-grow: 1;
`;

const Title = styled(motion.h1)`
  font-size: 6rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 1200px) {
    font-size: 5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const SubTitle = styled(motion.h2)`
  font-size: 6rem;
  font-weight: 700;
  color: #333333;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 1200px) {
    font-size: 5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #aaaaaa;
  max-width: 600px;
  margin: 2rem 0;
  line-height: 1.6;
`;

const InfoTagsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const InfoTag = styled(motion.span)`
  background-color: rgba(255, 87, 34, 0.15);
  color: #FF5722;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Button = styled(motion.button)<{ primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${props => props.primary ? '#FF5722' : 'rgba(30, 30, 30, 0.8)'};
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  -webkit-user-select: none;
  user-select: none;
  -webkit-appearance: none;
  appearance: none;
  -webkit-touch-callout: none;
  
  /* Prevent button labels from showing */
  &::before,
  &::after {
    display: none !important;
    content: none !important;
  }
  
  &:hover {
    background-color: ${props => props.primary ? '#FF7043' : 'rgba(50, 50, 50, 0.8)'};
  }
`;

const ButtonNoTooltip = styled(Button)`
  /* Additional styles to prevent tooltips */
  &::before, &::after {
    content: none !important;
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
  
  /* Prevent all possible tooltip mechanisms */
  &[title],
  &[data-title],
  &[data-tooltip],
  &[aria-label] {
    &::before, &::after {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      content: none !important;
    }
  }
  
  position: relative;
  z-index: 1;
  
  /* Remove tooltip attributes on mount */
  &[title] {
    title: none !important;
  }
`;

// Enhance ProfileCard container with hover effects
const ProfileCardContainer = styled(motion.div)`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border: 2px solid rgba(255, 87, 34, 0.3);
    border-radius: 20px;
    opacity: 0;
    transform: scale(1.1);
    transition: all 0.3s ease;
    z-index: -1;
  }
  
  &:hover::after {
    opacity: 1;
    transform: scale(1);
  }
`;

// Animated underline for titles
const AnimatedTitleUnderline = styled(motion.div)`
  display: none; /* Hide the underline */
  height: 3px;
  background: linear-gradient(90deg, #FF5722, #FF9800);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  width: 0;
`;

const Hero: React.FC = () => {
  const profileData = {
    name: "Bhaskar Saikia",
    description: "A passionate coder and student from Assam, India who transforms ideas into elegant and functional solutions.",
    imageSrc: profileImage // Use the imported image
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.6, -0.05, 0.01, 0.99],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom cursor interactions
  const contactButtonCursor = useCursorInteraction({ 
    type: 'button',
    text: '',  // Remove the text to prevent tooltip
    color: '#FF5722',
    hideTooltip: true
  });
  
  const aboutButtonCursor = useCursorInteraction({ 
    type: 'button', 
    text: '',  // Remove the text to prevent tooltip
    hideTooltip: true
  });
  
  const profileCardCursor = useCursorInteraction({
    type: 'image',
    hideTooltip: true
  });

  // Enhanced animation variants
  const imageContainerVariants = {
    initial: { 
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" 
    },
    hover: { 
      y: -10,
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };
  
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100px",
      transition: { 
        delay: 1,
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  // Enhanced staggered animations
  const enhancedContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Add effect to remove tooltips on mount
  useEffect(() => {
    // Remove tooltips from all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.removeAttribute('title');
      button.removeAttribute('data-title');
      button.removeAttribute('data-tooltip');
      button.removeAttribute('aria-label');
      button.removeAttribute('aria-labelledby');
      button.removeAttribute('aria-describedby');
    });

    // Add global style to prevent tooltips
    const style = document.createElement('style');
    style.textContent = `
      button::before, button::after,
      [role="tooltip"],
      .tooltip,
      .tooltiptext {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        content: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up the style when component unmounts
      document.head.removeChild(style);
    };
  }, []);

  return (
    <HeroContainer>
      <ContentContainer>
        <ProfileCardContainer 
          variants={imageContainerVariants}
          initial="initial"
          whileHover="hover"
          {...profileCardCursor}
        >
          <ProfileCard {...profileData} />
        </ProfileCardContainer>
        
        <TitleContainer as={motion.div} 
          variants={enhancedContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title>
            <AnimatedCharacters text="Hi, I'm" delay={0.2} />
          </Title>
          
          <AnimatedTitleUnderline 
            variants={underlineVariants}
            initial="hidden"
            animate="visible"
          />
          
          <SubTitle>
            <AnimatedCharacters text="Bhaskar Saikia" delay={0.5} />
          </SubTitle>
          
          <motion.div 
            variants={itemVariants}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              transition: { delay: 0.9, duration: 0.5 } 
            }}
          >
            <RotatingText 
              texts={["Creative Builder", "Creative Thinker"]}
              rotationInterval={3000}
              staggerDuration={0.05}
              splitBy="characters"
            />
          </motion.div>
          
          <Description 
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              transition: { delay: 1.1, duration: 0.6 } 
            }}
          >
            {profileData.description}
          </Description>
          
          <InfoTagsContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"].map((tag, index) => (
              <InfoTag 
                key={index}
                variants={tagVariants}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { delay: 1.3 + (index * 0.1), duration: 0.5 } 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 87, 34, 0.25)",
                  y: -5,
                  transition: { duration: 0.2 } 
                }}
              >
                {tag}
              </InfoTag>
            ))}
          </InfoTagsContainer>
          
          <ButtonRow>
            <ButtonNoTooltip
              primary
              as={motion.button}
              variants={buttonVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                transition: { delay: 1.7, duration: 0.5 } 
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 15px rgba(255, 87, 34, 0.3)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0px 3px 8px rgba(255, 87, 34, 0.2)"
              }}
              onClick={() => scrollToSection('contact')}
              {...contactButtonCursor}
            >
              Contact Me
            </ButtonNoTooltip>
            
            <ButtonNoTooltip
              as={motion.button}
              variants={buttonVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                transition: { delay: 1.8, duration: 0.5 } 
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)"
              }}
              onClick={() => scrollToSection('about')}
              {...aboutButtonCursor}
            >
              Learn More
            </ButtonNoTooltip>
          </ButtonRow>
        </TitleContainer>
      </ContentContainer>
    </HeroContainer>
  );
};

export default Hero; 