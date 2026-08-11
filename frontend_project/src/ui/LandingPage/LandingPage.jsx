import React, { useState } from 'react';
import LandingNavBar from '../../components/landing/LandingNavBar';
import Hero from '../../components/landing/Hero';
import SignIn from '../../components/auth/Signin';
import SignUp from '../../components/auth/SignUp';

function LandingPage() {
  const [view, setView] = useState('hero'); // 'hero', 'signin', 'signup'

  return (
    <div className="bg-background min-h-screen relative">
      <LandingNavBar 
        onSignInClick={() => setView('signin')} 
        onHomeClick={() => setView('hero')}
      />

      <div className="pt-20"> {/* Offset for fixed navbar */}
        {view === 'hero' && (
          <Hero
            onSignIn={() => setView('signin')}
            onSignUp={() => setView('signup')}
          />
        )}

        {view === 'signin' && (
          <div className="animate-in fade-in zoom-in duration-500">
             <SignIn onSwitchToSignUp={() => setView('signup')} />
          </div>
        )}

        {view === 'signup' && (
          <div className="animate-in fade-in zoom-in duration-500">
             <SignUp onSwitchToSignIn={() => setView('signin')} />
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;

