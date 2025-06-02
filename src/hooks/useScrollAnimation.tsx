import { useEffect, useState } from 'react';

interface ScrollAnimationProps {
  threshold?: number;
  once?: boolean;
}

const useScrollAnimation = ({ 
  threshold = 0.3, 
  once = true 
}: ScrollAnimationProps = {}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const checkIfInView = () => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const elementVisible = rect.top <= viewHeight * (1 - threshold);
        
        if (elementVisible) {
          setIsInView(true);
          if (once) setHasAnimated(true);
        } else if (!once) {
          setIsInView(false);
        }
      }
    };

    // Initial check
    checkIfInView();

    // Add scroll listener
    window.addEventListener('scroll', checkIfInView);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkIfInView);
    };
  }, [ref, threshold, once, hasAnimated]);

  // Only update isInView if not set to animate once or hasn't animated yet
  const shouldAnimate = once ? !hasAnimated || isInView : isInView;

  return { ref: setRef, isInView: shouldAnimate };
};

export default useScrollAnimation; 