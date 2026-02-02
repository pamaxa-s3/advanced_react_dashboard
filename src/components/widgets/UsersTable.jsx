import { useState, useDeferredValue, useMemo } from "react";

/**
 * ===== Mock users (120 записів) =====
 */
const mockUsers = Array.from({ length: 120 }, (_, i) => {
  const isActive = Math.random() > 0.3;
  const now = Date.now();

  return {
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    isActive,
    registeredAt: new Date(
      now - Math.random() * 1000 * 60 * 60 * 24 * 365
    ).toISOString(),
    lastActivity: new Date(
      now - Math.random() * 1000 * 60 * 60 * 24 * 30
    ).toISOString(),
  };
});

export default function UsersTable() {
  // ===== Filters state =====
  const [searchTerm, setSearchTerm] = useState("");
  const [activityFilter, setActivityFilter] = useState("all"); // all | active | inactive
  const [sortBy, setSortBy] = useState("name"); // name | registeredAt | lastActivity

  // ===== Deferred search =====
  const deferredSearch = useDeferredValue(searchTerm);
  const isPending = searchTerm !== deferredSearch;

  /**
   * ===== Filtering + sorting =====
   * useMemo — щоб не рахувати зайвий раз
   */
  const filteredUsers = useMemo(() => {
    let result = [...mockUsers];

    // 🔍 search (IMPORTANT: deferredSearch)
    if (deferredSearch) {
      const q = deferredSearch.toLowerCase();
      result = result.filter((u) =>
        u.name.toLowerCase().includes(q)
      );
    }

    // 🟢 activity filter
    if (activityFilter !== "all") {
      const isActive = activityFilter === "active";
      result = result.filter((u) => u.isActive === isActive);
    }

    // 🔃 sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    });

    return result;
  }, [deferredSearch, activityFilter, sortBy]);

  return (
    <div style={styles.card}>
      <h3>👥 Users</h3>

      {/* ===== Controls ===== */}
      <div style={styles.controls}>
        <input
          placeholder="Пошук по імені..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />

        <div style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="all"
              checked={activityFilter === "all"}
              onChange={() => setActivityFilter("all")}
            />
            Усі
          </label>

          <label>
            <input
              type="radio"
              value="active"
              checked={activityFilter === "active"}
              onChange={() => setActivityFilter("active")}
            />
            Активні
          </label>

          <label>
            <input
              type="radio"
              value="inactive"
              checked={activityFilter === "inactive"}
              onChange={() => setActivityFilter("inactive")}
            />
            Неактивні
          </label>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="name">Імʼя</option>
          <option value="registeredAt">Дата реєстрації</option>
          <option value="lastActivity">Остання активність</option>
        </select>
      </div>

      {/* ===== Meta info ===== */}
      <div style={styles.meta}>
        Знайдено: <b>{filteredUsers.length}</b>
        {isPending && <span style={styles.pending}> · фільтрація...</span>}
      </div>

      {/* ===== Table ===== */}
      <table
        style={{
          ...styles.table,
          opacity: isPending ? 0.6 : 1,
        }}
      >
        <thead>
          <tr>
            <th>Імʼя</th>
            <th>Email</th>
            <th>Статус</th>
            <th>Реєстрація</th>
            <th>Активність</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isActive ? "🟢 Active" : "⚪ Inactive"}</td>
              <td>{formatDate(u.registeredAt)}</td>
              <td>{formatDate(u.lastActivity)}</td>
            </tr>
          ))}

          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="5" style={styles.empty}>
                Нічого не знайдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * utils
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString();
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
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    minWidth: 180,
  },
  radioGroup: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  select: {
    padding: 8,
    borderRadius: 6,
  },
  meta: {
    fontSize: 13,
    marginBottom: 6,
  },
  pending: {
    color: "#f59e0b",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    padding: 12,
    opacity: 0.6,
  },
};