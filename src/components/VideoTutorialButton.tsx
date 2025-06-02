import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonContainer = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #FF5722;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(255, 87, 34, 0.4);
`;

const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5 6.75V17.25C22.5 17.6478 22.342 18.0294 22.0607 18.3107C21.7794 18.592 21.3978 18.75 21 18.75H3C2.60218 18.75 2.22064 18.592 1.93934 18.3107C1.65804 18.0294 1.5 17.6478 1.5 17.25V6.75C1.5 6.35218 1.65804 5.97064 1.93934 5.68934C2.22064 5.40804 2.60218 5.25 3 5.25H21C21.3978 5.25 21.7794 5.40804 22.0607 5.68934C22.342 5.97064 22.5 6.35218 22.5 6.75Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.75 15L15.75 12L9.75 9V15Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VideoTutorialButton: React.FC = () => {
  return (
    <ButtonContainer
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <VideoIcon />
      Video Tutorial
    </ButtonContainer>
  );
};

export default VideoTutorialButton; 