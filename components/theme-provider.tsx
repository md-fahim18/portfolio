// theme-provider.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "dark", // ✅ default is now dark
  setTheme: (theme: "light" | "dark") => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // ✅ default dark

  // Optional: load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme to html
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
