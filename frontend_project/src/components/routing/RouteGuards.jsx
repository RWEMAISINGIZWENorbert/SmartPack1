import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../Spinner';

// 1. Only allows logged-in users (e.g. Dashboard)
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner fullPage={true} />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

// 2. Only allows guests / Logged-out users (e.g. Sign In, Landing)
export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner fullPage={true} />;
  // If already logged in, kick them to dashboard
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
