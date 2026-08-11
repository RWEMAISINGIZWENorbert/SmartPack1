import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

/**
 * 1. THE PROVIDER COMPONENT
 * Place <SnackbarProvider /> near the root of your App.jsx
 * This sets up the global styles using your Tailwind CSS variables.
 */
export const SnackbarProvider = () => {
  return (
    <Toaster 
      position="bottom-right" // This is the default if no position is provided
      toastOptions={{
        
        // The default look for our cards
        style: {
          background: 'var(--color-card)',
          color: 'var(--color-text-high)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          padding: '12px 16px',
        },
        
        // Customizing the Success state
        success: {
          iconTheme: {
            primary: 'var(--color-success)',
            secondary: '#ffffff',
          },
        },
        
        // Customizing the Error state
        error: {
          iconTheme: {
            primary: 'var(--color-error)',
            secondary: '#ffffff',
          },
        },
        
      }}
    />
  );
};

/**
 * 2. THE REUSABLE HELPER
 * Import 'snackbar' into any file to trigger a toast notification.
 * Optionally pass a position parameter: 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'
 */
export const snackbar = {
  
  success: (message, position) => toast.success(message, position ? { position } : undefined),
  
  error: (message, position) => toast.error(message, position ? { position } : undefined),
  
  loading: (message, position) => toast.loading(message, position ? { position } : undefined),
  
  info: (message, position) => toast(message, {
    icon: 'ℹ️',
    style: { borderLeft: '4px solid var(--color-info)' },
    position: position // safely ignored by react-hot-toast if undefined
  })
  
};
