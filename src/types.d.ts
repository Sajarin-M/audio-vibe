export interface HomeData {
  genres: HomeDataGenre[];
  status: boolean;
}

export interface HomeDataItem {
  artists?: HomeDataGenre[];
  cover?: HomeDataCover[];
  date?: Date;
  description?: string;
  id: string;
  images?: Array<HomeDataCover[]>;
  name: string;
  owner?: HomeDataGenre;
  shareUrl: string;
  trackCount: number;
  type: HomeDataItemType;
}

export interface HomeDataContents {
  items: HomeDataItem[];
  totalCount: number;
}

export interface HomeDataGenre {
  contents?: HomeDataContents;
  id: string;
  name: string;
  shareUrl: string;
  type: HomeDataGenreType;
}

export interface HomeDataCover {
  height: number | null;
  url: string;
  width: number | null;
}

export enum HomeDataItemType {
  Album = 'album',
  Playlist = 'playlist',
}

export enum HomeDataGenreType {
  Artist = 'artist',
  Genre = 'genre',
  User = 'user',
}

export interface AlbumTracksData {
  status: boolean;
  tracks: AlbumTrack;
}

export interface AlbumTrack {
  totalCount: number;
  items: AlbumTrackItem[];
}

export interface AlbumTrackItem {
  type: string;
  id: string;
  name: string;
  shareUrl: string;
  durationMs: number;
  durationText: string;
  discNumber: number;
  trackNumber: number;
  playCount: number;
  artists: AlbumTrackArtist[];
}

export interface AlbumTrackArtist {
  type: string;
  id: string;
  name: string;
  shareUrl: string;
}

export interface PlaybackQueueItem {
  id: string;
  url?: string;
  image: string;
  title: string;
  description: string;
  shareUrl: string;
}
