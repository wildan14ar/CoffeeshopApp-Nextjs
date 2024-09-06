import Link from "next/link";

import { FaHome, FaBox, FaStore, FaUser } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";

export default function Footnav() {
  return (
    <ul className="sticky bottom-0 md:hidden flex flex-row items-center justify-between p-3 bg-green-600">
      <li className="text-2xl">
        <Link href="/">
          <FaHome title="Home" />
        </Link>
      </li>
      <li className="text-2xl">
        <Link href="/products">
          <FaBox title="Products" />
        </Link>
      </li>
      <li className="text-2xl">
        <Link href="/order">
          <CiMemoPad title="Order" />
        </Link>
      </li>
      <li className="text-2xl">
        <Link href="/store">
          <FaStore title="Store" />
        </Link>
      </li>
      <li className="text-2xl">
        <Link href="/profile">
          <FaUser title="Profile" />
        </Link>
      </li>
    </ul>
  );
}
