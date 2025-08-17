import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Project' },
  { id: 'fission', label: 'Problem' },
  { id: 'fusion', label: 'Solution' },
  { id: 'architecture', label: 'How It Works' },
  { id: 'waitlist', label: 'Join the Network' },
];

const SectionNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <nav className="space-y-4">
        {sections.map(({ id, label }) => (
          <motion.button
            key={id}
            onClick={() => scrollToSection(id)}
            className="block w-3 h-3 rounded-full border border-primary/30 relative group"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              initial={false}
              animate={{
                scale: activeSection === id ? 1 : 0,
                opacity: activeSection === id ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur-sm px-3 py-1 rounded border border-primary/20 whitespace-nowrap">
              <span className="text-xs font-mono text-primary">{label}</span>
            </div>
          </motion.button>
        ))}
      </nav>
    </div>
  );
};

export default SectionNavigation;