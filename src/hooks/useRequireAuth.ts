import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { RouteName } from '../navigation/Navigator';

export const useRequireAuth = (navigate: (name: RouteName) => void) => {
  const { user, isBooting } = useApp();

  useEffect(() => {
    if (!isBooting && !user) {
      navigate('Login');
    }
  }, [user, isBooting]);

  return { user } as const;
};

