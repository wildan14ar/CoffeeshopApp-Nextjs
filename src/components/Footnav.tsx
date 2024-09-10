import Link from "next/link";

import { FaStoreAlt } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { IoHomeSharp, IoCard } from "react-icons/io5";

export default function Footnav() {
  return (
    <ul className="bg-white sticky bottom-0 md:hidden flex flex-row items-center justify-between p-3 border-t-4 border-t-slate-300">
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
        <Link href="/products">
          <CiCoffeeCup title="Products" />
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
