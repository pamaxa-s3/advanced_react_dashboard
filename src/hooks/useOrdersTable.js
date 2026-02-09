import { useEffect, useMemo, useOptimistic, useState, useTransition } from "react";
import mockOrders from "@data/mockOrders";
import { updateOrderStatus } from "@utils/api";

const PAGE_SIZE = 10;

export default function useOrdersTable() {
	const [orders, setOrders] = useState(mockOrders);
	const [statusFilter, setStatusFilter] = useState("all");
	const [page, setPage] = useState(1);
	const [savingId, setSavingId] = useState(null);
	const [isPending, startTransition] = useTransition();

	// 🔥 optimistic
	const [optimisticOrders, updateOptimistic] = useOptimistic(
		orders,
		(state, { id, status }) =>
			state.map((o) =>
				o.id === id ? { ...o, status } : o
			)
	);

	// ✅ reset page on filter change
	useEffect(() => {
		setPage(1);
	}, [statusFilter]);

	// 🔍 filtered (AFTER optimistic)
	const filteredOrders = useMemo(() => {
		if (statusFilter === "all") return optimisticOrders;
		return optimisticOrders.filter(
			(o) => o.status === statusFilter
		);
	}, [optimisticOrders, statusFilter]);

	// 📄 pagination
	const totalPages = Math.max(
		1,
		Math.ceil(filteredOrders.length / PAGE_SIZE)
	);

	const paginatedOrders = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return filteredOrders.slice(start, start + PAGE_SIZE);
	}, [filteredOrders, page]);

	// 🔁 change status (optimistic)
	function changeStatus(id, status) {
		startTransition(async () => {
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
		});
	}

	return {
		orders: paginatedOrders,
		page,
		totalPages,
		statusFilter,
		setStatusFilter,
		changeStatus,
		isPending,
		savingId,
		setPage,
	};
}
