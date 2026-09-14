import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from './productsSlice';
import ProductCard from './ProductCard';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="product-list">
        <div className="product-list__header">
          <h2 className="product-list__title">Sản phẩm</h2>
          <p className="product-list__subtitle">Đang tải danh sách sản phẩm...</p>
        </div>
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton--image" />
              <div className="skeleton-card__body">
                <div className="skeleton skeleton--title" />
                <div className="skeleton skeleton--text" />
                <div className="skeleton skeleton--text skeleton--short" />
                <div className="skeleton-card__footer">
                  <div className="skeleton skeleton--price" />
                  <div className="skeleton skeleton--button" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list">
        <div className="product-list__error">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3>Không thể tải sản phẩm</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list__header">
        <h2 className="product-list__title">Sản phẩm nổi bật</h2>
        <p className="product-list__subtitle">
          Khám phá {products.length} sản phẩm công nghệ hàng đầu
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
