'use client';
import { Provider } from 'react-redux';
import store from '../reducers/store';

export default function TasksLayout({
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
