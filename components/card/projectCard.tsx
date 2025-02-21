import NoColorBadge from '../badge/noColorBadge';

export default function ProjectCard() {
  return (
    <div
      className="stats-card gradient-border card-shine p-6 rounded-2xl animate-in bg-white"
      style={{ animationDelay: '0.2s' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Active Projects</h3>
            <div className="text-2xl font-bold text-gray-900">36</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-purple-500 bg-purple-50 px-3 py-1 rounded-lg text-sm font-medium">
            +8.2%
          </span>
          <span className="text-xs text-gray-400 mt-1">vs last month</span>
        </div>
      </div>
      <div className="neon-line my-4"></div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <NoColorBadge title="In Progress" count={24} />
        <NoColorBadge title="In Review" count={8} />
        <NoColorBadge title="On Hold" count={4} />
      </div>
    </div>
  );
}
