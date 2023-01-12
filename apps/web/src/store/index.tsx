import create from 'zustand';

const TOKEN_KEY: string = 'BETWYSE_TOKEN_KEY';

type State = {
  userId: string | null;
  isAuthenticated: boolean;
  onUpdateToken: (token: string | null, userId: string | null) => void;
};

const useStore = create<State>((set) => ({
  userId: null,
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  onUpdateToken: (token: string | null, userId: string | null) => {
    if (!token || token === '' || token === null) {
      localStorage.removeItem(TOKEN_KEY);
      set({ isAuthenticated: false, userId: null });
    } else {
      localStorage.setItem(TOKEN_KEY, token);
      set({ isAuthenticated: true, userId });
    }
  },
}));

export default useStore;
