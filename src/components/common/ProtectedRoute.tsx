import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAlchemyAuth } from '@src/lib/hooks/useAlchemyAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isConnected } = useAlchemyAuth();


  if (!isConnected) {
    return <Navigate to="" replace />;
  }
  
  return <>{children}</>;
}; 