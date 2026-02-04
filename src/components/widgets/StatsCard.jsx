import { useId } from "react";

export default function StatsCard({ title, value, change, icon }) {
  const titleId = useId();
  const valueId = useId();

  let changeClass = "";
  let arrow = "→";

  if (change > 0) {
    changeClass = "positive";
    arrow = "↑";
  } else if (change < 0) {
    changeClass = "negative";
    arrow = "↓";
  }

  return (
    <div
      className="stats-card"
      role="region"
      aria-labelledby={titleId}
      aria-describedby={valueId}
    >
      <div style={{ fontSize: "1.5rem" }}>{icon}</div>

      <h3 id={titleId}>{title}</h3>

      <div id={valueId} className="stats-value">
        {value}
      </div>

      <div className={`stats-change ${changeClass}`}>
        {arrow} {Math.abs(change)}%
      </div>
    </div>
  );
}
