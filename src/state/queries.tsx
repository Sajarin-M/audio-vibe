import { PropsWithChildren, lazy, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, QueryOptions, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { AlbumTracksData, HomeData as HomePageData } from '../types';

const options: QueryOptions | undefined = import.meta.env.DEV
  ? {
      networkMode: 'always',
    }
  : undefined;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...options,
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: { ...options },
  },
});

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

export function QueryProvider({ children }: PropsWithChildren) {
  const [showDevtools, setShowDevtools] = useState(import.meta.env.MODE === 'staging');

  useEffect(() => {
    // @ts-ignore
    window.toggleQueryDevtools = () => setShowDevtools((prev) => !prev);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
      {showDevtools && <ReactQueryDevtoolsProduction />}
    </QueryClientProvider>
  );
}

const baseURL = 'http://localhost:3000/';
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = Infinity;

const rapidBaseUrl = 'https://spotify-scraper.p.rapidapi.com';

export const useHomePageData = () =>
  useQuery(['home'], async () => {
    const { data } = await axios.post(cachedRequestEndpoint, {
      method: 'GET',
      params: { region: 'IN' },
      url: `${rapidBaseUrl}/v1/home`,
    });
    return data as HomePageData;
  });

const cachedRequestEndpoint = '/cache-request';

export async function getAlbumTracks(albumId: string) {
  const { data } = await axios.post(cachedRequestEndpoint, {
    method: 'GET',
    params: { albumId },
    url: `${rapidBaseUrl}/v1/album/tracks`,
  });
  return data as AlbumTracksData;
}

export async function getTrack(url: string) {
  const { data } = await axios.post('/music-url', { url });
  return data;
}

export function createTrackUrl(filename: string) {
  return `${baseURL}songs/${filename}`;
}
