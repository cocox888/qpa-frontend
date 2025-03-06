import React from 'react';

export interface Item {
  id: number;
  name: string;
  role: string;
  status: string;
  type: string;
  projects: number;
  tasks: { completed: number; total: number };
}

interface MemberCard2Props {
  member: Item;
}

const MemberCard2: React.FC<MemberCard2Props> = ({ member }) => {
  const { name, role, status, projects, tasks } = member;
  const status1 = status === '1' ? 'online' : 'offline';
  return (
    <div className="animate-in p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white ">
      <div className="flex items-start gap-4">
        <img
          src="/images/person1.jpg"
          alt="${member.name}"
          className="w-12 h-12 rounded-xl object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`${
                  status1 == 'online'
                    ? 'bg-green-500 '
                    : status1 == 'idle'
                    ? 'bg-yellow-500'
                    : 'bg-gray-400 '
                } w-2 h-2 rounded-full`}
              ></span>
              <span className="text-xs text-gray-500 capitalize">
                {status1}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Active Projects</div>
              <div className="text-sm font-medium text-gray-900">
                {projects}
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-xs text-gray-500">Tasks</div>
              <div className="text-sm font-medium text-gray-900">
                {tasks.total}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button className="text-sm text-brand-500 hover:text-brand-600 font-medium">
              View Profile
            </button>
            {/* <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
              <svg
                className="w-5 h-5"
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
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard2;
