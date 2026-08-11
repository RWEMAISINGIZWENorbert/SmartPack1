import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { snackbar } from '../Snackbar';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      snackbar.error('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      snackbar.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await authService.signUp(formData);
      if (result.success) {
        snackbar.success('Account created successfully!');
        navigate('/signin');
      }
    } catch (err) {
      snackbar.error(err.message || 'Registration failed');
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
          <p className="text-text-low mt-4 font-medium">Join the next generation of payroll management.</p>
        </div>

        {/* Central Card Container */}
        <div className="bg-card border border-border p-10 rounded-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Sign Up</h2>
            <p className="text-xs text-text-low mt-1">Create an account to manage your workforce.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
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

            <Input 
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              error={errors.confirmPassword}
              className="!h-12 !bg-muted/50 border-border"
            />

            <Button 
              type="submit" 
              text="Create Account" 
              className="w-full h-12 text-sm font-bold !rounded-lg shadow-none" 
              loading={isLoading}
              disabled={isLoading}
            />
          </form>

          <div className="mt-10 text-center border-t border-border pt-8">
            <p className="text-sm text-text-low">
              Already have an account?{' '}
              <span 
                className="text-primary font-bold cursor-pointer hover:text-white transition-colors" 
                onClick={() => navigate('/signin')}
              >
                Log In
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

export default SignUp;
