import create from "zustand";

interface SpotifyPlayerStore {
  player: Spotify.Player | null;
  setPlayer: (player: Spotify.Player | null) => void;
  deviceId: string | undefined;
  setDeviceId: (deviceId: string | undefined) => void;
  currentTrack: SpotifyApi.TrackObjectFull | undefined;
  setCurrentTrack: (track: SpotifyApi.TrackObjectFull) => void;
  // playbackState: Spotify.PlaybackState | null;
  // setPlaybackState: (playbackState: Spotify.PlaybackState | null) => void;
  isPaused: boolean | undefined;
  setIsPaused: (isPaused: boolean | undefined) => void;
  // pos: number | undefined;
  // setPos: (pos: number | undefined) => void;
  // error: Spotify.Error | undefined;
  // setError: (error: Spotify.Error | undefined) => void;
}

const useSpotifyPlayerStore = create<SpotifyPlayerStore>((set) => ({
  player: null,
  setPlayer: (player) => set(() => ({ player: player })),
  deviceId: undefined,
  setDeviceId: (deviceId) => set(() => ({ deviceId: deviceId })),
  currentTrack: undefined,
  setCurrentTrack: (track) => set(() => ({ currentTrack: track })),
  playbackState: null,
  // setPlaybackState: (playbackState) =>
  //   set(() => ({ playbackState: playbackState })),
  isPaused: false,
  setIsPaused: (isPaused) => set(() => ({ isPaused: isPaused })),
  // pos: 0,
  // setPos: (pos) => set(() => ({ pos: pos })),
  // error: undefined,
  // setError: (error) => set(() => ({ error: error })),
}));

export default useSpotifyPlayerStore;
