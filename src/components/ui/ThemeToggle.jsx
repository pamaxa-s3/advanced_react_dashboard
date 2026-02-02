import { use } from "react";
import { ThemeContext } from "@context/ThemeContext";
import { motion } from "framer-motion"; // для плавної анімації

export default function ThemeToggle() {
    // 🔹 use() замість useContext
    const { theme, toggleTheme } = use(ThemeContext);

    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Переключити на ${isDark ? "світлу" : "темну"} тему`}
            style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                borderRadius: 8
            }}
        >
            <motion.span
                key={theme} // key для анімації при зміні
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {isDark ? "🌙" : "☀️"}
            </motion.span>
        </button>
    );
}
