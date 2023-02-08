import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from './AuthProvider';

interface ProtectedRoutesProps {
  children: React.ReactNode;
  isAllowed: boolean;
}

function ProtectedRoutes({ children, isAllowed }: ProtectedRoutesProps) {
  const authContext = useContext(AuthContext);
  const { user, isLoading } = authContext;

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!isAllowed) {
    return <Navigate to='/home/CreateAccount' replace />;
  }
  return children;
}

export default ProtectedRoutes;
