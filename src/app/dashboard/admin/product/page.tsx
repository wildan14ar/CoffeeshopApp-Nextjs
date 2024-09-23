"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        const products = Object.values(result).flatMap((item) => item.products || []);
        setProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link href="/products/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-300 border-r">
                Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-300 border-r">
                Description
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-300 border-r">
                Price
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600 border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-r border-gray-300">{product.name}</td>
                <td className="py-2 px-4 border-r border-gray-300">{product.description || "No description"}</td>
                <td className="py-2 px-4 border-r border-gray-300">${product.base_price}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <Link href={`/products/${product.id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        View
                      </button>
                    </Link>
                    <Link href={`/dashboard/products/${product.id}`}>
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Edit
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
