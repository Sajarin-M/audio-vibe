import { useWindowEvent } from '@mantine/hooks';
import { useAppStore, useCurrentSong } from '../../state/store';
import Controls from './controls';
import Player from './player';
import Seekbar from './seekbar';
import VolumeBar from './volume-bar';

export default function MusicPlayer() {
  const {
    repeat,
    shuffle,
    playing,
    currentTime,
    seekTime,
    togglePlay,
    duration,
    volume,
    doShuffle,
    playNext,
    playPrevious,
  } = useAppStore();

  const currentSong = useCurrentSong();

  useWindowEvent('keypress', (e) => {
    if (e.key === ' ') togglePlay();
  });

  return currentSong ? (
    <div className='h-[90px] flex items-center  py-3 px-2 gap-3 sm:gap-6 md:(gap-10 px-3) lg:gap-11 xl:gap-12'>
      <div className='flex items-center md:w-[24rem] truncate'>
        <img
          src={currentSong.image}
          alt='cover'
          className='w-[60px] h-[60px] bg-gray-300 rounded-xl'
        />

        <div className='display-none md:flex flex-col ml-4 justify-center truncate'>
          <div className='text-sm leading-relaxed truncate'>{currentSong.title}</div>
          <div className='text-gray-400 text-xs truncate'>{currentSong.description}</div>
        </div>
      </div>
      <div className='flex grow flex-col h-full items-center pt-1 gap-2'>
        <Controls
          repeat={repeat}
          shuffle={shuffle}
          playing={playing}
          setPlaying={togglePlay}
          setRepeat={(value) => useAppStore.setState({ repeat: value })}
          onNext={playNext}
          onPrevious={playPrevious}
          setShuffle={(value) => {
            useAppStore.setState({ shuffle: value });
            if (value) {
              doShuffle();
            }
          }}
        />
        <Seekbar
          duration={duration}
          currentTime={currentTime}
          onSeek={(value) => useAppStore.setState({ seekTime: value, currentTime: value })}
        />
      </div>
      <div className='w-[24rem] display-none md:flex items-center justify-end'>
        <VolumeBar volume={volume} onChange={(value) => useAppStore.setState({ volume: value })} />
      </div>

      {currentSong.url && (
        <Player
          volume={volume}
          seekTime={seekTime}
          isPlaying={playing}
          src={currentSong.url}
          onLoadedData={(e) => {
            useAppStore.setState({
              isLoading: false,
              duration: e.currentTarget.duration,
            });
          }}
          onTimeUpdate={(e) => useAppStore.setState({ currentTime: e.currentTarget.currentTime })}
          onEnded={() => console.log('endeds')}
        />
      )}
    </div>
  ) : null;
}
