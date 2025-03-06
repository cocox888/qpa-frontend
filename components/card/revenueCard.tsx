export default function RevenueCard() {
  return (
    <div
      className="stats-card gradient-border card-shine p-6 rounded-2xl animate-in bg-white"
      style={{ animationDelay: '0.1s' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-brand-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Total Revenue</h3>
            <div className="text-2xl font-bold text-gray-900">$24,560</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-brand-500 bg-brand-50 px-3 py-1 rounded-lg text-sm font-medium">
            +12.5%
          </span>
          <span className="text-xs text-gray-400 mt-1">vs last month</span>
        </div>
      </div>
      {/* <div className="neon-line my-4"></div> */}
      {/* <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Monthly Goal</span>
        <span className="text-gray-900 font-medium">$30,000</span>
      </div>
      <div className="progress-bar mt-2">
        <div className="progress-value" style={{ width: '82%' }}></div>
      </div> */}
    </div>
  );
}
