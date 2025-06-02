import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface AnimatedTextProps {
  text: string;
  elementType?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
}

const Container = styled.div`
  width: 100%;
  margin-bottom: ${props => props.className?.includes('paragraph') ? '1.5rem' : '2rem'};

  h2 {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background-color: #FF5722;
      border-radius: 2px;
    }
  }

  p {
    font-size: 1.1rem;
    color: #aaaaaa;
    line-height: 1.8;
  }
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  elementType = 'h1', 
  className = '',
  delay = 0
}) => {
  // Split text into words
  const words = text.split(' ');
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: delay * 0.1
      }
    })
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Dynamically create the element based on elementType
  const renderElement = () => {
    const AnimatedWords = (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'inline-block' }}
      >
        {words.map((word, index) => (
          <Word
            key={index}
            variants={child}
          >
            {word}
          </Word>
        ))}
      </motion.div>
    );

    switch (elementType) {
      case 'h1':
        return <h1>{AnimatedWords}</h1>;
      case 'h2':
        return <h2>{AnimatedWords}</h2>;
      case 'h3':
        return <h3>{AnimatedWords}</h3>;
      case 'p':
        return <p>{AnimatedWords}</p>;
      default:
        return <div>{AnimatedWords}</div>;
    }
  };

  return (
    <Container className={className}>
      {renderElement()}
    </Container>
  );
};

export default AnimatedText; 