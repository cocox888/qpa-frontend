'use client';
import type { ProjectData } from '@/components/modal/projectDetailsModal';
import { PhaseSVGForSMM } from '@/components/phase/PhaseSVGForSMM';
import { TypeProject } from '@/lib/types';
import React from 'react';

interface SMMCardProps {
  onClick: (param1: number, param2?: TypeProject) => void;
  project?: TypeProject;
}

const SMMCard: React.FC<SMMCardProps> = ({ onClick, project }) => {
  const phaseMap = new Map<string, number>();
  phaseMap.set('Strategy', 1);
  phaseMap.set('Content', 2);
  phaseMap.set('Publishing', 3);
  phaseMap.set('Review', 4);

  phaseMap.set('Design', 1);
  phaseMap.set('Development', 2);
  phaseMap.set('Testing', 3);
  phaseMap.set('Launch', 4);
  const [phase, setPhase] = React.useState(phaseMap.get(project?.project_phase || 'Strategy') || 0);
 
 
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 h-96">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                className="w-5 h-5 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{project?.title}</h3>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-600">
                  SMM
                </span>
              </div>
              <p className="text-sm text-gray-500">{project?.projectClient?.full_name}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project?.project_phase === 'In Progress'
                  ? 'bg-blue-500'
                  : project?.project_phase === 'Pending'
                  ? 'bg-yellow-500'
                  : project?.project_phase === 'On Schedule'
                  ? 'bg-green-500'
                  : project?.project_phase === 'Publishing'
                  ? 'bg-purple-500'
                  : project?.project_phase === 'Completed'
                  ? 'bg-emerald-500'
                  : 'bg-gray-300' // Default color if project_phase is undefined
              }`}
            />
            {project?.project_phase}
          </span>
        </div>

        <div className="space-y-4">
          {/* <!-- Milestones --> */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">
                Current Phase
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-600">
                {phase} of 4
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                {phase == 1 ? PhaseSVGForSMM('progress') : PhaseSVGForSMM('completed')}

                <span className="text-sm ">Strategy</span>
              </div>
              <div className="flex items-center gap-2">
                {phase < 2 ? PhaseSVGForSMM('upcoming') : phase == 2 ? PhaseSVGForSMM('progress') : PhaseSVGForSMM('completed')}
                <span className="text-sm">
                  Content
                </span>
              </div>
              <div className="flex items-center gap-2">
                {phase < 3 ? PhaseSVGForSMM('upcoming') : phase == 3 ? PhaseSVGForSMM('progress') : PhaseSVGForSMM('completed')}
                <span className="text-sm ">Publishing</span>
              </div>
              <div className="flex items-center gap-2">
                {phase < 4 ? PhaseSVGForSMM('upcoming') : phase == 4 ? PhaseSVGForSMM('progress') : PhaseSVGForSMM('completed')}
                <span className="text-sm ">Review</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
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
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">Start Date: {project?.start_date?.toString().split('T')[0].replace(/^(\d{4}-\d{2}-)(\d{1,2})$/, '$1$2')}</span>
              {/* <span className="px-2 py-0.5 rounded-lg text-xs font-medium bg-green-50 text-green-600">
                On Track
              </span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <div className="flex items-center justify-center">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            className="py-2 text-sm text-brand-500 hover:text-brand-600 font-medium"
            onClick={() => onClick(2, project)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SMMCard;
