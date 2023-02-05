import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from './AuthProvider';

interface ProtectedRoutesProps {
  children: React.ReactNode;
  isAllowed: boolean;
  roles?: 'admin' | 'creator';
}

function ProtectedRoutes({ children, isAllowed, roles }: ProtectedRoutesProps) {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  if (!isAllowed) {
    let hasLocalStorageUser = false;
    if (localStorage.getItem('storageId')) {
      hasLocalStorageUser = true;
    }
    console.log('roles', roles);
    if (roles === 'admin') {
      const theRoles = localStorage.getItem('storageAdmin');
      console.log(theRoles);
      if (theRoles === 'undefined') {
        hasLocalStorageUser = false;
      }
    }
    if (!hasLocalStorageUser) {
      console.log(
        'Attempting to access a secure route. Please authenticate first.'
      );
      return <Navigate to='/home/CreateAccount' replace />;
    }
  }
  return children;
}

export default ProtectedRoutes;
