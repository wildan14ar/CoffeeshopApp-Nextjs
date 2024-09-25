"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/atoms/Loader";
import { BackButton } from "@/components/atoms/ButtonBack";
import { CiHeart, CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import HeadingPhone from "@/components/atoms/HeadingPhone";

// Cart Page Component
const CartPage = () => {
  const [cartData, setCartData] = useState([]); // Initialize with an empty array

  // Fetch cart data from API
  const fetchCart = async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      const data = await res.json();
      setCartData(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Handle Quantity Change
  const handleQuantityChange = async (cartItemId, productId, quantity) => {
    if (quantity < 0) return; // Don't allow quantity below 0

    // Send PATCH request to update quantity
    const res = await fetch(`/api/cart`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId, productId, quantity }),
    });

    if (res.ok) {
      fetchCart(); // Fetch the updated cart after quantity change
    } else {
      console.error("Failed to update quantity:", await res.text());
    }
  };

  if (!cartData.length) return <Loader />;

  // Group cart items by storeId
  const stores = cartData.reduce((acc, cart) => {
    const storeId = cart.storeId;
    if (!acc[storeId]) {
      acc[storeId] = { cartItems: [], totalPrice: 0 };
    }
    acc[storeId].cartItems.push(...cart.cartItems);
    acc[storeId].totalPrice += cart.totalPrice;
    return acc;
  }, {});

  // Calculate total price of all stores
  const totalCartPrice = Object.values(stores).reduce((total, storeData) => {
    return total + storeData.totalPrice;
  }, 0);

  return (
    <div className="w-full bg-zinc-950">
      {/* Store Info */}
      <HeadingPhone name="Review Order" />

      <div className="flex flex-col justify-between">
        {Object.entries(stores).map(([storeId, storeData]) => (
          <div key={storeId} className="flex flex-col">
            {/* Store Header */}
            <div className="w-full p-3">
              <h3 className="text-lg font-bold">Store {storeId}</h3>
            </div>

            <div className="flex flex-col gap-3 bg-black">
              {/* Cart Items for this store */}
              {storeData.cartItems.length > 0 ? (
                storeData.cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row h-[130px] w-full gap-3 border-b-2 border-gray-500 py-3 px-3"
                  >
                    <Image
                      src={item.product.image_url}
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="h-full w-1/4 rounded"
                    />
                    <div className="w-3/4 flex flex-col gap-1">
                      <h4 className="font-bold">
                        {item.product.name} (<span>{item.quantity}</span>)
                      </h4>
                      <p>
                        Base Price: Rp.{" "}
                        {item.product?.base_price?.toLocaleString() || "N/A"}
                      </p>
                      <p>
                        Total: Rp.{" "}
                        {item?.totalBasePrice?.toLocaleString() || "N/A"}
                      </p>

                      <div className="flex flex-row items-center justify-start space-x-2 text-xl font-bold">
                        <button>
                          <CiHeart />
                        </button>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.productId,
                              item.quantity - 1
                            )
                          }
                        >
                          <CiCircleMinus />
                        </button>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.productId,
                              item.quantity + 1
                            )
                          }
                        >
                          <CiCirclePlus />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty for this store.</p>
              )}
            </div>

            {/* Store Total */}
            <div className="w-full p-3">
              <h3 className="text-xl font-bold">
                Store Total: Rp. {storeData.totalPrice.toLocaleString() || "0"}
              </h3>
            </div>
          </div>
        ))}

        {/* Cart Summary */}
        <button className="p-2 rounded-md bg-purple-600">
          Checkout Rp. {totalCartPrice.toLocaleString() || "0"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
