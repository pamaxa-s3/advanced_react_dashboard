import { useId } from "react";

export default function Pagination({ currentPage, totalPages, onPageChange, maxVisible = 5 }) {
  const firstId = useId();
  const prevId = useId();
  const nextId = useId();
  const lastId = useId();

  // Розрахунок видимих сторінок
  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    start = Math.max(end - maxVisible + 1, 1); // Корекція якщо кінець > totalPages

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav role="navigation" aria-label="Pagination" style={styles.container}>
      <button
        id={firstId}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="Перша сторінка"
        style={{ ...styles.button, ...(currentPage === 1 ? styles.disabled : {}) }}
      >
        ⏮
      </button>

      <button
        id={prevId}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Попередня сторінка"
        style={{ ...styles.button, ...(currentPage === 1 ? styles.disabled : {}) }}
      >
        ←
      </button>

      <ul style={styles.pagesList}>
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              onClick={() => onPageChange(num)}
              aria-current={currentPage === num ? "page" : undefined}
              style={{
                ...styles.button,
                ...(currentPage === num ? styles.active : {}),
              }}
            >
              {num}
            </button>
          </li>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <li>
            <span style={styles.ellipsis}>…</span>
          </li>
        )}
      </ul>

      <button
        id={nextId}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Наступна сторінка"
        style={{ ...styles.button, ...(currentPage === totalPages ? styles.disabled : {}) }}
      >
        →
      </button>

      <button
        id={lastId}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Остання сторінка"
        style={{ ...styles.button, ...(currentPage === totalPages ? styles.disabled : {}) }}
      >
        ⏭
      </button>
    </nav>
  );
}

/**
 * ===== Styles =====
 */
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
    marginTop: 16,
    flexWrap: "wrap",
  },
  pagesList: {
    display: "flex",
    gap: 4,
    listStyle: "none",
    padding: 0,
    margin: 0,
    alignItems: "center",
  },
  button: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
    minWidth: 36,
    textAlign: "center",
  },
  active: {
    background: "#6366f1",
    color: "#fff",
    borderColor: "#6366f1",
    fontWeight: "bold",
  },
  disabled: {
    background: "#f3f4f6",
    color: "#9ca3af",
    borderColor: "#d1d5db",
    cursor: "not-allowed",
  },
  ellipsis: {
    padding: "6px 8px",
    color: "#6b7280",
    userSelect: "none",
  },
};