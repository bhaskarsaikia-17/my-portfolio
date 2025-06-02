import { useCallback, useEffect } from 'react';

type CursorInteractionType = 'default' | 'button' | 'link' | 'text' | 'image' | 'video' | 'custom';

interface CursorStyleOptions {
  type?: CursorInteractionType;
  text?: string;
  color?: string;
  hideTooltip?: boolean;
}

/**
 * Custom hook for cursor interactions
 * @param options - Cursor style options
 * @returns - Mouse event handlers to apply to elements
 */
const useCursorInteraction = (options: CursorStyleOptions = {}) => {
  const { type = 'default', text, color, hideTooltip = false } = options;

  // Add global stylesheet to prevent button text tooltips
  useEffect(() => {
    // Only add the style once
    if (!document.getElementById('cursor-interaction-styles')) {
      const style = document.createElement('style');
      style.id = 'cursor-interaction-styles';
      style.textContent = `
        button {
          -webkit-user-select: none !important;
          user-select: none !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          -webkit-touch-callout: none !important;
          title: none !important;
        }
        
        button::before,
        button::after,
        [role="tooltip"],
        .tooltip,
        .tooltiptext {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          content: none !important;
        }
        
        /* Additional tooltip prevention */
        [title],
        [data-title],
        [data-tooltip],
        [aria-label] {
          position: relative;
        }
        
        [title]::before,
        [title]::after,
        [data-title]::before,
        [data-title]::after,
        [data-tooltip]::before,
        [data-tooltip]::after,
        [aria-label]::before,
        [aria-label]::after {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          content: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    // Prevent default tooltip behavior
    if (hideTooltip && e.currentTarget) {
      // Remove title attribute temporarily to prevent default tooltip
      const target = e.currentTarget as HTMLElement;
      
      // Store original attributes
      target.dataset.originalTitle = target.title || '';
      target.removeAttribute('title');
      
      // Remove other tooltip-related attributes
      target.removeAttribute('data-title');
      target.removeAttribute('data-tooltip');
      target.removeAttribute('aria-label');
      target.removeAttribute('aria-labelledby');
      target.removeAttribute('aria-describedby');
      
      // Add inline styles to prevent button tooltips
      if (target.tagName === 'BUTTON') {
        const originalStyles = target.getAttribute('style') || '';
        target.dataset.originalStyles = originalStyles;
        
        // Add styles to prevent tooltips
        target.style.userSelect = 'none';
        target.style.webkitUserSelect = 'none';
        target.style.appearance = 'none';
        target.style.webkitAppearance = 'none';
        target.style.position = 'relative';
        target.setAttribute('style', target.getAttribute('style') + '; -webkit-touch-callout: none !important;');
      }
    }
    
    // Add data attribute for custom cursor detection
    document.body.setAttribute('data-cursor-type', type);
    
    // Set custom text if provided
    if (text) {
      document.body.setAttribute('data-cursor-text', text);
    }
    
    // Set custom color if provided
    if (color) {
      document.body.setAttribute('data-cursor-color', color);
    }
  }, [type, text, color, hideTooltip]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    // Reset cursor data attributes
    document.body.removeAttribute('data-cursor-type');
    document.body.removeAttribute('data-cursor-text');
    document.body.removeAttribute('data-cursor-color');
    
    // Restore title attribute if it was removed
    if (hideTooltip && e.currentTarget) {
      const target = e.currentTarget as HTMLElement;
      
      // Restore title
      if (target.dataset.originalTitle) {
        target.title = target.dataset.originalTitle;
        delete target.dataset.originalTitle;
      }
      
      // Restore original styles for buttons
      if (target.tagName === 'BUTTON' && target.dataset.originalStyles) {
        target.setAttribute('style', target.dataset.originalStyles);
        delete target.dataset.originalStyles;
      }
    }
  }, [hideTooltip]);

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};

export default useCursorInteraction; 