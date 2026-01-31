import { use } from "react";
import { ThemeContext } from "@contexts/ThemeContext";

export function ThemeToggle() {
	const context = use(ThemeContext);

	if (!context) {
		throw new Error(
			"ThemeToggleButton must be used within <ThemeProvider />"
		);
	}

	const { theme, toggleTheme } = context;

	return (
		<button onClick={toggleTheme}>
			Theme: {theme}
		</button>
	);
}
