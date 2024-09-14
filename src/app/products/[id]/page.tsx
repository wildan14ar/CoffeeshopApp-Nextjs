"use client";

import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  async function fetchProduct() {
    const response = await fetch(`/api/products/${params.id}`);
    const data = await response.json();
    setProduct(data);
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <Image
        src={product.image_url}
        alt={product.name}
        className="rounded w-full mx-auto min-h-auto"
        width={500}
        height={500}
      />
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-2">
          <div className="font-bold flex flex-row justify-between">
            <p>${product.base_price}</p>
            <div className="flex flex-row gap-2">
              <button>
                <CiCircleMinus />
              </button>
              <span>2</span>
              <button>
                <CiCirclePlus />
              </button>
            </div>
          </div>
          <h1 className="font-bold text-xl">{product.name}</h1>
          <p className="text-justify bg-gray-300 rounded p-2 text-xs">
            {product.description}
          </p>
        </div>

        {product.options && product.options.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold text-lg">Options</h2>
            {product.options.map((option) => (
              <div key={option.id} className="mb-2">
                <h3 className="font-medium">{option.name}</h3>
                <div>
                  {option.values.map((value) => (
                    <div key={value.id} className="mb-1 bg-gray-200 rounded p-2">
                      <label className="flex items-center justify-between">
                        <span>
                        {value.value}
                        </span>
                        <span>
                          +${value.additional_price}
                          <input
                            type="radio"
                            name={option.id} // unique name for each option
                            value={value.id}
                            className="mr-2"
                          />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
