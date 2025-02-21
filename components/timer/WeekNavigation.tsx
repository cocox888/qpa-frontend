'use client';

import React from 'react';
import Link from 'next/link';
import { formatDateToDayMonth, getISOWeekDateRange } from '@/lib/utils/date';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon
} from 'lucide-react';
import { useWeeklySettings } from '@/hooks/use-weekly-settings';

const WeekNavigation = () => {
  const role = localStorage.getItem('role');
  const baseUrl = role === 'admin' ? '/admin/timer' : `/${role}/timer/report`;
  const { offset, start, end, view } = useWeeklySettings();
  const prevWeekDates = getISOWeekDateRange(offset - 1);
  const nextWeekDates = getISOWeekDateRange(offset + 1);
  const week =
    offset === 0
      ? 'This week'
      : offset === -1
      ? 'Last week'
      : `${formatDateToDayMonth(start)} - ${formatDateToDayMonth(end)}`;

  return (
    <nav
      className="flex justify-center items-center border border-skeleton rounded-xl px-2"
      aria-label="Weekly navigation"
    >
      <Link
        className="text-primary-dark text-lg font-medium rounded-xl border border-transparent inline-flex hover:bg-skeleton transition-all"
        href={`${baseUrl}?start=${prevWeekDates.startDate}&end=${prevWeekDates.endDate}&view=${view}`}
        aria-label="Previous week"
      >
        <ChevronLeftIcon />
      </Link>
      <div className="text-sm flex justify-center items-center px-2 min-w-[13rem]">
        <span className="flex justify-center items-center pr-2">
          <CalendarDaysIcon />
        </span>
        {week}
      </div>
      <Link
        className="text-primary-dark text-lg font-medium px-2 rounded-xl border border-transparent inline-flex hover:bg-skeleton transition-all"
        href={`${baseUrl}?start=${nextWeekDates.startDate}&end=${nextWeekDates.endDate}&view=${view}`}
        aria-label="Next week"
      >
        <ChevronRightIcon />
      </Link>
    </nav>
  );
};

export default WeekNavigation;
