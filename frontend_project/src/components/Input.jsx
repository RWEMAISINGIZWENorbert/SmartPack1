import React from 'react';

/**
 * A professional, reusable Input component for the SaaS application.
 */
const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  hint,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-medium text-text-high"
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 bg-card text-text-high text-sm
          border rounded-lg shadow-sm
          placeholder:text-text-low
          transition-all duration-200 outline-none
          
          /* Default State */
          ${!error ? 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20' : ''}
          
          /* Error State */
          ${error ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20 text-error' : ''}
          
          /* Disabled State */
          disabled:bg-muted disabled:text-text-low disabled:cursor-not-allowed
        `}
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p className="text-xs font-medium text-error mt-0.5">
          {error}
        </p>
      )}

      {/* Hint/Helper Text (only shows if there is no error) */}
      {!error && hint && (
        <p className="text-xs text-text-low mt-0.5">
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
