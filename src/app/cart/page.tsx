"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Loader from "@/components/atoms/Loader";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import HeadingPhone from "@/components/atoms/HeadingPhone";
import { useRouter } from "next/navigation";

// Cart Page Component
const CartPage = () => {
  const router = useRouter();
  const storeId = useSelector((state) => state.store.selectedStoreId); // Get the selected storeId from Redux
  const [cartData, setCartData] = useState(null); // Initialize as null to handle loading state

  // Fetch cart data from API
  const fetchCart = async () => {
    try {
      const res = await fetch(`/api/cart?storeId=${storeId}`);
      if (res.ok) {
        const data = await res.json();
        console.log("Cart Data:", data); // Log the fetched data
        setCartData(data);
      } else {
        console.error("Failed to fetch cart data:", await res.text());
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (storeId === null) {
      router.push(`/store`);
    } else {
      fetchCart();
    }
  }, [storeId]);

  // Function to handle quantity changes
  const handleQuantityChange = async (cartItemId, productId, quantity) => {
    if (quantity < 0) return; // Don't allow quantity below 0

    try {
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
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (!cartData) {
    return <Loader />; // Show loader until cartData is fetched
  }

  // Calculate the total price for the cart
  const totalCartPrice = cartData.cartItems.reduce((total, item) => {
    const basePrice = item.totalBasePrice; // Base price of the product
    const optionsTotal = item.options.reduce(
      (acc, option) => acc + option.optionValue.additional_price,
      0
    );
    return total + basePrice + optionsTotal * item.quantity;
  }, 0);

  return (
    <div className="w-full bg-zinc-950">
      <HeadingPhone name="Review Order" />
      <div className="p-3 bg-zinc-900 flex flex-col gap-2">
        <h2 className="font-bold">Market Store: {cartData.storeName}</h2>
        <p>Address: {cartData.store.address}</p>
      </div>

      <div className="flex flex-col justify-between">
        {/* Display each cart item */}
        {cartData.cartItems.map((item) => {
          const product = item.product;
          const optionsTotal = item.options.reduce(
            (acc, option) => acc + option.optionValue.additional_price,
            0
          );

          return (
            <div
              key={item.id}
              className="flex flex-row max-h-max w-full gap-3 border-b-2 border-gray-500 py-3 px-3"
            >
              {/* Product Image */}
              <Image
                src={product.image_url}
                alt={product.name}
                width={50}
                height={50}
                className="h-full w-1/4 rounded"
              />

              {/* Product Info */}
              <div className="w-3/4 flex flex-col gap-1">
                <h4 className="font-bold">
                  {product.name} (<span>{item.quantity}</span>)
                </h4>
                <p>Base Price: Rp. {product.base_price.toLocaleString()}</p>

                {/* Display Options with Additional Prices */}
                {item.options.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <h5>Options:</h5>
                    {item.options.map((option) => (
                      <p key={option.id} className="p-1 text-xs bg-gray-200 text-black max-w-max max-h-max rounded-sm">
                        {option.optionValue.value} (+Rp.{" "}
                        {option.optionValue.additional_price.toLocaleString()})
                      </p>
                    ))}
                  </div>
                )}

                <p>
                  Total Base Price: Rp.{" "}
                  {(
                    item.totalBasePrice +
                    optionsTotal * item.quantity
                  ).toLocaleString()}
                </p>

                {/* Action buttons */}
                <div className="flex flex-row items-center justify-start space-x-2 text-xl font-bold">
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
          );
        })}

        {/* Cart Summary */}
        <div className="m-3 rounded bg-zinc-900 p-3">
          <h3>Cart Summary</h3>
          <p>Total Price: Rp. {totalCartPrice.toLocaleString()}</p>
        </div>
        <button className="p-2 m-2 rounded-md bg-purple-600 sticky bottom-2">
          Checkout Rp. {totalCartPrice.toLocaleString()}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
