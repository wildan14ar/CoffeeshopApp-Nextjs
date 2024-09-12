"use client"

import Product from "@/components/Product";
// import { products } from "@/sample";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/features/productSlice';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full flex flex-col">
      <ul className="flex flex-row border-b-2 border-slate-200 p-2 justify-around items-center">
        <li>Menu</li>
        <li>Featured</li>
        <li>Previous</li>
        <li>Favorites</li>
      </ul>
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full overscroll-y-auto">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
