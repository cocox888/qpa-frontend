'use client';

import { type FormEvent, useEffect, useState } from 'react';
import {
  type TypeProject,
  type TypeTask,
  type TypeTimeTrack,
  TypeUser
} from '@/lib/types';
import { PlayIcon, PauseIcon } from 'lucide-react';
import { useTimerContext, useTimeTrackContext } from '@/hooks/use-store-hooks';
import {
  differenceInHours,
  differenceInMinutes,
  endOfDay,
  isSameDay,
  startOfDay
} from 'date-fns';
import { toast } from 'react-toastify';
import CurrentTracks from '@/components/timer/CurrentTracks';
import { client } from '@/lib/utils/customAxios';
import { useDispatch, useSelector } from 'react-redux';
import { isNonEmptyArray } from '@/lib/utils/functions';
import StopWatch from '@/components/timer/StopWatch';
import { getAllProjects } from '../reducers/projects';
import type { AppDispatch, RootState } from '../reducers/store';
const Timer = () => {
  const [filter, setFilter] = useState(0);
  const currentTrack = useTimeTrackContext();
  const timerContext = useTimerContext();
  const MAX_DURATION = 24;
  const dispatch: AppDispatch = useDispatch();
  const projectCounts = useSelector(
    (state: RootState) => state.projects.projectCounts
  );
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [tasks, setTasks] = useState<TypeTask[]>([]);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const startTimer = async () => {
    timerContext.setTimer(true);
    currentTrack.setStartTime(new Date());
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setTasks(
      projects.find((project) => project.id === currentTrack.projectId)
        ?.projectTask || []
    );
    const project = projects.find(
      (project) => project.id === currentTrack.projectId
    );
    if (isNonEmptyArray(project?.requestedProjectClient))
      currentTrack.setClientId(project?.requestedProjectClient[0].id || 0);
    currentTrack.setUserId(Number(userId));
  }, [currentTrack.projectId]);

  const resetForm = () => {
    currentTrack.setTitle('');
    currentTrack.setProjectId(0);
    currentTrack.setTaskId(0);
    currentTrack.setUserId(0);
    currentTrack.setClientId(0);
    currentTrack.setStartTime(null);
  };

  const createTimeTrack = (startDate: Date, endDate: Date) => {
    let requestData: TypeTimeTrack = {
      title: currentTrack.title.trim() || '(no description)',
      start_time: startDate,
      end_time: endDate,
      estimated_time: differenceInMinutes(endDate, startDate)
    };
    if (currentTrack.projectId) {
      requestData = { ...requestData, projectId: currentTrack.projectId };
    }
    if (currentTrack.clientId) {
      requestData = { ...requestData, clientId: currentTrack.clientId };
    }
    if (currentTrack.userId) {
      requestData = { ...requestData, userId: currentTrack.userId };
    }
    if (currentTrack.taskId) {
      requestData = { ...requestData, taskId: currentTrack.taskId };
    }
    return requestData;
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (currentTrack.projectId === 0) toast('Set Project You are working!');
    if (currentTrack.taskId === 0) toast('Set Task You are working!');
    if (currentTrack.projectId !== 0 && currentTrack.taskId !== 0) {
      let startDate = currentTrack.startTime || new Date();
      const endDate = new Date();
      timerContext.setTimer(false);

      if (differenceInHours(endDate, startDate) > MAX_DURATION) {
        toast.error(
          `Recording failed: The maximum allowed duration of ${MAX_DURATION} hours has been exceeded.`
        );
        resetForm();
        return;
      }

      const tracks = [];
      if (!isSameDay(startDate, endDate)) {
        const endOfLocalDay = endOfDay(startDate);
        const startOfNextLocalDay = startOfDay(endDate);

        tracks.push(createTimeTrack(startDate, endOfLocalDay));
        startDate = startOfNextLocalDay;
      }
      tracks.push(createTimeTrack(startDate, endDate));
      console.log(tracks);
      try {
        for (const track of tracks) {
          const res = await client(
            `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/setTimeTrack`,
            {
              body: JSON.stringify(track)
            }
          );
        }
        toast.success('Time track recorded successfully!');
      } catch (error) {
        toast.error(
          'Oops! There was a problem recording the time track. Please try again.'
        );
      }
      resetForm();
    }
  };

  return (
    <div className="pt-20 pl-64 pr-6 min-h-screen w-screen overflow-x-hidden">
      <div className="py-4 bg-green-100 border rounded-xl">
        <form
          onSubmit={submitHandler}
          className="flex flex-row h-[40px] font-mono font-md rounded-md border border-grey-400"
        >
          <input
            name="title"
            type="text"
            placeholder="What are you working on?"
            value={currentTrack.title}
            onChange={(event) => currentTrack.setTitle(event.target.value)}
            className="w-1/2 border rounded-lg px-4"
          />
          <div className="px-4 h-[40px] content-center">
            <select
              id="project"
              name="project"
              value={currentTrack.projectId}
              required
              className="bg-red-300 border rounded-md"
              onChange={(e) => {
                const val = Number(e.target.value);
                currentTrack.setProjectId(val);
              }}
            >
              <option value={0}>Select Project</option>
              {projects.map((project: TypeProject, index: number) => {
                return (
                  <option key={index} value={project.id}>
                    {project.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="px-4 h-[40px]  content-center">
            <select
              id="project"
              name="project"
              className="bg-green-300 border rounded-md"
              value={currentTrack.taskId}
              required
              onChange={(e) => {
                const val = Number(e.target.value);
                currentTrack.setTaskId(val);
              }}
            >
              <option value={0}>Select Client</option>
              {isNonEmptyArray(tasks) &&
                tasks.map((task: TypeTask, index: number) => {
                  return (
                    <option key={index} value={task.id}>
                      {task.title}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="px-4 h-[40px]  content-center">
            <StopWatch />
          </div>
          <div className="ml-4 pt-1 px-2 content-center border rounded-lg bg-blue-500">
            {!timerContext.timer && (
              // biome-ignore lint/a11y/useButtonType: <explanation>
              <button onClick={startTimer} aria-label="Start timer">
                <PlayIcon />
              </button>
            )}
            {timerContext.timer && (
              <button type="submit" aria-label="Stop timer">
                <PauseIcon />
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="w-full my-4">
        <CurrentTracks />
      </div>
    </div>
  );
};

export default Timer;
