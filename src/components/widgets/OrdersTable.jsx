import { useOptimistic, useState } from "react";
import mockOrders from "@data/mockOrders";
import { updateOrderStatus } from "@utils/api";

export default function OrdersTable() {
    const [orders, setOrders] = useState(mockOrders);
    const [savingId, setSavingId] = useState(null);

    const [optimisticOrders, updateOptimistic] = useOptimistic(
        orders,
        (state, { id, status }) =>
            state.map((o) =>
                o.id === id ? { ...o, status } : o
            )
    );

    const handleChange = async (id, status) => {
        updateOptimistic({ id, status });
        setSavingId(id);

        try {
            await updateOrderStatus(id, status);
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === id ? { ...o, status } : o
                )
            );
        } catch {
            alert("Помилка збереження");
        } finally {
            setSavingId(null);
        }
    };

    return (
        <div className="stats-card">
            <h3>Замовлення</h3>

            <table width="100%">
                <tbody>
                    {optimisticOrders.map((o) => (
                        <tr
                            key={o.id}
                            className={
                                savingId === o.id ? "optimistic-saving" : ""
                            }
                        >
                            <td>{o.customer}</td>
                            <td>
                                <select
                                    value={o.status}
                                    onChange={(e) =>
                                        handleChange(o.id, e.target.value)
                                    }
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
