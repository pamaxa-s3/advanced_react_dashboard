import { useOptimistic, useState } from "react";
import mockOrders from "@data/mockOrders";
import { updateOrderStatus } from "@utils/api";


function showErrorNotification(message) {
    alert(message);
}

export default function OrdersTable() {
    const [orders, setOrders] = useState(mockOrders);
    const [savingOrderId, setSavingOrderId] = useState(null);

    const [optimisticOrders, updateOptimisticOrders] = useOptimistic(
        orders,
        (currentOrders, { id, status }) => {
            return currentOrders.map(order =>
                order.id === id ? { ...order, status } : order
            );
        }
    );

    const handleStatusChange = async (orderId, newStatus) => {
        updateOptimisticOrders({ id: orderId, status: newStatus });
        setSavingOrderId(orderId);

        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(prev =>
                prev.map(order =>
                    order.id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        } catch (error) {
            showErrorNotification(error.message);
        } finally {
            setSavingOrderId(null);
        }
    };

    return (
        <div style={{ overflowX: "auto" }}>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: 700
                }}
            >
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Клієнт</th>
                        <th>Продукт</th>
                        <th>Сума</th>
                        <th>Статус</th>
                        <th>Дата</th>
                    </tr>
                </thead>

                <tbody>
                    {optimisticOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.product}</td>
                            <td>{order.amount.toLocaleString()} ₴</td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={e =>
                                        handleStatusChange(
                                            order.id,
                                            e.target.value
                                        )
                                    }
                                    disabled={savingOrderId === order.id}
                                >
                                    <option value="pending">pending</option>
                                    <option value="processing">
                                        processing
                                    </option>
                                    <option value="completed">completed</option>
                                    <option value="cancelled">cancelled</option>
                                </select>

                                {savingOrderId === order.id && (
                                    <div
                                        style={{
                                            fontSize: 12,
                                            opacity: 0.6,
                                            marginTop: 4
                                        }}
                                    >
                                        збереження...
                                    </div>
                                )}
                            </td>
                            <td>
                                {new Date(order.date).toLocaleDateString(
                                    "uk-UA"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
