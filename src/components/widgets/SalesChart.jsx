import { useState, useTransition } from "react";
import { loadChartData } from "@utils/api";

export default function SalesChart() {
  const [period, setPeriod] = useState("week");
  const [chartData, setChartData] = useState([]);

  const [isPending, startTransition] = useTransition();

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);

    startTransition(async () => {
      const data = await loadChartData(newPeriod);
      setChartData(data);
    });
  };

  return (
    <div style={styles.card}>
      <header style={styles.header}>
        <h3>📈 Sales</h3>

        <select value={period} onChange={handlePeriodChange}>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </header>

      <div
        style={{
          ...styles.chart,
          opacity: isPending ? 0.5 : 1,
        }}
      >
        {chartData.length === 0 && !isPending && (
          <p style={styles.placeholder}>Select period to load data</p>
        )}

        {chartData.map((item, index) => (
          <div key={index} style={styles.barRow}>
            <span style={styles.label}>{item.label}</span>
            <div style={styles.barWrapper}>
              <div
                style={{
                  ...styles.bar,
                  width: `${item.value / 12}%`,
                }}
              />
            </div>
            <span style={styles.value}>{item.value}</span>
          </div>
        ))}
      </div>

      {isPending && (
        <div style={styles.spinner}>
          ⏳ Loading new data…
        </div>
      )}
    </div>
  );
}

/**
 * styles (inline для простоти)
 */
const styles = {
  card: {
    padding: 16,
    borderRadius: 12,
    background: "var(--bg, #fff)",
    border: "1px solid #e5e7eb",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  chart: {
    transition: "opacity 0.2s ease",
  },
  barRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  label: {
    width: 32,
    fontSize: 12,
  },
  barWrapper: {
    flex: 1,
    height: 8,
    background: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    background: "#3b82f6",
  },
  value: {
    width: 40,
    fontSize: 12,
    textAlign: "right",
  },
  placeholder: {
    fontSize: 14,
    color: "#6b7280",
  },
  spinner: {
    marginTop: 8,
    fontSize: 13,
    color: "#6b7280",
  },
};