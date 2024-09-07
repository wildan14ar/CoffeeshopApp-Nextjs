import { FaShoppingBag, FaUser } from "react-icons/fa";
import { BiSolidCoffeeBean } from "react-icons/bi";
import ButtonTheme from "@/components/atoms/ButtonTheme";

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full py-2 px-3 flex flex-row items-center justify-between bg-green-800 rounded-b z-10">
      <h1 className="text-2xl font-bold flex flex-row">
        <BiSolidCoffeeBean /> Choffeeshop
      </h1>
      <ul className="hidden md:flex flex-row gap-3">
        <li>Home</li>
        <li>Products</li>
        <li>Store</li>
      </ul>
      <ul className="flex flex-row gap-3">
        <li className="text-2xl">
          <FaShoppingBag title="Order" />
        </li>
        <li className="hidden md:block text-2xl">
          <FaUser title="Account" />
        </li>
        <ButtonTheme />
      </ul>
    </nav>
  );
}
