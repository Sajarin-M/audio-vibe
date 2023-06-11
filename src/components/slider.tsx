import * as RSlider from '@radix-ui/react-slider';
import { SliderProps as RSliderProps } from '@radix-ui/react-slider';

export type SliderProps = RSliderProps & {
  alwaysShowThumb?: boolean;
};

export default function Slider({ className, alwaysShowThumb, ...rest }: SliderProps) {
  return (
    <RSlider.Root
      {...rest}
      className={`relative flex items-center select-none touch-none h-[20px] group ${className}`}
    >
      <RSlider.Track className='bg-dark-1 relative grow h-[3.2px] rounded-full'>
        <RSlider.Range className='bg-white group-hover:bg-green-6 transition-colors rounded-full h-full absolute' />
      </RSlider.Track>
      <RSlider.Thumb
        className={`display-block w-[12px] h-[12px] bg-white rounded-full focus:outline-none ${
          alwaysShowThumb ? '' : 'opacity-0 hidden'
        } group-hover:(opacity-100 visible) transition-all`}
      />
    </RSlider.Root>
  );
}
