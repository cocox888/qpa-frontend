'use client';

import type { ProjectData } from '@/components/modal/projectDetailsModal';

interface WDSCardProps {
  onClick: (param1: number, param2: ProjectData) => void;
}

const WDSCard: React.FC<WDSCardProps> = ({ onClick }) => {
  const data: ProjectData = {
    projectTitle: 'Email Management',
    clientName: 'DigitalCorp Ltd',
    status: 'In Progress',
    dates: { due: '', renewal: '', start: '12/27/2024' },
    type: 'wds',
    progress: { used: 12, total: 20, percent: Math.floor((12 / 20) * 100) },
    teamMembers: [
      {
        image: '/images/person1.jpg',
        role: 'Business Manager',
        full_name: 'Sarah',
        status: 'Active'
      },
      {
        image: '/images/person1.jpg',
        role: 'Business Manager',
        full_name: 'Sarah',
        status: 'Active'
      },
      {
        image: '/images/person1.jpg',
        role: 'Business Manager',
        full_name: 'Sarah',
        status: 'Active'
      }
    ],
    details: {
      servicesProvided: [
        'Project Management',
        'Team Coordination',
        'Process Optimization'
      ],
      hourlyRate: '$50/hr',
      monthlyHours: '40 hours',

      packageLevel: 'Premium',
      postsPerWeek: '7 posts',
      platforms: ['Instagram, Facebook, Twitter'],

      projectType: 'Project Type',
      currentPhase: 'Current Phase',
      technologies: ['React', 'Next.js'],
      managementAreas: [
        'Project Management',
        'Team Coordination',
        'Process Optimization'
      ]
    }
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
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
                  Website Development
                </h3>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-600">
                  WDS
                </span>
              </div>
              <p className="text-sm text-gray-500">TechStart Ltd</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            On Schedule
          </span>
        </div>

        <div className="space-y-4">
          {/* <!-- Development Phases --> */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">Project Progress</span>
              <span className="text-gray-900 font-medium">65%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-rose-500 h-1.5 rounded-full"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Design</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Frontend</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                  <span className="text-sm text-gray-900">Backend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  <span className="text-sm text-gray-400">Testing</span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Deliverables & Timeline --> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  src="/images/person1.jpg"
                  alt=""
                  className="w-8 h-8 rounded-lg ring-2 ring-white object-cover"
                />
                <img
                  src="/images/person1.jpg"
                  alt=""
                  className="w-8 h-8 rounded-lg ring-2 ring-white object-cover"
                />
                <img
                  src="/images/person1.jpg"
                  alt=""
                  className="w-8 h-8 rounded-lg ring-2 ring-white object-cover"
                />
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-gray-100">
                <span className="text-xs text-gray-600">3 Deliverables</span>
              </div>
            </div>
            <span className="text-xs text-gray-500">Due Oct 15</span>
          </div>
        </div>
      </div>

      {/* <!-- Card Footer --> */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-gray-600">Sprint 2/4</span>
            </span>
            <span className="h-4 w-px bg-gray-200" />
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a href="#" className="text-xs text-blue-600 hover:text-blue-700">
              View Repository
            </a>
          </div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={() => onClick(3, data)}
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
