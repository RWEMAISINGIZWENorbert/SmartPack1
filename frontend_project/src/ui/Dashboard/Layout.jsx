import React from 'react';

const Layout = ({ children,onOpenSidebar  }) => {
  return (
    <div className="flex-1 h-full min-h-screen lg:min-h-0 bg-background lg:py-4 lg:pr-4">
      <div 
        className={`
          /* Background & Transparent Border */
          bg-card h-full w-full 
          border border-transparent
          
          /* Reduced Border Radius */
          rounded-none lg:rounded-2xl
          
          /* Shadow & Layout */
          shadow-sm overflow-y-auto custom-scrollbar
          flex flex-col relative
        `}
      >
        {/* The dynamic content (Stats, Tables, etc.) renders here */}
        <main className="p-6 md:p-8 flex-1 relative">
          
          {/* 2. Floating Mobile Trigger Button (Top-Left) */}
          <button 
            onClick={onOpenSidebar}
            className="lg:hidden p-2 -ml-2 mb-4 text-text-low hover:text-primary transition-colors focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
