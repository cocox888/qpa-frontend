import type React from 'react';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';

export default function DashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <AppHeader />
      <AppSidebar />
      {children}
    </div>
  );
}
