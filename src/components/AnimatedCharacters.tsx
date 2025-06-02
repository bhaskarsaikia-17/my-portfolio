import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Type of animation
type AnimationType = 'fadeUp' | 'fadeIn' | 'waveScale' | 'typing' | 'spin' | 'bounce';

// Variants for container animation
const containerVariants = {
  initial: {
    opacity: 0
  },
  animate: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i }
  })
};

// Various character animation variants
const fadeUpVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.9,
    rotateX: -30
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100
    }
  }
};

const waveScaleVariants = {
  initial: {
    opacity: 0,
    scale: 0,
    y: 20
  },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
      delay: i * 0.04
    }
  })
};

const typingVariants = {
  initial: {
    opacity: 0,
    x: -10
  },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.1,
      delay: i * 0.07
    }
  })
};

const spinVariants = {
  initial: {
    opacity: 0,
    rotateY: 180,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

const bounceVariants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 1.2
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

interface AnimatedCharactersProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  type?: 'heading' | 'paragraph';
  animation?: AnimationType;
  color?: string;
  highlightColor?: string;
  highlightIndices?: number[];
  staggerDelay?: number;
  duration?: number;
  loop?: boolean;
}

const AnimatedCharacters: React.FC<AnimatedCharactersProps> = ({
  text,
  delay = 0,
  className = '',
  style = {},
  type = 'heading',
  animation = 'fadeUp',
  color,
  highlightColor = '#FF5722',
  highlightIndices = [],
  staggerDelay = 0.03,
  duration = 0.5,
  loop = false
}) => {
  const [replay, setReplay] = useState(false);
  
  // For looping animations
  useEffect(() => {
    if (loop) {
      const timer = setInterval(() => {
        setReplay(prev => !prev);
      }, 5000); // Loop every 5 seconds
      
      return () => clearInterval(timer);
    }
  }, [loop]);

  // Get appropriate animation variant
  const getVariant = () => {
    switch (animation) {
      case 'waveScale':
        return waveScaleVariants;
      case 'typing':
        return typingVariants;
      case 'spin':
        return spinVariants;
      case 'bounce':
        return bounceVariants;
      case 'fadeIn':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration } }
        };
      case 'fadeUp':
      default:
        return fadeUpVariants;
    }
  };
  
  // Get container variant with customized stagger
  const getContainerVariant = () => ({
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay, 
        delayChildren: delay 
      }
    }
  });

  // Split text into individual words
  const words = text.split(' ');

  return (
    <motion.div
      style={{
        display: 'inline-block',
        ...style
      }}
      className={className}
      initial="initial"
      animate={replay ? "initial" : "animate"}
      onAnimationComplete={() => {
        if (loop && !replay) {
          setTimeout(() => setReplay(true), 3000);
        } else if (loop && replay) {
          setTimeout(() => setReplay(false), 500);
        }
      }}
      variants={getContainerVariant()}
    >
      {words.map((word, wordIndex) => {
        // Split each word into characters
        const characters = word.split('');
        
        return (
          <React.Fragment key={`word-${wordIndex}`}>
            <span 
              style={{ 
                display: "inline-block", 
                overflow: "hidden",
                whiteSpace: "pre"
              }}
            >
              {characters.map((char, charIndex) => {
                // Calculate the absolute index for highlighting
                const absoluteIndex = wordIndex > 0 
                  ? words.slice(0, wordIndex).join(' ').length + wordIndex + charIndex 
                  : charIndex;
                
                // Determine if this character should be highlighted
                const isHighlighted = highlightIndices.includes(absoluteIndex);
                
                return (
                  <motion.span
                    key={`char-${charIndex}`}
                    custom={(wordIndex * 100) + charIndex}
                    style={{ 
                      display: "inline-block",
                      willChange: "transform",
                      color: isHighlighted ? highlightColor : color
                    }}
                    variants={getVariant()}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
            {/* Add space between words, except for the last word */}
            {wordIndex !== words.length - 1 && <span>&nbsp;</span>}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
};

export default AnimatedCharacters; 