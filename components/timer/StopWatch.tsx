'use client';

import React from 'react';
import { formatDuration } from '@/lib/utils/date';
import { useTimerContext } from '@/hooks/use-store-hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducer';

const StopWatch = ({id}:{id:number}) => {
  const { time, taskId, timer } = useTimerContext();
  const currentTime = useSelector((state: RootState) => state?.timer?.records[taskId]) || 0;
  const currentTime_id = useSelector((state: RootState) => state?.timer?.records[id]) || 0;
  console.log(taskId)
  const value = formatDuration(time + currentTime);
  if (timer){
    return <div>{value}</div>;
  }else{
    return <div>{formatDuration(currentTime_id)}</div>
  }

};

export default StopWatch;
