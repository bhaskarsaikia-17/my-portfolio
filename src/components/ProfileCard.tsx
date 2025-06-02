import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ShinyText from './ShinyText';

const CardContainer = styled(motion.div)`
  background-color: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 380px;
  position: relative;
  color: white;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px 6px 0 0;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #FF5722 0%, #FF8A65 100%);
  border-radius: 6px;
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  background-color: #FF5722; /* Orange background as shown in the image */
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  aspect-ratio: 1/1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ProfileNameOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  z-index: 2;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const SocialIconsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 25px;
  backdrop-filter: blur(5px);
  
  @media (max-width: 768px) {
    bottom: 15px;
    gap: 8px;
    padding: 6px;
  }
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const ProfileName = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
  text-align: center;
`;

const ProfileDescription = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

interface ProfileCardProps {
  name: string;
  description: string;
  imageSrc: string | any; // Accept either string path or imported image
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, description, imageSrc }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error("Image failed to load:", imageSrc);
    setImageError(true);
  };

  // Card animation variants
  const cardVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" 
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(255, 87, 34, 0.2)" 
    },
    tap: { 
      scale: 0.98
    }
  };

  // Image container animation variants
  const imageContainerVariants = {
    initial: {
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      boxShadow: "0 8px 25px rgba(255, 87, 34, 0.3)"
    }
  };

  // Image animation variants
  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.5 } }
  };

  console.log("Image source:", imageSrc);

  return (
    <CardContainer
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    >
      <ProgressBarContainer>
        <ProgressBar
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
        />
      </ProgressBarContainer>
      
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={800}
        transitionSpeed={1500}
        scale={1.02}
        gyroscope={true}
      >
        <ProfileImageContainer
          variants={imageContainerVariants}
          initial="initial"
          whileHover="hover"
        >
          {imageSrc && !imageError ? (
            <ProfileImage 
              src={imageSrc} 
              alt={name} 
              onError={handleImageError}
              variants={imageVariants}
            />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#333',
              color: '#fff',
              fontSize: '1.5rem'
            }}>
              {name.charAt(0)}
            </div>
          )}
          <ProfileNameOverlay>{name}</ProfileNameOverlay>
          <SocialIconsContainer>
            <SocialIcon 
              href="https://github.com/bhaskarsaikia-17" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.579 9.5 21.278 9.5 21.017C9.5 20.783 9.493 20.024 9.489 19.208C6.728 19.859 6.139 17.896 6.139 17.896C5.685 16.751 5.029 16.453 5.029 16.453C4.121 15.838 5.098 15.85 5.098 15.85C6.101 15.922 6.629 16.871 6.629 16.871C7.521 18.465 8.97 17.944 9.52 17.692C9.608 17.057 9.859 16.635 10.136 16.419C7.931 16.201 5.62 15.341 5.62 11.525C5.62 10.387 6.01 9.458 6.649 8.731C6.546 8.481 6.203 7.466 6.747 6.105C6.747 6.105 7.587 5.839 9.478 7.12C10.293 6.901 11.152 6.792 12.002 6.788C12.852 6.792 13.71 6.901 14.526 7.12C16.414 5.839 17.254 6.105 17.254 6.105C17.798 7.466 17.455 8.481 17.352 8.731C17.992 9.458 18.38 10.387 18.38 11.525C18.38 15.35 16.066 16.197 13.856 16.412C14.203 16.679 14.516 17.209 14.516 18.018C14.516 19.187 14.506 20.694 14.506 21.017C14.506 21.28 14.666 21.584 15.173 21.487C19.137 20.161 22 16.417 22 12C22 6.477 17.523 2 12 2Z" fill="white"/>
              </svg>
            </SocialIcon>
            <SocialIcon 
              href="https://www.instagram.com/ecstacy_17/?__pwa=1" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="white"/>
                <path d="M17.5 1.5H6.5C3.73858 1.5 1.5 3.73858 1.5 6.5V17.5C1.5 20.2614 3.73858 22.5 6.5 22.5H17.5C20.2614 22.5 22.5 20.2614 22.5 17.5V6.5C22.5 3.73858 20.2614 1.5 17.5 1.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 9.37001V9.369" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SocialIcon>
            <SocialIcon 
              href="mailto:bhaskar.op@outlook.com" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z" fill="white"/>
              </svg>
            </SocialIcon>
          </SocialIconsContainer>
        </ProfileImageContainer>
      </Tilt>
      
      <ProfileName>
        <ShinyText text={name} speed={3} />
      </ProfileName>
      <ProfileDescription>{description}</ProfileDescription>
    </CardContainer>
  );
};

export default ProfileCard; 