import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: [number, number, number, number]; // [start fade in, fully visible, start fade out, fully hidden]
  yOffset?: [number, number, number, number]; // Y-offset values matching the threshold points
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

// Preset animation variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export const staggerChildren: Variants = {
  visible: { transition: { staggerChildren: 0.2 } }
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = [0, 0.2, 0.8, 1],
  yOffset = [50, 0, 0, 50],
  delay = 0,
  duration = 0.5,
  once = false,
  className = '',
}) => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, threshold, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, threshold, yOffset);
  
  return (
    <motion.div 
      className={className}
      style={{ 
        opacity,
        y,
        willChange: "opacity, transform"
      }}
      transition={{
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal; 