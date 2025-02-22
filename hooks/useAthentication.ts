import { AuthenticationContext } from '@/providers/AuthenticationProvider';
import { useContext } from 'react';

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (context === null)
    throw new Error('useAuthentication must be used within a AuthenticationProvider');

  return context;
};

