import { fetchTodayTimeTracks } from '@/hooks/api-hooks';
import type { TypeTimeTrack } from '@/lib/types';
import { calculateTotalDuration, formatDuration } from '@/lib/utils/date';
import { isNonEmptyArray } from '@/lib/utils/functions';
import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import TimeTrackRecord from './TimeTrackRecord';

const CurrentTracks = () => {
  const [timeTracks, setTimeTracks] = useState<TypeTimeTrack[]>([]);
  const [totalDaily, setTotalDaily] = useState<string>('');

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
    <div className="w-full h-full bg-yellow-50 border rounded-xl justify-items-center">
      <h3 className="w-full border rounded-t-xl text-center bg-gradient-to-l from-[#27F090] via-[#7F41F3] to-[#F59527] px-4 md:px-10 text-[35px] font-bold text-white">
        Logged Total time today: {totalDaily}
      </h3>
      <h4 className="text-left w-full font-serif italic py-4 px-8 text-[30px]">
        Your latest time tracks for today
      </h4>
      <ul className="w-2/3 py-4">
        {isNonEmptyArray(timeTracks) &&
          timeTracks.map((track: TypeTimeTrack, index: number) => (
            <TimeTrackRecord key={index} {...track} />
          ))}
      </ul>
    </div>
  );
};

export default CurrentTracks;
