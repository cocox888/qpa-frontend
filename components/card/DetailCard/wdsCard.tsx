'use client';

import type { ProjectData } from '@/components/modal/projectDetailsModal';
import { PhaseSVGForWDS } from '@/components/phase/PhaseSVGForSMM';
import { TypeProject } from '@/lib/types';
import React from 'react';

interface WDSCardProps {
  onClick: (param1: number, param2?: TypeProject) => void;
  project?: TypeProject;
}

const WDSCard: React.FC<WDSCardProps> = ({ onClick, project }) => {
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
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                className="w-5 h-5 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {project?.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-600">
                  WDS
                </span>
              </div>
              <p className="text-sm text-gray-500">{project?.projectClient?.full_name}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            {project?.project_phase}
          </span>
        </div>

        <div className="space-y-4">
          {/* <!-- Development Phases --> */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">Project Progress</span>
              <span className="text-gray-900 font-medium">{phase / 4 * 100}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-rose-500 h-1.5 rounded-full"
                style={{ width: `${phase / 4 * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  {phase == 1 ? PhaseSVGForWDS('progress') : PhaseSVGForWDS('completed')}
                  <span className="text-sm ">Design</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  {phase < 2 ? PhaseSVGForWDS('upcoming') : phase == 2 ? PhaseSVGForWDS('progress') : PhaseSVGForWDS('completed')}
                  <span className="text-sm ">Development</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {phase < 3 ? PhaseSVGForWDS('upcoming') : phase == 3 ? PhaseSVGForWDS('progress') : PhaseSVGForWDS('completed')}

                  <span className="text-sm">Testing</span>
                </div>
                <div className="flex items-center gap-2">
                  {phase < 4 ? PhaseSVGForWDS('upcoming') : phase == 4 ? PhaseSVGForWDS('progress') : PhaseSVGForWDS('completed')}

                  <span className="text-sm">Launch</span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Deliverables & Timeline --> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
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
              {/* <div className="px-2.5 py-1 rounded-lg bg-gray-100">
                <span className="text-xs text-gray-600">3 Deliverables</span>
              </div> */}
            </div>
            <span className="text-xs text-gray-500">Start Date: {project?.start_date?.toString().split('T')[0].replace(/^(\d{4}-\d{2}-)(\d{1,2})$/, '$1$2')}</span>
          </div>
        </div>
      </div>

      {/* <!-- Card Footer --> */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <span className="flex items-center gap-1 text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-gray-600">Sprint 2/4</span>
            </span> */}
            {/* <span className="h-4 w-px bg-gray-200" /> */}
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a href="#" className="text-xs text-blue-600 hover:text-blue-700">
              View Repository
            </a>
          </div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={() => onClick(3, project)}
            className="text-sm text-brand-500 hover:text-brand-600 font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default WDSCard;
