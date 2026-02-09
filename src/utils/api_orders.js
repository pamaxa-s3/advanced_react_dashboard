// api/orders.js
import mockOrders from "@data/mockOrders";

let ORDERS = [...mockOrders];

export function fetchOrders({ page, limit, status }) {
	return new Promise((resolve) => {
		setTimeout(() => {
			let data = [...ORDERS];

			// фільтр
			if (status !== "all") {
				data = data.filter((o) => o.status === status);
			}

			// сортування: новіші зверху
			data.sort((a, b) => new Date(b.date) - new Date(a.date));

			const total = data.length;
			const start = (page - 1) * limit;
			const end = start + limit;

			resolve({
				data: data.slice(start, end),
				total,
			});
		}, 400);
	});
}

export function updateOrderStatus(id, status) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// ❌ інколи помилка — для rollback
			if (Math.random() < 0.2) {
				reject(new Error("Update failed"));
				return;
			}

			ORDERS = ORDERS.map((o) =>
				o.id === id ? { ...o, status } : o
			);

			resolve({ success: true });
		}, 500);
	});
}
