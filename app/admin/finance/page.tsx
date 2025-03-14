'use client';

import type { TypeAllInvoice, TypeInvoice } from '@/lib/types';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FinanceOverviewPage() {
  const [invoices, setInvoices] = useState<TypeAllInvoice[]>([]);
  const [mmetrics, setMetrics] = useState({
    monthlyRevenue: 0,
    outstanding: 0,
    vaPackageTotal: 0,
    obmPackageTotal: 0,
    vaPackageCount: 0,
    obmPackageCount: 0,
    clientCount: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');
    const fetchInvoice = async () => {
      const pro_res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/getAllInvoiceForProjects`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const proj = await pro_res.json();
      console.log(proj);
      setInvoices(proj.invoices);
      let revenue = 0;
      let outstanding = 0;
      let vaTotal = 0;
      let obmTotal = 0;
      let vaCount = 0;
      let obmCount = 0;
      let clientSet = new Set<string>();
      // biome-ignore lint/complexity/noForEach: <explanation>
      proj?.invoices.forEach((invoice: TypeAllInvoice) => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        if (invoice?.stripe_invoice?.amount_paid)
          revenue += invoice?.stripe_invoice?.amount_paid;
        if (invoice?.stripe_invoice?.amount_remaining)
          outstanding += invoice?.stripe_invoice?.amount_remaining;

        if (invoice?.project_type === 'va') {
          vaTotal += invoice?.stripe_invoice?.amount_paid ?? 0;
          vaCount++;
        } else if (invoice.project_type === 'obm') {
          obmTotal += invoice?.stripe_invoice?.amount_paid ?? 0;
          obmCount++;
        }
        if (invoice?.client_name) clientSet.add(invoice?.client_name);
      });

      setMetrics({
        monthlyRevenue: revenue,
        outstanding: outstanding,
        vaPackageTotal: vaTotal,
        obmPackageTotal: obmTotal,
        vaPackageCount: vaCount,
        obmPackageCount: obmCount,
        clientCount: clientSet.size
      });
    };
    fetchInvoice();
  }, []);

  // Top-level metrics
  const metrics = [
    {
      title: 'Monthly Revenue',
      value: `${mmetrics.monthlyRevenue}$`,
      trendUp: true,
      breakdown: `VA: ${mmetrics.vaPackageTotal}$ | OBM: ${mmetrics.obmPackageTotal}$`,
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
      title: 'Outstanding',
      value: `${mmetrics.outstanding}$`,
      trendUp: false,
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
      value: mmetrics.clientCount,
      trendUp: true,
      breakdown: `VA: ${mmetrics.vaPackageCount} | OBM: ${mmetrics.obmPackageCount}`,
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
    { label: 'New Invoice', type: 'primary', url: '/admin/finance/invoices' },
    // { label: 'Record Payment', type: 'secondary' },
    // { label: 'Add Package', type: 'secondary' },
    {
      label: 'Financial Report',
      type: 'secondary',
      url: '/admin/finance/reports'
    }
  ];

  // Recent activities combining different types of financial events
  const recentActivity = invoices
    .filter((invoice) => (invoice?.stripe_invoice?.amount_paid || 0) > 0) // Ensure only paid invoices
    .map((invoice) => {
      const latestPayment = invoice?.stripe_invoice?.webhooks_delivered_at
        ? invoice?.stripe_invoice
        : null;

      return {
        type: 'payment',
        client: invoice?.client_name,
        package: `${invoice?.project_type?.toUpperCase()} Package`,
        amount: `$${latestPayment?.amount_paid / 100 || 0 / 100}`, // Assuming amount is in cents
        status: 'Payment Received',
        date: formatDistanceToNow(
          new Date((latestPayment?.webhooks_delivered_at || 0) * 1000),
          {
            addSuffix: true
          }
        ),
        badgeColor: 'green'
      };
    })
    .slice(0, 5)
    .reverse();

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
              <Link
                key={index}
                href={action.url}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  action.type === 'primary'
                    ? 'text-white bg-brand-500 hover:bg-brand-600'
                    : 'text-brand-500 bg-brand-50 hover:bg-brand-100'
                }`}
              >
                {action.label}
              </Link>
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
        <div>
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
