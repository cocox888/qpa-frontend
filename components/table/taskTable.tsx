'use client';
import type { TypeTask } from '@/lib/types';
import Image from 'next/image';
import React, { useState, useEffect, FC } from 'react';

interface TaskTableProps {
  tasks: TypeTask[];
}

export const TaskTable: FC<TaskTableProps> = ({ tasks }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: event.target.checked
    }));
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setIsSelectAllChecked(isChecked);

    const updatedCheckedItems = tasks.reduce(
      (acc, task) => ({ ...acc, [task.id]: isChecked }),
      {} as { [key: number]: boolean }
    );

    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    const allChecked =
      tasks.length > 0 && tasks.every((task) => checkedItems[task.id]);
    setIsSelectAllChecked(allChecked);
  }, [checkedItems, tasks]);

  return (
    <div id="tasks-panel" role="tabpanel">
      <table className="w-full border-spacing-0">
        <thead>
          <tr>
            <th className="w-12 p-4 bg-gray-50/50">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                checked={isSelectAllChecked}
                onChange={handleSelectAllChange}
              />
            </th>
            {[
              'Task',
              'Assignee',
              'Priority',
              'Due Date',
              'Project',
              'Status'
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                  {header}
                  <svg
                    className="w-4 h-4 text-gray-400"
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
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <tr key={task.id} className="table-row-hover">
              <td className="p-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  checked={checkedItems[task.id] || false}
                  onChange={(e) => handleCheckboxChange(e, task.id)}
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-medium text-gray-900">{task.title}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {task?.assignedTaskUser?.map((item, index) => {
                    return (
                      <>
                        <img
                          key={item.id}
                          src="/images/person1.png"
                          alt=""
                          className="w-8 h-8 rounded-lg ring-2 ring-white object-cover transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                        />
                        {/* <span className="text-gray-600">{item.full_name}</span> */}
                      </>
                    );
                  })}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.priority === 'high'
                      ? 'bg-red-50 text-red-700'
                      : task.priority === 'medium'
                      ? 'bg-green-50 text-green-700'
                      : task.priority === 'low'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-gray-50 text-gray-700' // Default case
                  }`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">{task.due_date}</td>
              <td className="px-4 py-3 text-gray-600">
                {task.taskProject?.title}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      task.status === 'In Review'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  ></div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.status === 'In Review'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {task.state}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
