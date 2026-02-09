import { useEffect, useMemo, useState, useTransition } from "react";
import { loadChartData } from "@utils/api";

/**
 * debounce hook
 */
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/**
 * stable key generator
 */
function getRowKey(row) {
  return (
    row.date ??
    row.week ??
    row.month ??
    row.year
  );
}

export default function SalesChart() {
  const [period, setPeriod] = useState("yearly");
  const debouncedPeriod = useDebounce(period);
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    loadChartData(debouncedPeriod).then((result) => {
      if (cancelled) return;

      startTransition(() => {
        setData(result);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedPeriod]);

  /**
   * ↑ ↓ diff
   */
  const withDiff = useMemo(() => {
    return data.map((row, i) => {
      const prev = data[i - 1];
      if (!prev) return { ...row, diff: null };

      return {
        ...row,
        diff: row.revenue - prev.revenue,
      };
    });
  }, [data]);

  const maxRevenue = Math.max(...data.map((d) => d.revenue || 0), 1);

  return (
    <div className={`stats-card ${isPending ? "loading-overlay" : ""}`}>
      <div className="stats-header">
        <h3>📊 Продажі</h3>

        <select
          value={period}
          disabled={isPending}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="daily">День</option>
          <option value="weekly">Тиждень</option>
          <option value="monthly">Місяць</option>
          <option value="yearly">Рік</option>
        </select>
      </div>

      {/* ================= GRAPH ================= */}
      <div className="sales-chart-wrapper">
        <div className="sales-chart-scroll">
          {data.map((row) => (
            <div
              key={`bar-${getRowKey(row)}`}
              className="sales-bar"
              style={{
                height: `${(row.revenue / maxRevenue) * 100}%`,
              }}
              title={`${row.revenue.toLocaleString("uk-UA")} ₴`}
            />
          ))}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <table width="100%">
        <thead>
          <tr>
            <th>Період</th>
            <th>Замовлення</th>
            <th>Дохід</th>
            <th>Зміна</th>
          </tr>
        </thead>

        <tbody>
          {isPending &&
            Array.from({ length: 4 }).map((_, i) => (
              <tr key={`skeleton-${i}`}>
                <td colSpan={4}>
                  <div className="skeleton-row" />
                </td>
              </tr>
            ))}

          {!isPending &&
            withDiff.map((row) => (
              <tr key={`row-${getRowKey(row)}`}>
                <td>{row.year ?? row.month ?? row.week ?? row.date}</td>
                <td>{row.orders.toLocaleString("uk-UA")}</td>
                <td>{row.revenue.toLocaleString("uk-UA")} ₴</td>
                <td
                  className={
                    row.diff > 0
                      ? "positive"
                      : row.diff < 0
                        ? "negative"
                        : ""
                  }
                >
                  {row.diff === null
                    ? "—"
                    : row.diff > 0
                      ? `↑ ${row.diff.toLocaleString("uk-UA")}`
                      : `↓ ${Math.abs(row.diff).toLocaleString("uk-UA")}`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
