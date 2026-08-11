import React from 'react';
import Spinner from './Spinner';

const Button = ({ 
  text, 
  icon, 
  onClick, 
  type = 'button',    // Defaults to 'button' so it doesn't accidentally submit forms
  variant = 'primary', // Can be 'primary', 'secondary', or 'danger'
  className = '', 
  disabled,
  loading,
  ...props 
}) => {
  
  // Define our styles using the global @theme colors we set up
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover border border-transparent shadow-sm",
    secondary: "bg-card text-text-high border border-border hover:bg-muted shadow-sm",
    danger: "bg-error text-white hover:opacity-90 border border-transparent shadow-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        /* Layout & Typography */
        flex items-center justify-center gap-2 
        px-4 py-2 rounded-lg font-semibold text-sm
        
        /* Interaction */
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary/50
        
        /* Disabled State */
        disabled:bg-muted disabled:text-text-low disabled:border-border disabled:cursor-not-allowed disabled:shadow-none
        
        /* Apply the chosen variant style */
        ${variants[variant]}
        
        /* Allow custom classes to be passed in */
        ${className}
      `}
      {...props}
    >
      {/* If an icon is provided, it renders here on the left */}
      
      {loading ? (
        // 2. USE YOUR CUSTOM SPINNER HERE
        <Spinner size="small" color="low" inline={true} />
      ) : (
        icon && <span className="w-4 h-4">{icon}</span>
      )}
      
      <span>{loading ? 'Processing...' : text}</span>
    </button>
  );
};

export default Button;
