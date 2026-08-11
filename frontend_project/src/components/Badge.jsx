import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "bg-gray-500/10 text-gray-700 dark:text-gray-300",
    success: "bg-green-500/10 text-green-700 dark:text-green-400",
    warning: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    error: "bg-red-500/10 text-red-700 dark:text-red-400",
    primary: "bg-primary/10 text-primary"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
