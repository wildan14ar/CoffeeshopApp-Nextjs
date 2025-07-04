"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import Loader from "@/components/atoms/Loader";
import { BackButtonX } from "@/components/atoms/ButtonBack";
import FavoriteProduct from "@/components/atoms/FavoriteProduct";

export default function ProductPage(props) {
  const params = use(props.params);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${params.id}`);
        const data = await response.json();
        setProduct(data);

        // Set default options to the first available option value
        const defaultOptions = {};
        if (data.options) {
          data.options.forEach(option => {
            if (option.values.length > 0) {
              defaultOptions[option.id] = option.values[0].id; // Set the first value as default
            }
          });
        }
        setSelectedOptions(defaultOptions); // Update selected options with defaults

      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleOptionChange = (optionId, valueId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: valueId,
    }));
  };

  const handleAddToCart = async () => {
    setCartLoading(true);
    setCartError(null);

    try {
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          options: Object.keys(selectedOptions).map((optionId) => ({
            optionValueId: selectedOptions[optionId],
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      alert("Product added to cart successfully!");
    } catch (error) {
      setCartError("Error adding to cart. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    if (!product) return 0;

    let totalPrice = product.base_price * quantity; // Base price multiplied by quantity

    // Add additional price from selected options
    Object.keys(selectedOptions).forEach((optionId) => {
      const selectedValueId = selectedOptions[optionId];
      const option = product.options.find((opt) => opt.id === parseInt(optionId)); // Ensure option ID is an integer
      
      // Ensure option is found
      if (option) {
        const value = option.values.find((val) => val.id === selectedValueId);
        
        // Ensure value is found
        if (value) {
          totalPrice += value.additional_price * quantity; // Multiply additional price by quantity
        }
      }
    });

    return totalPrice;
  };

  if (!product) return <Loader />;

  return (
    <div className="p-2 flex flex-col md:flex-row gap-2 md:gap-5 mx-auto max-w-[1200px] md:mt-20">
      <div className="absolute top-3 left-3 z-10 text-3xl text-black">
        <BackButtonX />
      </div>
      <Image
        src={product.image_url}
        alt={product.name}
        className="rounded w-full max-w-[400px] mx-auto h-auto"
        width={500}
        height={500}
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl flex flex-row justify-between items-center">
          <span>{product.name}</span>
          <span>
            <FavoriteProduct productId={product.id} />
          </span>
        </h1>
        <div className="flex flex-col gap-2 text-lg">
          <div className="font-bold flex flex-row justify-between">
            <p>Rp {product.base_price}</p> {/* Display calculated total price */}
            <div className="flex flex-row gap-2 items-center">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                <FaCircleMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <FaCirclePlus />
              </button>
            </div>
          </div>
          <hr />
          <p className="text-justify border border-slate-300 rounded p-2 text-xs">
            {product.description}
          </p>
        </div>
        {product.options && product.options.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold text-lg">Options</h2>
            {product.options.map((option) => (
              <div key={option.id} className="mb-2">
                <h3 className="font-medium">{option.name}</h3>
                <div className="flex flex-col gap-2">
                  {option.values.map((value) => (
                    <div
                      key={value.id}
                      onClick={() => handleOptionChange(option.id, value.id)}
                      className={`cursor-pointer border rounded p-2 w-full flex flex-row justify-between ${
                        selectedOptions[option.id] === value.id
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <span>{value.value}</span>
                      {value.additional_price >= 1 && <span>(+Rp {value.additional_price})</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white p-2 rounded mt-4"
          disabled={cartLoading}
        >
          {cartLoading ? "Adding to Cart..." : `Add to Cart - Rp ${calculateTotalPrice()}`} {/* Display total price on button */}
        </button>
        {cartError && <p className="text-red-500">{cartError}</p>}
      </div>
    </div>
  );
}
