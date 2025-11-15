import { useState, useEffect } from "react";

export default function ThemeToggle() {
  // Initialize from localStorage or default to light
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Update HTML class whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}