'use client';
import type { ProjectData } from '@/components/modal/projectDetailsModal';

interface SMMCardProps {
  onClick: (param1: number, param2: ProjectData) => void;
}

const SMMCard: React.FC<SMMCardProps> = ({ onClick }) => {
  const data: ProjectData = {
    projectTitle: 'Email Management',
    clientName: 'DigitalCorp Ltd',
    status: 'In Progress',
    dates: { due: '', renewal: '', start: '12/27/2024' },
    type: 'smm',
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
                <h3 className="font-medium text-gray-900">Social Campaign</h3>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-600">
                  SMM
                </span>
              </div>
              <p className="text-sm text-gray-500">FashionBrand Co</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            In Progress
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
                2 of 4
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="w-4 h-4 text-green-500"
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
                </div>
                <span className="text-sm text-gray-600">Content Strategy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
                <span className="text-sm text-gray-900 font-medium">
                  Content Creation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                </div>
                <span className="text-sm text-gray-400">Publishing</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
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
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">Due: Sep 15</span>
              <span className="px-2 py-0.5 rounded-lg text-xs font-medium bg-green-50 text-green-600">
                On Track
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
            In Progress
          </span>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            className="text-sm text-brand-500 hover:text-brand-600 font-medium"
            onClick={() => onClick(2, data)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SMMCard;
