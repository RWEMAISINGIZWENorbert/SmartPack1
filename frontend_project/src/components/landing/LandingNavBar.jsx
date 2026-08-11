import React from 'react';
import NavBar from '../NavBar';

const LandingNavBar = ({ onSignInClick, onHomeClick }) => {
  
  const landingNavItems = [
    { label: 'Home', action: onHomeClick },
    { label: 'Features', targetId: 'hero' }, // Just scroll to hero for now
    { label: 'Sign In', action: onSignInClick },
  ];

  return (
    <NavBar 
      navItems={landingNavItems} 
      onGetStarted={onSignInClick} 
    />
  );
};

export default LandingNavBar;
