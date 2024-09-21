"use client";

import Link from "next/link";
import Product from "@/components/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/productSlice"; // Pastikan path ke productSlice benar
import { BackButton } from "@/components/atoms/ButtonBack";
import Loader from "@/components/atoms/Loader";

export default function ProductsPage() {
  const dispatch = useDispatch();
  
  // Ambil state dari Redux store untuk products
  const { products, loading, error } = useSelector((state) => state.products); // Pastikan 'products' sesuai dengan state key dari store.js
  
  // Fetch products ketika komponen di-mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Tampilkan loader jika sedang loading
  if (loading) return <Loader />;
  
  // Tampilkan error jika ada masalah dalam fetching
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center">
      <div className="flex flex-col sticky top-0 p-2  border-b-2 border-stink-900 bg-black z-10 w-full md:w-[1/5]">
        <div className="flex flex-col gap-1 text-xl font-bold justify-start md:hidden">
          <BackButton />
          <h2>Store</h2>
        </div>
        <ul className="flex flex-row w-full md:flex-col justify-around items-center md:items-start md:gap-2">
          <li>Menu</li>
          <li>Featured</li>
          <li>Previous</li>
          <li>Favorites</li>
        </ul>
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full overscroll-y-auto">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
