import create from "zustand";

interface PanelStoreState {
  genre: string;
  setGenre: (genre: string) => void;
  acousticness: number;
  setAcousticness: (acousticness: number) => void;
  danceability: number;
  setDanceability: (danceability: number) => void;
  energy: number;
  setEnergy: (energy: number) => void;
  instrumentalness: number;
  setInstrumentalness: (instrumentalness: number) => void;
  liveness: number;
  setLiveness: (liveness: number) => void;
  speechiness: number;
  setSpeechiness: (speechiness: number) => void;
  valence: number;
  setValence: (valence: number) => void;
}

const usePanelStore = create<PanelStoreState>((set) => ({
  genre: "",
  setGenre: (genre) => set(() => ({ genre: genre })),
  acousticness: 50,
  setAcousticness: (acousticness) =>
    set(() => ({ acousticness: acousticness })),
  danceability: 50,
  setDanceability: (danceability) =>
    set(() => ({ danceability: danceability })),
  energy: 50,
  setEnergy: (energy) => set(() => ({ energy: energy })),
  instrumentalness: 50,
  setInstrumentalness: (instrumentalness) =>
    set(() => ({ instrumentalness: instrumentalness })),
  liveness: 50,
  setLiveness: (liveness) => set(() => ({ liveness: liveness })),
  speechiness: 50,
  setSpeechiness: (speechiness) => set(() => ({ speechiness: speechiness })),
  valence: 50,
  setValence: (valence) => set(() => ({ valence: valence })),
}));

export default usePanelStore;
