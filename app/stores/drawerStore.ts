import { create } from "zustand";

type DrawerStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggle: () => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  openDrawer: () => set({ open: true }),
  closeDrawer: () => set({ open: false }),
  toggle: () => set((s) => ({ open: !s.open })),
}));
