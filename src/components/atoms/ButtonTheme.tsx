"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

// Function to toggle theme with icon
const ButtonThemeIcon = () => {
  const { theme, setTheme } = useTheme();

  return (
    <li
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-2xl"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </li>
  );
};

// Function to toggle theme with box (you can change the content or logic if needed)
const ButtonThemeBox = () => {
  const { theme, setTheme } = useTheme();

  return (
    <li
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded bg-slate-200 p-2 w-full"
    >
      {theme === "light" ? <span>Light Mode</span> : <span>Dark Mode</span>}
    </li>
  );
};

// Export all components
export { ButtonThemeIcon, ButtonThemeBox };
