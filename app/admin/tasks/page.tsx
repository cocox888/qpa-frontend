'use client';

import type { AppDispatch, RootState } from '@/app/admin/reducers/store';
import { getAllTasks } from '@/app/admin/reducers/tasks';
import EditTaskModal, { type TaskItem } from '@/components/modal/editTaskModal';
import TasklistItem from '@/components/TasklistItem';
import { useTotalTime } from '@/hooks/useTotalTime';
import { isNonEmptyArray } from '@/lib/utils/functions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { getAllProjects } from '../reducers/projects';

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
  const myTasks = useSelector((state: RootState) => state.tasks.myTasks);

  const { totalTime, setTotalTime } = useTotalTime();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    dispatch(getAllProjects());
    setCount(false);
  }, [dispatch, count, editModal]);

  useEffect(() => {

  }, [filter]);


  const handleTask = (i: number, data: TaskItem) => {
    setIndex(i);
    setTaskData(data);
    setEditModal(true);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/deleteTask?taskId=${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      }
    );
    const res = await response.json();
    toast(res.message);
    setCount(true);
  };

  return (
    <div className="pt-20 pl-64 pr-6 min-h-screen w-screen overflow-x-hidden">
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
          <button

            onClick={() => handleTask(0, {})}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Task
          </button>
        </div>

        {/* <!-- Stats Cards --> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SimpleCard2
            count={taskCounts.pending}
            title="Pending"
            icon={PendingIcon}
            color="blue"
          />
          <SimpleCard2
            count={taskCounts.inProgress}
            title="In Progress"
            icon={ProgressIcon}
            color="yellow"
          />
          <SimpleCard2
            count={taskCounts.completed}
            title="Completed"
            icon={CompleteIcon}
            color="green"
          />
          <SimpleCard2
            count={taskCounts.dueToday}
            title="Due Today"
            icon={DueIcon}
            color="purple"
          />
        </div> */}

        {/* <!-- Main Content --> */}
        <div className="bg-white rounded-xl border border-gray-100">
          {/* <!-- Filters Bar --> */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  data-filter="all"
                  className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-lg ${filter ? " text-gray-600" : "text-brand-500  bg-brand-50"}`}
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
                <div
                  data-filter="my"
                  className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-lg ${filter ? "text-brand-500  bg-brand-50" : " text-gray-600"}`}
                  onClick={() => setFilter(true)}
                >
                  My Tasks
                  <span
                    data-my-count
                    className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
                  >
                    {taskCounts.myTaskNum}
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
          {/* <!-- Task List --> */}
          <div className="p-4 space-y-2">
            {

              (!filter ? tasks : myTasks)?.map((item, index: number) => {

                const isMyTask = myTasks.reduce((acc, item1) => {
                  const temp = item1.id == item.id ? 1 : 0;
                  return acc + temp;
                }, 0) >= 1;

                return (
                  <TasklistItem
                    key={index}
                    isMyTask={isMyTask}
                    id={item.id || 0}
                    title={String(item.title)}
                    project={String(item.taskProject?.title)}
                    hours={item.estimated_time || 0}
                    state={item.state || ''}
                    time={item.due_date || ''}
                    members={item.assignedTaskUser?.length || 0}
                    company={
                      item.taskClient?.business_name || "Undedined"
                    }
                    startTime={'Started:Oct 15,2024'}
                    onDetail={handleTask}
                    onDelete={handleDelete}
                  />
                );
              })

            }
          </div>
        </div>
      </div>
      {editModal ? (
        <>
          <EditTaskModal
            closeModal={() => setEditModal(false)}
            flag={index}
            data={taskData}
          />
          <button
            id="taskModalOverlay"
            className="active modal-overlay fixed inset-0 bg-black/50 z-[100] transition-all duration-300"
            onClick={() => setEditModal(false)}
          >
            &nbsp;
          </button>
        </>
      ) : (
        <></>
      )}

    </div>
  );
}
