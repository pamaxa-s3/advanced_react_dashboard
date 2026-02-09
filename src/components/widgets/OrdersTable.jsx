import { useOptimistic, useState, useTransition } from "react";
import mockOrders from "@data/mockOrders";
import { updateOrderStatus } from "@utils/api";

export default function OrdersTable({ orders = mockOrders }) {
    const [savingId, setSavingId] = useState(null);
    const [isPending, startTransition] = useTransition();

    const [optimisticOrders, updateOptimistic] = useOptimistic(
        orders,
        (state, { id, status }) =>
            state.map((o) =>
                o.id === id ? { ...o, status } : o
            )
    );

    const handleChange = (id, status) => {
        startTransition(async () => {
            updateOptimistic({ id, status });
            setSavingId(id);

            try {
                await updateOrderStatus(id, status);
            } catch {
                alert("Помилка збереження");
            } finally {
                setSavingId(null);
            }
        });
    };

    return (
        <div className={`stats-card ${isPending ? "loading-overlay" : ""}`}>
            <h3>Замовлення</h3>

            <table width="100%">
                <thead>
                    <tr>
                        <th>Клієнт</th>
                        <th>Товар</th>
                        <th>Статус</th>
                    </tr>
                </thead>

                <tbody>
                    {optimisticOrders.length === 0 && (
                        <tr>
                            <td colSpan={3} className="muted">
                                Нічого не знайдено
                            </td>
                        </tr>
                    )}

                    {optimisticOrders.map((o) => (
                        <tr
                            key={o.id}
                            className={savingId === o.id ? "optimistic-saving" : ""}
                        >
                            <td>{o.customer}</td>
                            <td>{o.product}</td>
                            <td>
                                <select
                                    value={o.status}
                                    onChange={(e) =>
                                        handleChange(o.id, e.target.value)
                                    }
                                    disabled={savingId === o.id}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
