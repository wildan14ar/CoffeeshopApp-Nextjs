"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  }

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
                <td className="py-2 px-4 border-r border-gray-300">{product.description}</td>
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
