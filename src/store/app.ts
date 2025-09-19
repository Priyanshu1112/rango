import { create } from "zustand";

interface AppState {
  error: string | null;
  success: string | null;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

const initialState = {
  error: null,
  success: null,
};

const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setError(error) {
    set({ error });
    setTimeout(() => {
      set({ error: null });
    }, 1000);
  },
  setSuccess(success) {
    set({ success });
    setTimeout(() => {
      set({ success: null });
    }, 1000);
  },
}));

export default useAppStore;
