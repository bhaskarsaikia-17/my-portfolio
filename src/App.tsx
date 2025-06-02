import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import AuroraBackground from './components/AuroraBackground';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Contact from './components/Contact';
import ScrollReveal from './components/ScrollReveal';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import MouseFollower from './components/MouseFollower';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    cursor: none !important; /* Hide default cursor on all elements */
  }
  
  body {
    background-color: #000000;
    color: #ffffff;
    overflow-x: hidden;
  }

  /* Make sure cursor stays hidden on all interactive elements */
  a, button, [role="button"], input, textarea, select, [data-cursor="pointer"] {
    cursor: none !important;
    /* Prevent button labels */
    -webkit-user-select: none !important;
    user-select: none !important;
    -webkit-appearance: none !important;
    appearance: none !important;
    -webkit-touch-callout: none !important;
    
    /* Prevent all tooltip attributes */
    title: none !important;
    aria-label: none !important;
    data-title: none !important;
    data-tooltip: none !important;
    
    &::before, &::after {
      content: none !important;
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
  }

  /* Ensure hover and active states don't show default cursor */
  *:hover, *:active, *:focus {
    cursor: none !important;
  }

  /* Disable all browser tooltips */
  [title]::before,
  [title]::after {
    content: none !important;
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
  
  /* Remove title attribute from all elements */
  [title] {
    position: relative;
    title: none !important;
    &::before, &::after {
      content: none !important;
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
  }

  /* Disable all ARIA tooltips */
  [aria-label]::before,
  [aria-label]::after {
    content: none !important;
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
  
  /* Remove aria-label from all elements */
  [aria-label] {
    aria-label: none !important;
  }
  
  /* Remove all tooltip-related attributes */
  [data-title], [data-tooltip], [aria-describedby] {
    &::before, &::after {
      content: none !important;
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
  }

  /* Disable HTML button tooltips */
  button::before,
  button::after,
  a::before,
  a::after {
    display: none !important;
    content: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }

  /* Avoid any native tooltips via CSS */
  ::before, ::after {
    content: normal !important;
  }

  /* Special style to hide React/UI library tooltips */
  [role="tooltip"],
  .tooltip,
  .tooltiptext,
  .tooltip-inner,
  .tooltip-content,
  [data-tooltip],
  [data-tooltip-content],
  .tippy-box,
  .tippy-content,
  .tippy-arrow,
  .MuiTooltip-popper,
  .MuiTooltip-tooltip {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  /* For improved animation performance */
  * {
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

function App() {
  // Set up Lenis smooth scrolling
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Remove tooltips on app load
  React.useEffect(() => {
    // Function to remove tooltip attributes from all elements
    const removeTooltips = () => {
      // Get all elements in the document
      const allElements = document.querySelectorAll('*');
      
      // Remove tooltip-related attributes from all elements
      allElements.forEach(element => {
        element.removeAttribute('title');
        element.removeAttribute('data-title');
        element.removeAttribute('data-tooltip');
        element.removeAttribute('aria-label');
        element.removeAttribute('aria-labelledby');
        element.removeAttribute('aria-describedby');
      });
      
      // Add global style to prevent tooltips
      const style = document.createElement('style');
      style.textContent = `
        button::before, button::after,
        [role="tooltip"],
        .tooltip,
        .tooltiptext,
        .tippy-box,
        .MuiTooltip-popper,
        [data-tooltip]::before,
        [data-tooltip]::after,
        [title]::before,
        [title]::after {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          content: none !important;
          pointer-events: none !important;
        }
      `;
      document.head.appendChild(style);
    };
    
    // Run on initial load
    removeTooltips();
    
    // Also run after a short delay to catch any dynamically added elements
    const timeoutId = setTimeout(removeTooltips, 1000);
    
    // Run periodically to catch any tooltips that might be added dynamically
    const intervalId = setInterval(removeTooltips, 3000);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <CustomCursor />
      <MouseFollower 
        color="#FF5722" 
        size={8} 
        smoothFactor={0.15} 
        mobileDisabled={true} 
      />
      <AuroraBackground />
      <ParticleBackground 
        particleCount={70}
        particleColors={['#FF5722', '#9C27B0', '#3F51B5', '#4CAF50']}
        particleSize={2.5}
        particleSpeed={0.08}
      />
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          {/* Uncomment this line to see the scroll fade animation demo */}
          {/* <HomePage /> */}
          <Hero />
          <ScrollReveal>
            <About />
          </ScrollReveal>
          <ScrollReveal 
            threshold={[0, 0.1, 0.9, 1]}
            yOffset={[70, 0, 0, 70]}
            delay={0.1}
          >
            <Projects />
          </ScrollReveal>
          <ScrollReveal
            threshold={[0, 0.1, 0.9, 1]}
            yOffset={[70, 0, 0, 70]}
            delay={0.2}
          >
            <Contact />
          </ScrollReveal>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
