import { ThemeProvider } from "@contexts/ThemeProvider";
import Dashboard from "@pages/Dashboard/Dashboard";

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
