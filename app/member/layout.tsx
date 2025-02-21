'use client';

import type React from 'react';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import { Provider } from 'react-redux';
import store from './reducers/store';

export default function DashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <AppHeader />
      <AppSidebar />
      <Provider store={store}> {children}</Provider>
    </div>
  );
}
