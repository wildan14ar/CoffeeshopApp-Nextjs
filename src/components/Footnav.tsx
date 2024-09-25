import Link from "next/link";

import { FaStoreAlt } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoHomeSharp, IoCard } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";

export default function Footnav() {
  return (
    <ul className="bg-white dark:bg-zinc-900 h-[60px] sticky bottom-0 md:hidden flex flex-row items-center justify-between p-3 z-10">
      <Link href="/">
        <li className="text-2xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <IoHomeSharp title="Home" />
          <span className="text-xs">Home</span>
        </li>
      </Link>

      <Link href="/order">
        <li className="text-2xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <IoCard title="Order" />
          <span className="text-xs">Order</span>
        </li>
      </Link>

      <Link href="/product">
        <li className="text-2xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <TiShoppingCart title="Product" />
          <span className="text-xs">Order</span>
        </li>
      </Link>

      <Link href="/profile">
        <li className="text-2xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <IoIosStar title="Profile" />
          <span className="text-xs">Reward</span>
        </li>
      </Link>

      <Link href="/store">
        <li className="text-2xl transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center">
          <FaStoreAlt title="Store" />
          <span className="text-xs">Store</span>
        </li>
      </Link>
    </ul>
  );
}
