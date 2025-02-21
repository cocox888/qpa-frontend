'use client';

import { Provider } from 'react-redux';
import store from '../../admin/reducers/store';
import type React from 'react';

export default function ProjectsLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      {' '}
      {/* Wrap your app in the Provider */}
      {children}
    </Provider>
  );
}
