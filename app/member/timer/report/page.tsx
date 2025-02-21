'use client';

import TimeTrackRecord from '@/components/timer/TimeTrackRecord';
import WeekNavigation from '@/components/timer/WeekNavigation';
import { fetchTodayTimeTracks } from '@/hooks/api-hooks';
import type { TypeTimeTrack } from '@/lib/types';
import { calculateTotalDuration } from '@/lib/utils/date';
import { isNonEmptyArray } from '@/lib/utils/functions';
import { useEffect, useState } from 'react';

const Report = () => {
  const [timeTracks, setTimeTracks] = useState<TypeTimeTrack[]>([]);
  const [totalDaily, setTotalDaily] = useState<string>('');
  const [period, setPeriod] = useState<string>('daily');

  useEffect(() => {
    const getTimeTracks = async () => {
      const timeTracks = await fetchTodayTimeTracks();
      setTimeTracks(timeTracks);
      const totalDaily = calculateTotalDuration(timeTracks);
      setTotalDaily(totalDaily);
    };

    getTimeTracks();
  }, []);

  if (!timeTracks) {
    return (
      <div className="w-full h-full bg-yellow-50 border rounded-xl justify-items-center py-8">
        <h3 className="text-red-300 text-lg pb-3 font-bold">
          No time tracks for today
        </h3>
        <p className="text-blue-400 italic">
          Looks like you haven&#39;t started tracking your activities yet. Ready
          to begin?
        </p>
      </div>
    );
  }

  return (
    <div className="pt-20 pl-64 pr-6  min-h-screen w-screen overflow-x-hidden bg-yellow-50 border rounded-xl justify-items-center">
      <div className="w-full px-4 py-4 flex flex-row">
        <div className="flex flex-row space-between w-full gap-5">
          <p>Select the period that you want to see:</p>
          <select
            id="project"
            name="project"
            value={period}
            required
            className="border rounded-md selection:default:"
            onChange={(e) => {
              setPeriod(e.target.value);
            }}
          >
            <option value={'Daily'} className="bg-green-400">
              Daily
            </option>
            <option value={'Weekly'} className="bg-red-300">
              Weekly
            </option>
            <option value={'Monthly'} className="bg-yellow-400">
              Monthly
            </option>
            <option value={'6 Months'} className="bg-blue-300">
              6 Months
            </option>
          </select>
        </div>
        <div className="mr-5">{/* <WeekNavigation /> */}</div>
      </div>
      <div className="w-full">
        <h3 className="w-full border rounded-t-xl text-center bg-gradient-to-l from-[#27F090] via-[#7F41F3] to-[#F59527] px-4 py-4 md:px-10 text-[35px] font-bold text-white">
          Logged Total time for {period}: {totalDaily}
        </h3>
        <ul className="py-4 flex flex-row w-full flex-wrap">
          {isNonEmptyArray(timeTracks) &&
            timeTracks.map((track: TypeTimeTrack, index: number) => (
              <div key={index} className="w-1/2 px-3">
                <TimeTrackRecord {...track} />
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
