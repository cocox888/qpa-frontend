'use client';
import ButtonSecondary from '@/components/button/buttonSecondary';
import MemberCard from '@/components/card/memberCard';
import { ProjectCard } from '@/components/card/projectCard';
import RevenueCard from '@/components/card/revenueCard';
import { TaskCard } from '@/components/card/taskCard';
import ActivityChart from '@/components/charts/LineChart';
import ClientTable from '@/components/table/clientTable';
import EmployeeTable from '@/components/table/employeeTable';
import ProjectTable from '@/components/table/projectTable';
import TaskTable from '@/components/table/taskTable';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../reducers/store';
import { getAllProjects } from '../reducers/projects';
import { getAllTasks } from '../reducers/tasks';
import api from '@/app/api/customApi';
import { type TypeChartData, TypeUser } from '@/lib/types';
import { getAllClients } from '../reducers/clients';
import { getAllMembers } from '../reducers/users';

export default function Dashboard() {
  const dispatch: AppDispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const projectCounts = useSelector(
    (state: RootState) => state.projects.projectCounts
  );
  const taskCounts = useSelector((state: RootState) => state.tasks.taskCounts);
  const clients = useSelector((state: RootState) => state.clients.clients);
  const users = useSelector((state: RootState) => state.users.users);
  /**
   * State & Refs
   */
  const [index, setIndex] = useState(0);

  /**
   * Hook Functions
   */
  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllTasks());
    dispatch(getAllMembers());
    dispatch(getAllClients());
  }, []);

  /**
   * Handlers & Event Functions
   */
  const handleIndex = (index: number) => {
    setIndex(index);
  };

  return (
    <>
      <div className="py-20 pl-64 pr-6 w-screen min-h-screen overflow-x-hidden">
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <RevenueCard /> */}
            <ProjectCard {...projectCounts} />
            <TaskCard {...taskCounts} />
            <MemberCard />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-x-auto">
            <div className="border-b border-gray-100  sticky top-0 bg-white">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <ButtonSecondary
                    title="Employees"
                    count={users.length}
                    onClick={handleIndex}
                    index={0}
                    isActive={index === 0}
                  />
                  <ButtonSecondary
                    title="Projects"
                    count={projects.length}
                    onClick={handleIndex}
                    index={1}
                    isActive={index === 1}
                  />
                  <ButtonSecondary
                    title="Tasks"
                    count={tasks.length}
                    onClick={handleIndex}
                    index={2}
                    isActive={index === 2}
                  />
                  <ButtonSecondary
                    title="Clients"
                    count={clients.length}
                    onClick={handleIndex}
                    index={3}
                    isActive={index === 3}
                  />
                </div>

                {/* <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-64 h-9 pl-9 pr-4 text-sm bg-gray-50 border-none rounded-lg bg-white/50 border border-gray-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all duration-300"
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

                  <button className="h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-green-700 transition-colors">
                    Add New
                  </button>
                </div> */}
              </div>
            </div>

            {index === 0 ? (
              <EmployeeTable data={users} />
            ) : index === 1 ? (
              <ProjectTable data={projects} />
            ) : index === 2 ? (
              <TaskTable data={tasks} />
            ) : index === 3 ? (
              <ClientTable data={clients} />
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
