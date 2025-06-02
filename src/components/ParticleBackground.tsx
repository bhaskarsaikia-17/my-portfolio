import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useWindowSize } from '../hooks/useWindowSize';

const ParticleCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;

interface Particle {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
  size: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  particleColors?: string[];
  particleSize?: number;
  particleSpeed?: number;
  interactive?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 50,
  particleColors = ['#FF5722', '#9C27B0', '#3F51B5', '#4CAF50'],
  particleSize = 3,
  particleSpeed = 0.1,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMouseMoving = useRef(false);
  const rafRef = useRef<number | null>(null);
  const { width, height } = useWindowSize();

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current || !width || !height) return;

    // Clear any existing animation
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Resize canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Create particles
    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const z = Math.random() * 1000;
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      
      particles.current.push({
        x,
        y,
        z,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        vz: Math.random() * particleSpeed * 0.5,
        color,
        size: particleSize * (0.5 + Math.random() * 0.5)
      });
    }

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Boundary check
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        if (particle.z < 0 || particle.z > 1000) particle.vz *= -1;

        // Interactive - affect particles with mouse
        if (interactive && isMouseMoving.current) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) * 0.01;
            particle.vx -= Math.cos(angle) * force;
            particle.vy -= Math.sin(angle) * force;
          }
        }

        // Draw particle
        const scale = 1000 / (1000 + particle.z);
        const sizeScaled = particle.size * scale;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, sizeScaled, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = scale * 0.8; // Fade particles in the distance
        ctx.fill();
      });

      // Continue animation
      rafRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = event.clientX;
      mousePosition.current.y = event.clientY;
      isMouseMoving.current = true;
      
      // Reset "moving" flag after a delay
      gsap.delayedCall(0.5, () => {
        isMouseMoving.current = false;
      });
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [width, height, particleCount, particleColors, particleSize, particleSpeed, interactive]);

  return <ParticleCanvas ref={canvasRef} />;
};

export default ParticleBackground; 