import { useId } from "react";

/**
 * Props:
 * - title: string
 * - value: string | number
 * - change: number (%)
 * - icon: ReactNode
 */
export default function StatsCard({ title, value, change, icon }) {
  const titleId = useId();
  const valueId = useId();

  const isPositive = change > 0;
  const isNegative = change < 0;

  const changeColor = isPositive
    ? "#16a34a"
    : isNegative
    ? "#dc2626"
    : "#6b7280";

  const changeArrow = isPositive ? "↑" : isNegative ? "↓" : "→";

  return (
    <div
      role="region"
      aria-labelledby={titleId}
      style={styles.card}
    >
      <div style={styles.header}>
        <h3 id={titleId} style={styles.title}>
          {icon} {title}
        </h3>
      </div>

      <div id={valueId} style={styles.value}>
        {value}
      </div>

      <div
        style={{
          ...styles.change,
          color: changeColor,
        }}
        aria-describedby={valueId}
      >
        {changeArrow} {Math.abs(change)}%
      </div>
    </div>
  );
}

/**
 * styles
 */
const styles = {
  card: {
    padding: 16,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    minWidth: 180,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  value: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
  },
  change: {
    fontSize: 13,
  },
};