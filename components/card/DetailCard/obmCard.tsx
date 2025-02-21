'use client';
import type { ProjectData } from '@/components/modal/projectDetailsModal';

interface OBMCardProps {
  onClick: (param1: number, param2: ProjectData) => void;
}

const OBMCard: React.FC<OBMCardProps> = ({ onClick }) => {
  const data: ProjectData = {
    projectTitle: 'Email Management',
    clientName: 'DigitalCorp Ltd',
    status: 'In Progress',
    dates: { due: '', renewal: '', start: '12/27/2024' },
    type: 'va',
    progress: { used: 12, total: 20, percent: Math.floor((12 / 20) * 100) },
    teamMembers: [
      {
        avatar: '/images/person1.jpg',
        role: 'Business Manager',
        full_name: 'Sarah',
        status: 'Active'
      },
      {
        avatar: '/images/person1.jpg',
        role: 'Business Manager',
        full_name: 'Sarah',
        status: 'Active'
      },
      {
        avatar: '/images/person1.jpg',
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
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                className="w-5 h-5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">Business Strategy</h3>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-600">
                  OBM
                </span>
              </div>
              <p className="text-sm text-gray-500">GrowthCo Inc</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            Pending Review
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500">Monthly Hours</span>
              <span className="text-gray-900 font-medium">28/40 hrs</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-indigo-500 h-1.5 rounded-full"
                style={{ width: '70%' }}
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="text-xs text-gray-500">Strategy</div>
                <div className="text-sm font-medium text-gray-900">12h</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="text-xs text-gray-500">Planning</div>
                <div className="text-sm font-medium text-gray-900">8h</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="text-xs text-gray-500">Review</div>
                <div className="text-sm font-medium text-gray-900">8h</div>
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
              <img
                src="/images/person1.jpg"
                alt=""
                className="w-8 h-8 rounded-lg ring-2 ring-white object-cover"
              />
            </div>
            <span className="text-xs text-gray-500">
              Monthly Review: Aug 30
            </span>
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
            onClick={() => onClick(1, data)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OBMCard;
