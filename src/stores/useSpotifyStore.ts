import create from "zustand";

interface accessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface SpotifyStore {
  accessToken: accessToken | null;
  setAccessToken: (accessToken: accessToken) => void;
}

const useSpotifyStore = create<SpotifyStore>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
}));

export default useSpotifyStore;
