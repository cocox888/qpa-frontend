'use client';

export default function FinanceOverviewPage() {
  // Top-level metrics
  const metrics = [
    {
      title: 'Monthly Revenue',
      value: '£24,500',
      trend: '+12.5%',
      trendUp: true,
      breakdown: 'VA: £15,500 | OBM: £9,000',
      icon: (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    },
    {
      title: 'Package Hours',
      value: '468/570',
      trend: '82%',
      trendUp: true,
      breakdown: '25 packages active',
      icon: (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    },
    {
      title: 'Outstanding',
      value: '£3,240',
      trend: '-15%',
      trendUp: false,
      breakdown: '5 invoices pending',
      icon: (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      )
    },
    {
      title: 'Active Clients',
      value: '32',
      trend: '+4',
      trendUp: true,
      breakdown: 'VA: 18 | OBM: 14',
      icon: (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      )
    }
  ];

  // Quick actions
  const quickActions = [
    { label: 'New Invoice', type: 'primary', url: '/invoices' },
    // { label: 'Record Payment', type: 'secondary' },
    // { label: 'Add Package', type: 'secondary' },
    { label: 'Financial Report', type: 'secondary', url: '/reports' }
  ];

  // Recent activities combining different types of financial events
  const recentActivity = [
    {
      type: 'payment',
      client: 'Sarah Johnson',
      package: 'VA Package - 25hrs',
      amount: '£450',
      status: 'Payment Received',
      date: 'Today, 2:30 PM',
      badgeColor: 'green'
    },
    {
      type: 'hours',
      client: 'Tech Solutions Ltd',
      package: 'OBM Package - 40hrs',
      amount: '35 hrs',
      status: 'Hours Updated',
      date: 'Today, 11:15 AM',
      badgeColor: 'blue'
    },
    {
      type: 'invoice',
      client: 'Digital Nomads Co',
      package: 'SMM Package',
      amount: '£750',
      status: 'Invoice Overdue',
      date: 'Yesterday',
      badgeColor: 'red'
    },
    {
      type: 'package',
      client: 'Global Ventures Inc',
      package: 'VA Package - 30hrs',
      amount: '£600',
      status: 'Package Renewed',
      date: 'Yesterday',
      badgeColor: 'purple'
    }
  ];

  // Package utilization data
  const packageUtilization = [
    { type: 'VA Basic', total: 8, hours: { used: 160, total: 200 } },
    { type: 'VA Premium', total: 12, hours: { used: 280, total: 300 } },
    { type: 'OBM Standard', total: 6, hours: { used: 180, total: 240 } },
    { type: 'OBM Premium', total: 4, hours: { used: 150, total: 160 } }
  ];

  return (
    <main className="py-20 pl-64 pr-6 w-screen min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Quick Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Financial Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your financial operations
            </p>
          </div>
          <div className="flex gap-3">
            {quickActions.map((action, index) => (
              // biome-ignore lint/a11y/useButtonType: <explanation>
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <button
                key={index}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  action.type === 'primary'
                    ? 'text-white bg-brand-500 hover:bg-brand-600'
                    : 'text-brand-500 bg-brand-50 hover:bg-brand-100'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-gray-50 rounded-lg">{metric.icon}</div>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    metric.trendUp
                      ? 'text-green-600 bg-green-50'
                      : 'text-red-600 bg-red-50'
                  }`}
                >
                  {metric.trend}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mt-4">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{metric.title}</p>
              <p className="text-xs text-gray-400 mt-1">{metric.breakdown}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Package Utilization */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">
                Package Utilization
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {packageUtilization.map((pkg, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {pkg.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {pkg.total} clients
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-brand-500 rounded-full"
                        style={{
                          width: `${(pkg.hours.used / pkg.hours.total) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {pkg.hours.used} / {pkg.hours.total} hours used
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.client}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.package}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium bg-${activity.badgeColor}-50 text-${activity.badgeColor}-600`}
                    >
                      {activity.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                    <span>{activity.amount}</span>
                    <span>{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
