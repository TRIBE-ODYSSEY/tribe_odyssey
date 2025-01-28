import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@src/lib/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectPath = '/connect'
}) => {
  const { isConnected } = useAuth();
  const location = useLocation();

  if (!isConnected) {
    return (
      <Navigate 
        to={redirectPath} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }
  
  return <>{children}</>;
}; 