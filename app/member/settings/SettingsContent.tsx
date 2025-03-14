'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  Settings,
  Users,
  CreditCard,
  Bell,
  Shield,
  Puzzle,
  Info,
  Check
} from 'lucide-react';
import AddNewMethod from '@/components/ClientComponent/AddNewMethod';

const SettingsContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const tab = params.get('tab') || 'general';
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const tabs: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'team', label: 'Roles & Permissions', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Puzzle }
  ];

  const TeamSection = () => (
    <div className={activeTab === 'team' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Roles & Permissions
        </h2>
        <div className="mt-6">
          <div className="space-y-4">
            {/* Administrator Role */}
            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">Administrator</div>
                  <div className="text-sm text-gray-500">
                    Full system access and management control
                  </div>
                </div>
                <div className="text-sm text-brand-500 font-medium">
                  Edit Role
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Manage Team', 'System Settings', 'Billing Access'].map(
                  (permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        {permission}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* VA Manager Role */}
            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">VA Manager</div>
                  <div className="text-sm text-gray-500">
                    Team and project management capabilities
                  </div>
                </div>
                <div className="text-sm text-brand-500 font-medium">
                  Edit Role
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  'Manage Projects',
                  'Assign Tasks',
                  'View Reports',
                  'Manage VA Team',
                  'Client Communication',
                  'Time Management'
                ].map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VA Member Role */}
            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">VA Member</div>
                  <div className="text-sm text-gray-500">
                    Task execution and time tracking
                  </div>
                </div>
                <div className="text-sm text-brand-500 font-medium">
                  Edit Role
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  'View Tasks',
                  'Track Time',
                  'Update Status',
                  'Submit Reports',
                  'Access Resources'
                ].map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Role */}
            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">Client</div>
                  <div className="text-sm text-gray-500">
                    Limited access to project viewing and updates
                  </div>
                </div>
                <div className="text-sm text-brand-500 font-medium">
                  Edit Role
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['View Progress', 'Add Comments', 'Access Files'].map(
                  (permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        {permission}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BillingSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const close = () => {
      setIsModalOpen(false);
    };

    const handlePaymentMethodCreated = async (paymentMethodId: string) => {
      try {
        const token = localStorage.getItem('refresh_token');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/client/attach-payment-method`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              paymentMethodId
            })
          }
        );

        const data = await response.json();

        if (data.success) {
          alert('Payment method attached successfully!');
        } else {
          alert('Failed to attach payment method');
        }
      } catch (error) {
        console.error('Error attaching payment method:', error);
        alert('An error occurred while attaching the payment method');
      }
    };
    return (
      <div className={activeTab === 'billing' ? '' : 'hidden'}>
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Financial Settings
          </h2>

          {/* Payment Methods Configuration */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Payment Methods</h3>
              <div
                onClick={(e) => setIsModalOpen((prev) => !prev)}
                className="px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors"
              >
                Add New Method
              </div>
            </div>
            {isModalOpen && (
              <AddNewMethod
                onPaymentMethodCreated={handlePaymentMethodCreated}
                Close={close}
              />
            )}

            <div className="space-y-4">
              {/* Primary Card */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className="w-8 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">•••• 4242</div>
                  <div className="text-sm text-gray-500">Expires 12/24</div>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-brand-50 text-brand-700 rounded-full ml-auto mr-2">
                  Primary
                </span>
                <div className="text-sm text-brand-500 font-medium">Edit</div>
              </div>
            </div>
          </div>

          {/* Finance Preferences */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Finance Preferences
            </h3>
            <div className="space-y-6">
              {/* Currency Settings */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Base Currency
                </div>
                <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                  <option>GBP (£)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GHS (₵)</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Used for reporting and internal calculations
                </p>
              </div>

              {/* Accounting Preferences */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  Accounting Settings
                </div>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Round up minutes to nearest hour for billing
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Enable carryover hours for monthly packages
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Auto-generate monthly invoices
                    </span>
                  </label>
                </div>
              </div>

              {/* Financial Reports */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  Report Preferences
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      Default Report Currency
                    </div>
                    <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                      <option>Use client&apos;s currency</option>
                      <option>Use base currency</option>
                    </select>
                  </div>
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      Financial Year Start
                    </div>
                    <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                      <option>January</option>
                      <option>April</option>
                      <option>July</option>
                      <option>October</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Settings */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Invoice Configuration
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Prefix
                  </div>
                  <input
                    type="text"
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                    placeholder="e.g., INV-"
                  />
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    Next Invoice Number
                  </div>
                  <input
                    type="number"
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                    placeholder="e.g., 1001"
                  />
                </div>
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Default Payment Terms
                </div>
                <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                  <option>Due on receipt</option>
                  <option>Net 15</option>
                  <option>Net 30</option>
                  <option>Net 60</option>
                </select>
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Notes Template
                </div>
                <textarea
                  className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300 resize-none"
                  placeholder="Enter default invoice notes"
                >
                  &nbsp;
                </textarea>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Financial Notifications
            </h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-600">
                  Send invoice notifications
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-600">
                  Send payment reminders
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-600">
                  Notify on low package hours
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-600">
                  Monthly financial reports
                </span>
              </label>
            </div>
          </div>

          {/* Payroll Settings */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Payroll Configuration
            </h3>
            <div className="space-y-6">
              {/* Pay Period Settings */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  Pay Period
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      Pay Cycle
                    </div>
                    <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                      <option>Monthly</option>
                      <option>Bi-weekly</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      Payment Date
                    </div>
                    <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                      <option>Last day of month</option>
                      <option>1st of month</option>
                      <option>15th of month</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Rate Configuration */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  Default Rate Settings
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="block text-sm text-gray-600 mb-1">
                        VA Base Rate
                      </div>
                      <input
                        type="number"
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        placeholder="Enter hourly rate"
                      />
                    </div>
                    <div>
                      <div className="block text-sm text-gray-600 mb-1">
                        OBM Base Rate
                      </div>
                      <input
                        type="number"
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        placeholder="Enter hourly rate"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      Overtime Rate Multiplier
                    </div>
                    <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                      <option>1.5x</option>
                      <option>2x</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tax Settings */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  Tax Configuration
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      Default Tax Rate (%)
                    </div>
                    <input
                      type="number"
                      className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                      placeholder="Enter tax rate"
                    />
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Auto-calculate tax deductions
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits & Deductions */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Benefits & Deductions
            </h3>
            <div className="space-y-4">
              {/* Standard Deductions */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  Standard Deductions
                </div>
                <div className="space-y-3">
                  {[
                    'Health Insurance',
                    'Pension Contribution',
                    'Income Tax'
                  ].map((item) => (
                    <label key={item} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-gray-600">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bonus Configuration */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  Bonus Settings
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      Performance Bonus Calculation
                    </div>
                    <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                      <option>Percentage of base salary</option>
                      <option>Fixed amount</option>
                      <option>Custom formula</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Management */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Expense Management
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    Approval Threshold
                  </div>
                  <input
                    type="number"
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">
                    Default Category
                  </div>
                  <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                    <option>Office Supplies</option>
                    <option>Travel</option>
                    <option>Software</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Expense Categories
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">
                    Configure expense categories in the finance section
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotificationsSection = () => (
    <div className={activeTab === 'notifications' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Notification Preferences
        </h2>

        {/* Email Notifications */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Email Notifications</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500">
                &nbsp;
              </div>
            </label>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Project Updates',
                description: 'Get notified when projects are updated'
              },
              {
                title: 'Task Assignments',
                description: "Get notified when you're assigned to a task"
              },
              {
                title: 'Team Updates',
                description: 'Get notified about team member changes'
              }
            ].map((notification) => (
              <label
                key={notification.title}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {notification.description}
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-gray-900">In-App Notifications</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500">
                &nbsp;
              </div>
            </label>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Desktop Notifications',
                description: 'Show desktop push notifications'
              },
              {
                title: 'Sound Notifications',
                description: 'Play a sound for important notifications'
              }
            ].map((notification) => (
              <label
                key={notification.title}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {notification.description}
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={
                    notification.title === 'Desktop Notifications'
                  }
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className={activeTab === 'security' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Security Settings
        </h2>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-gray-900">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
              Enable 2FA
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Two-factor authentication is currently disabled
              </span>
            </div>
          </div>
        </div>

        {/* Password Settings */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </div>
              <input
                type="password"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
              />
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </div>
              <input
                type="password"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
              />
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </div>
              <input
                type="password"
                className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
              />
            </div>
            <div className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
              Update Password
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Active Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {/* <Desktop className="w-5 h-5 text-gray-400" /> */}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    MacBook Pro - Chrome
                  </div>
                  <div className="text-xs text-gray-500">
                    London, UK · Last active: 2 mins ago
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                  Current
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const IntegrationsSection = () => (
    <div className={activeTab === 'integrations' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Connected Apps & Integrations
        </h2>

        {/* Connected Apps */}
        <div className="grid grid-cols-2 gap-4">
          {/* Slack Integration */}
          <div className="p-6 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4A154B] flex items-center justify-center">
                  <Puzzle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Slack</div>
                  <div className="text-xs text-gray-500">Communication</div>
                </div>
              </div>
              <div className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700">
                Disconnect
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Send notifications and updates to your Slack workspace.
            </div>
          </div>

          {/* Google Calendar */}
          <div className="p-6 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                  <Puzzle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Google Calendar
                  </div>
                  <div className="text-xs text-gray-500">Calendar</div>
                </div>
              </div>
              <div className="px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
                Connect
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Sync your calendar events and meetings.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="py-20 pl-64 pr-6 w-screen min-h-screen overflow-x-hidden">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account and application preferences
            </p>
          </div>
          <div className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
            Save Changes
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 divide-x divide-gray-100">
            {/* Settings Sidebar */}
            <div className="col-span-3 p-6 space-y-6">
              <nav className="space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  // biome-ignore lint/a11y/useButtonType: <explanation>
                  <button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === id
                        ? 'text-brand-500 bg-brand-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="col-span-9 p-6">
              <div className="space-y-6">
                {/* General Settings */}
                <div className={activeTab === 'general' ? '' : 'hidden'}>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    General Settings
                  </h2>
                  <div className="space-y-4">
                    {/* Company Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </div>
                        <input
                          type="text"
                          defaultValue="Crextio"
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <div className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </div>
                        <input
                          type="url"
                          defaultValue="https://crextio.com"
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Business Hours
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="time"
                          defaultValue="09:00"
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        />
                        <input
                          type="time"
                          defaultValue="17:00"
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Timezone */}
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </div>
                      <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                        <option>GMT (UTC +0:00)</option>
                        <option>GMT+1 (West Africa Time)</option>
                      </select>
                    </div>

                    {/* Date Format */}
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Date Format
                      </div>
                      <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Default Currency
                      </div>
                      <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                        <option>USD ($)</option>
                        <option>GBP (£)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>

                    {/* Language and Region */}
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Language and Region
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="block text-sm font-medium text-gray-700 mb-1">
                            Language
                          </div>
                          <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                            <option>English (US)</option>
                            <option>English (UK)</option>
                          </select>
                        </div>
                        <div>
                          <div className="block text-sm font-medium text-gray-700 mb-1">
                            Region
                          </div>
                          <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>Ghana</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <TeamSection />
                <BillingSection />
                <NotificationsSection />
                <SecuritySection />
                <IntegrationsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsContent;
