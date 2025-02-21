import { TimeTrackContext } from '@/store/time-track-context';
import { TimerContext } from '@/store/timer-context';
import { useContext } from 'react';

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === null)
    throw new Error('useTimerContext must be used within a TimerProvider');

  return context;
};

