import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';

export type PlayerProps = ComponentPropsWithoutRef<'audio'> & {
  volume: number;
  seekTime?: number;
  isPlaying: boolean;
};

export default function Player({ volume, seekTime, isPlaying, ...rest }: PlayerProps) {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (ref.current) ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (ref.current && seekTime !== undefined) ref.current.currentTime = seekTime;
  }, [seekTime]);

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) ref.current.play();
      else ref.current.pause();
    }
  }, [isPlaying]);

  return <audio {...rest} ref={ref} />;
}
