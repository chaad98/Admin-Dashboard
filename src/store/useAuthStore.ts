import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));

export default useAuthStore;
