import create from "zustand";

interface BackgroundPlayerState {
  url: string | null;
  setUrl: (url: string | null) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  auto: boolean;
  setAuto: (auto: boolean) => void;
}

const useBackgroundPlayerStore = create<BackgroundPlayerState>((set) => ({
  url: "",
  setUrl: (url) => set(() => ({ url: url })),
  playing: false,
  setPlaying: (playing) => set(() => ({ playing: playing })),
  auto: false,
  setAuto: (auto) => set(() => ({ auto: auto })),
}));

export default useBackgroundPlayerStore;
