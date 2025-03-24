'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  HomeIcon,
  ProjectIcon,
  TaskIcon,
  FinanceIcon,
  KanbanIcon,
  TeamIcon,
  NoteIcon,
  SettingIcon
} from './Icons/CustomIcons';
import SidebarItem from './SidebarItem';
import { TimerIcon } from 'lucide-react';

export default function AppSidebar() {
  const currentPath = usePathname();
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUser(localStorage.getItem('username') || '');
    setRole(role || '');
  }, []);

  // Finance submenu items
  const financeMenuItems = [
    { url: `/${role}/finance`, title: 'Overview' }
    // { url: `/${role}/finance/packages`, title: 'Package Management' },
    // { url: `/${role}/finance/client-billing`, title: 'Client Billing' },
    // { url: `/${role}/finance/payroll`, title: 'Payroll' },
    // { url: `/${role}/finance/expenses`, title: 'Expenses' },
    // { url: `/${role}/finance/invoices`, title: 'Invoices' },
  ];

  const financeReport = {
    url: `/${role}/finance/reports`,
    title: 'Financial Reports'
  };

  // const timerMenuItems = [
  //   { url: `/${role}/timer`, title: 'Start Timer' },
  //   { url: `/${role}/timer/report`, title: 'Report' }
  // ];

  const isFinanceActive =
    currentPath.startsWith(`/${role}/finance`) &&
    currentPath !== `/${role}/finance/reports`;
  const isTimerActive = currentPath.startsWith(`/${role}/timer`);

  useEffect(() => {
    if (isFinanceActive) {
      setIsFinanceOpen(true);
    }
  }, [isFinanceActive]);

  return (
    <>
      <aside className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 fixed left-0 top-16 bottom-0 w-56 bg-white/80 backdrop-blur-xl border-r border-gray-100/50 shadow-lg shadow-gray-100/20 z-40">
        <div className="p-6 h-full flex flex-col">
          {/* Welcome Message */}
          <div className="welcome-card p-6 rounded-2xl mb-6 animate-in text-center hidden lg:block">
            <div className="flex flex-col items-center">
              <div className="profile-container mb-4">
                <div className="wave-emoji wave-animation text-lg">👋</div>
                <div className="profile-gradient">
                  <div className="profile-image relative">
                    <Image
                      src="/images/person1.jpg"
                      alt="Profile"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  Welcome back,
                </h2>
                <p className="text-xl font-bold text-brand-500">{user}</p>
                <p className="text-sm text-gray-500">Have a great day!</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <div className="text-xs font-medium text-gray-400 uppercase px-3 mb-2">
              Main Menu
            </div>

            <SidebarItem
              url={`/${role}/dashboard`}
              title="Dashboard"
              icon={HomeIcon}
              isActive={currentPath === `/${role}/dashboard`}
            />
            <SidebarItem
              url={`/${role}/projects`}
              title="Projects"
              icon={ProjectIcon}
              isActive={currentPath === `/${role}/projects`}
            />
            <SidebarItem
              url={`/${role}/tasks`}
              title="Tasklist"
              icon={TaskIcon}
              isActive={currentPath === `/${role}/tasks`}
            />

            {/* Finance Dropdown */}
            {(role === 'client' || role === 'admin') && (
              <div className="relative">
                <SidebarItem
                  url={`/${role}/finance`}
                  title="Finance"
                  icon={FinanceIcon}
                  isActive={isFinanceActive}
                  onClick={() => setIsFinanceOpen(!isFinanceOpen)}
                />

                {/* Finance Submenu */}
                {isFinanceOpen && (
                  <div className="ml-7 mt-1 border-l border-gray-100/80 pl-3 max-h-[200px] overflow-y-auto custom-scrollbar">
                    <div className="space-y-1">
                      {role === 'admin' && (
                        <SidebarItem
                          key={'/admin/finance/invoices'}
                          url={'/admin/finance/invoices'}
                          title={'Invoices'}
                          isSubmenu={true}
                          isActive={currentPath === '/admin/finance/invoices'}
                        />
                      )}
                      {financeMenuItems
                        .filter((item) => item.title !== 'Overview')
                        .map((item) => (
                          <SidebarItem
                            key={item.url}
                            url={item.url}
                            title={item.title}
                            isSubmenu={true}
                            isActive={currentPath === item.url}
                          />
                        ))}
                    </div>
                  </div>
                )}
                <SidebarItem
                  url={financeReport.url}
                  title={financeReport.title}
                  icon={TaskIcon}
                  isActive={financeReport.url === currentPath}
                />
              </div>
            )}

            {/* <div className="relative">
              <SidebarItem
                url={`/${role}/timer`}
                title="Timer"
                icon={TimerIcon}
                isActive={isTimerActive}
                onClick={() => setIsTimerOpen(!isTimerOpen)}
              />

             
              {isTimerOpen && role !== 'admin' && (
                <div className="ml-7 mt-1 border-l border-gray-100/80 pl-3 max-h-[200px] overflow-y-auto custom-scrollbar">
                  <div className="space-y-1">
                    {timerMenuItems
                      .filter((item) => item.title !== 'Overview')
                      .map((item) => (
                        <SidebarItem
                          key={item.url}
                          url={item.url}
                          title={item.title}
                          isSubmenu={true}
                          isActive={currentPath === item.url}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div> */}

            {/* Other Menu Items */}
            {role !== 'client' && (
              <SidebarItem
                url={`/${role}/kanban`}
                title="Kanban Board"
                icon={KanbanIcon}
                isActive={currentPath === `/${role}/kanban`}
              />
            )}

            <div className="text-xs font-medium text-gray-400 uppercase px-3 mb-2 mt-6">
              Workspace
            </div>

            <SidebarItem
              url={`/${role}/team`}
              title="Team"
              icon={TeamIcon}
              isActive={currentPath === `/${role}/team`}
            />
            <SidebarItem
              url={`/${role}/notes`}
              title="Document/Notes"
              icon={NoteIcon}
              isActive={currentPath === `/${role}/notes`}
            />
            <SidebarItem
              url={`/${role}/settings`}
              title="Setting"
              icon={SettingIcon}
              isActive={currentPath === `/${role}/settings`}
            />
          </nav>
        </div>
      </aside>
    </>
  );
}
