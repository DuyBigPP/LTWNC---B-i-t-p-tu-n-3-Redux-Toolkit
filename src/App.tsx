import { useState } from 'react';
import ProductList from './features/products/ProductList';
import Cart from './features/cart/Cart';
import CartIcon from './features/cart/CartIcon';
import FavoritesList from './features/favorites/FavoritesList';
import FavoritesIcon from './features/favorites/FavoritesIcon';
import { FavoritesProvider } from './features/favorites/FavoritesContext';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  return (
    <FavoritesProvider>
      <div className="app">
        <nav className="navbar">
          <div className="navbar__inner">
            <span className="navbar__brand">HIHI</span>
            <div className="navbar__actions">
              <FavoritesIcon onClick={() => setFavOpen(true)} />
              <CartIcon onClick={() => setCartOpen(true)} />
            </div>
          </div>
        </nav>

        <main className="main">
          <ProductList />
        </main>

        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <FavoritesList isOpen={favOpen} onClose={() => setFavOpen(false)} />
      </div>
    </FavoritesProvider>
  );
}
