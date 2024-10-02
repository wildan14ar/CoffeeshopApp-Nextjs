import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

const CartItemCount = () => {
  const storeId = useSelector((state: any) => state.store.selectedStoreId); // Get the selected storeId from Redux
  const [cart, setCart] = useState<any>(null); // Local state to store cart data
  const [loading, setLoading] = useState<boolean>(true); // To handle loading state

  useEffect(() => {
    // Trigger API call when storeId is available
    if (storeId) {
      setLoading(true); // Set loading state to true while fetching data
      fetch(`/api/cart?storeId=${storeId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch cart data");
          }
          return response.json();
        })
        .then((data) => {
          setCart(data);
          setLoading(false); // Once data is fetched, set loading state to false
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
          setLoading(false); // Stop loading if an error occurs
        });
    }
  }, [storeId]);

  // If the storeId is not set or data is loading, don't render anything
  if (!storeId || loading) {
    return null;
  }

  // If cartItems are empty or undefined, show empty cart message
  if (!cart || cart.length === 0) {
    return (
      <div className="sticky bottom-10 z-10 w-full h-[40px] max-w-[400px] bg-slate-600">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="w-2/4 bg-purple-600 py-1 pl-2 pr-5 flex flex-row items-center justify-between gap-2 rounded-tl-sm">
      <div>
        <h3 className="text-xs font-semibold">Pickup Store:</h3>
        <h1 className="text-sm font-bold">{cart.storeName}</h1>
      </div>
      <Link href="/cart">
        <div className="relative">
          <AiOutlineShoppingCart className="text-xl text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
            {cart.cartItems.length}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CartItemCount;
