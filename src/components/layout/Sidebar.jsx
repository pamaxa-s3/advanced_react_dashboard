export default function Sidebar({ activeSection, onSectionChange }) {
  const sections = ["overview", "sales", "users", "analytics"];
  return (
    <aside
      style={{
        width: 180,
        borderRight: "1px solid #ddd",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {sections.map((s) => (
        <button
          key={s}
          onClick={() => onSectionChange(s)}
          style={{
            fontWeight: activeSection === s ? "bold" : "normal",
            padding: 8,
            borderRadius: 6,
            cursor: "pointer",
            border: "none",
            backgroundColor: activeSection === s ? "#eee" : "transparent",
          }}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </aside>
  );
}