"use client";

import Link from "next/link";
import Product from "@/components/Product";
import { useEffect, useState } from "react";
import { BackButton } from "@/components/atoms/ButtonBack";
import Loader from "@/components/atoms/Loader";

export default function ProductsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the /api/blog endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Show loader if loading
  if (loading) return <Loader />;

  // Show error message if any
  if (error) return <p>Error: {error}</p>;

  // Extract and flatten products
  const products = data ? Object.values(data).flatMap(item => item.products || []) : [];

  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center">
      <div className="flex flex-col sticky top-0 p-2 border-b-2 border-stink-900 bg-black z-10 w-full md:w-[1/5]">
        <div className="flex flex-row justify-between items-center gap-1 text-xl font-bold md:hidden my-2">
          <BackButton />
          <h2 className="gradient-text text-2xl">Product</h2>
        </div>
        <ul className="flex flex-row w-full md:flex-col justify-around items-center md:items-start md:gap-2">
          <li>Menu</li>
          <li>Featured</li>
          <li>Previous</li>
          <li>Favorites</li>
        </ul>
      </div>
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full overscroll-y-auto">
        {products && products.length > 0 ? (
          products.map((product) => (
            product?.id && (
              <Link href={`/product/${product.id}`} key={product.id}>
                <Product product={product} />
              </Link>
            )
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
