import ThemeToggle from "@components/ui/ThemeToggle";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "var(--header-bg, #fff)",
        transition: "background-color 0.3s",
      }}
    >
      <div style={{ fontSize: 20, fontWeight: "bold" }}>🖥 Dashboard</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <ThemeToggle />
      </div>
    </header>
  );
}