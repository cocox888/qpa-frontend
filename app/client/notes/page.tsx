'use client';

export default function Notes() {
  return (
    <div className="pt-20 pl-64 pr-6 min-h-screen w-screen overflow-x-hidden">
      <div className=" mx-auto space-y-6">
        {/* <!-- Header Section --> */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Documents & Notes
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all your documents and notes in one place
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              New Note
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload Document
            </div>
          </div>
        </div>

        {/* <!-- Stats Cards --> */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stats-card gradient-border card-shine p-4 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Documents
                </p>
                <h3 className="text-xl font-bold text-gray-900">124</h3>
              </div>
            </div>
          </div>

          <div className="stats-card gradient-border card-shine p-4 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Notes
                </p>
                <h3 className="text-xl font-bold text-gray-900">45</h3>
              </div>
            </div>
          </div>

          <div className="stats-card gradient-border card-shine p-4 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
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
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Shared Files
                </p>
                <h3 className="text-xl font-bold text-gray-900">67</h3>
              </div>
            </div>
          </div>

          <div className="stats-card gradient-border card-shine p-4 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-yellow-500"
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
                <p className="text-sm font-medium text-gray-500">
                  Recent Changes
                </p>
                <h3 className="text-xl font-bold text-gray-900">28</h3>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Main Content Area --> */}
        <div className="bg-white rounded-xl border border-gray-100">
          {/* <!-- Filters Bar --> */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 text-sm font-medium rounded-lg text-brand-500 bg-brand-50">
                  All Files
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    236
                  </span>
                </div>
                <div className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50">
                  Documents
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    124
                  </span>
                </div>
                <div className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50">
                  Notes
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    45
                  </span>
                </div>
                <div className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50">
                  Shared
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    67
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search files..."
                    className="w-64 h-10 pl-10 pr-4 text-sm bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-brand-500/20"
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
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Documents Grid --> */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* <!-- Document Card --> */}
            <div className="p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    Project Requirements.docx
                  </h3>
                  <p className="text-sm text-gray-500">Updated 2 hours ago</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
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
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- More Note Cards --> */}
            <div className="p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Sprint Planning Notes
                      </h3>
                      <p className="text-sm text-gray-500">
                        Updated 3 days ago
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-600 rounded-lg">
                      Important
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-xs text-gray-500">
                        Shared with team
                      </span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
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
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Document Card --> */}
            <div className="p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Q3 Performance Review.pdf
                      </h3>
                      <p className="text-sm text-gray-500">Added 1 week ago</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-lg">
                      Confidential
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-xs text-gray-500">4.2 MB</span>
                    <span className="text-xs text-gray-500">PDF Document</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Shared Document Card --> */}
            <div className="p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
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
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Design System Guidelines
                      </h3>
                      <p className="text-sm text-gray-500">
                        Last edited by Sarah
                      </p>
                    </div>
                    <div className="flex -space-x-2">
                      {/* <img className="w-6 h-6 rounded-full border-2 border-white"
                                                src="/api/placeholder/24/24" alt="User 1" /> */}
                      <img
                        className="w-6 h-6 rounded-full border-2 border-white"
                        src="/images/person1.jpg"
                        alt="User 2"
                      />
                      <img
                        className="w-6 h-6 rounded-full border-2 border-white"
                        src="/images/person1.jpg"
                        alt="User 2"
                      />
                      <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-500">+3</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-xs text-gray-500">
                        Viewed by 28 people
                      </span>
                    </div>
                    <div className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Load More Button --> */}
            <div className="col-span-full flex justify-center py-4">
              <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Load More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
