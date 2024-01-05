import { create } from "zustand";

interface ModalProps {
    isSettingsOpen: boolean;
    onSettingsOpen: () => void;
    onSettingsClose: () => void;
}

export const useSettingsModal = create<ModalProps>((set) => ({
    isSettingsOpen: false,
    onSettingsOpen: () => set({ isSettingsOpen: true }),
    onSettingsClose: () => set({ isSettingsOpen: false })
}));