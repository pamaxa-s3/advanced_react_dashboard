export default function Sidebar({
  activeSection,
  onSectionChange,
  filters,
  onFiltersChange,
}) {
  const sections = [
    { id: "overview", label: "📊 Огляд" },
    { id: "sales", label: "💰 Продажі" },
    { id: "users", label: "👥 Користувачі" },
    { id: "analytics", label: "📈 Аналітика" },
  ];

  const categories = ["Electronics", "Clothing", "Home"];
  const regions = ["EU", "USA", "Asia"];

  const toggleCategory = (cat) => {
    onFiltersChange({
      ...filters,
      categories: filters.categories.includes(cat)
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });
  };

  const toggleRegion = (region) => {
    onFiltersChange({
      ...filters,
      regions: filters.regions.includes(region)
        ? filters.regions.filter((r) => r !== region)
        : [...filters.regions, region],
    });
  };

  return (
    <aside className="sidebar">
      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`sidebar-link ${activeSection === s.id ? "active" : ""
              }`}
            onClick={() => onSectionChange(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* FILTERS */}
      <div className="sidebar-filters">
        <h4 className="sidebar-title">Фільтри</h4>

        {/* Categories */}
        <div className="filter-group">
          <span className="filter-label">Категорії</span>
          {categories.map((c) => (
            <label key={c} className="checkbox">
              <input
                type="checkbox"
                checked={filters.categories.includes(c)}
                onChange={() => toggleCategory(c)}
              />
              {c}
            </label>
          ))}
        </div>

        {/* Price range */}
        <div className="filter-group">
          <span className="filter-label">
            Ціна до: {filters.maxPrice} ₴
          </span>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={filters.maxPrice}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                maxPrice: Number(e.target.value),
              })
            }
          />
        </div>

        {/* Regions */}
        <div className="filter-group">
          <span className="filter-label">Регіони</span>
          {regions.map((r) => (
            <label key={r} className="checkbox">
              <input
                type="checkbox"
                checked={filters.regions.includes(r)}
                onChange={() => toggleRegion(r)}
              />
              {r}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
