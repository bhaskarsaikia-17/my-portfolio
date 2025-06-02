"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"
import styled from 'styled-components'

interface SplitTextProps {
    text: string;
    className?: string;
    elementType?: 'h1' | 'h2' | 'h3' | 'p';
}

const Container = styled.div`
    width: 100%;
    margin-bottom: ${props => props.className?.includes('paragraph') ? '1.5rem' : '2rem'};

    h2 {
        font-size: 3rem;
        font-weight: 700;
        color: white;
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
    }

    p {
        font-size: 1.1rem;
        color: #aaaaaa;
        line-height: 1.8;
    }

    .split-word {
        will-change: transform, opacity;
        display: inline-block;
    }
`;

export default function SplitText({ text, className = "", elementType = 'h1' }: SplitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const initAnimation = async () => {
            if (!containerRef.current) return;
            
            // Create a temporary element to split text
            const element = containerRef.current.querySelector(elementType);
            if (!element) return;
            
            try {
                // Split the text into words
                const { words } = splitText(element);
                
                // Animate each word
                animate(
                    words,
                    { opacity: [0, 1], y: [10, 0] },
                    {
                        type: "spring",
                        duration: 0.8,
                        bounce: 0.2,
                        delay: stagger(0.05),
                    }
                );
            } catch (error) {
                console.error("Error in SplitText animation:", error);
                // Fallback if animation fails
                if (element) {
                    element.style.opacity = "1";
                }
            }
        };
        
        // Small delay to ensure DOM is ready
        setTimeout(initAnimation, 100);
    }, [elementType, text]);

    const Element = elementType;

    return (
        <Container className={className} ref={containerRef}>
            <Element>
                {text}
            </Element>
        </Container>
    )
} 