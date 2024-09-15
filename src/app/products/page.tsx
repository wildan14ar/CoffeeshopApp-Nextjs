"use client";

import Link from "next/link";
import Product from "@/components/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/productSlice";
import BackButton from "@/components/atoms/ButtonBack";
import Loader from "@/components/atoms/Loader";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col sticky top-0 p-2 border-b-2 border-stink-900 bg-black z-10">
        <div className="flex flex-col gap-1 text-xl font-bold justify-start">
          <BackButton />
          <h2>Store</h2>
        </div>
        <ul className="flex flex-row justify-around items-center">
          <li>Menu</li>
          <li>Featured</li>
          <li>Previous</li>
          <li>Favorites</li>
        </ul>
      </div>

      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full overscroll-y-auto">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <Product product={product} />
          </Link>
        ))} 
      </div>
    </div>
  );
}
