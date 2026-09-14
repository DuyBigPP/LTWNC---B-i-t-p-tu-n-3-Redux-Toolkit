import { useState } from 'react';
import ProductList from './features/products/ProductList';
import Cart from './features/cart/Cart';
import CartIcon from './features/cart/CartIcon';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar__inner">
          <span className="navbar__brand">HIHI</span>
          <CartIcon onClick={() => setCartOpen(true)} />
        </div>
      </nav>

      <main className="main">
        <ProductList />
      </main>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
