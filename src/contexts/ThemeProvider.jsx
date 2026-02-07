import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
	const getInitialTheme = () => {
		const saved = localStorage.getItem("theme");
		if (saved) return saved;

		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	};

	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		document.body.dataset.theme = theme;
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
