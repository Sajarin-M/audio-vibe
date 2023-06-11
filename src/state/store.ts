import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { HomeDataItem, PlaybackQueueItem } from '../types';
import { createTrackUrl, getAlbumTracks, getTrack } from './queries';

type State = {
  playing: boolean;
  seekTime: number;
  duration: number;
  currentTime: number;
  playbackQueue: PlaybackQueueItem[] | null;
  currentPlaybackIndex: number;
  shuffle: boolean;
  repeat: boolean;
  isLoading: boolean;
  volume: number;
};

type Actions = {
  play: VoidFunction;
  pause: VoidFunction;
  togglePlay: VoidFunction;
  doShuffle: () => void;
  loadTrack: (index: number) => Promise<void>;
  loadAlbum: (album: HomeDataItem) => Promise<void>;
  playNext: VoidFunction;
  playPrevious: VoidFunction;
};

export const useAppStore = create(
  persist<State & Actions>(
    (set, get) => ({
      playing: false,
      seekTime: 0,
      currentTime: 0,
      duration: 0,
      isLoading: false,
      playbackQueue: null,
      currentPlaybackIndex: 0,
      shuffle: false,
      repeat: false,
      volume: 0.5,

      play: () => {
        set({ playing: true });
      },

      pause: () => {
        set({ playing: false });
      },

      togglePlay: () => {
        const { playing } = get();
        set({ playing: !playing });
      },

      doShuffle: () => {
        const { playbackQueue, currentPlaybackIndex } = get();
        if (!playbackQueue) return;

        const { playedTracks, shuffledRemainingTracks } = playbackQueue.reduce<{
          playedTracks: PlaybackQueueItem[];
          shuffledRemainingTracks: PlaybackQueueItem[];
        }>(
          (acc, track, index) => {
            if (index < currentPlaybackIndex) {
              acc.playedTracks.push(track);
            } else if (index > currentPlaybackIndex) {
              acc.shuffledRemainingTracks.splice(
                Math.floor(Math.random() * acc.shuffledRemainingTracks.length + 1),
                0,
                track,
              );
            }
            return acc;
          },
          {
            playedTracks: [],
            shuffledRemainingTracks: [],
          },
        );

        const shuffledQueue = [
          ...playedTracks,
          playbackQueue[currentPlaybackIndex],
          ...shuffledRemainingTracks,
        ];

        set({
          playbackQueue: shuffledQueue,
          currentPlaybackIndex: playedTracks.length,
        });
      },

      loadAlbum: async (album: HomeDataItem) => {
        try {
          const { loadTrack } = get();

          set({
            seekTime: 0,
            playing: false,
            currentTime: 0,
            isLoading: true,
          });
          setTimeout(() => set({ duration: 0 }), 0);

          const albumTracks = await getAlbumTracks(album.id);

          if (albumTracks.tracks.items.length > 0) {
            const image = album.cover?.[1].url ?? '';
            const playbackQueue: PlaybackQueueItem[] = albumTracks.tracks.items.map((track) => ({
              id: track.id,
              image,
              title: track.name,
              durationMs: track.durationMs,
              description: track.artists.map((artist) => artist.name).join(' , ') ?? '',
              shareUrl: track.shareUrl,
            }));
            set({ playbackQueue, currentPlaybackIndex: 0, playing: true });
            loadTrack(0);
          }
        } catch (error) {
          console.error(error);
        } finally {
          set({ isLoading: false });
        }
      },

      loadTrack: async (index: number, options: { preload?: boolean } = {}) => {
        try {
          const { playbackQueue } = get();
          if (!playbackQueue) return;

          const track = playbackQueue[index];
          if (track.url) return;

          if (options.preload) set({ isLoading: true });
          const url = createTrackUrl(await getTrack(track.shareUrl));

          const newPlaybackQueue = [...playbackQueue];
          newPlaybackQueue[index] = {
            ...track,
            url: url,
          };

          set({
            playbackQueue: newPlaybackQueue,
          });
        } catch (error) {
          console.error(error);
        } finally {
          set({ isLoading: false });
        }
      },

      playNext: () => {
        const { playbackQueue, currentPlaybackIndex, repeat, loadTrack } = get();
        if (!playbackQueue) return;

        const newState: Partial<State> = {
          seekTime: 0,
          currentTime: 0,
        };
        if (!repeat) {
          const nextSongIndex =
            currentPlaybackIndex === playbackQueue.length - 1 ? 0 : currentPlaybackIndex + 1;
          newState.currentPlaybackIndex = nextSongIndex;
          loadTrack(nextSongIndex);
        }
        set(newState);
      },
      playPrevious: () => {
        const { playbackQueue, currentPlaybackIndex, loadTrack } = get();
        if (!playbackQueue) return;

        const prevSongIndex =
          currentPlaybackIndex === 0 ? playbackQueue.length - 1 : currentPlaybackIndex - 1;

        loadTrack(prevSongIndex);
        set({
          seekTime: 0,
          currentTime: 0,
          currentPlaybackIndex: prevSongIndex,
        });
      },
    }),
    {
      name: 'music-player',
      partialize: (state) =>
        pick(
          state,
          'volume',
          'repeat',
          'shuffle',
          'duration',
          'currentTime',
          'playbackQueue',
          'currentPlaybackIndex',
        ) as any,
      merge: (persistedState: any, currentState: any) => ({
        ...currentState,
        ...persistedState,
        seekTime: persistedState.currentTime,
      }),
    },
  ),
);

function pick<T extends {}>(obj: T, ...keys: (keyof T)[]) {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key as keyof T)));
}

export const useCurrentSong = () => {
  const [playbackQueue, currentPlaybackIndex] = useAppStore(
    (s) => [s.playbackQueue, s.currentPlaybackIndex],
    shallow,
  );

  if (!playbackQueue) return null;
  return playbackQueue[currentPlaybackIndex];
};
