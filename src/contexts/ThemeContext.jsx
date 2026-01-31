import { createContext, useEffect, useMemo, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(undefined);

const STORAGE_KEY = "app-theme";
const THEMES = ["light", "dark"];

function getSystemTheme() {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function getInitialTheme() {
	if (typeof window === "undefined") return "light";

	const stored = localStorage.getItem(STORAGE_KEY);
	if (THEMES.includes(stored)) return stored;

	return getSystemTheme();
}

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getInitialTheme);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	// sync: localStorage + <body data-theme="">
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, theme);
		document.body.dataset.theme = theme;
	}, [theme]);

	// listen prefers-color-scheme (only if user hasn't overridden)
	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");

		const handler = (e) => {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (!stored) {
				setTheme(e.matches ? "dark" : "light");
			}
		};

		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, []);

	const value = useMemo(
		() => ({
			theme,
			toggleTheme
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
}
