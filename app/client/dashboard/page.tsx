'use client';
import { getAllProjects } from '@/app/client/reducers/projects';
import ButtonSecondary from '@/components/button/buttonSecondary';
import { ProjectTable } from '@/components/table/projectTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../reducers/store';
import { ProjectCard } from '@/components/card/projectCard';
import { getAllTasks } from '../reducers/tasks';
import { TaskCard } from '@/components/card/taskCard';
import { TaskTable } from '@/components/table/taskTable';

export default function Dashboard() {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  const projects = useSelector((state: RootState) => state.projects.projects);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const projectCounts = useSelector(
    (state: RootState) => state.projects.projectCounts
  );
  const taskCounts = useSelector((state: RootState) => state.tasks.taskCounts);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllTasks());
  }, []);

  const handleIndex = (index: number) => {
    setIndex(index);
  };

  return (
    <>
      <div className="py-20 pl-64 pr-6 w-screen min-h-screen overflow-x-hidden">
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard {...projectCounts} />
            <TaskCard {...taskCounts} />
          </div>

          {/* <div className="flex flex-col stats-card gradient-border card-shine p-6 rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Activity Overview
                </h3>
                <p className="text-sm text-gray-500">
                  Monthly performance metrics
                </p>
              </div>
              <select className="px-4 py-2 rounded-xl bg-gray-50 text-sm font-medium text-gray-600 border-none focus:ring-2 focus:ring-brand-500/20">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="w-100 h-[300]" id="chart">
              <ActivityChart />
            </div>
          </div> */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-x-auto">
            <div className="border-b border-gray-100">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <ButtonSecondary
                    title="Projects"
                    count={projects.length}
                    onClick={handleIndex}
                    index={0}
                    isActive={index === 0}
                  />
                  <ButtonSecondary
                    title="Tasks"
                    count={tasks.length}
                    onClick={handleIndex}
                    index={1}
                    isActive={index === 1}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-64 h-9 pl-9 pr-4 text-sm bg-gray-50 border-none rounded-lg bg-white/50 border border-gray-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all duration-300"
                    />
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
            </div>

            {index === 0 ? (
              <ProjectTable projects={projects} />
            ) : index === 1 ? (
              <TaskTable tasks={tasks} />
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
