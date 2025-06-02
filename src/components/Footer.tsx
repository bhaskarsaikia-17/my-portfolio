import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem;
  background-color: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Copyright = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  text-align: center;
`;

const FooterDivider = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialIconsContainer>
        <SocialIcon 
          href="https://github.com/bhaskarsaikia-17" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.579 9.5 21.278 9.5 21.017C9.5 20.783 9.493 20.024 9.489 19.208C6.728 19.859 6.139 17.896 6.139 17.896C5.685 16.751 5.029 16.453 5.029 16.453C4.121 15.838 5.098 15.85 5.098 15.85C6.101 15.922 6.629 16.871 6.629 16.871C7.521 18.465 8.97 17.944 9.52 17.692C9.608 17.057 9.859 16.635 10.136 16.419C7.931 16.201 5.62 15.341 5.62 11.525C5.62 10.387 6.01 9.458 6.649 8.731C6.546 8.481 6.203 7.466 6.747 6.105C6.747 6.105 7.587 5.839 9.478 7.12C10.293 6.901 11.152 6.792 12.002 6.788C12.852 6.792 13.71 6.901 14.526 7.12C16.414 5.839 17.254 6.105 17.254 6.105C17.798 7.466 17.455 8.481 17.352 8.731C17.992 9.458 18.38 10.387 18.38 11.525C18.38 15.35 16.066 16.197 13.856 16.412C14.203 16.679 14.516 17.209 14.516 18.018C14.516 19.187 14.506 20.694 14.506 21.017C14.506 21.28 14.666 21.584 15.173 21.487C19.137 20.161 22 16.417 22 12C22 6.477 17.523 2 12 2Z" fill="white"/>
          </svg>
        </SocialIcon>
        <SocialIcon 
          href="https://www.instagram.com/ecstacy_17/" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z" fill="white"/>
          </svg>
        </SocialIcon>
        <SocialIcon 
          href="mailto:hello@bhaskarop.xyz" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z" fill="white"/>
          </svg>
        </SocialIcon>
      </SocialIconsContainer>
      
      <FooterDivider />
      
      <Copyright>
        Bhaskar Saikia © 2025
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 