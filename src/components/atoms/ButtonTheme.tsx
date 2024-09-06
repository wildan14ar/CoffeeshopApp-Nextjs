"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ButtonTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 flex items-center justify-center hover:border rounded-full dark:hover:bg-slate-600 hover:bg-slate-100"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
