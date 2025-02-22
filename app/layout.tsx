import type { Metadata } from 'next';
import './globals.css';

import { TimerProvider } from '@/store/timer-context';
import { TimeTrackProvider } from '@/store/time-track-context';
import TimeRecordProvider from './Provider';
import { AuthenticationProvider } from '@/providers/AuthenticationProvider';
export const metadata: Metadata = {
  title: 'QPA',
  description:
    'Efficient Business Management at Your Fingertips. Our practice is providing comprehensive virtual assistant services to streamline your business operations.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body className="antialiased">
        {/* Wrap the entire layout with the Redux Provider */}
        {/* <TimeRecordProvider> */}
        {/* <TimerProvider> */}

        {children}

        {/* </TimerProvider> */}
        {/* </TimeRecordProvider> */}

      </body>
    </html>
  );
}
