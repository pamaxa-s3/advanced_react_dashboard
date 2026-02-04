import { useState, useEffect } from "react";
import Dashboard from "@pages/Dashboard/Dashboard";
import { ThemeContext } from "@contexts/ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}

export default App;
