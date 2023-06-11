import * as ScrollArea from '@radix-ui/react-scroll-area';
import MusicPlayer from './components/music-player';
import Home from './pages/home';
import { QueryProvider } from './state/queries';

export default function App() {
  return (
    <QueryProvider>
      <div className='bg-black h-screen w-screen flex flex-col px-2 pt-2 font-default text-gray-1'>
        <div className='flex overflow-hidden grow w-full gap-2'>
          <ScrollArea.Root className='grow rounded-md relative h-full overflow-hidden bg-dark-9'>
            <ScrollArea.Viewport className='w-full h-full rounded-md px-2 py-4 md:py-4 lg:p-6 z-10'>
              <Home />
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation='vertical'
              className='w[6px] sm:w[10px] md:w-[14px] flex select-none touch-none p-[2px] py-1 bg-transparent transition-colors'
            >
              <ScrollArea.Thumb className="grow bg-dark-5 rounded-xs relative before:(content-[''] top-1/2 left-1/2 -translate-1/2) w-full h-full min-w-[44px] min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar className='ScrollAreaScrollbar' orientation='horizontal'>
              <ScrollArea.Thumb className='ScrollAreaThumb' />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className='bg-dark-9' />
          </ScrollArea.Root>
        </div>
        <MusicPlayer />
      </div>
    </QueryProvider>
  );
}
