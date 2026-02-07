const mockOrders = [
	{
		id: 1,
		customer: "Іван Петренко",
		product: "Ноутбук Dell XPS 15",
		amount: 35000,
		status: "pending",
		date: "2024-01-15T10:30:00Z"
	},
	{
		id: 2,
		customer: "Олена Коваль",
		product: "iPhone 14 Pro",
		amount: 42000,
		status: "completed",
		date: "2024-01-14T14:12:00Z"
	},
	{
		id: 3,
		customer: "Андрій Мельник",
		product: "Samsung Galaxy S23",
		amount: 31000,
		status: "processing",
		date: "2024-01-14T09:45:00Z"
	},
	{
		id: 4,
		customer: "Наталія Романюк",
		product: "Навушники Sony WH-1000XM5",
		amount: 12000,
		status: "completed",
		date: "2024-01-13T18:20:00Z"
	},
	{
		id: 5,
		customer: "Сергій Бондар",
		product: "Монітор LG 27''",
		amount: 9800,
		status: "cancelled",
		date: "2024-01-13T11:05:00Z"
	},
	{
		id: 6,
		customer: "Марія Лисенко",
		product: "MacBook Air M2",
		amount: 46000,
		status: "processing",
		date: "2024-01-12T16:40:00Z"
	},
	{
		id: 7,
		customer: "Віктор Савчук",
		product: "Клавіатура Keychron K8",
		amount: 4200,
		status: "completed",
		date: "2024-01-12T10:10:00Z"
	},
	{
		id: 8,
		customer: "Ірина Шевченко",
		product: "Мишка Logitech MX Master 3",
		amount: 3900,
		status: "completed",
		date: "2024-01-11T15:55:00Z"
	},
	{
		id: 9,
		customer: "Олександр Ткачук",
		product: "Планшет iPad 10",
		amount: 21000,
		status: "pending",
		date: "2024-01-11T09:30:00Z"
	},
	{
		id: 10,
		customer: "Юлія Гончар",
		product: "Apple Watch Series 9",
		amount: 18000,
		status: "processing",
		date: "2024-01-10T13:00:00Z"
	},

	// ---- масивніші тестові дані ----
	...Array.from({ length: 45 }, (_, i) => {
		const statuses = ["pending", "processing", "completed", "cancelled"];
		const products = [
			"Ноутбук Lenovo ThinkPad",
			"Ноутбук ASUS ROG",
			"Смартфон Xiaomi 13",
			"Смарт ТВ Samsung 55\"",
			"Навушники AirPods Pro",
			"Камера GoPro Hero",
			"Ігрова приставка PlayStation 5",
			"Монітор Dell 24\"",
			"Мишка Razer DeathAdder",
			"Клавіатура Logitech G Pro"
		];

		return {
			id: i + 11,
			customer: `Клієнт ${i + 11}`,
			product: products[i % products.length],
			amount: 3000 + (i % 10) * 4500,
			status: statuses[i % statuses.length],
			date: new Date(
				Date.now() - i * 24 * 60 * 60 * 1000
			).toISOString()
		};
	})
];

export default mockOrders;
