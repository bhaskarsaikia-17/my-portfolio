import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BadgeContainer = styled(motion.a)`
  position: fixed;
  bottom: 20px;
  right: 160px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: white;
  z-index: 10;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ReactBitsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="white"/>
  </svg>
);

const ReactBitsBadge: React.FC = () => {
  return (
    <BadgeContainer 
      href="https://www.reactbits.dev"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ReactBitsIcon />
      Made with ReactBits
    </BadgeContainer>
  );
};

export default ReactBitsBadge; 