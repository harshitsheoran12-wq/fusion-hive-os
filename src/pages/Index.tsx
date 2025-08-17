import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Hero from '@/components/Hero';
import FissionDiagram from '@/components/diagrams/FissionDiagram';
import FusionDiagram from '@/components/diagrams/FusionDiagram';
import ArchitectureDiagram from '@/components/diagrams/ArchitectureDiagram';
import FloatingParticles from '@/components/FloatingParticles';
import SectionNavigation from '@/components/SectionNavigation';
import InteractiveBackground from '@/components/InteractiveBackground';

const Index = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const fissionRef = useScrollAnimation();
  const fusionRef = useScrollAnimation();
  const architectureRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  const handleWaitlistSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the Future",
        description: "You've been added to our waitlist. We'll be in touch soon.",
      });
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <InteractiveBackground />
      <FloatingParticles count={30} interactive={true} variant="glow" />
      <SectionNavigation />
      
      {/* Hero Section */}
      <div id="hero" className="relative">
        <FloatingParticles count={15} interactive={true} variant="fusion" />
        <Hero />
      </div>
      
      {/* Problem Section - Fission */}
      <section id="fission" className="py-24 px-6 relative">
        <FloatingParticles count={40} interactive={true} variant="fission" />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            ref={fissionRef.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-on-scroll ${
              fissionRef.isVisible ? 'in-view' : ''
            }`}
          >
            {/* Chaotic Diagram */}
            <div className="order-2 lg:order-1">
              <FissionDiagram animate={fissionRef.isVisible} />
            </div>
            
            {/* Problem Text */}
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="section-title">
                The Fission of Knowledge
              </h2>
              <p className="body-text">
                Today's brilliant AI agents work in silos. Companies are deploying 
                fleets of powerful tools that can't talk to each other. The result 
                is a tangled mess of wasted effort and conflicting outputs.
              </p>
              <p className="body-text font-bold">
                This is chaos, not collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section - Fusion */}
      <section id="fusion" className="py-24 px-6 bg-muted/5 relative">
        <FloatingParticles count={25} interactive={true} variant="fusion" />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            ref={fusionRef.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-on-scroll ${
              fusionRef.isVisible ? 'in-view' : ''
            }`}
          >
            {/* Solution Text */}
            <div className="space-y-8">
              <h2 className="section-title">
                The Fusion of Minds
              </h2>
              <p className="body-text">
                We are building the "Shared Brain" for AI. A single, collaborative 
                environment where agents can connect, synthesize, and create.
              </p>
              <p className="body-text">
                Our platform brings order to the chaos, turning your disconnected 
                agents into a cohesive, intelligent team.
              </p>
            </div>
            
            {/* Orderly Diagram */}
            <div>
              <FusionDiagram animate={fusionRef.isVisible} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="architecture" className="py-24 px-6 relative">
        <FloatingParticles count={20} interactive={true} variant="glow" />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            ref={architectureRef.ref}
            className={`text-center animate-on-scroll ${
              architectureRef.isVisible ? 'in-view' : ''
            }`}
          >
            <h2 className="section-title mb-16">
              A Proven Architecture for a New Problem
            </h2>
            
            <ArchitectureDiagram animate={architectureRef.isVisible} />
            
            <div className="mt-16 max-w-4xl mx-auto">
              <p className="body-text">
                Our insight comes from first principles in computer architecture. 
                We apply the same battle-tested concepts of parallel processing and 
                shared memory that power a microprocessor to the world of AI.
              </p>
              <p className="body-text mt-6 font-bold">
                This isn't just a better workflow tool; it's a fundamentally new 
                architecture for collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="py-24 px-6 bg-muted/10 relative">
        <FloatingParticles count={35} interactive={true} variant="fusion" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            ref={ctaRef.ref}
            className={`animate-on-scroll ${ctaRef.isVisible ? 'in-view' : ''}`}
          >
            <h2 className="section-title mb-8">
              Build the Future with Us.
            </h2>
            
            <p className="body-text mb-12 max-w-3xl mx-auto">
              We are currently building our alpha and are looking for ambitious 
              design partners who are tackling the challenge of multi-agent systems.
            </p>
            
            <form onSubmit={handleWaitlistSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-mono bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button type="submit" className="btn-fusion shrink-0 whitespace-nowrap w-full sm:w-auto">
                Join the Waitlist
              </Button>
            </form>
            
            <motion.div 
              className="mt-16 opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <p className="font-mono text-sm tracking-widest">
                CLASSIFIED: OPERATION FUSION
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
