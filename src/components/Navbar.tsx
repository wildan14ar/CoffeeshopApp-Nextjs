import { FaUser } from "react-icons/fa";
import { ButtonThemeIcon } from "@/components/atoms/ButtonTheme";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky bg-white dark:bg-black top-0 w-full py-2 px-3 hidden md:flex flex-row items-center justify-between z-10 border-b-4 border-b-slate-300">
      <Link href="/">
        <h1 className="text-3xl font-bold flex flex-row gradient-text">Vapmart</h1>
      </Link>
      <ul className="hidden md:flex flex-row gap-3 font-bold text-xl">
        <Link href="/">
          <li className="gradient-text">Home</li>
        </Link>
        <Link href="/product">
          <li className="gradient-text">Product</li>
        </Link>
        <Link href="/store">
          <li className="gradient-text">Store</li>
        </Link>
      </ul>
      <ul className="flex flex-row gap-3">
        <Link href="/dashboard">
          <li className="text-2xl">
            <FaUser title="Account" />
          </li>
        </Link>
        <ButtonThemeIcon />
      </ul>
    </nav>
  );
}
