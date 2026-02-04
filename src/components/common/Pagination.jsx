import { useId } from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const id = useId();

  return (
    <nav aria-label="Пагінація">
      <button
        aria-labelledby={`${id}-prev`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>

      <span id={`${id}-current`}>
        {currentPage} / {totalPages}
      </span>

      <button
        aria-labelledby={`${id}-next`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
    </nav>
  );
}
