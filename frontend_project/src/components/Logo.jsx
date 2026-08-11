import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-high">
        Smart<span className="text-primary">Park</span>
      </h1>
      <div className="h-1.5 w-1.5 bg-primary rounded-full" />
    </div>
  );
};

export default Logo;
