import Link from "next/link";

import { FaStoreAlt } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoHomeSharp, IoCard } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import CartItemCount from "@/components/atoms/CartItemCount";

export default function Footnav() {
  return (
    <div className="sticky bottom-0 md:hidden z-10">
      <div className="flex flex-row justify-between items-end">
        <h1 className="max-w-max max-h-max py-1 px-2 ml-2 rounded-t-sm bg-gradient-to-r from-purple-600 to-pink-600 font-extrabold">Vapmart</h1>
        <CartItemCount />
      </div>
      <ul className="bg-white dark:bg-zinc-900 h-[60px] flex flex-row items-center justify-between p-3">
        <Link href="/">
          <li className="text-xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
            <IoHomeSharp title="Home" />
            <span className="text-xs">Home</span>
          </li>
        </Link>

        <Link href="/order">
          <li className="text-xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
            <IoCard title="Order" />
            <span className="text-xs">Order</span>
          </li>
        </Link>

        <Link href="/product">
          <li className="text-xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
            <TiShoppingCart title="Product" />
            <span className="text-xs">Order</span>
          </li>
        </Link>

        <Link href="/profile">
          <li className="text-xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
            <IoIosStar title="Profile" />
            <span className="text-xs">Reward</span>
          </li>
        </Link>

        <Link href="/store">
          <li className="text-xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
            <FaStoreAlt title="Store" />
            <span className="text-xs">Store</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
