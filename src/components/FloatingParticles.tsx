import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  interactive?: boolean;
  variant?: 'default' | 'fusion' | 'fission' | 'glow';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  speed: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ 
  count = 20, 
  className = "",
  interactive = false,
  variant = 'default'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickedParticles, setClickedParticles] = useState<Set<number>>(new Set());

  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 8,
    speed: Math.random() * 0.5 + 0.2,
  }));

  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const handleParticleClick = (particleId: number) => {
    setClickedParticles(prev => new Set([...prev, particleId]));
    setTimeout(() => {
      setClickedParticles(prev => {
        const newSet = new Set(prev);
        newSet.delete(particleId);
        return newSet;
      });
    }, 2000);
  };

  const getParticleStyle = (variant: string) => {
    switch (variant) {
      case 'fusion':
        return 'bg-primary/20 shadow-lg shadow-primary/30';
      case 'fission':
        return 'bg-destructive/20 shadow-lg shadow-destructive/30';
      case 'glow':
        return 'bg-primary/30 shadow-xl shadow-primary/50';
      default:
        return 'bg-primary/10';
    }
  };

  const getMouseInfluence = (particle: Particle) => {
    if (!interactive) return { x: 0, y: 0 };
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - particle.x, 2) + 
      Math.pow(mousePosition.y - particle.y, 2)
    );
    const influence = Math.max(0, 20 - distance) / 20;
    
    return {
      x: (mousePosition.x - particle.x) * influence * 0.3,
      y: (mousePosition.y - particle.y) * influence * 0.3,
    };
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}>
      {particles.map((particle) => {
        const mouseInfluence = getMouseInfluence(particle);
        const isClicked = clickedParticles.has(particle.id);
        
        return (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full cursor-pointer ${getParticleStyle(variant)} transition-all duration-300 ${
              interactive ? 'hover:scale-150 hover:opacity-80' : ''
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transform: `translate(${mouseInfluence.x}px, ${mouseInfluence.y}px)`,
            }}
            animate={{
              y: [0, -30 * particle.speed, 0],
              x: [0, 15 * particle.speed, -15 * particle.speed, 0],
              opacity: interactive ? [0.2, 0.6, 0.2] : [0.1, 0.3, 0.1],
              scale: isClicked ? [1, 2, 0] : [1, 1.3, 1],
              rotate: interactive ? [0, 360] : [0, 180],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            onClick={() => interactive && handleParticleClick(particle.id)}
            whileHover={interactive ? { scale: 1.5, opacity: 0.8 } : {}}
            whileTap={interactive ? { scale: 0.8 } : {}}
          />
        );
      })}
    </div>
  );
};

export default FloatingParticles;