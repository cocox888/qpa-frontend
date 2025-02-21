'use client';
import store from '@/reducer';
import type React from 'react';
import { Provider } from 'react-redux';

export default function TimeRecordProvider({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return <Provider store={store}>{children}</Provider>;
}

