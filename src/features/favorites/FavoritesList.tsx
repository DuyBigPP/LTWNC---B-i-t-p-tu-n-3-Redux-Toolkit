import { useAppSelector } from '../../app/hooks';
import { selectProducts } from '../products/productsSlice';
import { useFavorites } from './FavoritesContext';

interface FavoritesListProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesList({ isOpen, onClose }: FavoritesListProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const allProducts = useAppSelector(selectProducts);
  const favoriteProducts = allProducts.filter((p) => favoriteIds.includes(p.id));

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`}
        onClick={onClose}
      />
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Yêu thích
            {favoriteProducts.length > 0 && (
              <span className="cart-drawer__count">({favoriteProducts.length})</span>
            )}
          </h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Đóng">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="cart-drawer__empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p>Chưa có sản phẩm yêu thích</p>
            <span>Bấm biểu tượng trái tim trên sản phẩm để thêm vào đây!</span>
          </div>
        ) : (
          <div className="cart-drawer__items">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="cart-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item__image"
                />
                <div className="cart-item__info">
                  <h4 className="cart-item__name">{product.name}</h4>
                  <p className="cart-item__price">{formatPrice(product.price)}</p>
                  <div className="cart-item__controls">
                    <span className="fav-item__category">{product.category}</span>
                    <button
                      className="cart-item__remove"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label="Bỏ yêu thích"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
