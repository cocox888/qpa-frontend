'use client';
import type React from 'react';
import { useState, type DragEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import StatsGrid from '@/components/StatsGrid';
import KanbanTaskCreateModal from '@/components/modal/kanbanTaskCreateModal';
import { ToastContainer } from 'react-toastify';
import api from '@/app/api/customApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../reducers/store';
import { fetchKanbanTasks, updateKanbanTaskById, updateKanbanTaskStatusById } from '../reducers/kanbanTasks';
import { KanbanTask } from '@/lib/types';
import Toast from '@/components/toast';

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

interface TaskActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority?: 'high' | 'normal' | 'low';
  dueDate?: string;
  assignees?: string[];
  labels?: string[];
  progress?: number;
  reviewer?: string;
  timeInReview?: string;
  completedDate?: string;
  subtasks?: SubTask[];
  comments?: TaskComment[];
  attachments?: TaskAttachment[];
  activityHistory?: TaskActivity[];
  dependencies?: string[];
  relationatedTasks?: string[];
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: KanbanTask[];
  isCollapsed?: boolean;
  order: number;
  settings?: {
    taskLimit?: number;
    autoComplete?: boolean;
    defaultPriority?: string;
  };
}

const KanbanBoard: React.FC = () => {

  const kanbanTasks = useSelector((state: RootState) => state.kanbanTasks.tasks);
  const dispatch: AppDispatch = useDispatch();
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      color: 'gray',
      tasks: [

      ],
      order: 0
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'blue',
      tasks: [

      ],
      order: 1
    },
    {
      id: 'review',
      title: 'In Review',
      color: 'yellow',
      tasks: [

      ],
      order: 2
    },
    {
      id: 'done',
      title: 'Done',
      color: 'green',
      tasks: [

      ],
      order: 3
    }
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<KanbanTask | null>(null);
  const [loading] = useState(false);
  const [columnCapacity] = useState({
    todo: 10,
    'in-progress': 5,
    review: 8,
    done: 15
  });
  const [isColumnSettingsOpen, setIsColumnSettingsOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  /**
   * update kanbanTask state
   */
  useEffect(() => {
    const updateColumnState = async () => {
      await dispatch(fetchKanbanTasks()); // Guaranteed to run after tasks are fetched
    };
    updateColumnState();
  }, [dispatch]);

  useEffect(() => {
    console.log(kanbanTasks)
    if (kanbanTasks.length > 0) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: kanbanTasks.filter((item, index) => {
            return item.status == column.id;
          })
        }))
      );
    }
  }, [kanbanTasks]);



  const dragItem = useRef<{ taskId: number; sourceColumnId: string } | null>(
    null
  );
  //Handle Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      console.log(e.target.value)
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: kanbanTasks.filter((item, index) => {
            return item.status == column.id && item.title?.includes(e.target.value);
          })
        }))
      );
    } else {
      console.log("asdf");
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: kanbanTasks.filter((item, index) => {
            return item.status == column.id;
          })
        }))
      );
    }
  };

  // Handle drag start
  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    taskId: number,
    sourceColumnId: string
  ) => {
    dragItem.current = { taskId, sourceColumnId };
    e.currentTarget.classList.add('dragging');
  };

  // Handle drag end
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
  };

  // Handle drag over
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    if (!dragItem.current) return;
    const { taskId, sourceColumnId } = dragItem.current;

    if (sourceColumnId === targetColumnId) {
      dragItem.current = null;
      return;
    }

    const role = localStorage.getItem("role");
    api.post(`${role}/updateKanbanTaskStatusById`, { task_id: taskId, updated_status: targetColumnId }).then(() => {
      Toast('success', 'Task status updated successfully');
      dispatch(updateKanbanTaskStatusById({ id: taskId, status: targetColumnId }));

    }).catch((e) => {
      console.log(e);
    })

    setColumns((prevColumns) => {
      const taskToMove = prevColumns
        .find((col) => col.id === sourceColumnId)
        ?.tasks.find((t) => t.id === Number(taskId));
      if (!taskToMove) return prevColumns;


      return prevColumns.map((col) => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== Number(taskId))
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            tasks: [...col.tasks, taskToMove]
          };
        }
        return col;
      });
    });

    dragItem.current = null;
  };

  // Handle task update
  const handleTaskUpdate = (updatedTask: KanbanTask) => {
    console.log(updatedTask)
    const role = localStorage.getItem("role");
    api.post(`${role}/updateKanbanTaskById`, updatedTask).then(() => {
      Toast('success', 'Task updated successfully');
      dispatch(updateKanbanTaskById(updatedTask));

    }).catch((e) => {
      Toast('error', 'Task updated failed');
    })

    setIsDetailModalOpen(false);

  };

  // Handle task delete
  const handleTaskDelete = (taskId: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId)
      }))
    );
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  // Quick actions menu handler
  const handleQuickAction = (action: string, task: KanbanTask) => {
    switch (action) {
      case 'edit':
        setSelectedTask(task);
        setIsDetailModalOpen(true);
        break;
      case 'delete':
        setTaskToDelete(task);
        setIsDeleteModalOpen(true);
        break;
      // Add more actions as needed
    }
  };

  // Add this helper function for column capacity percentage
  const getColumnProgress = (columnId: string, tasksCount: number) => {
    const capacity =
      columnCapacity[columnId as keyof typeof columnCapacity] || 10;
    return (tasksCount / capacity) * 100;
  };

  // Column management functions
  const toggleColumnCollapse = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, isCollapsed: !col.isCollapsed } : col
      )
    );
  };

  const updateColumnSettings = (
    columnId: string,
    settings: Column['settings']
  ) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, settings: { ...col.settings, ...settings } }
          : col
      )
    );
  };

  // Task management functions
  // const addSubtask = (taskId: string, subtask: SubTask) => {
  //   setColumns((prev) =>
  //     prev.map((col) => ({
  //       ...col,
  //       tasks: col.tasks.map((task) =>
  //         task.id === taskId
  //           ? { ...task, subtasks: [...(task.subtasks || []), subtask] }
  //           : task
  //       )
  //     }))
  //   );
  // };

  // Add missing collapse/expand icon JSX
  const collapseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const expandIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );

  // Add missing column settings form handler
  const handleColumnSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedColumn) return;

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const settings = {
      taskLimit: Number(formData.get('taskLimit')),
      autoComplete: Boolean(formData.get('autoComplete')),
      defaultPriority: formData.get('defaultPriority') as string
    };

    updateColumnSettings(selectedColumn.id, settings);
    setIsColumnSettingsOpen(false);
  };

  // Add missing subtask toggle handler
  // const handleSubtaskToggle = (taskId: number, subtaskId: string) => {
  //   setColumns((prev) =>
  //     prev.map((col) => ({
  //       ...col,
  //       tasks: col.tasks.map((task) =>
  //         task.id === taskId
  //           ? {
  //             ...task,
  //             subtasks: task.subtasks?.map((st) =>
  //               st.id === subtaskId ? { ...st, completed: !st.completed } : st
  //             )
  //           }
  //           : task
  //       )
  //     }))
  //   );
  // };

  // Fix column settings modal content
  const renderColumnSettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Column Settings</h2>
        <form onSubmit={handleColumnSettingsSubmit}>
          <div className="space-y-4">
            <div>
              <div className="block text-sm font-medium">Task Limit</div>
              <input
                type="number"
                name="taskLimit"
                defaultValue={selectedColumn?.settings?.taskLimit}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="autoComplete"
                  defaultChecked={selectedColumn?.settings?.autoComplete}
                  className="mr-2"
                />
                <span className="text-sm font-medium">Auto Complete Tasks</span>
              </div>
            </div>
            <div>
              <div className="block text-sm font-medium">Default Priority</div>
              <select
                name="defaultPriority"
                defaultValue={selectedColumn?.settings?.defaultPriority}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsColumnSettingsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="pt-20 pl-64 pr-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="space-y-4 w-full max-w-[1400px]">
          <div className="animate-pulse bg-white rounded-2xl h-48 w-full" />
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl h-[600px]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="pt-20 pl-64 pr-6 min-h-screen bg-gray-50">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Header Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your tasks with ease
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Team Members */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((_, index) => (
                      <Image
                        key={index}
                        width={32}
                        height={32}
                        src="/images/person1.jpg"
                        alt="Team member"
                        className="w-8 h-8 rounded-lg ring-2 ring-white"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-xs text-white font-medium ring-2 ring-white">
                      +5
                    </div>
                  </div>
                  <div className="h-6 w-px bg-gray-200" />
                  <button className="text-sm text-brand-500 font-medium hover:text-brand-600">
                    Manage Team
                  </button>
                </div>

                {/* Action Buttons */}
                <button className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                </button>

                <button className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition-colors"
                  onClick={() => setIsCreateModalOpen(true)}>
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  New Task
                </button>
              </div>
            </div>

            {/* Sprint Progress */}
            <div className="space-y-8">
              <StatsGrid />
            </div>
          </div>

          {/* Filters and Views */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <div className="relative">
                <select className="pl-3 pr-10 py-2 text-sm bg-white border border-gray-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                  <option>All Tasks</option>
                  <option>My Tasks</option>
                  <option>Assigned to Me</option>
                </select>
                <svg
                  className="w-4 h-4 absolute right-3 top-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div> */}

              {/* <div className="flex gap-2">
                <div className="px-3 py-2 text-sm bg-white border border-gray-100 rounded-xl hover:bg-gray-50">
                  <span className="w-2 h-2 inline-block rounded-full bg-red-500 mr-2"></span>
                  High Priority
                </div>
                <div className="px-3 py-2 text-sm bg-white border border-gray-100 rounded-xl hover:bg-gray-50">
                  <span className="w-2 h-2 inline-block rounded-full bg-yellow-500 mr-2"></span>
                  Blocked
                </div>
              </div> */}
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 text-sm bg-white border border-gray-100 rounded-xl hover:bg-gray-50">
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 w-64 text-sm bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  onChange={handleSearch}
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
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
            </div>
          </div>

          {/* Kanban Board Container */}
          <div className="grid grid-cols-4 gap-6 pb-6">
            {columns.map((column) => (
              <div
                key={column.id}
                id={`column-${column.id}`}
                className={`flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 ${column.isCollapsed ? 'w-20' : ''
                  }`}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleColumnCollapse(column.id)}>
                        {column.isCollapsed ? collapseIcon : expandIcon}
                      </button>
                      {!column.isCollapsed && (
                        <>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {column.title}
                          </h3>
                          <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 rounded-full">
                            {column.tasks.length}
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedColumn(column);
                        setIsColumnSettingsOpen(true);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add column capacity progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${getColumnProgress(column.id, column.tasks.length) > 80
                        ? 'bg-red-500'
                        : 'bg-brand-500'
                        }`}
                      style={{
                        width: `${Math.min(
                          getColumnProgress(column.id, column.tasks.length),
                          100
                        )}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {column.tasks.length} tasks
                    </span>
                    <span className="text-xs text-gray-500">
                      {columnCapacity[column.id as keyof typeof columnCapacity]}{' '}
                      max
                    </span>
                  </div>
                </div>

                {!column.isCollapsed && (
                  <div
                    className="flex-1 p-4 space-y-4 overflow-y-auto scroll-smooth"
                    style={{
                      backgroundImage: `
                      linear-gradient(to top, white 0%, transparent 5%),
                      linear-gradient(to bottom, white 0%, transparent 5%)
                    `,
                      backgroundPosition: 'top, bottom',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '100% 20px'
                    }}
                  >
                    {column.tasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                        <svg
                          className="w-12 h-12 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <p className="text-sm">No tasks yet</p>
                        <button className="mt-2 text-xs text-brand-500 hover:text-brand-600">
                          Add a task
                        </button>
                      </div>
                    ) : (
                      column.tasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(e, task.id || 0, column.id)
                          }
                          onDragEnd={handleDragEnd}
                          className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-move"
                          onClick={() => {
                            setSelectedTask(task);
                            setIsDetailModalOpen(true);
                          }}
                        >
                          {/* Quick Actions Menu */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuickAction('menu', task);
                                }}
                                className="p-1 hover:bg-gray-100 rounded-lg"
                              >
                                <svg
                                  className="w-4 h-4 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="p-4">
                            {/* Show priority badges */}
                            {task.priority && (
                              <>
                                {task.priority === 'high' && (
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-lg">
                                      <span className="w-1 h-1 rounded-full bg-red-600" />
                                      High Priority
                                    </span>
                                  </div>
                                )}
                                {task.priority === 'normal' && (
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-lg">
                                      Normal Priority
                                    </span>
                                  </div>
                                )}
                                {task.priority === 'low' && (
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-lg">
                                      Low Priority
                                    </span>
                                  </div>
                                )}
                              </>
                            )}

                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              {task.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-4">
                              {task.description}
                            </p>

                            {/* Show labels if present */}
                            {task.label?.length ? (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {task.label.split(",").map((label, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 text-xs bg-gray-100 rounded-lg text-gray-600"
                                  >
                                    {label}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            {/* Show progress bar if progress exists */}
                            {/* {typeof task.progress === 'number' && (
                              <div className="mb-3">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${task.progress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {task.progress}% done
                                </p>
                              </div>
                            )} */}

                            {/* Show reviewer/timeInReview if present */}
                            {/* {task.reviewer && (
                              <p className="text-xs text-gray-500 mb-1">
                                Reviewer: {task.reviewer}
                              </p>
                            )}
                            {task.timeInReview && (
                              <p className="text-xs text-gray-500 mb-4">
                                Time in review: {task.timeInReview}
                              </p>
                            )} */}

                            <div className="flex items-center justify-between">
                              {/* <div className="flex -space-x-2">
                                {task.assignees?.map((assignee, index) => (
                                  <Image
                                    key={index}
                                    width={32}
                                    height={32}
                                    src="/images/person1.jpg"
                                    alt="Avatar"
                                    className="w-6 h-6 rounded-lg ring-2 ring-white"
                                  />
                                ))}
                              </div> */}

                              <div className="flex items-center gap-2 text-xs text-gray-400">
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
                                <span>{task.due_date}</span>
                              </div>
                              {/* {task.completedDate && (
                                <p className="text-xs text-gray-500 mb-1">
                                  Completed on {task.completedDate}
                                </p>
                              )} */}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column Settings Modal */}
        {isColumnSettingsOpen && selectedColumn && renderColumnSettingsModal()}

        {/* Task Detail Modal */}
        {isDetailModalOpen && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Task Details</h2>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const updatedTask = {
                    ...selectedTask,
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                    priority: formData.get('priority') as
                      | 'high'
                      | 'normal'
                      | 'low',
                    dueDate: formData.get('dueDate') as string,
                    label:
                      formData
                        .get('labels')
                        ?.toString()
                    // .split(',')
                    // .map((label) => label.trim()) || []
                  };
                  handleTaskUpdate(updatedTask);
                }}
              >
                <div className="space-y-4">
                  <div>
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className='text-red-600'>*</span>
                    </div>
                    <input
                      type="text"
                      name="title"
                      defaultValue={selectedTask.title}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className='text-red-600'>*</span>
                    </div>
                    <textarea
                      name="description"
                      defaultValue={selectedTask.description}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Priority <span className='text-red-600'>*</span>
                      </div>
                      <select
                        name="priority"
                        defaultValue={selectedTask.priority}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                      </select>
                    </div>

                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date <span className='text-red-600'>*</span>
                      </div>
                      <input
                        type="date"
                        name="dueDate"
                        defaultValue={selectedTask.due_date}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="block text-sm font-medium text-gray-700 mb-1">
                      Labels (comma-separated) <span className='text-red-600'>*</span>
                    </div>
                    <input
                      type="text"
                      name="labels"
                      defaultValue={selectedTask.label}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsDetailModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>

              {/* Subtasks Section */}
              {/* <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Subtasks</h3>
                <div className="space-y-2">
                  {selectedTask.subtasks?.map((subtask) => (
                    <div key={subtask.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() =>
                          handleSubtaskToggle(selectedTask.id, subtask.id)
                        }
                      />
                      <span>{subtask.title}</span>
                    </div>
                  ))}
                  <button
                    className="text-sm text-brand-500"
                    onClick={() => {
                      const newSubtask: SubTask = {
                        id: 'sub-' + Date.now(),
                        title: 'New Subtask',
                        completed: false
                      };
                      addSubtask(selectedTask.id, newSubtask);
                    }}
                  >
                    + Add Subtask
                  </button>
                </div>
              </div> */}

              {/* Comments Section */}
              {/* <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Comments</h3>
                <div className="space-y-4">
                  {selectedTask.comments?.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <div className="px-4 py-2 bg-brand-500 text-white rounded-lg">
                      Post
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Attachments Section */}
              {/* <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Attachments</h3>
                Attachment list and upload button
              </div> */}

              {/* Activity History */}
              {/* <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Activity History</h3>
                <div className="space-y-2">
                  {selectedTask.activityHistory?.map((activity) => (
                    <div key={activity.id} className="text-sm text-gray-600">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.description}
                      <span className="text-xs text-gray-500 ml-2">
                        {activity.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && taskToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Delete Task</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete &quot;{taskToDelete.title}&quot;?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  // onClick={() => handleTaskDelete(taskToDelete.id)}
                  className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {
          isCreateModalOpen && (
            <KanbanTaskCreateModal closeHandle={setIsCreateModalOpen} />
          )
        }
      </div>
    </>

  );
};

export default KanbanBoard;
