import create from "zustand";

interface LoadingStoreState {
  isLoading: boolean;
  setLoading: (item: boolean) => void;
}

const useLoadingStore = create<LoadingStoreState>((set) => ({
  isLoading: false,
  setLoading: (item) => set(() => ({ isLoading: item })),
}));

export default useLoadingStore;
