import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface InteractiveBackgroundProps {
  className?: string;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ className = "" }) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mouseTrail, setMouseTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const createRipple = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1500);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
        id: Date.now()
      };
      
      setMouseTrail(prev => {
        const updated = [...prev, newTrail].slice(-8);
        return updated;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      onClick={createRipple}
    >
      {/* Mouse Trail */}
      {mouseTrail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full pointer-events-none"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{ 
            duration: 1,
            delay: index * 0.05,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute border border-primary/30 rounded-full pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
          }}
          initial={{ 
            width: 0, 
            height: 0, 
            opacity: 0.8,
            x: '-50%',
            y: '-50%'
          }}
          animate={{ 
            width: '200px', 
            height: '200px', 
            opacity: 0,
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Grid Pattern */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-5" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default InteractiveBackground;