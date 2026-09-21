import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react';

type FavoritesAction =
  | { type: 'TOGGLE_FAVORITE'; productId: number }

interface FavoritesState {
  ids: number[];
}

const initialState: FavoritesState = {
  ids: [],
};

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const exists = state.ids.includes(action.productId);
      return {
        ids: exists
          ? state.ids.filter((id) => id !== action.productId)
          : [...state.ids, action.productId],
      };
    }
    default:
      return state;
  }
}

interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const value = useMemo<FavoritesContextValue>(() => ({
    favoriteIds: state.ids,
    isFavorite: (productId: number) => state.ids.includes(productId),
    toggleFavorite: (productId: number) =>
      dispatch({ type: 'TOGGLE_FAVORITE', productId }),
  }), [state.ids]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return ctx;
}
