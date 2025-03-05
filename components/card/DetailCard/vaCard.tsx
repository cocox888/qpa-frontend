// import ProjectDetailModal from "@/components/modal/projectDetailsModal";
// import { useState } from "react";
'use client';

import api from '@/app/api/customApi';
import type { ProjectData } from '@/components/modal/projectDetailsModal';
import type { TypeProject } from '@/lib/types';
import { isNonEmptyArray } from '@/lib/utils/functions';
import { convertMin2HourFixed, convertMin2HourMin } from '@/lib/utils/time';
import { time } from 'console';
import { useEffect, useState } from 'react';

interface VACardProps {
  onClick: (param1: number, param2?: TypeProject) => void;
  project?: TypeProject;
}

const VACard: React.FC<VACardProps> = ({ onClick, project }) => {
  const [timeSpentToProject, setTimeSpentToProject] = useState(0);
  const [timeSpentToday, setTimeSpentToday] = useState(0);
  const [timeSpentWeek, setTimeSpentWeek] = useState(0);

  // const data: ProjectData = {
  //   projectTitle: project?.title || '',
  //   clientName:
  //     (isNonEmptyArray(project?.requestedProjectClient) &&
  //       project?.requestedProjectClient[0].full_name) ||
  //     '',
  //   status: project?.state || '',
  //   dates: { due: '', renewal: '', start: project?.start_date || '' },
  //   type: project?.package_type || '',
  //   progress: { used: 12, total: 20, percent: Math.floor((12 / 20) * 100) },
  //   teamMembers: project?.assignedProjectUser,
  //   details: {
  //     servicesProvided: project?.services?.split(','),
  //     hourlyRate: `${project?.rate}/hr`,
  //     monthlyHours: `${project?.monthly_hours} hours`,

  //     packageLevel: project?.package_level,
  //     postsPerWeek: '7 posts',
  //     platforms: project?.platforms?.split(','),
  //     projectType: project?.package_type,
  //     currentPhase: 'Current Phase',
  //     technologies: project?.technology?.split(','),
  //     managementAreas: [
  //       'Project Management',
  //       'Team Coordination',
  //       'Process Optimization'
  //     ],

  //   },
  //   timeSpentData: {
  //     timeSpentToday: timeSpentToday,
  //     timeSpentWeek: timeSpentWeek
  //   },
  //   totalTime: project?.monthly_hours
  // };

  // useEffect(() => {
  //   try {
  //     const res = api.post('/admin/getTimeDataForProject', JSON.stringify({ project_id: project?.id }))
  //       .then((response) => {
  //         // Handle successful response here
  //         console.log('Data received:', response.data);
  //         setTimeSpentToday(response.data.response.data.totalTimeForDay);
  //         setTimeSpentWeek(response.data.response.data.totalTimeForWeek);
  //         // You can also use the data to update state or perform other actions
  //       })
  //       .catch((error) => {
  //         // Handle error here
  //         console.error('Error fetching time data for project:', error);
  //       });

  //   } catch (e) {

  //   }

  // }, []);

  return (
    <>
      <div className="bg-white flex flex-col justify-between rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 h-96">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  className="w-5 h-5 text-blue-500"
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
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">
                    {project?.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">
                    {project?.package_type?.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {project?.projectClient?.full_name || ""}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              {project?.project_phase}
            </span>
          </div>

          {/* <!-- Hours Tracking --> */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Monthly Hours</span>
                <span className="text-gray-900 font-medium">
                  {convertMin2HourFixed(Number(project?.totalTimeForMonth))}/
                  {project?.monthly_hours} hrs
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{
                    width: `${((Number(project?.totalTimeForMonth) / 60 || 0) /
                      (project?.monthly_hours || 1)) *
                      100
                      }%`
                  }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Current Week</span>
                <span className="text-gray-900 font-medium">
                  {convertMin2HourMin(Number(project?.totalTimeForWeek))} Used
                </span>
              </div>
              {/* <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Start Timer
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                  Add Time Log
                </button>
              </div> */}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Assigned Team Members</span>

              <div className="flex -space-x-2">
                {project?.assignedProjectUser?.map((item, index) => {
                  return (
                    <img
                      key={item.id}
                      src="/images/person1.png"
                      alt=""
                      className="w-8 h-8 rounded-lg ring-2 ring-white object-cover transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                    />
                  );
                })}

                {/* <div className="w-8 h-8 rounded-lg bg-gray-100 ring-2 ring-white flex items-center justify-center text-xs text-gray-500">
                  +2
                </div> */}
              </div>
              {/* <span className="text-xs text-gray-500">Renews in 12 days</span> */}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
          <div className="flex items-center justify-center">
            <button
              className="text-sm text-brand-500 hover:text-brand-600 font-medium"
              onClick={() => onClick(2, project)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VACard;
