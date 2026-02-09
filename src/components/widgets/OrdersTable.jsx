import useOrdersTable from "@hooks/useOrdersTable";

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
];

export default function OrdersTable() {
    const {
        orders,
        page,
        totalPages,
        statusFilter,
        setStatusFilter,
        changeStatus,
        isPending,
        savingId,
        setPage,
    } = useOrdersTable();

    return (
        <div className={`stats-card ${isPending ? "loading-overlay" : ""}`}>
            <div className="stats-header">
                <h3>🛒 Останні замовлення</h3>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">Всі</option>
                    {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>

            <table width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Клієнт</th>
                        <th>Продукт</th>
                        <th>Сума</th>
                        <th>Статус</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan={5} className="muted">
                                Нічого не знайдено
                            </td>
                        </tr>
                    )}

                    {orders.map((o) => (
                        <tr
                            key={o.id}
                            className={savingId === o.id ? "optimistic-saving" : ""}
                        >
                            <td>{o.id}</td>
                            <td>{o.customer}</td>
                            <td>{o.product}</td>
                            <td>{o.amount.toLocaleString("uk-UA")} ₴</td>

                            <td>
                                <div className={`status ${o.status}`}>
                                    <select
                                        value={o.status}
                                        onChange={(e) =>
                                            changeStatus(o.id, e.target.value)
                                        }
                                    >
                                        {STATUS_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ===== PAGINATION ===== */}
            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    ←
                </button>

                <span>
                    {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    →
                </button>
            </div>
        </div>
    );
}
