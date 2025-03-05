'use client';

import { Suspense } from 'react';

import SettingsContent from './SettingsContent';
const SettingsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-20 pl-64 pr-6 w-screen min-h-screen">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
          </div>
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
};

export default SettingsPage;
