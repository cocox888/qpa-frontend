import { useState } from 'react';

interface FilterBarProps {
  filterEvent: (param: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filterEvent }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* <!-- Package Type Filter --> */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIndex(0);
              filterEvent(0);
            }}
            className={`${
              index == 0
                ? 'text-brand-500 bg-brand-50'
                : 'text-gray-600 hover:bg-gray-50'
            } px-3 py-2 text-sm font-medium rounded-lg`}
          >
            All Packages
          </button>
          <button
            onClick={() => {
              setIndex(1);
              filterEvent(1);
            }}
            className={`${
              index == 1
                ? 'text-brand-500 bg-brand-50'
                : 'text-gray-600 hover:bg-gray-50'
            } px-3 py-2 text-sm font-medium rounded-lg`}
          >
            Hourly
          </button>
          <button
            onClick={() => {
              setIndex(2);
              filterEvent(2);
            }}
            className={`${
              index == 2
                ? 'text-brand-500 bg-brand-50'
                : 'text-gray-600 hover:bg-gray-50'
            } px-3 py-2 text-sm font-medium rounded-lg`}
          >
            Fixed Price
          </button>
        </div>

        {/* <!-- Search --> */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full h-10 pl-10 pr-4 rounded-lg text-sm bg-gray-50 border-none focus:ring-2 focus:ring-brand-500/20"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-3 text-gray-400"
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

        {/* <!-- View Options --> */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-gray-50">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-50">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
