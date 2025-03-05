"use client"
import type React from 'react';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import { Provider } from 'react-redux';
import store from './reducers/store';
import { TimerProvider } from '@/store/timer-context';
import { AuthenticationProvider } from '@/providers/AuthenticationProvider';
import { TotalTimeProvider } from '@/providers/TotalTimeProvider';


export default function DashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <AuthenticationProvider>
        <Provider store={store}>
          <TotalTimeProvider>
            <TimerProvider>
              <AppHeader />
              <AppSidebar />
              {children}
            </TimerProvider>
          </TotalTimeProvider>
        </Provider>
      </AuthenticationProvider>

    </div>
  );
}
