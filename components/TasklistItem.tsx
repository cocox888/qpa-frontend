'use client';

import { PauseIcon, PlayIcon } from 'lucide-react';
import Image from 'next/image';
import { useTimerContext } from '@/hooks/use-store-hooks';
import StopWatch from './timer/StopWatch';
import { useDispatch, useSelector } from 'react-redux';
import { addRecord } from '@/reducer/timerReducer';
import { useEffect } from 'react';
import { RootState } from '@/reducer';
import customFetch from '@/lib/api/customFetch';

interface TasklistItemProps {
  id: number;
  title: string;
  project: string;
  hours: number;
  members: number;
  state: string;
  time: string;
  company: string;
  startTime: string;
  isMyTask: boolean;
  onDetail: (param1: number, param2: object) => void;
  onDelete: (id: number) => void;
}

const TasklistItem: React.FC<TasklistItemProps> = ({
  onDetail,
  onDelete,
  id,
  title,
  project,
  hours,
  members,
  state,
  time,
  company,
  startTime,
  isMyTask
}) => {
  const data = {
    task_id:id,
    title: title,
    project: project,
    hours: hours,
    members: members,
    state: state,
    time: time,
    company: company,
    startTime: startTime
  };

  const timerContext = useTimerContext();
  const dispatch = useDispatch();


  return (
    <>
      <div
        className="task-item p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all"
        data-task-id="1"
      >
        <div className="space-y-3">
          {/* <!-- Top Row --> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <input
                type="checkbox"
                className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
              /> */}
              <div>
                <h3
                  className={`task-title font-medium text-gray-900 ${state === 'Completed' ? 'line-through' : ''
                    }`}
                >
                  <span className='text-lg'>Task Title:</span> {title}
                </h3>
                <p className="task-project text-sm text-gray-500">Project Title:  {project}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-500">{Math.floor(hours / 60) }h : {hours % 60}m</span>
              </div>
              <div className="flex -space-x-2">
                {Array.from({ length: members }, (_, index) => index + 1).map(
                  (item, index) => {
                    return (
                      <Image
                        key={index}
                        src="/images/person1.jpg"
                        alt="user"
                        width={100}
                        height={100}
                        className="w-8 h-8 rounded-lg ring-2 ring-white object-cover"
                      />
                    );
                  }
                )}
              </div>
              <span
                className={`px-2.5 py-1 text-xs font-medium ${state === 'In Progress'
                  ? 'bg-yellow-50 text-yellow-700 '
                  : 'bg-green-50 text-green-700'
                  }  rounded-lg`}
              >
                Completed
              </span>
              {/* <span className="text-sm text-gray-500">{time}</span> */}
            </div>
          </div>

          {/* <!-- Bottom Row --> */}
          <div className="flex items-center justify-between text-sm pl-11">
            <div className="flex items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/person1.jpg"
                    alt="TechCorp Inc"
                    width={100}
                    height={100}
                    className="w-6 h-6 rounded-lg ring-1 ring-gray-100 object-cover"
                  />
                  <span>{company}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Due Date: {time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* {state === 'Completed' ? (
                // biome-ignore lint/a11y/useButtonType: <explanation>
                <button
                  className="p-1.5 text-gray-500 bg-gray-100 rounded-lg text-xs font-medium"
                  disabled
                >
                  Completed
                </button>
              ) : (
                <div className="flex flex-row">
                  <div className="px-4 h-[40px]  content-center text-blue-500">
                    {timerContext.taskId === id ||
                      timerContext.timer === false ? (
                      <StopWatch id={id} />
                    ) : (
                      <div className="text-red-500 font-serif">
                        You have to finish the working for previous task.
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row ml-4 content-center border rounded-lg">
                    {(!timerContext.timer) && (
                      <button
                        disabled={!isMyTask}
                        onClick={startTimer}
                        aria-label="Start timer"
                        className="flex disabled:bg-gray-500 flex-row p-1.5 text-white bg-primary rounded-lg text-xs font-medium items-center gap-1"
                      >
                        Start Timer
                        <PlayIcon size={20} />
                      </button>
                    )}
                    {timerContext.timer && (
                      <button
                        onClick={stopTimer}
                        aria-label="Stop timer"
                        disabled={timerContext.taskId !== id}
                        className="flex flex-row p-1.5 text-white bg-primary rounded-lg text-xs font-medium items-center"
                      >
                        Stop Timer
                        <PauseIcon size={20} />
                      </button>
                    )}
                  </div>
                </div>
              )} */}

              <button
                className="task-edit-btn p-1.5 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50"
                onClick={() => onDetail(1, data)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(id)}
                className="task-delete-btn p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasklistItem;
