'use client';
import type React from 'react';
import { createContext, useEffect, useState } from 'react';
import { useTimer } from '@/hooks/use-timer';
import { formatDurationWithUnits } from '@/lib/utils/date';
import { useDispatch, useSelector } from 'react-redux';
import { addRecord } from '@/reducer/timerReducer';
import { RootState } from '@/reducer';

type ContextType = {
  time: number;
  timer: boolean;
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
  documentTitle: string;
  startTime: Date | null;
  setStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  projectId: number;
  setProjectId: React.Dispatch<React.SetStateAction<number>>;
  taskId: number;
  setTaskId: React.Dispatch<React.SetStateAction<number>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  clientId: number;
  setClientId: React.Dispatch<React.SetStateAction<number>>;
};

export const TimerContext = createContext<ContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  // const timerState = useTimer();


  const [startTime, setStartTime] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(0);
  const [taskId, setTaskId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [clientId, setClientId] = useState(0);
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState(0);

  const documentTitle = `${formatDurationWithUnits(
    time
  )} • Time Tracker`;

  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let totalTime = 0;
    // const currentTime = useSelector((state:RootState)=>state?.timer?.records[taskId])
    if (timer) {
      const currentStartDate = new Date();
      intervalId = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor(
          (now.getTime() - currentStartDate.getTime()) / 1000
        );
        totalTime = elapsed;
        setTime(elapsed);
      }, 1000);

      return () => {
        if (intervalId) clearInterval(intervalId);

        const id = dispatch(addRecord({
          id: taskId,
          value: totalTime
        }));
        console.log(taskId + " " + totalTime)
        setTime(0);
        totalTime = 0;
      };
    }
  }, [timer]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (timer) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timer]);


  return (
    <TimerContext.Provider value={{
      time,
      setTimer,
      timer,
      documentTitle,
      startTime,
      setStartTime,
      title,
      setTitle,
      projectId,
      setProjectId,
      taskId,
      setTaskId,
      userId,
      setUserId,
      clientId,
      setClientId
    }}>
      {children}
    </TimerContext.Provider>
  );
};
