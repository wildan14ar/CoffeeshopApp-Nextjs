import Link from "next/link";

import { FaStoreAlt } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoHomeSharp, IoCard } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";

export default function Footnav() {
  return (
    <ul className="bg-white dark:bg-zinc-900 sticky bottom-0 md:hidden flex flex-row items-center justify-between p-3">
      <li className="text-2xl transform transition-transform duration-300 hover:scale-125">
        <Link href="/">
          <IoHomeSharp title="Home" />
        </Link>
      </li>
      <li className="text-2xl transform transition-transform duration-300 hover:scale-125">
        <Link href="/order">
          <IoCard title="Order" />
        </Link>
      </li>
      <li className="text-2xl transform transition-transform duration-300 hover:scale-125">
        <Link href="/product">
          <TiShoppingCart title="Product" />
        </Link>
      </li>
      <li className="text-2xl transform transition-transform duration-300 hover:scale-125">
        <Link href="/profile">
          <IoIosStar title="Profile" />
        </Link>
      </li>
      <li className="text-2xl transform transition-transform duration-300 hover:scale-125">
        <Link href="/store">
          <FaStoreAlt title="Store" />
        </Link>
      </li>
    </ul>
  );
}
