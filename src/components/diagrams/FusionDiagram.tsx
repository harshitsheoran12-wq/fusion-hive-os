import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface FusionDiagramProps {
  animate?: boolean;
  className?: string;
}

const FusionDiagram: React.FC<FusionDiagramProps> = ({ 
  animate = false, 
  className = "" 
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  const nodes = [
    { id: 1, x: 250, y: 50, angle: 0, role: "Data Analysis", desc: "Processes and analyzes incoming data streams" },
    { id: 2, x: 400, y: 120, angle: 45, role: "Pattern Recognition", desc: "Identifies patterns and anomalies" },
    { id: 3, x: 450, y: 250, angle: 90, role: "Decision Making", desc: "Makes strategic decisions based on analysis" },
    { id: 4, x: 400, y: 380, angle: 135, role: "Task Execution", desc: "Executes planned actions and tasks" },
    { id: 5, x: 250, y: 450, angle: 180, role: "Quality Assurance", desc: "Monitors and ensures quality standards" },
    { id: 6, x: 100, y: 380, angle: 225, role: "Communication", desc: "Handles external communications" },
    { id: 7, x: 50, y: 250, angle: 270, role: "Resource Management", desc: "Manages system resources and allocation" },
    { id: 8, x: 100, y: 120, angle: 315, role: "Learning System", desc: "Continuously learns and improves" }
  ];

  const center = { x: 250, y: 250 };

  return (
    <div className={`diagram-container ${className}`}>
      <svg 
        width="500" 
        height="500" 
        viewBox="0 0 500 500"
        className="w-full h-auto"
      >
        {/* Central Hub */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? { 
            scale: [0, 1.2, 1], 
            opacity: 1,
            rotate: [0, 360]
          } : { scale: 1, opacity: 1 }}
          transition={{ 
            duration: 2, 
            repeat: animate ? Infinity : 0,
            ease: "linear",
            rotate: {
              duration: 20,
              repeat: animate ? Infinity : 0,
              ease: "linear"
            }
          }}
        />
        
        {/* Central Node Face */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <circle cx={center.x - 8} cy={center.y - 8} r="3" fill="currentColor" />
          <circle cx={center.x + 8} cy={center.y - 8} r="3" fill="currentColor" />
          <path 
            d={`M ${center.x - 12} ${center.y + 8} Q ${center.x} ${center.y + 16} ${center.x + 12} ${center.y + 8}`}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </motion.g>

        {/* Outer Nodes */}
        {nodes.map((node, index) => (
          <HoverCard key={node.id}>
            <HoverCardTrigger asChild>
              <motion.g 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: animate ? index * 0.1 + 0.8 : 0,
                  duration: 0.6,
                  type: "spring"
                }}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Outer Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-all duration-300 ${hoveredNode === node.id ? 'opacity-100 drop-shadow-glow' : 'opacity-80'}`}
                />
                
                {/* Connection Lines */}
                <motion.line
                  x1={center.x}
                  y1={center.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`transition-all duration-300 ${hoveredNode === node.id ? 'opacity-100' : 'opacity-60'}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    delay: animate ? index * 0.1 + 1.2 : 0,
                    duration: 0.8
                  }}
                />
                
                {/* Node Face */}
                <circle cx={node.x - 6} cy={node.y - 6} r="2" fill="currentColor" />
                <circle cx={node.x + 6} cy={node.y - 6} r="2" fill="currentColor" />
                <path 
                  d={`M ${node.x - 8} ${node.y + 6} Q ${node.x} ${node.y + 12} ${node.x + 8} ${node.y + 6}`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </motion.g>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 bg-background/95 backdrop-blur-sm border-primary/20">
              <div className="space-y-2">
                <h4 className="text-sm font-bold font-mono text-primary">{node.role}</h4>
                <p className="text-xs text-muted-foreground">{node.desc}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}

        {/* Interconnection Lines between outer nodes */}
        {nodes.map((node, index) => {
          const nextNode = nodes[(index + 1) % nodes.length];
          return (
            <motion.line
              key={`connection-${index}`}
              x1={node.x}
              y1={node.y}
              x2={nextNode.x}
              y2={nextNode.y}
              stroke="currentColor"
              strokeWidth="1"
              className="opacity-30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                delay: animate ? 2 + index * 0.05 : 0,
                duration: 0.6
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default FusionDiagram;