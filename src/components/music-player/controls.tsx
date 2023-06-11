export type ControlsProps = {
  playing: boolean;
  setPlaying: (value: boolean) => void;
  repeat: boolean;
  setRepeat: (value: boolean) => void;
  shuffle: boolean;
  setShuffle: (value: boolean) => void;
  onNext: VoidFunction;
  onPrevious: VoidFunction;
};

export default function Controls({
  playing,
  setPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  onNext,
  onPrevious,
}: ControlsProps) {
  return (
    <div className='flex gap-6 items-center md:text-xl text-gray-4'>
      <div
        className={`i-tabler:arrows-shuffle transition-colors ${
          shuffle ? 'text-green-6 hover:text-green-5' : 'hover:text-gray-1'
        }`}
        onClick={() => setShuffle(!shuffle)}
      ></div>
      <div
        onClick={onPrevious}
        className='i-tabler:player-skip-back-filled hover:text-gray-1 transition-colors'
      ></div>
      <div
        onClick={() => setPlaying(!playing)}
        className='p-[0.4rem] bg-white focus:outline-none outline-none rounded-full transition-all '
      >
        <div
          className={`text-black transition-all ${
            playing ? 'i-tabler:player-pause-filled' : 'i-tabler:player-play-filled'
          }`}
        ></div>
      </div>
      <div
        onClick={onNext}
        className='i-tabler:player-skip-forward-filled hover:text-gray-1 transition-colors'
      ></div>
      <div
        className={`i-tabler:repeat transition-colors ${
          repeat ? 'text-green-6 hover:text-green-5' : 'hover:text-gray-1'
        }`}
        onClick={() => setRepeat(!repeat)}
      ></div>
    </div>
  );
}
