import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 4rem 2rem;
  position: relative;
  
  @media (max-width: 992px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
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

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactForm = styled.div`
  flex: 1;
  background-color: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #aaaaaa;
  max-width: 500px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(255, 87, 34, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactText = styled.p`
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #FF5722;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  width: 100%;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #FF5722;
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: #FF5722;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  
  /* Prevent tooltips */
  &::before, &::after {
    content: none !important;
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
  
  -webkit-user-select: none !important;
  user-select: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  -webkit-touch-callout: none !important;
  
  &:hover {
    background-color: #FF7043;
  }
`;

const Contact: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // Add effect to remove tooltips on mount
  useEffect(() => {
    // Remove tooltips from all buttons in the contact section
    const buttons = document.querySelectorAll('#contact button');
    buttons.forEach(button => {
      button.removeAttribute('title');
      button.removeAttribute('data-title');
      button.removeAttribute('data-tooltip');
      button.removeAttribute('aria-label');
    });
  }, []);
  
  return (
    <ContactContainer id="contact">
      <ContentContainer>
        <ContactInfo as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>Contact Me</Title>
          <Description variants={itemVariants}>
            Feel free to reach out. I'm always open to discussing new projects, 
            creative ideas or opportunities to be part of your vision.
          </Description>
          
          <motion.div variants={itemVariants}>
            <ContactItem>
              <IconWrapper>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z" fill="#FF5722"/>
                </svg>
              </IconWrapper>
              <ContactText>hello@bhaskarop.xyz</ContactText>
            </ContactItem>
            
            <ContactItem>
              <IconWrapper>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4C14.9 4.18 14.77 4.44 14.68 4.65C13.09 4.41 11.51 4.41 9.95 4.65C9.85 4.44 9.72 4.18 9.62 4C8.12 4.26 6.67 4.71 5.34 5.33C3.56 8.13 3.03 10.84 3.3 13.51C5.08 14.8 6.8 15.59 8.5 16.08C8.86 15.55 9.17 14.99 9.43 14.39C8.91 14.21 8.41 13.99 7.94 13.73C8.04 13.66 8.13 13.58 8.22 13.51C12.24 15.33 16.61 15.33 20.58 13.51C20.68 13.58 20.77 13.66 20.86 13.73C20.39 13.99 19.89 14.21 19.37 14.39C19.63 14.99 19.94 15.55 20.3 16.08C22 15.59 23.73 14.8 25.5 13.51C25.82 10.38 24.97 7.7 23.32 5.33H19.27ZM9.12 12.1C8.12 12.1 7.29 11.16 7.29 10.02C7.29 8.88 8.1 7.94 9.12 7.94C10.14 7.94 10.96 8.88 10.95 10.02C10.95 11.16 10.13 12.1 9.12 12.1ZM15.71 12.1C14.71 12.1 13.88 11.16 13.88 10.02C13.88 8.88 14.69 7.94 15.71 7.94C16.73 7.94 17.55 8.88 17.54 10.02C17.54 11.16 16.72 12.1 15.71 12.1Z" fill="#FF5722"/>
                </svg>
              </IconWrapper>
              <ContactText>@bhaskar_dev</ContactText>
            </ContactItem>
            
            <ContactItem>
              <IconWrapper>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.579 9.5 21.278 9.5 21.017C9.5 20.783 9.493 20.024 9.489 19.208C6.728 19.859 6.139 17.896 6.139 17.896C5.685 16.751 5.029 16.453 5.029 16.453C4.121 15.838 5.098 15.85 5.098 15.85C6.101 15.922 6.629 16.871 6.629 16.871C7.521 18.465 8.97 17.944 9.52 17.692C9.608 17.057 9.859 16.635 10.136 16.419C7.931 16.201 5.62 15.341 5.62 11.525C5.62 10.387 6.01 9.458 6.649 8.731C6.546 8.481 6.203 7.466 6.747 6.105C6.747 6.105 7.587 5.839 9.478 7.12C10.293 6.901 11.152 6.792 12.002 6.788C12.852 6.792 13.71 6.901 14.526 7.12C16.414 5.839 17.254 6.105 17.254 6.105C17.798 7.466 17.455 8.481 17.352 8.731C17.992 9.458 18.38 10.387 18.38 11.525C18.38 15.35 16.066 16.197 13.856 16.412C14.203 16.679 14.516 17.209 14.516 18.018C14.516 19.187 14.506 20.694 14.506 21.017C14.506 21.28 14.666 21.584 15.173 21.487C19.137 20.161 22 16.417 22 12C22 6.477 17.523 2 12 2Z" fill="#FF5722"/>
                </svg>
              </IconWrapper>
              <ContactText>bhaskarsaikia-17</ContactText>
            </ContactItem>
          </motion.div>
        </ContactInfo>
        
        <ContactForm as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Form>
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" type="email" />
            <Input placeholder="Subject" />
            <TextArea placeholder="Your Message" />
            <Button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
            >
              Send Message
            </Button>
          </Form>
        </ContactForm>
      </ContentContainer>
    </ContactContainer>
  );
};

export default Contact; 