import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: rgba(255, 87, 34, 0.85);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(255, 87, 34, 0.3);
    z-index: -1;
    transform: scale(0);
  }
`;

const ArrowIcon = styled(motion.svg)`
  width: 1.5rem;
  height: 1.5rem;
  fill: none;
  stroke: white;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
`;

// For staggered arrow icon animation
const IconWrapper = styled(motion.div)`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Ripple effect
const Ripple = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: -1;
`;

// Glow effect
const Glow = styled(motion.div)`
  position: absolute;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
  opacity: 0;
  z-index: -1;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  pointer-events: none;
`;

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  
  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Animation variants
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
      backgroundColor: "rgba(255, 87, 34, 0.95)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };
  
  const wrapperVariants = {
    initial: { y: 0 },
    hover: { 
      y: [-2, -4, -2],
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };
  
  const arrowVariants = {
    initial: { pathLength: 1, opacity: 1 },
    hover: { 
      opacity: [1, 0.8, 1],
      pathLength: [1, 0.9, 1],
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  const pulseAnimation = {
    animate: {
      scale: [1, 1.25, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const rippleVariants = {
    hidden: { 
      scale: 0,
      opacity: 0.8
    },
    visible: { 
      scale: 1.5,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.7,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          data-cursor="button"
          aria-label="Scroll to top"
        >
          <IconWrapper
            variants={wrapperVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            <ArrowIcon
              viewBox="0 0 24 24"
              variants={arrowVariants}
            >
              <motion.path 
                d="M12 19V5M5 12L12 5L19 12" 
                variants={arrowVariants}
              />
            </ArrowIcon>
          </IconWrapper>
          
          <AnimatePresence>
            {showRipple && (
              <Ripple 
                variants={rippleVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
            )}
          </AnimatePresence>

          <Glow 
            variants={glowVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
          />
          
          <motion.div
            className="pulse"
            variants={pulseAnimation}
            animate="animate"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 87, 34, 0.3)',
              zIndex: -1
            }}
          />
        </ScrollButton>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 