import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface MouseFollowerProps {
  color?: string;
  size?: number;
  smoothFactor?: number;
  mobileDisabled?: boolean;
}

// Container for the mouse follower element
const FollowerContainer = styled(motion.div)<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  mix-blend-mode: difference;
  will-change: transform;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

// The actual visible follower element
const Follower = styled(motion.div)<{ size: number; color: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  will-change: width, height, transform, opacity;
`;

const MouseFollower: React.FC<MouseFollowerProps> = ({
  color = '#FF5722',
  size = 12,
  smoothFactor = 0.15,
  mobileDisabled = true
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [target, setTarget] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSize, setCurrentSize] = useState(size);
  const [shouldRender, setShouldRender] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const followerRef = useRef<HTMLDivElement>(null);
  
  // Idle timer reference
  const idleTimer = useRef<number | null>(null);
  // Last position for idle detection
  const lastPosition = useRef({ x: 0, y: 0 });
  
  // Throttle mouse move updates for better performance
  const lastUpdate = useRef(0);
  const throttleTime = 10; // in ms

  // Memoized function for performance - move before the mobile check
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = performance.now();
    
    if (now - lastUpdate.current < throttleTime) return;
    lastUpdate.current = now;
    
    // Using lerp (linear interpolation) for smooth following
    const { clientX, clientY } = e;
    
    setPosition(prev => ({
      x: prev.x + (clientX - prev.x) * smoothFactor,
      y: prev.y + (clientY - prev.y) * smoothFactor
    }));
    
    // Show cursor when mouse moves
    setIsVisible(true);
    
    // Reset idle timer
    if (idleTimer.current !== null) {
      window.clearTimeout(idleTimer.current);
    }
    
    // Set new idle timer
    idleTimer.current = window.setTimeout(() => {
      // Only hide if mouse hasn't moved
      if (lastPosition.current.x === clientX && 
          lastPosition.current.y === clientY) {
        setIsVisible(false);
      }
    }, 3000); // Hide after 3 seconds of inactivity
    
    // Update last position
    lastPosition.current = { x: clientX, y: clientY };
  }, [smoothFactor]);

  // Optimized memoized handlers - move before the mobile check
  const handleMouseEnter = useCallback((e: Event) => {
    const element = e.target as HTMLElement;
    
    // Check if element or its parent is interactive
    const isButton = element.tagName === 'BUTTON' || 
                    element.closest('button') ||
                    element.getAttribute('role') === 'button' ||
                    element.closest('[role="button"]');
                    
    const isLink = element.tagName === 'A' || element.closest('a');
    const isInput = element.tagName === 'INPUT' || 
                    element.tagName === 'TEXTAREA' || 
                    element.tagName === 'SELECT';
    
    if (isButton) {
      setIsHovering(true);
      setTarget('button');
    } else if (isLink) {
      setIsHovering(true);
      setTarget('link');
    } else if (isInput) {
      setIsHovering(true);
      setTarget('input');
    } else {
      setIsHovering(false);
      setTarget(null);
    }
    
    // Always show cursor when hovering over interactive elements
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTarget(null);
  }, []);

  // Check for mobile device - must be called unconditionally
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
                ('ontouchstart' in window) || 
                (navigator.maxTouchPoints > 0);
      
      setIsMobile(isMobileDevice);
      setShouldRender(!(mobileDisabled && isMobileDevice));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileDisabled]);

  // Track mouse position - must be called unconditionally
  useEffect(() => {
    if (!shouldRender) return;
    
    window.addEventListener('mousemove', updateMousePosition);
    
    // Show cursor when window gets focus
    window.addEventListener('focus', () => setIsVisible(true));
    
    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', () => setIsVisible(true));
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('focus', () => setIsVisible(true));
      document.removeEventListener('mouseenter', () => setIsVisible(true));
      
      // Clear idle timer
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
      }
    };
  }, [updateMousePosition, shouldRender]);

  // Track mouse clicks - must be called unconditionally
  useEffect(() => {
    if (!shouldRender) return;
    
    const handleMouseDown = () => {
      setIsClicking(true);
      setIsVisible(true); // Ensure cursor is visible when clicking
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [shouldRender]);

  // Update size based on state - must be called unconditionally
  useEffect(() => {
    if (!shouldRender) return;
    
    if (isClicking) {
      setCurrentSize(size * 0.8);
    } else if (isHovering) {
      if (target === 'button') setCurrentSize(40);
      else if (target === 'link') setCurrentSize(30);
      else if (target === 'input') setCurrentSize(16);
      else setCurrentSize(24);
    } else {
      setCurrentSize(size);
    }
  }, [isClicking, isHovering, target, size, shouldRender]);

  // Track interactive elements - must be called unconditionally
  useEffect(() => {
    if (!shouldRender) return;
    
    // Use event delegation for better performance
    const handleDocumentMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.tagName === 'SELECT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.closest('[role="button"]')) {
        handleMouseEnter(e);
      } else {
        handleMouseLeave();
      }
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
    };
  }, [handleMouseEnter, handleMouseLeave, shouldRender]);

  // Use RAF for smoother animation - must be called unconditionally
  useEffect(() => {
    if (!shouldRender) return;
    
    let animationFrameId: number;
    
    // Recursive animation function
    const animateFollower = () => {
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${position.x - (isHovering ? 20 : size/2)}px, ${position.y - (isHovering ? 20 : size/2)}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animateFollower);
    };
    
    animationFrameId = requestAnimationFrame(animateFollower);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position, isHovering, size, shouldRender]);

  // Get opacity based on state
  const getOpacity = () => {
    if (isClicking) return 0.9;
    if (isHovering) return 0.7;
    return 0.5;
  };

  // Only return the component if it should render
  if (!shouldRender) return null;

  return (
    <FollowerContainer ref={followerRef} isVisible={isVisible}>
      <Follower
        size={size}
        color={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isClicking ? 0.8 : 1, 
          opacity: getOpacity(),
          width: currentSize,
          height: currentSize
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          damping: 20
        }}
      />
    </FollowerContainer>
  );
};

export default MouseFollower; 