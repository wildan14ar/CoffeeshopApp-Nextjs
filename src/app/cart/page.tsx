"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/atoms/Loader";
import { BackButton } from "@/components/atoms/ButtonBack";
import { CiHeart, CiCirclePlus, CiCircleMinus } from "react-icons/ci";

// Cart Page Component
const CartPage = () => {
  const [cart, setCart] = useState(null);

  // Fetch cart data from API
  const fetchCart = async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      const data = await res.json();
      setCart(data);
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

  if (!cart) return <Loader />;

  // Sort cart items by cartItemId
  const sortedCartItems = cart.cartItems.sort((a, b) => a.id - b.id);

  return (
    <div className="w-full h-screen">
      {/* Store Info */}
      <div className="flex flex-row justify-between dark:bg-zinc-900 p-3">
        <BackButton />
        <h3 className="text-xl font-bold gradient-text">Review Order</h3>
      </div>

      <div className="flex flex-col justify-between p-4">
        <div className="flex flex-col flex-grow gap-3">
          {/* Cart Items */}
          {sortedCartItems.length > 0 ? (
            sortedCartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between items-center gap-3 p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div>
                    <h4 className="font-bold">{item.product.name} (<span>{item.quantity}</span>)</h4>
                    <p>
                      Base Price: Rp.{" "}
                      {item.product?.basePrice?.toLocaleString() || "N/A"}
                    </p>
                    <p>
                      Total: Rp.{" "}
                      {item?.totalBasePrice?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-start space-x-2 text-xl font-bold">
                  <button><CiHeart /></button>
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
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        {/* Cart Summary */}
        <div className="my-6 border-t border-gray-700 pt-4 flex flex-row justify-between items-center">
          <h3 className="text-xl font-bold">
            Total: Rp. {cart?.totalPrice?.toLocaleString() || "0"}
          </h3>
        </div>
        <button className="p-2 rounded-md bg-purple-600">Checkout Rp. {cart?.totalPrice?.toLocaleString() || "0"}</button>
      </div>
    </div>
  );
};

export default CartPage;
