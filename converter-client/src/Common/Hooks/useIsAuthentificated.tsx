import { useEffect } from 'react';
import { useAuthContext } from '../Providers/AuthContext';

export const useAuthentificatedPage = () => {
  const { isLoading, isAuthentification, clearAuthInfo, ...rest } =
    useAuthContext();

  useEffect(() => {
    if (!isLoading && !isAuthentification) {
      clearAuthInfo();
      window.location.href = '/';
    }
  }, [isLoading, isAuthentification]);

  return { isLoading, isAuthentification, ...rest };
};
