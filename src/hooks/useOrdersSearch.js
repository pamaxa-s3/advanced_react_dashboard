
import { useDeferredValue, useMemo, useState } from "react";

export default function useOrdersSearch(orders) {
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(-1);

	const deferredQuery = useDeferredValue(query);

	const filteredOrders = useMemo(() => {
		if (!deferredQuery) return orders;

		return orders.filter((o) =>
			o.customer.toLowerCase().includes(deferredQuery.toLowerCase())
		);
	}, [orders, deferredQuery]);

	const onKeyDown = (e) => {
		if (!filteredOrders.length) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) =>
				i < filteredOrders.length - 1 ? i + 1 : 0
			);
		}

		if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) =>
				i > 0 ? i - 1 : filteredOrders.length - 1
			);
		}

		if (e.key === "Enter" && activeIndex >= 0) {
			alert(
				`Обрано замовлення: ${filteredOrders[activeIndex].customer}`
			);
		}
	};

	return {
		query,
		setQuery,
		filteredOrders,
		activeIndex,
		onKeyDown,
	};
}
