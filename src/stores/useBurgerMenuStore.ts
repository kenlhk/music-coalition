import create from "zustand";

interface BurgerMenuStoreState {
  isOpen: boolean;
  setOpen: (item: boolean) => void;
}

const useBurgerMenuStore = create<BurgerMenuStoreState>((set) => ({
  isOpen: false,
  setOpen: (item) => set(() => ({ isOpen: item })),
}));

export default useBurgerMenuStore;
