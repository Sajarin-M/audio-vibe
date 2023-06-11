import { useHomePageData } from '../state/queries';
import { useAppStore } from '../state/store';
import { HomeDataGenre, HomeDataItem } from '../types';

export default function Home() {
  const { data } = useHomePageData();

  const loadAlbum = useAppStore((s) => s.loadAlbum);

  const filteredGenres =
    data?.genres.reduce((genres, genre) => {
      if (genre.contents && genre.contents.items.length > 0) {
        const coveredItems = genre.contents.items.reduce((items, item) => {
          if (item.cover && item.cover.length > 0 && item.type === 'album') {
            items.push(item);
          }
          return items;
        }, [] as HomeDataItem[]);
        if (coveredItems.length > 0) {
          genres.push({
            ...genre,
            contents: {
              ...genre.contents,
              items: coveredItems,
            },
          });
        }
      }
      return genres;
    }, [] as HomeDataGenre[]) ?? [];

  return (
    <div className='flex flex-col gap-8 md:gap-9'>
      {filteredGenres.map((genre) => (
        <div key={genre.id} className=''>
          <div className='font-bold text-xl md:text-2xl mb-6 md:mb-7'>{genre.name}</div>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:(grid-cols-4 gap-6) lg:(grid-cols-5 gap-7) xl:grid-cols-6'>
            {genre.contents?.items.map((item) => (
              <div
                key={item.id}
                onClick={() => loadAlbum(item)}
                className='bg-dark-6 hover:bg-dark-3 transition-colors duration-400 rounded-lg shadow'
              >
                <div className='sm:p-4 rounded-sm overflow-hidden'>
                  <img
                    src={item.cover?.[1].url}
                    alt={item.name}
                    className='w-full h-[11.5rem] sm:h-[12rem] md:h-[12rem] object-cover rounded-md'
                  />
                </div>
                <div className='px-4 pb-4'>
                  <div className='font-bold truncate my-2 text-sm'>{item.name}</div>
                  <div className='text-xs line-clamp-2 text-gray-400'>
                    {item.artists?.map((a) => a.name).join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
