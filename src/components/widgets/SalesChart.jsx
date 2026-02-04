import { useState, useTransition } from "react";
import { loadChartData } from "@utils/api";

export default function SalesChart() {
  const [period, setPeriod] = useState("monthly");
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (p) => {
    setPeriod(p);
    startTransition(async () => {
      const result = await loadChartData(p);
      setData(result);
    });
  };

  return (
    <div className={`stats-card ${isPending ? "loading-overlay" : ""}`}>
      <select value={period} onChange={(e) => handleChange(e.target.value)}>
        <option value="weekly">Week</option>
        <option value="monthly">Month</option>
        <option value="yearly">Year</option>
      </select>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
