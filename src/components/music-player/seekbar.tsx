import { useState } from 'react';
import Slider from '../slider';

export type SeekbarProps = {
  duration: number;
  currentTime: number;
  onSeek: (value: number) => void;
};

const getTime = (time: number) =>
  `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

export default function Seekbar({ currentTime, duration, onSeek }: SeekbarProps) {
  const [remainingMode, setRemainingMode] = useState(false);

  return (
    <div className='flex gap-3 items-center w-full'>
      <span className='text-gray-4 text-xxs w-[1.9rem] text-end'>{getTime(currentTime)}</span>
      <Slider
        min={0}
        max={duration}
        defaultValue={[0]}
        className='grow'
        disabled={duration == 0}
        value={duration > 0 ? [currentTime] : [0]}
        onValueChange={([value]) => {
          onSeek(value);
        }}
      />
      <span
        className='text-gray-4 text-xxs w-[1.7rem]'
        onClick={() => setRemainingMode(!remainingMode)}
      >
        {remainingMode ? '-' : ''}
        {getTime(remainingMode ? duration - currentTime : duration)}
      </span>
    </div>
  );
}
