import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const ProjectsContainer = styled.div`
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
  max-width: 1200px;
  width: 100%;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 2rem;
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
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: rgba(30, 30, 30, 0.6);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(255, 87, 34, 0.2);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8) 100%);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  text-align: left;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: rgba(255, 87, 34, 0.15);
  color: #FF5722;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${props => props.primary ? '#FF5722' : 'rgba(50, 50, 50, 0.8)'};
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#FF7043' : 'rgba(70, 70, 70, 0.8)'};
  }
`;

const Projects: React.FC = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
  
  // Get scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const projects = [
    {
      id: 1,
      title: "ASCII Art Generator",
      description: "A web application that converts text into ASCII art with multiple style options including standard ASCII text art and Cowsay format. Users can select different fonts and customize their ASCII art experience.",
      image: "https://placehold.co/600x400/1a1a1a/FF5722?text=ASCII+Art+Generator&font=montserrat",
      tags: ["React", "TypeScript", "CSS", "Web API", "ASCII Art"],
      liveUrl: "https://ascii.bhaskarop.xyz/",
      codeUrl: "https://github.com/bhaskarsaikia/ascii-art-generator"
    },
    {
      id: 2,
      title: "Paster",
      description: "A modern pastebin alternative that allows users to quickly share code snippets, text, and markdown content. Features include syntax highlighting, expiration options, and easy sharing capabilities.",
      image: "https://placehold.co/600x400/1a1a1a/FF5722?text=Paster&font=montserrat",
      tags: ["React", "Node.js", "Express", "MongoDB", "Syntax Highlighting"],
      liveUrl: "https://paster.bhaskarop.xyz/",
      codeUrl: "https://github.com/bhaskarsaikia/paster"
    }
  ];

  return (
    <ProjectsContainer ref={containerRef} id="projects">
      <motion.div
        style={{ opacity, scale }}
      >
        <ContentContainer>
          <SectionTitle
            ref={headingRef}
            variants={titleVariants}
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
          >
            Projects
          </SectionTitle>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
          >
            <ProjectsGrid>
              {projects.map((project) => (
                <ProjectCard key={project.id} variants={itemVariants}>
                  <ProjectImage style={{ backgroundImage: `url(${project.image})` }} />
                  <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <TagsContainer>
                      {project.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </TagsContainer>
                    <ButtonContainer>
                      <Button href={project.liveUrl} target="_blank" rel="noopener noreferrer" primary={true}>
                        Live Demo
                      </Button>
                      <Button href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        Source Code
                      </Button>
                    </ButtonContainer>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </motion.div>
        </ContentContainer>
      </motion.div>
    </ProjectsContainer>
  );
};

export default Projects; 