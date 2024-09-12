import { FaUser } from "react-icons/fa";
import { BiSolidCoffeeBean } from "react-icons/bi";
import ButtonTheme from "@/components/atoms/ButtonTheme";

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 w-full py-2 px-3 flex flex-row items-center justify-between z-10 border-b-4 border-b-slate-300 hidden md:block">
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
          <FaUser title="Account" />
        </li>
        <ButtonTheme />
      </ul>
    </nav>
  );
}
