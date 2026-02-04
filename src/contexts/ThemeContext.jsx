import React, { createContext, useEffect, useMemo, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
	const getInitialTheme = () => {
		if (typeof window === "undefined") return "light";
		const saved = localStorage.getItem("theme");
		if (saved) return saved;
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	};

	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem("theme", theme);
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			toggleTheme: () =>
				setTheme((t) => (t === "dark" ? "light" : "dark")),
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
}
