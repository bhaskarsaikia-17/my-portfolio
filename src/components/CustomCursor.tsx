import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

// Additional global style to ensure cursor is hidden and prevent tooltips
const CursorGlobalStyle = createGlobalStyle`
  * {
    cursor: none !important;
  }
  
  *:hover {
    cursor: none !important;
  }
  
  /* Hide all tooltips and title attributes */
  [title] {
    position: relative;
  }
  
  [title]:hover::before,
  [title]:hover::after {
    display: none !important;
  }
  
  /* Prevent default tooltips */
  [data-tooltip],
  [data-tooltip-content],
  [aria-label] {
    position: relative;
  }
  
  [data-tooltip]:hover::before,
  [data-tooltip]:hover::after,
  [data-tooltip-content]:hover::before,
  [data-tooltip-content]:hover::after,
  [aria-label]:hover::before,
  [aria-label]:hover::after {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
  
  /* Additional fix for button labels */
  button {
    -webkit-user-select: none !important;
    user-select: none !important;
    -webkit-appearance: none !important;
    appearance: none !important;
    -webkit-touch-callout: none !important;
    
    &::before,
    &::after {
      display: none !important;
      content: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
  }
  
  /* Disable browser tooltip behavior globally */
  [role="tooltip"],
  .tooltip,
  .tooltiptext,
  .tooltip-inner,
  .tooltip-content,
  [data-tooltip-container],
  [data-tooltip-root] {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
`;

// Types for our cursor states
interface CursorProps {
  cursorSize: number;
  isClicking: boolean;
  color?: string;
}

// Styled cursor components
const CursorOuter = styled(motion.div)<CursorProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: ${props => props.cursorSize}px;
  height: ${props => props.cursorSize}px;
  border: 1px solid ${props => props.color || `rgba(255, 255, 255, ${props.isClicking ? '0.9' : '0.5'})`};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
  transform-origin: center;
`;

const CursorInner = styled(motion.div)<{ isClicking: boolean; color?: string }>`
  position: fixed;
  left: 0;
  top: 0;
  width: ${props => props.isClicking ? '12px' : '8px'};
  height: ${props => props.isClicking ? '12px' : '8px'};
  background-color: ${props => props.color || 'white'};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
  transform-origin: center;
`;

// Click ripple effect
const ClickRipple = styled(motion.div)<{ color?: string }>`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${props => props.color || 'rgba(255, 255, 255, 0.7)'};
  pointer-events: none;
  z-index: 9998;
  will-change: transform, opacity;
`;

// Cursor text label component
const CursorLabel = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(16px, 16px);
  white-space: nowrap;
  will-change: transform, opacity;
`;

const CustomCursor: React.FC = () => {
  // Check if we're on a touch device immediately
  const isTouchDevice = useRef<boolean>(false);
  
  // Motion values for better performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // State for cursor size (expands on clickable elements)
  const [cursorSize, setCursorSize] = useState(32);
  // State for click animation
  const [isClicking, setIsClicking] = useState(false);
  // State for click ripples
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; color?: string }[]>([]);
  // Counter for ripple IDs
  const [rippleCounter, setRippleCounter] = useState(0);
  // State for cursor text
  const [cursorText, setCursorText] = useState<string | null>(null);
  // State for cursor color
  const [cursorColor, setCursorColor] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    // Check if we're on a device that supports hover
    isTouchDevice.current = !window.matchMedia('(hover: hover)').matches ||
                           navigator.maxTouchPoints > 0;
    
    if (isTouchDevice.current) return; // Exit if touch device

    // We'll use requestAnimationFrame for smoother performance
    let rafId: number | null = null;
    
    // Function to update mouse position
    const updateMousePosition = (e: MouseEvent) => {
      // Update motion values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Function to handle mouse enter on interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the element or its parent has data-cursor attribute
      if (target.closest('[data-cursor="pointer"]')) {
        setCursorSize(60);
      }
    };

    // Function to handle mouse leave from interactive elements
    const handleMouseLeave = () => {
      setCursorSize(32);
    };

    // Function to handle mouse down
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Add a new ripple
      const newRipple = {
        id: rippleCounter,
        x: e.clientX,
        y: e.clientY,
        color: cursorColor
      };
      setRipples(prev => [...prev, newRipple]);
      setRippleCounter(prev => prev + 1);
    };

    // Function to handle mouse up
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Function to check for cursor data attributes
    const checkCursorAttributes = () => {
      const cursorType = document.body.getAttribute('data-cursor-type');
      const cursorText = document.body.getAttribute('data-cursor-text');
      const cursorColor = document.body.getAttribute('data-cursor-color');
      
      if (cursorType) {
        // Adjust cursor size based on type
        switch (cursorType) {
          case 'button':
          case 'link':
            setCursorSize(60);
            break;
          case 'text':
            setCursorSize(24);
            break;
          case 'image':
          case 'video':
            setCursorSize(80);
            break;
          default:
            setCursorSize(32);
        }
      } else {
        setCursorSize(32);
      }
      
      setCursorText(cursorText);
      setCursorColor(cursorColor || undefined);
    };

    // Add event listeners with passive option for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });
    
    // Set up MutationObserver to watch for changes to body data attributes
    const observer = new MutationObserver(checkCursorAttributes);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['data-cursor-type', 'data-cursor-text', 'data-cursor-color'] 
    });

    // Initial check
    checkCursorAttributes();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      observer.disconnect();
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [rippleCounter, cursorColor, mouseX, mouseY]);

  // Function to remove ripple after animation completes
  const removeRipple = (id: number) => {
    setRipples(prev => prev.filter(ripple => ripple.id !== id));
  };

  // Don't render on touch devices
  if (isTouchDevice.current) {
    return null;
  }

  // Text label variants
  const labelVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <>
      <CursorGlobalStyle />
      <CursorOuter 
        cursorSize={cursorSize} 
        isClicking={isClicking}
        color={cursorColor}
        style={{ 
          x: mouseX, 
          y: mouseY,
          translateX: `-50%`,
          translateY: `-50%`
        }}
        animate={{
          scale: isClicking ? 0.9 : 1,
          width: cursorSize,
          height: cursorSize,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      />
      <CursorInner 
        isClicking={isClicking}
        color={cursorColor}
        style={{ 
          x: mouseX, 
          y: mouseY,
          translateX: `-50%`,
          translateY: `-50%`
        }}
        animate={{
          scale: isClicking ? 1.2 : 1,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      />
      <AnimatePresence>
        {ripples.map(ripple => (
          <ClickRipple
            key={ripple.id}
            color={ripple.color}
            initial={{ 
              width: 0, 
              height: 0, 
              opacity: 0.7,
              x: ripple.x,
              y: ripple.y 
            }}
            animate={{ 
              width: 100, 
              height: 100, 
              opacity: 0,
              x: ripple.x - 50,
              y: ripple.y - 50,
              transition: {
                duration: 0.6,
                ease: "easeOut"
              }
            }}
            onAnimationComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {cursorText && (
          <CursorLabel
            variants={labelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ 
              x: mouseX.get() + 16, 
              y: mouseY.get() + 16 
            }}
          >
            {cursorText}
          </CursorLabel>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor; 