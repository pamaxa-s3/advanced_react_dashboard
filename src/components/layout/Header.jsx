import ThemeToggle from "@components/ui/ThemeToggle";

export default function Header({
  period,
  onPeriodChange,
  onRefresh,
  isLoading,
}) {
  return (
    <header className="dashboard-header">
      {/* LEFT */}
      <div className="header-left">
        <span className="header-logo">📊 Analytics Dashboard</span>
      </div>

      {/* CENTER */}
      <div className="header-center">
        <select
          className="header-select"
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          disabled={isLoading}
        >
          <option value="today">Сьогодні</option>
          <option value="weekly">Тиждень</option>
          <option value="monthly">Місяць</option>
          <option value="yearly">Рік</option>
        </select>

        <button
          className="header-refresh"
          onClick={onRefresh}
          disabled={isLoading}
        >
          🔄 Оновити
        </button>

        {isLoading && (
          <span className="header-loading">Завантаження…</span>
        )}
      </div>

      {/* RIGHT */}
      <div className="header-right">
        <ThemeToggle />
      </div>
    </header>
  );
}
