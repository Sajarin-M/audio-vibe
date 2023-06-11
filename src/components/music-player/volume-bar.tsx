import { useHover } from '@mantine/hooks';
import Slider from '../slider';

export type VolumeBarProps = {
  volume: number;
  onChange: (value: number) => void;
};

export default function VolumeBar({ volume, onChange }: VolumeBarProps) {
  const { hovered, ref } = useHover();

  const isMuted = volume === 0;
  const isLow = volume < 0.4;

  return (
    <div className='flex text-xl gap-3'>
      <div
        ref={ref}
        className={`text-gray-4 hover:text-gray-1 transition-colors ${
          isMuted ? 'i-tabler:volume-3' : isLow ? 'i-tabler:volume-2' : 'i-tabler:volume'
        }`}
        onClick={() => {
          onChange(isMuted ? 0.5 : 0);
        }}
      />
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[volume]}
        className='w-[100px]'
        alwaysShowThumb={hovered}
        onValueChange={([value]) => onChange(value)}
      />
    </div>
  );
}
