import { use } from "react";
import { ThemeContext } from "@contexts/ThemeContext";

export default function ThemeToggle() {
    const ctx = use(ThemeContext);
    if (!ctx) return null;

    const { theme, toggleTheme } = ctx;

    return (
        <button
            onClick={toggleTheme}
            aria-label="Перемкнути тему"
            style={{
                fontSize: "1.25rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s",
            }}
        >
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
}
