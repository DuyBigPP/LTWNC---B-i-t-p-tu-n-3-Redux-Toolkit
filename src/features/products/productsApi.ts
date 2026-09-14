import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from './types';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: 62990000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    description: 'Laptop cao cấp với chip M3 Pro, màn hình Liquid Retina XDR, hiệu năng vượt trội.',
    category: 'Laptop',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    price: 34990000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    description: 'Smartphone flagship với chip A17 Pro, camera 48MP, thiết kế titan.',
    category: 'Điện thoại',
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    price: 6790000,
    image: 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=400&h=300&fit=crop',
    description: 'Tai nghe không dây với chống ồn chủ động, âm thanh không gian cá nhân hoá.',
    category: 'Phụ kiện',
  },
  {
    id: 4,
    name: 'iPad Air M2',
    price: 18990000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    description: 'Máy tính bảng mạnh mẽ với chip M2, màn hình Liquid Retina 11 inch.',
    category: 'Tablet',
  },
  {
    id: 5,
    name: 'Apple Watch Ultra 2',
    price: 21990000,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
    description: 'Đồng hồ thông minh siêu bền, GPS chính xác, pin lên tới 36 giờ.',
    category: 'Đồng hồ',
  },
  {
    id: 6,
    name: 'Magic Keyboard',
    price: 8990000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    description: 'Bàn phím không dây với Touch ID, thiết kế mỏng nhẹ, kết nối ổn định.',
    category: 'Phụ kiện',
  },
  {
    id: 7,
    name: 'Studio Display',
    price: 45990000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    description: 'Màn hình 5K Retina 27 inch, camera 12MP Center Stage, âm thanh 6 loa.',
    category: 'Màn hình',
  },
  {
    id: 8,
    name: 'HomePod mini',
    price: 2790000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    description: 'Loa thông minh nhỏ gọn với Siri, âm thanh 360 độ, điều khiển nhà thông minh.',
    category: 'Phụ kiện',
  },
];


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return { data: mockProducts };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
