import React from 'react';
import Button from '../Button';

const Hero = ({ 
  onSignIn, 
  onSignUp 
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden bg-grid">
      
      {/* Neo-Enterprise Gradient Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-background to-transparent -z-10" />

      {/* Structured Content */}
      <div className="max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
           <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           New: Integrated MySQL Dashboard
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-[0.9]">
          The OS for <br/>
          <span className="text-primary">Human Resources.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-low max-w-2xl mx-auto font-medium leading-relaxed">
          Manage payroll, compliance, and department scaling from a single, high-performance interface. Built for modern organizations.
        </p>
      </div>

      {/* Refined Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full max-w-md animate-in fade-in duration-1000 delay-300">
        <Button 
          text="Get Started Now" 
          onClick={onSignUp} 
          className="w-full sm:w-auto px-10 h-14 text-sm font-bold !rounded-lg shadow-xl shadow-primary/20"
        />
        <Button 
          text="Live Demo" 
          variant="secondary" 
          onClick={onSignIn} 
          className="w-full sm:w-auto px-10 h-14 text-sm font-bold !rounded-lg border-border bg-muted/50 hover:bg-muted"
        />
      </div>

      {/* Minimalist Social Proof */}
      <div className="mt-24 flex items-center justify-center gap-12 opacity-20 grayscale grayscale-100 contrast-125">
         <div className="text-2xl font-bold tracking-tighter italic">VECTRA</div>
         <div className="text-2xl font-bold tracking-tighter">APEX.IO</div>
         <div className="text-2xl font-bold tracking-tighter italic font-serif">LUMINA</div>
      </div>
    </section>
  );
};

export default Hero;
