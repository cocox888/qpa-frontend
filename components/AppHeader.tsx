'use client';
import { useTotalTime } from '@/hooks/useTotalTime';
import { calculateTotalTime } from '@/lib/utils/calculate';
import { getInitials } from '@/lib/utils/functions';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import DailyWorkWatch from './timer/DailyWorkWatch';
import type { AppDispatch, RootState } from '@/app/admin/reducers/store';
import { getAllTasks } from '@/app/admin/reducers/tasks';

const AppHeader = () => {
  const [isNotificationsMenuOpen, setNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const { totalTime, setTotalTime } = useTotalTime();

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());

    setTimeout(() => {
      const total = calculateTotalTime(tasks);
      setTotalTime(total);
    }, 1000);


    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setNotificationsMenuOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileMenuOpen(false);
      }
    };
    setUser(localStorage.getItem('username') || '');
    setRole(localStorage.getItem('role') || '');
    setEmail(localStorage.getItem('email') || '');
    document.addEventListener('mousedown', handleOutsideClick);



    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dispatch]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="glassmorphism border-b border-gray-100/50 shadow-lg shadow-gray-100/20">
          <div className="h-16 px-6 max-w-[1400px] mx-auto flex items-center justify-between">
            {/* <!-- Left section with logo and search remains the same --> */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 group">
                <div className="w-32">
                  <img src="/images/logo.svg" alt="Logo" className="w-full" />
                </div>
              </div>

              <div className="w-96">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Type to search..."
                    className="w-full h-11 pl-12 pr-4 rounded-2xl text-sm bg-white/50 border border-gray-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all duration-300"
                  />
                  <svg
                    className="w-5 h-5 absolute left-4 top-3 text-gray-400 group-hover:text-brand-500 transition-colors duration-300"
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
            </div>

            {/* <!-- Right section with time tracker and profile --> */}
            <div className="flex items-center gap-6">
              {/* <!-- Time Tracker --> */}
              <div className="flex items-center gap-4 px-4 py-2 bg-white/50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-brand-500"
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
                  <div className="text-sm font-medium text-gray-900">
                    {/* <DailyWorkWatch /> */}
                    {Math.floor(Number(totalTime) / 60)}h : {Number(totalTime) % 60}m
                  </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-500 text-white rounded-lg text-sm hover:bg-brand-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  Worked
                </button>
              </div>

              {/* <!-- Notification --> */}
              <div className="relative" ref={notificationsRef}>
                <button
                  className="relative p-2 rounded-xl hover:bg-white/50 transition-colors duration-300 group"
                  id="notifications-menu-button"
                  aria-expanded={isNotificationsMenuOpen}
                  aria-haspopup="true"
                  onClick={() =>
                    setNotificationsMenuOpen(!isNotificationsMenuOpen)
                  }
                >
                  <svg
                    className="w-6 h-6 text-gray-500 group-hover:text-brand-500 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* <!-- Notifications Dropdown --> */}
                {isNotificationsMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    id="notifications-menu"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-900">
                          Notifications
                        </h2>
                        <span className="text-xs font-medium text-brand-500 bg-brand-50 px-2 py-1 rounded-full">
                          5 new
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {/* <!-- Unread notifications --> */}
                      <div className="p-2">
                        <a
                          href="#"
                          className="block p-3 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-4 h-4 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                New Project Created
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Sarah created a new project: Website Redesign
                              </p>
                              <span className="text-xs text-gray-400 mt-1">
                                2 minutes ago
                              </span>
                            </div>
                            <div className="w-2 h-2 bg-brand-500 rounded-full mt-2"></div>
                          </div>
                        </a>
                        {/* <!-- Add more notifications here --> */}
                      </div>
                    </div>
                    <div className="p-3 border-t border-gray-100  hover:bg-brand-100 rounded-xl transition-colors">
                      <button className="w-full text-sm text-brand-500 hover:text-green-600 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* <!-- Profile --> */}
              <div className="relative" ref={profileRef}>
                <button
                  className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/50 transition-all duration-300"
                  id="profile-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-400 flex items-center justify-center text-sm font-medium text-white shadow-lg shadow-brand-500/20">
                      {getInitials(user)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white"></div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-700">
                      {user}
                    </div>
                    <div className="text-xs text-gray-500">
                      {role === 'admin' && 'Admin'}
                      {role === 'manager' && 'Project Manager'}
                      {role === 'member' && 'Virtual Assistant'}
                      {role === 'client' && 'Client'}
                    </div>
                  </div>
                </button>

                {/* <!-- Profile Dropdown --> */}
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    id="profile-menu"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-teal-400 flex items-center justify-center text-lg font-medium text-white">
                          {getInitials(user)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user}
                          </div>
                          <div className="text-xs text-gray-500">{email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <a
                        href="#"
                        className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        View Profile
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                      >
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Settings
                      </a>
                    </div>
                    <div className="p-2 border-t border-gray-100">
                      <Link
                        className="flex items-center gap-3 p-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors w-full"
                        onClick={handleSignOut}
                        href={'/user/login'}
                      >
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
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppHeader;
