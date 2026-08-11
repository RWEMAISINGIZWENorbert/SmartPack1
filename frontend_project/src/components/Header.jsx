import React from 'react';

const Header = ({ label, children }) => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 mb-2">
      
      {/* 1. Dynamic Label (Large & Medium Weight) */}
      <div>
        <h1 className="text-2xl font-semibold text-text-high tracking-tight">
          {label}
        </h1>
      </div>

      {/* 2. Right Side Actions Slot */}
      <div className="flex items-center gap-4">
        {children}
      </div>

    </header>
  );
};

export default Header;
