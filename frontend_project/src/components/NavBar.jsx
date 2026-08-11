import React, { useState } from 'react';
import Button from './Button';

const NavBar = ({ navItems = [], onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.targetId) {
      const element = document.getElementById(item.targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl">
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl shadow-2xl shadow-black/50">
        
        {/* Branding */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (navItems[0]?.action) navItems[0].action();
          }}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white hidden sm:block">
            Smart<span className="text-primary">Park</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="text-[11px] font-bold uppercase tracking-widest text-text-low hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:block">
          <Button 
            text="Launch Platform" 
            onClick={onGetStarted} 
            className="h-9 px-5 text-[11px] font-bold !rounded-lg shadow-none"
          />
        </div>

        {/* Mobile: Hamburger */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>

        {/* Mobile: Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 p-6 bg-card border border-border rounded-2xl flex flex-col gap-6 md:hidden animate-in zoom-in duration-300">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-left text-xs font-bold uppercase tracking-widest text-text-high"
              >
                {item.label}
              </button>
            ))}
            <Button text="Launch Platform" onClick={onGetStarted} className="w-full h-12 !rounded-lg" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
