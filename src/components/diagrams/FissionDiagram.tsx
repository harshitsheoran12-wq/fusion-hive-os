import React from 'react';
import { motion } from 'framer-motion';

interface FissionDiagramProps {
  animate?: boolean;
  className?: string;
}

const FissionDiagram: React.FC<FissionDiagramProps> = ({ 
  animate = false, 
  className = "" 
}) => {
  // Chaotic, tangled positions - mimicking the uploaded image's chaos
  const chaoticNodes = [
    { id: 1, x: 120, y: 80 },
    { id: 2, x: 380, y: 120 },
    { id: 3, x: 200, y: 180 },
    { id: 4, x: 350, y: 200 },
    { id: 5, x: 80, y: 250 },
    { id: 6, x: 420, y: 280 },
    { id: 7, x: 180, y: 320 },
    { id: 8, x: 320, y: 350 },
    { id: 9, x: 150, y: 400 },
    { id: 10, x: 280, y: 80 }
  ];

  // Chaotic connections - creating the tangled mess
  const chaoticConnections = [
    [0, 1], [0, 2], [0, 4], [0, 7], [0, 9],
    [1, 2], [1, 3], [1, 5], [1, 6], [1, 8],
    [2, 3], [2, 4], [2, 6], [2, 7], [2, 9],
    [3, 4], [3, 5], [3, 7], [3, 8], [3, 9],
    [4, 5], [4, 6], [4, 8], [4, 9],
    [5, 6], [5, 7], [5, 8], [5, 9],
    [6, 7], [6, 8], [6, 9],
    [7, 8], [7, 9],
    [8, 9]
  ];

  return (
    <div className={`diagram-container ${className}`}>
      <svg 
        width="500" 
        height="480" 
        viewBox="0 0 500 480"
        className="w-full h-auto"
      >
        {/* Chaotic central mass of scribbled lines */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          {/* Dense scribbled center */}
          {Array.from({ length: 40 }, (_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const radius = 30 + Math.random() * 50;
            const x1 = 250 + Math.cos(angle) * radius;
            const y1 = 240 + Math.sin(angle) * radius;
            const x2 = 250 + Math.cos(angle + 0.5) * (radius + Math.random() * 30 - 15);
            const y2 = 240 + Math.sin(angle + 0.5) * (radius + Math.random() * 30 - 15);
            
            return (
              <motion.line
                key={`scribble-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  delay: animate ? i * 0.02 : 0,
                  duration: 0.3
                }}
              />
            );
          })}
        </motion.g>

        {/* Chaotic connection lines */}
        {chaoticConnections.map(([startIdx, endIdx], index) => (
          <motion.line
            key={`chaotic-${index}`}
            x1={chaoticNodes[startIdx].x}
            y1={chaoticNodes[startIdx].y}
            x2={chaoticNodes[endIdx].x}
            y2={chaoticNodes[endIdx].y}
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              delay: animate ? index * 0.03 + 0.5 : 0,
              duration: 0.4
            }}
          />
        ))}

        {/* Chaotic outer nodes */}
        {chaoticNodes.map((node, index) => (
          <motion.g 
            key={node.id}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: animate ? [0, 10, -10, 0] : 0
            }}
            transition={{ 
              delay: animate ? index * 0.1 + 1 : 0,
              duration: 0.6,
              rotate: {
                repeat: animate ? Infinity : 0,
                duration: 2,
                ease: "easeInOut"
              }
            }}
          >
            {/* Scribbled outer rings */}
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-70"
              strokeDasharray="3,2"
            />
            
            {/* Additional chaotic rings */}
            <circle
              cx={node.x + Math.random() * 6 - 3}
              cy={node.y + Math.random() * 6 - 3}
              r="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="opacity-50"
              strokeDasharray="2,3"
            />
            
            {/* Distressed node face */}
            <circle cx={node.x - 5} cy={node.y - 5} r="2" fill="currentColor" />
            <circle cx={node.x + 5} cy={node.y - 5} r="2" fill="currentColor" />
            {/* Frowning face */}
            <path 
              d={`M ${node.x - 8} ${node.y + 8} Q ${node.x} ${node.y + 2} ${node.x + 8} ${node.y + 8}`}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default FissionDiagram;