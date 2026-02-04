import ThemeToggle from "@components/ui/ThemeToggle";

export default function Header() {
  return (
    <header
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "var(--text-primary)" }}>Dashboard</h1>
      <ThemeToggle />
    </header>
  );
}
