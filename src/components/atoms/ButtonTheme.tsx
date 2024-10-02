"use client";

import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

// Function to toggle theme with icon
const ButtonThemeIcon = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-2xl"
    >
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </div>
  );
};

// Function to toggle theme with box (you can change the content or logic if needed)
const ButtonThemeBox = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded bg-white shadow dark:bg-slate-600  p-2 w-full text-center cursor-pointer"
    >
      {theme === "light" ? <span>Light Mode</span> : <span>Dark Mode</span>}
    </div>
  );
};

// Export all components
export { ButtonThemeIcon, ButtonThemeBox };
