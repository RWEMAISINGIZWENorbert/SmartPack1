import React, { useState, useRef, useEffect } from 'react';

const Select = ({
  label,
  options = [], // Now supports BOTH ['Apple', 'Orange'] OR [{value: 'apple', label: 'Apple'}]
  value,
  onChange,
  placeholder = "Select an option",
  error,
  hint,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- NEW LOGIC: Normalize options ---
  // If the option is a string/number, turn it into { value, label } automatically
  const normalizedOptions = options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) };
    }
    return opt; // It was already an object, leave it alone
  });

  // Find the label for the currently selected value using the normalized options
  const selectedOption = normalizedOptions.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative flex flex-col gap-1.5 ${className}`} ref={dropdownRef}>
      
      {label && (
        <label className="text-sm font-medium text-text-high">
          {label}
        </label>
      )}

      {/* Select Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between
          w-full px-3 py-2 bg-card text-sm cursor-pointer
          border rounded-lg shadow-sm select-none
          transition-all duration-200 outline-none
          
          ${!error ? 'border-border hover:border-primary' : 'border-error text-error'}
          ${isOpen && !error ? 'border-primary ring-2 ring-primary/20' : ''}
          ${isOpen && error ? 'ring-2 ring-error/20' : ''}
        `}
      >
        <span className={selectedOption ? 'text-text-high' : 'text-text-low'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <svg 
          className={`w-4 h-4 text-text-low transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          strokeWidth="2" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Options Dropdown Card */}
      {isOpen && (
        <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden py-1">
          {normalizedOptions.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {normalizedOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    px-3 py-2 text-sm cursor-pointer transition-colors
                    ${option.value === value 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-text-high hover:bg-muted'
                    }
                  `}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-sm text-text-low text-center">
              No options available
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs font-medium text-error mt-0.5">{error}</p>}
      {!error && hint && <p className="text-xs text-text-low mt-0.5">{hint}</p>}
      
    </div>
  );
};

export default Select;
