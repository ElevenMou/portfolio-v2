"use client";

import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`theme-changer ${theme}`}>
      <button
        className="theme-changer__button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

export default ThemeChanger;
