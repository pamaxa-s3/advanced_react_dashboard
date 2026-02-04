export default function Sidebar({ activeSection, onSectionChange }) {
  const sections = ["overview", "sales", "users", "analytics"];

  return (
    <aside className="sidebar">
      {sections.map((s) => (
        <button
          key={s}
          onClick={() => onSectionChange(s)}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            background:
              activeSection === s
                ? "var(--primary)"
                : "transparent",
            color:
              activeSection === s
                ? "#fff"
                : "var(--text-secondary)",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          {s.toUpperCase()}
        </button>
      ))}
    </aside>
  );
}
