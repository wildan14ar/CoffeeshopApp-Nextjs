"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ButtonTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <li
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hidden md:block text-2xl"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </li>
  );
}
