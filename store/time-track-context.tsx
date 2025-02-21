'use client';
import type React from 'react';
import { createContext, useState } from 'react';

type ContextType = {
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

export const TimeTrackContext = createContext<ContextType | null>(null);

export const TimeTrackProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(0);
  const [taskId, setTaskId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [clientId, setClientId] = useState(0);

  return (
    <TimeTrackContext.Provider
      value={{
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
      }}
    >
      {children}
    </TimeTrackContext.Provider>
  );
};
