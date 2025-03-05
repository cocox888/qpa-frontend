import type { TypeUser } from '@/lib/types';
import { getTodayStartEndISO } from '@/lib/utils/date';

export async function fetchTodayTimeTracks() {
  const token = localStorage.getItem('refresh_token');

  const { start_time, end_time } = getTodayStartEndISO();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/getTimeTracksForUser?startDate=${start_time}&endDate=${end_time}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }
  );
  const timeTracks = await res.json();

  console.log(timeTracks);
  return timeTracks;
}

export async function fetchTodayTimeTracksForAllUsers() {
  const token = localStorage.getItem('refresh_token');

  const { start_time, end_time } = getTodayStartEndISO();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/getAllTimeTracks?startDate=${start_time}&endDate=${end_time}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }
  );
  const timeTracks = await res.json();

  console.log(timeTracks);
  return timeTracks;
}
