import React from 'react';
import { motion } from 'framer-motion';

interface ArchitectureDiagramProps {
  animate?: boolean;
  className?: string;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ 
  animate = false, 
  className = "" 
}) => {
  return (
    <div className={`diagram-container ${className} bg-muted/10 p-8`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Modern Microprocessor */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-serif text-2xl font-bold mb-6">Modern Microprocessor</h3>
          <svg width="280" height="200" viewBox="0 0 280 200" className="mx-auto">
            {/* CPU Core Grid */}
            {Array.from({ length: 16 }, (_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const x = 60 + col * 40;
              const y = 40 + row * 30;
              
              return (
                <motion.g key={`cpu-core-${i}`}>
                  <rect
                    x={x}
                    y={y}
                    width="30"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="opacity-80"
                  />
                  <text
                    x={x + 15}
                    y={y + 13}
                    textAnchor="middle"
                    className="text-xs fill-current opacity-60"
                  >
                    C{i}
                  </text>
                </motion.g>
              );
            })}
            
            {/* Shared Cache */}
            <motion.rect
              x="40"
              y="160"
              width="200"
              height="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <text x="140" y="176" textAnchor="middle" className="text-sm font-mono">
              SHARED CACHE
            </text>
            
            {/* Connections */}
            {Array.from({ length: 4 }, (_, i) => (
              <motion.line
                key={`connection-${i}`}
                x1={75 + i * 40}
                y1={130}
                x2={75 + i * 40}
                y2={160}
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-60"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              />
            ))}
          </svg>
        </motion.div>

        {/* The Hive Mind */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="font-serif text-2xl font-bold mb-6">The Hive Mind</h3>
          <svg width="280" height="200" viewBox="0 0 280 200" className="mx-auto">
            {/* AI Agent Grid */}
            {Array.from({ length: 16 }, (_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const x = 60 + col * 40;
              const y = 40 + row * 30;
              
              return (
                <motion.g key={`ai-agent-${i}`}>
                  <circle
                    cx={x + 15}
                    cy={y + 10}
                    r="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="opacity-80"
                  />
                  
                  {/* AI Agent Face */}
                  <circle cx={x + 11} cy={y + 7} r="1.5" fill="currentColor" />
                  <circle cx={x + 19} cy={y + 7} r="1.5" fill="currentColor" />
                  <path 
                    d={`M ${x + 9} ${y + 13} Q ${x + 15} ${y + 16} ${x + 21} ${y + 13}`}
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  
                  <text
                    x={x + 15}
                    y={y + 25}
                    textAnchor="middle"
                    className="text-xs fill-current opacity-60"
                  >
                    A{i}
                  </text>
                </motion.g>
              );
            })}
            
            {/* Shared Brain */}
            <motion.rect
              x="40"
              y="160"
              width="200"
              height="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
            <text x="140" y="176" textAnchor="middle" className="text-sm font-mono">
              SHARED BRAIN
            </text>
            
            {/* Neural Connections */}
            {Array.from({ length: 4 }, (_, i) => (
              <motion.line
                key={`neural-${i}`}
                x1={75 + i * 40}
                y1={130}
                x2={75 + i * 40}
                y2={160}
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-60"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
              />
            ))}
          </svg>
        </motion.div>
      </div>
      
      {/* Comparison Arrow */}
      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="font-mono text-lg tracking-wide opacity-80">
          Same Architecture ↔ New Problem
        </div>
      </motion.div>
    </div>
  );
};

export default ArchitectureDiagram;