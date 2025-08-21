import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
export const useRequireAuth = (navigate: (name: string) => void) => {
  const { user, isBooting } = useApp();

  useEffect(() => {
    if (!isBooting && !user) {
      navigate('Login');
    }
  }, [user, isBooting]);

  return { user } as const;
};

