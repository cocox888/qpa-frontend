'use client';

import type { AppDispatch, RootState } from '@/app/client/reducers/store';
import { getAllTasks } from '@/app/client/reducers/tasks';
import EditTaskModal, { type TaskItem } from '@/components/modal/editTaskModal';
import TasklistItem from '@/components/ClientComponent/TasklistItem';
import { useTotalTime } from '@/hooks/useTotalTime';
import { isNonEmptyArray } from '@/lib/utils/functions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

export default function Projects() {
  const [editModal, setEditModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(false);
  const [filter, setFilter] = useState(false);

  const [taskData, setTaskData] = useState<TaskItem>({
    task_id: 0,
    title: '',
    project: '',
    hours: '',
    members: 0,
    state: '',
    time: '',
    company: '',
    startTime: ''
  });
  const dispatch: AppDispatch = useDispatch();
  const taskCounts = useSelector((state: RootState) => state.tasks.taskCounts);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const { totalTime, setTotalTime } = useTotalTime();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    dispatch(getAllTasks());
    setCount(false);
  }, [dispatch, count, editModal]);

  useEffect(() => {}, [filter]);

  const handleTask = (i: number, data: TaskItem) => {
    setIndex(i);
    setTaskData(data);
    setEditModal(true);
  };

  return (
    <div className="pt-20 pl-64 pr-6 pb-20 h-screen w-screen overflow-x-hidden">
      <ToastContainer />
      <div className=" mx-auto space-y-6">
        {/* <!-- Header Section --> */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Task List</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track your tasks across all projects
            </p>
          </div>
        </div>

        {/* <!-- Main Content --> */}
        <div className="bg-white rounded-xl border border-gray-100">
          {/* <!-- Filters Bar --> */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  data-filter="all"
                  className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-lg ${
                    filter ? ' text-gray-600' : 'text-brand-500  bg-brand-50'
                  }`}
                  onClick={() => setFilter(false)}
                >
                  All Tasks
                  <span
                    data-all-count
                    className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
                  >
                    {taskCounts.allTasksNum}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    data-search-input
                    className="w-64 h-10 pl-10 pr-4 text-sm bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-brand-500/20"
                  />
                  <svg
                    className="w-4 h-4 absolute left-3 top-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div
                  data-filter-btn
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tasks.map((item, index: number) => (
              <TasklistItem
                key={index}
                id={item.id || 0}
                title={String(item.title)}
                project={String(item.taskProject?.title)}
                hours={item.estimated_time || 0}
                state={item.state || ''}
                time={item.due_date || ''}
                members={item.assignedTaskUser}
                company={item.taskClient?.business_name || 'Undefined'}
                startTime={'Started: Oct 15, 2024'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
