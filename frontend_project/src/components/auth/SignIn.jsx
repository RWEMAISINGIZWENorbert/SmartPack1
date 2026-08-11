import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { snackbar } from '../Snackbar';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      snackbar.error('Please enter both Email and password');
      return;
    }
    setIsLoading(true);
    try {
      const result = await authService.signIn(formData);
      if (result.success) {
        login(result.data, result.accessToken); 
        snackbar.success(`Welcome back!`);
      }
    } catch (err) {
      snackbar.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    };
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6 font-outfit relative overflow-hidden">
      
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[400px] relative z-10 animate-in zoom-in duration-500">
        
        {/* Instagram-style Branding */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold italic font-serif tracking-tighter text-white">
            Smart<span className="text-primary">Park</span>
          </h1>
          <p className="text-text-low mt-4 font-medium">Access your administrative portal.</p>
        </div>

        {/* Central Card Container */}
        <div className="bg-card border border-border p-10 rounded-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Log In</h2>
            <p className="text-xs text-text-low mt-1">Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <Input 
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="!h-12 !bg-muted/50 border-border"
            />

            <Input 
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="!h-12 !bg-muted/50 border-border"
            />

            <Button 
              type="submit" 
              text="Log In" 
              className="w-full h-12 text-sm font-bold !rounded-lg shadow-none" 
              loading={isLoading}
              disabled={isLoading}
            />
          </form>

          <div className="mt-10 text-center border-t border-border pt-8">
            <p className="text-sm text-text-low">
              Don't have an account?{' '}
              <span 
                className="text-primary font-bold cursor-pointer hover:text-white transition-colors" 
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* Footer Links (Optional) */}
        <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-widest text-text-low font-bold">
           <a href="#" className="hover:text-primary transition-colors">Privacy</a>
           <a href="#" className="hover:text-primary transition-colors">Terms</a>
           <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
